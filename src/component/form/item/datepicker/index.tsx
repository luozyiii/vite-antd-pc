import { DatePicker } from 'antd';

interface DatePickerProps {
  [key: string]: any;
}

const Comp = (props: DatePickerProps) => {
  return <DatePicker {...props} />;
};

export default Comp;
