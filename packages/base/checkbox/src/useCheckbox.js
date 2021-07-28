import {
  ref,
  computed,
  getCurrentInstance,
  inject
} from 'vue'
import { defaultTheme } from '@/theme/defaultColor'
// 设置checkbox的 value
const useModel = (props) => {
  const selfModel = ref(false)
  const { emit } = getCurrentInstance()
  const isLimitExceeded = ref(false)
  const { isGroup, checkboxGroup } = useCheckboxGroup()
  const store = computed(() => checkboxGroup ? checkboxGroup.modelValue?.value : props.modelValue)
  const model = computed({
    get () {
      return isGroup.value
        ? store.value
        : props.checked ?? selfModel.value
    },
    set (val) {
      if (isGroup.value && Array.isArray(val)) {
        isLimitExceeded.value = false

        if (checkboxGroup.min !== undefined && val.length < checkboxGroup.min.value) {
          isLimitExceeded.value = true
        }
        if (checkboxGroup.max !== undefined && val.length > checkboxGroup.max.value) {
          isLimitExceeded.value = true
        }

        // eslint-disable-next-line no-unused-expressions
        isLimitExceeded.value === false && checkboxGroup?.changeEvent?.(val)
      } else {
        emit('update:modelValue', val)
        selfModel.value = val
      }
    }
  })

  return {
    isGroup,
    checkboxGroup,
    model,
    isLimitExceeded
  }
}

// 复选框组
export const useCheckboxGroup = () => {
  const checkboxGroup = inject('CheckboxGroup', null)
  const isGroup = computed(() => checkboxGroup && checkboxGroup?.name === 'CheckboxGroup')
  return {
    checkboxGroup,
    isGroup
  }
}

// 复选框的 checked
const useCheckboxStatus = (props, { model }) => {
  const isChecked = computed(() => {
    const value = model.value
    if (Array.isArray(value)) {
      return value.includes(props.value)
    } else {
      return Object.prototype.toString.call(value) === '[object Boolean]' && value
    }
  })

  return {
    isChecked
  }
}

// 复选框的 theme
const useCheckBoxTheme = (props) => {
  const baseColor = inject('baseColor', defaultTheme)
  return {
    baseStyle: {
      '--checkbox-theme': baseColor[props.type]
    }
  }
}

// checkbox的事件

const useEvent = (props) => {
  const { emit } = getCurrentInstance()
  // const { isGroup, checkboxGroup } = useCheckboxGroup()
  function handleChange (e) {
    const { checked, value } = e.target
    console.log(checked, value)
    emit('change', checked, value)
    // emit('update:modelValue', e.target.checked, e.target.value)
  }

  return {
    handleChange
  }
}

export const useCheckbox = (props) => {
  const { baseStyle } = useCheckBoxTheme(props)
  const { model, isLimitExceeded } = useModel(props)
  const { isChecked } = useCheckboxStatus(props, { model })
  const { handleChange } = useEvent(props)

  return {
    baseStyle,
    model,
    isChecked,
    isLimitExceeded,
    handleChange
  }
}
