import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { ReactNode } from 'react';
import { useTheme } from 'react-native-paper';

interface Props {
  children: ReactNode;
}

const WrapperContainer = ({ children }: Props) => {
  const theme = useTheme();

  return (
    <SafeAreaView style={[styles.mainstyle, { backgroundColor: theme.colors.background }]}>
      <StatusBar
      barStyle={theme.dark ? 'light-content' : 'dark-content'}
      backgroundColor={theme.colors.background}
    />
      <View style={[styles.mainstyle, { backgroundColor: theme.colors.background }]}>
        {children}
      </View>
    </SafeAreaView>
  );
};

export default WrapperContainer;

const styles = StyleSheet.create({
  mainstyle: {
    flex: 1,
    justifyContent: 'center',
  },
});
