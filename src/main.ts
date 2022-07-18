import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import '../public/css/global.css';
import 'material-icons/iconfont/material-icons.css';
import * as element from 'element-ui';
import'element-ui/lib/theme-chalk/index.css';
import VueTheMask from 'vue-the-mask'


Vue.use(VueTheMask)


Vue.use(element)

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
