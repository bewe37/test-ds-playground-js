import { Flex, Image } from 'antd';
import hero from '../assets/hero.png';

const meta = {
  title: 'Data Display/Image',
  component: Image,
  args: { src: hero.src, width: 170, alt: 'Hero' },
};
export default meta;

export const Playground = {};

export const AllVariants = {
  render: () => (
    <Flex gap="large" wrap align="flex-start">
      <Image src={hero.src} width={120} alt="Default" />
      <Image src={hero.src} width={120} alt="No preview" preview={false} />
      <Image src="missing.png" width={120} height={126} alt="Broken" fallback={hero.src} />
      <Image.PreviewGroup>
        <Image src={hero.src} width={80} alt="Group 1" />
        <Image src={hero.src} width={80} alt="Group 2" />
      </Image.PreviewGroup>
    </Flex>
  ),
};
