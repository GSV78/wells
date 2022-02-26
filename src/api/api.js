import * as axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001',
});

export const getLibFromServer = () => {
  return instance.get('/lib').then((responce) => responce.data);
};
export const addNewItem = (values) => {
  return instance.post('/lib', values).then((responce) => responce.status);
};
export const deleteItemFromServer = (id) => {
  return instance.delete(`/lib/${id}`).then((responce) => responce.status);
};
export const putNewPriceToServer = (id, name, newPrice, unit, category) => {
  return instance
    .put(`/lib/${id}`, { name, price: newPrice, unit, category })
    .then((responce) => responce.status);
};
