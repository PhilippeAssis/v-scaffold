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

      let attrs = {
        selected: (schema.default && schema.default === option.value),
        value: option.value
      }

      if (option.attrs) {
        attrs = merge(true, option.attrs, attrs)
      }

      options.push(createElement('option', { attrs }, option.text))
    }
  }

  schema.template.attrs = merge(true, schema.template.attrs || {}, { name: schema.key })

  if (schema.template.attrs.multiple) {
    schema.template.on.input = function (event) {
      let childs = event.target.childNodes
      let result = []

      for (let key in childs) {
        console.log('childs', childs[key].value)
        if (childs[key].selected) {
          result.push(childs[key].value)
        }
      }
      console.log(result)
      vm.$emit(`pre-change-${schema.key}`, result)
    }
  }

  return util.label('select', schema, options)
}
