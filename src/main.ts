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

import VueHtmlToPaper from 'vue-html-to-paper';

const options = {
  name: '_blank',
  specs: [
    "fullscreen=yes",
    'titlebar=yes',
    'scrollbars=yes'
  ],
  styles: [
    'https://monintox.online/css/print.css',
    'https://unpkg.com/element-ui/lib/theme-chalk/index.css',

  ],
  timeout: 1000, // default timeout before the print window appears
  autoClose: true, // if false, the window will not close after printing
  windowTitle: window.document.title, // override the window title
}



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
  forceTLS: true,
  // wsPort: 6001,
  wssPort: 443,
  wsHost: 'https://api.monintox.online',
  disableStats: true,
  encrypted: true,
  enabledTransports: ['ws', 'wss'],
});


Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueTheMask)

Vue.use(VueHtmlToPaper, options);


Vue.use(element, {locale})

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
