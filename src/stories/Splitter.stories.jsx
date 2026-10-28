import { Flex, Splitter } from 'antd';

const panel = (label) => (
  <Flex justify="center" align="center" style={{ height: '100%' }}>
    {label}
  </Flex>
);

const frame = { height: 200, border: '1px solid #d9d9d9' };

const meta = {
  title: 'Layout/Splitter',
  component: Splitter,
  render: (args) => (
    <Splitter {...args} style={frame}>
      <Splitter.Panel>{panel('First')}</Splitter.Panel>
      <Splitter.Panel>{panel('Second')}</Splitter.Panel>
    </Splitter>
  ),
};
export default meta;

export const Playground = {};

export const AllVariants = {
  render: () => (
    <Flex vertical gap="large">
      <Splitter style={frame}>
        <Splitter.Panel defaultSize="30%" min="20%">{panel('30% (min 20%)')}</Splitter.Panel>
        <Splitter.Panel>{panel('Rest')}</Splitter.Panel>
      </Splitter>
      <Splitter orientation="vertical" style={frame}>
        <Splitter.Panel>{panel('Top')}</Splitter.Panel>
        <Splitter.Panel>{panel('Bottom')}</Splitter.Panel>
      </Splitter>
      <Splitter style={frame}>
        <Splitter.Panel collapsible>{panel('Collapsible')}</Splitter.Panel>
        <Splitter.Panel>{panel('Middle')}</Splitter.Panel>
        <Splitter.Panel resizable={false}>{panel('Not resizable')}</Splitter.Panel>
      </Splitter>
    </Flex>
  ),
};
