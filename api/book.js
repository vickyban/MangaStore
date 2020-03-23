import { BASE_API_URL, collectionType } from '@const/book';
import axios from 'axios';
import MockBook from './mockBook.json';

export const getBooksOfToday = async () => {
  const url = `${BASE_API_URL}/${collectionType.VOLUMES}`;
  const params = 'q=eternal+love+dream'
  // return axios({
  //   method: 'GET',
  //   url,
  //   params,
  //   headers: { 'Content-Type': 'application/json' }
  // })

  return MockBook;

}