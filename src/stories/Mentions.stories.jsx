import { Flex, Mentions } from 'antd';

const options = ['alex', 'sam', 'jordan'].map((value) => ({ value, label: value }));

const meta = {
  title: 'Data Entry/Mentions',
  component: Mentions,
  args: { options, placeholder: 'Type @ to mention someone', style: { width: 320 } },
};
export default meta;

export const Playground = {};

export const AllVariants = {
  render: () => (
    <Flex vertical gap="middle" style={{ width: 320 }}>
      <Mentions options={options} placeholder="Default" />
      <Mentions options={options} defaultValue="Hello @alex " />
      <Mentions options={options} placeholder="Filled" variant="filled" />
      <Mentions options={options} placeholder="Borderless" variant="borderless" />
      <Mentions options={options} placeholder="Auto size" autoSize={{ minRows: 2, maxRows: 4 }} />
      <Mentions options={options} placeholder="Allow clear" allowClear />
      <Mentions options={options} placeholder="Error" status="error" />
      <Mentions options={options} placeholder="Disabled" disabled />
    </Flex>
  ),
};
