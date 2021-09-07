import Color from 'color'

// 计算组件的background
export function useBackground (props, baseColor) {
  if (props.dashed) {
    return '#fff'
  }
  if (props.type) {
    return baseColor[props.type]
  } if (props.color) {
    return '#ddd'
  }
  return '#fff'
}

export function useButtonBackgroundHover (props, baseColor) {
  return Color(useBackground(props, baseColor)).lighten(0.1).string()
}
