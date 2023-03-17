import { Radio, Space } from 'antd';
import type { RadioGroupProps } from 'antd';

interface RProps extends RadioGroupProps {
  direction?: 'horizontal' | 'vertical';
}

const Comp = ({ options, direction = 'horizontal', ...other }: RProps) => {
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
