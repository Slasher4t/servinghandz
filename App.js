// App.js

import React from 'react';
import { Provider as PaperProvider, DefaultTheme, DarkTheme } from 'react-native-paper';
import { LogBox } from 'react-native';
import { ThemeProvider } from './src/context/ThemeContext';
import useThemeContext from './src/context/useThemeContext';
import AppNavigator from './src/navigation/AppNavigator';

LogBox.ignoreLogs([
  'AsyncStorage has been extracted',
  'Setting a timer for a long period of time',
]);

const CustomLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#52228e',
    accent: '#a187d3',
    background: '#ffffff',
    surface: '#ffffff',
    text: '#000000',
    card: '#f5f5f5',
    placeholder: '#888'
  },
};

const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#a187d3',
    accent: '#52228e',
    background: '#121212',
    surface: '#1e1e1e',
    text: '#ffffff',
    card: '#1f1f1f',
    placeholder: '#aaa'
  },
};

function Main() {
  const { isDark } = useThemeContext();
  const theme = isDark ? CustomDarkTheme : CustomLightTheme;

  return (
    <PaperProvider theme={theme}>
      <AppNavigator />
    </PaperProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Main />
    </ThemeProvider>
  );
}