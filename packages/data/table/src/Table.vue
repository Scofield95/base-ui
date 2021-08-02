<script>
import { defineComponent } from 'vue'

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
  setup () {

  },
  render () {
    const { columns, dataSource, $slots } = this
    // console.log($slots.default)
    // $slots[scopedSlots.customRender]()
    // 获得row  col
    function getRowsAndCols (columns) {
      const cols = []
      const rows = []
      let maxDepth = -1

      function ensureMaxDepth (columns, currentDepth) {
        if (currentDepth > maxDepth) {
          rows[currentDepth] = []
          maxDepth = currentDepth
        }
        for (const column of columns) {
          if ('children' in column) {
            ensureMaxDepth(column.children, currentDepth + 1)
          } else {
            cols.push({
              key: column.key,
              // style: utils_1.createCustomWidthStyle(column),
              column
            })
          }
        }
      }
      ensureMaxDepth(columns, 0)
      function getColSpan (items) {
        let colSpan = 0
        function getColSpanValue (items) {
          if (items) {
            colSpan += items.filter(i => !i.children).length
            const children = items.filter(i => i.children)
            children.forEach(i => {
              getColSpanValue(i.children)
            })
          } else {
            colSpan = 1
          }
        }
        getColSpanValue(items)
        return colSpan
      }
      function ensureColLayout (columns, currentDepth) {
        columns.forEach((column, index) => {
          if ('children' in column) {
            const rowItem = {
              column,
              colSpan: getColSpan(column.children),
              rowSpan: 1
            }
            rows[currentDepth].push(rowItem)
            ensureColLayout(column.children, currentDepth + 1)
          } else {
            const rowItem = {
              column,
              colSpan: 1,
              rowSpan: maxDepth - currentDepth + 1
            }
            rows[currentDepth].push(rowItem)
          }
        })
      }
      ensureColLayout(columns, 0)
      console.log(columns, cols, rows)
      return {
        cols, rows
      }
    }
    const { rows, cols } = getRowsAndCols(columns)
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
