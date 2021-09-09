import BaseButton from '@/base/button/src/Button.tsx'
import 'src/style/reset.less'

export default {
  title: '基础组件/Button 按钮',
  parameters: {
    docs: {
      description: {
        component: '按钮的props'
      }
    }
  },
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
        category: '类型',
        type: {
          summary: '详情',
          detail: `
                  default
                  primary
                  success 
                  info
                  warning
                  danger`
        }
        // subcategory: 'Button'
      }
    },
    color: {
      control: 'color',
      description: '自定义颜色'
    },
    dashed: {
      description: '虚线按钮，背景色为空'
    },
    // 形状
    block: {
      description: '块级button'
    },
    circle: {
      description: '圆形button'
    },
    round: {
      description: '圆角button'
    }
  }
}

const Template = (args) => ({
  components: { BaseButton },
  setup () {
    return { args }
  },
  template: `<BaseButton v-bind="args">按钮</BaseButton>
           `
})

export const 基础按钮 = Template.bind({})

基础按钮.args = {
  type: 'primary',
  dashed: false,
  block: false,
  circle: false,
  round: false
}

const dashedButton = (args) => ({
  components: { BaseButton },
  setup () {
    return { args }
  },
  template: ` <BaseButton v-bind="args">虚线按钮</BaseButton>`
})
export const 虚线按钮 = dashedButton.bind({})
虚线按钮.args = {
  dashed: true
}

const Template1 = (args) => ({
  components: { BaseButton },
  setup () {
    return { args }
  },
  template: ` <BaseButton v-bind="args">尺寸</BaseButton>`
})
export const 尺寸 = Template1.bind({})
尺寸.args = {
  size: 'small',
  label: 'Button'
}
