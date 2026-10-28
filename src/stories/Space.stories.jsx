import { Button, Divider, Flex, Input, Space } from 'antd';

const meta = {
  title: 'Layout/Space',
  component: Space,
  args: {
    size: 'middle',
    children: [<Button key="1">One</Button>, <Button key="2">Two</Button>, <Button key="3">Three</Button>],
  },
};
export default meta;

export const Playground = {};

export const AllVariants = {
  render: () => (
    <Flex vertical gap="large">
      <Space size="small">
        <Button>Small</Button>
        <Button>Small</Button>
      </Space>
      <Space size="middle">
        <Button>Middle</Button>
        <Button>Middle</Button>
      </Space>
      <Space size="large">
        <Button>Large</Button>
        <Button>Large</Button>
      </Space>
      <Space orientation="vertical">
        <Button>Vertical</Button>
        <Button>Vertical</Button>
      </Space>
      <Space separator={<Divider orientation="vertical" />}>
        <a href="#">Link</a>
        <a href="#">Link</a>
        <a href="#">Link</a>
      </Space>
      <Space.Compact>
        <Input defaultValue="Compact input" style={{ width: 200 }} />
        <Button type="primary">Submit</Button>
      </Space.Compact>
    </Flex>
  ),
};
