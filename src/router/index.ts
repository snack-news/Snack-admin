import Vue from 'vue'
import Router, { Route } from 'vue-router'

import Home from '@/views/Home.vue'
import Signin from '@/views/Signin.vue'
import ArticleForm from '@/views/NewArticle.vue'
import ArticleList from '@/views/ArticleList.vue'

import HeaderComponent from '@/components/Layouts/HeaderComponent.vue'
import { Next } from "@/@types/library/vue-router";
import navigationGuard from "./navigation-guard";

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      components: {
        header: HeaderComponent,
        default: Home
      },
      meta: {
        isRequiredAuth: false
      }
    },
    {
      path: '/signin',
      name: 'Signin',
      components: {
        default: Signin
      },
      meta: {
        isRequiredAuth: false
      }
    },
    {
      path: '/articles',
      name: 'ArticleList',
      components: {
        header: HeaderComponent,
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
          next();
        }
      },
      meta: {
        isRequiredAuth: true
      }
    },
    {
      path: '/new-article',
      name: 'ArticleForm',
      components: {
        default: ArticleForm
      },
      meta: {
        isRequiredAuth: true
      }
    },
  ]
});

router.beforeEach(navigationGuard);

export default router;
