import { Collapse, Flex } from 'antd';

const items = [
  { key: '1', label: 'What is a design token?', children: 'A named value for a design decision, such as a colour.' },
  { key: '2', label: 'How do tokens reach code?', children: 'They are exported from Figma and passed to ConfigProvider.' },
  { key: '3', label: 'Disabled panel', children: 'Hidden', collapsible: 'disabled' },
];

const meta = {
  title: 'Data Display/Collapse',
  component: Collapse,
  args: { items, defaultActiveKey: ['1'], style: { maxWidth: 560 } },
};
export default meta;

export const Playground = {};

export const AllVariants = {
  render: () => (
    <Flex vertical gap="large" style={{ maxWidth: 560 }}>
      <Collapse items={items} defaultActiveKey={['1']} />
      <Collapse items={items} defaultActiveKey={['1']} accordion />
      <Collapse items={items} defaultActiveKey={['1']} bordered={false} />
      <Collapse items={items} defaultActiveKey={['1']} ghost />
      <Collapse items={items} defaultActiveKey={['1']} size="small" />
      <Collapse items={items} defaultActiveKey={['1']} size="large" />
      <Collapse items={items} expandIconPlacement="end" />
    </Flex>
  ),
};
