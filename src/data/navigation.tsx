import React from "react";
import { 
    DashboardOutlined, 
    SignalCellularAltOutlined,
    AccountCircle,
    GitHub,
    LinkedIn
} from "@mui/icons-material";

export type Navigation = {
    type?: 'divider' | 'header' | 'external' | null;
    path?: string;
    title?: string;
    icon?: React.ReactNode;
    children?: Navigation[];
};

export const navigationObject: Navigation[] = [
    {
        type: 'header',
        title: "Principais"
    },
    {
        path: '/',
        title: 'Dashboard',
        icon: <DashboardOutlined />,
    },
    {
        path: '/graphs',
        title: 'Gráficos',
        icon: <SignalCellularAltOutlined />,
    },
    {
        type: 'divider',
    },
    {
        type: 'header',
        title: "Gerenciamento"
    },
    {
        path: '/profile',
        title: 'Perfil',
        icon: <AccountCircle />,
    },
    {
        type: 'divider',
    },
    {
        type: 'header',
        title: "Links Externos"
    },
    {
        type: "external",
        title: "GitHub",
        path: "https://github.com/VicourtBitt",
        icon: <GitHub />
    },
    {
        type: 'external',
        title: "LinkedIn",
        path: "https://www.linkedin.com/in/vicourtbitt/",
        icon: <LinkedIn />
    }
]