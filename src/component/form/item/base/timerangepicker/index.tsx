import { useCallback, useMemo } from 'react';
import dayjs from 'dayjs';
import { TimePicker } from 'antd';
import type { TimeRangePickerProps } from 'antd';
import type { Dayjs } from 'dayjs';

const { RangePicker } = TimePicker;

type valueOriginalProps = [Dayjs | null, Dayjs | null] | null;
type valueProps = (string | null)[] | undefined;

type CustomeRangePickerProps = Omit<TimeRangePickerProps, 'value' | 'onChange'> & {
  value?: valueProps;
  onChange?: (value: valueProps) => void;
};

// 实现重点： value入参、出参的一致性
const Comp = ({ value, onChange, format = 'HH:mm:ss', ...other }: CustomeRangePickerProps) => {
  const handleOnChange = useCallback(
    (dates: valueOriginalProps) => {
      const v =
        dates && dates.length
          ? dates?.map((date) => {
              return date ? dayjs(date).format(format as string) : null;
            })
          : undefined;
      onChange?.(v);
    },
    [format, onChange],
  );
  const _v: valueOriginalProps = useMemo(() => {
    if (value && value.length >= 2) {
      return [value[0] ? dayjs(value[0], format as string) : null, value[1] ? dayjs(value[1], format as string) : null];
    }
    return null;
  }, [format, value]);

  return <RangePicker {...other} format={format} value={_v} onChange={handleOnChange} />;
};

export default Comp;
