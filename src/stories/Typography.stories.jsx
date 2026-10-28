import { Flex, Typography } from 'antd';
import { expect } from 'storybook/test';

const { Title, Text, Paragraph, Link } = Typography;

const meta = {
  title: 'General/Typography',
  component: Text,
  args: { children: 'The quick brown fox jumps over the lazy dog' },
};
export default meta;

export const Playground = {};

export const AllVariants = {
  render: () => (
    <Flex vertical gap="small" style={{ maxWidth: 640 }}>
      <Title level={1}>Heading 1</Title>
      <Title level={2}>Heading 2</Title>
      <Title level={3}>Heading 3</Title>
      <Title level={4}>Heading 4</Title>
      <Title level={5}>Heading 5</Title>
      <Flex gap="middle" wrap>
        <Text>Default</Text>
        <Text type="secondary">Secondary</Text>
        <Text type="success">Success</Text>
        <Text type="warning">Warning</Text>
        <Text type="danger">Danger</Text>
        <Text disabled>Disabled</Text>
      </Flex>
      <Flex gap="middle" wrap>
        <Text strong>Strong</Text>
        <Text italic>Italic</Text>
        <Text underline>Underline</Text>
        <Text delete>Delete</Text>
        <Text mark>Mark</Text>
        <Text code>Code</Text>
        <Text keyboard>Keyboard</Text>
        <Link href="https://ant.design" target="_blank">Link</Link>
      </Flex>
      <Paragraph>
        Paragraph text. Ant Design, a design language for background applications, is refined by the Ant UED team.
      </Paragraph>
      <Paragraph copyable>Copyable paragraph</Paragraph>
      <Paragraph editable>Editable paragraph</Paragraph>
      <Paragraph ellipsis={{ rows: 2 }} style={{ maxWidth: 320 }}>
        Ellipsis paragraph. Ant Design, a design language for background applications, is refined by the Ant UED
        team. Ant Design aims to uniform the user interface specs for internal background projects.
      </Paragraph>
    </Flex>
  ),
  // Our theme sets letter spacing to -1% of the font size on every Typography component.
  play: async ({ canvas, globals }) => {
    if (globals.dsTheme !== 'ours') return;
    for (const el of [canvas.getByRole('heading', { name: 'Heading 1' }), canvas.getByText('Default')]) {
      const { letterSpacing, fontSize } = getComputedStyle(el);
      await expect(parseFloat(letterSpacing) / parseFloat(fontSize)).toBeCloseTo(-0.01, 3);
    }
  },
};
