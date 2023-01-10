import AppLayout from '@/component/layout';
import Home from '@/page/home';
import base from './base';
import system from './system';

export default [
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        title: '首页',
        icon: 'HomeOutlined',
        element: <Home />,
      },
      {
        path: 'home',
        title: '首页',
        icon: 'HomeOutlined',
        element: <Home />,
      },
      ...system,
    ],
  },
  ...base,
];
