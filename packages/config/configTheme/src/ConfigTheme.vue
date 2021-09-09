<template>
  <slot />
</template>

<script>
import { provide, defineComponent } from 'vue'

// Pixel unit
export default defineComponent({
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
    provide('baseColor', props.baseColor)
  }
})
</script>

<style>

</style>
