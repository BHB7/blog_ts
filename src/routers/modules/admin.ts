
import type { RouteRecordRaw } from 'vue-router';

// 后台管理路由
const routes: RouteRecordRaw[] = [
  {
    path: '/admin',
    component: () => import('@/pages/admin/layout/index.vue'),
    redirect: '/admin/home',
    meta: { requiresAuth: true },
    children: [
      {
        path: 'home',
        component: () => import('@/pages/admin/home/index.vue')
      }, {
        path: 'articles',
        component: () => import('@/pages/admin/articles/index.vue')
      }
    ]
  }
];

export default routes;
