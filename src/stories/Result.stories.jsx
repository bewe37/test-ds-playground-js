import { Button, Flex, Result } from 'antd';

const meta = {
  title: 'Feedback/Result',
  component: Result,
  args: {
    status: 'success',
    title: 'Purchase complete',
    subTitle: 'Order number 2026102201. It will arrive in 3–5 days.',
    extra: <Button type="primary">Go to orders</Button>,
  },
};
export default meta;

export const Playground = {};

export const AllVariants = {
  render: () => (
    <Flex gap="large" wrap align="flex-start">
      {['success', 'info', 'warning', 'error', '403', '404', '500'].map((status) => (
        <Result
          key={status}
          status={status}
          title={status}
          subTitle="Subtitle text"
          extra={<Button type="primary">Action</Button>}
          style={{ width: 360 }}
        />
      ))}
    </Flex>
  ),
};
