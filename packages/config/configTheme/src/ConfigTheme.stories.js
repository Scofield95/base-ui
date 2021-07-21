import BaseConfigTheme from '@/config/configTheme/src/ConfigTheme.vue'
import BaseButton from '@/base/button/src/Button.vue'

export default {
  title: '配置组件/Theme 配置',
  component: BaseConfigTheme,
  argTypes: {
    BaseColor: {
    //   values: [
    //     { name: 'red', value: '#f00' },
    //     { name: 'green', value: '#0f0' }
    //   ]
    }
  }
}

const Template = (args) => ({
  components: { BaseButton, BaseConfigTheme },
  setup () {
    return { args }
  },
  template: '<BaseConfigTheme v-bind="args"><base-button type="success">按钮</base-button></BaseConfigTheme>'
})

export const Theme = Template.bind({})

Theme.args = {
  BaseColor: {
    primary: '#409eff',
    success: '#67c23a',
    info: '#909399',
    warning: '#e6a23c',
    danger: '#f56c6c'
  }
}
