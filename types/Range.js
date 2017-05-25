import merge from 'merge'
import utils from './utils'

export default function (schema, createElement) {
  var util = utils(createElement)

  schema = util.prepare(schema)

  schema.template.attrs = merge(true, schema.template.attrs, { type: 'range', name: schema.key })

  return util.label('input', schema)
}
