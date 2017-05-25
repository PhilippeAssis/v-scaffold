import Types from '@/libs/AutoForm/Types'

export default {
  title: 'My Form',
  description: 'It\'s a form with json',
  schema: {
    name: {
      type: Types.Text,
      description: 'Your name in description',
      default: null,
      template: {
        attrs: {
          placeholder: 'Your name'
        }
      }
    },
    color: {
      type: Types.Color,
      default: '#FF00FF'
    },
    sex: {
      type: Types.Select,
      options: ['Male', 'Female'],
      default: 'Female'
    },
    list: {
      type: Types.Select,
      options: ['feijão', 'arroz', 'macarrão'],
      default: 'Female',
      template: {
        attrs: {
          multiple: 'true'
        }
      }
    },
    lang: {
      type: Types.Radio,
      options: [{
        text: 'PHP',
        value: 1
      },
      {
        text: 'Python',
        value: 2
      },
      {
        text: 'Nodejs',
        value: 3
      }],
      default: 3,
      transform: val => parseInt(val)
    },
    others: {
      type: Types.Checkbox,
      options: [{
        text: 'PHP',
        value: 1
      },
      {
        text: 'Python',
        value: 2
      },
      {
        text: 'Nodejs',
        value: 3
      }],
      default: 3,
      validate: [val => !Number.isNaN(val), val => (typeof val === 'string')],
      transform: val => parseInt(val)
    }
  }
}
