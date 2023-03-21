import React, { useCallback, useState, useRef } from 'react';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import Form from '../form';
import styles from './index.module.scss';

interface FilterFormProps {
  fields: any[];
  showExpand?: boolean; // 展示/收起; 后续用动态布局替代该属性
  defaultExpand?: boolean; // 默认收起
}

const FilterForm: React.FC<FilterFormProps> = ({ fields, showExpand = true, defaultExpand = false }) => {
  const formRef = useRef(null);
  const [expand, setExpand] = useState(defaultExpand);

  const expandOnChange = useCallback(() => {
    setExpand(!expand);
  }, [expand]);

  return (
    <div className={styles.box}>
      <Form
        ref={formRef}
        grid
        responsive
        fields={fields}
        className={styles.formBox}
        style={{ height: showExpand ? (!expand ? '56px' : 'auto') : 'auto' }}
      />
      <div className={styles.actionBtn}>
        <Space>
          <Button type="primary">查询</Button>
          <Button>重置</Button>
          {showExpand && (
            <span className={styles.expand} onClick={expandOnChange}>
              {expand ? (
                <>
                  收起 <UpOutlined />
                </>
              ) : (
                <>
                  展开 <DownOutlined />
                </>
              )}
            </span>
          )}
        </Space>
      </div>
    </div>
  );
};

export default FilterForm;
