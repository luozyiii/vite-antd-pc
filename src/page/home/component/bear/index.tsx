import { Space, Button } from 'antd';
import useBear from '@/store/useBear';

const BearCom: React.FC = () => {
  const { bear, increase, reduce } = useBear();
  return (
    <>
      <p>当前值：{bear}</p>
      <Space>
        <Button onClick={increase}>加1</Button>
        <Button onClick={reduce}>减1</Button>
      </Space>
    </>
  );
};

export default BearCom;
