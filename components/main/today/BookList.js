import React, { useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native';
import { load_today_books } from '@actions/book';
import { useSelector, useDispatch } from 'react-redux';
import BookThumbmail from './BookThumbmail';
import { PADDING, HEIGHT_VARIATIONS } from './contants';
import BookModal from './BookModal';
import Masonry from './Masonry';

export default function BookList() {
  const [active, setActive] = useState(null);
  const dispatch = useDispatch();
  const { today: todayBooks } = useSelector(state => state.books);

  useEffect(() => {
    dispatch(load_today_books())
  }, [])

  const open = (book, measurement) => setActive({ book, measurement });
  const close = () => setActive(null);


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
      {
        active && <BookModal book={active.book} measurement={active.measurement} close={close} />
      }
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    padding: PADDING * 2
  },
  item: {
    padding: PADDING * 2
  }
})