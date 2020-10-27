import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClick from 'fastclick'

import toast from 'components/common/toast'

Vue.use(toast);                         //插件的方式使用组件。使用Vue.use调用toast的install方法的原因是因为不想把太多代码写在main.js中

FastClick.attach(document.body);        //解决移动端300ms延迟问题

Vue.prototype.$bus = new Vue();         //使用Vue实例作为事件总线

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
