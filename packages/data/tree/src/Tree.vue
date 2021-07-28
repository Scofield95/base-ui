<script>
import { ref, toRefs } from 'vue'
import Icon from '@/base/icon/src/Icon.vue'

function useFlatArray (array) {
  const flat = []
  function flatFun (array) {
    array.forEach(item => {
      flat.push(item)
      if (Array.isArray(item.children) && item.children.length > 0) {
        flatFun(item.children)
      }
    })
  }
  flatFun(array)
  return flat
}
export default {
  components: {
    Icon
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    itemTreeHeight: { // item 高度
      type: Number,
      default: 26
    },

    defaultExpandAll: {
      type: Boolean,
      default: false
    },
    defaultExpandedKeys: {
      type: Array,
      default: () => []
    },

    showCheckbox: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const { data, defaultExpandAll, defaultExpandedKeys } = toRefs(props)

    // 获取根元素
    const root = ref(null)
    // paddingTop
    const paddingTop = ref(0)
    // 容器高度
    // treeItem默认高度26px
    const containerHight = ref(0)

    // 拍平数组
    const flatTree = useFlatArray(data.value)
    // 根据展开条件设置treeNode
    const treeNode = ref([])
    // 真实渲染的item
    const renderNode = ref([])
    // 开始渲染的start
    let index = 0

    // tree高度默认300px,默认展示 Math.ceil(300 / 26) + 8
    const size = Math.ceil(300 / 26) + 10

    // tree展开状态的保存
    const expandedAll = ref(defaultExpandAll.value)
    const expandedKeys = ref([])
    expandedKeys.value = defaultExpandedKeys.value || []

    // 获得真是渲染的treeNode
    const useRenderTreeItem = () => {
      renderNode.value = treeNode.value.filter((item) => item.show).filter((item, i) => i >= index && i <= (index + size))
      containerHight.value = expandedKeys.value.length * 26
    }
    // 更新treeNode的状态
    const useUpdataTreeData = (target, state) => {
      target?.children?.forEach(item => {
        item.show = state
        if (item.expanded) {
          useUpdataTreeData(item, state)
        }
      })
    }
    // 更新expandedKeys
    const useUpdataExpanded = () => {
      expandedKeys.value = treeNode.value.filter(item => item.show).map(item => item.id)
    }

    /**
     * 展开事件
     */
    const handlerExpand = (item) => {
      console.timeEnd(new Date().getTime())
      item.expanded = !item.expanded
      useUpdataTreeData(item, item.expanded)
      useUpdataExpanded()
      useRenderTreeItem()
      console.timeEnd(new Date().getTime())
    }
    /**
     * 滚动事件
     */
    const handlerScroll = () => {
      index = Math.ceil(root.value.scrollTop / 26)
      paddingTop.value = index * 26
      useRenderTreeItem()
    }
    /**
     * tree初始化
     * 1.全部展开，部分展开
     */
    const initTree = () => {
      treeNode.value = flatTree.map(item => {
        if (expandedAll.value) {
          expandedKeys.value.push(item.id)
          item.expanded = expandedAll.value
          item.show = true
        } else {
          if (item.level === 0) {
            item.show = true
          }
          if (expandedKeys.value.includes(item.id)) {
            item.expanded = true
            item.show = true
          }
        }
        return item
      })
      useRenderTreeItem()
    }
    initTree()
    return {
      root,
      paddingTop,
      treeNode,
      renderNode,
      containerHight,

      handlerExpand,
      handlerScroll
    }
  },

  methods: {

  },

  render () {
    const { paddingTop, containerHight, renderNode, handlerExpand, handlerScroll } = this

    return (
      <div ref='root' class="ba-tree" onScroll={handlerScroll}>
        <div style={{ height: `${containerHight}px`, paddingTop: `${paddingTop}px` }}>
          {renderNode.map((item) => {
            return (
              <div class="ba-tree-item" style={{ paddingLeft: `${item.level * 18}px` }}>
                { item.children.length > 0 ? <Icon type={item.expanded ? 'ChevronDown' : 'ChevronRight'} onClick={() => handlerExpand(item)}/> : null}
                {item.name}
              </div>)
          })}
        </div>
      </div>
    )
  }
}
</script>
<style lang="less" scoped>
.ba-tree{
  height: 300px;
  overflow-y: auto;
  .ba-tree-item{
    height: 26px;
  }
}
</style>
