import * as axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001',
});

export const getLibFromServer = () => {
  return instance.get('/lib').then((responce) => responce.data);
};
export const addNewItem = (values) => {
  return instance.post('/lib', values).then((responce) => responce.data);
};
