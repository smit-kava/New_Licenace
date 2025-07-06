/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import {PaperProvider} from 'react-native-paper';
import {ThemeProvider, useThemeContext} from './theme/ThemeContext';
import {BootWrapper} from './Splashscreen/BootWrapper';

function MainApp() {
  const {theme} = useThemeContext();
  return (
    <PaperProvider theme={theme}>
      <BootWrapper />
    </PaperProvider>
  );
}

function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}

export default App;
