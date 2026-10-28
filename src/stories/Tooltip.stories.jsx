import { Button, Flex, Tooltip } from 'antd';

const meta = {
  title: 'Data Display/Tooltip',
  component: Tooltip,
  args: { title: 'Tooltip text' },
  render: (args) => (
    <Tooltip {...args}>
      <Button>Hover me</Button>
    </Tooltip>
  ),
};
export default meta;

export const Playground = {};

// Tooltips are forced open so every variant is visible at once.
export const AllVariants = {
  render: () => (
    <Flex vertical gap={80} align="center" style={{ padding: '64px 0' }}>
      <Flex gap={120}>
        <Tooltip open title="Top" placement="top"><Button>Top</Button></Tooltip>
        <Tooltip open title="No arrow" arrow={false}><Button>No arrow</Button></Tooltip>
        <Tooltip open title="Blue" color="blue"><Button>Preset colour</Button></Tooltip>
        <Tooltip open title="Custom" color="#1F6FEB"><Button>Custom colour</Button></Tooltip>
      </Flex>
      <Flex gap={200}>
        <Tooltip open title="Left" placement="left"><Button>Left</Button></Tooltip>
        <Tooltip open title="Right" placement="right"><Button>Right</Button></Tooltip>
      </Flex>
      <Tooltip open title="Bottom" placement="bottom"><Button>Bottom</Button></Tooltip>
    </Flex>
  ),
};
