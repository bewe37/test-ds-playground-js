import { Calendar, Flex } from 'antd';

const meta = {
  title: 'Data Display/Calendar',
  component: Calendar,
  args: { fullscreen: false, style: { width: 320 } },
};
export default meta;

export const Playground = {};

export const AllVariants = {
  render: () => (
    <Flex vertical gap="large">
      <Flex gap="large" align="flex-start">
        <Calendar fullscreen={false} style={{ width: 320 }} />
        <Calendar fullscreen={false} mode="year" style={{ width: 320 }} />
      </Flex>
      <Calendar />
    </Flex>
  ),
};
