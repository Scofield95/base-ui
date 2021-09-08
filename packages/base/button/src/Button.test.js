import { shallowMount, mount } from '@vue/test-utils'
import Button from './Button.vue'

describe('Button.vue', () => {
  it('默认按钮', () => {
    const msg = '默认按钮'
    // const wrapper = shallowMount(Button, {
    //   props: { msg }
    // })
    const wrapper = mount(Button, {
      slots: {
        default: msg
      }
    })
    expect(wrapper.text()).toMatch(msg)
  })

  test('2 加 2 等于 4', () => {
    expect(2 + 2).toBe(4)
  })
})
