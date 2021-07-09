import BaseButton from './index.vue';

export default {
  title: '基础组件/Button 按钮',
  component: BaseButton,
  argTypes: {
    color: { control: 'color' },
    backgroundColor: { control: 'color' },
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

export const Primary = Template.bind({});
Primary.args = {
  type: 'primary',
  label: 'Primary',
};

export const Error = Template.bind({});
Error.args = {
  type: 'error',
  label: 'Error',
};
