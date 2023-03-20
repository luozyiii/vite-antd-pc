import { TimePicker } from 'antd';
import type { TimeRangePickerProps } from 'antd';

const { RangePicker } = TimePicker;

const Comp = (props: TimeRangePickerProps) => {
  return <RangePicker {...props} />;
};

export default Comp;
