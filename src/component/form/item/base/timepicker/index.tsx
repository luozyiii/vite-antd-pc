import { useCallback, useMemo } from 'react';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import type { TimePickerProps } from 'antd';
import type { Dayjs } from 'dayjs';

type valueOriginalProps = Dayjs | null;
type valueProps = string | undefined;

type CustomeDatePickerProps = Omit<TimePickerProps, 'value' | 'onChange'> & {
  value?: valueProps;
  onChange?: (value: valueProps) => void;
};
const preFormat = 'YYYY-MM-DD ';

const Comp = ({ value, onChange, format = 'HH:mm:ss', ...other }: CustomeDatePickerProps) => {
  const handleOnChange = useCallback(
    (date: valueOriginalProps) => {
      const v = date ? dayjs(date).format((preFormat + format) as string) : undefined;
      onChange?.(v);
    },
    [format, onChange],
  );

  const _v: valueOriginalProps = useMemo(() => {
    return value ? dayjs(value) : null;
  }, [value]);

  return <TimePicker {...other} format={format} value={_v} onChange={handleOnChange} />;
};

export default Comp;
