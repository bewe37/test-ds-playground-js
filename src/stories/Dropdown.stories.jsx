import { Button, Dropdown, Flex } from 'antd';

const items = [
  { key: 'edit', label: 'Edit' },
  { key: 'duplicate', label: 'Duplicate' },
  { key: 'disabled', label: 'Disabled', disabled: true },
  { type: 'divider' },
  { key: 'delete', label: 'Delete', danger: true },
];

const meta = {
  title: 'Navigation/Dropdown',
  component: Dropdown,
  args: { menu: { items }, trigger: ['click'] },
  render: (args) => (
    <Dropdown {...args}>
      <Button>Actions</Button>
    </Dropdown>
  ),
};
export default meta;

export const Playground = {};

// Menus are forced open so every variant is visible at once.
export const AllVariants = {
  render: () => (
    <Flex gap={160} style={{ height: 280 }}>
      <Dropdown open menu={{ items }}>
        <Button>Default</Button>
      </Dropdown>
      <Dropdown open arrow menu={{ items }}>
        <Button>With arrow</Button>
      </Dropdown>
      <Dropdown open menu={{ items, selectable: true, defaultSelectedKeys: ['duplicate'] }}>
        <Button>Selectable</Button>
      </Dropdown>
      <Dropdown open menu={{ items: [{ key: 'group', type: 'group', label: 'Group', children: items.slice(0, 2) }] }}>
        <Button>Grouped</Button>
      </Dropdown>
    </Flex>
  ),
};
