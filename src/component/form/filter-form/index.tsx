import React from 'react';
import { Button, Space } from 'antd';
import Form from '../form';
import styles from './index.module.scss';

interface FilterFormProps {
  fields: any[];
}

const FilterForm: React.FC<FilterFormProps> = ({ fields }) => {
  return (
    <div className={styles.box}>
      <div className={styles.formBox}>
        <Form grid fields={fields} />
      </div>
      <div className={styles.actionBtn}>
        <Space>
          <Button type="primary">查询</Button>
          <Button>重置</Button>
        </Space>
      </div>
    </div>
  );
};

export default FilterForm;
