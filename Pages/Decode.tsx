import React from 'react';
import {Text, View} from 'react-native';
import {useTheme} from 'react-native-paper';
import WrapperContainer from '../components/WrapperContainer';
const theme = useTheme();
const Decode = () => {
  return (
    <WrapperContainer>
      <View>
        <Text style={{color: 'white'}}>Decode</Text>
      </View>
    </WrapperContainer>
  );
};
export default Decode;
