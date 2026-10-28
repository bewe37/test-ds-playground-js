import { Flex, QRCode } from 'antd';

const value = 'https://ant.design';

const meta = {
  title: 'Data Display/QRCode',
  component: QRCode,
  args: { value },
};
export default meta;

export const Playground = {};

export const AllVariants = {
  render: () => (
    <Flex gap="large" wrap align="flex-start">
      <QRCode value={value} />
      <QRCode value={value} type="svg" />
      <QRCode value={value} size={120} />
      <QRCode value={value} color="#1F6FEB" />
      <QRCode value={value} bordered={false} />
      <QRCode value={value} errorLevel="H" />
      <QRCode value={value} status="loading" />
      <QRCode value={value} status="expired" onRefresh={() => {}} />
      <QRCode value={value} status="scanned" />
    </Flex>
  ),
};
