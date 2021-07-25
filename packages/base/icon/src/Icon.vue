<template>
  <Icon>
    <component :is="type"></component>
  </Icon>
</template>

<script>
import { ChevronDown, ChevronRight, ChevronLeft, ChevronUp, EllipsisH, EllipsisV, LocationArrow } from "@vicons/fa"

// 你可以直接使用渲染为 SVG 的组件
// 或者把它包裹在 @vicons/utils 提供的 Icon 组件中

import { Icon } from "@vicons/utils"
export default {
  props: {
    type: String
    // default: () => 'ChevronDown'
  },
  components: {
    Icon,
    ChevronDown,
    ChevronRight,
    ChevronLeft,
    ChevronUp,
    EllipsisH,
    EllipsisV,
    LocationArrow
  }
}
</script>

<style>
</style>
