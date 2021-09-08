<script>
export default {
  name: 'BaseSpace',

  render () {
    const { $slots } = this
    // console.log('$slots', $slots.default());
    return (
      <div class="u-base-space">
        {$slots.default().map((item, index) => <div style={{ marginLeft: index !== 0 ? '8px' : null }}>{item}</div>)}
      </div>
    )
  }
}
</script>

<style lang="less" scoped>
.u-base-space{
  display: flex;
}
</style>
