import React from 'react';
import { View, StyleSheet } from 'react-native';


export const createValue = (val) => ({
  value: new Value(val),
  clock: new Clock(),
  hasSprung: new Value(0),
  hasSprungBack: new Value(0)
})

export default function BookModal({ book, measurement }) {
  const val = new Value(0);
  // const top = createValue(measurement.y);
  // const left = createValue(measurement.x);
  // const height = createValue(measurement.height);
  // const width = createValue(measurement.width);

  return (
    <View style={styles.container}>
      {/* <Animated.View style={{ ...styles.content, top, left, height, width }}>

      </Animated.View> */}
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  content: {
    position: 'absolute',
    backgroundColor: 'yellow'
  }
})