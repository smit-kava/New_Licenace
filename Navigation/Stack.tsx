import {
  DrawerActions,
  NavigationProp,
  useNavigation
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-paper';
import { Customer } from '../common/Customer';
import { License } from '../common/License';
import Addcustomer from '../Pages/Addcustomer';
import AddLicense from '../Pages/AddLicense';
import CustomerLicense from '../Pages/CustomerLicense';
import Licenses from '../Pages/Licenses';
import BottomTabs from './Bottom';

export type RootStackParamList = {
  AddLicense: {id:string; objLicense?: License};
  Addcustomer: {objCustomer?: Customer};
  Dashbord: {screen: string} | undefined;
  Customers: {screen: string} | undefined;
  Licenses: {customerID: string};
  Login: undefined;
  CustomerLicense: {customerID: string};
};

const Stack = createNativeStackNavigator();
const DrawerToggleButton = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <TouchableOpacity
      onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      style={{marginRight: 10}}>
      <Icon source={require('../assets/Menu/menu.png')} size={20} />
    </TouchableOpacity>
  );
};
const StackRouting = () => {
  return (
    <Stack.Navigator>
     
      {/* <Stack.Screen
        name="Tabs"
        component={BottomTabs}
        options={({route}) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? 'Dashbord';
          const titleMap: Record<string, string> = {
            Dashbord: 'Dashboard',
            Customers: 'Customers',
            Decode: 'Decode',
            License: 'Licenses',
          };
          return {
            title: titleMap[routeName] || routeName,
            headerLeft: () => <DrawerToggleButton />,
          };
        }}
      /> */}
<Stack.Screen
  name="Tabs"
  component={BottomTabs}
  options={{ headerShown: false }}
/>
      <Stack.Screen
        name="Addcustomer"
        component={Addcustomer}
        options={{title: 'Add Customer'}}
      />
      <Stack.Screen
        name="AddLicense"
        component={AddLicense}
        options={{title: 'Add License'}}
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
