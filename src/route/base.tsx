import { lazy } from 'react';
import NotFound from '@/page/not-found';
import { delayPromise, lazyLoad } from './util';

const Login = lazy(() => delayPromise(import(/* webpackChunkName: "login" */ '@/page/login')));

const routeConfig: any[] = [
  {
    path: 'login',
    title: '登陆',
    element: lazyLoad(<Login />),
  },
  {
    path: '*',
    title: '页面找不到',
    element: <NotFound />,
  },
];

export default routeConfig;
