import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import '../public/css/global.css';
import '@/assets/sass/global.sass';
import 'material-icons/iconfont/material-icons.css';
import * as element from 'element-ui';
import'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/pt-br'
import VueTheMask from 'vue-the-mask'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Echo from "laravel-echo";



declare global {
  interface Window {
    Echo: any;
    Pusher: any;
  }
}


window.Pusher = require('pusher-js');


window.Echo = new Echo({
  broadcaster: 'pusher',
  key: 'daf524e36b1c69c53fd3',
  cluster: 'sa1',
  forceTLS: false,
  wsPort: 6001,
  wsHost: '127.0.0.1',
  disableStats: true
});


Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueTheMask)


Vue.use(element, {locale})

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
