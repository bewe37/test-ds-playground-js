import { DatePicker, Flex } from 'antd';

const meta = {
  title: 'Data Entry/DatePicker',
  component: DatePicker,
};
export default meta;

export const Playground = {};

export const AllVariants = {
  render: () => (
    <Flex vertical gap="middle" style={{ width: 320 }}>
      <DatePicker placeholder="Date" />
      <DatePicker picker="week" />
      <DatePicker picker="month" />
      <DatePicker picker="quarter" />
      <DatePicker picker="year" />
      <DatePicker showTime placeholder="Date and time" />
      <DatePicker.RangePicker />
      <DatePicker variant="filled" placeholder="Filled" />
      <DatePicker variant="borderless" placeholder="Borderless" />
      <DatePicker size="small" placeholder="Small" />
      <DatePicker size="large" placeholder="Large" />
      <DatePicker status="error" placeholder="Error" />
      <DatePicker disabled placeholder="Disabled" />
    </Flex>
  ),
};
