import { Avatar, Badge, Card, Flex } from 'antd';

const meta = {
  title: 'Data Display/Badge',
  component: Badge,
  args: { count: 5 },
  render: (args) => (
    <Badge {...args}>
      <Avatar shape="square" size="large" />
    </Badge>
  ),
};
export default meta;

export const Playground = {};

export const AllVariants = {
  render: () => (
    <Flex vertical gap="large">
      <Flex gap="large" align="center">
        <Badge count={5}><Avatar shape="square" size="large" /></Badge>
        <Badge count={0} showZero><Avatar shape="square" size="large" /></Badge>
        <Badge count={120}><Avatar shape="square" size="large" /></Badge>
        <Badge count={120} overflowCount={999}><Avatar shape="square" size="large" /></Badge>
        <Badge dot><Avatar shape="square" size="large" /></Badge>
        <Badge count={5} size="small"><Avatar shape="square" size="large" /></Badge>
        <Badge count={5} color="#52C41A"><Avatar shape="square" size="large" /></Badge>
        <Badge count={8} />
      </Flex>
      <Flex gap="large">
        <Badge status="success" text="Success" />
        <Badge status="processing" text="Processing" />
        <Badge status="default" text="Default" />
        <Badge status="error" text="Error" />
        <Badge status="warning" text="Warning" />
      </Flex>
      <Badge.Ribbon text="Ribbon">
        <Card size="small" style={{ width: 280 }}>Card with a ribbon badge</Card>
      </Badge.Ribbon>
    </Flex>
  ),
};
