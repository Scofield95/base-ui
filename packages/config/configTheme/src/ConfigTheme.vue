<template>
  <slot></slot>
</template>

<script>
export default {
  name: 'configTheme',

  props: {
    BaseColor: {
      type: Object,
      default: () => ({
        primary: '#409eff',
        success: '#67c23a',
        info: '#909399',
        warning: '#e6a23c',
        danger: '#f56c6c',
      }),
      // validator(value) {
      //   // 这个值必须匹配下列字符串中的一个
      //   let status;
      //   ['primary', 'success', 'info', 'warning', 'danger'].forEach((item) => {
      //     if (value[item]) {
      //       status = true;
      //     } else {
      //       status = false;
      //     }
      //   });
      //   return status;
      // },
    },
  },
  provide() {
    return {
      BaseColor: this.BaseColor,
    };
  },
};
</script>

<style>

</style>
