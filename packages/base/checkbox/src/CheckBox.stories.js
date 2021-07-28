import BaseConfigTheme from '@/config/configTheme/src/ConfigTheme.vue'
import BaseCheckBox from './CheckBox.vue'

import '@/style/reset.less'

export default {
  title: '基础组件/复选框',
  component: BaseCheckBox,
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['default', 'primary', 'success', 'info', 'warning', 'danger']
      }
    }
  }
}

const Template = (args) => ({
  components: { BaseCheckBox, BaseConfigTheme },
  data () {
    return {
      checked: false
    }
  },
  setup () {
    return { args }
  },
  template: `<BaseConfigTheme>
                <BaseCheckBox v-bind="args" v-model="checked">复选框</BaseCheckBox>
            </BaseConfigTheme>`
})

export const CheckBox = Template.bind({})

CheckBox.args = {
  type: 'primary'
}

const TemplateGroup = (args) => ({
  components: { BaseCheckBox, BaseConfigTheme },
  data () {
    return {
      checked: false
    }
  },
  setup () {
    return {
      type: {
        control: {
          type: 'select',
          options: ['default', 'primary', 'success', 'info', 'warning', 'danger']
        }
      }
    }
  },
  template: `<BaseConfigTheme>
                <BaseCheckBoxGroup>
                  <BaseCheckBox v-bind="args">复选框组</BaseCheckBox>
                </BaseCheckBoxGroup>
              </BaseConfigTheme>`
})

export const CheckBoxGroup = TemplateGroup.bind({})

CheckBoxGroup.args = {
  type: 'primary'
}
