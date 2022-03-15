import { useSelector } from 'react-redux';
import { Dispatch } from 'react';
import { ThunkAction } from 'redux-thunk';
import { getCurrentObjectFromServer, saveObjectToServer } from '../api/api';
import { AppStateType } from './store';
import { putNewPrice } from './libReducer';


// let lib = useSelector((state: AppStateType) => state.lib)
//action.types
const ADD_ITEM_TO_OBJECT = 'wells/objectReducer/add_item_to_object';
const SAVE_OBJECT_NAME = 'wells/objectReducer/save_object_name';
const CHANGE_PRICE = 'wells/objectReducer/change_price';
const LOAD_OBJECT_SUCCESS = 'wells/objectReducer/load_object_success';

export type ObjectItemsType = { id: number, name: string, price: number, unit: string, category: 'material' | 'work', count: number }
export type ObjectType = { id: number, name: string, items: Array<ObjectItemsType>, priceMaterials: number, priceWorks: number, totalSum: number }

let initialState: ObjectType = {
  id: 0,
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
    case CHANGE_PRICE: {
      let arrMatch = state.items.filter((el) => {
        return el.name === action.name
      })
      let objectItem: ObjectItemsType | null = arrMatch[0]
      let delta: number
      if (arrMatch.length !== 0) {
        delta = action.payload - objectItem.price
      } else {
        delta = 0
      }
      let matPriceChange: number = 0
      let wokPriceChange: number = 0
      objectItem.category === 'material'
        ? matPriceChange = objectItem.count * delta
        : wokPriceChange = objectItem.count * delta
      return ({
        ...state,
        priceMaterials: state.priceMaterials + matPriceChange,
        priceWorks: state.priceWorks + wokPriceChange,
        totalSum: state.totalSum + wokPriceChange + matPriceChange
      })
    }
    case LOAD_OBJECT_SUCCESS: {
      let object = action.payload
      return ({
        ...state,
        name: action.payload.name,
        items: action.payload.items,
        priceMaterials: action.payload.priceMaterials,
        priceWorks: action.payload.priceWorks,
        totalSum: action.payload.totalSum
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
type ActionsTypes = AddItemType | SaveObjectNameType | ChangePriceType | LoadObjectType

type AddItemType = {
  type: typeof ADD_ITEM_TO_OBJECT
  payload: ObjectItemsType
}
type ChangePriceType = {
  type: typeof CHANGE_PRICE
  payload: number
  name: string
}
type SaveObjectNameType = {
  type: typeof SAVE_OBJECT_NAME
  payload: string
}
type LoadObjectType = {
  type: typeof LOAD_OBJECT_SUCCESS
  payload: ObjectType
}

export const addItemToObject = (payload: ObjectItemsType): AddItemType => ({ type: ADD_ITEM_TO_OBJECT, payload });
export const changePriceInObject = (payload: number, name: string): ChangePriceType => ({ type: CHANGE_PRICE, payload, name });
export const saveObjectName = (payload: string): SaveObjectNameType => ({ type: SAVE_OBJECT_NAME, payload });
export const loadObjectSuccess = (payload: ObjectType): LoadObjectType => ({ type: LOAD_OBJECT_SUCCESS, payload });

// ThunkCreators

export type DispachToObjectType = Dispatch<ActionsTypes | ThunkType>

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const saveObjectToServerThunk = (object: ObjectType): ThunkType => async (dispatch, getState) => {
  const status: number = await saveObjectToServer(object)
  if (status === 201) {
    dispatch(saveObjectName(object.name))
  }
};

export const loadObjectFromServerThunk = (id: number): ThunkType => async (dispatch, getState) => {
  const data: ObjectType = await getCurrentObjectFromServer(id)
  dispatch(loadObjectSuccess(data))
};

export default objectReducer;
