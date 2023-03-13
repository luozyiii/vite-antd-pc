import { Input } from 'antd';
const { TextArea } = Input;

interface TextAreaProps {
  [key: string]: any;
}

const Comp = (props: TextAreaProps) => {
  return <TextArea {...props} />;
};

export default Comp;
