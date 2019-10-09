import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import store from './store'
import CustomPlugin from "./modules/plugin";
import firebaseAuthService from "@/api/initializer/firebase";

Vue.use(CustomPlugin);

/**
 * @description Use third party library
 */
Vue.use(BootstrapVue)

Vue.config.productionTip = false

function appStartPack () {
  let isRendered = false;
  firebaseAuthService.auth().onAuthStateChanged(function (user) {
    if (!isRendered) {
      new Vue({
        router,
        store,
        render: h => h(App)
      }).$mount('#app')
    }
  })
}

appStartPack();
