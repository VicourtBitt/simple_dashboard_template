"use client"

import * as React from "react";

export interface DrawerContextProps {
    isOpen: boolean;
    toggleDrawer: () => void;
    closeDrawer: () => void;
    openDrawer: () => void;
}

export const DrawerContext = React.createContext<DrawerContextProps | undefined>(undefined);

export const DrawerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const toggleDrawer = () => {
        setIsOpen((prev) => !prev);
    };

    const closeDrawer = () => {
        setIsOpen(false);
    };

    const openDrawer = () => {
        setIsOpen(true);
    };

    return (
        <DrawerContext.Provider value={{ isOpen, toggleDrawer, closeDrawer, openDrawer }}>
            {children}
        </DrawerContext.Provider>
    );
};

export const useDrawer = (): DrawerContextProps => {
    const context = React.useContext(DrawerContext);
    if (!context) {
        throw new Error("useDrawer must be used within a DrawerProvider");
    }
    return context;
};