import { Flex, Radio } from 'antd';

const options = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'never', label: 'Never', disabled: true },
];

const meta = {
  title: 'Data Entry/Radio',
  component: Radio,
  args: { children: 'Radio' },
};
export default meta;

export const Playground = {};

export const AllVariants = {
  render: () => (
    <Flex vertical gap="large">
      <Flex gap="large" wrap>
        <Radio>Unchecked</Radio>
        <Radio checked>Checked</Radio>
        <Radio disabled>Disabled</Radio>
        <Radio disabled checked>Disabled checked</Radio>
      </Flex>
      <Radio.Group options={options} defaultValue="weekly" />
      <Radio.Group options={options} defaultValue="weekly" orientation="vertical" />
      <Radio.Group options={options} defaultValue="weekly" optionType="button" />
      <Radio.Group options={options} defaultValue="weekly" optionType="button" buttonStyle="solid" />
      <Radio.Group options={options} defaultValue="weekly" optionType="button" size="small" />
      <Radio.Group options={options} defaultValue="weekly" optionType="button" size="large" />
      <Radio.Group options={options} defaultValue="weekly" optionType="button" disabled />
    </Flex>
  ),
};
