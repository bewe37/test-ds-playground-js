import { Button, Flex } from 'antd';

const boxes = (n) =>
  Array.from({ length: n }, (_, i) => <Button key={i}>Item {i + 1}</Button>);

const meta = {
  title: 'Layout/Flex',
  component: Flex,
  args: { gap: 'middle', justify: 'flex-start', align: 'center', children: boxes(4) },
};
export default meta;

export const Playground = {};

export const AllVariants = {
  render: () => (
    <Flex vertical gap="large">
      <Flex gap="small">{boxes(4)}</Flex>
      <Flex gap="large">{boxes(4)}</Flex>
      <Flex justify="center" gap="small">{boxes(3)}</Flex>
      <Flex justify="space-between">{boxes(3)}</Flex>
      <Flex justify="space-around">{boxes(3)}</Flex>
      <Flex vertical gap="small" style={{ width: 200 }}>{boxes(3)}</Flex>
      <Flex wrap gap="small" style={{ width: 360 }}>{boxes(8)}</Flex>
    </Flex>
  ),
};
