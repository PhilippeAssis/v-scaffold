<template lang="pug">
span
	h1 Schema Ok
	Generator(:schema="MySchema" v-model="result" @submit.prevent.stop="submit" @change="change" @change-name="onlyName")
		template
			button(type="submit") Save
	h2 Only name
	pre
		code {{ name }}
	pre
		code {{ prev }}
	h2 result
	pre
		code {{ result }}
	h2 submit
		pre
			code {{ finish }}
</template>

<script>
import Generator from '@/libs/AutoForm/Generator.js'
import MySchema from './MyForm'

export default {
  components: {
    Generator
  },
  data: function () {
    return {
      MySchema,
      result: '',
      prev: '',
      finish: '',
      name: ''
    }
  },
  methods: {
    onlyName: function (val) {
      this.name = val
    },
    submit: function (val) {
      this.finish = JSON.stringify(this.result).replace(/"/g, ' ')
    },
    change: function (val) {
      this.prev = val
    }
  }
}
</script>
