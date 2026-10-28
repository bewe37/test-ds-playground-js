import { fn } from 'storybook/test';
import {
  CodeOutlined,
  DatabaseOutlined,
  FileTextOutlined,
  FundProjectionScreenOutlined,
  HomeOutlined,
  TagOutlined,
} from '@ant-design/icons';
import { Flex, Typography, theme as antdTheme } from 'antd';
import { AppShell } from '../components/AppShell';
import { StatefulSidebar, tenantArgs, useToolbarTheme } from './sidebarDemo';

// The Code-V1 navigation (Figma 131:60197).
const items = [
  { key: 'home', icon: <HomeOutlined />, label: 'Home' },
  { key: 'templates', icon: <FundProjectionScreenOutlined />, label: 'Templates' },
  { key: 'code-sets', icon: <CodeOutlined />, label: 'Code Sets' },
  { key: 'tags', icon: <TagOutlined />, label: 'Tags' },
  { key: 'file-templates', icon: <FileTextOutlined />, label: 'Templates' },
  { key: 'datasets', icon: <DatabaseOutlined />, label: 'Datasets' },
];

// Figma's "Slot / Basic" placeholder for page content.
function Slot() {
  const { token } = antdTheme.useToken();
  return (
    <Flex
      align="center"
      justify="center"
      style={{
        flex: 1,
        minHeight: 240,
        padding: token.padding,
        background: token.colorBgContainer,
        border: `${token.lineWidth}px dashed ${token.colorBorder}`,
        borderRadius: token.borderRadiusXS,
        fontSize: token.fontSizeLG,
        letterSpacing: '-0.02em',
      }}
    >
      Slot component
    </Flex>
  );
}

// One shell at a given sidebar state; the stories size the box it fills. toolbarTheme comes from
// useToolbarTheme, a Storybook hook that only works in a story's render function.
function ShellDemo({ collapsed, showBack, toolbarTheme, ...args }) {
  return (
    <AppShell
      {...args}
      onBack={showBack ? fn() : undefined}
      sidebar={
        <StatefulSidebar
          key={String(collapsed)}
          items={items}
          collapsed={collapsed}
          {...tenantArgs}
          {...toolbarTheme}
          menuProps={{ defaultSelectedKeys: ['datasets'] }}
        />
      }
    >
      <Slot />
    </AppShell>
  );
}

const meta = {
  title: 'Layout/App Shell',
  component: AppShell,
  parameters: { layout: 'fullscreen' },
  args: {
    sidebar: null, // The render function supplies it.
    title: 'Page Title',
    description: 'Page description.',
    maxWidth: 1650,
    collapsed: false,
    showBack: false,
  },
  argTypes: {
    collapsed: { description: 'Starts with the sidebar collapsed; its own buttons toggle it too.' },
    showBack: { description: 'Shows the Back button above the title (`onBack`).' },
    sidebar: { control: false },
    onBack: { control: false },
    children: { control: false },
  },
};
export default meta;

// Below 768px (try the toolbar's viewport menu) a top bar holds the sidebar toggle, which opens the sidebar over the page.
export const Playground = {
  render: function Render(args) {
    const toolbarTheme = useToolbarTheme();
    return (
      <div style={{ height: '100vh' }}>
        <ShellDemo {...args} toolbarTheme={toolbarTheme} />
      </div>
    );
  },
};

const states = [
  { label: 'Opened', collapsed: false },
  { label: 'Collapsed', collapsed: true },
];

export const AllVariants = {
  render: function Render(args) {
    const { token } = antdTheme.useToken();
    const toolbarTheme = useToolbarTheme();
    return (
      <Flex vertical gap="large" style={{ padding: token.padding }}>
        {states.map(({ label, collapsed }) => (
          <Flex key={label} vertical gap="small">
            <Typography.Text type="secondary">{label}</Typography.Text>
            <div style={{ height: 560, border: `${token.lineWidth}px solid ${token.colorBorderSecondary}`, overflow: 'hidden' }}>
              <ShellDemo {...args} collapsed={collapsed} toolbarTheme={toolbarTheme} />
            </div>
          </Flex>
        ))}
      </Flex>
    );
  },
};
