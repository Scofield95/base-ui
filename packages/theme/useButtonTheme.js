import Color from 'color'

// 计算组件的background
export function useButtonBackground (props, BaseColor) {
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
  return Color(useButtonBackground(props, BaseColor)).lighten(0.1).string()
}

export function useButtonBackgroundActive (props, BaseColor) {
  return Color(useButtonBackground(props, BaseColor)).darken(0.1).hex()
}

// 计算组件的字体颜色
export function useButtonFontColor (props, BaseColor) {
  if (props.dashed) {
    return BaseColor[props.type]
  }
  if (props.type) {
    return '#fff'
  }
  return '#333'
}
