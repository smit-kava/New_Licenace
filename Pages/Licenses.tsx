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
  View,
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
  const [licenses, setLicenses] = useState<License[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLicense, setSelectedLicense] = useState<License | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const route = useRoute<RouteProp<{ params: { Name: string } }>>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const getData = (onSuccess: (res: any) => void, onFailure: (res: any) => void) => {
    License.GetLicenseList(
      res => onSuccess(Array.isArray(res) ? res : []),
      err => onFailure(err)
    );
  };

  const getallLicenses = React.useCallback(() => {
    setLoading(true);
    getData(
      res => {
        setLicenses(res);
        setLoading(false);
      },
      err => {
        console.log(err);
        setLoading(false);
      }
    );
  }, []);

  useEffect(() => {
    getallLicenses();
  }, []);

  const openDetailsDialog = (license: License) => setSelectedLicense(license);
  const closeDialog = () => setSelectedLicense(null);

  const Onremove = (licenseID: string) => {
    Alert.alert('Confirm Delete', 'Are you sure you want to delete this license?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          License.deleteLicense(
            licenseID,
            res => {
              Alert.alert('Success', res);
              getallLicenses();
            },
            err => Alert.alert('Error', err)
          );
        },
      },
    ]);
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
          <ActivityIndicator size="small" animating={true} color={theme.colors.primary} />
        </View>
      ) : (
        <PullToRefreshWrapper refreshing={refreshing} onRefresh={getallLicenses} loading={loading}>
          {licenses.map((item: License) => (
            <SwipeableItem
              key={item.licenseid}
              onDelete={() => Onremove(item.customerid)}
              onEdit={() => onEdit(item)}
            >
              <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
                <TouchableOpacity onPress={() => openDetailsDialog(item)}>
                  <Card.Content>
                    <Text
                      style={[styles.cardText, { color: theme.colors.onSurface }]}
                    >
                      {item.displayname}
                    </Text>
                    <Text
                      style={[styles.expiryText, { color: theme.colors.onSurface }]}
                      variant="bodySmall"
                    >
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
              <Text style={{ color: theme.colors.onSurface }}>
                Type: {selectedLicense.type === 0 ? 'Regular' : 'Other'}
                {'\n'}
                License Days: {selectedLicense.licensedays}
                {'\n'}
                Max Activation: {selectedLicense.maxactivation}
                {'\n'}
                Status: {selectedLicense.status === 0 ? 'Active' : 'Inactive'}
                {'\n'}
                Activated On: {selectedLicense.activatedon ? 'Yes' : 'No'}
                {'\n'}
                Expiry Date: {selectedLicense.expirydate}
              </Text>
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
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    height: 80,
    marginBottom: 0,
    borderRadius: 0,
    elevation:5,
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
    top: 10,
  },
  expiryText: {
    textAlign: 'right',
    bottom: 10,
  },
});
