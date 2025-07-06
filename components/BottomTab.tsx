// utils/getTabScreenOptions.ts
import {DrawerToggleButton} from '@react-navigation/drawer';
import {IconButton} from 'react-native-paper';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/Stack'; // adjust path as needed
import TabIcon from '../components/TabIcon';

type TabScreenOptionsParams = {
  navigation: NavigationProp<RootStackParamList>;
  label: string;
  icon: any;
  activeColor: string;
  size?: number;
  showHeaderRight?: boolean;
  headerRightIcon?: any;
  onHeaderRightPress?: () => void;
};

export const getTabScreenOptions = ({
  navigation,
  label,
  icon,
  activeColor,
  size = 28,
  showHeaderRight = false,
  headerRightIcon,
  onHeaderRightPress,
}: TabScreenOptionsParams) => {
  return {
    headerLeft: () => <DrawerToggleButton />,
    headerShown: true,
    tabBarLabel: '',
    tabBarIcon: ({focused}: {focused: boolean}) => (
      <TabIcon
        focused={focused}
        Icon={icon}
        label={label}
        activeColor={activeColor}
        size={size}
      />
    ),
    ...(showHeaderRight &&
      headerRightIcon && {
        headerRight: () => (
          <IconButton icon={headerRightIcon} size={20} onPress={onHeaderRightPress} />
        ),
      }),
  };
};
