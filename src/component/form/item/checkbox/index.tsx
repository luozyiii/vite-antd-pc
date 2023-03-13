import { Checkbox } from 'antd';

interface CheckboxProps {
  [key: string]: any;
}

const Comp = (props: CheckboxProps) => {
  return <Checkbox.Group {...props}></Checkbox.Group>;
};

export default Comp;
