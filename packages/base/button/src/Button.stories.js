import BaseSpace from '@/layout/space/src/Space.vue'
import BaseButton from '@/base/button/src/Button.tsx'
import BaseIcon from '@/base/icon/src/Icon.vue'
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
    },
    disable: {
      description: '是否禁用'
    }
  }
}

const Template = (args) => ({
  components: { BaseSpace, BaseButton },
  setup () {
    return { args }
  },
  template: `<BaseButton v-bind="args">按钮</BaseButton>
           `
})

export const 基础按钮 = Template.bind({})

/**
 * 虚线按钮
 */
const dashedButton = () => ({
  components: { BaseSpace, BaseButton },
  template: `<BaseSpace>
    <BaseButton dashed type="primary">虚线按钮</BaseButton>
    <BaseButton dashed type="success">虚线按钮</BaseButton>
    <BaseButton dashed type="info">虚线按钮</BaseButton>
    <BaseButton dashed type="warning">虚线按钮</BaseButton>
    <BaseButton dashed type="danger">虚线按钮</BaseButton>
  </BaseSpace>`
})
export const 虚线按钮 = dashedButton.bind({})

/**
 * 尺寸按钮
 */
const SizeButton = (args) => ({
  components: { BaseButton, BaseSpace },
  setup () {
    return { args }
  },
  template: `<BaseSpace>
      <BaseButton size="mini" type="primary">尺寸按钮</BaseButton>
      <BaseButton size="small" type="success">尺寸按钮</BaseButton>
      <BaseButton type="info">尺寸按钮</BaseButton>
      <BaseButton size="large" type="warning">尺寸按钮</BaseButton>
    </BaseSpace>`
})
export const 尺寸按钮 = SizeButton.bind({})

/**
 * 禁用按钮
 */
const DisableButton = (args) => ({
  components: { BaseButton },
  setup () {
    return { args }
  },
  template: `
      <BaseButton disabled>禁用按钮</BaseButton>
    `
})
export const 禁用按钮 = DisableButton.bind({})

/**
 * 图标按钮
 */
const IconButton = (args) => ({
  components: { BaseButton, BaseIcon },
  setup () {
    return { args }
  },
  template: `
      <BaseButton>
        <template #icon>
          <base-icon type="ArrowUpOutlined" color="#fff"></base-icon>
        </template>
        图标</BaseButton>
    `
})
export const icon按钮 = IconButton.bind({})
