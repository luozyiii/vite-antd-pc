import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

const Component: React.FC = () => {
  const nav = useNavigate();

  const goToUserDetail = () => {
    nav('/system/user/detail/A');
  };

  return (
    <>
      <h3>系统管理-用户管理</h3>
      <Button type="primary" onClick={goToUserDetail}>
        用户A
      </Button>
    </>
  );
};

Component.displayName = 'SystemUserList';

export default Component;
