import { Dispatch } from 'react';
import { ThunkAction } from 'redux-thunk';
import { getObjectsFromServer, deleteObjectFromServer } from '../api/api';
import { ObjectType } from './objectReducer';
import { AppStateType } from './store';

//action.types
const GET_OBJECTS_SUCCESS: string = 'wells/objectsReducer/get_objects_success';

let initialState: Array<ObjectType> = []

export type InitialStateType = typeof initialState

//Reducer

const objectsReducer = (state = initialState, action: ActionsTypes) => {
  switch (action.type) {
    case GET_OBJECTS_SUCCESS: {
      return action.payload
    }
    default:
      return state;
  }
};

//ActionCreators
type ActionsTypes = getObjectsSuccessType

type getObjectsSuccessType = {
  type: typeof GET_OBJECTS_SUCCESS
  payload: InitialStateType
}
const getObjectsSuccess = (payload: InitialStateType): getObjectsSuccessType => ({ type: GET_OBJECTS_SUCCESS, payload });

//ThunkCreators

type GetStateType = () => AppStateType
export type DispachObjectsType = Dispatch<ActionsTypes | ThunkType>

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getObjects = (): ThunkType => async (dispatch, getState) => {
  const data: InitialStateType = await getObjectsFromServer()

  dispatch(getObjectsSuccess(data))
};
// export const addItem = (values: ValuesType): ThunkType => async (dispatch, getState) => {
//   const status: number = await addNewItem(values)
//   if (status === 201) {
//     dispatch(getDB())
//   }
// };
export const deleteObjectsItem = (id: number): ThunkType => async (dispatch, getState) => {
  const status: number = await deleteObjectFromServer(id)
  if (status === 200) {
    dispatch(getObjects())
  }
};
// export const putNewPrice = (id: number, name: string, newPrice: number, unit: string, category: 'material' | 'work'): ThunkType => async (dispatch, getState) => {
//   const status: number = await putNewPriceToServer(id, name, newPrice, unit, category)
//   if (status === 200) {
//     dispatch(getDB())
//   }
// };


export default objectsReducer;
