import { useCallback, useState } from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import type { DatePickerProps } from 'antd';
import type { Dayjs } from 'dayjs';

type valueOriginalProps = Dayjs | null;

type CustomeDatePickerProps = Omit<DatePickerProps, 'value' | 'onChange'> & {
  value?: string;
  onChange?: (value: string) => void;
};

const Comp = ({ value, onChange, ...other }: CustomeDatePickerProps) => {
  const [v, setV] = useState<valueOriginalProps>(value ? dayjs(value) : null);

  const handleOnChange = useCallback(
    (date: valueOriginalProps, dateString: string) => {
      setV(date);
      onChange?.(dateString);
    },
    [onChange],
  );

  return <DatePicker {...other} value={v} onChange={handleOnChange} />;
};

export default Comp;
