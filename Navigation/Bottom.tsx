import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Customers from '../Pages/Customers';
import Dashbord from '../Pages/Dashbord';
import Decode from '../Pages/Decode';
import Licenses from '../Pages/Licenses';
import {Decodes, Groups, License, Menu, Users} from '../assets/Iconify-Icon';
import TabIcon from '../components/TabIcon';
import {Button, IconButton, useTheme} from 'react-native-paper';
import {DrawerToggleButton} from '@react-navigation/drawer';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from './Stack';

const Tab = createBottomTabNavigator();
const BottomTabs = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
  headerStyle: {
      backgroundColor: theme.colors.surface,   
    },
     headerTintColor: theme.colors.onSurface,
        tabBarStyle: {
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
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
          headerShown: true,
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
