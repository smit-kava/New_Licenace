import {zodResolver} from '@hookform/resolvers/zod';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Alert, StyleSheet, View} from 'react-native';
import {Button, TextInput, useTheme} from 'react-native-paper';
import {Dropdown} from 'react-native-paper-dropdown';
import uuid from 'react-native-uuid';
import {z} from 'zod';
import {License} from '../common/License';
import {showFlash} from '../components/Flash';
import FormProvider from '../hooks/FormProvider';
import {RootStackParamList} from '../Navigation/Stack';
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

const AddLicense = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route =
    useRoute<RouteProp<{params: {id: string; objLicense: License}}>>();
  const {objLicense, id} = route.params;

  const methods = useForm<License>({
    resolver: zodResolver(NewLicense),
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
      data.licenseid = uuid.v4().toString();
      data.customerid = id;
      if (!data.customerid) {
        Alert.alert('Customer ID is empty');
        return;
      }
      License.CreateLicense(
        data,
        (res: License) => {
          showFlash('License created successfully', 'success');
          navigation.goBack();
        },
        (err: string) => {
          Alert.alert('Error creating license', err);
        },
      );
    } else {
      License.updateLicense(
        data,
        (res: License) => {
          Alert.alert('License updated successfully');
        },
        (err: string) => {
          Alert.alert('Failed to update license', err);
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
              onSelect={value => field.onChange(parseInt(value || '0', 10))}
            />
          )}
        />

        {/* Display Name */}
        <Controller
          control={methods.control}
          name="displayname"
          render={({field}) => (
            <TextInput
              label="Display Name"
              mode="outlined"
              style={[styles.input, {backgroundColor: theme.colors.surface}]}
              onChangeText={field.onChange}
              value={field.value}
              error={!!methods.formState.errors.displayname}
              placeholder="Enter license name"
            />
          )}
        />

        {/* License Days */}
        <Controller
          control={methods.control}
          name="licensedays"
          render={({field}) => (
            <TextInput
              label="License Days"
              mode="outlined"
              style={[styles.input, {backgroundColor: theme.colors.surface}]}
              onChangeText={text => field.onChange(parseInt(text, 10) || 0)}
              value={String(field.value)}
              keyboardType="numeric"
              error={!!methods.formState.errors.licensedays}
              placeholder="Enter license duration (days)"
            />
          )}
        />

        {/* Max Activation */}
        <Controller
          control={methods.control}
          name="maxactivation"
          render={({field}) => (
            <TextInput
              label="Max Activation"
              mode="outlined"
              style={[styles.input, {backgroundColor: theme.colors.surface}]}
              onChangeText={text => field.onChange(parseInt(text, 10) || 0)}
              value={String(field.value)}
              keyboardType="numeric"
              error={!!methods.formState.errors.maxactivation}
              placeholder="Enter max activation count"
            />
          )}
        />

        {/* Submit & Cancel Buttons */}
        <View style={styles.buttonRow}>
          <Button
            mode="outlined"
            onPress={methods.handleSubmit(onSubmit)}
            style={[styles.button, {backgroundColor: theme.colors.surface}]}>
            Submit
          </Button>

          <Button
            mode="outlined"
            onPress={() => navigation.goBack()}
            style={[styles.button, {backgroundColor: theme.colors.surface}]}>
            Cancel
          </Button>
        </View>
      </FormProvider>
    </WrapperContainer>
  );
};

export default AddLicense;

const styles = StyleSheet.create({
  input: {
    margin: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    width: '45%',
    borderRadius: 4,
  },
});
