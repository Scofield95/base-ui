<script>
import { ref, toRefs, onMounted, defineComponent } from 'vue'

export default defineComponent({

  props: {
    data: {
      type: Array,
      default: () => []
    },

    itemHeight: { // item 高度
      type: Number,
      default: 34
    },

    size: {
      type: Number,
      default: 15
    },

    virtualBuffer: {
      type: Number,
      default: 15
    }

    // virtualList: {}

  },
  setup (props) {
    const { data, size, itemHeight } = toRefs(props)
    console.log(data.value, size.value, itemHeight.value)
    // 获取根元素
    const root = ref(null)

    // paddingTop
    const paddingTop = ref(0)
    // 容器高度
    const containerHight = ref(data.value.length * itemHeight.value)

    // 设置真实渲染的list
    const virtualList = ref([])

    // 滚动事件
    const handlerScroll = () => {
      // const range = [0, size.value]
      const renderItemSize = Math.floor(root.value.scrollTop / itemHeight.value)
      paddingTop.value = renderItemSize * itemHeight.value
      virtualList.value = data.value.slice(0 + renderItemSize, size.value + renderItemSize)
      // console.log(Math.floor(root.value.scrollTop / itemHeight.value))
    }
    onMounted(() => {
      virtualList.value = data.value.slice(0, size.value)
      // containerHight = root.value.clientHeight
    })

    return {
      virtualList,
      containerHight,
      paddingTop,
      root,
      handlerScroll
    }
  },

  render () {
    const { virtualList, handlerScroll, containerHight, itemHeight, paddingTop, $slots } = this
    // console.log('$slots', data, containerHight)
    return (<div ref="root" class="ba-virtual-list" style={{ height: '300px' }} onScroll={handlerScroll}>
      <ul class="ba-virtual-box" style={{ height: `${containerHight}px`, paddingTop: `${paddingTop}px` }}>
        {virtualList.map(item => <li class='ba-virtual-item' style={{ height: `${itemHeight}px` }}>{
          $slots.default ? $slots.default({
            item: item
          }) : item
        }</li>)}
      </ul>
    </div>)
  }
})
</script>

<style lang="less" scoped>
.ba-virtual-list{
  overflow: auto;
}
</style>
