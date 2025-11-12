import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw} from 'vue-router'
import MainLayout from '@/layout/index.vue'

export const routerPages: RouteRecordRaw[] = [
  {
    path: '/index',
    component: () => import('@/views/index.vue')
  },
  {
    path: '/',
    component: MainLayout,
    meta: { title: '首页' },
    children:[
      {
        path: '/',
        component: () => import('@/views/index.vue'),
        meta: { title: '首页' }
      },
      {
        path: '/test',
        component: () => import('@/views/test/index.vue'),
        meta: { title: '测试' }
      }
    ]
  },
  {
    path:'/login',
    component: () => import('@/views/login.vue'),
    meta: { title: '登录' }
  },
  // 404 页面（匹配所有未定义的路由）
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
    meta: { title: '页面不存在' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routerPages,
})

export default router
