import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import useUserInfo from '@/store/useUserInfo';
import styles from './index.module.scss';

const Component: React.FC = () => {
  const nav = useNavigate();
  const { setUserInfo, setToken } = useUserInfo();

  const handleLogin = useCallback(() => {
    setUserInfo({
      name: 'leslie',
      phone: '18825040603',
    });
    setToken('token1233333');
    nav('/');
  }, [nav, setToken, setUserInfo]);

  return (
    <div className={styles.loginPage}>
      <Button type="primary" onClick={handleLogin}>
        登录
      </Button>
    </div>
  );
};

Component.displayName = 'Login';

export default Component;
