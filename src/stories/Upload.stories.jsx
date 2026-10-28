import { Button, Flex, Upload } from 'antd';

const fileList = [
  { uid: '1', name: 'done.png', status: 'done' },
  { uid: '2', name: 'uploading.png', status: 'uploading', percent: 45 },
  { uid: '3', name: 'error.png', status: 'error' },
];

// beforeUpload returning false keeps files local instead of POSTing them anywhere.
const meta = {
  title: 'Data Entry/Upload',
  component: Upload,
  args: { beforeUpload: () => false },
  render: (args) => (
    <Upload {...args}>
      <Button>Click to upload</Button>
    </Upload>
  ),
};
export default meta;

export const Playground = {};

export const AllVariants = {
  render: () => (
    <Flex vertical gap="large" style={{ maxWidth: 480 }}>
      <Upload beforeUpload={() => false} defaultFileList={fileList}>
        <Button>Text list</Button>
      </Upload>
      <Upload beforeUpload={() => false} defaultFileList={fileList} listType="picture">
        <Button>Picture list</Button>
      </Upload>
      <Upload beforeUpload={() => false} defaultFileList={fileList} listType="picture-card">
        + Upload
      </Upload>
      <Upload beforeUpload={() => false} defaultFileList={fileList} listType="picture-circle">
        + Upload
      </Upload>
      <Upload.Dragger beforeUpload={() => false}>
        <p>Click or drag a file to this area to upload</p>
      </Upload.Dragger>
      <Upload beforeUpload={() => false} disabled>
        <Button disabled>Disabled</Button>
      </Upload>
    </Flex>
  ),
};
