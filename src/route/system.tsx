import { lazy } from 'react';
import { withLoadingComponent } from './util';

const MenuPage = lazy(() => import('@/page/system/menu'));
const UserPage = lazy(() => import('@/page/system/user'));
const UserOnlinePage = lazy(() => import('@/page/system/user/online'));
const UserDetailPage = lazy(() => import('@/page/system/user/detail'));

export default {
  type: 'group',
  path: 'system',
  title: '系统管理',
  icon: 'SettingOutlined',
  children: [
    {
      path: 'menu',
      title: '菜单管理',
      icon: 'MenuOutlined',
      element: withLoadingComponent(<MenuPage />),
    },
    {
      path: 'user',
      title: '用户管理',
      icon: 'HomeOutlined',
      children: [
        {
          path: 'list',
          title: '用户列表',
          element: withLoadingComponent(<UserPage />),
        },
        {
          path: 'online',
          title: '在线用户',
          element: withLoadingComponent(<UserOnlinePage />),
        },
        {
          path: 'list/detail/:id',
          title: '用户详情',
          element: withLoadingComponent(<UserDetailPage />),
          isMenu: false,
        },
      ],
    },
  ],
};
