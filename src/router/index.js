import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: Home
  // },
  {
    path: '/test',
    name: 'test',
    // route level code-splitting
    component: () => import(/* webpackChunkName: "test" */ '../views/test.vue')
  },
  {
    path: '/index',
    name: 'index',
    // route level code-splitting
    component: () => import(/* webpackChunkName: "index" */ '../views/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    component: () => import(/* webpackChunkName: "login" */ '../views/login.vue')
  },
  {
    path: '/list',
    name: 'list',
    // route level code-splitting
    component: () => import(/* webpackChunkName: "list" */ '../views/list.vue')
  },
  {
    path: '/register',
    name: 'register',
    // route level code-splitting
    component: () => import(/* webpackChunkName: "register" */ '../views/register.vue')
  },
  {
    path: '/search',
    name: 'search',
    // route level code-splitting
    component: () => import(/* webpackChunkName: "search" */ '../views/search.vue')
  },
  {
    path: '/identity',
    name: 'identity',
    // route level code-splitting
    component: () => import(/* webpackChunkName: "identity" */ '../views/identity.vue')
  },
  {
    path: '/releaseResult',
    name: 'releaseResult',
    // route level code-splitting
    component: () => import(/* webpackChunkName: "releaseResult" */ '../views/releaseResult.vue')
  },
  {
    path: '/reviewcert',
    name: 'reviewcert',
    // route level code-splitting
    component: () => import(/* webpackChunkName: "reviewcert" */ '../views/reviewcert.vue')
  },
  {
    path: '/carowner',
    name: 'carowner',
    // route level code-splitting
    component: () => import(/* webpackChunkName: "carowner" */ '../views/carowner.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
