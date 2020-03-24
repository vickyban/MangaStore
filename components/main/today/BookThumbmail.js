import React, { useRef, useState } from 'react';
import { View, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { getPosition, PADDING } from './contants';
import { TapGestureHandler } from 'react-native-gesture-handler';


const measure = view => new Promise(resolve => {
  view.measureInWindow((x, y, width, height) => resolve({ x, y, width, height }))
})


export default function BookThumbmail({ book, open }) {
  const container = useRef();
  const img = book.image ? { uri: book.image } : require('@assets/images/robot-dev.png');

  const startTransition = async () => {
    const position = await measure(container.current);
    open(book, position);
  }

  return (
    <TouchableWithoutFeedback onPress={startTransition}>
      <View style={styles.content} ref={container}>
        <Image source={img} style={styles.img} />
      </View>
    </TouchableWithoutFeedback>
  )
}


const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: 'red',
    borderRadius: 10,
    overflow: 'hidden'
  },
  img: {
    flex: 1,
    height: null,
    width: null
  }
})