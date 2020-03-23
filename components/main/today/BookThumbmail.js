import React, { useRef, useState } from 'react';
import { View, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { getPosition, PADDING } from './contants';
import { TapGestureHandler } from 'react-native-gesture-handler';


const measure = view => new Promise(resolve => {
  view.measure((x, y, width, height, pageX, pageY) => resolve({ x, y, width, height }))
})


export default function BookThumbmail({ book, open }) {
  const container = useRef();

  const startTransition = async () => {
    const measurement = await measure(container.current);
    open(book, measurement);
  }

  return (
    <TouchableWithoutFeedback onPress={startTransition}>
      <View style={styles.content} ref={container}>
        <Image source={{ uri: book.volumeInfo.imageLinks.thumbnail }} style={styles.img} />
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