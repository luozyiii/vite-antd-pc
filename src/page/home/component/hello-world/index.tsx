import useBearStore from '@/store/useBearStore';

const BearCom: React.FC = () => {
  const { bear } = useBearStore();
  return (
    <>
      <p>Hello World组件，值：{bear}</p>
    </>
  );
};

export default BearCom;
