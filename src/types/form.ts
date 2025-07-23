import type { Rule, FormItemProps } from 'antd/es/form';

export interface FormField extends FormItemProps {
  type:
    | 'number'
    | 'checkbox'
    | 'password'
    | 'radio'
    | 'switch'
    | 'select'
    | 'input'
    | 'textarea'
    | 'treeselect'
    | 'datepicker'
    | 'daterangepicker'
    | 'timepicker'
    | 'timerangepicker'
    | 'cascader'
    | 'upload'
    | 'priceUnit';
  label: string;
  name: string;
  rules?: Rule[];
  cProps?: Record<string, unknown>;
  shouldUpdate?: (prevValues: Record<string, unknown>, currentValues: Record<string, unknown>) => boolean;
  displayRules?: Array<{ name: string; value: string | string[]; operator?: 'eq' | 'ne' | 'in' | 'nin' }>;
  span?: number;
  colType?: 'default' | 'large';
  [key: string]: unknown;
}

export type FormFields = FormField[];
