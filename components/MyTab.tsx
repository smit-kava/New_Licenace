import { PlatformPressable, Text } from '@react-navigation/elements';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { View } from 'react-native';

type MyTabBarProps = {
  state: any;
  descriptors: any;
  navigation: any;
};

function MyTabBar({state, descriptors, navigation}: MyTabBarProps) {
  const {colors} = useTheme();
  const {buildHref} = useLinkBuilder();

  return (
    <View style={{flexDirection: 'row'}}>
      {state.routes.map(
        (
          route: {key: string; name: string; params?: object},
          index: number,
        ) => {
          const {
            options,
          }: {
            options: {
              tabBarLabel?: string;
              title?: string;
              tabBarAccessibilityLabel?: string;
              tabBarButtonTestID?: string;
            };
          } = descriptors[route.key];
          const label: string =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused: boolean = state.index === index;

          const onPress = (): void => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = (): void => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <PlatformPressable
              href={buildHref(route.name, route.params)}
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarButtonTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{flex: 1}}>
              <Text style={{color: isFocused ? colors.background : colors.text}}>
                {label}
              </Text>
            </PlatformPressable>
          );
        },
      )}
    </View>
  );
}
export default MyTabBar;