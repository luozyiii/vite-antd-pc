const fields: any[] = [
  {
    type: 'input',
    label: '手机',
    name: 'phone',
    rules: [{ required: true, message: '请输入您的手机号!' }],
    cProps: {
      placeholder: '请输入',
      // size: 'small',
      addonBefore: '+86',
      allowClear: true,
      // addonAfter: 'hi',
      // disabled: true,
    },
  },
  {
    type: 'password',
    label: '密码',
    name: 'pwd',
    rules: [{ required: true, message: '请输入您的密码!' }],
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
        message: '请确认您的密码!',
      },
      ({ getFieldValue }: any) => ({
        validator(_, value) {
          if (!value || getFieldValue('pwd') === value) {
            return Promise.resolve();
          }
          return Promise.reject(new Error('两个密码不一致!'));
        },
      }),
    ],
  },
  {
    type: 'textarea',
    label: '文本域',
    name: 'textarea',
    rules: [{ required: true, message: '请输入!' }],
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
    rules: [{ required: true, message: '请选择!' }],
    shouldUpdate: true,
    cProps: {
      // direction: 'vertical',
      options: [
        { value: 'A', label: '选项A' },
        { value: 'B', label: '选项B' },
      ],
    },
  },
  {
    type: 'checkbox',
    label: '复选框',
    name: 'checkbox',
    cProps: {
      options: [
        { value: 'HuaWei', label: 'HuaWei' },
        { value: 'Apple', label: 'Apple' },
      ],
    },
  },
  {
    type: 'select',
    label: '选择器',
    name: 'select',
    rules: [{ required: true, message: '请选择!' }],
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
    name: 'date',
  },
];

export default fields;
