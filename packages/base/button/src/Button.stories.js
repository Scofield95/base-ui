import BaseSpace from '@/layout/space/src/Space.vue'
import BaseConfigTheme from '@/config/configTheme/src/ConfigTheme.vue'
import BaseButton from './Button.vue'

export default {
  title: '基础组件/Button 按钮',
  component: BaseButton,
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['default', 'primary', 'success', 'info', 'warning', 'danger']
      },
      description: '按钮的 type 分别为 default, primary, success, info, warning, danger。优先级高于color',
      table: {
        type: {
          summary: '详情',
          detail: '按钮的 type 分别为 default, primary, success, info, warning, danger。'
        }
      }
    },
    color: {
      control: 'color',
      description: '组件的自定义颜色'
    },
    dashed: {
      description: '虚线按钮，背景色为空'
    },
    size: {
      control: { type: 'select', options: ['mini', 'small', 'default', 'large', 'largeBig'] },
      description: '按钮的大小'
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
  template: '<BaseConfigTheme><base-button v-bind="args">按钮</base-button></BaseConfigTheme>'
})

const TemplateGroup = (args) => ({
  components: { BaseConfigTheme, BaseButton, BaseSpace },
  setup () {
    return { args }
  },
  template: '<BaseConfigTheme><BaseSpace><base-button type="error">按钮组</base-button><base-button v-bind="args">按钮组</base-button></BaseSpace></BaseConfigTheme>'
})

export const Button = Template.bind({})
export const ButtonGroup = TemplateGroup.bind({})
Button.args = {
  type: 'primary'
}

ButtonGroup.args = {
  type: 'primary'
}
