import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ActivityIndicator,
  Button,
  Card,
  Dialog,
  IconButton,
  Portal,
  useTheme,
} from 'react-native-paper';
import {Customer} from '../common/Customer';
import {SwipeableItem} from '../components/Swipeable';
import WrapperContainer from '../components/WrapperContainer';
import {RootStackParamList} from '../Navigation/Stack';
import PullToRefreshWrapper from '../components/RefereshScreen';
import Dailogs from '../components/Dailogs';
const theme = useTheme();
const Customers = () => {
  const theme = useTheme();
  const [data, setData] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCustomer, setSelectedCustomer] =
    React.useState<Customer | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const route =
    useRoute<RouteProp<{params: {customerID: string; Name: string}}>>();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const getData = (
    onSuccess: (res: any) => void,
    onFailure: (res: any) => void,
  ) => {
    Customer.GetCustomerList(
      (res: any) => {
        onSuccess(res);
      },
      (err: any) => {
        onFailure(err);
      },
    );
  };

  const getallCustomer = React.useCallback(() => {
    setLoading(true);
    getData(
      res => {
        if (res.length) {
          setData(res);
        }
        setLoading(false);
      },
      err => {
        console.log(err);
        setLoading(false);
      },
    );
  }, []);

  useEffect(() => {
    getallCustomer();
  }, []);

  const handleAddLicense = (id: string) => {
    navigation.navigate('AddLicense', {id});
  };

  const Editdata = (objCustomer: Customer) => {
    navigation.navigate('Addcustomer', {objCustomer});
  };

  const Onremove = (id: string) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this customer?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            Customer.DeleteCustomer(
              id,
              (res: any) => {
                Alert.alert(res, 'Successfully Deleted');
                getallCustomer();
              },
              (err: any) => {
                const errorMessage =
                  typeof err === 'string' ? err : JSON.stringify(err);
                Alert.alert(errorMessage, 'on close');
              },
            );
          },
        },
      ],
    );
  };
  const handleLice = (id: string) => {
    navigation.navigate('AddLicense', {id});
  };

  const openDetailsDialog = (data: Customer) => {
    setSelectedCustomer(data);
  };

  const closeDialog = () => {
    setSelectedCustomer(null);
  };

  const OpenLice = (customerID: string) => {
    navigation.navigate('CustomerLicense', {customerID});
  };

  const onRefresh = () => {
    setRefreshing(true);
    getData(
      res => {
        if (res.length) {
          setData(res);
        }
        setRefreshing(false);
      },
      err => {
        console.log(err);
        setRefreshing(false);
      },
    );
  };
  return (
    <WrapperContainer>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator
            size="small"
            animating={true}
            color={theme.colors.primary}
          />
        </View>
      ) : (
        <PullToRefreshWrapper
          refreshing={refreshing}
          onRefresh={onRefresh}
          loading={loading}>
          {data.map((item: Customer) => (
            <SwipeableItem
              key={item.id}
              onDelete={() => {
                Onremove(item.id);
              }}
              onEdit={() => Editdata(item)}>
              <Card style={styles.card}>
                <TouchableOpacity onPress={() => openDetailsDialog(item)}>
                  <Card.Content style={{padding: 0, margin: 0}}>
                    <Text style={styles.cardText}>{item.name}</Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        bottom: 25,
                      }}>
                      <IconButton
                        icon={require('../assets/License.png')}
                        onPress={() => OpenLice(item.id)}
                      />
                      <IconButton
                        icon={require('../assets/License.png')}
                        onPress={() => handleLice(item.id)}
                      />
                    </View>
                  </Card.Content>
                </TouchableOpacity>
              </Card>
            </SwipeableItem>
          ))}
        </PullToRefreshWrapper>
      )}
      <Portal>
        <Dialog visible={selectedCustomer !== null} onDismiss={closeDialog}>
          <Dialog.Title>Customer Details</Dialog.Title>
          <Dialog.Content>
            {selectedCustomer && (
              <View>
                <Text style={{fontFamily: 'sans-serif'}}>
                  Name: {selectedCustomer.address}
                  {'\n'}
                  Address: {selectedCustomer.city}
                  {'\n'}
                  Country:{selectedCustomer.country}
                  {'\n'}
                  Contact: {selectedCustomer.contactinfo}
                  {'\n'}
                </Text>
              </View>
            )}
          </Dialog.Content>
        </Dialog>
      </Portal>
    </WrapperContainer>
  );
};
export default Customers;
const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: theme.colors.background,
  },
  cardText: {
    fontSize: 20,
    fontWeight: 'bold',
    top: 10,
    color: theme.colors.onSurface,
  },
});
