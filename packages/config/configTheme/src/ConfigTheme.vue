<template>
  <slot></slot>
</template>

<script>
import { provide, reactive, ref } from 'vue'

// Pixel unit
export default {
  name: 'configTheme',

  props: {
    BaseColor: {
      type: Object,
      default: () => ({
        default: '#fff',
        primary: '#409eff',
        success: '#67c23a',
        info: '#909399',
        warning: '#e6a23c',
        danger: '#f56c6c'
      })
    }
  },

  setup (props) {
    const pixelUnit = ref('px')
    const BaseColor = reactive(props.BaseColor)

    provide('pixelUnit', pixelUnit)
    provide('BaseColor', BaseColor)
  }
}
</script>

<style>

</style>
