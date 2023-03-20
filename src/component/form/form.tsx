import { Fragment, forwardRef, useImperativeHandle, createElement, useCallback } from 'react';
import { Col, Form, Row } from 'antd';
import formItem from '@/component/form/item';
import type { FormInstance, FormProps, FormItemProps } from 'antd';

interface FItemProps extends FormItemProps {
  type: keyof typeof formItem;
  label: string;
  name: string;
  shouldUpdate?: any;
  displayRules?: any[]; // 与 shouldUpdate 搭配使用，控制其显示隐藏
  span?: number;
  cProps?: {
    [key: string]: unknown;
  };
}

interface FProps extends FormProps {
  fields: FItemProps[];
  grid?: boolean; // 是否启动 grid 布局
}

export interface FormRef extends FormInstance {
  reset: () => void;
}

const FormWarp = ({ fields, grid = false, initialValues = {}, ...other }: FProps, ref: any) => {
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
  }, [fields, form, initialValues]);

  const isShow = useCallback((displayRules: any[], getFieldValue: (name: string) => any) => {
    let isDisplayNum = 0;
    const len = displayRules?.length;
    for (let index = 0; index < len; index++) {
      const ele = displayRules[index];
      if (ele.value?.includes(getFieldValue(ele.name))) {
        isDisplayNum++;
      }
    }
    return len === isDisplayNum;
  }, []);

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
      {!grid &&
        fields?.map(({ type, cProps, shouldUpdate, displayRules, ...itemProps }, index) => {
          if (formItem[type]) {
            if (['switch'].includes(type)) {
              itemProps.valuePropName = 'checked';
            }
            if (shouldUpdate && displayRules) {
              return (
                <Fragment key={index}>
                  <Form.Item noStyle shouldUpdate={shouldUpdate}>
                    {({ getFieldValue }) => {
                      if (isShow(displayRules, getFieldValue)) {
                        return (
                          <Form.Item {...itemProps}>
                            {createElement(formItem[type] as React.FC, cProps as any)}
                          </Form.Item>
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
      {grid && (
        <Row gutter={12}>
          {fields?.map(({ type, cProps, shouldUpdate, displayRules, span, ...itemProps }, index) => {
            if (formItem[type]) {
              if (['switch'].includes(type)) {
                itemProps.valuePropName = 'checked';
              }
              if (shouldUpdate && displayRules) {
                return (
                  <Col key={index} span={span}>
                    <Form.Item noStyle shouldUpdate={shouldUpdate}>
                      {({ getFieldValue }) => {
                        if (isShow(displayRules, getFieldValue)) {
                          return (
                            <Form.Item {...itemProps}>
                              {createElement(formItem[type] as React.FC, cProps as any)}
                            </Form.Item>
                          );
                        }
                        return null;
                      }}
                    </Form.Item>
                  </Col>
                );
              } else {
                return (
                  <Col
                    key={index}
                    span={span}
                    xs={{ span: 24 }}
                    md={{ span: 12 }}
                    lg={{ span: 8 }}
                    xl={{ span: 6 }}
                    xxl={{ span: 4 }}
                  >
                    <Form.Item shouldUpdate={shouldUpdate} {...itemProps}>
                      {createElement(formItem[type] as React.FC, cProps as any)}
                    </Form.Item>
                  </Col>
                );
              }
            } else {
              return (
                <Col key={index} span={span}>
                  <Form.Item label="待开发组件">-</Form.Item>
                </Col>
              );
            }
          })}
        </Row>
      )}
    </Form>
  );
};

export default forwardRef(FormWarp);
