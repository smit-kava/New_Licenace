import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';

interface TabIconProps {
  Icon: React.ElementType;
  focused: boolean;
  label: string;
  size?: number;
  activeColor?: string; // ✅ Used when focused
}

const TabIcon: React.FC<TabIconProps> = ({
  Icon,
  focused,
  label,
  size = 30,
  activeColor,
}) => {
  const theme = useTheme();

  const defaultColor = theme.dark ? '#ffffff' : '#000000';
  const iconColor = focused ? activeColor ?? theme.colors.primary : defaultColor;
  const textColor = focused ? activeColor ?? theme.colors.primary : defaultColor;

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: focused ? 'rgba(61, 132, 186, 0.2)' : 'transparent',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 20,
        minWidth: 100,
      }}
    >
      <Icon color={iconColor} height={size} width={size} />
      {focused && (
        <Text
          style={{
            color: textColor,
            fontSize: 10,
            fontWeight: '500',
            flexShrink: 1,
            marginBottom: 5,
          }}
          numberOfLines={1}
        >
          {label}
        </Text>
      )}
    </View>
  );
};

export default TabIcon;
