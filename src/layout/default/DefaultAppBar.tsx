"use client"

import * as React from "react"
import { AppBar, Toolbar, IconButton, Box } from "@mui/material"
import { useTheme as useMuiTheme } from "@mui/material/styles"
import { MenuOutlined, Settings } from "@mui/icons-material"
import { useTheme } from "@/theme/ThemeProvider" 
import FazCapitalBranding from "@/components/branding/DashboardBranding"
import { useUserSession } from "@/context/UserSessionContext"

export default function DefaultAppBar({ 
    handleDrawerToggle 
}: {
    drawerOpen: boolean
    handleDrawerToggle: () => void
}) {
    const muiTheme = useMuiTheme()
    const { toggleDrawer: toggleThemeDrawer } = useTheme()
    const { session } = useUserSession()

    const isVisible = React.useMemo(() => {
        return session?.user?.name !== undefined && session?.user?.name !== null
    }, [session?.user?.name])
    
    return (
        <AppBar 
            position="sticky" 
            color="primary"
            enableColorOnDark
            sx={{ 
                zIndex: muiTheme.zIndex.drawer + 1,
                transition: muiTheme.transitions.create(['margin', 'width'], {
                    easing: muiTheme.transitions.easing.sharp,
                    duration: muiTheme.transitions.duration.leavingScreen,
                }),
            }}
        >
            <Toolbar>
                {isVisible && (
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerToggle}
                        edge="start"
                        sx={{ mr: 2, ...(muiTheme.mixins.toolbar) }}
                    >
                        <MenuOutlined />
                    </IconButton>
                )}

                <Box component="span" sx={{ flexGrow: 1 }}>
                    <FazCapitalBranding />
                </Box>
                
                <IconButton
                    color="inherit"
                    aria-label="theme settings"
                    onClick={toggleThemeDrawer}
                    edge="end"
                >
                    <Settings />
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}