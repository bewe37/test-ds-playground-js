import { useState } from 'react';
import { Flex, Transfer } from 'antd';

const dataSource = Array.from({ length: 8 }, (_, i) => ({
  key: String(i),
  title: `Item ${i + 1}`,
  disabled: i === 3,
}));

// Transfer is controlled-only, so this keeps the selected keys in state.
function TransferDemo(props) {
  const [targetKeys, setTargetKeys] = useState(['1', '5']);
  return (
    <Transfer
      render={(item) => item.title}
      {...props}
      dataSource={dataSource}
      targetKeys={targetKeys}
      onChange={setTargetKeys}
    />
  );
}

const meta = {
  title: 'Data Entry/Transfer',
  component: TransferDemo,
  args: { titles: ['Available', 'Selected'] },
};
export default meta;

export const Playground = {};

export const AllVariants = {
  render: () => (
    <Flex vertical gap="large">
      <TransferDemo />
      <TransferDemo showSearch />
      <TransferDemo oneWay />
      <TransferDemo status="error" />
      <TransferDemo disabled />
    </Flex>
  ),
};
