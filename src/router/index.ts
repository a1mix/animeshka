import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/anime/:id',
    name: 'anime',
    component: () => import('../views/OneAnimeView.vue')
  },
  {
    path: '/anime',
    name: 'animes',
    component: () => import('../views/AnimesView.vue')
  },
  {
    path: '/manga',
    name: 'mangas',
    component: () => import('../views/MangasView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
