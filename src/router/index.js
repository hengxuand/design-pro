import { createRouter, createWebHistory } from 'vue-router'

import { userSessionStore } from '../stores/userSessionStore'
import DashboardView from '@/views/DashboardView.vue'

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
      name: 'Dashboard',
      meta: { needsAuth: true},
      component: DashboardView,
      redirect: '/dashboard/quotes', // Set /dashboard to redirect to /dashboard/quotes
      children: [
        {
          path: 'quotes',
          name: 'quotes',
          component: () => import('@/components/QuoteComponent.vue'),
        },
        {
          path: 'submit-request',
          name: 'submit-request',
          component: () => import('@/components/SubmitRequestComponent.vue'),
        },
        {
          path: 'samples',
          name: 'samples',
          component: () => import('@/components/SampleComponent.vue'),
        },
        {
          path: '/:pathMatch(.*)*', // Catch-all route
          redirect: '/dashboard' // Redirect any unknown paths to /dashboard
        }
      ],
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const userSession = userSessionStore()
  const { needsAuth } = to.meta

  // Wait a brief moment for auth state to stabilize if needed
  if (userSession.isInitializing) {
    await new Promise((resolve) => setTimeout(resolve, 100))
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
