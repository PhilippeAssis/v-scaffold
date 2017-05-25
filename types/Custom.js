import utils from './utils'

export default function (schema, createElement) {
  var util = utils(createElement)

  schema = util.prepare(schema)

  return util.label(schema.tag, schema)
}
