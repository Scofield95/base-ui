<script>
import { inject } from 'vue'
import { useButtonBackground, useButtonBackgroundHover, useButtonBackgroundActive, useButtonFontColor } from '@/theme/useButtonTheme'

const sizeMap = {
  mini: 20,
  samll: 24,
  default: 32,
  large: 42,
  largeBig: 50
}
export default {
  name: 'Button',

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
    size: String,
    icon: String,
    block: Boolean,
    isBlock: Boolean
  },

  setup (props) {
    const BaseColor = inject('BaseColor')
    // 计算组件的大小
    function getSize (props) {
      return `${props.size ? sizeMap[props.size] : sizeMap.default}px`
    }

    return {
      buttonStyle: {
        '--size': getSize(props),

        '--background': useButtonBackground(props, BaseColor),
        '--background-hover': useButtonBackgroundHover(props, BaseColor),
        '--background-active': useButtonBackgroundActive(props, BaseColor),
        '--fontColor': useButtonFontColor(props, BaseColor),

        '--borderstyle': props.dashed ? 'dashed' : 'solid',
        '--borderColor': props.type ? BaseColor[props.type] : '#dcdfe6'
      }
    }
  },

  render () {
    const {
      $slots, icon, block, isBlock, buttonStyle
    } = this

    const btnClick = () => {
      // this.$attrs.click?.()
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
  color: var(--fontColor, "#333");
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
