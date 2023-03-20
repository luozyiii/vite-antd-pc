import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { DownOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Layout, Menu, Dropdown, Space, Button } from 'antd';
import logoImg from '@/asset/vite.svg';
import { businessRoutes } from '@/route';
import { getAllPath } from '@/route/util';
import useUserInfoStore from '@/store/useUserInfo';
import { icons } from './config';
import styles from './index.module.scss';

const { Sider, Content } = Layout;

const AppLayout = () => {
  const { isLogin } = useUserInfoStore();
  const location = useLocation();
  const nav = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const openKeys = getAllPath(location.pathname); // 当前展开的key

  const handleClick = ({ key }: any) => {
    nav(key);
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const treeForeach = useCallback((tree: any, path?: any) => {
    return tree
      ?.map((data: any) => {
        const { index, isMenu, title, path: _path, children, icon, ...other } = data;
        const pathArr = path ? [...path, _path] : [_path];
        if (isMenu === false) {
          return false;
        }
        if (index) {
          return false;
        }
        if (icon && typeof icon === 'string') {
          other.icon = React.createElement(icons[icon]);
        } else if (icon === '' || icon === undefined) {
          other.icon = undefined;
        } else {
          other.icon = icon;
        }
        return {
          ...other,
          label: title,
          path: _path,
          key: `/${pathArr.join('/')}`,
          children: children ? treeForeach(children, pathArr) : undefined,
        };
      })
      .filter(Boolean);
  }, []);

  const antdMenuTree = useMemo(() => {
    return treeForeach(businessRoutes);
  }, [treeForeach]);

  // 路由改变，左侧菜单刷新
  useEffect(() => {
    const { pathname } = location;
    setSelectedKeys(getAllPath(pathname));
  }, [location]);

  // 登录拦截
  useEffect(() => {
    if (!isLogin) {
      // nav('/login');
    }
  }, [isLogin, nav]);

  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <div>
          <img className={styles.logo} src={logoImg} alt="logo" />
        </div>
        <div className={styles.rightArea}>
          <div className={styles.userInfo}>
            <Dropdown
              menu={{
                items: [
                  {
                    label: <span>退出登录</span>,
                    key: 'logout',
                  },
                ],
              }}
            >
              <a onClick={(e) => e.preventDefault()}>
                <span className={styles.name}>张三</span>
                <Space>
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>
        </div>
      </div>
      <Layout className={styles.content}>
        <div className={styles.leftArea}>
          <div className={styles.siderBox}>
            {antdMenuTree.length > 0 && (
              <Sider
                width={220}
                trigger={null}
                collapsible
                collapsed={collapsed}
                onCollapse={(value: any) => setCollapsed(value)}
              >
                <Menu
                  className={styles.subMenu}
                  mode="inline"
                  selectedKeys={selectedKeys}
                  defaultOpenKeys={openKeys}
                  items={antdMenuTree}
                  onClick={handleClick}
                />
              </Sider>
            )}
          </div>
          <div className={styles.customCollapsed}>
            <Button onClick={toggleCollapsed} className={styles.btn}>
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
          </div>
        </div>
        <Content className={styles.mainContent}>
          <Outlet />
        </Content>
      </Layout>
    </div>
  );
};

export default AppLayout;
