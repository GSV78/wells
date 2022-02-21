import { Layout, Menu, Breadcrumb } from 'antd';

const { Header, Content, Footer } = Layout;

function HeaderMenu() {
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

      <div className="site-layout-content">Content</div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>GSV78 ©2022</Footer>
  </Layout>
  )
}

export default HeaderMenu