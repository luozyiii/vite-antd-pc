import React from 'react';
import { Table } from 'antd';
import { PageContent, FilterForm } from '@/component';
import { fields } from './config';

const TableFormPage: React.FC = () => {
  return (
    <PageContent>
      <FilterForm fields={fields} />
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

export default TableFormPage;
