import BaseConfigTheme from '@/config/configTheme/src/ConfigTheme.vue'
import BaseButton from './Button.vue'
import '@/style/reset.less'

export default {
  title: '基础组件/Button 按钮',
  component: BaseButton,
  argTypes: {
    size: {
      control: { type: 'select', options: ['mini', 'small', 'default', 'large', 'largeBig'] },
      description: '尺寸'
    },
    type: {
      control: {
        type: 'select',
        options: ['default', 'primary', 'success', 'info', 'warning', 'danger']
      },
      description: '类型。优先级高于color',
      table: {
        type: {
          summary: '详情',
          detail: '按钮的 type 分别为 default, primary, success, info, warning, danger。'
        }
      }
    },
    color: {
      control: 'color',
      description: '自定义颜色'
    },
    dashed: {
      description: '虚线按钮，背景色为空'
    }
    // onClick: {
    //   table: {
    //     category: 'Events',
    //     subcategory: 'Button Events',
    //   }
    // }
  }
}

const Template = (args) => ({
  components: { BaseButton, BaseConfigTheme },
  setup () {
    return { args }
  },
  template: `<BaseConfigTheme>
                <base-button v-bind="args">按钮</base-button>
            </BaseConfigTheme>`
})

export const Button = Template.bind({})

Button.args = {
  type: 'primary'
}
