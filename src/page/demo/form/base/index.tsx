import { useCallback, useRef, useState } from 'react';
import { Button, Card, Space } from 'antd';
import { PageContent } from '@/component';
import { Form } from '@/component';
import type { FormRef } from '@/component/form/form-warp';
import fields from './config';

const BaseForm: React.FC = () => {
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

  return (
    <PageContent>
      <Card>
        <Form
          ref={formRef}
          layout="inline"
          fields={fields}
          initialValues={{ checkbox: ['HuaWei'], switch: true }}
          requiredMark={false}
        />
        <pre>{preStr}</pre>
        <Space>
          <Button type="primary" onClick={handleSubmit}>
            提交
          </Button>
          <Button onClick={handleReset}>重置</Button>
        </Space>
      </Card>
    </PageContent>
  );
};

export default BaseForm;
