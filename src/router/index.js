import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
// import Intro from '../views/Intro.vue'
const routes = [
  // {
  //   path: '/',
  //   name: 'Intro',
  //   component: Intro
  // }, 
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/hot100',
    name: 'Hot100',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/hot100.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router;
