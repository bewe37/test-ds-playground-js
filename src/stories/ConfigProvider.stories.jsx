import { Button, ConfigProvider, DatePicker, Flex, Input, Radio, Select, Switch } from 'antd';

// A nested ConfigProvider inherits the toolbar theme and overrides only what it sets.
function Sample() {
  return (
    <Flex vertical gap="middle" align="flex-start">
      <Flex gap="small">
        <Button type="primary">Primary</Button>
        <Button>Default</Button>
      </Flex>
      <Input placeholder="Input" style={{ width: 240 }} />
      <Select placeholder="Select" style={{ width: 240 }} options={[{ value: 'a', label: 'Option A' }]} />
      <DatePicker />
      <Radio.Group defaultValue="a" options={['a', 'b', 'c'].map((value) => ({ value, label: value.toUpperCase() }))} />
      <Switch defaultChecked />
    </Flex>
  );
}

const meta = {
  title: 'Other/ConfigProvider',
  component: ConfigProvider,
  args: { componentSize: 'medium', componentDisabled: false, direction: 'ltr', variant: 'outlined' },
  argTypes: {
    componentSize: { control: 'inline-radio', options: ['small', 'medium', 'large'] },
    direction: { control: 'inline-radio', options: ['ltr', 'rtl'] },
    variant: { control: 'inline-radio', options: ['outlined', 'filled', 'borderless'] },
  },
  render: (args) => (
    <ConfigProvider {...args}>
      <div dir={args.direction}>
        <Sample />
      </div>
    </ConfigProvider>
  ),
};
export default meta;

export const Playground = {};

export const AllVariants = {
  render: () => (
    <Flex gap="large" wrap align="flex-start">
      <ConfigProvider componentSize="small">
        <Sample />
      </ConfigProvider>
      <ConfigProvider componentSize="large">
        <Sample />
      </ConfigProvider>
      <ConfigProvider variant="filled">
        <Sample />
      </ConfigProvider>
      <ConfigProvider componentDisabled>
        <Sample />
      </ConfigProvider>
      <ConfigProvider direction="rtl">
        <div dir="rtl">
          <Sample />
        </div>
      </ConfigProvider>
    </Flex>
  ),
};
