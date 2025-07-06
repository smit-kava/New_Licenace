import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import {
  ActivityIndicator,
  Button,
  Card,
  Dialog,
  Portal,
  Text,
  useTheme,
} from 'react-native-paper';
import { License } from '../common/License';
import PullToRefreshWrapper from '../components/RefereshScreen';
import { SwipeableItem } from '../components/Swipeable';
import WrapperContainer from '../components/WrapperContainer';
import { RootStackParamList } from '../Navigation/Stack';
const theme = useTheme();
export default function Licenses() {
  const [licenses, setLicenses] = React.useState<License[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedLicense, setSelectedLicense] = React.useState<License | null>(
    null,
  );
   const [refreshing, setRefreshing] = useState(false);
  const route = useRoute<RouteProp<{params: {Name: string}}>>();

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const getData = (
    onSuccess: (res: any) => void,
    onFailure: (res: any) => void,
  ) => {
    License.GetLicenseList(
      (res: any) => {
        onSuccess(Array.isArray(res) ? res : []);
      },
      (err: any) => {
        onFailure(err);
      },
    );
  };

  const getallLicenses = React.useCallback(() => {
    setLoading(true);
    getData(
      res => {
        setLicenses(Array.isArray(res) ? res : []);
        setLoading(false);
      },
      err => {
        console.log(err, {variant: 'error'});
        setLoading(false);
      },
    );
  }, []);

  useEffect(() => {
    getallLicenses();
  }, []);

  const openDetailsDialog = (license: License) => {
    setSelectedLicense(license);
  };

  const closeDialog = () => {
    setSelectedLicense(null);
  };

  const Onremove = (licenseID: string) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this Liceanses?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            License.deleteLicense(
              licenseID,
              (res: any) => {
                console.log(res, 'Successfully Deleted');
                setTimeout(() => {
                  Alert.alert(res, 'Successfully Deleted');
                }, 2000);
                getallLicenses();
              },
              (err: any) => {
                Alert.alert(err, 'Erro Message');
              },
            );
          },
        },
      ],
    );
  };

  const onEdit = (license: License) => {
    navigation.navigate('AddLicense', {
      id: license.licenseid,
      objLicense: license,
    });
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
          onRefresh={getallLicenses}
          loading={loading}>
            {licenses.map((item: License) => (
              <SwipeableItem
                key={item.licenseid}
                onDelete={() => {
                  Onremove(item.customerid);
                }}
                onEdit={() => onEdit(item)}>
                <Card style={styles.card}>
                  <TouchableOpacity onPress={() => openDetailsDialog(item)}>
                    <Card.Content>
                      <Text style={styles.cardText}>{item.displayname}</Text>
                      <Text style={styles.expiryText} variant="bodySmall">
                        Expire {item.expirydate}
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
                  <Text style={{fontFamily: 'sans-serif'}}>
                    Type: {selectedLicense.type == 0 ? 'reguler' : ' other'}
                    {'\n'}
                    License Days: {selectedLicense.licensedays}
                    {'\n'}
                    Max Activation: {selectedLicense.maxactivation}
                    {'\n'}
                    Status:{' '}
                    {selectedLicense.status == 0 ? 'Active' : 'Inactive'}
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
    elevation: 10,
    height: 50,
    borderWidth: 1,
    backgroundColor: theme.colors.surface,
  },
  cardText: {
    fontSize: 15,
    fontWeight: 'bold',
    top: 10,
    color: theme.colors.onSurface,
  },
  expiryText: {
    textAlign: 'right',
    bottom: 10,
    color: theme.colors.onSurface,
  },
  dialogContentText: {
    marginBottom: 8,
    fontSize: 15,
  },
});
