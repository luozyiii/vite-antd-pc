import { Space, Button } from 'antd';
import useBearStore from '../../useBearStore';

const BearCom: React.FC = () => {
  const { bear, increase, reduce } = useBearStore();
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
