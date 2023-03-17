import { useCallback, useEffect, useState } from 'react';
import { Select } from 'antd';

interface SelectProps {
  fetch?: (params?: any) => Promise<any>;
  fetchParams?: any;
  responseHandler: (res: any) => any;
  [key: string]: any;
}

const Comp = ({ fetch, fetchParams, responseHandler = (res: any) => res, ...other }: SelectProps) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const getOptions = useCallback(async () => {
    try {
      setLoading(true);
      if (fetch) {
        const res = await fetch({ ...fetchParams });
        setOptions(responseHandler(res));
      } else {
        setOptions(other.options || []);
      }
    } finally {
      setLoading(false);
    }
  }, [fetch, fetchParams, other.options, responseHandler]);

  useEffect(() => {
    getOptions();
  }, [getOptions]);

  return <Select loading={loading} {...other} options={options} />;
};

export default Comp;
