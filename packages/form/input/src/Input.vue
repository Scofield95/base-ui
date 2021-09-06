<template>
  <div class="base-input">
    <input
      type="text"
      class="base-input__inner"
    >
  </div>
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {

  }
})
</script>
<style lang="less" scoped>
.base-input{
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 100%;
  .base-input__inner{
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: none;
    padding: 0 15px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
  }
}
</style>
