import { lazy } from 'react';
import AppLayout from '@/component/layout';
import Home from '@/page/home';
import NotFound from '@/page/not-found';
import demo from './demo';
import system from './system';
import { withLoadingComponent } from './util';

const Login = lazy(() => import('@/page/login'));

// 业务路由
export const businessRoutes = [
  {
    index: true,
    title: '首页',
    icon: 'IconHome',
    element: <Home />,
  },
  {
    path: 'home',
    title: '首页',
    icon: 'IconHome',
    element: <Home />,
  },
  demo,
  system,
];

export default [
  {
    path: '/',
    element: <AppLayout />,
    children: [
      // 业务路由
      ...businessRoutes,
    ],
  },
  {
    path: 'login',
    title: '登陆',
    element: withLoadingComponent(<Login />),
  },
  {
    path: '*',
    title: '页面找不到',
    element: <NotFound />,
  },
];
