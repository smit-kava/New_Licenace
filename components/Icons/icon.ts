import * as React from 'react';
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';


// You can import specific icons or use the entire MaterialCommunityIcons module
const icons = {
  Delete:require('../../assets/Image/Etech.png'),
  Edit:require('../../assets/Image/Etech.png'),
  lice:require('../../assets/Image/Etech.png'),
  Etech:require('../../assets/Image/Etech.png'),
  Menu:require('../../assets/Image/Etech.png'),
};

export type IconName = keyof typeof icons;


export const getIcon = (name: IconName): IconSource => {
  return icons[name];
};
