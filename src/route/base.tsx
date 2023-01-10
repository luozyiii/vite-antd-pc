import { lazy } from 'react';
import { delayPromise, lazyLoad } from './util';

import NotFound from '@/page/not-found';
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
