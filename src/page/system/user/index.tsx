import { Button } from 'antd';
import { Link } from 'react-router-dom';
const Component: React.FC = () => {
  return (
    <>
      <h3>系统管理-用户管理</h3>
      <Button type="primary">
        <Link to={`/system/user/detail/A`}>用户A</Link>
      </Button>
    </>
  );
};

Component.displayName = 'SystemUserList';

export default Component;
