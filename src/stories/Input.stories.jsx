import { Flex, Input } from 'antd';

const meta = {
  title: 'Data Entry/Input',
  component: Input,
  args: { placeholder: 'Enter text' },
};
export default meta;

export const Playground = {};

export const AllVariants = {
  render: () => (
    <Flex vertical gap="middle" style={{ maxWidth: 360 }}>
      <Input placeholder="Default" />
      <Input placeholder="Filled" variant="filled" />
      <Input placeholder="Borderless" variant="borderless" />
      <Input placeholder="Underlined" variant="underlined" />
      <Input placeholder="Small" size="small" />
      <Input placeholder="Large" size="large" />
      <Input placeholder="With count" showCount maxLength={20} />
      <Input placeholder="Allow clear" allowClear defaultValue="Clear me" />
      <Input placeholder="Error" status="error" />
      <Input placeholder="Warning" status="warning" />
      <Input placeholder="Disabled" disabled />
      <Input.Password placeholder="Password" />
      <Input.Search placeholder="Search" enterButton />
      <Input.TextArea placeholder="Text area" rows={3} />
    </Flex>
  ),
};
