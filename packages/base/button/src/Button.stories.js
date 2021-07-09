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
    },
    color: { control: 'color' },
    dashed: { },
    size: { control: { type: 'select', options: ['mini', 'small', 'default', 'large', 'largeBig'] } },
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
  components: { BaseButton },
  setup() {
    return { args };
  },
  template: "<base-button type='error' label='按钮组' /><base-button type='warning' label='按钮组2'></base-button>",
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
