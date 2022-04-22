import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import '../public/css/global.css';
import Vuesax from 'vuesax';
import 'material-icons/iconfont/material-icons.css';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import VeeValidate, { Validator } from 'vee-validate';
import msg from 'vee-validate/dist/locale/pt_BR';


import 'vuesax/dist/vuesax.css' //Vuesax styles
Vue.use(Vuesax, {})
Vue.use(VueToast, {
  position: 'top'
});

Vue.use(VeeValidate);
Validator.localize('pt_BR', msg);

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
