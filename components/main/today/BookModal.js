import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated from 'react-native-reanimated'
import { createValue, spring, springBack } from './Spring';
import SwipToClose from './SwipToClose';
import BookImage from './BookImage';
import BookDetail, { HEADER_HEIGHT, IMAGE_HEIGHT, IMAGE_WIDTH, IMAGE_TOP } from './BookDetail';


const { height: wHeight, width: wWidth } = Dimensions.get('window');

const { useCode, block, greaterThan, divide, sub, add, Value, cond, set, clockRunning, not, eq, call, interpolate, event, Extrapolate, multiply } = Animated;

const VELOCITY = IMAGE_TOP / IMAGE_HEIGHT;

export default function BookModal({ book, position, close }) {
  const scrollY = new Value(0);
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

  const imgHeight = interpolate(height.value, {
    inputRange: [position.height, IMAGE_HEIGHT],
    outputRange: [position.height, IMAGE_HEIGHT],
    extrapolate: Extrapolate.CLAMP
  });
  const imgWidth = interpolate(width.value, {
    inputRange: [position.width, IMAGE_WIDTH],
    outputRange: [position.width, IMAGE_WIDTH],
    extrapolate: Extrapolate.CLAMP
  });
  const imgTop = cond(
    greaterThan(height.value, imgHeight),
    add(multiply(VELOCITY, sub(height.value, IMAGE_HEIGHT)), top.value),
    top.value)
  const imgLeft = add(left.value, sub(divide(width.value, 2), divide(imgWidth, 2)));

  const p = {
    position: "absolute",
    top: top.value,
    left: left.value,
    height: height.value,
    width: width.value,
  }

  useCode(() => block([
    cond(shouldClose, [
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
      spring(width, position.width, wWidth),
      spring(height, position.height, wHeight),
      spring(opacity, 0, 1),
      spring(borderRadius, 8, 0),
    ]),
  ]), [])

  const imgTranslateY = interpolate(scrollY, {
    inputRange: [0, IMAGE_HEIGHT + IMAGE_TOP],
    outputRange: [0, -(IMAGE_HEIGHT + IMAGE_TOP)],
    extrapolateRight: Extrapolate.CLAMP
  })

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
        overflow: 'hidden'
      }}>
        <BookDetail id={book.id} scrollValue={scrollY} />
      </Animated.View>

      <Animated.View style={{
        position: 'absolute',
        top: imgTop,
        left: imgLeft,
        width: imgWidth,
        height: imgHeight,
        borderRadius: borderRadius.value,
        transform: [{ translateY: imgTranslateY }]
      }}>
        <BookImage image={book.image} />
      </Animated.View>
    </SwipToClose >
  )
}


const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 10
  },
  title: {
    fontWeight: 'bold'
  }
})