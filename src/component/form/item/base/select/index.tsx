import { useCallback, useEffect, useState } from 'react';
import { Select } from 'antd';
import type { SelectProps } from 'antd';

interface SProps extends SelectProps {
  fetch?: (params?: any) => Promise<any>;
  fetchParams?: any;
  responseHandler: (res: any) => any;
}

const Comp = ({ options, fetch, fetchParams, responseHandler = (res: any) => res, ...other }: SProps) => {
  const [ops, setOps] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const getOptions = useCallback(async () => {
    try {
      setLoading(true);
      if (fetch) {
        const res = await fetch({ ...fetchParams });
        setOps(responseHandler(res));
      } else {
        setOps(options || []);
      }
    } finally {
      setLoading(false);
    }
  }, [fetch, fetchParams, options, responseHandler]);

  useEffect(() => {
    getOptions();
  }, [getOptions]);

  return <Select loading={loading} {...other} options={ops} />;
};

export default Comp;