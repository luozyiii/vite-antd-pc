import React, { useCallback } from 'react';
import { Tag } from 'antd';
import { PageContent, FilterForm, PageTable, TableColumn } from '@/component';
import { useTable } from '@/hook';
import { fields, columns } from './config';

const FilterFormPage: React.FC = () => {
  const getList = useCallback(
    (
      params: Record<string, unknown>,
    ): Promise<{ data: { list: Array<{ a: string; b: string; c: string }>; total: number } }> => {
      const { page = 1, pageSize = 10 } = params;
      const pageNum = Number(page);
      const pageSizeNum = Number(pageSize);
      return new Promise((resolve) => {
        const list = Array(pageSizeNum)
          .fill(0)
          .map((_, i) => {
            const num = (pageNum - 1) * pageSizeNum + i + 1;
            return {
              a: 'a' + num,
              b: 'b' + num,
              c: 'c' + num,
            };
          });
        setTimeout(() => {
          resolve({
            data: {
              total: 201,
              list: list,
            },
          });
        }, 1000);
      });
    },
    [],
  );

  const [tableProps, onSearch, onReset] = useTable({
    fetch: getList,
  });

  return (
    <PageContent>
      <FilterForm fields={fields} defaultExpand onSearch={onSearch} onReset={onReset} />
      <PageTable {...tableProps} columns={columns} rowKey="a">
        <TableColumn key="a">
          {(params: Record<string, unknown>) => (
            <>
              <Tag color="red">热情</Tag>
              {params.a}
            </>
          )}
        </TableColumn>
      </PageTable>
    </PageContent>
  );
};

export default FilterFormPage;
