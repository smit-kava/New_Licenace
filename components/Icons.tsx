import React from 'react';
import {IconButton} from 'react-native-paper';
import {getIcon, IconName} from '../components/Icons/icon'; // Import the getIcon function

type Props = {
  name: IconName; // This restricts the name prop to only valid icon names
  onPress: () => void;
  size?: number;
  color?: string;
};

const Iconbutton: React.FC<Props> = ({
  name,
  onPress,
  size = 15,
  color = 'black',
}) => {
  const icon = getIcon(name);

  return (
    <IconButton icon={icon} size={size} onPress={onPress} mode="contained" />
  );
};

export default Iconbutton;
