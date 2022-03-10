import { Dispatch } from 'react';
// import { ThunkAction } from 'redux-thunk';
import { AppStateType } from './store';

//action.types
const ADD_ITEM_TO_OBJECT = 'wells/objectReducer/add_item_to_object';
const SAVE_OBJECT_NAME = 'wells/objectReducer/save_object_name';

export type ObjectItemsType = { id: number, name: string, price: number, unit: string, category: 'material' | 'work', count: number }
export type ObjectType = { id?: number, name: string, items: Array<ObjectItemsType>, priceMaterials: number, priceWorks: number, totalSum: number }

let initialState: ObjectType = {
  name: 'Новый объект',
  items: [],
  priceMaterials: 0,
  priceWorks: 0,
  totalSum: 0
}

export type InitialStateType = typeof initialState

//Reducer

const objectReducer = (state = initialState, action: ActionsTypes) => {
  switch (action.type) {
    case ADD_ITEM_TO_OBJECT: {
      let delta: number
      let objectItem: ObjectItemsType | null
      let arrMatch = state.items.filter((el) => {
        return el.name === action.payload.name
      })
      let arrDismatch = state.items.filter((el) => {
        return el.name !== action.payload.name
      })
      let matPrice: number = 0
      let wokPrice: number = 0
      if (arrMatch.length !== 0) {
        delta = action.payload.count - arrMatch[0].count
        objectItem = arrMatch[0]
      } else {
        delta = action.payload.count
      }
      action.payload.category === 'material'
        ? matPrice = action.payload.price * delta
        : wokPrice = action.payload.price * delta
      return ({
        ...state,
        items: [...arrDismatch, action.payload].filter((el) => { return el.count !== 0 }),
        priceMaterials: state.priceMaterials + matPrice,
        priceWorks: state.priceWorks + wokPrice,
        totalSum: state.totalSum + wokPrice + matPrice
      })
    }
    case SAVE_OBJECT_NAME: {
      return ({
        ...state,
        name: action.payload
      })
    }
    default:
      return state;
  }
};

//ActionCreators
type ActionsTypes = AddItemType | SaveObjectNameType

type AddItemType = {
  type: typeof ADD_ITEM_TO_OBJECT
  payload: ObjectItemsType
}
type SaveObjectNameType = {
  type: typeof SAVE_OBJECT_NAME
  payload: string
}

export const addItemToObject = (payload: ObjectItemsType): AddItemType => ({ type: ADD_ITEM_TO_OBJECT, payload });
export const saveObject = (payload: string): SaveObjectNameType => ({ type: SAVE_OBJECT_NAME, payload });

// ThunkCreators

type GetStateType = () => AppStateType
export type DispachToObjectType = Dispatch<ActionsTypes>

// type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

// export const getDB = (): ThunkType => async (dispatch, getState) => {
//   const data: InitialStateType = await getLibFromServer()

//   dispatch(getLibSuccess(data))
// };
// export const addItem = (values: ValuesType): ThunkType => async (dispatch, getState) => {
//   const status: number = await addNewItem(values)
//   if (status === 201) {
//     dispatch(getDB())
//   }
// };
// export const deleteItem = (id: number): ThunkType => async (dispatch, getState) => {
//   const status: number = await deleteItemFromServer(id)
//   if (status === 200) {
//     dispatch(getDB())
//   }
// };
// export const putNewPrice = (id: number, name: string, newPrice: number, unit: string, category: 'material' | 'work'): ThunkType => async (dispatch, getState) => {
//   const status: number = await putNewPriceToServer(id, name, newPrice, unit, category)
//   if (status === 200) {
//     dispatch(getDB())
//   }
// };


export default objectReducer;
