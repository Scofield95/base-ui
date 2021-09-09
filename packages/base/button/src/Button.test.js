import { mount } from '@vue/test-utils'
import Button from './Button.tsx'

describe('Button.vue', () => {
  it('默认按钮', () => {
    const msg = '默认按钮'
    const wrapper = mount(Button, {
      slots: {
        default: msg
      }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
