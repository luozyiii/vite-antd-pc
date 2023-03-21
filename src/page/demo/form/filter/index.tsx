import React, { useCallback } from 'react';
import { Table } from 'antd';
import { PageContent, FilterForm } from '@/component';
import { fields } from './config';

const FilterFormPage: React.FC = () => {
  const onSearch = useCallback((params: any) => {
    console.log('params', params);
  }, []);

  const onReset = useCallback(() => {
    console.log('reset');
  }, []);

  return (
    <PageContent>
      <FilterForm fields={fields} defaultExpand onSearch={onSearch} onReset={onReset} />
      <div style={{ padding: '0 12px 12px 12px', backgroundColor: '#fff' }}>
        <Table
          bordered
          columns={[
            {
              title: 'name',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: 'age',
              dataIndex: 'age',
              key: 'age',
            },
          ]}
          dataSource={[]}
        />
      </div>
    </PageContent>
  );
};

export default FilterFormPage;
