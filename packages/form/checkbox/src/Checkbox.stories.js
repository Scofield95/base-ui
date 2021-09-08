import BaseConfigTheme from '@/config/configTheme/src/ConfigTheme.vue'
import BaseCheckbox from './Checkbox.vue'
import BaseCheckboxGroup from './CheckboxGroup.vue'

import 'src/style/reset.less'

export default {
  title: '表单组件/复选框',
  component: BaseCheckbox,
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
  components: { BaseCheckbox, BaseConfigTheme },
  data () {
    return {
      checked: true
    }
  },
  setup () {
    return { args }
  },
  methods: {
    change (val) {
      console.log(val)
    }
  },
  template: `<BaseConfigTheme>
                <BaseCheckbox v-bind="args"  v-model="checked">复选框</BaseCheckbox>
                <br />
                <BaseCheckbox @change="change">复选框nomode</BaseCheckbox>
            </BaseConfigTheme>`
})

export const CheckBox = Template.bind({})

CheckBox.args = {
  type: 'primary',
  checked: false,
  label: '',
  indeterminate: false
}

const TemplateGroup = (args) => ({
  components: { BaseCheckbox, BaseCheckboxGroup, BaseConfigTheme },
  data () {
    return {
      checkAll: false,
      checkedCities: ['上海', '北京'],
      checkedCities2: [],
      cities: ['上海', '北京', '广州', '深圳'],
      isIndeterminate: true
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
  methods: {
    handleCheckAllChange (val) {
      this.checkedCities = val ? this.cities : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange (value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
    }
  },
  template: `<BaseConfigTheme>
                <BaseCheckbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</BaseCheckbox>
                <BaseCheckboxGroup v-model="checkedCities" @change="handleCheckedCitiesChange">
                  <BaseCheckbox v-for="item in cities" :key="item" :value="item">{{item}}</BaseCheckbox>
                </BaseCheckboxGroup>
                <BaseCheckboxGroup v-model="checkedCities2">
                  <BaseCheckbox v-for="item in cities" :key="item" :value="item">{{item}}</BaseCheckbox>
                </BaseCheckboxGroup>
              </BaseConfigTheme>`
})

export const CheckboxGroup = TemplateGroup.bind({})

CheckboxGroup.title = '基础组件/复选框组'
CheckboxGroup.args = {
  type: 'primary'
}
