import { Button, Space } from 'antd';

const meta = {
  title: 'General/Button',
  component: Button,
  args: { children: 'Button' },
};
export default meta;

export const Playground = { args: { type: 'primary' } };

export const AllVariants = {
  render: () => (
    <Space wrap>
      <Button type="primary">Primary</Button>
      <Button>Default</Button>
      <Button type="dashed">Dashed</Button>
      <Button type="text">Text</Button>
      <Button type="link">Link</Button>
      <Button type="primary" loading>Loading</Button>
      <Button type="primary" disabled>Disabled</Button>
      <Button type="primary" danger>Danger</Button>
    </Space>
  ),
};
