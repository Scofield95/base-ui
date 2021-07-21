import Color from 'color'

// 计算组件的background
export function useBackground (props, BaseColor) {
  if (props.dashed) {
    return '#fff'
  }
  if (props.type) {
    return BaseColor[props.type]
  } if (props.color) {
    return '#ddd'
  }
  return '#fff'
}

export function useButtonBackgroundHover (props, BaseColor) {
  return Color(useBackground(props, BaseColor)).lighten(0.1).string()
}
