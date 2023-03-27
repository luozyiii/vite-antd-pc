import { useCallback } from 'react';
import { Button, Card } from 'antd';
import api from '@/api';
import { PageContent } from '@/component';

const StoreForm: React.FC = () => {
  const handleFetch = useCallback(async () => {
    const res = await api.common.blobapi({
      hi: 111,
    });
    console.log('res', res);
  }, []);
  return (
    <PageContent title="请求示例">
      <Card>
        <Button onClick={handleFetch}>简单请求</Button>
      </Card>
    </PageContent>
  );
};

export default StoreForm;
