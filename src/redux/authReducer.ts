import { Dispatch } from 'react';
import { ThunkAction } from 'redux-thunk';
import { saveObjectToServer } from '../api/api';
import { AppStateType } from './store';

//action.types
const AUTH_SUCCESS = 'wells/authReducer/auth_success';

let initialState = { isAuth: false }

export type InitialStateType = typeof initialState

//Reducer
const authReducer = (state = initialState, action: ActionsTypes) => {
  switch (action.type) {
    case AUTH_SUCCESS: {
      return ({
        ...state,
        isAuth: true
      })
    }

    default:
      return state;
  }
};

//ActionCreators
type ActionsTypes = authSuccess

type authSuccess = {
  type: typeof AUTH_SUCCESS
}

export const authSuccess = (): authSuccess => ({ type: AUTH_SUCCESS });

export type AuthDispachType = Dispatch<ActionsTypes>

export default authReducer;
