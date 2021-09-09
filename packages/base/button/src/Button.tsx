import { inject, defineComponent, PropType, CSSProperties } from "vue"
import {
  useButtonSize,
  useButtonBackground,
  useButtonBackgroundHover,
  useButtonBackgroundActive,
  useButtonFontColor
} from "@/base/button/src/useButtonTheme"
import { IBaseColor } from "@/theme/interface"
import type { Type, Size } from "./types"

import "./style/button.less"

export default defineComponent({
  name: "BaseButton",

  props: {
    type: {
      type: String,
      default: 'primary'
    }, // [primary, success, warning, error]
    dashed: {
      // 虚线/实线
      type: Boolean,
      default: false
    },
    plain: {
      // 朴素形态
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: 'primary'
    }, // primary,error,waring
    size: {
      type: String as PropType<Size>,
      default: "default"
    },
    block: {
      type: Boolean,
      default: false
    },
    circle: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  emits: ['click'],
  setup (props, ctx) {
    const baseColor: IBaseColor = inject("baseColor", {
      default: '#fff',
      primary: '#409eff',
      success: '#67c23a',
      info: '#909399',
      warning: '#e6a23c',
      danger: '#f56c6c'
    })

    // 按钮事件
    const handleClick = () => {
      ctx.emit('click')
    }
    return {
      buttonStyle: {
        "--size": useButtonSize(props),

        "--background": useButtonBackground(props, baseColor),
        "--background-hover": useButtonBackgroundHover(props, baseColor),
        "--background-active": useButtonBackgroundActive(props, baseColor),
        "--font-color": useButtonFontColor(props, baseColor),

        "--borderstyle": props.dashed ? "dashed" : "solid",
        "--borderColor": props.type
          ? baseColor[props.type === "default" ? "primary" : props.type]
          : "#dcdfe6"
      } as CSSProperties,

      handleClick
    }
  },

  render () {
    const { $slots, disabled, block, buttonStyle } = this

    return (
      <button
        disabled={disabled}
        class={[`bs_button`, disabled ? 'disabled' : '', block ? "block" : ""]}
        style={buttonStyle}
        onClick={this.handleClick}
      >
        {$slots.icon?.()}
        {$slots.default?.()}
      </button>
    )
  }
})
