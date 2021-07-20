import BaseSpace from '@/layout/space/src/Space.vue';
import BaseButton from './Button.vue';

export default {
  title: '基础组件/Button 按钮',
  component: BaseButton,
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: [undefined, 'primary', 'success', 'warning', 'error'],
      },
      description: '组件的类型，优先级高于color',
      // table: {
      //   type: {
      //     summary: 'string',
      //     detail: '测试干啥用的',
      //   },
      // },
    },
    color: {
      control: 'color',
      description: '组件的自定义颜色',
    },
    dashed: {
      description: '虚线按钮，背景色为空',
    },
    size: {
      control: { type: 'select', options: ['mini', 'small', 'default', 'large', 'largeBig'] },
      description: '按钮的大小',
    },
    onClick: {
      // table: {
      //   category: 'Events',
      //   subcategory: 'Button Events',
      // },
    },
  },
};

const Template = (args) => ({
  components: { BaseButton },
  setup() {
    return { args };
  },
  template: '<base-button v-bind="args"></base-button>',
});

const TemplateGroup = (args) => ({
  components: { BaseButton, BaseSpace },
  setup() {
    return { args };
  },
  template: "<BaseSpace><base-button type='error' label='按钮组' /><base-button type='warning' label='按钮组2'></base-button></BaseSpace>",
});

export const Button = Template.bind({});
export const ButtonGroup = TemplateGroup.bind({});
Button.args = {
  type: 'primary',
  label: '按钮',
};

// ButtonGroup.args = {
//   type: 'primary',
//   label: '按钮',
// };
