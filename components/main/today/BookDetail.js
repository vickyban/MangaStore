import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';


export default function BookDetail({ book }) {
  return (
    <View style={styles.container}>

      <ScrollView style={styles.container}>
        <Text>{book.title}</Text>
        <Text>
          <Text>Author:</Text>
          <Text>{book.author}</Text>
        </Text>

        <Text>{book.description}</Text>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {

  }
})