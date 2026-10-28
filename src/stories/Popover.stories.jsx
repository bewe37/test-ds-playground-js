import { Button, Flex, Popover } from 'antd';

const meta = {
  title: 'Data Display/Popover',
  component: Popover,
  args: { title: 'Title', content: 'Popover content' },
  render: (args) => (
    <Popover {...args}>
      <Button>Hover me</Button>
    </Popover>
  ),
};
export default meta;

export const Playground = {};

// Popovers are forced open so every placement is visible at once.
export const AllVariants = {
  render: () => (
    <Flex vertical gap={120} align="center" style={{ padding: '120px 0' }}>
      <Flex gap={160}>
        <Popover open title="Top" content="Content" placement="top"><Button>Top</Button></Popover>
        <Popover open content="No title" placement="top"><Button>No title</Button></Popover>
        <Popover open title="No arrow" content="Content" placement="top" arrow={false}><Button>No arrow</Button></Popover>
      </Flex>
      <Flex gap={240}>
        <Popover open title="Left" content="Content" placement="left"><Button>Left</Button></Popover>
        <Popover open title="Right" content="Content" placement="right"><Button>Right</Button></Popover>
      </Flex>
      <Popover open title="Bottom" content="Content" placement="bottom"><Button>Bottom</Button></Popover>
    </Flex>
  ),
};
