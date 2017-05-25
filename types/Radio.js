import merge from 'merge'
import utils from './utils'

export default function (schema, createElement) {
  var util = utils(createElement)
  var options = []
  var vm = this
  schema = util.prepare(schema)

  if (schema.options) {
    for (let key in schema.options) {
      let option = util.stringToObject(schema.options[key])

      let template = {
        attrs: {
          type: 'radio',
          name: schema.key,
          value: option.value,
          checked: (schema.default && schema.default === option.value)
        },
        on: {
          click: function (event) {
            vm.$emit(`pre-change-${schema.key}`, event.target.value)
          }
        }
      }

      if (option.attrs) {
        template = merge(true, option.attrs, template)
      }

      let radio = createElement('input', template)
      let span = createElement('span', option.text)

      options.push(createElement('label', [radio, span]))
    }
  }

  schema.template.attrs = merge(true, schema.template || {}, { name: schema.key })

  return util.label('span', schema, options)
}
