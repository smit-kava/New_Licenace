/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, {useEffect} from 'react';
import {PaperProvider} from 'react-native-paper';
import {ThemeProvider, useThemeContext} from './theme/ThemeContext';
import {BootWrapper} from './Splashscreen/BootWrapper';
import {Platform} from 'react-native';
import {PERMISSIONS, request} from 'react-native-permissions';

function MainApp() {
  useEffect(() => {
    const requestPermissions = async () => {
      if (Platform.OS === 'android') {
        await request(PERMISSIONS.ANDROID.CAMERA);
        await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
      } else {
        await request(PERMISSIONS.IOS.CAMERA);
        await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
      }
    };

    requestPermissions();
  }, []);

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
