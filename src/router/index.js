import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routerMap'
// import { component } from 'vue/types/umd'

Vue.use(VueRouter)


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

// mixins //混入 脱离组件，可以让组件单独存在 
