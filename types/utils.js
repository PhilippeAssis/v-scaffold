import merge from 'merge'
import uuid from 'uuid/v4'

export default function (createElement) {
  return {
    label: function (type, schema, slot = []) {
      schema.template.attrs = merge(true, schema.template.attrs, { id: `autoform-${uuid()}` })

      var item = createElement(type, schema.template, slot)

      var label = createElement('label', {
        attrs: {
          for: schema.template.attrs.id
        }
      }, schema.label || schema.key)

      return createElement('div', [label, item])
    },
    prepare: function (schema) {
      if (!schema.template) {
        schema.template = {}
      }

      if (!schema.template.attrs) {
        schema.template.attrs = {}
      }

      return schema
    }
  }
}
