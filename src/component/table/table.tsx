import { useMemo, Children, isValidElement, cloneElement } from 'react';
import { Table } from 'antd';
import type { TableProps } from 'antd';
import type { ReactNode, ReactElement } from 'react';

// 表格列的基础数据类型
interface BaseColumnData {
  [key: string]: unknown;
}

interface TableColumnProps<T = BaseColumnData> {
  children?: (record: T, index: number) => ReactNode;
  [key: string]: unknown;
}

export const TableColumn = ({ children, ...params }: TableColumnProps & Record<string, unknown>) => {
  return (children ? children(params as BaseColumnData, (params.index as number) || 0) : null) ?? '-';
};

type CustomTableProps<T extends BaseColumnData = BaseColumnData> = TableProps<T>;

const Comp = <T extends BaseColumnData = BaseColumnData>({ columns, children, ...other }: CustomTableProps<T>) => {
  const cols = useMemo(() => {
    const childMap: Record<string, ReactElement> = {};
    Children.forEach(children, (child) => {
      if (child && isValidElement(child)) {
        childMap[String(child.key)] = child;
      }
    });

    return columns?.map((item) => {
      const { key, ...otherProps } = item as Record<string, unknown>;
      const columnKey = String(key || (item as Record<string, unknown>).dataIndex || '');
      const col: Record<string, unknown> = {
        ...otherProps,
        key: columnKey,
        dataIndex: key || (item as Record<string, unknown>).dataIndex,
      };

      const ChildComp = childMap[columnKey];

      if (ChildComp && ChildComp.type === TableColumn) {
        col.render = (_text: unknown, record: T, index: number) => cloneElement(ChildComp, { ...record, index });
      } else {
        col.render = (text: unknown) => (text as string | number) ?? '-';
      }

      return col;
    });
  }, [children, columns]);

  return <Table {...other} columns={cols as TableProps<T>['columns']} />;
};

export default Comp;
