/**
 *
 * @param {Array} columns
 * @returns
 * 根据传递进来的columns,计算出table的头部 cols, rows
 */
export function useRowsAndCols (columns) {
  const cols = []
  const rows = []
  let maxDepth = -1

  // 最大深度
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
  // 计算单元格
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
  console.log(columns, maxDepth, cols, rows)
  return {
    cols, rows
  }
}
