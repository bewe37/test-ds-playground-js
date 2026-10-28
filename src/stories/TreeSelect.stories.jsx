import { Flex, TreeSelect } from 'antd';

const treeData = [
  {
    value: 'design',
    title: 'Design',
    children: [
      { value: 'tokens', title: 'Tokens' },
      { value: 'components', title: 'Components' },
    ],
  },
  {
    value: 'engineering',
    title: 'Engineering',
    children: [
      { value: 'web', title: 'Web' },
      { value: 'mobile', title: 'Mobile', disabled: true },
    ],
  },
];

const meta = {
  title: 'Data Entry/TreeSelect',
  component: TreeSelect,
  args: { treeData, placeholder: 'Select a team', treeDefaultExpandAll: true, style: { width: 280 } },
};
export default meta;

export const Playground = {};

export const AllVariants = {
  render: () => (
    <Flex vertical gap="middle" style={{ width: 280 }}>
      <TreeSelect treeData={treeData} placeholder="Default" />
      <TreeSelect treeData={treeData} defaultValue="tokens" />
      <TreeSelect treeData={treeData} placeholder="Multiple" multiple />
      <TreeSelect treeData={treeData} placeholder="Checkable" treeCheckable />
      <TreeSelect treeData={treeData} placeholder="Searchable" showSearch />
      <TreeSelect treeData={treeData} placeholder="Filled" variant="filled" />
      <TreeSelect treeData={treeData} placeholder="Small" size="small" />
      <TreeSelect treeData={treeData} placeholder="Large" size="large" />
      <TreeSelect treeData={treeData} placeholder="Error" status="error" />
      <TreeSelect treeData={treeData} placeholder="Disabled" disabled />
    </Flex>
  ),
};
