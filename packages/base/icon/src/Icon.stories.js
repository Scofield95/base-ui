import BaseSpace from '@/layout/space/src/Space.vue'
import BaseIcon from './Icon.vue'
import 'src/style/reset.less'

export default {
  title: '基础组件/Icon 图标',
  component: BaseIcon,
  argTypes: {
    type: {
      control: { type: 'select', options: ['ArrowDownOutlined', 'ArrowLeftOutlined', 'ArrowRightOutlined', 'ArrowUpOutlined', 'ApartmentOutlined', 'CheckOutlined', 'CloseOutlined'] },
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
                <base-icon type="ArrowDownOutlined"></base-icon>
                <base-icon type="ArrowLeftOutlined"></base-icon>
                <base-icon type="ArrowRightOutlined"></base-icon>
                <base-icon type="ArrowUpOutlined"></base-icon>
                <base-icon type="ApartmentOutlined"></base-icon>
                <base-icon type="CheckOutlined"></base-icon>
                <base-icon type="CloseOutlined"></base-icon>
            </BaseSpace>`
})

export const Icon = Template.bind({})

Icon.args = {
  type: 'ArrowDownOutlined'
}
