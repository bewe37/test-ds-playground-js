import { Breadcrumb, Flex } from 'antd';

const items = [
  { title: 'Home', href: '#' },
  { title: 'Projects', href: '#' },
  { title: 'Design system' },
];

const meta = {
  title: 'Navigation/Breadcrumb',
  component: Breadcrumb,
  args: { items },
};
export default meta;

export const Playground = {};

export const AllVariants = {
  render: () => (
    <Flex vertical gap="large">
      <Breadcrumb items={items} />
      <Breadcrumb separator=">" items={items} />
      <Breadcrumb
        items={[
          { title: 'Home', href: '#' },
          {
            title: 'Components',
            menu: { items: [{ key: 'general', label: 'General' }, { key: 'layout', label: 'Layout' }] },
          },
          { title: 'Button' },
        ]}
      />
      <Breadcrumb
        items={[
          { title: 'Home', href: '#' },
          { type: 'separator', separator: ':' },
          { title: 'Settings' },
        ]}
      />
    </Flex>
  ),
};
