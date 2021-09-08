import BaseTree from './Tree.vue'
import 'src/style/reset.less'

export default {
  title: '数据展示组件/ 高性能树',
  component: BaseTree,
  argTypes: {
    data: {
      description: '传递给高性能树的数据'
    },
    defaultExpandAll: {
      description: '是否默认展开所有节点'
    },
    defaultExpandedKeys: {
      description: '默认展开的节点的 key 的数组'
    }
  }
}

const Template = (args) => ({
  components: { BaseTree },
  setup () {
    return { args }
  },
  template: `<BaseTree v-bind="args"></BaseTree>`
})

export const Tree = Template.bind({})

function getParentPath (parent) {
  let result = []
  if (parent) {
    const base = parent.parentPath || []
    result = base.concat(parent.id)
  }
  return result
}
function mockTree (path = '0', level = 3, parent = null) {
  const list = []
  for (let i = 0; i < 10; i++) {
    const id = `${path}-${i}`
    const treeNode = {
      id,
      name: id,
      children: [],
      parentPath: getParentPath(parent),
      level: getParentPath(parent).length
    }

    if (level > 0) {
      treeNode.children = mockTree(id, level - 1, treeNode)
    }

    list.push(treeNode)
  }
  return list
}

Tree.args = {
  data: mockTree(),
  defaultExpandedKeys: [],
  defaultExpandAll: false,
  showCheckbox: true
}
