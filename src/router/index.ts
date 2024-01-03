import { createRouter, createWebHistory } from 'vue-router'
// @ts-ignore
import TodoList from '../views/TodoList.vue'
import Register from '@/views/Register.vue'
import Login from '@/views/Login.vue'
import { jwtDecode } from 'jwt-decode'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'todo',
      component: TodoList,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

// Check auth for routes with the requiresAuth metadata
router.beforeEach((to, from, next) => {
  const jwt: string | null = localStorage.getItem('jwt')

  if (to.name === 'login' && jwt) {
    next({ name: '' })
    return
  }

  // Route does not require Auth
  if (!to.matched.some(record => record.meta.requiresAuth)) {
    next()
    return
  }

  if (!jwt) {
    next({ name: 'login' })
    return
  }

  try {
    const claims = jwtDecode(jwt)

    if (!claims.exp) {
      localStorage.removeItem('jwt')
      next({ name: 'login' })
      return
    }

    // Check if the claims are expired, if so then remove the jwt and redirect to login
    if (Date.now() / 1000 > claims.exp) {
      localStorage.removeItem('jwt')
      next({ name: 'login' })
      return
    }

    // Redirect to dashboard
    if (to.name === 'login') {
      next({ name: '' })
      return
    }

    next()
  } catch (e) {
    localStorage.removeItem('jwt')
    next({ name: 'login' })
    return
  }
})

export default router
