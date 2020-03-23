import * as types from '@actions/types';

const INITIAL_STATE = {
  today: [],
  lastUpdateAt: ''
}

export default reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.LOADED_TODAY_BOOK:
      return { ...state, today: action.payload.books, lastUpdateAt: action.payload.timeStamp };
    default:
      return state;
  }
}