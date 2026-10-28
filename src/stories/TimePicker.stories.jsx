import { Flex, TimePicker } from 'antd';

const meta = {
  title: 'Data Entry/TimePicker',
  component: TimePicker,
};
export default meta;

export const Playground = {};

export const AllVariants = {
  render: () => (
    <Flex vertical gap="middle" style={{ width: 280 }}>
      <TimePicker placeholder="Time" />
      <TimePicker format="HH:mm" placeholder="Hours and minutes" />
      <TimePicker use12Hours format="h:mm a" placeholder="12-hour" />
      <TimePicker minuteStep={15} placeholder="15-minute steps" />
      <TimePicker.RangePicker />
      <TimePicker variant="filled" placeholder="Filled" />
      <TimePicker variant="borderless" placeholder="Borderless" />
      <TimePicker size="small" placeholder="Small" />
      <TimePicker size="large" placeholder="Large" />
      <TimePicker status="error" placeholder="Error" />
      <TimePicker disabled placeholder="Disabled" />
    </Flex>
  ),
};
