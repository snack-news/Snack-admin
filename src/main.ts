import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import store from './store'
import CustomPlugin from "./modules/plugin";
import firebaseAuthService from "@/api/initializer/firebase";
import Snotify, { SnotifyPosition } from "vue-snotify"

Vue.use(CustomPlugin);

const options = {
  toast: {
    position: SnotifyPosition.rightBottom
  }
};

Vue.use(Snotify, options);

/**
 * @description Use third party library
 */
Vue.use(BootstrapVue)

Vue.config.productionTip = false

function appStartPack () {
  let isRendered = false;
  // @TODO 별도의 Class 로 분리
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
