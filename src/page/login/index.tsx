import { useCallback, useState } from 'react';
import { Button } from 'antd';
import styles from './index.module.scss';

const Component: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const handleLogin = useCallback(() => {
    setIsLogin(true);
  }, []);

  return (
    <div className={styles.loginPage}>
      <Button type="primary" onClick={handleLogin}>
        登录
      </Button>
      <p>{isLogin ? '已登录' : '未登录'}</p>
    </div>
  );
};

Component.displayName = 'Login';

export default Component;
