import { addNewItem, getLibFromServer } from '../api/api';
import { ValuesType } from '../components/AddMaterials';
import { DispatchType } from './store';

//action.types
const GET_LIB_SUCCESS: string = 'wells/libReducer/get_lib_success';

export type LibItemType = { id: number, name: string, price: number, unit: string, category: 'material' | 'work' }

let initialState: Array<LibItemType> = []

export type InitialStateType = typeof initialState


//Reducer
type ACType = {
  type: typeof GET_LIB_SUCCESS
  payload?: InitialStateType
}

const libReducer = (state = initialState, action: ACType) => {
  switch (action.type) {
    case GET_LIB_SUCCESS: {
      return action.payload
    }
    default:
      return state;
  }
};

//ActionCreators
const getLibSuccess = (payload: InitialStateType): ACType => ({ type: GET_LIB_SUCCESS, payload });

//ThunkCreators

export const getDB = () => async (dispatch: any) => {
  const data: InitialStateType = await getLibFromServer()
  dispatch(getLibSuccess(data))
};
export const addItem = ({ ...values }: ValuesType) => async (dispatch: any) => {
  const data: InitialStateType = await addNewItem(values)
  console.log(data);
  dispatch(getDB())
  dispatch(getLibSuccess(data))
};


export default libReducer;
