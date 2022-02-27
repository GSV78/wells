import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { DispachType, getDB } from './redux/libReducer';
import { Route, Routes, Link } from 'react-router-dom';
import Lib from './pages/Lib';
import New from './pages/New';

const { Header, Content, Footer } = Layout;

function App() {
  const dispatch: DispachType = useDispatch();
  useEffect(() => {
    dispatch(getDB());
  }, [dispatch]);

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key={1}>
            <Link to="/">{`Справочник`}</Link>
          </Menu.Item>
          <Menu.Item key={2}>
            {' '}
            <Link to="/new/">{`Новый объект`}</Link>
          </Menu.Item>
          <Menu.Item key={3}>
            <Link to="/open/">{`Открыть объект`}</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 25px' }}>
        <div className="site-layout-content">
          <Routes>
            <Route path="/" element={<Lib />} />
            <Route path="/new/" element={<New />} />
            <Route path="/open/" element={<div>В разработке...</div>} />
          </Routes>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>GSV78 ©2022</Footer>
    </Layout>
  );
}

export default App;
