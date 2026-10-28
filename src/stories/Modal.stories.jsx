import { useState } from 'react';
import { Button, Flex, Modal } from 'antd';

// antd's internal panel renders a modal inline, so all variants fit on one screen.
const ModalPanel = Modal._InternalPanelDoNotUseOrYouWillBeFired;

function ModalDemo(props) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>Open modal</Button>
      <Modal {...props} open={open} onOk={() => setOpen(false)} onCancel={() => setOpen(false)} />
    </>
  );
}

const meta = {
  title: 'Feedback/Modal',
  component: Modal,
  args: { title: 'Modal title', children: 'Modal content', okText: 'OK', cancelText: 'Cancel' },
  render: (args) => <ModalDemo {...args} />,
};
export default meta;

export const Playground = {};

export const AllVariants = {
  render: () => (
    <Flex gap="large" wrap align="flex-start">
      <ModalPanel title="Default" style={{ width: 360 }}>Modal content</ModalPanel>
      <ModalPanel
        title="Custom footer"
        style={{ width: 360 }}
        footer={<Flex justify="end" gap="small"><Button>Back</Button><Button type="primary" danger>Delete</Button></Flex>}
      >
        Modal content
      </ModalPanel>
      <ModalPanel type="confirm" title="Confirm" style={{ width: 360 }}>Are you sure?</ModalPanel>
      <ModalPanel type="info" title="Info" style={{ width: 360 }}>Something you should know.</ModalPanel>
      <ModalPanel type="success" title="Success" style={{ width: 360 }}>It worked.</ModalPanel>
      <ModalPanel type="warn" title="Warning" style={{ width: 360 }}>Be careful.</ModalPanel>
      <ModalPanel type="error" title="Error" style={{ width: 360 }}>Something went wrong.</ModalPanel>
    </Flex>
  ),
};
