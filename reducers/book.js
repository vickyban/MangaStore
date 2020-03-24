import * as types from '@actions/types';
import { MANGA_IMG_URL } from '@const/book';

const convertList = (data) => data.map(item => mapper(item))

const keys = {
  'alias': 'a',
  'category': 'c',
  'title': 't',
  'id': 'i',
  'status': 's',
  'image': 'im',
  'hits': 'h'
}

const mapper = (item) => ({
  title: item[keys['title']],
  id: item[keys['id']],
  image: item.im ? `${MANGA_IMG_URL}${item.im}` : null,
  category: item[keys['category']]
})

const INITIAL_STATE = {
  today: [],
  lastUpdateAt: ''
}

export default reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.LOADED_TODAY_BOOK:
      return { ...state, today: convertList(action.payload.books), lastUpdateAt: action.payload.timeStamp };
    default:
      return state;
  }
}
