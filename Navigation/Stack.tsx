import {
  DrawerActions,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Icon, useTheme} from 'react-native-paper';
import {Customer} from '../../../../../../../../Andriods/New_Licenace/common/Customer';
import {License} from '../../../../../../../../Andriods/New_Licenace/common/License';
import Addcustomer from '../../../../../../../../Andriods/New_Licenace/Pages/Addcustomer';
import AddLicense from '../../../../../../../../Andriods/New_Licenace/Pages/AddLicense';
import CustomerLicense from '../../../../../../../../Andriods/New_Licenace/Pages/CustomerLicense';
import Licenses from '../../../../../../../../Andriods/New_Licenace/Pages/Licenses';
import BottomTabs from './Bottom';

export type RootStackParamList = {
  AddLicense: {id: string; objLicense?: License};
  Addcustomer: {objCustomer?: Customer};
  Dashbord: {screen: string} | undefined;
  Customers: {screen: string} | undefined;
  Licenses: {customerID: string};
  Login: undefined;
  CustomerLicense: {customerID: string};
};

const Stack = createNativeStackNavigator();

const StackRouting = () => {
  const theme = useTheme();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={BottomTabs}
        options={{headerShown: false, headerTintColor: theme.colors.onSurface}}
      />

      <Stack.Screen
        name="Addcustomer"
        component={Addcustomer}
        options={({navigation}) => ({
          tabBarStyle: {display: theme.colors.onSurface},
          title: 'Add Customer',
          headerShown: true,
          headerStyle: {
            backgroundColor: theme.colors.surface,
          },
          headerTintColor: theme.colors.onSurface,
          headerShadowVisible: true,
          contentStyle: {
            backgroundColor: theme.colors.background,
          },
        })}
      />

      <Stack.Screen
        name="AddLicense"
        component={AddLicense}
        options={({navigation}) => ({
          tabBarStyle: {display: 'none'},
          title: 'Add License',
          headerShown: true,
          headerStyle: {
            backgroundColor: theme.colors.surface,
          },
          headerTintColor: theme.colors.onSurface,
          headerShadowVisible: true,
          contentStyle: {
            backgroundColor: theme.colors.background,
          },
        })}
      />

      <Stack.Screen
        name="Licenses"
        component={Licenses}
        options={{title: 'Licenses'}}
      />
      <Stack.Screen
        name="CustomerLicense"
        component={CustomerLicense}
        options={{title: 'Customer License'}}
      />
    </Stack.Navigator>
  );
};

export default StackRouting;
