import BaseSpace from '@/layout/space/src/Space.vue'
import BaseIcon from './Icon.vue'
import '@/style/reset.less'

export default {
  title: '基础组件/Icon 图标',
  component: BaseIcon,
  argTypes: {
    type: {
      control: { type: 'select', options: ['ChevronDown', 'ChevronRight', 'ChevronLeft', 'ChevronUp', 'EllipsisH', 'EllipsisV', 'LocationArrow'] },
      description: '类型'
    }
  }
}

const Template = (args) => ({
  components: { BaseSpace, BaseIcon },
  setup () {
    return { args }
  },
  template: `
              <base-icon v-bind="args"></base-icon>
              <BaseSpace>
                <base-icon type="ChevronDown"></base-icon>
                <base-icon type="ChevronRight"></base-icon>
                <base-icon type="ChevronLeft"></base-icon>
                <base-icon type="ChevronUp"></base-icon>
                <base-icon type="EllipsisH"></base-icon>
                <base-icon type="EllipsisV"></base-icon>
                <base-icon type="LocationArrow"></base-icon>
            </BaseSpace>`
})

export const Icon = Template.bind({})

Icon.args = {
  type: 'ChevronDown'
}
