import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getDB } from './redux/libReducer';
import { Route, Routes } from 'react-router-dom';
import Lib from './components/Lib';

const { Header, Content, Footer } = Layout;

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    debugger;
    dispatch(getDB());
  }, [dispatch]);
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key={1}>{`Справочник`}</Menu.Item>
          <Menu.Item key={2}>{`Новый объект`}</Menu.Item>
          <Menu.Item key={3}>{`Открыть объект`}</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content">
          <Routes>
            <Route path="/" element={<Lib />} />
          </Routes>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>GSV78 ©2022</Footer>
    </Layout>
  );
}

export default App;
