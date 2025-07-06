import { View, Text, StatusBar } from 'react-native';
import React from 'react';
import { Use } from 'react-native-svg';
import { useTheme } from 'react-native-paper';
import WrapperContainer from '../components/WrapperContainer';
const theme = useTheme();
const Decode = () => {
  return (
<WrapperContainer>
      <View>
      <Text>Decode</Text>
    </View>
</WrapperContainer>
  );
};
export default Decode