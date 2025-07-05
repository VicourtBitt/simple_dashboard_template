"use client";

import * as React from "react";
import { createTheme, ThemeProvider as MUIThemeProvider, CssBaseline, useMediaQuery } from "@mui/material";
import { createContext, useContext, useMemo, useState, useEffect, useCallback } from "react";
import "@fontsource/inter";
import "@fontsource/roboto";
import "@fontsource/montserrat";
import "@fontsource/poppins";
import "@fontsource/merriweather";

// Import your color constants if available
import { 
  PRIMARY,
  SECONDARY,
  RED_BURGUNDY,
  RED_CORAL,
  COLORBLIND_PURPLE_GOLD,
  COLORBLIND_PURPLE_GOLD_SECONDARY,
  COLORBLIND_PINK_CYAN_SECONDARY,
  COLORBLIND_PINK_CYAN
} from "@/theme/theme";

export type Font = "inter" | "roboto" | "montserrat" | "poppins" | "merriweather";
export type ThemeMode = "light" | "dark";
export type ColorTheme = 'red' | 'red-burgundy' | 'red-coral' | 'deuteranopia' | 'tritanopia';

interface ThemeContextType {
  themeMode: ThemeMode;
  toggleTheme: () => void;
  font: Font;
  setFont: (font: Font) => void;
  drawerOpen: boolean;
  toggleDrawer: () => void;
  colorTheme: ColorTheme;
  setColorTheme: (theme: ColorTheme) => void;
  theme: ReturnType<typeof createTheme>;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const colorThemes: Record<ColorTheme, { primary: typeof PRIMARY; secondary: typeof SECONDARY }> = {
  red: { 
    primary: { ...PRIMARY, main: '#e60f46', dark: '#b40030', light: '#f7939f' }, 
    secondary: SECONDARY 
  },
  // Red variants
  'red-burgundy': { 
    primary: RED_BURGUNDY, 
    secondary: SECONDARY 
  },
  'red-coral': { 
    primary: RED_CORAL, 
    secondary: SECONDARY 
  },
  // Colorblind-friendly themes
  'deuteranopia': { 
    primary: COLORBLIND_PURPLE_GOLD, 
    secondary: COLORBLIND_PURPLE_GOLD_SECONDARY 
  },
  'tritanopia': { 
    primary: COLORBLIND_PINK_CYAN, 
    secondary: COLORBLIND_PINK_CYAN_SECONDARY 
  }
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // Use system preference for dark mode as fallback
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  // Initialize states from localStorage or fallback values
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("themeMode") as ThemeMode;
      return saved || (prefersDarkMode ? "dark" : "light");
    }
    return "light";
  });
  
  const [font, setFont] = useState<Font>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("font") as Font;
      return saved || "inter";
    }
    return "inter";
  });
  
  const [colorTheme, setColorTheme] = useState<ColorTheme>(() => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("colorTheme") as ColorTheme;
    const validThemes = Object.keys(colorThemes) as ColorTheme[];
    // Check if the saved theme is valid before returning it
    if (saved && validThemes.includes(saved)) {
      return saved;
    }
  }
  // Fallback to a default theme if no valid theme is saved
  return "red"; 
});
  
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Persist preferences to localStorage
  useEffect(() => {
    localStorage.setItem("themeMode", themeMode);
  }, [themeMode]);

  useEffect(() => {
    localStorage.setItem("font", font);
  }, [font]);

  useEffect(() => {
    localStorage.setItem("colorTheme", colorTheme);
  }, [colorTheme]);

  const toggleTheme = useCallback(() => {
    setThemeMode((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  const toggleDrawer = useCallback(() => {
    setDrawerOpen((prev) => !prev);
  }, []);

  const setFontHandler = useCallback((newFont: Font) => {
    setFont(newFont);
  }, []);

  const setColorThemeHandler = useCallback((newColorTheme: ColorTheme) => {
    setColorTheme(newColorTheme);
  }, []);

  // Define font mapping
  const fontHandler = useMemo(() => ({
    inter: '"Inter", sans-serif',
    roboto: '"Roboto", sans-serif',
    montserrat: '"Montserrat", sans-serif',
    poppins: '"Poppins", sans-serif',
    merriweather: '"Merriweather", serif',
  }), []);

  const fontFamily = useMemo(() => fontHandler[font] || fontHandler.inter, [font, fontHandler]);

  // Create theme based on selected color theme and font
  const theme = useMemo(() => {
    const selectedColors = colorThemes[colorTheme];
    return createTheme({
      palette: {
        mode: themeMode,
        primary: selectedColors.primary,
        secondary: selectedColors.secondary,
      },
      typography: {
        fontFamily: fontFamily,
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              fontFamily: fontFamily,
            },
          },
        },
      },
    });
  }, [themeMode, fontFamily, colorTheme]);

  const themeContextValue = useMemo(() => ({
    themeMode,
    toggleTheme,
    font,
    setFont: setFontHandler,
    drawerOpen,
    toggleDrawer,
    colorTheme,
    setColorTheme: setColorThemeHandler,
    theme,
  }), [themeMode, font, drawerOpen, colorTheme, theme, toggleTheme, toggleDrawer, setFontHandler, setColorThemeHandler]);

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
};