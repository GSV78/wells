import axios from 'axios';
import { ValuesType } from '../components/AddMaterials';

export const getLibFromServer = () => {
  return axios.get(`/lib`).then((responce) => responce.data);
};
export const addNewItem = (values: ValuesType) => {
  return axios.post('/lib', values).then((responce) => responce.status);
};
export const deleteItemFromServer = (id: number) => {
  return axios.delete(`/lib/${id}`).then((responce) => responce.status);
};
export const putNewPriceToServer = (id: number, name: string, newPrice: number, unit: string, category: 'material' | 'work') => {
  return axios
    .put(`/lib/${id}`, { name, price: newPrice, unit, category })
    .then((responce) => responce.status);
};
