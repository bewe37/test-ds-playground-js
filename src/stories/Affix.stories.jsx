import { useState } from 'react';
import { Affix, Button, Flex, Typography } from 'antd';

// Affix pins to a scroll container here, so the effect is visible inside the canvas.
function AffixDemo({ offsetTop, offsetBottom }) {
  const [container, setContainer] = useState(null);
  return (
    <div ref={setContainer} style={{ height: 240, overflow: 'auto', border: '1px dashed #d9d9d9' }}>
      {/* Bottom affix only pins while its element sits below the fold, so start it there. */}
      <div style={{ height: 720, paddingTop: offsetBottom === undefined ? 80 : 480 }}>
        {container && (
          <Affix offsetTop={offsetTop} offsetBottom={offsetBottom} target={() => container}>
            <Button type="primary">{offsetBottom === undefined ? `Affix top (${offsetTop})` : `Affix bottom (${offsetBottom})`}</Button>
          </Affix>
        )}
        <Typography.Paragraph type="secondary" style={{ padding: 16 }}>Scroll this box to pin the button.</Typography.Paragraph>
      </div>
    </div>
  );
}

const meta = {
  title: 'Navigation/Affix',
  component: Affix,
  args: { offsetTop: 10 },
  render: (args) => <AffixDemo {...args} />,
};
export default meta;

export const Playground = {};

export const AllVariants = {
  render: () => (
    <Flex gap="large">
      <div style={{ flex: 1 }}>
        <AffixDemo offsetTop={0} />
      </div>
      <div style={{ flex: 1 }}>
        <AffixDemo offsetBottom={10} />
      </div>
    </Flex>
  ),
};
