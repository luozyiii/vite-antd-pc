import { Switch } from 'antd';
interface SwitchProps {
  [key: string]: any;
}

const Comp = (props: SwitchProps) => {
  return <Switch {...props} />;
};

export default Comp;
