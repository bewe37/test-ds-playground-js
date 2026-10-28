import { Anchor, Flex } from 'antd';

const items = [
  { key: 'intro', href: '#intro', title: 'Introduction' },
  {
    key: 'api',
    href: '#api',
    title: 'API',
    children: [
      { key: 'props', href: '#props', title: 'Props' },
      { key: 'events', href: '#events', title: 'Events' },
    ],
  },
  { key: 'faq', href: '#faq', title: 'FAQ' },
];

const meta = {
  title: 'Navigation/Anchor',
  component: Anchor,
  args: { items, affix: false },
};
export default meta;

export const Playground = {};

export const AllVariants = {
  render: () => (
    <Flex vertical gap="large">
      <Anchor affix={false} items={items} />
      <Anchor affix={false} direction="horizontal" items={items.map(({ children: _, ...item }) => item)} />
    </Flex>
  ),
};
