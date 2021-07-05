<script>
export default {
  name: 'BaseCard',

  props: {
    title: {
      type: [String, undefined],
    },
  },

  render() {
    const { title, $slots } = this;
    return (
            <div class="g-card">
                {title ? <header class="u-card-header">{title}</header> : null}
                <div class="u-card-content">{$slots.default}</div>
            </div>
    );
  },
};
</script>
<style lang="less" scoped>
.g-card {
    padding: 30px;
    background: rgba(0,0,0,.6);
    border-radius: 4px;
    display: inline-flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    width: 100%;
    height: 100%;
    &__showY {
        overflow-y:auto;
    }
    .u-card-header {
        color: #fff;
        border-left: 4px solid #00ffd8;
        font-size: 16px;
        font-family: ShiShangZhongHeiJianTi, ShiShangZhongHeiJianTi-Regular;
        font-weight: 400;
        text-indent: 10px;
    }
    .u-card-content {
        flex: 1;
        position: relative;
    }
}
</style>
