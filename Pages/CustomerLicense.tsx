import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
  StatusBar,
} from 'react-native';
import {Button, Card, Dialog, Portal, useTheme} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {License} from '../common/License';
import {SwipeableItem} from '../components/Swipeable';
import {RootStackParamList} from '../Navigation/Stack';
import WrapperContainer from '../components/WrapperContainer';
import PullToRefreshWrapper from '../components/RefereshScreen';
const theme = useTheme();
export default function CustomerLicense() {
  const [licenses, setLicenses] = useState<License[]>([]);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedLicense, setSelectedLicense] = React.useState<License | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<{params: {customerID: string}}>>();
  const {customerID} = route.params;
  const theme = useTheme();

  const customerLicense = () => {
    License.getCustomerLicenseList(
      customerID,
      (res: any) => {
        setLicenses(res);
        setLoading(false);
      },
      (err: any) => {
        setError(err);
        setLoading(false);
      },
    );
  };

  useEffect(() => {
    if (customerID) {
      customerLicense();
    }
  }, [customerID]);

  const openDetailsDialog = (license: License) => {
    setSelectedLicense(license);
  };

  const closeDialog = () => {
    setSelectedLicense(null);
  };

  const Onremove = (licenseID: string) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this customer?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            License.deleteCustomerLicense(
              licenseID,
              customerID,
              (res: any) => {
                Alert.alert(res, 'Successfully Deleted');
                customerLicense();
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

  return (
    <WrapperContainer>
      {' '}
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={theme.colors.onSurface} />
        </View>
      ) : (
        <PullToRefreshWrapper
          refreshing={refreshing}
          onRefresh={customerLicense}
          loading={loading}>
          {licenses.map((item: License) => (
            <SwipeableItem
              key={item.licenseid}
              onDelete={() => {
                Onremove(item.licenseid);
              }}
              onEdit={() => {}}>
              <Card style={styles.card}>
                <TouchableOpacity onPress={() => openDetailsDialog(item)}>
                  <Card.Content>
                    <Text
                      style={{
                        top: 10,
                      }}>
                      {item.displayname}
                    </Text>
                    <View
                      style={{
                        alignItems: 'flex-end',
                        top: 20,
                      }}>
                      <Text style={{fontSize: 10}}>
                        Expire {item.expirydate}
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 15,
                      }}>
                      {item.expirydate}
                    </Text>
                  </Card.Content>
                </TouchableOpacity>
              </Card>
            </SwipeableItem>
          ))}
        </PullToRefreshWrapper>
      )}
      <Portal>
        <Dialog visible={selectedLicense !== null} onDismiss={closeDialog}>
          <Dialog.Title>License Details</Dialog.Title>
          <Dialog.Content>
            {selectedLicense && (
              <View>
                <Text style={{color: 'white', fontFamily: 'sans-serif'}}>
                  Type: {selectedLicense.type == 0 ? 'reguler' : ' other'}
                  {'\n'}
                  License Days: {selectedLicense.licensedays}
                  {'\n'}
                  Max Activation: {selectedLicense.maxactivation}
                  {'\n'}
                  Status: {selectedLicense.status == 1 ? 'Active' : 'Inactive'}
                  {'\n'}
                  Activated On:{' '}
                  {
                    (selectedLicense.activatedon = false
                      ? 'Active'
                      : 'Inactive')
                  }
                  {'\n'}
                  Expiry Date: {selectedLicense.expirydate}
                </Text>
              </View>
            )}
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={closeDialog}>Close</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </WrapperContainer>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    marginBottom: 12,
    borderRadius: 8,
    elevation: 5,
    height: 50,
    backgroundColor: theme.colors.onSurface,
  },
  cardText: {
    fontSize: 25,
    fontWeight: 'bold',
    backgroundColor: theme.colors.onSurface,
  },
  dialogContentText: {
    marginBottom: 8,
    fontSize: 15,
  },
});
