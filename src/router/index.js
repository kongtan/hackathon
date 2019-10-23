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
  }
]

const router = new VueRouter({
  routes
})

export default router
