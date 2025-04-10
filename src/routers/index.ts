import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import { useLoadingBar } from '@/components/hooks/loadingBar';
import { useRouteStore } from '@/store';
import AdminRoutes from './modules/admin'
import FrontendRoutes from './modules/frontend'

const routes: RouteRecordRaw[] = [...AdminRoutes, ...FrontendRoutes]


const router = createRouter({
  history: createWebHistory(),
  routes
})
// 路由前置守卫
router.beforeEach((to, from) => {
  // 启动加载条
  useLoadingBar().startSpeed();
  // 设置路由加载状态为 true
  useRouteStore().setRouterLoadingSt(true);
});

// 路由后置守卫
router.afterEach((to, from) => {
  // 确保页面加载完成后再停止加载条
  if (document.readyState === 'complete') {
    useRouteStore().setRouterLoadingSt(false);
    useLoadingBar().endSpeed();
  } else {
    // 如果页面尚未加载完成，监听 window.onload
    window.addEventListener('load', () => {
      useRouteStore().setRouterLoadingSt(false);
      useLoadingBar().endSpeed();
    });
  }
});

export default router
