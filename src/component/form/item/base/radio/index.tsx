import { Radio, Space } from 'antd';

interface RadioProps {
  options: any[];
  direction?: 'horizontal' | 'vertical';
  [key: string]: any;
}

const Comp = ({ options, direction = 'horizontal', ...other }: RadioProps) => {
  return (
    <Radio.Group {...other}>
      <Space direction={direction}>
        {options?.map((option: any, index: number) => {
          const { value, label, ...rest } = option;
          return (
            <Radio key={index} value={value} {...rest}>
              {label}
            </Radio>
          );
        })}
      </Space>
    </Radio.Group>
  );
};

export default Comp;
