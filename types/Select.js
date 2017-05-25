import merge from 'merge'
import utils from './utils'

export default function (schema, createElement) {
  var util = utils(createElement)
  var options = []
  schema = util.prepare(schema)

  if (schema.options) {
    for (let key in schema.options) {
      let option = schema.options[key]
      let attrs = { selected: (schema.default && schema.default === option.value) }

      if (option.attrs) {
        attrs = merge(true, option.attrs, attrs)
      }

      options.push(createElement('option', { attrs }, option.text))
    }
  }

  schema.template.attrs = merge(true, schema.template || {}, { name: schema.key })
  console.log('select', schema)
  return util.label('select', schema, options)
}
