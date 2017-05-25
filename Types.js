import Custom from './types/Custom'
import SelectForm from './types/Select'
import RadioForm from './types/Radio'
import CheckboxForm from './types/Checkbox'
import RangeForm from './types/Range'
import DateInput from './types/Date'
import Datetime from './types/Datetime'
import Month from './types/Month'
import Tel from './types/Tel'
import TextForm from './types/Text'
import TextareaForm from './types/Textarea'
import Time from './types/Time'
import Url from './types/Url'
import Week from './types/Week'
import Search from './types/Search'
import Color from './types/Color'
import Email from './types/Email'

export default {
  Custom,
  'Select': SelectForm,
  'Date': DateInput,
  Search,
  Datetime,
  Month,
  Url,
  Time,
  Week,
  Email,
  Color,
  Tel,
  'Textarea': TextareaForm,
  'Text': TextForm,
  'Radio': RadioForm,
  'Range': RangeForm,
  'Checkbox': CheckboxForm
}
