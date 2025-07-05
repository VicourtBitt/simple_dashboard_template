"use client"
import { Stack, useMediaQuery } from '@mui/material';
import DashboardLogoLight from '@/../public/images/logo_light.png';
import DashboardLogoDark from '@/../public/images/logo_dark.png';
import Image from 'next/image';
import { useTheme } from '@mui/material/styles';
import Link from 'next/link';

/**
 * @name BrandingFazCapital
 * @description Responsive branding component displaying the Faz Capital logo with version information.
 *
 * @component
 * @returns {JSX.Element} The rendered branding component with logo and version chips.
 *
 * @example
 * ```tsx
 * <BrandingFazCapital />
 * ```
 *
 * @remarks
 * - Automatically adapts to different screen sizes (mobile, tablet, desktop)
 * - Uses responsive dimensions for the logo based on screen width
 * - Includes version chips with tooltips for additional information
 * - Preserves version information across all screen sizes
 * 
 * @see [MUI useMediaQuery Documentation](https://mui.com/material-ui/react-use-media-query/)
 */
export default function DashboardBranding() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    
    // Calculate responsive dimensions based on screen size
    const logoWidth = isMobile ? 160 : isTablet ? 200 : 240;
    const logoHeight = isMobile ? 27 : isTablet ? 33 : 40;
    
    return (
        <Stack
            direction="row"
            alignItems="center"
            spacing={isMobile ? 1 : 0}
            aria-label="Faz Capital branding section"
        >
            <Link href="/" style={{ cursor: 'pointer', height: '100%', justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
                <Image
                    src={theme.palette.mode === 'dark' ? DashboardLogoDark : DashboardLogoLight}
                    alt="Faz Capital Logo"
                    width={logoWidth}
                    height={logoHeight}
                    style={{
                        maxWidth: '100%',
                        height: 'auto'
                    }}
                    priority
                />
            </Link>
        </Stack>
    );
  }