import { Checkbox, Flex } from 'antd';

const meta = {
  title: 'Data Entry/Checkbox',
  component: Checkbox,
  args: { children: 'Checkbox' },
};
export default meta;

export const Playground = {};

export const AllVariants = {
  render: () => (
    <Flex vertical gap="middle">
      <Flex gap="large" wrap>
        <Checkbox>Unchecked</Checkbox>
        <Checkbox defaultChecked>Checked</Checkbox>
        <Checkbox indeterminate>Indeterminate</Checkbox>
        <Checkbox disabled>Disabled</Checkbox>
        <Checkbox disabled defaultChecked>Disabled checked</Checkbox>
      </Flex>
      <Checkbox.Group
        options={['Apple', 'Banana', 'Cherry']}
        defaultValue={['Apple']}
      />
    </Flex>
  ),
};
