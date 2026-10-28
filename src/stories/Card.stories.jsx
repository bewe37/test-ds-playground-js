import { Button, Card, Flex } from 'antd';

const meta = {
  title: 'Data Display/Card',
  component: Card,
  args: {
    title: 'Card title',
    children: 'Card content',
    style: { width: 300 },
  },
};
export default meta;

export const Playground = {};

export const AllVariants = {
  render: () => (
    <Flex gap="middle" wrap align="flex-start">
      <Card title="Default" style={{ width: 240 }}>
        Card content
      </Card>
      <Card title="Borderless" variant="borderless" style={{ width: 240 }}>
        Card content
      </Card>
      <Card title="With extra" extra={<a href="#">More</a>} style={{ width: 240 }}>
        Card content
      </Card>
      <Card
        title="With actions"
        actions={[<Button type="link" key="edit">Edit</Button>, <Button type="link" key="delete" danger>Delete</Button>]}
        style={{ width: 240 }}
      >
        Card content
      </Card>
      <Card title="Small" size="small" style={{ width: 240 }}>
        Card content
      </Card>
      <Card title="Hoverable" hoverable style={{ width: 240 }}>
        Card content
      </Card>
      <Card title="Loading" loading style={{ width: 240 }}>
        Card content
      </Card>
    </Flex>
  ),
};
