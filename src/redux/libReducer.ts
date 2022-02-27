import { Dispatch } from 'react';
import { ThunkAction } from 'redux-thunk';
import { addNewItem, getLibFromServer, deleteItemFromServer, putNewPriceToServer } from '../api/api';
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
export type DispachType = Dispatch<ActionsTypes | ThunkType>

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getDB = (): ThunkType => async (dispatch, getState) => {
  const data: InitialStateType = await getLibFromServer()

  dispatch(getLibSuccess(data))
};
export const addItem = (values: ValuesType): ThunkType => async (dispatch, getState) => {
  const status: number = await addNewItem(values)
  if (status === 201) {
    dispatch(getDB())
  }
};
export const deleteItem = (id: number): ThunkType => async (dispatch, getState) => {
  const status: number = await deleteItemFromServer(id)
  if (status === 200) {
    dispatch(getDB())
  }
};
export const putNewPrice = (id: number, name: string, newPrice: number, unit: string, category: 'material' | 'work'): ThunkType => async (dispatch, getState) => {
  const status: number = await putNewPriceToServer(id, name, newPrice, unit, category)
  if (status === 200) {
    dispatch(getDB())
  }
};


export default libReducer;
