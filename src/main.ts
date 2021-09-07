import { App } from 'vue'
import components from './index'
import '@/style/reset.less'
function install (app: App) {
  // console.log(components)
  components.forEach((component) => {
    // const name = opt?.tag ? `${opt.tag}-${component.name}` : `Base${component.name}`
    // component.name = name
    app.component(component.name, component)
  })
}

install.installed = undefined

export default {
  install
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(install)
  if (install.installed) {
    install.installed = false
  }
}
