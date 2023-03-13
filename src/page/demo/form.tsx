import { useCallback, useRef, useState } from 'react';
import { Button, Card, Space } from 'antd';
import { Form } from '@/component';
import type { FormRef } from '@/component/form/form-warp';
import { fields } from './config';
// import type { FormInstance } from 'antd';

const FormDemo: React.FC = () => {
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
    <Card>
      <Form
        ref={formRef}
        fields={fields}
        initialValues={{ phone: '18888888888', checkbox: ['A'], switch: true }}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 300 }}
        requiredMark={true}
      />
      <pre>{preStr}</pre>
      <Space>
        <Button type="primary" onClick={handleSubmit}>
          Submit
        </Button>
        <Button onClick={handleReset}>Reset</Button>
      </Space>
    </Card>
  );
};

export default FormDemo;
