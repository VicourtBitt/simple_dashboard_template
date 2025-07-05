export interface AdvisorInfo {
    advisor_code: number;
    advisor_name: string;
}

export interface Filter {
    advisorCode?: string | null;
    transactionType?: "C" | "D";
    team?: string | null;
    squad?: string | null;
}

export interface FilterContextType {
    filters: Filter;
    setFilters: (filters: Filter) => void;
    resetFilters: () => void;
}