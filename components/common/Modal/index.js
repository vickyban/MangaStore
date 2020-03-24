import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';


export default function RootModal() {
  const { visible, render } = useSelector(state => state.modal);

  if (!visible) return null;
  return (
    <View style={StyleSheet.absoluteFillObject}>
      {
        render()
      }
    </View>
  );

}


const styles = StyleSheet.create({

})