<script>
import { ref, toRefs } from 'vue'
import Icon from '@/base/icon/src/Icon.vue'
import BaseCheckBox from '@/base/checkbox/src/CheckBox.vue'

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
  name: 'BaseTree',
  components: {
    Icon,
    BaseCheckBox
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
    defaultCheckedKeys: {
      type: Array,
      default: () => []
    },

    showCheckbox: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const { data, defaultExpandAll, defaultExpandedKeys, defaultCheckedKeys } = toRefs(props)

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
    // tree 选中状态数据保存
    const checkedKeys = new Set(defaultCheckedKeys.value)
    const checkedParents = new Set()

    // 获得真是渲染的treeNode
    const useRenderTreeItem = () => {
      renderNode.value = treeNode.value.filter((item) => item.show).filter((item, i) => i >= index && i <= (index + size))
      containerHight.value = expandedKeys.value.length * 26
    }
    // 更新treeNode的展开收缩状态
    const useUpdataTreeData = (target, state) => {
      target?.children?.forEach(item => {
        item.show = state
        if (item.expanded) {
          useUpdataTreeData(item, state)
        }
      })
    }
    // 获得当前节点的父节点
    const useParentTreeData = (parentId) => {
      let parentNode = null
      if (parentId) {
        for (let i = 0; i < treeNode.value.length; i++) {
          const item = treeNode.value[i]
          if (item.id === parentId) {
            parentNode = item
            break
          }
        }
      }
      return {
        parentNode
      }
    }
    // 更新expandedKeys
    const useUpdataExpanded = () => {
      expandedKeys.value = treeNode.value.filter(item => item.show).map(item => item.id)
    }

    /**
     * 展开事件
     */
    const handlerExpand = (item) => {
      console.time('展开事件', new Date().getTime())
      item.expanded = !item.expanded
      useUpdataTreeData(item, item.expanded)
      useUpdataExpanded()
      useRenderTreeItem()
      console.timeEnd('展开事件', new Date().getTime())
    }
    /**
     * 滚动事件
     */
    const handlerScroll = () => {
      index = Math.ceil(root.value.scrollTop / 26)
      paddingTop.value = index * 26
      useRenderTreeItem()
    }
    // 更新treeNode children的checked状态
    const useChildrenCheckedKeys = (target, checked) => {
      checkedParents.delete(target.id)
      target?.children?.forEach(item => {
        if (checked) {
          checkedKeys.add(item.id)
        } else {
          checkedKeys.delete(item.id)
        }
        if (item.children) {
          useChildrenCheckedKeys(item, checked)
        }
      })
    }
    // 更新treeNode parent的checked状态
    const useParentCheckedKeys = (target, checked) => {
      const { parentNode } = useParentTreeData(target.parentPath[target.parentPath.length - 1])
      if (parentNode) {
        const childrenChecks = parentNode.children.filter(item => checkedKeys.has(item.id))
        if (childrenChecks.length) {
          if (childrenChecks.length === parentNode.children.length) {
            checkedKeys.add(parentNode.id)
          } else {
            checkedKeys.delete(parentNode.id)
            checkedParents.add(parentNode.id)
          }
        } else {
          const inChecks = parentNode.children.filter(item => checkedParents.has(item.id))
          if (checked || inChecks.length) {
            checkedParents.add(parentNode.id)
          } else {
            checkedParents.delete(parentNode.id)
          }
        }
        useParentCheckedKeys(parentNode, checked)
      }
    }
    /**
     * 复选框事件
     * 1.保存对应的id
     * 2.保存parentsPath
     */
    const handlerCheckBox = (checked, target) => {
      console.time('复选框事件', new Date().getTime())
      if (checked) {
        checkedKeys.add(target.id)
        target.parentPath.forEach(item => checkedParents.add(item))
      } else {
        checkedKeys.delete(target.id)
      }
      useParentCheckedKeys(target, checked)
      useChildrenCheckedKeys(target, checked)
      // console.log('checkedKeys', checkedKeys)
      // console.log('checkedParents', checkedParents)
      // 刷新
      useRenderTreeItem()
      console.timeEnd('复选框事件', new Date().getTime())
    }
    // 复选框的状态
    const useCheckState = (target) => {
      const { id } = target

      return {
        indeterminate: checkedParents.has(id), checked: checkedKeys.has(id)
      }
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
      useCheckState,

      handlerExpand,
      handlerScroll,
      handlerCheckBox
    }
  },

  methods: {

  },

  render () {
    const { paddingTop, containerHight, renderNode, showCheckbox, useCheckState, handlerExpand, handlerScroll, handlerCheckBox } = this
    function decorateTreeCheckbox (showCheckbox, item) {
      const { indeterminate, checked } = useCheckState(item)
      return showCheckbox ? <BaseCheckBox indeterminate={indeterminate} checked={checked} onChange={(checked) => handlerCheckBox(checked, item)} /> : null
    }
    function decorateTreeItem (item) {
      return (
        <div class="ba-tree-item" style={{ paddingLeft: `${item.level * 18}px` }}>
          { item.children.length > 0 ? <Icon type={item.expanded ? 'CaretDownFilled' : 'CaretRightFilled'} onClick={() => handlerExpand(item)}/> : <i class="ba-icon-placeholder"></i>}
          {decorateTreeCheckbox(showCheckbox, item)}
          <span class="ba-tree-label">{item.name}</span>
        </div>)
    }
    return (
      <div ref='root' class="ba-tree" onScroll={handlerScroll}>
        <div style={{ height: `${containerHight}px`, paddingTop: `${paddingTop}px` }}>
          {renderNode.map((item) => {
            return decorateTreeItem(item)
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
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .ba-icon-placeholder{
    font-size: 16px;
    width: 16px;
  }
  .ba-tree-label{
    padding-left: 8px;
  }
}
</style>
