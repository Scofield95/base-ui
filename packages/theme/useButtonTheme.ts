import Color from 'color'

interface props {
  dashed: Boolean;
  type: string,
  color: string,
}

interface BaseColor {
  primary: string,
  success: string,
  info: string,
  warning: string,
  danger: string,
  [type: string]: string,
  [type: number]: string
}

// 计算组件的background
export function useButtonBackground (props: props, BaseColor: BaseColor) {
  if (props.type) {
    return BaseColor[(props.type as string | number)]
  } else if (props.color) {
    return '#ddd'
  }
  return '#fff'
}

export function useButtonBackgroundHover (props: props, BaseColor: BaseColor) {
  return Color(useButtonBackground(props, BaseColor)).lighten(0.1).string()
}

export function useButtonBackgroundActive (props: props, BaseColor: BaseColor) {
  return Color(useButtonBackground(props, BaseColor)).darken(0.1).hex()
}

// 计算组件的字体颜色
export function useButtonFontColor (props: props, BaseColor: BaseColor) {
  if (props.type !== 'default') {
    return '#fff'
  }
  return '#333'
}
