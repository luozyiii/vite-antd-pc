import { Fragment, forwardRef, useImperativeHandle, createElement } from 'react';
import { Form } from 'antd';
import formItem from '@/component/form/item';
import type { FormInstance } from 'antd';

interface FormItemProps {
  type: keyof typeof formItem;
  label: string;
  name: string;
  cProps?: {
    [key: string]: unknown;
  }; // input 属性
  [key: string]: unknown;
}

interface FormProps {
  fields: FormItemProps[];
  [key: string]: unknown;
}

export interface FormRef extends Omit<FormInstance, 'resetFields'> {
  getFieldsValue: () => void;
  resetFields: () => void;
}

const FormWarp = ({ fields, ...other }: FormProps, ref: any) => {
  const [form] = Form.useForm();

  useImperativeHandle(ref, () => ({
    getFieldsValue: () => {
      return form.getFieldsValue();
    },
    validateFields: async () => {
      await form.validateFields();
    },
    resetFields: () => {
      form.resetFields();
    },
  }));

  return (
    <Form form={form} {...other}>
      {fields?.map(({ type, cProps, ...itemProps }, index) => {
        if (formItem[type]) {
          if (['switch'].includes(type)) {
            itemProps.valuePropName = 'checked';
          }
          return (
            <Fragment key={index}>
              <Form.Item {...itemProps}>
                {createElement(formItem[type], {
                  ...cProps,
                })}
              </Form.Item>
            </Fragment>
          );
        } else {
          return (
            <Fragment key={index}>
              <Form.Item label="待开发组件">-</Form.Item>
            </Fragment>
          );
        }
      })}
    </Form>
  );
};

export default forwardRef(FormWarp);
