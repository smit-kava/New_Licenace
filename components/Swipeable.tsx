// SwipeableItem.tsx
import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import CustomIcon from './Icon';
import { Delete, Edit } from '../assets/Iconify-Icon';

const SCREEN_WIDTH = Dimensions.get('screen').width;
const SWIPE_THRESHOLD = -0.3 * SCREEN_WIDTH;

type Props = {
  children: React.ReactNode;
  onDelete: () => void;
  onEdit: () => void;
};

export const SwipeableItem = ({children, onDelete, onEdit}: Props) => {
  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(47);
  const marginVertical = useSharedValue(10);
  const opacity = useSharedValue(1);
  const panGesture = Gesture.Pan()
    .onUpdate(event => {
      translateX.value = event.translationX;
    })
    .onEnd(() => {
      if (translateX.value < SWIPE_THRESHOLD) {
        translateX.value = withSpring(-SCREEN_WIDTH);
        opacity.value = withSpring(0);
        itemHeight.value = withSpring(0);
        marginVertical.value = withSpring(0, {}, () => {
          runOnJS(onDelete)();
        });
      } else if (translateX.value > -SWIPE_THRESHOLD) {
        translateX.value = withSpring(SCREEN_WIDTH);
        opacity.value = withSpring(0);
        itemHeight.value = withSpring(0);
        marginVertical.value = withSpring(0, {}, () => {
          runOnJS(onEdit)();
        });
      } else {
        translateX.value = withSpring(0);
      }
    });

  const rStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
  }));

  const rBackgroundStyle = useAnimatedStyle(() => {
    const isDeleting = translateX.value < 0;
    return {
      backgroundColor: isDeleting ? 'red' : 'green',
    };
  });

  const rContainerStyle = useAnimatedStyle(() => ({
    height: itemHeight.value,
    marginVertical: marginVertical.value,
    opacity: opacity.value,
  }));

  return (
    <>
      <GestureHandlerRootView style={{flex: 1}}>
        <Animated.View
          style={[styles.background, rContainerStyle, rBackgroundStyle]}>
          <View style={styles.leftAction}>
            {/* <CustomIcon name={'Edit'}  /> */}
            <Edit/>
          </View>
          <View style={styles.rightAction}>
            {/* <CustomIcon name={'Delete'} /> */}
            <Delete/>
          </View>
        </Animated.View>
        <Animated.View style={[styles.container, rStyle, rContainerStyle]}>
          <GestureDetector gesture={panGesture}>
            <Animated.View style={{flex: 1}}>{children}</Animated.View>
          </GestureDetector>
        </Animated.View>
      </GestureHandlerRootView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    width: '100%',
    position: 'absolute',
  },
  background: {
    backgroundColor: 'red',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 20,
    width: '100%',
  },
  leftAction: {
    position: 'absolute',
    left: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  rightAction: {
    position: 'absolute',
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
