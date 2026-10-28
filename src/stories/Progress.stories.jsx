import { Flex, Progress } from 'antd';

const meta = {
  title: 'Feedback/Progress',
  component: Progress,
  args: { percent: 60 },
};
export default meta;

export const Playground = {};

export const AllVariants = {
  render: () => (
    <Flex vertical gap="large">
      <Flex vertical gap="small" style={{ maxWidth: 480 }}>
        <Progress percent={30} />
        <Progress percent={50} status="active" />
        <Progress percent={70} status="exception" />
        <Progress percent={100} />
        <Progress percent={50} showInfo={false} />
        <Progress percent={50} size="small" />
        <Progress percent={60} success={{ percent: 30 }} />
        <Progress percent={60} strokeColor={{ '0%': '#1F6FEB', '100%': '#52C41A' }} />
        <Progress percent={60} steps={5} />
      </Flex>
      <Flex gap="large" wrap>
        <Progress type="circle" percent={75} />
        <Progress type="circle" percent={70} status="exception" />
        <Progress type="circle" percent={100} />
        <Progress type="circle" percent={50} size="small" />
        <Progress type="dashboard" percent={75} />
        <Progress type="dashboard" percent={75} gapDegree={30} />
      </Flex>
    </Flex>
  ),
};
