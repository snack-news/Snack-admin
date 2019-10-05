import Vue from 'vue'
import Router, { Route } from 'vue-router'

import Home from '@/views/Home.vue'
import Signin from '@/views/Signin.vue'
import ArticleForm from '@/views/NewArticle.vue'
import ArticleList from '@/views/ArticleList.vue'

import HeaderComponent from '@/components/Layouts/HeaderComponent.vue'
import { Next } from "@/@types/library/vue-router";

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
    {
      path: '/articles',
      name: 'ArticleList',
      components: {
        default: ArticleList
      },
      props: {
        default: (route: Route) => ({
          page: route.query.page,
          type: route.query.type
        })
      },
      beforeEnter (to: Route, from: Route, next: Next) {
        if (!to.query.type || !to.query.page) {
          next({
            name: "ArticleList",
            query: {
              page: "1",
              type: "news",
              ...to.query
            }
          });
        } else {
          console.log(to);
          next();
        }
      }
    },
    {
      path: '/new-article',
      name: 'ArticleForm',
      components: {
        default: ArticleForm
      }
    },
  ]
})
