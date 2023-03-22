import { useMemo, Children, isValidElement, cloneElement } from 'react';
import type { Key } from 'react';
import { Table } from 'antd';
import type { TableProps } from 'antd';

export const TableColumn: React.FC<any> = ({ children, ...params }: any) => {
  return (children ? children(params) : null) ?? '-';
};
/**
 * 定制table样式
 * border : 有边框
 * sticky : 设置粘性头部和滚动条
 */
const Comp = ({ columns, children, ...other }: TableProps<any>) => {
  const cols = useMemo(() => {
    const childMap: any = {};
    Children.forEach(children, (child) => {
      if (child && isValidElement(child)) {
        childMap[child.key as Key] = child;
      }
    });

    return columns?.map((item: any) => {
      const { key, ...other } = item;
      const col = {
        ...other,
        key: key,
        dataIndex: key,
      };

      const ChildComp = childMap[key];

      if (ChildComp && ChildComp.type === TableColumn) {
        col.render = (...params: any[]) => cloneElement(ChildComp, { ...params[1], index: params[2] });
      } else {
        col.render = (text: string | number) => text ?? '-';
      }

      return col;
    });
  }, [children, columns]);

  return <Table bordered sticky {...other} columns={cols} />;
};

export default Comp;
