import { getBooksOfToday } from '@api/book';
import * as types from './types';
import moment from 'moment';

export const loaded_today_books = (books, timeStamp) => ({
  type: types.LOADED_TODAY_BOOK,
  payload: { books, timeStamp }
})

export const load_today_books = () => async (dispatch, getState) => {
  const { lastUpdateAt, today } = getState().books;
  const todayDate = moment();
  if (today.length === 0 || !lastUpdateAt || !moment(lastUpdateAt).isSame(todayDate, 'day')) {
    const books = await getBooksOfToday();
    console.log('lenght', books.length)
    const timeStamp = moment().format();
    dispatch(loaded_today_books(books, timeStamp))
  }
}