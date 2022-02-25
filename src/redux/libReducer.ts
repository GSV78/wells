import { Dispatch } from 'react';
import { ThunkAction } from 'redux-thunk';
import { addNewItem, getLibFromServer } from '../api/api';
import { ValuesType } from '../components/AddMaterials';
import { AppStateType } from './store';

//action.types
const GET_LIB_SUCCESS: string = 'wells/libReducer/get_lib_success';

export type LibItemType = { id: number, name: string, price: number, unit: string, category: 'material' | 'work' }

let initialState: Array<LibItemType> = []

export type InitialStateType = typeof initialState

//Reducer

const libReducer = (state = initialState, action: getLibSuccessType) => {
  switch (action.type) {
    case GET_LIB_SUCCESS: {
      return action.payload
    }
    default:
      return state;
  }
};

//ActionCreators
type ActionsTypes = getLibSuccessType

type getLibSuccessType = {
  type: typeof GET_LIB_SUCCESS
  payload: InitialStateType
}
const getLibSuccess = (payload: InitialStateType): getLibSuccessType => ({ type: GET_LIB_SUCCESS, payload });

//ThunkCreators

type GetStateType = () => AppStateType
type DispachType = Dispatch<ActionsTypes>

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getDB = (): ThunkType => async (dispatch, getState) => {
  const data: InitialStateType = await getLibFromServer()
  dispatch(getLibSuccess(data))
};
export const addItem = (values: ValuesType): ThunkType => async (dispatch, getState) => {
  const data: InitialStateType = await addNewItem(values)
  console.log(data)
  dispatch(getDB())
  dispatch(getLibSuccess(data))
};


export default libReducer;
