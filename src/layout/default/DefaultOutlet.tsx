"use client"

import { useState, useEffect } from "react"
import { Box } from "@mui/material"
import DefaultAppBar from "./DefaultAppBar"
import DefaultDrawer from "./DefaultDrawer"
import ThemeDrawer from "@/components/theme/ThemeDrawer"
import { useDrawer } from "@/context/DrawerContext"

export default function DefaultOutlet({
    children,
}: {
    children: React.ReactNode
}) {
    const [mounted, setMounted] = useState(false)
    const { isOpen, toggleDrawer } = useDrawer()


    useEffect(() => {
        setMounted(true)
    }, [])  

    if (!mounted) {
        return null
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <DefaultAppBar drawerOpen={isOpen} handleDrawerToggle={toggleDrawer} />
            <Box sx={{ display: 'flex', flex: 1 }}>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        transition: theme => theme.transitions.create('margin', {
                            easing: theme.transitions.easing.sharp,
                            duration: theme.transitions.duration.leavingScreen,
                        }),
                        marginLeft: 0,
                        ...(isOpen && {
                            transition: theme => theme.transitions.create('margin', {
                                easing: theme.transitions.easing.easeOut,
                                duration: theme.transitions.duration.enteringScreen,
                            }),
                        }),
                    }}
                >
                    <DefaultDrawer open={isOpen} handleDrawerToggle={toggleDrawer} />
                    <Box
                        sx={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            bgcolor: 'rgba(0, 0, 0, 0.5)',
                            backdropFilter: 'blur(4px)',
                            zIndex: theme => theme.zIndex.drawer - 1,
                            display: isOpen ? 'block' : 'none',
                        }}
                        onClick={toggleDrawer}
                    />
                    {children}
                </Box>
            </Box>
            <ThemeDrawer />
        </Box>
    )
}