import { Flex, Listy } from 'antd';

const teams = ['Design', 'Engineering', 'Product'];
const items = Array.from({ length: 200 }, (_, i) => ({
  id: i,
  name: `Member ${i + 1}`,
  team: teams[i % teams.length],
}));

const itemRender = (item) => <div style={{ padding: '8px 12px' }}>{item.name}</div>;

const meta = {
  title: 'Data Display/Listy',
  component: Listy,
  args: { items, rowKey: 'id', height: 240, itemRender, style: { maxWidth: 360 } },
};
export default meta;

export const Playground = {};

export const AllVariants = {
  render: () => (
    <Flex gap="large" align="flex-start">
      <Listy items={items} rowKey="id" height={240} itemRender={itemRender} style={{ width: 280 }} />
      <Listy
        items={items}
        rowKey="id"
        height={240}
        sticky
        group={{ key: (item) => item.team, title: (team) => <strong>{team}</strong> }}
        itemRender={itemRender}
        style={{ width: 280 }}
      />
    </Flex>
  ),
};
