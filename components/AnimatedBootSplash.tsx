import { useState } from "react";
import { Animated, Dimensions, Platform } from "react-native";
import BootSplash from "react-native-bootsplash";
import { RollInRight } from "react-native-reanimated";
import { rgbaColor } from "react-native-reanimated/lib/typescript/Colors";

const useNativeDriver = Platform.OS !== "web";

type Props = {
  onAnimationEnd: () => void;
};

export const AnimatedBootSplash = ({ onAnimationEnd }: Props) => {
  const [opacity] = useState(() => new Animated.Value(1));
  const [translateX] = useState(() => new Animated.Value(0));
  const [translateY] = useState(() => new Animated.Value(1));
  const { container, logo /*, brand */ } = BootSplash.useHideAnimation({
    manifest: require("../assets/bootsplash/manifest.json"),

    logo: require("../assets/bootsplash/logo.png"),
    // darkLogo: require("../assets/bootsplash/dark-logo.png"),
    // brand: require("../assets/bootsplash/brand.png"),
    // darkBrand: require("../assets/bootsplash/dark-brand.png"),

    statusBarTranslucent: true,
    navigationBarTranslucent: true,

    animate: () => {
      const { height } = Dimensions.get("screen");

      Animated.stagger(350, [
        Animated.spring(translateX, {
          useNativeDriver,
          toValue: 0,
        }),
        Animated.spring(translateY, {
          useNativeDriver,
          toValue:height,
        }),
      ]).start();

      Animated.timing(opacity, {
        useNativeDriver,
        toValue: 0,
        duration: 350,
        delay: 350,
      }).start(() => {
        onAnimationEnd();
      });
    },
  });
  return (
    <Animated.View {...container} style={[container.style, {borderCurve:'continuous',backgroundColor:'#ffffff'},{ opacity }]}>
      <Animated.Image
        {...logo}
        style={[logo.style,{ transform: [{ translateX }] }]}
      />

      {/* <Animated.Image {...brand} style={[brand.style, { opacity }]} /> */}
    </Animated.View>
  );
};