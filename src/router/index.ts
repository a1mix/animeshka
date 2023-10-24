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
    meta: { onlyForUnautorized: true},
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
  {
    path: '/registration',
    name: 'registration',
    meta: { onlyForUnautorized: true},
    component: () => import('../views/RegistrationView.vue')
  },
  {
    path: '/user',
    name: 'user',
    meta: { requiresAuth: true },
    children: [
      {
        path: 'favorites',
        name: 'favorites',
        component: () => import('../views/FavoritesView.vue')
      },
      {
        path: 'account',
        name: 'account',
        component: () => import('../views/AccountView.vue')
      }
    ]
  },
  {
    path: '/admin',
    name: 'admin',
    meta: { isAdminRoleRequired: true },
    component: () => import('../views/AdminView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from) => {
  const token = localStorage.getItem('token')
  let roles = []
  if (token) {
    roles = parseJwt(token).roles
  }

  if (!token && to.meta.requiresAuth) {
    return {
      path: '/login'
    }
  }
  
  if(token && to.meta.onlyForUnautorized) {
    return {
      path: '/user/account'
    }
  }

  if(to.meta.isAdminRoleRequired && !roles.find((role:  {value: string}) => role.value === "ADMIN")) {
    return {
      path: '/'
    }
  }
})

function parseJwt (token: any) {
  if (!token) return
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

export default router
