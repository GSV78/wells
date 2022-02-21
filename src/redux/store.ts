import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import libReducer from './libReducer';

// import libReducer from './libReducer';
// import cartReducer from './cartReducer';

let reducers = combineReducers({
  lib: libReducer,
//   cart: cartReducer,
});

// @ts-ignore
const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunkMiddleware)));

// @ts-ignore
window.store = store

export default store;