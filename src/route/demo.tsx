import { lazy } from 'react';
import { withLoadingComponent } from './util';

const BaseForm = lazy(() => import('@/page/demo/form/base'));
const DateTimeForm = lazy(() => import('@/page/demo/form/datetime'));
const LinkageForm = lazy(() => import('@/page/demo/form/linkage'));
const CustomForm = lazy(() => import('@/page/demo/form/custom'));

const FilterForm = lazy(() => import('@/page/demo/form/filter'));

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
        { path: 'datetime', title: '日期时间', element: withLoadingComponent(<DateTimeForm />) },
        { path: 'linkage', title: '表单联动', element: withLoadingComponent(<LinkageForm />) },
        { path: 'custom', title: '自定义表单', element: withLoadingComponent(<CustomForm />) },
        { path: 'filter', title: '筛选表单', element: withLoadingComponent(<FilterForm />) },
      ],
    },
  ],
};
