"use client"

import { alpha } from "@mui/system"
import { Box } from "@mui/material"
import { useTheme } from "@/theme/ThemeProvider"

export default function AvatarWrapper({
    children
}: {
    children: React.ReactNode
}) {
    const { theme } = useTheme()

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 40,
                height: 40,
                borderRadius: '50%',
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main,
            }}
        >
            {children}
        </Box>
    )
}