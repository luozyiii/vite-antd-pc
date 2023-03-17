import { Fragment, forwardRef, useImperativeHandle, createElement, useCallback } from 'react';
import { Form } from 'antd';
import formItem from '@/component/form/item';
import type { FormInstance, FormProps, FormItemProps } from 'antd';

interface FItemProps extends FormItemProps {
  type: keyof typeof formItem;
  label: string;
  name: string;
  shouldUpdate: any;
  displayRules: any[]; // 与 shouldUpdate 搭配使用，控制其显示隐藏
  cProps?: {
    [key: string]: unknown;
  };
}

interface FProps extends FormProps {
  fields: FItemProps[];
}

export interface FormRef extends FormInstance {
  reset: () => void;
}

const FormWarp = ({ fields, initialValues = {}, ...other }: FProps, ref: any) => {
  const [form] = Form.useForm();

  // 区别于resetFields，仅仅重置 values
  const resetFiledsValues = useCallback(() => {
    const values = Object.assign({});
    fields.forEach((field) => {
      if (initialValues[field.name]) {
        values[field.name] = initialValues[field.name];
      } else {
        values[field.name] = undefined;
      }
    });
    form.setFieldsValue(values);
  }, [initialValues]);

  // 暴露的方法
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
    reset: resetFiledsValues,
  }));

  return (
    <Form form={form} initialValues={initialValues} {...other}>
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
                      return (
                        <Form.Item {...itemProps}>{createElement(formItem[type] as React.FC, cProps as any)}</Form.Item>
                      );
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
                  {createElement(formItem[type] as React.FC, cProps as any)}
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
