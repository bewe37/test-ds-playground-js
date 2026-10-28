import { ColorPicker, Flex } from 'antd';

const meta = {
  title: 'Data Entry/ColorPicker',
  component: ColorPicker,
  args: { defaultValue: '#1F6FEB' },
};
export default meta;

export const Playground = {};

export const AllVariants = {
  render: () => (
    <Flex gap="middle" wrap align="center">
      <ColorPicker defaultValue="#1F6FEB" />
      <ColorPicker defaultValue="#1F6FEB" showText />
      <ColorPicker defaultValue="#1F6FEB" size="small" />
      <ColorPicker defaultValue="#1F6FEB" size="large" />
      <ColorPicker defaultValue="#1F6FEB" allowClear />
      <ColorPicker defaultValue="#1F6FEB" disabled />
      <ColorPicker
        defaultValue="#1F6FEB"
        presets={[{ label: 'Presets', colors: ['#1F6FEB', '#52C41A', '#FAAD14', '#FF4D4F'] }]}
      />
      <ColorPicker
        mode={['single', 'gradient']}
        defaultValue={[
          { color: '#1F6FEB', percent: 0 },
          { color: '#52C41A', percent: 100 },
        ]}
      />
    </Flex>
  ),
};
