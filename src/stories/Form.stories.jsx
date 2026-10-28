import { Button, Checkbox, Flex, Form, Input, Select } from 'antd';

const fields = (
  <>
    <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please enter a username' }]}>
      <Input />
    </Form.Item>
    <Form.Item label="Role" name="role">
      <Select options={[{ value: 'admin', label: 'Admin' }, { value: 'member', label: 'Member' }]} />
    </Form.Item>
    <Form.Item name="remember" valuePropName="checked">
      <Checkbox>Remember me</Checkbox>
    </Form.Item>
    <Form.Item>
      <Button type="primary" htmlType="submit">Submit</Button>
    </Form.Item>
  </>
);

const meta = {
  title: 'Data Entry/Form',
  component: Form,
  args: { layout: 'vertical', style: { maxWidth: 400 } },
  render: (args) => <Form {...args}>{fields}</Form>,
};
export default meta;

export const Playground = {};

export const AllVariants = {
  render: () => (
    <Flex vertical gap={48} style={{ maxWidth: 560 }}>
      <Form layout="horizontal" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>{fields}</Form>
      <Form layout="vertical">{fields}</Form>
      <Form layout="inline">{fields}</Form>
      <Form layout="vertical">
        <Form.Item label="Success" validateStatus="success" hasFeedback>
          <Input defaultValue="Looks good" />
        </Form.Item>
        <Form.Item label="Warning" validateStatus="warning" help="Double-check this value" hasFeedback>
          <Input defaultValue="Hmm" />
        </Form.Item>
        <Form.Item label="Error" validateStatus="error" help="This field is required" hasFeedback>
          <Input />
        </Form.Item>
        <Form.Item label="Validating" validateStatus="validating" help="Checking…" hasFeedback>
          <Input defaultValue="Checking" />
        </Form.Item>
        <Form.Item label="With extra" extra="Helper text below the field">
          <Input />
        </Form.Item>
      </Form>
      <Form layout="vertical" disabled>{fields}</Form>
    </Flex>
  ),
};
