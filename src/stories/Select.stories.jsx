import { Flex, Select } from 'antd';

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'durian', label: 'Durian', disabled: true },
];

const meta = {
  title: 'Data Entry/Select',
  component: Select,
  args: { options, placeholder: 'Select a fruit', style: { width: 240 } },
};
export default meta;

export const Playground = {};

export const AllVariants = {
  render: () => (
    <Flex vertical gap="middle" style={{ width: 320 }}>
      <Select options={options} placeholder="Default" />
      <Select options={options} placeholder="Filled" variant="filled" />
      <Select options={options} placeholder="Borderless" variant="borderless" />
      <Select options={options} placeholder="Small" size="small" />
      <Select options={options} placeholder="Large" size="large" />
      <Select options={options} mode="multiple" defaultValue={['apple', 'banana']} />
      <Select options={options} mode="tags" placeholder="Tags" />
      <Select options={options} showSearch allowClear placeholder="Searchable" />
      <Select options={options} placeholder="Loading" loading />
      <Select options={options} placeholder="Error" status="error" />
      <Select options={options} placeholder="Disabled" disabled />
    </Flex>
  ),
};
