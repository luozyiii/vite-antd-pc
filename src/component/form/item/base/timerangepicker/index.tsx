import { useCallback, useMemo } from 'react';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import type { TimeRangePickerProps } from 'antd';
import type { Dayjs } from 'dayjs';

const { RangePicker } = TimePicker;

type valueOriginalProps = [Dayjs | null, Dayjs | null] | null;
type valueProps = (string | null)[] | undefined;

type CustomeRangePickerProps = Omit<TimeRangePickerProps, 'value' | 'onChange'> & {
  value?: valueProps;
  onChange?: (value: valueProps) => void;
};

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
    return value && value.length
      ? value.map((v) => {
          return v ? dayjs(dayjs().format('YYYY-MM-DD') + ' ' + v) : null;
        })
      : null;
  }, [value]);

  return <RangePicker {...other} format={format} value={_v} onChange={handleOnChange} />;
};

export default Comp;
