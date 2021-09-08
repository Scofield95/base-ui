import BaseList from './List.vue'
import 'src/style/reset.less'

export default {
  title: '数据展示组件/ 虚拟列表',
  component: BaseList,
  argTypes: {
    data: []
  }
}

const Template = (args) => ({
  components: { BaseList },
  setup () {
    return { args }
  },
  template: `<BaseList>
            <template v-slot="{item}">
             slot
              <span class="green">{{ item }}</span>
          </template>
  </BaseList>`
})

export const List = Template.bind({})

const list = []; let i = 0

while (i < 500) {
  list[i] = `第${i}行`
  i++
}

List.args = {
  data: list
}
