import { useNavigate, useLocation } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import { getRouteTitle } from '@/route/util';
import styles from './index.module.scss';
const { Content } = Layout;

interface PageContentProps {
  title?: string;
  back?: boolean; // 返回上一页
  children?: React.ReactNode | null;
  rightArea?: React.ReactNode | null;
}

const PageContent: React.FC<PageContentProps> = ({ title, back = false, children, rightArea }: PageContentProps) => {
  const nav = useNavigate();
  const location = useLocation();

  title = title || getRouteTitle(location.pathname);

  return (
    <Content className={styles.pageContent}>
      <div className={styles.headerBox}>
        <div className={styles.title}>
          {back && <LeftOutlined className={styles.back} onClick={() => nav(-1)} />}
          {title}
        </div>
        {rightArea && <div className={styles.rightBox}>{rightArea}</div>}
      </div>
      <div className={styles.contentBox}>{children}</div>
    </Content>
  );
};

export default PageContent;
