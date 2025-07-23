import { useCallback, useEffect, useState } from 'react';
import { Cascader } from 'antd';
import type { CascaderProps, DefaultOptionType } from 'antd/es/cascader';

interface ApiResponse {
  data?: DefaultOptionType[];
  success?: boolean;
  message?: string;
  [key: string]: unknown;
}

type CustomeCascaderProps = Omit<CascaderProps<DefaultOptionType>, 'options'> & {
  options?: DefaultOptionType[];
  fetch?: (params?: object) => Promise<ApiResponse>;
  fetchParams?: object;
  responseHandler?: (res: ApiResponse) => DefaultOptionType[];
};

const Comp = ({
  options,
  fetch,
  fetchParams,
  responseHandler = (res: ApiResponse) => res.data || [],
  ...other
}: CustomeCascaderProps) => {
  const [ops, setOps] = useState<DefaultOptionType[]>([]);

  const getOptions = useCallback(async () => {
    try {
      if (fetch) {
        const res = responseHandler(await fetch({ ...fetchParams }));
        setOps(res);
      } else {
        setOps(options || []);
      }
    } finally {
      /* empty */
    }
  }, [fetch, fetchParams, options, responseHandler]);

  useEffect(() => {
    getOptions();
  }, [getOptions]);

  return <Cascader options={ops} {...(other as Record<string, unknown>)} />;
};

export default Comp;
