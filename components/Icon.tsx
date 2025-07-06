import React from 'react';
import {Icon, IconButton} from 'react-native-paper';
import {getIcon, IconName} from '../components/Icons/icon'; // Import the getIcon function

type Props = {
  name: IconName;
  size?: number;
  color?: string;
};

const CustomIcon: React.FC<Props> = ({
  name,
  size = 35,
  color = 'black',
}) => {
  const icon = getIcon(name);

  return (
    <Icon source={icon} size={size} ></Icon>
  );
};

export default CustomIcon;
