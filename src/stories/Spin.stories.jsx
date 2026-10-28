import { Alert, Flex, Spin } from 'antd';

const meta = {
  title: 'Feedback/Spin',
  component: Spin,
  args: { spinning: true },
};
export default meta;

export const Playground = {};

export const AllVariants = {
  render: () => (
    <Flex vertical gap="large" style={{ maxWidth: 480 }}>
      <Flex gap="large" align="center">
        <Spin size="small" />
        <Spin />
        <Spin size="large" />
        <Spin percent={40} />
      </Flex>
      <Spin description="Loading…">
        <Alert type="info" title="Content behind the spinner" description="Spin can wrap content and dim it while loading." />
      </Spin>
    </Flex>
  ),
};
