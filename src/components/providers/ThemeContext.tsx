'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { PaletteMode, Theme } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createAppTheme } from '@/theme';

// Define the shape of the theme context
interface ThemeContextType {
  mode: PaletteMode;
  toggleColorMode: () => void;
  theme: Theme;
}

// Create the theme context with a default value
const ThemeContext = createContext<ThemeContextType>({
  mode: 'light',
  toggleColorMode: () => {},
  theme: createAppTheme('light'),
});

// Custom hook to use the theme context
export const useThemeContext = () => useContext(ThemeContext);

// ThemeProvider component
export const ThemeModeProvider = ({ children }: { children: React.ReactNode }) => {
  // Check if we have a saved theme preference in localStorage
  const [mode, setMode] = useState<PaletteMode>('light');
  const [theme, setTheme] = useState<Theme>(createAppTheme('light'));

  // Effect to initialize theme from localStorage on mount (client-side only)
  useEffect(() => {
    const savedMode = localStorage.getItem('themeMode') as PaletteMode;
    if (savedMode) {
      setMode(savedMode);
      setTheme(createAppTheme(savedMode));
    }
  }, []);

  // Toggle between light and dark mode
  const toggleColorMode = () => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('themeMode', newMode);
      setTheme(createAppTheme(newMode));
      return newMode;
    });
  };

  const contextValue = {
    mode,
    toggleColorMode,
    theme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeModeProvider;
