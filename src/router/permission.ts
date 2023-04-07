import type { Router } from 'vue-router'

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
