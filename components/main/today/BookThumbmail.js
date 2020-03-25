import React, { useRef, useState } from 'react';
import { View, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { getPosition, PADDING } from './contants';
import { TapGestureHandler } from 'react-native-gesture-handler';
import BookImage from './BookImage';


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
        <BookImage image={book.image} />
      </View>
    </TouchableWithoutFeedback>
  )
}


const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
})