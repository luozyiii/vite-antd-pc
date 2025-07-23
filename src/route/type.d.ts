export interface RouteItemProps {
  icon?: string; // 图标
  path?: string; // 路由
  title?: string;
  redirect?: string; // 重定向
  role?: string; // 权限码
  index?: boolean;
  element?: React.ReactNode; // 页面组件
  isMenu?: boolean; // 是不是菜单
  children?: RouteItemProps[]; // 子路由
}
