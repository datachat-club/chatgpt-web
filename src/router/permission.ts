import type { Router } from 'vue-router'
import { useAuthStoreWithout } from '@/store/modules/auth'

export function setupPageGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    if (to.path === '/login') {
      next()
    }
    const token = localStorage.getItem('pp-token')
    if (!token) {
      next('/login')
    }
    else {
      next()
    }
  })
}
