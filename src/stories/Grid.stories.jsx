import { Col, Flex, Row, theme } from 'antd';

function Cell({ label }) {
  const { token } = theme.useToken();
  return (
    <div
      style={{
        background: token.colorPrimary,
        color: token.colorTextLightSolid,
        padding: '8px 0',
        textAlign: 'center',
        borderRadius: token.borderRadiusSM,
      }}
    >
      {label}
    </div>
  );
}

const cell = (label) => <Cell label={label} />;

const meta = {
  title: 'Layout/Grid',
  component: Row,
  args: { gutter: 16 },
  render: (args) => (
    <Row {...args}>
      <Col span={8}>{cell('col-8')}</Col>
      <Col span={8}>{cell('col-8')}</Col>
      <Col span={8}>{cell('col-8')}</Col>
    </Row>
  ),
};
export default meta;

export const Playground = {};

export const AllVariants = {
  render: () => (
    <Flex vertical gap="middle">
      <Row>
        <Col span={24}>{cell('col-24')}</Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>{cell('col-12')}</Col>
        <Col span={12}>{cell('col-12')}</Col>
      </Row>
      <Row gutter={16}>
        <Col span={6}>{cell('col-6')}</Col>
        <Col span={6}>{cell('col-6')}</Col>
        <Col span={6}>{cell('col-6')}</Col>
        <Col span={6}>{cell('col-6')}</Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}>{cell('col-8')}</Col>
        <Col span={8} offset={8}>{cell('col-8 offset-8')}</Col>
      </Row>
      <Row gutter={16} justify="center">
        <Col span={4}>{cell('center')}</Col>
        <Col span={4}>{cell('center')}</Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} sm={12} md={8} lg={6}>{cell('responsive')}</Col>
        <Col xs={24} sm={12} md={8} lg={6}>{cell('responsive')}</Col>
        <Col xs={24} sm={12} md={8} lg={6}>{cell('responsive')}</Col>
      </Row>
    </Flex>
  ),
};
