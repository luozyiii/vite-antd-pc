import { Table } from '@/component';
import type { TableProps } from 'antd';

const PageTable = ({ children, ...other }: TableProps<any>) => {
  return (
    <div className="pageTable" style={{ padding: '0 12px 12px 12px', backgroundColor: '#fff' }}>
      <Table {...other}>{children}</Table>
    </div>
  );
};

export default PageTable;
