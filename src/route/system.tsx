import { lazy } from 'react';
import { delayPromise, lazyLoad } from './util';
import type { RouteItemProps } from './type';

const MenuPage = lazy(() => delayPromise(import(/* webpackChunkName: "system-menu" */ '@/page/system/menu')));
const UserPage = lazy(() => delayPromise(import(/* webpackChunkName: "system-user" */ '@/page/system/user')));
const UserOnlinePage = lazy(() =>
  delayPromise(import(/* webpackChunkName: "system-user-online" */ '@/page/system/user/online')),
);
const UserDetailPage = lazy(() =>
  delayPromise(import(/* webpackChunkName: "system-user-detail" */ '@/page/system/user/detail')),
);

const config: RouteItemProps[] = [
  {
    path: 'system',
    title: '系统管理',
    icon: 'SettingOutlined',
    redirect: '/system/user/online', // 重定向 点击可用
    children: [
      {
        path: 'menu',
        title: '菜单管理',
        icon: 'MenuOutlined',
        element: lazyLoad(<MenuPage />),
      },
      {
        path: 'user',
        title: '用户管理',
        icon: 'HomeOutlined',
        children: [
          {
            path: 'list',
            title: '用户管理',
            icon: 'UserOutlined',
            element: lazyLoad(<UserPage />),
          },
          {
            path: 'online',
            title: '在线管理',
            icon: 'UserSwitchOutlined',
            element: lazyLoad(<UserOnlinePage />),
          },
          {
            path: 'detail/:id',
            title: '用户详情',
            icon: 'UserSwitchOutlined',
            element: lazyLoad(<UserDetailPage />),
            isMenu: false,
          },
        ],
      },
    ],
  },
];

export default config;
