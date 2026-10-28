import { Badge, Descriptions, Flex } from 'antd';

const items = [
  { key: 'name', label: 'Name', children: 'Design System' },
  { key: 'owner', label: 'Owner', children: 'Platform team' },
  { key: 'version', label: 'Version', children: '1.0.0' },
  { key: 'status', label: 'Status', children: <Badge status="processing" text="Active" /> },
  { key: 'updated', label: 'Updated', children: '22 Oct 2026' },
  { key: 'notes', label: 'Notes', children: 'Built on Ant Design 6 with tokens from Figma.', span: 3 },
];

const meta = {
  title: 'Data Display/Descriptions',
  component: Descriptions,
  args: { title: 'Project info', items },
};
export default meta;

export const Playground = {};

export const AllVariants = {
  render: () => (
    <Flex vertical gap={48}>
      <Descriptions title="Default" items={items} />
      <Descriptions title="Bordered" bordered items={items} />
      <Descriptions title="Bordered small" bordered size="small" items={items} />
      <Descriptions title="Vertical" layout="vertical" items={items} />
      <Descriptions title="Vertical bordered" layout="vertical" bordered items={items} />
      <Descriptions title="Two columns" column={2} items={items} />
    </Flex>
  ),
};
