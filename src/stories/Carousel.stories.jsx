import { Carousel, Flex, theme } from 'antd';

function Slide({ n }) {
  const { token } = theme.useToken();
  return (
    <h3
      style={{
        height: 160,
        margin: 0,
        lineHeight: '160px',
        textAlign: 'center',
        color: token.colorTextLightSolid,
        background: token.colorPrimary,
      }}
    >
      Slide {n}
    </h3>
  );
}

const slides = [1, 2, 3, 4].map((n) => (
  <div key={n}>
    <Slide n={n} />
  </div>
));

const meta = {
  title: 'Data Display/Carousel',
  component: Carousel,
  args: { children: slides },
  decorators: [(Story) => <div style={{ maxWidth: 480 }}><Story /></div>],
};
export default meta;

export const Playground = {};

export const AllVariants = {
  render: () => (
    <Flex vertical gap="large" style={{ maxWidth: 480 }}>
      <Carousel>{slides}</Carousel>
      <Carousel arrows>{slides}</Carousel>
      <Carousel effect="fade">{slides}</Carousel>
      <Carousel dotPlacement="start" style={{ height: 160 }}>{slides}</Carousel>
      <Carousel dots={{ className: 'custom-dots' }} draggable>{slides}</Carousel>
    </Flex>
  ),
};
