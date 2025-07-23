import { useState, useCallback, useEffect } from 'react';
import type { PaginationProps, TableProps } from 'antd';

interface ApiResponse<T = unknown> {
  data: {
    list: T[];
    total: number;
  };
}

interface UseTableParams<T = unknown> {
  fetch: (params: Record<string, unknown>) => Promise<ApiResponse<T>>;
  fetchParams?: Record<string, unknown>; // 请求默认带上的参数
}

type UseTableReturn<T = unknown> = [
  TableProps<T> & {
    dataSource: T[];
    loading: boolean;
    pagination: PaginationProps;
    rowSelection?: {
      selectedRowKeys: React.Key[];
      onChange: (newSelectedRowKeys: React.Key[]) => void;
    };
  },
  (params?: Record<string, unknown>) => void, // onSearch
  () => void, // onReset
  () => void, // onRefresh
];

const defaultPageSize = 10; // 分页选择默认值

const useTable = <T = unknown>({ fetch, fetchParams }: UseTableParams<T>): UseTableReturn<T> => {
  const [dataSource, setDataSource] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  // 分页
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: defaultPageSize,
    total: 0,
    defaultPageSize: defaultPageSize,
  });

  const getDataSource = useCallback(
    async (page = 1, pageSize = defaultPageSize, params?: Record<string, unknown>) => {
      setLoading(true);
      try {
        const _formData = params ? params : formData;
        const _params = {
          page,
          pageSize,
          ...fetchParams,
          ..._formData,
        };
        const res = await fetch(_params);
        if (params) {
          setFormData(params);
        }
        setDataSource(res.data.list);
        setPagination({
          ...pagination,
          total: res.data.total || 0,
          current: page,
          pageSize: pageSize,
        });
        setLoading(false);
      } catch {
        setLoading(false);
      }
    },
    [fetch, fetchParams, formData, pagination],
  );

  const handleOnChange = useCallback(
    (newPage: number, newPageSize: number) => {
      if (pagination.pageSize !== newPageSize) {
        getDataSource(1, newPageSize);
      } else {
        getDataSource(newPage, newPageSize);
      }
      // 目前只考虑了 一个 page-table 的场景
      const mainElement = document && document.getElementById('mainContent');
      const tableElement = mainElement?.querySelectorAll('.pageTable')?.[0] as HTMLElement;
      if (mainElement && tableElement) {
        mainElement.scrollTop = tableElement?.offsetTop || 0;
      }
    },
    [getDataSource, pagination],
  );

  // 查询
  const onSearch = useCallback(
    (params?: Record<string, unknown>) => {
      getDataSource(1, pagination.pageSize, params);
    },
    [pagination.pageSize, getDataSource],
  );

  // 重置
  const onReset = useCallback(() => {
    getDataSource(1, pagination.pageSize, {});
  }, [getDataSource, pagination.pageSize]);

  // 刷新
  const onRefresh = useCallback(() => {
    getDataSource(pagination.current, pagination.pageSize);
  }, [getDataSource, pagination]);

  useEffect(() => {
    getDataSource();
  }, [getDataSource]);

  return [
    {
      dataSource,
      loading,
      pagination: {
        ...pagination,
        showSizeChanger: true,
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
