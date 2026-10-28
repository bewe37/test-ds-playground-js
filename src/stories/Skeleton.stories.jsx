import { Flex, Skeleton } from 'antd';

const meta = {
  title: 'Feedback/Skeleton',
  component: Skeleton,
  args: { active: true, avatar: true, paragraph: { rows: 3 } },
};
export default meta;

export const Playground = {};

export const AllVariants = {
  render: () => (
    <Flex vertical gap="large" style={{ maxWidth: 560 }}>
      <Skeleton />
      <Skeleton active />
      <Skeleton avatar paragraph={{ rows: 2 }} />
      <Skeleton avatar={{ shape: 'square' }} title={false} paragraph={{ rows: 2 }} />
      <Flex gap="middle" align="center" wrap>
        <Skeleton.Button />
        <Skeleton.Button shape="round" />
        <Skeleton.Button active size="large" />
        <Skeleton.Avatar />
        <Skeleton.Avatar shape="square" />
        <Skeleton.Input />
        <Skeleton.Image />
        <Skeleton.Node>Node</Skeleton.Node>
      </Flex>
    </Flex>
  ),
};
