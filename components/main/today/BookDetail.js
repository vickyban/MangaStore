import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Dimensions, SafeAreaView } from 'react-native';
import Animated from 'react-native-reanimated'
import { createValue } from './Spring';
import { useDispatch, useSelector } from 'react-redux';



const { useCode, block, greaterThan, divide, sub, add, Value, cond, set, clockRunning, not, eq, call, interpolate, event, Extrapolate, multiply } = Animated;



const { height: wHeight, width: wWidth } = Dimensions.get('window');

export const IMAGE_HEIGHT = Math.floor(wHeight / 2);
export const IMAGE_WIDTH = Math.floor(IMAGE_HEIGHT * .75);
export const IMAGE_TOP = Math.floor(wHeight * .1);

export const HEADER_HEIGHT = 70;

export default BookDetail = ({ id, scrollValue }) => {
  const activeBook = useSelector(state => state.books.activeBook);
  const [scrollY] = useState(() => scrollValue ? scrollValue : new Value(0));
  const [onScroll] = useState(() => event([{
    nativeEvent: {
      contentOffset: { y: scrollY }
    }
  }]))
  const headerY = interpolate(scrollY, {
    inputRange: [0, IMAGE_HEIGHT + IMAGE_TOP],
    outputRange: [IMAGE_HEIGHT + IMAGE_TOP, 0],
    extrapolateRight: Extrapolate.CLAMP
  })
  const headerOpacity = cond(eq(headerY, 0), 1, 0);


  if (activeBook == null) return null
  return (
    <View style={{ height: '100%', width: '100%' }}>
      <Animated.ScrollView
        onScroll={onScroll}
        scrollEventThrottle={2}
        style={styles.container}
      >
        <View style={{
          height: IMAGE_HEIGHT + HEADER_HEIGHT,
          marginBottom: IMAGE_TOP,
          width: IMAGE_WIDTH
        }} />

        <View style={styles.description}>
          <Text>{activeBook.author}</Text>
          <Text>{activeBook.description}</Text>
          <Text>{activeBook.description}</Text>
          <Text>{activeBook.description}</Text>
          <Text>{activeBook.description}</Text>
        </View>


        <View style={styles.chapters}>
        </View>
      </Animated.ScrollView>
      <Animated.View style={{ position: 'absolute', width: '100%', transform: [{ translateY: headerY }] }}>
        <Animated.View style={{
          ...styles.header_bg,
          opacity: headerOpacity,
        }} />
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.header}>
            <View style={styles.title}>
              <Text style={[styles.header_text, styles.title_text]}>{activeBook.title}</Text>
            </View>
            <View style={styles.headerTabs}>
              <View style={styles.header_tab}>
                <Text style={styles.header_text}>Description</Text>
              </View>
              <View style={styles.header_tab}>
                <Text style={styles.header_text}>Chapters</Text>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  header: {
    width: '100%',
    height: HEADER_HEIGHT,
    padding: 10,
  },
  header_bg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  headerTabs: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 10,
  },
  header_text: {
    textAlign: 'center',
    fontWeight: 'bold'
  },
  header_tab: {
    flex: 1
  },
  title: {
    flex: 1,
  },
  title_text: {
    fontSize: 16,
    flexShrink: 1
  },
  description: {

  },
  chapters: {

  }

})