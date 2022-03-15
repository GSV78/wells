import axios from 'axios';
import { ValuesType } from '../components/AddMaterials';
import { ObjectType } from '../redux/objectReducer';

export const getLibFromServer = () => {
  return axios.get(`http://localhost:3001/lib`).then((responce) => responce.data);
};
export const addNewItem = (values: ValuesType) => {
  return axios.post('http://localhost:3001/lib', values).then((responce) => responce.status);
};
export const deleteItemFromServer = (id: number) => {
  return axios.delete(`/lib/${id}`).then((responce) => responce.status);
};
export const putNewPriceToServer = (id: number, name: string, newPrice: number, unit: string, category: 'material' | 'work') => {
  return axios
    .put(`/lib/${id}`, { name, price: newPrice, unit, category })
    .then((responce) => responce.status);
};
export const saveObjectToServer = (object: ObjectType) => {
  return axios.post('/objects', object).then((responce) => responce.status);
};
export const getObjectsFromServer = () => {
  return axios.get(`/objects`).then((responce) => responce.data);
};
export const getCurrentObjectFromServer = (id: number) => {
  return axios.get(`/objects?id=${id}`).then((responce) => responce.data[0]);
};
export const deleteObjectFromServer = (id: number) => {
  return axios.delete(`/objects/${id}`).then((responce) => responce.status);
};