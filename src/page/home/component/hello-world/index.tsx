import useBear from '@/store/useBear';

const BearCom: React.FC = () => {
  const { bear } = useBear();
  return (
    <>
      <p>Hello World组件，值：{bear}</p>
    </>
  );
};

export default BearCom;
