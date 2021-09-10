import Color from 'color'
import { IBaseColor } from '@/theme/interface'
import type { Size } from "./types"

interface props {
  dashed?: Boolean;
  type?: string,
  color?: string,
  size?: Size,
}

const sizeMap = {
  mini: 20,
  small: 24,
  default: 32,
  large: 42
}

// 计算按钮的size
export function useButtonSize<T extends props> (props: T): string {
  return `${props.size ? sizeMap[props.size] : sizeMap.default}px`
}

// 计算组件的background
export function useButtonBackground<T extends props, C extends IBaseColor> (props: T, color: C): string {
  if (props.dashed) {
    return '#fff'
  }
  if (props.type) {
    return color[(props.type as string)]
  } else if (props.color) {
    return props.color
  }
  return color.primary
}

// 计算按钮hover的颜色
export function useButtonBackgroundHover<T extends props, C extends IBaseColor> (props: T, color: C):string {
  return Color(useButtonBackground(props, color)).lighten(0.1).string()
}

// 计算按钮active的颜色
export function useButtonBackgroundActive<T extends props, C extends IBaseColor> (props: T, color: C) {
  if (props.dashed) {
    return '#fff'
  }
  return Color(useButtonBackground(props, color)).darken(0.1).hex()
}

// 计算按钮的字体颜色
export function useButtonFontColor<T extends props, C extends IBaseColor> (props: T, color: C): string {
  if (props.dashed) {
    return color[(props.type as string)] || '#333'
  }
  if (props.type !== 'default') {
    return '#fff'
  }
  return '#333'
}

// 计算按钮的border - style

// 计算按钮的border - color
