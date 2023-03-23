import { Card } from 'antd';
import PageContent from '@/component/page-content';
import styles from './index.module.scss';

const Component: React.FC = () => {
  return (
    <PageContent title="首页">
      <Card className={styles.homeBox}>
        <h2>欢迎使用~</h2>
      </Card>
    </PageContent>
  );
};

Component.displayName = 'Home';

export default Component;
