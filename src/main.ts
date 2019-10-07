import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import store from './store'
import CustomPlugin from "./modules/plugin";

Vue.use(CustomPlugin);
console.log("배포가 되었습니다.");

/**
 * @description Use third party library
 */
Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
