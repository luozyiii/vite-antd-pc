import Checkbox from './base/checkbox';
import DatePicker from './base/datepicker';
import Input from './base/input';
import Password from './base/password';
import Radio from './base/radio';
import Select from './base/select';
import Switch from './base/switch';
import TextArea from './base/textarea';
import PriceUnit from './custom/price-unit';

export default {
  input: Input,
  password: Password,
  textarea: TextArea,
  radio: Radio,
  select: Select,
  checkbox: Checkbox,
  switch: Switch,
  datepicker: DatePicker,
  // 自定义组件
  priceUnit: PriceUnit, // object
};
