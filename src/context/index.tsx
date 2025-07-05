"use client";

import { ThemeProvider } from "@/theme/ThemeProvider";
import { SessionProvider } from "next-auth/react";
import { UserSessionProvider } from "@/context/UserSessionContext";
import { DrawerProvider } from "@/context/DrawerContext";   

export default function MainProvider({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <ThemeProvider>
            <SessionProvider>
                <UserSessionProvider>
                    <DrawerProvider>
                            {children}
                    </DrawerProvider>
                </UserSessionProvider>
            </SessionProvider>
        </ThemeProvider>
    );
}