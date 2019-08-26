import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import HeaderComponent from '@/components/Layouts/HeaderComponent.vue'
import Signin from '@/views/Signin.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      components: {
        header: HeaderComponent,
        default: Home
      }
    },
    {
      path: '/signin',
      name: 'Signin',
      components: {
        default: Signin
      }
    },
  ]
})
