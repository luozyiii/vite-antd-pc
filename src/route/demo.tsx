import { lazy } from 'react';
import { withLoadingComponent } from './util';

// 布局
const BaseLayout = lazy(() => import('@/page/demo/layout/base'));
const DetailLayout = lazy(() => import('@/page/demo/layout/detail'));

// 表单
const BaseForm = lazy(() => import('@/page/demo/form/base'));
const SelectForm = lazy(() => import('@/page/demo/form/select'));
const DateTimeForm = lazy(() => import('@/page/demo/form/datetime'));
const LinkageForm = lazy(() => import('@/page/demo/form/linkage'));
const CustomForm = lazy(() => import('@/page/demo/form/custom'));
const FilterForm = lazy(() => import('@/page/demo/form/filter'));
const UploadForm = lazy(() => import('@/page/demo/form/upload'));
const ModalFormPage = lazy(() => import('@/page/demo/form/modal'));

// 项目
const StorePage = lazy(() => import('@/page/demo/project/store'));
const FetchPage = lazy(() => import('@/page/demo/project/fetch'));

export default {
  type: 'group',
  path: 'demo',
  title: '示例',
  children: [
    {
      path: 'layout',
      title: '布局',
      icon: 'LayoutOutlined',
      children: [
        { path: 'base', title: '基础容器', element: withLoadingComponent(<BaseLayout />) },
        { path: 'detail', title: '详情容器', element: withLoadingComponent(<DetailLayout />) },
      ],
    },
    {
      path: 'form',
      title: '表单',
      icon: 'FormOutlined',
      children: [
        { path: 'base', title: '基础', element: withLoadingComponent(<BaseForm />) },
        { path: 'select', title: '选择器', element: withLoadingComponent(<SelectForm />) },
        { path: 'datetime', title: '日期时间', element: withLoadingComponent(<DateTimeForm />) },
        { path: 'linkage', title: '表单联动', element: withLoadingComponent(<LinkageForm />) },
        { path: 'upload', title: '上传', element: withLoadingComponent(<UploadForm />) },
        { path: 'custom', title: '自定义表单', element: withLoadingComponent(<CustomForm />) },
        { path: 'filter', title: '筛选表单', element: withLoadingComponent(<FilterForm />) },
        { path: 'modal', title: '弹窗表单', element: withLoadingComponent(<ModalFormPage />) },
      ],
    },
    {
      path: 'project',
      title: '项目',
      icon: 'ProjectOutlined',
      children: [
        { path: 'store', title: '状态管理', element: withLoadingComponent(<StorePage />) },
        { path: 'fetch', title: '请求示例', element: withLoadingComponent(<FetchPage />) },
      ],
    },
  ],
};
