import { Table } from '@/component';
import type { TableProps } from 'antd';

// 表格列的基础数据类型
interface BaseColumnData {
  [key: string]: unknown;
}

/**
 * 定制table样式
 * border : 有边框
 * sticky : 设置粘性头部和滚动条
 */
const PageTable = <T extends BaseColumnData = BaseColumnData>({ children, ...other }: TableProps<T>) => {
  return (
    <div className="pageTable" style={{ padding: '0 12px 12px 12px', backgroundColor: '#fff' }}>
      <Table bordered sticky {...other}>
        {children}
      </Table>
    </div>
  );
};

export default PageTable;
