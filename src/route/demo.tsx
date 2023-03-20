import { lazy } from 'react';
import { withLoadingComponent } from './util';

const BaseForm = lazy(() => import('@/page/demo/form/base'));
const LinkageForm = lazy(() => import('@/page/demo/form/linkage'));
const CustomForm = lazy(() => import('@/page/demo/form/custom'));

const TableForm = lazy(() => import('@/page/demo/table/table-form'));

export default {
  type: 'group',
  path: 'demo',
  title: '示例',
  children: [
    {
      path: 'form',
      title: '表单',
      icon: 'FormOutlined',
      children: [
        { path: 'base', title: '基础表单', element: withLoadingComponent(<BaseForm />) },
        { path: 'linkage', title: '表单联动', element: withLoadingComponent(<LinkageForm />) },
        { path: 'custom', title: '自定义表单', element: withLoadingComponent(<CustomForm />) },
      ],
    },
    {
      path: 'table',
      title: '表格',
      icon: 'FormOutlined',
      children: [{ path: 'base', title: '基础查询', element: withLoadingComponent(<TableForm />) }],
    },
  ],
};
