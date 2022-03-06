import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import libReducer from './libReducer';
import objectReducer from './objectReducer';


let reducers = combineReducers({
  lib: libReducer,
  object: objectReducer
});

export type AppStateType = ReturnType<typeof store.getState>

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunkMiddleware)));

// @ts-ignore
window.store = store

export default store;