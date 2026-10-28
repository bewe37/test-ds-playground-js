import { Flex, Timeline } from 'antd';

const items = [
  { title: '09:00', content: 'Tokens exported from Figma' },
  { title: '10:30', content: 'Theme updated', color: 'green' },
  { title: '12:00', content: 'Visual review failed', color: 'red' },
  { title: '14:00', content: 'Published to Chromatic', color: 'gray' },
];

const meta = {
  title: 'Data Display/Timeline',
  component: Timeline,
  args: { items },
};
export default meta;

export const Playground = {};

export const AllVariants = {
  render: () => (
    <Flex vertical gap={48}>
      <Flex gap={64} align="flex-start">
        <Timeline items={items} />
        <Timeline items={[...items, { content: 'Recording…', loading: true }]} />
        <Timeline items={items} reverse />
        <Timeline items={items} variant="filled" />
      </Flex>
      <Timeline items={items} mode="alternate" />
      <Timeline items={items} mode="end" />
      <Timeline items={items} orientation="horizontal" />
    </Flex>
  ),
};
