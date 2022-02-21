import * as axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001',
});

export const getLibFromServer = () => {
  debugger;
  return instance.get('/lib').then((responce) => responce.data);
};
