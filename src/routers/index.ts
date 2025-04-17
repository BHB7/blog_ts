import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useLoadingBar } from '@/components/hooks/loadingBar'
import { useRouteStore, useTokenStore } from '@/store'
import AdminRoutes from './modules/admin'
import FrontendRoutes from './modules/frontend'

const routes: RouteRecordRaw[] = [...AdminRoutes, ...FrontendRoutes]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由前置守卫
router.beforeEach((to, from) => {
  const isAdminRoute = to.path.startsWith('/admin')

  if (isAdminRoute) {
    const tokenStore = useTokenStore()
    if (!tokenStore.getToken().trim() && to.path !== '/admin/login') {
      return '/login'
    }

    // 管理后台加载条 & loading 状态
    useLoadingBar().startSpeed()
    useRouteStore().setRouterLoadingSt(true)
  }

  return true
})

// 路由后置守卫
router.afterEach((to) => {
  const isAdminRoute = to.path.startsWith('/admin')

  if (isAdminRoute) {
    const stop = () => {
      useRouteStore().setRouterLoadingSt(false)
      useLoadingBar().endSpeed()
    }

    if (document.readyState === 'complete') {
      stop()
    } else {
      const onLoad = () => {
        stop()
        window.removeEventListener('load', onLoad)
      }
      window.addEventListener('load', onLoad)
    }
  }
})

export default router
