<template>
  <div class="g-switch-btn">
    <div :class="['u-switch-btn']" :style="{ '--switchWidth': config[size] }">
      <input
        :id="id"
        type="checkbox"
        :checked="$attrs.checked"
        class="switch"
        @change="changeValue"
      />
      <label :for="id"></label>
    </div>
    <span class="s-feng"> {{ title }}</span>
  </div>
</template>

<script>
const config = {
  mini: '0.24rem',
  small: '0.32rem',
  default: '0.44rem',
  large: '0.56rem',
};

const color = {};
export default {
  name: 'switch',

  props: {
    size: {
      type: String, // [default, small, large]
      default: 'default',
    },
    title: String,
  },
  model: {
    prop: 'checked',
    event: 'change',
  },

  data() {
    return {
      config,
      color,
    };
  },

  computed: {
    id() {
      return `checked_${parseInt(1000 * Math.random())}`;
    },
  },
  methods: {
    changeValue(e) {
      this.$emit('change', e.target.checked);
    },
  },
};
</script>

<style lang="less" scoped>
.g-switch-btn{
    display: flex;
    justify-content: center;
    align-items: center;
}
.switch {
  display: none;
}
.u-switch-btn {
  display: inline-block;
  // width: 44px;
  width: var(--switchWidth);
  label {
    position: relative;
    display: block;
    padding: 1px;
    border-radius: calc(var(--switchWidth) / 2);
    cursor: pointer;
    -webkit-user-select: none;
    &::before {
      content: "";
      display: block;
      border-radius: calc(var(--switchWidth) / 2);
      height: calc(var(--switchWidth) / 2 + 2px);
      background-color: #8a97a0;
      transition: all 0.3s ease;
    }
    &::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: calc(-1 * var(--switchWidth) / 4);
      margin-left: calc(-1 * var(--switchWidth) / 4);
      width: calc(var(--switchWidth) / 2);
      height: calc(var(--switchWidth) / 2);
      border-radius: calc(var(--switchWidth) / 2);
      background-color: white;
      box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.08);
      transform: translateX(calc(-1 * var(--switchWidth) / 6));
      transition: all 0.3s ease;
    }
  }
  .switch:checked {
    & ~ label:after {
      transform: translateX(calc(var(--switchWidth) / 6));
    }
    & ~ label:before {
      background-color: #6defde;
    }
  }
}
.s-feng {
  width: 24px;
  height: 17px;
  opacity: 1;
  font-size: 12px;
  font-family: PingFang SC, PingFang SC-Regular;
  font-weight: 400;
  text-align: left;
  color: #ffffff;
  display: inline-flex;
    justify-content: center;
    align-items: center;
  line-height: 1;
}
</style>
