import merge from 'merge'
import utils from './utils'

export default {
  prepare: function (value) {
    if (!Array.isArray(value)) {
      return [value]
    }
    console.log('ok')
    return value
  },
  validate: utils.validate,
  handle: function (schema, createElement) {
    var util = utils(createElement)
    var options = []
    var vm = this
    schema = util.prepare(schema)

    if (schema.options) {
      for (let key in schema.options) {
        let option = util.stringToObject(schema.options[key])
        let template = {
          attrs: {
            type: 'checkbox',
            name: schema.key,
            value: option.value,
            checked: (schema.default && schema.default === option.value)
          },
          on: {
            click: function (event) {
              var data = (vm.$data[schema.key]) ? vm.$data[schema.key] : []
              var value = schema.transform ? schema.transform.call(this, event.target.value) : event.target.value

              if (event.target.checked && data.indexOf(value) === -1) {
                data.push(value)
              } else if (!event.target.checked) {
                data = data.filter(val => val !== value)
              }

              vm.$emit(`pre-change-${schema.key}`, { data, '__prop': { 'blockTransform': true } })
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
}
