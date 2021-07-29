<template>
  <label
    :class="['base-switch', isChecked ? 'is-checked' : '']"
    :style="baseStyle"
  >
    <span :class="['base-switch_label', isChecked ? '' : 'is-active']"> {{ inactiveText }}</span>
    <div :class="['base-switch_wrap']">
      <input
        type="checkbox"
        class="base-switch_input"
        :checked="isChecked"
        @change="handleChange"
        @input="handleInput"
      >
    </div>
    <span :class="['base-switch_label', isChecked ? 'is-active' : '']"> {{ activeText }}</span>
  </label>
</template>

<script>
import { computed } from "vue"
export default {
  name: "BaseSwitch",
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 40
    },
    activeText: {
      type: String,
      default: undefined
    },
    inactiveText: {
      type: String,
      default: undefined
    },
    activeColor: {
      type: String,
      default: "#409EFF"
    },
    inactiveColor: {
      type: String,
      default: "#C0CCDA"
    }
  },
  emits: ["update:modelValue", "change"],

  setup (props, ctx) {
    const isChecked = computed(() => props.modelValue)

    const handleChange = (e) => {
      ctx.emit("change", e.target.checked)
    }
    const handleInput = (e) => {
      ctx.emit("update:modelValue", e.target.checked)
    }
    return {
      isChecked,
      baseStyle: {
        "--switch-width": `${props.width}px`,
        "--active-color": props.activeColor,
        "--inactive-color": props.inactiveColor
      },
      handleChange,
      handleInput
    }
  }
}
</script>

<style lang="less" scoped>
.base-switch {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  &.is-checked {
    .base-switch_wrap:after {
      transform: translateX(calc(100% + 4px));
    }
    .base-switch_wrap:before {
      background-color: var(--active-color);
    }
  }
}
.base-switch_input {
  display: none;
}
.base-switch_wrap {
  display: inline-block;
  width: var(--switch-width);
  position: relative;
  display: block;
  border-radius: calc(var(--switch-width) / 2);
  cursor: pointer;
  -webkit-user-select: none;
  &::before {
    content: "";
    display: block;
    border-radius: calc(var(--switch-width) / 2);
    height: calc(var(--switch-width) / 2);
    background-color: var(--inactive-color);
    transition: all 0.3s ease;
  }
  &::after {
    content: "";
    position: absolute;
    top: 2px;
    left: 2px;
    width: calc(var(--switch-width) / 2 - 4px);
    height: calc(var(--switch-width) / 2 - 4px);
    border-radius: calc(var(--switch-width) / 2);
    background-color: white;
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.08);
    transform: translateX(0);
    transition: all 0.3s ease;
  }
}
.base-switch_label {
  line-height: 1;
  &.is-active {
    color: var(--active-color);
  }
}
</style>
