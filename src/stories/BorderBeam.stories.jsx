import { BorderBeam, Card, Flex } from 'antd';

const card = (label) => (
  <Card style={{ width: 240 }}>{label}</Card>
);

const meta = {
  title: 'Other/BorderBeam',
  component: BorderBeam,
  args: { children: card('Card with a border beam') },
};
export default meta;

export const Playground = {};

export const AllVariants = {
  render: () => (
    <Flex gap="large" wrap>
      <BorderBeam>{card('Default')}</BorderBeam>
      <BorderBeam color="#1F6FEB">{card('Custom colour')}</BorderBeam>
      <BorderBeam color={[{ color: '#1F6FEB', percent: 0 }, { color: '#52C41A', percent: 100 }]}>
        {card('Gradient')}
      </BorderBeam>
      <BorderBeam count={2} duration={4}>{card('Two beams, slower')}</BorderBeam>
      <BorderBeam lineWidth={3} size={120}>{card('Thicker, longer')}</BorderBeam>
    </Flex>
  ),
};
