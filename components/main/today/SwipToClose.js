import React, { Children } from 'react'
import { View, StyleSheet } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler'
import Animated, { Easing } from 'react-native-reanimated';
import { BlurView } from 'expo-blur';

const { Value, event, cond, eq, block, add, and, interpolate, not, timing, startClock, stopClock, clockRunning, Extrapolate, useCode, set, Clock, lessThan, or } = Animated;

const snapBack = (value, gestureState, snapOffset) => {
  const clock = new Clock();
  const state = {
    position: new Value(0),
    finished: new Value(0),
    time: new Value(0),
    frameTime: new Value(0)
  }
  const config = {
    toValue: new Value(0),
    duration: 250,
    easing: Easing.linear,
  }

  return block([
    cond(eq(gestureState, State.ACTIVE), [
      stopClock(clock),
      set(state.position, add(state.position, value)),
    ], [
      cond(
        and(not(clockRunning(clock)),
          lessThan(state.position, snapOffset)
        ), [
        set(state.position, add(state.position, value)),
        set(state.finished, 0),
        set(state.time, 0),
        set(state.frameTime, 0),
        startClock(clock),
      ])
    ]),
    cond(clockRunning(clock), [
      timing(clock, state, config),
      cond(state.finished, stopClock(clock))
    ]),
    state.position
  ])
}

export default function SwipToClose({ children, y, maxValue, scale: s, opacity }) {
  const state = new Value(State.UNDETERMINED);
  const translationY = new Value(0);
  const gestureHandler = event([{
    nativeEvent: {
      state,
      translationY
    }
  }])

  const scale = cond(
    or(
      and(
        clockRunning(s.clock),
        eq(s.hasSprung, 1)),
      eq(s.hasSprungBack, 1)
    ),
    s.value,
    interpolate(y, {
      inputRange: [0, 200],
      outputRange: [1, 0.7],
      extrapolate: Extrapolate.CLAMP
    })
  );

  useCode(() => set(y, snapBack(translationY, state, maxValue))
    , [translationY, state])

  return (
    <View style={StyleSheet.absoluteFill}>
      <Animated.View style={[StyleSheet.absoluteFill, { opacity }]}>
        <BlurView
          tint="default"
          intensity={100}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
      <PanGestureHandler
        onGestureEvent={gestureHandler}
        onHandlerStateChange={gestureHandler}>
        <Animated.View style={{ ...StyleSheet.absoluteFillObject, transform: [{ scale }] }}>
          {children}
        </Animated.View>
      </PanGestureHandler>
    </View>
  )
}
