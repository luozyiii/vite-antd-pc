import { Card } from 'antd';
import { PageContent, ModalForm } from '@/component';
import { fields } from './config';

const ModalFormPage = () => {
  return (
    <PageContent>
      <Card bordered={false}>
        <ModalForm fields={fields}>新增</ModalForm>
      </Card>
    </PageContent>
  );
};

export default ModalFormPage;
