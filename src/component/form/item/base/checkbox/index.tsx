import { useCallback, useEffect, useState } from 'react';
import { Checkbox } from 'antd';
import type { CheckboxGroupProps } from 'antd/es/checkbox/Group';

interface CheckboxOption {
  label: string;
  value: string | number;
  disabled?: boolean;
  [key: string]: unknown;
}

interface ApiResponse {
  data?: CheckboxOption[];
  success?: boolean;
  message?: string;
  [key: string]: unknown;
}

interface CustomeCheckboxGroupProps extends CheckboxGroupProps {
  fetch?: (params?: object) => Promise<ApiResponse>;
  fetchParams?: object;
  responseHandler?: (res: ApiResponse) => CheckboxOption[];
  fieldNames?: { label: string; value: string };
}

// 实现重点： 数据源异步加载
const Comp = ({
  options,
  fetch,
  fetchParams,
  fieldNames,
  responseHandler = (res: ApiResponse) => res.data || [],
  ...other
}: CustomeCheckboxGroupProps) => {
  const [ops, setOps] = useState<CheckboxOption[]>([]);

  const getOptions = useCallback(async () => {
    try {
      if (fetch) {
        const res = responseHandler(await fetch({ ...fetchParams }));
        const lastRes = fieldNames
          ? res.map((item: CheckboxOption) => {
              return {
                label: String(item[fieldNames.label]),
                value: item[fieldNames.value] as string | number,
              };
            })
          : res;
        setOps(lastRes as CheckboxOption[]);
      } else {
        setOps((options as CheckboxOption[]) || []);
      }
    } finally {
      /* empty */
    }
  }, [fetch, fetchParams, fieldNames, options, responseHandler]);

  useEffect(() => {
    getOptions();
  }, [getOptions]);

  return <Checkbox.Group {...other} options={ops}></Checkbox.Group>;
};

export default Comp;
