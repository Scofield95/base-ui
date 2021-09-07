import BaseSpace from '@/layout/space/src/Space.vue'
import BaseSwitch from './Switch.vue'
import '@/style/reset.less'

export default {
  title: '表单组件/ switch开关',
  component: BaseSwitch,
  argTypes: {}
}

const Template = (args) => ({
  components: { BaseSpace, BaseSwitch },
  data () {
    return {
      checked: false,
      checked1: true,
      checked2: false,
      activeText: '文字描述',
      inactiveText: '文字描述',
      activeColor: '#13ce66',
      inactiveColor: '#ff4949'
    }
  },
  setup () {
    return { args }
  },
  watch: {
    checked (val) {
      console.log(val)
    }
  },
  template: `<BaseSpace>
              <BaseSwitch :width="args.width" v-model="checked" />
              <BaseSwitch width="60" v-model="checked1" />
              <BaseSwitch width="80" v-model="checked2" :activeText="activeText" :inactiveText="inactiveText" :activeColor="activeColor" :inactiveColor="inactiveColor"/>
            </BaseSpace>`
})

export const Switch = Template.bind({})

Switch.args = {
  width: 40
}
