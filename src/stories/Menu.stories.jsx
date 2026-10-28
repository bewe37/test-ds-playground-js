import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Flex, Menu } from 'antd';

const items = [
  { key: 'mail', icon: <MailOutlined />, label: 'Mail' },
  {
    key: 'apps',
    icon: <AppstoreOutlined />,
    label: 'Apps',
    children: [
      { key: 'design', label: 'Design' },
      { key: 'engineering', label: 'Engineering' },
    ],
  },
  {
    key: 'settings',
    icon: <SettingOutlined />,
    label: 'Settings',
    children: [
      {
        type: 'group',
        label: 'Account',
        children: [
          { key: 'profile', label: 'Profile' },
          { key: 'billing', label: 'Billing' },
        ],
      },
    ],
  },
  { type: 'divider' },
  { key: 'disabled', label: 'Disabled', disabled: true },
  { key: 'delete', label: 'Delete', danger: true },
];

const meta = {
  title: 'Navigation/Menu',
  component: Menu,
  args: { items, mode: 'inline', theme: 'light', defaultSelectedKeys: ['mail'], style: { width: 256 } },
  argTypes: {
    mode: { control: 'inline-radio', options: ['vertical', 'horizontal', 'inline'] },
    theme: { control: 'inline-radio', options: ['light', 'dark'] },
  },
};
export default meta;

export const Playground = {};

export const AllVariants = {
  render: () => (
    <Flex vertical gap="large">
      <Menu mode="horizontal" defaultSelectedKeys={['mail']} items={items} />
      <Flex gap="large" align="flex-start" wrap>
        <Menu mode="inline" defaultSelectedKeys={['design']} defaultOpenKeys={['apps']} items={items} style={{ width: 256 }} />
        <Menu mode="vertical" defaultSelectedKeys={['mail']} items={items} style={{ width: 256 }} />
        <Menu mode="inline" theme="dark" defaultSelectedKeys={['design']} defaultOpenKeys={['apps']} items={items} style={{ width: 256 }} />
        <Menu mode="inline" inlineCollapsed defaultSelectedKeys={['mail']} items={items} />
      </Flex>
    </Flex>
  ),
};
