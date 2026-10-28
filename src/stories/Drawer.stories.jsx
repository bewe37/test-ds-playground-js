import { useState } from 'react';
import { Button, Drawer, Flex } from 'antd';

function DrawerDemo(props) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>Open drawer</Button>
      <Drawer {...props} open={open} onClose={() => setOpen(false)} />
    </>
  );
}

const meta = {
  title: 'Feedback/Drawer',
  component: Drawer,
  args: { title: 'Drawer title', placement: 'right', children: 'Drawer content' },
  render: (args) => <DrawerDemo {...args} />,
};
export default meta;

export const Playground = {};

// Each drawer renders inside its own frame (getContainer={false}) so all variants are visible at once.
const frame = { position: 'relative', height: 280, width: 360, overflow: 'hidden', border: '1px solid #d9d9d9' };

export const AllVariants = {
  render: () => (
    <Flex gap="large" wrap>
      {['right', 'left', 'top', 'bottom'].map((placement) => (
        <div key={placement} style={frame}>
          <Drawer open getContainer={false} placement={placement} title={`Placement: ${placement}`} size={200}>
            Drawer content
          </Drawer>
        </div>
      ))}
      <div style={frame}>
        <Drawer
          open
          getContainer={false}
          title="With footer and extra"
          size={280}
          extra={<Button type="link">Extra</Button>}
          footer={<Flex justify="end" gap="small"><Button>Cancel</Button><Button type="primary">Save</Button></Flex>}
        >
          Drawer content
        </Drawer>
      </div>
      <div style={frame}>
        <Drawer open getContainer={false} title="Loading" size={280} loading>
          Drawer content
        </Drawer>
      </div>
    </Flex>
  ),
};
