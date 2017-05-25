const cleanObj = function (item) {
  const recursiveEntries = (object) => {
    var entries = Object.entries(object)
    var objEntries = []

    for (let i in entries) {
      var obj = entries[i]
      if (obj[1] !== null && typeof obj[1] === 'object') {
        obj[1] = recursiveEntries(obj[1])
      }

      objEntries.push(obj)
    }

    var entriesMap = new Map(objEntries)
    var objReturn = {}

    entriesMap.forEach((val, key) => { objReturn[key] = val })

    return objReturn
  }

  return recursiveEntries(item)
}

export default {
  props: {
    schema: {
      type: Object
    },
    'config': {
      type: Object,
      default: null
    }
  },
  data: function () {
    var data = {}

    for (let key in this.schema.schema) {
      let Type = this.schema.schema[key].type

      if (typeof Type === 'object') {
        data[key] = this.schema.schema[key].default ? Type.prepare.call(this, this.schema.schema[key].default) : null
      } else {
        data[key] = this.schema.schema[key].default ? this.schema.schema[key].default : null
      }
    }

    return data
  },
  render: function (createElement) {
    var vm = this
    var template = []

    for (let key in vm.schema.schema) {
      let item = vm.schema.schema[key]
      item.key = key
      let Type = item.type

      if (typeof Type === 'object') {
        Type = Type.handle
      }

      /**
      O itemSchema esta sendo passado em Json.parse e Json.stringify para
      limpar o objeto.
      Ocorre que o objeto chega aqui com propriedade como setter e getter
      e o createElement não aceita trabalhar com objeto assim
      **/
      item = cleanObj(item)

      /**
       * Cria um evento para atualizar em parent
       */

      if (!item.template) {
        item.template = {}
      }

      if (!item.template.on) {
        item.template.on = {}
      }

      item.template.on.input = function (event) {
        vm.$emit(`pre-change-${key}`, event.target.value)
      }
      /**
       * Escuta o evento e item-* e passa atualiza os valores. Tb passa change
       */
      vm.$on(`pre-change-${key}`, function (data) {
        let prop = {}
        if (typeof item === 'object' && data['__prop']) {
          prop = data['__prop']
          data = data.data
        }

        if (item.transform && !prop.blockTransform) {
          data = item.transform(data)
        }

        vm.$set(vm.$data, key, data)
        vm.$emit(`change-${key}`, vm.$data)
        vm.$emit('change', vm.$data)
        vm.$emit('input', vm.$data)
      })

      template.push(Type.call(vm, item, createElement))
    }

    if (vm.$slots && vm.$slots.default) {
      template.push(this.$slots.default)
    }

    return createElement('form', {
      on: {
        submit: function (event) {
          vm.$emit('submit', event)
        }
      }
    }, template)
  }
}
