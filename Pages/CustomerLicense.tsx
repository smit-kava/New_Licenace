import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, Card, Dialog, Portal, useTheme} from 'react-native-paper';
import {License} from '../common/License';
import {SwipeableItem} from '../components/Swipeable';
import {RootStackParamList} from '../Navigation/Stack';
import WrapperContainer from '../components/WrapperContainer';
import PullToRefreshWrapper from '../components/RefereshScreen';
  const theme = useTheme();
export default function CustomerLicense() {
  const theme = useTheme();


  const [licenses, setLicenses] = useState<License[]>([]);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedLicense, setSelectedLicense] = useState<License | null>(null);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<{params: {customerID: string}}>>();
  const {customerID} = route.params;

  useEffect(() => {
    if (customerID) {
      customerLicense();
    }
  }, [customerID]);

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
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      ) : (
        <PullToRefreshWrapper
          refreshing={refreshing}
          onRefresh={customerLicense}
          loading={loading}>
          {licenses.map((item: License) => (
            <SwipeableItem
              key={item.licenseid}
              onDelete={() => Onremove(item.licenseid)}
              onEdit={() => {}}>
              <Card style={styles.card}>
                <TouchableOpacity onPress={() => openDetailsDialog(item)}>
                  <Card.Content>
                    <Text style={styles.titleText}>{item.displayname}</Text>
                    <View style={styles.rightAlign}>
                      <Text style={styles.smallText}>
                        Expire {item.expirydate}
                      </Text>
                    </View>
                    <Text style={styles.dateText}>{item.expirydate}</Text>
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
                <Text style={styles.dialogText}>
                  Type: {selectedLicense.type == 0 ? 'Regular' : 'Other'}
                  {'\n'}
                  License Days: {selectedLicense.licensedays}
                  {'\n'}
                  Max Activation: {selectedLicense.maxactivation}
                  {'\n'}
                  Status: {selectedLicense.status == 1 ? 'Active' : 'Inactive'}
                  {'\n'}
                  Activated On:{' '}
                  {selectedLicense.activatedon ? 'Active' : 'Inactive'}
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

// Dynamic styles based on theme
const styles = StyleSheet.create({
    loaderContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    card: {
      marginBottom: 12,
      borderRadius: 8,
      elevation: 5,
      backgroundColor: theme.colors.surface,
    },
    titleText: {
      top: 10,
      color: theme.colors.onSurface,
    },
    rightAlign: {
      alignItems: 'flex-end',
      top: 20,
    },
    smallText: {
      fontSize: 10,
      color: theme.colors.onSurface,
    },
    dateText: {
      fontSize: 15,
      color: theme.colors.onSurface,
    },
    dialogText: {
      color: theme.colors.onSurface,
      fontSize: 14,
    },
  });
