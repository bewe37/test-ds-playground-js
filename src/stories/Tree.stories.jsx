import { Flex, Tree } from 'antd';

const treeData = [
  {
    key: 'design',
    title: 'Design',
    children: [
      { key: 'tokens', title: 'Tokens' },
      { key: 'components', title: 'Components', children: [{ key: 'button', title: 'Button' }, { key: 'input', title: 'Input' }] },
    ],
  },
  {
    key: 'engineering',
    title: 'Engineering',
    children: [
      { key: 'web', title: 'Web' },
      { key: 'mobile', title: 'Mobile', disabled: true },
    ],
  },
];

const meta = {
  title: 'Data Display/Tree',
  component: Tree,
  args: { treeData, defaultExpandAll: true },
};
export default meta;

export const Playground = {};

export const AllVariants = {
  render: () => (
    <Flex gap={48} wrap align="flex-start">
      <Tree treeData={treeData} defaultExpandAll defaultSelectedKeys={['tokens']} />
      <Tree treeData={treeData} defaultExpandAll checkable defaultCheckedKeys={['components']} />
      <Tree treeData={treeData} defaultExpandAll showLine />
      <Tree treeData={treeData} defaultExpandAll blockNode draggable style={{ width: 200 }} />
      <Tree.DirectoryTree treeData={treeData} defaultExpandAll />
    </Flex>
  ),
};
