import { Fragment, forwardRef, useImperativeHandle, createElement } from 'react';
import { Form } from 'antd';
import formItem from '@/component/form/item';
import type { FormInstance } from 'antd';

interface FormItemProps {
  type: keyof typeof formItem;
  label: string;
  name: string;
  shouldUpdate: any;
  displayRules: any[];
  cProps?: {
    [key: string]: unknown;
  };
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
    setFieldsValue: (values: any) => {
      form.setFieldsValue(values);
    },
  }));

  return (
    <Form form={form} {...other}>
      {fields?.map(({ type, cProps, shouldUpdate, displayRules, ...itemProps }, index) => {
        if (formItem[type]) {
          if (['switch'].includes(type)) {
            itemProps.valuePropName = 'checked';
          }
          if (shouldUpdate && displayRules) {
            return (
              <Fragment key={index}>
                <Form.Item noStyle shouldUpdate={shouldUpdate}>
                  {({ getFieldValue }) => {
                    let isDisplayNum = 0;
                    const len = displayRules?.length;
                    for (let index = 0; index < len; index++) {
                      const ele = displayRules[index];
                      if (ele.value?.includes(getFieldValue(ele.name))) {
                        isDisplayNum++;
                      }
                    }
                    if (len === isDisplayNum) {
                      return <Form.Item {...itemProps}>{createElement(formItem[type], cProps as any)}</Form.Item>;
                    }
                    return null;
                  }}
                </Form.Item>
              </Fragment>
            );
          } else {
            return (
              <Fragment key={index}>
                <Form.Item shouldUpdate={shouldUpdate} {...itemProps}>
                  {createElement(formItem[type], cProps as any)}
                </Form.Item>
              </Fragment>
            );
          }
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
