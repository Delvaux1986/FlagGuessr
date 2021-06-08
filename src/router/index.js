import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/game',
    name: 'Game',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "game" */ '../views/Game.vue')
  },
  {
    path: '/tableaudesscores',
    name: 'score',
    component: () => import (/* webpackChunkName: "score" */ '../views/ScoreTableau.vue')
  },
  {
    path: '/credits',
    name: 'credit',
    component: () => import (/* webpackChunkName: "credit" */ '../views/Credits.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
