import merge from 'merge'
import utils from './utils'

export default function (schema, createElement) {
  var util = utils(createElement)
  var options = []
  var vm = this
  schema = util.prepare(schema)

  if (schema.options) {
    for (let key in schema.options) {
      let option = schema.options[key]
      let template = {
        attrs: {
          type: 'checkbox',
          name: schema.key,
          value: option.value,
          checked: (schema.default && schema.default === option.value)
        },
        on: {
          click: function (event) {
            vm.$emit(`change-${schema.key}`, event.target.value)
          }
        }
      }

      console.log('schema.template.on.input')
      console.log(schema.template.on.input)
      console.log(template)

      if (option.attrs) {
        template = merge(true, option.attrs, template)
      }

      let radio = createElement('input', template)
      let spam = createElement('spam', option.text)

      options.push(createElement('label', [radio, spam]))
    }
  }

  schema.template.attrs = merge(true, schema.template || {}, { name: schema.key })

  return util.label('span', schema, options)
}
