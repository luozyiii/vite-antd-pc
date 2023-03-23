import { useCallback, useRef, useState } from 'react';
import { Button, Card, Space } from 'antd';
import { PageContent } from '@/component';
import { Form } from '@/component';
import type { FormRef } from '@/component/form/form';
import fields from './config';

const UploadForm: React.FC = () => {
  const [preStr, setPreStr] = useState('');
  const formRef = useRef<FormRef>();

  const handleSubmit = useCallback(async () => {
    await formRef?.current?.validateFields();
    const _values = formRef?.current?.getFieldsValue();
    const pre = JSON.stringify(_values, null, 2);
    setPreStr(pre);
  }, []);

  const handleReset = useCallback(() => {
    formRef?.current?.resetFields();
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
        <Form
          ref={formRef}
          fields={fields}
          initialValues={{
            upload: [],
          }}
          requiredMark={false}
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
