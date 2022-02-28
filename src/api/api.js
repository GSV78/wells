import * as axios from 'axios';

export const getLibFromServer = () => {
  return axios.get(`lib`).then((responce) => responce.data);
};
export const addNewItem = (values) => {
  return axios.post('/lib', values).then((responce) => responce.status);
};
export const deleteItemFromServer = (id) => {
  return axios.delete(`/lib/${id}`).then((responce) => responce.status);
};
export const putNewPriceToServer = (id, name, newPrice, unit, category) => {
  return axios
    .put(`/lib/${id}`, { name, price: newPrice, unit, category })
    .then((responce) => responce.status);
};
