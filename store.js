import createRootReducer from './reducers';
import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  createRootReducer(),
  undefined,
  composeEnhancers(
    applyMiddleware(thunk)
  )
);
export default store;
