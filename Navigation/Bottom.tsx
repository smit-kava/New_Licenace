import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Customers from '../Pages/Customers';
import Dashbord from '../Pages/Dashbord';
import Decode from '../Pages/Decode';
import Licenses from '../Pages/Licenses';
import {Decodes, Groups, License, Menu, Users} from '../assets/Iconify-Icon';
import TabIcon from '../components/TabIcon';
import {Button, Icon, IconButton, useTheme} from 'react-native-paper';
import {
  DrawerActions,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import {RootStackParamList} from './Stack';
import {TouchableOpacity} from 'react-native';

const Tab = createBottomTabNavigator();

const DrawerToggleButton = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <TouchableOpacity
      onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      style={{marginLeft: 10}}>
      <Icon
        source={require('../assets/Menu/menu.png')}
        color={theme.colors.onSurface}
        size={22}
      />
    </TouchableOpacity>
  );
};

const BottomTabs = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        headerTintColor: theme.colors.onSurface,
        headerShown: false,
        headerStyle: {
          backgroundColor: theme.colors.surface,
        },
        tabBarStyle: {
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
          borderRadius: 2,
          backgroundColor: theme.colors.background,
        },
        tabBarItemStyle: {
          padding: 5,
        },
      }}>
      <Tab.Screen
        name="Dashbord"
        component={Dashbord}
        options={{
          headerLeft: () => <DrawerToggleButton />,
          tabBarLabel: '',
          headerShown: true,
          headerStyle: {
            height: 100,
            width: 100,
            backgroundColor: theme.colors.background,
          },
          tabBarIcon: ({focused}) => (
            <TabIcon
              focused={focused}
              Icon={Menu}
              label="Dashbord"
              activeColor="#5d41a5"
              size={28}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Customers"
        component={Customers}
        options={{
          headerTintColor: theme.colors.onSurface,
          headerShown: true,
            headerStyle: {
            height: 100,
            width: 100,
            backgroundColor: theme.colors.background,
          },
          title: 'Customers',
          headerLeft: () => <DrawerToggleButton />,
          headerRight: () => (
            <IconButton
              icon={Users}
              size={20}
              onPress={() =>
                navigation.navigate({name: 'Addcustomer', params: {}})
              }
            />
          ),
          tabBarLabel: '',
          tabBarIcon: ({focused}) => (
            <TabIcon
              focused={focused}
              Icon={Groups}
              label="Customers"
              activeColor="#35b5c0"
              size={28}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Decode"
        component={Decode}
        options={{
            headerStyle: {
            height: 100,
            width: 100,
            backgroundColor: theme.colors.background,
          },
          headerTintColor: theme.colors.onSurface,
          headerLeft: () => <DrawerToggleButton />,
          headerShown: true,
          tabBarLabel: '',
          tabBarIcon: ({focused}) => (
            <TabIcon
              focused={focused}
              Icon={Decodes}
              label="Decode"
              activeColor="#2f7c37"
              size={28}
            />
          ),
        }}
      />
      <Tab.Screen
        name="License"
        component={Licenses}
        options={{
            headerStyle: {
            height: 100,
            width: 100,
            backgroundColor: theme.colors.background,
          },
          headerShown: true,
          tabBarLabel: '',
          headerLeft: () => <DrawerToggleButton />,
          tabBarIcon: ({focused}) => (
            <TabIcon
              focused={focused}
              Icon={License}
              label="License"
              activeColor="#e5cc72"
              size={28}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
