import React from 'react';
import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import WrapperContainer from '../components/WrapperContainer';
const theme = useTheme();
const Dashbord = () => {
  return (
  <WrapperContainer>
      <View>
      <Text>Dashbord</Text>
    </View>
</WrapperContainer>
  )
}

export default Dashbord
