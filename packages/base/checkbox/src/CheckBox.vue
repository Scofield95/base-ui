<template>
  <label
    :class="[
      'base-checkbox',
      isChecked ? 'isChecked' : ''
    ]"
    :style="baseStyle"
  >
    <span class="base-checkbox_model">
      <BaseIcon
        color="#fff"
        type="CheckOutlined"
      />
      <input
        v-model="model"
        class="base-input_checkbox"
        type="checkbox"
        :value="value"
        :checked="isChecked"
        @change="handleChange"
      >
    </span>
    <span
      v-if="$slots.default || label"
      class="base-checkbox_label"
    >
      <slot />
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
</template>
<script>
import { defineComponent } from 'vue'
import { useCheckbox } from './useCheckbox'
import BaseIcon, {} from '@/base/icon/src/Icon.vue'

export default defineComponent({
  components: {
    BaseIcon
  },
  props: {
    modelValue: {
      type: [Boolean, Number, String],
      default: () => undefined
    },
    label: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'primary'
    }
  },
  emits: ['update:modelValue', 'change'],
  // eslint-disable-next-line no-unused-vars
  setup (props) {
    return useCheckbox(props)
  }
})
</script>
<style lang="less" scoped>
.base-checkbox{
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  &.isChecked{
    .base-checkbox_model{
        background: var(--checkbox-theme);
      border: 1px solid var(--checkbox-theme);
    }
  }
  .base-checkbox_model{
    width: 18px;
    height: 18px;
    background: #fff;
    border: 1px solid #606266;
  }
  .base-input_checkbox{
    width: 0;
    height: 0;
    visibility: hidden;
  }
  .base-checkbox_label{
    padding-left: 12px;
  }
}
</style>
