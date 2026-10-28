import { useState } from 'react';
import { useGlobals } from 'storybook/preview-api';
import { CheckOutlined, LogoutOutlined, SwapOutlined, UserOutlined } from '@ant-design/icons';
import { Flex } from 'antd';
import { Sidebar } from '../components/Sidebar';
import tenantAtp from '../components/Sidebar/assets/tenant-atp.svg';

// Shared by the Sidebar and App Shell stories.

export const tenantArgs = {
  datasetLabel: 'Dataset',
  tenantName: 'ATP',
  tenantLogo: <img src={tenantAtp.src} width={26.9692} height={8.00005} alt="" />,
  tenantColor: '#082f6f',
  userName: 'John McGinn',
};

// Sample datasets to switch to; the first one comes from the story's tenant args.
const initial = (letter) => <span style={{ color: '#fff', fontSize: 16, fontWeight: 600 }}>{letter}</span>;
const otherDatasets = [
  { key: 'demo', name: 'Demo', color: '#6d28d9', logo: initial('D') },
  { key: 'sandbox', name: 'Sandbox', color: '#0f766e', logo: initial('S') },
];

// The footer's tenant avatar, scaled down to sit in a menu row. Takes className so antd's menu
// can space it like an icon.
function DatasetAvatar({ dataset, size, className }) {
  return (
    <Flex
      align="center"
      justify="center"
      className={className}
      style={{ width: size, height: size, borderRadius: '50%', background: dataset.color, flexShrink: 0 }}
    >
      {/* 36: the footer avatar the logo is sized for. */}
      <span style={{ display: 'flex', transform: `scale(${size / 36})` }}>{dataset.logo}</span>
    </Flex>
  );
}

// Interactive wrapper: the collapse buttons, dataset switcher and theme row all work.
export function StatefulSidebar(props) {
  const [collapsed, setCollapsed] = useState(props.collapsed ?? false);
  const datasets = [
    { key: 'default', name: props.datasetLabel ?? props.tenantName, color: props.tenantColor, logo: props.tenantLogo },
    ...otherDatasets,
  ];
  const [current, setCurrent] = useState(datasets[0].key);
  const dataset = datasets.find((d) => d.key === current) ?? datasets[0];

  const userMenu = {
    items: [
      { key: 'account', icon: <UserOutlined />, label: 'Account settings' },
      {
        key: 'dataset',
        icon: <SwapOutlined />,
        label: 'Switch dataset',
        children: datasets.map((d) => ({
          key: `dataset:${d.key}`,
          icon: <DatasetAvatar dataset={d} size={20} />,
          label: d.name,
          extra: d.key === current ? <CheckOutlined /> : undefined,
        })),
      },
      { type: 'divider' },
      { key: 'logout', icon: <LogoutOutlined />, label: 'Log out', danger: true },
    ],
    onClick: ({ key }) => {
      if (key.startsWith('dataset:')) setCurrent(key.slice('dataset:'.length));
    },
  };

  return (
    <Sidebar
      {...props}
      collapsed={collapsed}
      onCollapsedChange={setCollapsed}
      datasetLabel={dataset.name}
      tenantColor={dataset.color}
      tenantLogo={dataset.logo}
      userMenu={userMenu}
    />
  );
}

// The toolbar's colour mode, read and set from the sidebar. A Storybook hook: call it in a render function.
export function useToolbarTheme() {
  const [globals, updateGlobals] = useGlobals();
  const theme = globals.mode === 'dark' ? 'dark' : 'light';
  return { theme, onThemeChange: (mode) => updateGlobals({ mode }) };
}
