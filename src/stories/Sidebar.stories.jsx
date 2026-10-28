import { MailOutlined } from '@ant-design/icons';
import { Flex } from 'antd';
import { Sidebar } from '../components/Sidebar';
import { StatefulSidebar, tenantArgs, useToolbarTheme } from './sidebarDemo';

const items = [
  { key: 'nav-1', icon: <MailOutlined />, label: 'Navigation Item' },
  { key: 'nav-2', icon: <MailOutlined />, label: 'Navigation Item' },
  {
    key: 'submenu',
    icon: <MailOutlined />,
    label: 'Submenu',
    children: [
      { key: 'sub-1', label: 'Navigation Item' },
      { key: 'sub-2', label: 'Navigation Item' },
      { key: 'sub-3', label: 'Navigation Item' },
    ],
  },
  { key: 'nav-3', icon: <MailOutlined />, label: 'Navigation Item' },
  { key: 'nav-4', icon: <MailOutlined />, label: 'Navigation Item' },
];

const meta = {
  title: 'Navigation/Sidebar',
  component: Sidebar,
  parameters: { layout: 'fullscreen' },
  args: {
    items,
    collapsed: false,
    ...tenantArgs,
    menuProps: { defaultSelectedKeys: ['sub-2'], defaultOpenKeys: ['submenu'] },
  },
  argTypes: {
    // Follows the toolbar's colour mode, which the footer menu's Theme row also switches.
    theme: { control: false },
    onThemeChange: { control: false },
    userMenu: { control: false },
  },
  decorators: [
    (Story) => (
      <div style={{ height: '100vh' }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

export const Playground = {
  render: function Render(args) {
    return <StatefulSidebar key={String(args.collapsed)} {...args} {...useToolbarTheme()} />;
  },
};

export const AllVariants = {
  render: function Render(args) {
    const toolbarTheme = useToolbarTheme();
    return (
      <Flex gap="large" style={{ height: '100%' }}>
        <StatefulSidebar {...args} {...toolbarTheme} />
        <StatefulSidebar {...args} {...toolbarTheme} collapsed menuProps={{ defaultSelectedKeys: [] }} />
      </Flex>
    );
  },
};
