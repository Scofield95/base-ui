<template>
  <div class="ba-checkbox_group">
    <slot />
  </div>
</template>
<script>
import { defineComponent, provide, computed, nextTick } from 'vue'
export default defineComponent({
  name: 'BaseCheckboxGroup',
  props: {
    modelValue: {
      type: [Object, Boolean, Array],
      default: () => undefined
    }
  },
  emits: ['update:modelValue', 'change'],
  setup (props, ctx) {
    const changeEvent = (value) => {
      ctx.emit('update:modelValue', value)
      nextTick(() => {
        ctx.emit('change', value)
      })
    }

    const modelValue = computed({
      get () {
        return props.modelValue
      },
      set (val) {
        changeEvent(val)
      }
    })
    provide('CheckboxGroup', {
      name: 'CheckboxGroup',
      modelValue,
      changeEvent
    })
  }

})
</script>
<style lang="less" scoped>
.ba-checkbox_group{
  &:deep(.ba-checkbox) {
      & + .ba-checkbox{
        margin-left: 12px;
      }
  }
}
</style>
