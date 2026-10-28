import { Flex, Rate } from 'antd';

const meta = {
  title: 'Data Entry/Rate',
  component: Rate,
  args: { defaultValue: 3 },
};
export default meta;

export const Playground = {};

export const AllVariants = {
  render: () => (
    <Flex vertical gap="middle">
      <Rate defaultValue={3} />
      <Rate defaultValue={2.5} allowHalf />
      <Rate defaultValue={4} count={10} />
      <Rate defaultValue={3} character="A" />
      <Rate defaultValue={3} tooltips={['Terrible', 'Bad', 'Normal', 'Good', 'Wonderful']} />
      <Rate defaultValue={3} size="small" />
      <Rate defaultValue={3} size="large" />
      <Rate defaultValue={3} disabled />
    </Flex>
  ),
};
