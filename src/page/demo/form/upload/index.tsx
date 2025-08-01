import { useCallback, useRef, useState } from 'react';
import { Button, Card, Space, Alert } from 'antd';
import { PageContent, Form } from '@/component';
import fields from './config';
import type { FormRef } from '@/component/form/form';

// upload组件也是自定义组件
const UploadForm: React.FC = () => {
  const [preStr, setPreStr] = useState('');
  const formRef = useRef<FormRef>(null);

  const handleSubmit = useCallback(async () => {
    await formRef?.current?.validateFields();
    const _values = formRef?.current?.getFieldsValue();
    const pre = JSON.stringify(_values, null, 2);
    setPreStr(pre);
  }, []);

  const handleReset = useCallback(() => {
    formRef?.current?.reset();
  }, []);

  const handleClick = useCallback(() => {
    formRef?.current?.setFieldsValue({
      upload: [
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
          uid: '-2',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
      ],
    });
  }, []);

  return (
    <PageContent>
      <Card>
        <Alert message="Upload组件属于自定义表单" type="info" />
        <br />
        <Form
          ref={formRef}
          fields={fields}
          initialValues={{
            upload: [],
          }}
        />
        <pre>{preStr}</pre>
        <Space>
          <Button type="primary" onClick={handleSubmit}>
            提交
          </Button>
          <Button onClick={handleReset}>重置</Button>
          <Button type="primary" onClick={handleClick}>
            加载数据
          </Button>
        </Space>
      </Card>
    </PageContent>
  );
};

export default UploadForm;
