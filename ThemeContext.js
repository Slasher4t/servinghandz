import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const STORAGE_KEY = 'userThemePreference';

  // Load theme preference on mount
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedValue = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedValue !== null) {
          setIsDark(storedValue === 'true');
        }
      } catch (e) {
        console.log('Failed to load theme:', e);
      }
    };
    loadTheme();
  }, []);

  // Save preference on change
  const toggleTheme = async () => {
    try {
      const newValue = !isDark;
      setIsDark(newValue);
      await AsyncStorage.setItem(STORAGE_KEY, newValue.toString());
    } catch (e) {
      console.log('Failed to save theme:', e);
    }
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
