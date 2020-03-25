import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

export default function BookImage({ image }) {
  const img = image ? { uri: image } : require('@assets/images/robot-dev.png');
  return (
    <View style={styles.container}>
      <View style={styles.imgWrapper}>
        <Image source={img} style={styles.img} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imgWrapper: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden'
  },
  img: {
    flex: 1,
    height: null,
    width: null
  },
})