import components from './index';

const install = function (Vue) {
  if (install.installed) return;
  components.forEach((component) => {
    Vue.use(component);
  });
};
//  全局引用可自动安装
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}
export default {
  install,
  ...components,
};
