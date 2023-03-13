import { Input } from 'antd';
const { Password } = Input;

interface PasswordProps {
  [key: string]: any;
}

const Comp = (props: PasswordProps) => {
  return <Password {...props} />;
};

export default Comp;
