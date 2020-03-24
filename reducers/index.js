import { combineReducers } from 'redux';
import bookReducer from './book';
import modalReducer from './modal';

export default () => combineReducers({
  books: bookReducer,
  modal: modalReducer
});