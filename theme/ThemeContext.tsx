// ThemeContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { darkTheme, lightTheme } from './theme'; // Your existing theme file
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MD3Theme } from 'react-native-paper';

type ThemeContextType = {
  isDarkTheme: boolean;
  toggleTheme: () => void;
  theme: MD3Theme;
};

const ThemeContext = createContext<ThemeContextType>({
  isDarkTheme: false,
  toggleTheme: () => {},
  theme: lightTheme,
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    (async () => {
      const storedTheme = await AsyncStorage.getItem('isDarkTheme');
      if (storedTheme !== null) setIsDarkTheme(storedTheme === 'true');
    })();
  }, []);


  const toggleTheme = () => setIsDarkTheme(prev => !prev);
  const theme = isDarkTheme ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
