
import type { RouteRecordRaw } from 'vue-router';

// 后台管理路由
const routes: RouteRecordRaw[] = [
  {
    path: '/admin',
    component: () => import('@/pages/admin/layout/index.vue'),
    redirect: '/admin/article',
    children: [
      {
        path: 'article',
        component: () => import('@/pages/admin/article/index.vue')
      }
    ]
  }
];

export default routes;
