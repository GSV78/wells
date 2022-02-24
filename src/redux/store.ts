import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import libReducer from './libReducer';


let reducers = combineReducers({
  lib: libReducer,
});

export type StateType = ReturnType<typeof store.getState>
export type DispatchType = typeof store.dispatch

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunkMiddleware)));

// @ts-ignore
window.store = store

export default store;