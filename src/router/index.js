import { createRouter, createWebHistory } from 'vue-router'

import { userSessionStore } from '../stores/userSessionStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: 'dashboard',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
      meta: { needsAuth: false },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/DashboardView.vue'),
      meta: { needsAuth: true },
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const userSession = userSessionStore()
  const { needsAuth } = to.meta

  // Wait a brief moment for auth state to stabilize if needed
  if (userSession.isInitializing) {
    await new Promise(resolve => setTimeout(resolve, 100))
  }

  if (needsAuth && !userSession.isAuthenticated) {
    console.log('Protected route, redirecting to login')
    next('/login')
  } else if (to.path === '/login' && userSession.isAuthenticated) {
    console.log('Already authenticated, redirecting to dashboard')
    next('/dashboard')
  } else {
    console.log(`Going to ${to.path}`)
    next()
  }
})

export default router
