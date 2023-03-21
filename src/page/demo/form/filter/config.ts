const fields: any[] = [
  {
    type: 'input',
    label: '条件一',
    name: 'name1',
    span: 8,
  },
  {
    type: 'select',
    label: '条件二',
    name: 'name2',
    span: 8,
    cProps: {
      options: [
        { label: 'A', value: 'A' },
        { label: 'B', value: 'B' },
      ],
    },
  },
  {
    type: 'input',
    label: '条件三',
    name: 'name3',
    span: 8,
  },
  {
    type: 'input',
    label: '条件四',
    name: 'name4',
    span: 8,
  },
  {
    type: 'input',
    label: '条件五条件五',
    name: 'name5',
    span: 8,
  },
  {
    type: 'input',
    label: '条件六',
    name: 'name6',
    span: 8,
  },
];

export { fields };
