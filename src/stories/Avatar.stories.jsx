import { Avatar, Flex } from 'antd';
import hero from '../assets/hero.png';

const meta = {
  title: 'Data Display/Avatar',
  component: Avatar,
  args: { children: 'AB' },
};
export default meta;

export const Playground = {};

export const AllVariants = {
  render: () => (
    <Flex vertical gap="large">
      <Flex gap="middle" align="center">
        <Avatar size="small">S</Avatar>
        <Avatar>D</Avatar>
        <Avatar size="large">L</Avatar>
        <Avatar size={64}>64</Avatar>
      </Flex>
      <Flex gap="middle" align="center">
        <Avatar shape="square" size="small">S</Avatar>
        <Avatar shape="square">D</Avatar>
        <Avatar shape="square" size="large">L</Avatar>
        <Avatar shape="square" size={64}>64</Avatar>
      </Flex>
      <Flex gap="middle" align="center">
        <Avatar src={hero.src} />
        <Avatar style={{ backgroundColor: '#1F6FEB' }}>BW</Avatar>
        <Avatar style={{ backgroundColor: '#FAAD14' }}>Longer name</Avatar>
      </Flex>
      <Avatar.Group max={{ count: 3 }}>
        <Avatar>A</Avatar>
        <Avatar>B</Avatar>
        <Avatar>C</Avatar>
        <Avatar>D</Avatar>
        <Avatar>E</Avatar>
      </Avatar.Group>
    </Flex>
  ),
};
