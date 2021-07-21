<script>
export default {
  name: 'collapse-item',

  props: {
    headerOpt: {
      type: Array,
      default () {
        return []
      }
    },
    contentOpt: {
      type: Object
    },

    select: Boolean,
    layer: Boolean,

    name: String,
    more: String
  },

  computed: {
    currentExpendIndex () {
      return this.$attrs.currentExpendIndex
    }
  },

  watch: {
    currentExpendIndex (val) {
      this.currentItem = val === this.currentItem ? this.currentItem : '-1'
    }
  },
  data () {
    return {
      currentItem: ''
    }
  },

  methods: {
    openCollapse (name) {
      console.log(name)
      if (this.currentItem === name) {
        this.currentItem = undefined
      } else {
        this.currentItem = name
      }
      this.$emit('openCollapse', this.currentItem)
    },

    layerSwitch (name) {
      console.log(name)
    }
  },

  render () {
    const {
      $slots,
      headerOpt,
      select,
      layer,
      openCollapse,
      name,
      currentItem,
      layerSwitch,
      more
    } = this
    const getStyle = (item) => (item.index
      ? {
        display: 'inline-block',
        width: '0.20rem',
        height: '0.20rem',
        marginLeft: '0.08rem'
      }
      : {
        width: '2.20rem',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      })
    const getHeaderDom = () => headerOpt.map((item) => {
      if (item.index) {
        return <img style={getStyle(item)} src={`${item.urls}`} />
      }
      return <span style={getStyle(item)}>{item.title || item}</span>
    })

    const getContentHeight = () => ({
      display: name === currentItem ? 'block' : 'none'
    })
    return (
      <div class="u-collapse-item">
        <div class="u-collapse-header">
          {select ? (
            <a-icon
              type={name === currentItem ? 'caret-down' : 'caret-right'}
              on-click={() => openCollapse(name)}
            />
          ) : null}
          <div class="u-collapse-header-list">{getHeaderDom()}</div>
          {layer ? (
            <a-icon type="eye" on-click={() => layerSwitch(name)} />
          ) : more ? (
            <span class="u-collapse-header-more" on-click={() => layerSwitch(name)}>
              {more}
            </span>
          ) : null}
        </div>
        <div class="u-collapse-content" style={getContentHeight()}>
          {$slots.default}
        </div>
      </div>
    )
  }
}
</script>

<style lang="less" scoped>
.u-collapse-item {
    & + .u-collapse-item {
        margin-top: 5px;
    }
    .u-collapse-header {
        width: 100%;
        height: 40px;
        background: linear-gradient(90deg, #0f6eff 2%, rgba(14, 105, 245, 0.93) 49%, rgba(8, 55, 128, 0.15));
        // background: linear-gradient(90deg, #0f6eff 2%, rgba(14, 105, 245, 0.93) 49%, rgba(8, 55, 128, 0.15));
        padding: 0 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #fff;
        .u-collapse-header-list {
            flex: 1;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .u-collapse-header-more {
            height: 20px;
            font-size: 14px;
            font-weight: 400;
            text-align: right;
            color: #6defde;
        }
    }
    .u-collapse-content {
        color: #fff;
        max-height: 400px;
        overflow-y: auto;
    }
}
</style>
