import { useCallback, useEffect, useState } from 'react';
import { Radio, Space } from 'antd';
import type { RadioGroupProps } from 'antd';

interface RadioOption {
  label: string;
  value: string | number;
  disabled?: boolean;
  [key: string]: unknown;
}

interface ApiResponse {
  data?: RadioOption[];
  success?: boolean;
  message?: string;
  [key: string]: unknown;
}

interface CustomeRadioGroupProps extends RadioGroupProps {
  direction?: 'horizontal' | 'vertical';
  fetch?: (params?: object) => Promise<ApiResponse>;
  fetchParams?: object;
  responseHandler?: (res: ApiResponse) => RadioOption[];
  fieldNames?: { label: string; value: string };
}

// 实现重点： 数据源异步加载
const Comp = ({
  options,
  direction = 'horizontal',
  fetch,
  fetchParams,
  fieldNames,
  responseHandler = (res: ApiResponse) => res.data || [],
  ...other
}: CustomeRadioGroupProps) => {
  const [ops, setOps] = useState<RadioOption[]>([]);

  const getOptions = useCallback(async () => {
    try {
      if (fetch) {
        const res = responseHandler(await fetch({ ...fetchParams }));
        const lastRes = fieldNames
          ? res.map((item: RadioOption) => {
              return {
                label: String(item[fieldNames.label]),
                value: item[fieldNames.value] as string | number,
              };
            })
          : res;
        setOps(lastRes as RadioOption[]);
      } else {
        setOps((options as RadioOption[]) || []);
      }
    } finally {
      /* empty */
    }
  }, [fetch, fetchParams, fieldNames, options, responseHandler]);

  useEffect(() => {
    getOptions();
  }, [getOptions]);

  return (
    <Radio.Group {...other}>
      <Space direction={direction}>
        {ops?.map((option: RadioOption, index: number) => {
          const { value, label, ...rest } = option;
          return (
            <Radio key={index} value={value} {...rest}>
              {label}
            </Radio>
          );
        })}
      </Space>
    </Radio.Group>
  );
};

export default Comp;
