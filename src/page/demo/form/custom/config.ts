const checkPrice = (_: unknown, value: { number: number }) => {
  if (value.number > 0) {
    return Promise.resolve();
  }
  return Promise.reject(new Error('至少大于零!'));
};

import type { FormFields } from '@/types/form';

const fields: FormFields = [
  {
    type: 'priceUnit',
    label: '价格',
    name: 'price',
    rules: [{ validator: checkPrice }],
  },
];

export default fields;
