import { Flex, Steps } from 'antd';

const items = [
  { title: 'Finished', content: 'This is a description' },
  { title: 'In progress', content: 'This is a description' },
  { title: 'Waiting', content: 'This is a description' },
];

const meta = {
  title: 'Navigation/Steps',
  component: Steps,
  args: { items, current: 1 },
};
export default meta;

export const Playground = {};

export const AllVariants = {
  render: () => (
    <Flex vertical gap={48}>
      <Steps current={1} items={items} />
      <Steps current={1} status="error" items={items} />
      <Steps current={1} size="small" items={items} />
      <Steps current={1} type="dot" items={items} />
      <Steps current={1} type="navigation" items={items} />
      <Steps current={1} type="inline" items={items} />
      <Steps current={1} percent={60} items={items} />
      <Steps current={1} variant="outlined" items={items} />
      <Steps current={1} titlePlacement="vertical" items={items} />
      <Steps current={1} orientation="vertical" items={items} />
    </Flex>
  ),
};
