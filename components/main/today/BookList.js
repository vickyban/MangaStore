import React, { useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native';
import { load_today_books } from '@actions/book';
import { useSelector, useDispatch } from 'react-redux';
import BookThumbmail from './BookThumbmail';
import { PADDING, HEIGHT_VARIATIONS } from './contants';
import BookModal from './BookModal';
import Masonry from '@components/common/Masonry';
import { load_active_book } from '@actions/book';

import { open_modal, close_modal } from '@actions/modal';

export default function BookList() {
  const dispatch = useDispatch();
  const { today: todayBooks } = useSelector(state => state.books);

  useEffect(() => {
    dispatch(load_today_books())
  }, [])

  const open = (book, position) => {
    dispatch(load_active_book(book.id))
    const close = () => dispatch(close_modal());
    const render = () => <BookModal {...{ book, position, close }} />
    dispatch(open_modal(render))
  };

  const renderItem = book => (<BookThumbmail
    {...{ book, open }} />)


  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} >
        {
          todayBooks.length > 0 && (<Masonry
            data={todayBooks}
            columns={2}
            renderItem={renderItem}
            heightVariations={HEIGHT_VARIATIONS}
            itemStyle={styles.item}
          />)
        }
      </ScrollView>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: PADDING * 2
  },
  item: {
    padding: PADDING * 2
  }
})