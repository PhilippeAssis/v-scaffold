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
      data[key] = this.schema.schema[key].default ? this.schema.schema[key].default : null
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

      if (!item.template) {
        item.template = {}
      }

      if (!item.template.on) {
        item.template.on = {}
      }

      /**
      O itemSchema esta sendo passado em Json.parse e Json.stringify para
      limpar o objeto.
      Ocorre que o objeto chega aqui com propriedade como setter e getter
      e o createElement não aceita trabalhar com objeto assim
      **/
      item = JSON.parse(JSON.stringify(item))

      /**
       * Cria um evento para atualizar em parent
       */
      item.template.on.input = function (event) {
        vm.$emit(`change-${key}`, event.target.value)
      }

      /**
       * Escuta o evento e item-* e passa atualiza os valores. Tb passa change
       */
      vm.$on(`change-${key}`, function (data) {
        vm.$set(vm.$data, key, data)
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
