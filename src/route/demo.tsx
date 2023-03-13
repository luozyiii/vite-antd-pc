import { lazy } from 'react';
import { withLoadingComponent } from './util';

const FormDemo = lazy(() => import('@/page/demo/form'));

export default {
  type: 'group',
  path: 'demo',
  title: '示例',
  icon: 'SettingOutlined',
  children: [
    {
      path: 'form',
      title: '表单',
      icon: 'MenuOutlined',
      element: withLoadingComponent(<FormDemo />),
    },
  ],
};
