import React from 'react';
import {
  ScrollView,
  RefreshControl,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from 'react-native-paper';

type Props = {
  refreshing: boolean;
  onRefresh: () => void;
  loading?: boolean;
  children: React.ReactNode;
};

const PullToRefreshWrapper = ({ refreshing, onRefresh, loading, children }: Props) => {
  const theme = useTheme();

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {children}
    </ScrollView>
  );
};

export default PullToRefreshWrapper;

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
