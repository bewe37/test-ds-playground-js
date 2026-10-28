import { Card, Flex, Statistic } from 'antd';

const meta = {
  title: 'Data Display/Statistic',
  component: Statistic,
  args: { title: 'Active users', value: 112893 },
};
export default meta;

export const Playground = {};

export const AllVariants = {
  render: () => (
    <Flex gap="large" wrap>
      <Statistic title="Active users" value={112893} />
      <Statistic title="Balance" value={112893} precision={2} prefix="$" />
      <Statistic title="Conversion" value={9.3} precision={1} suffix="%" />
      <Statistic title="Growth" value={11.28} precision={2} suffix="%" styles={{ content: { color: '#3f8600' } }} />
      <Statistic title="Loading" value={0} loading />
      <Card>
        <Statistic title="In a card" value={93} suffix="/ 100" />
      </Card>
    </Flex>
  ),
};
