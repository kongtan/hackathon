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
  {
    path: '/ptc',
    name: 'ptc',
    // route level code-splitting
    component: () => import(/* webpackChunkName: "ptc" */ '../views/ptc.vue')
  },
  {
    path: '/ctp',
    name: 'ctp',
    // route level code-splitting
    component: () => import(/* webpackChunkName: "ctp" */ '../views/ctp.vue')
  },
  {
    path: '/pfc',
    name: 'pfc',
    // route level code-splitting
    component: () => import(/* webpackChunkName: "pfc" */ '../views/pfc.vue')
  },
  {
    path: '/cfp',
    name: 'cfp',
    // route level code-splitting
    component: () => import(/* webpackChunkName: "cfp" */ '../views/cfp.vue')
  },
  {
    path: '/msglist',
    name: 'msglist',
    // route level code-splitting
    component: () => import(/* webpackChunkName: "msglist" */ '../views/msglist.vue')
  },
  {
    path: '/location',
    name: 'location',
    // route level code-splitting
    component: () => import(/* webpackChunkName: "location" */ '../views/location.vue')
  },
  {
    path: '/mine',
    name: 'mine',
    // route level code-splitting
    component: () => import(/* webpackChunkName: "mine" */ '../views/mine.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
