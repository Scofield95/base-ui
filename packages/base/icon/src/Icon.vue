<template>
  <Icon
    :color="color"
    :size="size"
  >
    <component :is="type" />
  </Icon>
</template>

<script>
import { ArrowDownOutlined, ArrowLeftOutlined, ArrowRightOutlined, ArrowUpOutlined, ApartmentOutlined, CheckOutlined, CloseOutlined } from "@vicons/antd"

// 你可以直接使用渲染为 SVG 的组件
// 或者把它包裹在 @vicons/utils 提供的 Icon 组件中

import { Icon } from "@vicons/utils"
export default {
  components: {
    Icon,
    ArrowDownOutlined,
    ArrowLeftOutlined,
    ArrowRightOutlined,
    ArrowUpOutlined,
    ApartmentOutlined,
    CheckOutlined,
    CloseOutlined
  },
  props: {
    type: {
      type: String,
      default: () => 'ArrowDownOutlined'
    },
    color: {
      type: String,
      default: '#333'
    },
    size: {
      type: String,
      default: '16px'
    }
  }
}
</script>

<style>
</style>
