import { Flex, Layout, Menu } from 'antd';

const { Header, Sider, Content, Footer } = Layout;

const navItems = ['Home', 'Projects', 'Settings'].map((label) => ({ key: label, label }));

const meta = {
  title: 'Layout/Layout',
  component: Layout,
  parameters: { layout: 'fullscreen' },
};
export default meta;

export const Playground = {
  render: (args) => (
    <Layout {...args} style={{ minHeight: 360 }}>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['Home']} items={navItems} style={{ flex: 1 }} />
      </Header>
      <Content style={{ padding: 24 }}>Content</Content>
      <Footer>Footer</Footer>
    </Layout>
  ),
};

export const AllVariants = {
  render: () => (
    <Flex vertical gap="large" style={{ padding: 16 }}>
      <Layout style={{ minHeight: 240 }}>
        <Header style={{ color: '#fff' }}>Header</Header>
        <Content style={{ padding: 24 }}>Header · Content · Footer</Content>
        <Footer>Footer</Footer>
      </Layout>
      <Layout style={{ minHeight: 240 }}>
        <Sider width={160}>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['Home']} items={navItems} />
        </Sider>
        <Layout>
          <Header style={{ color: '#fff' }}>Header</Header>
          <Content style={{ padding: 24 }}>Sider · Header · Content</Content>
        </Layout>
      </Layout>
      <Layout style={{ minHeight: 240 }}>
        <Header style={{ color: '#fff' }}>Header</Header>
        <Layout>
          <Sider width={160} theme="light">
            <Menu mode="inline" defaultSelectedKeys={['Home']} items={navItems} />
          </Sider>
          <Content style={{ padding: 24 }}>Header · light Sider · Content</Content>
        </Layout>
      </Layout>
      <Layout style={{ minHeight: 240 }}>
        <Sider collapsed collapsedWidth={64}>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['Home']} items={navItems} />
        </Sider>
        <Content style={{ padding: 24 }}>Collapsed Sider</Content>
      </Layout>
    </Flex>
  ),
};
