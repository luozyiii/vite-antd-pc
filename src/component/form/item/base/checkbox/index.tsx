import { Checkbox } from 'antd';
import type { CheckboxGroupProps } from 'antd/es/checkbox/Group';

const Comp = (props: CheckboxGroupProps) => {
  return <Checkbox.Group {...props}></Checkbox.Group>;
};

export default Comp;
