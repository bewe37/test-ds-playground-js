import { Button, Empty, Flex } from 'antd';

const meta = {
  title: 'Data Display/Empty',
  component: Empty,
};
export default meta;

export const Playground = {};

export const AllVariants = {
  render: () => (
    <Flex gap={48} wrap align="flex-start">
      <Empty />
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      <Empty description="No projects yet" />
      <Empty description="No results">
        <Button type="primary">Create one</Button>
      </Empty>
      <Empty description={false} />
    </Flex>
  ),
};
