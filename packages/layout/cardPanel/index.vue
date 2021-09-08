<script>
export default {
  name: 'CardPanel',
  props: {
    radius: {
      type: Boolean,
      default: () => false
    },

    title: {
      type: String,
      default: ''
    }
  },
  render () {
    const { title, radius, $slots } = this
    const { header } = $slots
    // console.log('slot', this.$slots);
    return (
      <div class="open-panel">
        <div class={`header-title ${radius ? 'radius' : ''}`}>{header || <span class={radius ? '' : 'border-left'}>{title}</span>}</div>
        <div class="panel-body">{$slots.default}</div>
      </div>
    )
  }
}
</script>
<style lang="less" scoped>
.open-panel {
  width: 100%;
  :deep(.g-card) {
    width: 100%;
  }
  .header-title {
    height: 40px;
    background: linear-gradient(90deg, #0f6eff 2%, rgba(14, 105, 245, 0.93) 49%, rgba(8, 55, 128, 0.15));
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 15px;
    &.radius {
      border-top-left-radius: 20px;
    }
    .border-left {
      position: relative;
      padding-left: 8px;
      &::after {
        content: '';
        width: 2px;
        height: 12px;
        background: #fff;
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
      }
    }
  }
  .panel-body {
    background: rgba(0, 0, 0, 0.6);
    padding: 10px 0;
  }
}
</style>
