import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import PageContent from '@/component/page-content';

const Component: React.FC = () => {
  const nav = useNavigate();

  const goToUserDetail = () => {
    nav('/system/user/list/detail/A');
  };

  return (
    <PageContent>
      <div>
        <h3>系统管理-用户管理</h3>
        <Button type="primary" onClick={goToUserDetail}>
          用户A
        </Button>
      </div>
    </PageContent>
  );
};

Component.displayName = 'SystemUserList';

export default Component;
