import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import Animated from 'react-native-reanimated'
import { createValue, spring, springBack } from './Spring';
import SwipToClose from './SwipToClose';


const { height: wHeight, width: wWidth } = Dimensions.get('window');

const { useCode, block, greaterThan, divide, sub, add, Value, cond, set, clockRunning, not, eq, call, interpolate, event, Extrapolate } = Animated;

const IMAGE_HEIGHT = Math.floor(wHeight / 2);

export default function BookModal({ book, position, close }) {
  const img = book.image ? { uri: book.image } : require('@assets/images/robot-dev.png');
  const scrollY = new Value(0);
  const onScroll = event([{
    nativeEvent: {
      contentOffset: { y: scrollY }
    }
  }])
  const imgHeight = createValue(position.height);
  const top = createValue(position.y);
  const left = createValue(position.x);
  const height = createValue(position.height);
  const width = createValue(position.width);
  const translateY = new Value(0);
  const scale = createValue(1);
  const opacity = createValue(0);
  const borderRadius = createValue(8);
  const textOpacity = cond(greaterThan(width.value, add(position.width, divide(sub(wWidth, position.width), 2))), 1, 0);
  const shouldClose = greaterThan(translateY, 500);

  const imgTranslateY = interpolate(scrollY, {
    inputRange: [0, IMAGE_HEIGHT],
    outputRange: [0, -IMAGE_HEIGHT],
    extrapolateLeft: Extrapolate.CLAMP
  })

  const p = {
    position: "absolute",
    top: top.value,
    left: left.value,
    height: height.value,
    width: width.value,
  }

  useCode(() => block([
    cond(shouldClose, [
      springBack(imgHeight, IMAGE_HEIGHT, position.height),
      springBack(scale, 0.7, 1),
      springBack(opacity, 1, 0),
      springBack(borderRadius, 0, 8),
      springBack(left, 0, position.x),
      springBack(top, 0, position.y),
      springBack(width, wWidth, position.width),
      springBack(height, wHeight, position.height),
      cond(not(clockRunning(height.clock)), call([], close))
    ], [
      set(scale.hasSprung, 1),
      spring(left, position.x, 0),
      spring(top, position.y, 0),
      spring(imgHeight, position.height, IMAGE_HEIGHT),
      spring(width, position.width, wWidth),
      spring(height, position.height, wHeight),
      spring(opacity, 0, 1),
      spring(borderRadius, 8, 0),
    ]),
  ]), [])

  return (
    <SwipToClose y={translateY} maxValue={500} scale={scale} opacity={opacity.value}>

      <Animated.View
        style={{
          backgroundColor: "white",
          ...p,
        }}
      />
      <Animated.View style={{
        opacity: textOpacity,
        ...p,
      }}>
        <Animated.ScrollView scrollEventThrottle={2} onScroll={onScroll} style={styles.content}>
          <Animated.View style={{ height: imgHeight.value, width: '100%' }} />
          <Text style={styles.title}>{book.title}</Text>
          <Text>
            API informations

            API

            You can get all manga informations, chapters and mymanga with mangaeden's API.
            All the informations are sent in JSON format.
            You can either use HTTP or HTTPS (advised if you need to use the mymanga's API).
            Important: we require every API user to have a link to our site in their application/site.
            New: We also support CORS now

        </Text>
        </Animated.ScrollView>
      </Animated.View>

      <Animated.View style={{
        ...p,
        height: imgHeight.value,
        overflow: 'hidden',
        borderRadius: borderRadius.value,
        transform: [{ translateY: imgTranslateY }]
      }}>
        <Animated.Image source={img} style={styles.img} />
      </Animated.View>
    </SwipToClose >
  )
}


const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 10
  },
  img: {
    flex: 1,
    height: null,
    width: null
  },
  title: {
    fontWeight: 'bold'
  }
})