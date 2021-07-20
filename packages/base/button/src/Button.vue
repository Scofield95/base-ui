<script>
import Color from 'color';
import buttonConfig from './buttonConfig.ts';

export default {
  name: 'Button',

  props: {
    type: {
      type: String,
      default: undefined,
    }, // [primary, success, warning, error]
    dashed: {
      // 虚线/实线
      type: Boolean,
      default: false,
    },
    plain: {
      // 朴素形态
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: undefined,
    }, // primary,error,waring
    label: String,
    size: String,
    icon: String,
    block: Boolean,
    isBlock: Boolean,
  },

  setup(props) {
    const { colorMap, sizeMap } = buttonConfig;
    // console.log(props.type, colorMap, colorMap[props.type]);

    // 计算组件的大小
    function getSize(size) {
      return `${size ? sizeMap[size] : sizeMap.default}px`;
    }
    // 计算组件的background
    function getBackground(type, color) {
      if (props.dashed) {
        return '#fff';
      }
      if (type) {
        return colorMap[type];
      } if (color) {
        return '#ddd';
      }
      return colorMap.default;
    }
    // 计算组件的字体颜色
    function getFontColor(type) {
      if (props.dashed) {
        return colorMap[props.type];
      }
      if (type) {
        return '#fff';
      }
      return '#333';
    }
    // 计算组件的
    return {
      buttonStyle: {
        '--size': getSize(props.size),

        '--background': getBackground(props.type, props.color),
        '--background-hover': Color(getBackground(props.type, props.color)).lighten(0.1).string(),
        '--background-active': Color(getBackground(props.type, props.color)).darken(0.1).string(),
        '--fontColor': getFontColor(props.type),

        '--borderstyle': props.dashed ? 'dashed' : 'solid',
        '--borderColor': props.type ? colorMap[props.type] : '#dcdfe6',
      },
    };
  },

  render() {
    const {
      buttonStyle, icon, block, isBlock, label, $slot,
    } = this;

    const btnClick = () => {
      this.$attrs.click?.();
    };

    return (
      <button
        class={`u-base-button ${block ? 'block' : ''} ${
          isBlock ? 'isBlock' : ''
        }`}
        style={buttonStyle}
        on-click={btnClick}
      >
        <i class={`iconfont ${icon}`}></i>
        {label || $slot}
      </button>
    );
  },
};
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
