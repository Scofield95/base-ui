import BaseSpace from '@/layout/space/src/Space.vue'
import BaseConfigTheme from '@/config/configTheme/src/ConfigTheme.vue'
import BaseButton from '@/base/button/src/Button.vue'
import '@/style/reset.less'

export default {
  title: '布局组件/ Space 间距',
  component: BaseSpace,
  argTypes: {
    align: {
      control: { type: 'select', options: ['start', 'end', 'center', 'baseline'] },
      description: '对齐方式',
      table: {
        type: {
          summary: '详情',
          detail: 'flex布局'
        }
      }
    },
    direction: {
      control: { type: 'select', options: ['vertical', 'horizontal'] },
      description: '间距方向'
    },
    size: {
      control: { type: 'select', options: ['small', 'middle', 'large', 'number'] },
      description: '间距大小'
    }
  }
}

const TemplateGroup = (args) => ({
  components: { BaseConfigTheme, BaseButton, BaseSpace },
  setup () {
    return { args }
  },
  template: `<BaseConfigTheme>
                <BaseSpace>
                  <base-button type="primary">按钮1</base-button>
                  <base-button type="success">按钮2</base-button>
                  <base-button type="info">按钮3</base-button>
                </BaseSpace>
            </BaseConfigTheme>`
})
export const SpaceGroup = TemplateGroup.bind({})

SpaceGroup.args = {
  // type: 'primary'
}
