import { useCallback, useMemo } from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import type { DatePickerProps } from 'antd';
import type { Dayjs } from 'dayjs';

type valueOriginalProps = Dayjs | null;
type valueProps = string | undefined;

type CustomeDatePickerProps = Omit<DatePickerProps, 'value' | 'onChange'> & {
  value?: valueProps;
  onChange?: (value: valueProps) => void;
};

const Comp = ({ value, onChange, format = 'YYYY-MM-DD HH:mm:ss', ...other }: CustomeDatePickerProps) => {
  const handleOnChange = useCallback(
    (date: valueOriginalProps) => {
      const v = date ? dayjs(date).format(format as string) : undefined;
      onChange?.(v);
    },
    [format, onChange],
  );

  const _v: valueOriginalProps = useMemo(() => {
    return value ? dayjs(value, format as string) : null;
  }, [value, format]);

  return <DatePicker {...other} value={_v} onChange={handleOnChange} />;
};

export default Comp;
