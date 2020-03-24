import { MANGA_API_URL, collectionType, MANGA_API_HOST, MANGA_API_KEY, languages } from '@const/book';
import axios from 'axios';
import MockBook from './mockBook.json';

export const getHeader = () => ({
  "x-rapidapi-host": MANGA_API_HOST,
  "x-rapidapi-key": MANGA_API_KEY,
  'Content-Type': 'application/json'
})

export const getBooksOfToday = async () => {
  const url = `${MANGA_API_URL}/${collectionType.MANGA_LIST}/${languages.ENGLISH}/p`;
  const params = 'q=eternal+love+dream'
  // return axios({
  //   method: 'GET',
  //   url,
  //   params,
  //   headers: getHeader()
  // })

  return MockBook.manga;

}