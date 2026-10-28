import { Button, Flex, Popconfirm } from 'antd';

const meta = {
  title: 'Feedback/Popconfirm',
  component: Popconfirm,
  args: { title: 'Delete this item?', description: 'This cannot be undone.', okText: 'Delete', cancelText: 'Cancel' },
  render: (args) => (
    <Popconfirm {...args}>
      <Button danger>Delete</Button>
    </Popconfirm>
  ),
};
export default meta;

export const Playground = {};

// Real popconfirms held open (not antd's inline panel, which ignores ConfigProvider's popconfirm
// settings), spaced so the popups don't overlap.
export const AllVariants = {
  render: () => (
    <Flex vertical gap={200} style={{ padding: '16px 24px' }}>
      <Flex gap={280}>
        <Popconfirm open placement="bottomLeft" title="Title only"><Button>Title only</Button></Popconfirm>
        <Popconfirm open placement="bottomLeft" title="With description" description="This cannot be undone."><Button>With description</Button></Popconfirm>
        <Popconfirm open placement="bottomLeft" title="Custom text" okText="Yes" cancelText="No"><Button>Custom text</Button></Popconfirm>
      </Flex>
      <Flex gap={280}>
        <Popconfirm open placement="bottomLeft" title="Danger" description="Deletes everything." okButtonProps={{ danger: true }} okText="Delete"><Button danger>Danger</Button></Popconfirm>
        <Popconfirm open placement="bottomLeft" title="No cancel" showCancel={false}><Button>No cancel</Button></Popconfirm>
      </Flex>
      {/* The arrow's outline on every side. */}
      <Flex gap={360} style={{ marginTop: 120, paddingInlineStart: 280 }}>
        <Popconfirm open placement="left" title="Left"><Button>Left</Button></Popconfirm>
        <Popconfirm open placement="right" title="Right"><Button>Right</Button></Popconfirm>
        <Popconfirm open placement="top" title="Top"><Button>Top</Button></Popconfirm>
      </Flex>
    </Flex>
  ),
};
