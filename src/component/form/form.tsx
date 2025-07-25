import { Fragment, forwardRef, useImperativeHandle, createElement, useCallback } from 'react';
import { omitBy } from 'lodash-es';
import { Col, Form, Row } from 'antd';
import formItem from '@/component/form/item';
import type { FormInstance, FormProps, FormItemProps } from 'antd';

interface FItemProps extends FormItemProps {
  type: keyof typeof formItem;
  label: string;
  name: string;
  shouldUpdate?: boolean | ((prevValues: Record<string, unknown>, currentValues: Record<string, unknown>) => boolean);
  displayRules?: Array<{ name: string; value: string | string[]; operator?: 'eq' | 'ne' | 'in' | 'nin' }>; // 与 shouldUpdate 搭配使用，控制其显示隐藏
  span?: number;
  colType?: 'default' | 'large';
  cProps?: {
    [key: string]: unknown;
  };
}

interface FProps extends FormProps {
  fields: FItemProps[];
  grid?: boolean; // grid 布局
  responsive?: boolean; // 是否启动响应式, grid = true 使用
}

export interface FormRef extends FormInstance {
  reset: () => void;
}

const FormWarp = (
  { fields, grid = false, responsive = false, initialValues = {}, ...other }: FProps,
  ref: React.Ref<FormRef>,
) => {
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

  const isShow = useCallback(
    (
      displayRules: Array<{ name: string; value: string | string[]; operator?: 'eq' | 'ne' | 'in' | 'nin' }>,
      getFieldValue: (name: string) => unknown,
    ) => {
      let isDisplayNum = 0;
      const len = displayRules?.length;
      for (let index = 0; index < len; index++) {
        const ele = displayRules[index];
        const fieldValue = getFieldValue(ele.name);
        const ruleValue = ele.value;
        if (Array.isArray(ruleValue) && ruleValue.includes(String(fieldValue))) {
          isDisplayNum++;
        } else if (typeof ruleValue === 'string' && ruleValue === String(fieldValue)) {
          isDisplayNum++;
        }
      }
      return len === isDisplayNum;
    },
    [],
  );

  // 暴露的方法
  useImperativeHandle(ref, () => ({
    ...form,
    getFieldsValue: () => {
      const params = form.getFieldsValue(true);
      // 只剔除null、undefined; 不剔除空字符串
      return omitBy(params, function (item) {
        return item === null || item === undefined;
      });
    },
    validateFields: async () => await form.validateFields(),
    resetFields: () => form.resetFields(),
    setFieldsValue: (values: Record<string, unknown>) => form.setFieldsValue(values),
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
                            {createElement(formItem[type] as React.ComponentType<Record<string, unknown>>, cProps)}
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
                    {createElement(formItem[type] as React.ComponentType<Record<string, unknown>>, cProps)}
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
          {fields?.map(
            ({ type, cProps, shouldUpdate, displayRules, span, colType = 'default', ...itemProps }, index) => {
              // 响应式布局
              const responsiveObj = responsive
                ? {
                    xs: { span: 24 },
                    md: { span: colType === 'default' ? 12 : 24 },
                    lg: { span: colType === 'default' ? 8 : 16 },
                    xl: { span: colType === 'default' ? 6 : 12 },
                    xxl: { span: colType === 'default' ? 4 : 8 },
                  }
                : undefined;

              if (formItem[type]) {
                if (['switch'].includes(type)) {
                  itemProps.valuePropName = 'checked';
                }
                if (shouldUpdate && displayRules) {
                  return (
                    <Col key={index} span={span} {...responsiveObj}>
                      <Form.Item noStyle shouldUpdate={shouldUpdate}>
                        {({ getFieldValue }) => {
                          if (isShow(displayRules, getFieldValue)) {
                            return (
                              <Form.Item {...itemProps}>
                                {createElement(formItem[type] as React.ComponentType<Record<string, unknown>>, cProps)}
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
                    <Col key={index} span={span} {...responsiveObj}>
                      <Form.Item shouldUpdate={shouldUpdate} {...itemProps}>
                        {createElement(formItem[type] as React.ComponentType<Record<string, unknown>>, cProps)}
                      </Form.Item>
                    </Col>
                  );
                }
              } else {
                return (
                  <Col key={index} span={span} {...responsiveObj}>
                    <Form.Item label="待开发组件">-</Form.Item>
                  </Col>
                );
              }
            },
          )}
        </Row>
      )}
    </Form>
  );
};

export default forwardRef(FormWarp);
