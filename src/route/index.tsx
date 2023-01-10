import AppLayout from '@/component/layout';
import base from './base';
import system from './system';

import Home from '@/page/home';

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
