const fields: any[] = [
  {
    type: 'datepicker',
    label: '日期',
    name: 'date',
    cProps: {
      format: 'YYYY-MM-DD',
    },
  },
  {
    type: 'daterangepicker',
    label: '日期范围',
    name: 'daterange',
  },
  {
    type: 'timepicker',
    label: '时间',
    name: 'time',
  },
  {
    type: 'timerangepicker',
    label: '时间范围',
    name: 'timerange',
  },
];

export default fields;
