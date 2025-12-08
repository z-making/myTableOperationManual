import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import MainLayout from '@/layout/index.vue'

// requiresAuth 是否需要登录 true 是 false 否
// hideNav 隐藏导航栏 true 不隐藏 false 隐藏   会作用于菜单上，看是否展示在菜单上面 true 展示
// hideChildren 是否隐藏子路由 true 隐藏 false 不隐藏

export const routerPages: RouteRecordRaw[] = [
  {
    path: '/index',
    component: () => import('@/views/index.vue'),
  },
  {
    path: '/',
    component: MainLayout,
    meta: {
      title: '首页',
      hideNav: true,
      hideChildren: true,
    },
    children: [
      {
        path: '/',
        component: () => import('@/views/index.vue'),
        meta: {
          title: '首页',
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: '/course',
    component: MainLayout,
    meta: {
      title: '使用教程',
      hideNav: true,
      hideChildren: false,
    },
    children: [
      {
        path: '/course',
        component: () => import('@/views/tableAdminPages/index.vue'),
        meta: {
          title: '快速开始',
          requiresAuth: true,
        },
      },
      {
        path: '/course/basic',
        component: () => import('@/views/tableAdminPages/basic.vue'),
        meta: {
          title: '基础用法',
          requiresAuth: true,
        },
      },
      {
        path: '/course/advanced',
        component: () => import('@/views/tableAdminPages/advanced.vue'),
        meta: {
          title: '进阶功能',
          requiresAuth: true,
        },
      },
      {
        path: '/course/api',
        component: () => import('@/views/tableAdminPages/api.vue'),
        meta: {
          title: 'API文档',
          requiresAuth: true,
        },
      },
      {
        path: '/example',
        component: () => import('@/views/tableAdminPages/example.vue'),
        meta: {
          title: '完整示例',
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: '/login',
    component: () => import('@/views/login.vue'),
    meta: {
      title: '登录',
      requiresAuth: false,
      hideNav: false,
    },
  },
  // 404 页面（匹配所有未定义的路由）
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
    meta: {
      title: '页面不存在',
      requiresAuth: false,
      hideNav: false,
    },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routerPages,
})

export default router
