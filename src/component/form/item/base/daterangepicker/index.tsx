import { DatePicker } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
const { RangePicker } = DatePicker;

// type CustomeRangePickerProps = Omit<RangePickerProps, 'value' | 'onChange'> & {
//   value?: [string, string] | [];
//   onChange?: (value: string) => void;
// }

const Comp = (props: RangePickerProps) => {
  return <RangePicker {...props} />;
};

export default Comp;
