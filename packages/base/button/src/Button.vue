<script>
import Color from 'color';

const sizeMap = {
  mini: 20,
  samll: 24,
  default: 32,
  large: 42,
  largeBig: 50,
};
export default {
  name: 'Button',

  inject: ['BaseColor'],

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

  data() {
    return {
      BaseColor: this.BaseColor,
    };
  },
  setup(props) {
    console.log('props', props);
  },

  render() {
    const {
      $props, $slot, icon, block, isBlock, label, BaseColor,
    } = this;

    // 计算组件的大小
    function getSize(props) {
      return `${props.size ? sizeMap[props.size] : sizeMap.default}px`;
    }
    // 计算组件的background
    function getBackground(props) {
      if (props.dashed) {
        return '#fff';
      }
      if (props.type) {
        return BaseColor[props.type];
      } if (props.color) {
        return '#ddd';
      }
      return BaseColor.default;
    }
    // 计算组件的字体颜色
    function getFontColor(props) {
      if (props.dashed) {
        return BaseColor[props.type];
      }
      if (props.type) {
        return '#fff';
      }
      return '#333';
    }

    const buttonStyle = {
      '--size': getSize($props),

      '--background': getBackground($props),
      '--background-hover': Color(getBackground($props)).lighten(0.1).string(),
      '--background-active': Color(getBackground($props)).darken(0.1).hex(),
      '--fontColor': getFontColor($props),

      '--borderstyle': $props.dashed ? 'dashed' : 'solid',
      '--borderColor': $props.type ? BaseColor[$props.type] : '#dcdfe6',
    };

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
