<script>
import { inject } from 'vue'
import {
  useButtonBackground,
  useButtonBackgroundHover,
  useButtonBackgroundActive,
  useButtonFontColor
} from '@/theme/useButtonTheme.ts'

const sizeMap = {
  mini: 20,
  samll: 24,
  default: 32,
  large: 42,
  largeBig: 64
}
export default {
  name: 'BaseButton',

  props: {
    type: {
      type: String,
      default: undefined
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
      default: undefined
    }, // primary,error,waring
    size: {
      type: String,
      default: 'default'
    },
    icon: {
      type: String,
      default: ''
    },
    block: {
      type: Boolean,
      default: false
    },
    isBlock: {
      type: Boolean,
      default: false
    }
  },

  setup (props) {
    const baseColor = inject('baseColor')
    // 计算组件的大小
    function getSize (props) {
      return `${props.size ? sizeMap[props.size] : sizeMap.default}px`
    }
    console.log(props.type)
    return {
      buttonStyle: {
        '--size': getSize(props),

        '--background': props.dashed ? '#fff' : useButtonBackground(props, baseColor),
        '--background-hover': props.dashed ? '#fff' : useButtonBackgroundHover(props, baseColor),
        '--background-active': props.dashed ? '#fff' : useButtonBackgroundActive(props, baseColor),
        '--font-color': props.dashed ? baseColor[props.type === 'default' ? 'primary' : props.type] : useButtonFontColor(props, baseColor),

        '--borderstyle': props.dashed ? 'dashed' : 'solid',
        '--borderColor': props.type ? baseColor[props.type === 'default' ? 'primary' : props.type] : '#dcdfe6'
      }
    }
  },

  render () {
    const {
      $slots, icon, block, isBlock, buttonStyle
    } = this

    const btnClick = () => {
      this.$attrs.click?.()
    }

    return (
      <button
        class={`u-base-button ${block ? 'block' : ''} ${
          isBlock ? 'isBlock' : ''
        }`}
        style={buttonStyle}
        on-click={btnClick}
      >
        <i class={`iconfont ${icon}`}></i>
        {$slots.default()}
      </button>
    )
  }

}
</script>
<style lang='less' scoped>
.u-base-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;

  height: var(--size);
  padding: 0 10px;

  background: var(--background, "#fff");
  color: var(--font-color, "#333");
  border: 1px var(--borderstyle) var(--borderColor, "#333");
  border-radius: 6px;

  outline: none;
  cursor: pointer;

  &:hover{
    background: var(--background-hover)
  }

  &:active{
    background: var(--background-active)
  }

  &.block {
    width: var(--size);
    padding: 0;
  }

  &.isBlock {
    width: 100% !important;
  }

  .u-icon + span {
    margin-left: 6px;
  }
  .u-font {
    font-weight: var(--fontWeiget);
    line-height: 18px;
    padding-left: 3px;
  }
  .iconfont {
    font-size: 16px;
    line-height: 18px;
  }
}
</style>
