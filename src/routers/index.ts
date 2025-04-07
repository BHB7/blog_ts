import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useLoadingBar } from '@/components/hooks/loadingBar'
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'layout',
    component: () => import('@/pages/layout/index.vue'),
    redirect: 'home',
    children: [
      {
        path: 'home',
        component: () => import('@/pages/home/index.vue')
      },
      {
        path: 'article',
        component: () => import('@/pages/article/index.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/pages/login/index.vue')
  }
]




const router = createRouter({
  history: createWebHistory(),
  routes
})


router.beforeEach((to, from) => {
  useLoadingBar().startSpeed(); // 在路由跳转开始时启动加载条
});

router.afterEach((to, from) => {
  useLoadingBar().endSpeed(); // 在路由跳转完成后停止加载条
});






export default router


