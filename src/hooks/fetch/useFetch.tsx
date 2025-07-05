"use client";

import * as React from 'react';
import { useFilter } from '@/context/FilterContext';

/**
 * @name useFetch
 * @description Optimized data fetching hook with selective filter dependency and request cleanup.
 * 
 * @hook
 * @template T - The expected response data type
 * @param {string} [url] - The API endpoint URL (relative or absolute)
 * @param {Object} [options] - Configuration options for the fetch behavior
 * @param {boolean} [options.useFilters=false] - Whether to include context filters in the request
 * @param {string[]} [options.filterFields] - Specific filter fields to include (if useFilters is true)
 * @param {boolean} [options.refetchOnFilterChange=true] - Whether to refetch when filters change
 * @param {number} [options.debounceMs=300] - Debounce delay for filter-based refetching
 * 
 * @returns {Object} Fetch state object
 * @returns {T | null} returns.data - The fetched data
 * @returns {boolean} returns.isLoading - Loading state indicator
 * @returns {string | null} returns.error - Error message if request fails
 * @returns {() => void} returns.refetch - Manual refetch function
 * 
 * @example
 * ```tsx
 * // Static data (no filters)
 * const { data: teams } = useFetch<string[]>("employee/teams");
 * 
 * // With filters
 * const { data: transactions } = useFetch<Transaction[]>("transactions", {
 *   useFilters: true,
 *   filterFields: ["dateRange", "advisorCode"]
 * });
 * 
 * // Manual control
 * const { data, isLoading, refetch } = useFetch<Data>("endpoint", {
 *   refetchOnFilterChange: false
 * });
 * ```
 * 
 * @remarks
 * - Implements AbortController for request cleanup to prevent memory leaks
 * - Supports selective filter usage to avoid unnecessary API calls
 * - Includes debouncing for filter-based requests to improve performance
 * - Uses functional state updates to prevent stale closure issues
 * - Follows project patterns for error handling and loading states
 * 
 * @see [useDecryptFetch] for encrypted data fetching
 */
export default function useFetch<T>(
    url?: string,
    options: {
        useFilters?: boolean;
        filterFields?: string[];
        refetchOnFilterChange?: boolean;
        debounceMs?: number;
    } = {}
) {
    const {
        useFilters = false,
        filterFields,
        refetchOnFilterChange = true,
        debounceMs = 300
    } = options;

    const [data, setData] = React.useState<T | null>(null);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);
    
    const { filters } = useFilter();
    const abortControllerRef = React.useRef<AbortController | null>(null);
    const debounceTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

    // Memoize relevant filters to prevent unnecessary effect triggers
    const relevantFilters = React.useMemo(() => {
        if (!useFilters || !filters) return null;
        
        type FilterValue = string | number | boolean | undefined | null;
        type FilterRecord = Record<string, FilterValue>;
        
        if (filterFields && filterFields.length > 0) {
            // Only include specified filter fields
            const filtered: FilterRecord = {};
            
            filterFields.forEach(field => {
                // Safe property access with proper type checking
                const filterKey = field as keyof typeof filters;
                if (filterKey in filters) {
                    const value = filters[filterKey];
                    if (value !== undefined && value !== null && value !== '') {
                        filtered[field] = value;
                    }
                }
            });
            
            return Object.keys(filtered).length > 0 ? filtered : null;
        }
        
        // Include all non-empty filters
        const filtered: FilterRecord = {};
        
        (Object.keys(filters) as Array<keyof typeof filters>).forEach(key => {
            const value = filters[key];
            if (value !== undefined && value !== null && value !== '') {
                filtered[key as string] = value;
            }
        });
        
        return Object.keys(filtered).length > 0 ? filtered : null;
    }, [useFilters, filters, filterFields]);

    // Memoize the fetch function to prevent unnecessary recreations
    const fetchData = React.useCallback(async (signal: AbortSignal) => {
        if (!url) return;

        try {
            setIsLoading(true);
            setError(null);

            const baseUrl = "http://localhost:8000/api/v1/";
            const urlBuilder = url.startsWith('http') ? url : `${baseUrl}${url}`;

            // Build URL with relevant filters
            let finalUrl = urlBuilder;
            if (relevantFilters) {
                const params = new URLSearchParams();
                Object.entries(relevantFilters).forEach(([key, value]) => {
                    params.append(key, value?.toString() || '');
                });
                finalUrl = `${urlBuilder}?${params.toString()}`;
            }

            const response = await fetch(finalUrl, { signal });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result: T = await response.json();
            
            if (!signal.aborted) {
                setData(result);
            }
        } catch (err) {
            if (!signal.aborted) {
                setError(err instanceof Error ? err.message : 'Unknown error');
            }
        } finally {
            if (!signal.aborted) {
                setIsLoading(false);
            }
        }
    }, [url, relevantFilters]);

    // Manual refetch function
    const refetch = React.useCallback(() => {
        // Cancel previous request
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        // Create new abort controller
        const controller = new AbortController();
        abortControllerRef.current = controller;

        fetchData(controller.signal);
    }, [fetchData]);

    // Effect for initial fetch and filter-based refetching
    React.useEffect(() => {
        if (!url) return;

        // Clear any existing debounce timeout
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }

        // Cancel previous request
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        // For filter changes, use debouncing to prevent excessive requests
        const shouldDebounce = useFilters && refetchOnFilterChange && relevantFilters;
        
        if (shouldDebounce) {
            debounceTimeoutRef.current = setTimeout(() => {
                const controller = new AbortController();
                abortControllerRef.current = controller;
                fetchData(controller.signal);
            }, debounceMs);
        } else {
            // Immediate fetch for initial load or non-filter requests
            const controller = new AbortController();
            abortControllerRef.current = controller;
            fetchData(controller.signal);
        }

        return () => {
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current);
                debounceTimeoutRef.current = null;
            }
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
                abortControllerRef.current = null;
            }
        };
    }, [url, relevantFilters, fetchData, useFilters, refetchOnFilterChange, debounceMs]);

    React.useEffect(() => {
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current);
            }
        };
    }, []);

    return { 
        data, 
        isLoading, 
        error, 
        refetch 
    };
}