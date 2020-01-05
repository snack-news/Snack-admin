import Vue from 'vue'
import Router, { Route } from 'vue-router'

import Signin from '@/views/Signin.vue'
import ArticleForm from '@/views/NewArticle.vue'
import ArticleList from '@/views/ArticleList.vue'
import Signup from "@/views/Signup.vue"
import EditingArticleForm from "@/views/EditingArticleForm.vue";

import HeaderComponent from '@/components/Layouts/HeaderComponent.vue'
import { Next } from "@/@types/library/vue-router";

import navigationGuard from "./middleware/navigation-guard";


Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: {
        name: 'Signin'
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
      path: '/signup',
      name: 'Signup',
      components: {
        default: Signup
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
        header: HeaderComponent,
        default: ArticleForm
      },
      meta: {
        isRequiredAuth: true
      }
    },
    {
      path: '/edit-article/:id',
      name: 'ArticleEditingForm',
      components: {
        header: HeaderComponent,
        default: EditingArticleForm
      },
      meta: {
        isRequiredAuth: true
      },
      props: {
        default: true,
      }
    },
  ]
});

router.beforeEach(navigationGuard);

export default router;
