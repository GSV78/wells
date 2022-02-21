import { Dispatch } from 'react';
import { Action } from 'redux';
import { getLibFromServer } from '../api/api';

//action.types
const GET_LIB_SUCCESS: string = 'wells/libReducer/get_lib_success';

//initialState
// type initialStateType = {
//   initialStateMaterials: Array<{id: number, name: string, price: number, unit: string} | null>
//   initialStateWorks: Array<{id: number, name: string, price: number, unit: string} | null>
// }

type MaterialsFndWorksType = { id: number, name: string, price: number, unit: string } | null

let materials: Array<MaterialsFndWorksType> = []
let works: Array<MaterialsFndWorksType> = []
let initialState = { materials, works }
export type InitialStateType = typeof initialState


//Reducer
const libReducer = (state = initialState, action: getLibSuccessACType) => {
  switch (action.type) {
    case GET_LIB_SUCCESS: {
      return {
        ...state,
        materials: action.payload.materials,
        works: action.payload.works,
      };
    }
    default:
      return state;
  }
};

//ActionCreators
type getLibSuccessACType = {
  type: typeof GET_LIB_SUCCESS
  payload: InitialStateType
}
const getLibSuccess = (payload: InitialStateType): getLibSuccessACType => ({ type: GET_LIB_SUCCESS, payload });

//ThunkCreators

// export const getDB = () => (dispatch: any) => {
//     debugger
//     getLibFromServer()
//     .then((data: any) => dispatch(getLibSuccess(data)))
// };
export const getDB = () => async (dispatch: any) => {
  const data: InitialStateType = await getLibFromServer()
  dispatch(getLibSuccess(data))
};


export default libReducer;
