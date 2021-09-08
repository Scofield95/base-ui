<script>
import { defineComponent } from 'vue'
import { useRowsAndCols } from './useTable.js'

export default defineComponent({
  name: 'BaseTable',
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    dataSource: {
      type: Array,
      default: () => []
    }
  },
  setup (props) {
    const { rows, cols } = useRowsAndCols(props.columns)
    return {
      rows, cols
    }
  },
  render () {
    const { rows, cols, dataSource, $slots } = this
    // console.log($slots.default)
    // $slots[scopedSlots.customRender]()
    // 获得row  col
    // 装饰列
    const decorateCol = () => {
      return cols.map(item => <col></col>)
    }
    // 装饰头部-thead
    const decorateThead = () => {
      return rows.map(row => (
        <tr>
          {row.map(col => {
            const { column, rowSpan, colSpan } = col
            if (column.title) {
              return <th colSpan={colSpan} rowSpan={rowSpan} >{column.title}</th>
            } else {
              return <th colSpan={colSpan} rowSpan={rowSpan} >{column.scopedSlots.customRender}</th>
            }
          })}
        </tr>
      ))
    }
    // 装饰body-tbody
    const decorateTbody = () => {
      return dataSource.map(row => {
        return (
          <tr>{
            cols.map(col => {
              if (col.key) {
                return <td>{row[col.key]}</td>
              } else {
                const { customRender } = col.scopedSlots
                return <td>{$slots[customRender]({
                  record: row
                })}</td>
              }
            })
          }</tr>
        )
      })
    }
    return (
      <div class="base-table_wrap">
        <table class="base-table_body">
          <colgroup>
            {decorateCol()}
          </colgroup>
          <thead class="base-table_thead">
            {decorateThead()}
          </thead>
          <tbody class="base-table_tbody">
            {decorateTbody()}
          </tbody>
        </table>
      </div>
    )
  }
})
</script>
<style lang="less" scoped>
.base-table_wrap{
  .base-table_body{
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
  }
  .base-table_thead{
    & > tr {
      & > th {
        color: rgba(0,0,0,.85);
        font-weight: 500;
        text-align: left;
        background: #fafafa;
        border-bottom: 1px solid #f0f0f0;
        transition: l .3s ease;
      }
    }
  }
  .base-table_thead>tr>th,
  .base-table_tbody>tr>td{
      padding: 16px 16px;
      overflow-wrap: break-word;
  }
  .base-table_tbody>tr>td{
    border-bottom: 1px solid #f0f0f0;
  }
}

</style>
