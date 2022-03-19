import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { DispachType, getDB } from '../redux/libReducer';
import { Route, Routes, Link } from 'react-router-dom';
import Lib from './Lib';
import New from './New';
import Open from './Open';
import styles from './Start.module.css';
import logo from '../assets/images/logo.png';

const { Header, Content, Footer } = Layout;
function Start() {
  const dispatch: DispachType = useDispatch();
  useEffect(() => {
    dispatch(getDB());
  }, []);
  return (
    <Layout className="layout">
      <div className={styles.logo}>
        <img src={logo} alt="logo" />
      </div>
      <Header className={styles.header}>
        <Menu selectable={false} theme="dark" mode="horizontal">
          <Menu.Item key={1}>
            <Link to="/">{`С`}</Link>
          </Menu.Item>
          <Menu.Item key={2}>
            {' '}
            <Link to="/new/">{`Н`}</Link>
          </Menu.Item>
          <Menu.Item key={3}>
            <Link to="/open/">{`А`}</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 25px' }}>
        <div className="site-layout-content">
          <Routes>
            <Route path="/" element={<Lib />} />
            <Route path="/new/" element={<New />} />
            <Route path="/open/" element={<Open />} />
          </Routes>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>GSV78 ©2022</Footer>
    </Layout>
  );
}

export default Start;
