import { Avatar, Flex, List } from 'antd';

const data = [
  { title: 'Button', description: 'Trigger an operation' },
  { title: 'Input', description: 'Enter text' },
  { title: 'Select', description: 'Choose from options' },
];

const renderItem = (item) => (
  <List.Item actions={[<a key="edit" href="#">Edit</a>]}>
    <List.Item.Meta avatar={<Avatar>{item.title[0]}</Avatar>} title={item.title} description={item.description} />
  </List.Item>
);

// List is deprecated in antd 6 in favour of Listy, but the Figma tokens still style it.
const meta = {
  title: 'Data Display/List',
  component: List,
  args: { dataSource: data, renderItem, style: { maxWidth: 480 } },
};
export default meta;

export const Playground = {};

export const AllVariants = {
  render: () => (
    <Flex vertical gap="large" style={{ maxWidth: 480 }}>
      <List dataSource={data} renderItem={renderItem} />
      <List dataSource={data} renderItem={renderItem} bordered header="Header" footer="Footer" />
      <List dataSource={data} renderItem={(item) => <List.Item>{item.title}</List.Item>} size="small" bordered />
      <List dataSource={data} renderItem={(item) => <List.Item>{item.title}</List.Item>} size="large" bordered />
      <List dataSource={data} renderItem={renderItem} loading />
      <List dataSource={[]} renderItem={renderItem} />
    </Flex>
  ),
};
