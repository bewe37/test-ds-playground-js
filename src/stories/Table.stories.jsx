import { Flex, Table, Tag } from 'antd';

const statusColor = { Active: 'success', Invited: 'processing', Suspended: 'error' };

const columns = [
  { title: 'Name', dataIndex: 'name', sorter: (a, b) => a.name.localeCompare(b.name) },
  { title: 'Role', dataIndex: 'role', filters: [{ text: 'Designer', value: 'Designer' }, { text: 'Engineer', value: 'Engineer' }], onFilter: (value, row) => row.role === value },
  { title: 'Status', dataIndex: 'status', render: (status) => <Tag color={statusColor[status]}>{status}</Tag> },
  { title: 'Action', key: 'action', render: () => <a href="#">Edit</a> },
];

const dataSource = [
  { key: '1', name: 'Alex Chen', role: 'Designer', status: 'Active' },
  { key: '2', name: 'Sam Rivera', role: 'Engineer', status: 'Invited' },
  { key: '3', name: 'Jordan Lee', role: 'Engineer', status: 'Suspended' },
  { key: '4', name: 'Taylor Kim', role: 'Designer', status: 'Active' },
];

const meta = {
  title: 'Data Display/Table',
  component: Table,
  args: { columns, dataSource },
};
export default meta;

export const Playground = {};

export const AllVariants = {
  render: () => (
    <Flex vertical gap={48}>
      <Table columns={columns} dataSource={dataSource} />
      <Table columns={columns} dataSource={dataSource} bordered title={() => 'Bordered with title'} footer={() => 'Footer'} />
      <Table columns={columns} dataSource={dataSource} size="middle" pagination={false} />
      <Table columns={columns} dataSource={dataSource} size="small" pagination={false} />
      <Table columns={columns} dataSource={dataSource} rowSelection={{ defaultSelectedRowKeys: ['2'] }} pagination={false} />
      <Table columns={columns} dataSource={dataSource} loading pagination={false} />
      <Table columns={columns} dataSource={[]} />
    </Flex>
  ),
};
