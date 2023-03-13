const fields: any[] = [
  {
    type: 'input',
    label: '手机',
    name: 'phone',
    rules: [{ required: true, message: 'Please input your phone!' }],
    cProps: {
      placeholder: '请输入你的手机号',
      // size: 'small',
      addonBefore: '+86',
      allowClear: true,
      // addonAfter: 'hi',
      // disabled: true,
    },
    hidden: true,
  },
  {
    type: 'password',
    label: '密码',
    name: 'pwd',
    rules: [{ required: true, message: 'Please input your password!' }],
    cProps: {
      // visibilityToggle: false,
    },
  },
  {
    type: 'password',
    label: '确认密码',
    name: 'confirm',
    dependencies: ['pwd'],
    rules: [
      {
        required: true,
        message: 'Please confirm your password!',
      },
      ({ getFieldValue }: any) => ({
        validator(_, value) {
          if (!value || getFieldValue('pwd') === value) {
            return Promise.resolve();
          }
          return Promise.reject(new Error('The two passwords that you entered do not match!'));
        },
      }),
    ],
  },
  {
    type: 'textarea',
    label: '文本域',
    name: 'textarea',
    rules: [{ required: true, message: 'Please input your textarea!' }],
    cProps: {
      showCount: true,
      maxLength: 100,
      // autoSize: true,
      autoSize: { minRows: 3, maxRows: 5 },
    },
  },
  {
    type: 'radio',
    label: '单选框',
    name: 'radio',
    rules: [{ required: true, message: 'Please select your item!' }],
    cProps: {
      // direction: 'vertical',
      options: [
        { value: 'A', label: '选项A' },
        { value: 'B', label: '选项B' },
      ],
    },
    // shouldUpdate: true,
  },
  {
    type: 'checkbox',
    label: '复选框',
    name: 'checkbox',
    cProps: {
      options: [
        { value: 'A', label: 'Apple' },
        { value: 'Apple2', label: 'Apple2' },
      ],
    },
    shouldUpdate: ({ getFieldValue }: any) => getFieldValue('radio') === 'B',
  },
  {
    type: 'select',
    label: '选择器',
    name: 'select',
    rules: [{ required: true, message: 'Please select your item!' }],
    cProps: {
      options: [
        { value: 'A', label: '选项A' },
        { value: 'B', label: '选项B' },
      ],
    },
  },
  {
    type: 'switch',
    label: '开关',
    name: 'switch',
  },
  {
    type: 'datepicker',
    label: '日期',
    name: 'day',
  },
];

export { fields };
