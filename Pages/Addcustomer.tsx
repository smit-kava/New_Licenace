/* eslint-disable react-native/no-inline-styles */
import {zodResolver} from '@hookform/resolvers/zod';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Alert, StatusBar, StyleSheet, View} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import {Button, TextInput, useTheme} from 'react-native-paper';
import uuid from 'react-native-uuid';
import {z} from 'zod';
import {Customer} from '../common/Customer';
import {showFlash} from '../components/Flash';
import FormProvider from '../hooks/FormProvider';
import {RootStackParamList} from '../Navigation/Stack';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import WrapperContainer from '../components/WrapperContainer';

const NewCustomer = z.object({
  id: z.string(),
  name: z.string().min(1, 'Name is required'),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  contactinfo: z.string().optional(),
});
const theme = useTheme();

export default function AddCustomer() {
  const route = useRoute<RouteProp<{params: {objCustomer: Customer}}>>();
  const {objCustomer} = route.params;

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const onSubmit = (cust: Customer) => {
    if (cust.id === '') {
      cust.id = uuid.v4() as string;
      Customer.CreateCustomer(
        cust,
        (res: Customer) => {
          showFlash('Customer created successfully', 'green', 'success');
          navigation.navigate('Customers');
          console.log('Customer created successfully', res);
        },
        (err: string) => {
          showFlash('Error creating customer', 'red', 'warning');
          console.log('Error creating customer', err);
        },
      );
    } else {
      Customer.UpdateCustomer(
        cust,
        (res: Customer) => {
          Alert.alert('Customer updated successfully');
          navigation.navigate('Dashbord', {screen: 'Dashbord'});
          console.log('Customer updated:', res);
        },
        (err: string) => {
          Alert.alert('Failed to update customer', err);
        },
      );
    }
  };
  const methods = useForm<Customer>({
    resolver: zodResolver(NewCustomer) as any,
    defaultValues: objCustomer || {
      id: '',
      name: '',
      address: '',
      city: '',
      country: '',
      contactinfo: '',
    },
  });

  return (
    <WrapperContainer>
        <FormProvider methods={methods}>
          <Controller
            control={methods.control}
            name="name"
            render={({field}) => (
              <TextInput
                label="Name"
                mode="outlined"
                style={{margin: 10}}
                onChangeText={field.onChange}
                value={field.value}
                error={!!methods.formState.errors.name}
                placeholder="Enter your Customer Name"
              />
            )}
          />
          <Controller
            control={methods.control}
            name="address"
            render={({field}) => (
              <TextInput
                label="Address"
                mode="outlined"
                style={{margin: 10}}
                onChangeText={field.onChange}
                value={field.value}
                error={!!methods.formState.errors.address}
                placeholder="Enter your Address"
              />
            )}
          />
          <Controller
            control={methods.control}
            name="city"
            render={({field}) => (
              <TextInput
                label="City"
                mode="outlined"
                style={{margin: 10}}
                onChangeText={field.onChange}
                value={field.value}
                error={!!methods.formState.errors.city}
                placeholder="Enter your City"
              />
            )}
          />
          {/* Country Input */}
          <Controller
            control={methods.control}
            name="country"
            render={({field}) => (
              <TextInput
                label="Country"
                mode="outlined"
                style={{margin: 10}}
                onChangeText={field.onChange}
                value={field.value}
                error={!!methods.formState.errors.country}
                placeholder="Enter your Country"
              />
            )}
          />
          {/* Contact Info Input */}
          <Controller
            control={methods.control}
            name="contactinfo"
            render={({field}) => (
              <TextInput
                label="Contact Info"
                mode="outlined"
                keyboardType="phone-pad"
                style={{margin: 10}}
                onChangeText={field.onChange}
                value={field.value}
                error={!!methods.formState.errors.contactinfo}
                placeholder="Enter your contact info"
              />
            )}
          />
          <View style={styles.Buttoncontainer}>
            <Button
              mode="outlined"
              onPress={methods.handleSubmit(onSubmit)}
              style={styles.Button}>
              Submit
            </Button>
            <Button
              mode="outlined"
              style={styles.Button}
              onPress={() => {
                  //  navigation.navigate('Dashbord', {screen: 'Dashboard'});
              }}>
              cancel
            </Button>
          </View>
          <FlashMessage duration={10} position={'top'} autoHide />
        </FormProvider>
      </WrapperContainer>
  );
}
const styles = StyleSheet.create({
  Buttoncontainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
  },
  Button: {
    borderRadius: 0,
    width: '45%',
  },
});
