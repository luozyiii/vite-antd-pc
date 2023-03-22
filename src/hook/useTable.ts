import { useState, useCallback, useEffect } from 'react';
import type { PaginationProps, TableProps } from 'antd';

interface UseTableParams {
  fetch: (params: any) => Promise<any>;
  fetchParams?: object; // 请求默认带上的参数
}

type UseTableReturn = [
  TableProps<any> & {
    dataSource: any[];
    loading: boolean;
    pagination: PaginationProps;
    rowSelection?: {
      selectedRowKeys: React.Key[];
      onChange: (newSelectedRowKeys: React.Key[]) => void;
    };
  },
  (params: any) => void, // onSearch
  () => void, // onReset
  () => void, // onRefresh
];

const defaultPageSize = 10; // 分页选择默认值

const useTable = ({ fetch, fetchParams }: UseTableParams): UseTableReturn => {
  const [dataSource, setDataSource] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [current, setCurrent] = useState(1);
  const [formData, setFormData] = useState({});

  const getDataSource = useCallback(
    async (page = 1, pageSize = defaultPageSize, params?: any) => {
      setLoading(true);
      try {
        const _formData = params ? params : formData;
        const _params = {
          page,
          pageSize,
          ...fetchParams,
          ..._formData,
        };
        console.log('表单参数', _params);
        const res = await fetch(_params);
        if (params) {
          setFormData(params);
        }
        setDataSource(res.list);
        setTotal(res.total || 0);
        setCurrent(page);
        setLoading(false);
        setPageSize(pageSize);
      } catch (error) {
        setLoading(false);
      }
    },
    [fetch, fetchParams, formData],
  );

  const handleOnChange = useCallback(
    (newPage: number, newPageSize: number) => {
      if (pageSize !== newPageSize) {
        getDataSource(1, newPageSize);
      } else {
        getDataSource(newPage, newPageSize);
      }
      // 目前只考虑了 一个 page-table 的场景
      const mainElement = document && document.getElementById('mainContent');
      const tableElement = mainElement?.querySelectorAll('.pageTable')?.[0];
      if (mainElement && tableElement) {
        mainElement.scrollTop = tableElement?.offsetTop || 0;
      }
    },
    [getDataSource, pageSize],
  );

  // 查询
  const onSearch = useCallback(
    (params?: any) => {
      getDataSource(1, pageSize, params);
    },
    [pageSize, getDataSource],
  );

  // 重置
  const onReset = useCallback(() => {
    getDataSource(1, pageSize, {});
  }, [getDataSource, pageSize]);

  // 刷新
  const onRefresh = useCallback(() => {
    getDataSource(current, pageSize);
  }, [current, getDataSource, pageSize]);

  useEffect(() => {
    getDataSource();
  }, []);

  return [
    {
      dataSource,
      loading,
      pagination: {
        current,
        pageSize,
        total,
        showSizeChanger: true,
        defaultPageSize: pageSize,
        showTotal: (total: number) => `共 ${total} 条`,
        onChange: handleOnChange,
      },
    },
    onSearch,
    onReset,
    onRefresh,
  ];
};

export default useTable;
