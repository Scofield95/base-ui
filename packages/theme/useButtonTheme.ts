import Color from 'color'

interface props {
  dashed: Boolean;
  type: string,
  color: string,
}

interface baseColor {
  primary: string,
  success: string,
  info: string,
  warning: string,
  danger: string,
  [type: string]: string,
  [type: number]: string
}

// 计算组件的background
export function useButtonBackground (props: props, baseColor: baseColor) {
  if (props.type) {
    return baseColor[(props.type as string | number)]
  } else if (props.color) {
    return '#ddd'
  }
  return '#fff'
}

export function useButtonBackgroundHover (props: props, baseColor: baseColor) {
  return Color(useButtonBackground(props, baseColor)).lighten(0.1).string()
}

export function useButtonBackgroundActive (props: props, baseColor: baseColor) {
  return Color(useButtonBackground(props, baseColor)).darken(0.1).hex()
}

// 计算组件的字体颜色
export function useButtonFontColor (props: props, baseColor: baseColor) {
  if (props.type !== 'default') {
    return '#fff'
  }
  return '#333'
}
