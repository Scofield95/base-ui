import BaseInput from './Input.vue'
import 'src/style/reset.less'

export default {
  title: '表单组件/输入框',
  component: BaseInput,
  argTypes: {}
}

const Template = (args) => ({
  components: { BaseInput },
  setup () {
    return { args }
  },
  methods: {
    change (val) {
      console.log(val)
    }
  },
  template: `<BaseInput></BaseInput>`
})

export const Input = Template.bind({})
Input.args = {

}
