'use client';

import { useState } from 'react';
import {
  CodeOutlined,
  DatabaseOutlined,
  FileTextOutlined,
  FundProjectionScreenOutlined,
  HomeOutlined,
  LogoutOutlined,
  TagOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Card, Flex, Segmented, Statistic, Table, Tag } from 'antd';
import { AppShell } from '../components/AppShell';
import { Sidebar } from '../components/Sidebar';
import tenantAtp from '../components/Sidebar/assets/tenant-atp.svg';
import { useMode } from './providers';

// The Code-V1 shell (Figma 131:60197) as a page: the same navigation as the App Shell story,
// with some real content in place of its slot.

const navigation = [
  { key: 'home', icon: <HomeOutlined />, label: 'Home' },
  { key: 'templates', icon: <FundProjectionScreenOutlined />, label: 'Templates' },
  { key: 'code-sets', icon: <CodeOutlined />, label: 'Code Sets' },
  { key: 'tags', icon: <TagOutlined />, label: 'Tags' },
  { key: 'file-templates', icon: <FileTextOutlined />, label: 'Templates' },
  { key: 'datasets', icon: <DatabaseOutlined />, label: 'Datasets' },
];

const userMenu = {
  items: [
    { key: 'account', icon: <UserOutlined />, label: 'Account settings' },
    { type: 'divider' },
    { key: 'logout', icon: <LogoutOutlined />, label: 'Log out', danger: true },
  ],
};

const datasets = [
  { key: '1', name: 'ATP Tour 2026', rows: 48210, status: 'Active' },
  { key: '2', name: 'Challenger series', rows: 12904, status: 'Active' },
  { key: '3', name: 'Archive 2019–2025', rows: 301442, status: 'Archived' },
];

const columns = [
  { title: 'Name', dataIndex: 'name' },
  { title: 'Rows', dataIndex: 'rows', align: 'end', render: (rows) => rows.toLocaleString() },
  {
    title: 'Status',
    dataIndex: 'status',
    render: (status) => <Tag color={status === 'Active' ? 'success' : 'default'}>{status}</Tag>,
  },
];

export default function Home() {
  const { mode, setMode } = useMode();
  const [collapsed, setCollapsed] = useState(false);
  const [range, setRange] = useState('Monthly');

  return (
    <AppShell
      title="Datasets"
      description="Everything your code sets read from."
      sidebar={
        <Sidebar
          items={navigation}
          theme={mode}
          onThemeChange={setMode}
          collapsed={collapsed}
          onCollapsedChange={setCollapsed}
          datasetLabel="Dataset"
          tenantName="ATP"
          tenantLogo={<img src={tenantAtp.src} width={26.9692} height={8.00005} alt="" />}
          tenantColor="#082f6f"
          userName="John McGinn"
          userMenu={userMenu}
          menuProps={{ defaultSelectedKeys: ['datasets'] }}
        />
      }
    >
      <Segmented options={['Daily', 'Weekly', 'Monthly', 'Yearly']} value={range} onChange={setRange} style={{ alignSelf: 'start' }} />
      <Flex gap="middle" wrap>
        <Card style={{ flex: '1 1 200px' }}>
          <Statistic title="Datasets" value={datasets.length} />
        </Card>
        <Card style={{ flex: '1 1 200px' }}>
          <Statistic title="Rows" value={datasets.reduce((sum, d) => sum + d.rows, 0)} />
        </Card>
        <Card style={{ flex: '1 1 200px' }}>
          <Statistic title="Active" value={datasets.filter((d) => d.status === 'Active').length} />
        </Card>
      </Flex>
      <Table columns={columns} dataSource={datasets} pagination={false} />
    </AppShell>
  );
}
