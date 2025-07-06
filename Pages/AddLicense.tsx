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
import {Button, TextInput, useTheme} from 'react-native-paper';
import {Dropdown} from 'react-native-paper-dropdown';
import uuid from 'react-native-uuid';
import {z} from 'zod';
import {License} from '../common/License';
import {showFlash} from '../components/Flash';
import FormProvider from '../hooks/FormProvider';
import {RootStackParamList} from '../Navigation/Stack';
import Textinput from '../hooks/Textinput';
import WrapperContainer from '../components/WrapperContainer';

const NewLicense = z.object({
  licenseid: z.string(),
  customerid: z.string(),
  type: z.number(),
  displayname: z.string(),
  licensedays: z.number(),
  maxactivation: z.number(),
  status: z.number(),
  activatedon: z.string(),
  expirydate: z.string(),
});
const theme = useTheme();
const AddLicense = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const route =
    useRoute<RouteProp<{params: {id: string; objLicense: License}}>>();

  const {params} = route;

  const {objLicense, id} = route.params;
  const methods = useForm<License>({
    resolver: zodResolver(NewLicense) as any,
    defaultValues: objLicense || {
      licenseid: '',
      customerid: '',
      type: 0,
      displayname: '',
      licensedays: 0,
      maxactivation: 0,
      status: 1,
      activatedon: '',
      expirydate: '',
    },
  });

  const option = [
    {label: 'Regular', value: '1'},
    {label: 'Special', value: '2'},
  ];

  const onSubmit = (data: License) => {
    if (data.licenseid === '') {
      data.licenseid = uuid.v4();
      data.customerid = params!.id;
      if (
        data.customerid === '' ||
        data.customerid === undefined ||
        data.customerid === null
      ) {
        Alert.alert('Id is Empty');
        return;
      }
      License.CreateLicense(
        data,
        (res: License) => {
          console.log('License created successfully:', res);
          showFlash('License created successfully', 'success');
          navigation.navigate('Dashbord', {screen: 'Customers'});
          // Alert.alert('License created successfully', JSON.stringify(res));
        },
        (err: string) => {
          console.error('Error creating license:', err);
          Alert.alert('Error creating license:', err);
        },
      );
    } else {
      License.updateLicense(
        data,
        (res: License) => {
          Alert.alert('Customer updated successfully', JSON.stringify(res));
          console.log('Customer updated:', res);
        },
        (err: string) => {
          Alert.alert('Failed to update customer', err);
        },
      );
    }
  };

  return (
    <WrapperContainer>
      <FormProvider methods={methods}>
        <Controller
          control={methods.control}
          name="type"
          render={({field}) => (
            <Dropdown
              label="Type"
              placeholder="Select Type"
              options={option}
              value={String(field.value)}
              onSelect={value => {
                field.onChange(parseInt(value || '0', 10));
              }}
            />
          )}
        />
        <Controller
          control={methods.control}
          name="displayname"
          render={({field}) => (
            <TextInput
              label="displayname"
              mode="outlined"
              style={{margin: 10, backgroundColor: theme.colors.onBackground}}
              onChangeText={field.onChange}
              value={field.value}
              error={!!methods.formState.errors.displayname}
              placeholder="Enter your License Name"
            />
          )}
        />
        <Controller
          control={methods.control}
          name="licensedays"
          render={({field}) => (
            <TextInput
              label="License Days"
              mode="outlined"
              style={{margin: 10, backgroundColor: theme.colors.onBackground}}
              onChangeText={text => field.onChange(parseInt(text, 100) || 0)}
              keyboardType="numeric"
              value={String(field.value)}
              error={!!methods.formState.errors.licensedays}
              placeholder="Enter your Liceance Days"
            />
          )}
        />
        <Controller
          control={methods.control}
          name="maxactivation"
          render={({field}) => (
            <TextInput
              label="Max Activation"
              mode="outlined"
              style={{margin: 10, backgroundColor: theme.colors.onBackground}}
              onChangeText={text => field.onChange(parseInt(text, 10) || 0)}
              value={String(field.value)}
              keyboardType="numeric"
              error={!!methods.formState.errors.maxactivation}
              placeholder="Enter your maxactivation"
            />
          )}
        />
        <Textinput name={'displayname'} placeholder="Enter your License Name" />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignContent: 'center',
          }}>
          <Button
            mode="contained"
            onPress={methods.handleSubmit(onSubmit)}
            style={[
              styles.Button,
              {backgroundColor: theme.colors.onBackground},
            ]}>
            Submit
          </Button>
          <Button
            mode="contained"
            style={[
              styles.Button,
              {backgroundColor: theme.colors.onBackground},
            ]}
            onPress={() => {
              navigation.navigate('Dashbord', {screen: 'customers'});
            }}>
            Cancel
          </Button>
        </View>
      </FormProvider>
    </WrapperContainer>
  );
};
export default AddLicense;
const styles = StyleSheet.create({
  constainer: {
    flex: 1,
  },
  Button: {
    borderRadius: 0,
    width: '45%',
  },
});
