<script>
import btnConfig from './btnConfig.js';

export default {
  name: 'BaseButton',

  props: {
    type: String, // primary,error,waring
    color: String, // primary,error,waring
    backgroundColor: String,
    label: String,
    size: String,
    icon: String,
    block: Boolean,
    isBlock: Boolean,
  },

  render() {
    const {
      type, size, icon, block, isBlock, color, label,
    } = this;

    const { colorMap, sizeMap } = btnConfig;

    const getStyle = () => ({
      '--background': type ? colorMap[type] : colorMap.default,
      '--size': `${size ? sizeMap[size] : sizeMap.default}px`,
      '--fontcolor': color
        ? colorMap[color]
        : type === 'white'
          ? '#333'
          : '#fff',
    });

    const btnClick = () => {
      // this.$attrs.click?.();
    };

    return (
      <button
        class={`u-base-button ${block ? 'block' : ''} ${
          isBlock ? 'isBlock' : ''
        }`}
        style={getStyle()}
        on-click={btnClick}
      >
        <i class={`iconfont ${icon}`}></i>
        {label}
      </button>
    );
  },
};
</script>
<style lang="less" scoped>
.u-base-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  background: var(--background);
  cursor: pointer;
  color: var(--fontcolor);
  border-radius: 6px;
  height: var(--size);
  border: none;
  outline: none;
  &.block {
    width: var(--size);
    padding: 0;
  }
  &.isBlock {
    width: 100% !important;
  }
  & + .u-base-button {
    margin-left: 10px;
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
