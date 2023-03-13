import { Select } from 'antd';

interface SelectProps {
  [key: string]: any;
}

const Comp = (props: SelectProps) => {
  return <Select {...props} />;
};

export default Comp;
