<template>
  <slot />
</template>

<script>
import { provide, reactive, ref } from 'vue'

// Pixel unit
export default {
  name: 'BaseConfigTheme',

  props: {
    baseColor: {
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
    const baseColor = reactive(props.baseColor)

    provide('pixelUnit', pixelUnit)
    provide('baseColor', baseColor)
  }
}
</script>

<style>

</style>
