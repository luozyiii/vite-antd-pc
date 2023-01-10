import { Card, Space, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import BearCom from './component/bear';
import HelloWorld from './component/hello-world';

const Component: React.FC = () => {
  const nav = useNavigate();

  const goToPage = (url: string) => {
    nav(url);
  };

  return (
    <>
      <p>首页功能测试</p>
      <Card>
        <Space>
          <Button onClick={() => goToPage('/login')}>登录</Button>
          <Button type="primary" onClick={() => goToPage('/system/menu')}>
            系统管理-菜单管理
          </Button>
          <Button type="primary" onClick={() => goToPage('/system/user/list')}>
            系统管理-用户管理
          </Button>
          <Button type="primary" onClick={() => goToPage('/system/user/online')}>
            系统管理-在线用户
          </Button>
        </Space>
      </Card>
      <br />
      <Card>
        <h3>zustand React Hook 状态管理</h3>
        <BearCom />
        <HelloWorld />
      </Card>
    </>
  );
};

Component.displayName = 'Home';

export default Component;
