import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DispachType, getDB } from './redux/libReducer';
import { Route, Routes, Link } from 'react-router-dom';
import Lib from './pages/Lib';
import New from './pages/New';
import Open from './pages/Open';
import Auth from './components/Auth';
import styles from './App.module.css';
import logo from './assets/images/logo.png';
import { AppStateType } from './redux/store';
import Start from './pages/Start';

function App() {
  const isAuth = useSelector((state: AppStateType) => {
    return state.auth.isAuth;
  });
  return isAuth ? <Start /> : <Auth />;
}

export default App;
