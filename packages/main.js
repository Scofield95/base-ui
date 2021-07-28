import components from './index.ts'
import '@/style/reset.less'
function install (app, opt) {
  // console.log(components)
  components.forEach((component) => {
    // const name = opt?.tag ? `${opt.tag}-${component.name}` : `Base${component.name}`
    // component.name = name
    app.component(component.name, component)
  })
}

export default {
  install
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(install)
  if (install.installed) {
    install.installed = false
  }
}
