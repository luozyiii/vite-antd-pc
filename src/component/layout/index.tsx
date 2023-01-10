import React, { useEffect, useMemo, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import RouteConfig from '@/route';
import type { MenuProps } from 'antd/es/menu';
import { icons } from './config';
import styles from './index.module.scss';
type MenuItemProps = Required<MenuProps>['items'][number];
const { Header, Content, Sider } = Layout;

const AppLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [mainItems, setMainItems] = useState<MenuItemProps[]>([]);
  const [subItems, setSubItems] = useState<MenuItemProps[]>([]);
  const [mainKey, setMainKey] = useState<string[]>(['home']);
  const [subKey, setSubKey] = useState<string[]>([]);
  const [collapsed, setCollapsed] = useState(false);

  const getMenuTree = (menuList: MenuItemProps[], len: number = 99) => {
    let count = 0;
    function loop(arr: any) {
      count++;
      if (arr && arr.length > 0) {
        const newArr = arr.map((item: any) => {
          let { index, isMenu, title, path, children, icon, ...other } = item;
          // 过滤非菜单路由
          if (isMenu === false) {
            return false;
          }
          // 过滤指向上一级路由的菜单
          if (index) {
            return false;
          }
          const menuItem = {
            ...other,
            label: title,
            key: path,
            children: children && count < len ? loop(children) : undefined,
          };
          if (icon && typeof icon === 'string') {
            menuItem.icon = React.createElement(icons[icon]);
          } else if (icon === '' || icon === undefined) {
            menuItem.icon = undefined;
          } else {
            menuItem.icon = icon;
          }
          return menuItem;
        });
        return newArr.filter(Boolean);
      } else {
        return [];
      }
    }
    return loop(menuList);
  };

  const antdMenuTree = useMemo(() => {
    // 菜单树
    const antdMenuTree = getMenuTree(RouteConfig[0].children);
    // 顶部菜单
    const mainMenuTree = antdMenuTree.map((menuItem: any) => {
      const { children, ...other } = menuItem;
      return other;
    });
    setMainItems(mainMenuTree);
    return antdMenuTree;
  }, []);

  const handleMainClick = ({ item, key }: any) => {
    // 注意：item 在后续版本会移除
    const { pathname } = location;
    if (key === pathname.split('/')[1]) return;
    const redirect = item?.props?.redirect;
    if (redirect) {
      navigate(redirect);
    } else {
      navigate(key);
    }
  };

  const handleSubClick = ({ item, keyPath }: any) => {
    const redirect = item?.props?.redirect;
    if (redirect) {
      navigate(redirect);
      return;
    }
    const { pathname } = location;
    if (pathname) {
      const pathArr = [pathname.split('/')[1], ...keyPath.reverse()].filter(Boolean);
      navigate(`/${pathArr.join('/')}`);
    }
  };

  // 路由改变，左侧菜单刷新
  useEffect(() => {
    const { pathname } = location;
    if (pathname) {
      const keys = pathname.split('/').slice(1);
      console.log(keys);
      const mainKey = keys[0];
      setMainKey([mainKey]);
      setSubKey(keys);
      const _subMenu = antdMenuTree.find((menu: any) => menu.key === mainKey)?.children || [];
      setSubItems(_subMenu);
    }
  }, [antdMenuTree, location]);

  return (
    <Layout>
      <Header className={styles.pageHeader}>
        <div className={styles.logo}>logo</div>
        <Menu
          className={styles.mainMenu}
          theme="dark"
          mode="horizontal"
          selectedKeys={mainKey}
          defaultSelectedKeys={['home']}
          items={mainItems}
          onClick={handleMainClick}
        />
        <div className={styles.userInfo}>
          admin <span>退出</span>
        </div>
      </Header>
      <Content>
        <Layout className={styles.pageContent}>
          {subItems.length > 0 && (
            <Sider
              width={200}
              className={styles.siderBox}
              collapsible
              collapsed={collapsed}
              onCollapse={(value) => setCollapsed(value)}
            >
              <Menu
                className={styles.subMenu}
                mode="inline"
                selectedKeys={subKey}
                defaultOpenKeys={subKey}
                items={subItems}
                onClick={handleSubClick}
              />
            </Sider>
          )}
          <Content className={styles.mainContent}>
            <Outlet />
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
};

export default AppLayout;
