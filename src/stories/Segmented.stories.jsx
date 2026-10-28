import { Flex, Segmented } from 'antd';

const options = ['Daily', 'Weekly', 'Monthly', { label: 'Yearly', value: 'Yearly', disabled: true }];

const meta = {
  title: 'Data Display/Segmented',
  component: Segmented,
  args: { options },
};
export default meta;

export const Playground = {};

export const AllVariants = {
  render: () => (
    <Flex vertical gap="middle" align="flex-start">
      <Segmented options={options} />
      <Segmented options={options} size="small" />
      <Segmented options={options} size="large" />
      <Segmented options={options} shape="round" />
      <Segmented options={options} orientation="vertical" />
      <Segmented options={options} disabled />
      <div style={{ width: 480 }}>
        <Segmented options={options} block />
      </div>
    </Flex>
  ),
};
