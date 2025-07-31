// BootWrapper.tsx
import React, {use, useEffect, useState} from 'react';
import {Platform, StatusBar, View} from 'react-native';
import {AnimatedBootSplash} from '../components/AnimatedBootSplash';
import RootStack from '../Routing/RootStack';
import {useTheme} from 'react-native-paper';
import WrapperContainer from '../components/WrapperContainer';
export const BootWrapper = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    StatusBar.setBarStyle('dark-content');
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setTranslucent(true);
    }
  }, []);

  return (
   <WrapperContainer>
      {!visible ? <RootStack /> : null}
      {visible && (
        <AnimatedBootSplash
          onAnimationEnd={() => {
            setVisible(false);
          }}
        />
      )}
   </WrapperContainer>
  );
};
