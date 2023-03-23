import { Card } from 'antd';
import { PageContent } from '@/component';
import BearCom from './component/bear';
import HelloWorld from './component/hello-world';

const StoreForm: React.FC = () => {
  return (
    <PageContent>
      <Card>
        <h3>zustand React Hook 状态管理</h3>
        <BearCom />
        <HelloWorld />
      </Card>
    </PageContent>
  );
};

export default StoreForm;
