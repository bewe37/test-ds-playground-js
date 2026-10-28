import { App, Button, Flex } from 'antd';

// App supplies context-aware message, notification and modal through App.useApp().
function Actions() {
  const { message, notification, modal } = App.useApp();
  return (
    <Flex gap="small" wrap>
      <Button type="primary" onClick={() => message.success('Changes saved')}>Message</Button>
      <Button onClick={() => notification.info({ title: 'Notification title', description: 'Notification description' })}>
        Notification
      </Button>
      <Button onClick={() => modal.confirm({ title: 'Delete this item?', content: 'This cannot be undone.' })}>Modal</Button>
    </Flex>
  );
}

const meta = {
  title: 'Other/App',
  component: App,
  args: { message: { maxCount: 3 }, notification: { placement: 'topRight' } },
  argTypes: {
    notification: { control: 'object' },
    message: { control: 'object' },
  },
  render: (args) => (
    <App {...args}>
      <Actions />
    </App>
  ),
};
export default meta;

export const Playground = {};

export const AllVariants = {
  render: () => (
    <Flex vertical gap="large">
      <App>
        <Actions />
      </App>
      <App notification={{ placement: 'bottomLeft' }} message={{ top: 120 }}>
        <Actions />
      </App>
    </Flex>
  ),
};
