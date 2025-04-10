import type { RouteRecordRaw } from 'vue-router';
// 前台路由
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'layout',
    component: () => import('@/pages/frontend/layout/index.vue'),
    redirect: 'home',
    children: [
      {
        path: 'home',
        component: () => import('@/pages/frontend/home/index.vue')
      },
      {
        path: 'article',
        component: () => import('@/pages/frontend/article/index.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/pages/frontend/login/index.vue')
  }
  , {
    path: '/:pathMatch(.*)*',
    component: () => import('@/pages/error/404.vue')
  }
];


export default routes;
