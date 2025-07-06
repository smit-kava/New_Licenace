import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import Profile from '../Pages/Profile';
import HomeStack from './Stack'; // This should include your BottomTabs + other stack screens
import WrapperContainer from '../components/WrapperContainer';
import {useTheme} from 'react-native-paper';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const theme = useTheme();
  return (
    <WrapperContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          headerStyle: {
            height: 'auto',
            width: 'auto',
          },
        }}>
        <Drawer.Screen
          name="Home"
          component={HomeStack}
          options={{title: 'Dashboard'}}
        />
        <Drawer.Screen
          name="Profile"
          component={Profile}
          
          options={{
              headerTintColor: theme.colors.onSurface,
            headerStyle: {
              height: 100,
              width: 100,
        backgroundColor: theme.colors.background,
            },
            headerShown: true,
            title: 'User Profile',
          }}
        />
      </Drawer.Navigator>
    </WrapperContainer>
  );
};

export default DrawerNavigator;
