import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BootSplash from 'react-native-bootsplash';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import DrawerNavigator from '../Navigation/DrawerNavigator';
import Login from '../components/Login';

const RootStack = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer onReady={() => BootSplash.hide({ fade: true })}>
      <SafeAreaProvider>
        {!isLoggedIn ? (
          <Login onLoginSuccess={() => setIsLoggedIn(true)} />
        ) : (
          <DrawerNavigator />
        )}
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default RootStack;
