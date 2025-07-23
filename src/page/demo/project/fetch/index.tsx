import { useCallback } from 'react';
import { Space, Button, Card } from 'antd';
import api from '@/api';
import { PageContent } from '@/component';
import { BatchImport } from '@/component/business';
import { downloadBlob } from '@/util';

const FetchDemo: React.FC = () => {
  const handleFetch = useCallback(async () => {
    const res = await api.common.testapi({
      hi: 111,
    });
    console.warn('API response:', res);
  }, []);
  const handleExport = useCallback(async () => {
    const res = await api.common.export();
    downloadBlob(res.data, 'xxx.xlsx');
  }, []);

  const handleOnUpdate = useCallback(() => {
    console.warn('onUpdate triggered');
  }, []);
  return (
    <PageContent title="请求示例">
      <Card>
        <Space>
          <Button onClick={handleFetch}>简单请求</Button>
          <BatchImport accept=".xlsx" fetch={api.common.import} onUpdate={handleOnUpdate}>
            批量导入
          </BatchImport>
          <Button onClick={handleExport}>导出</Button>
        </Space>
      </Card>
    </PageContent>
  );
};

export default FetchDemo;
