import { Input } from 'antd';

interface InputProps {
  [key: string]: any;
}

const Comp = (props: InputProps) => {
  return <Input {...props} />;
};

export default Comp;
