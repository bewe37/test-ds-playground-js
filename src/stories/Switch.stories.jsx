import { Space, Switch } from 'antd';

const meta = {
  title: 'Data Entry/Switch',
  component: Switch,
  args: { defaultChecked: true },
};
export default meta;

export const Playground = {};

export const AllVariants = {
  render: () => (
    <Space wrap size="large">
      <Switch />
      <Switch defaultChecked />
      <Switch size="small" defaultChecked />
      <Switch checkedChildren="On" unCheckedChildren="Off" defaultChecked />
      <Switch loading defaultChecked />
      <Switch disabled />
      <Switch disabled defaultChecked />
    </Space>
  ),
};
