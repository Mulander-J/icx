import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

export const appRoutes:Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/core/Home.vue'),
  },
  {
    path: '/activity',
    name: 'activity',
    component: () => import('@/views/activity/index.vue'),
  },
  {
    path: '/feedback',
    name: 'feedback',
    component: () => import('@/views/feedback/index.vue'),
  },
  {
    path: '/rank',
    name: 'rank',
    component: () => import('@/views/rank/index.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/about/index.vue'),
  },
]

const routes: Array<RouteRecordRaw> = [
  ...appRoutes,
  {
    path: '/info/:id(\\d+)',
    name: 'info',
    component: () => import('@/views/core/Info.vue'),
  },  
  {
    path: '/sat',
    name: 'sat',
    component: () => import('@/views/error/Sat.vue'),
  },
  {
    path: '/:pathMatch(.*)',
    name: '404',
    component: () => import('@/views/error/404.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
});

router.beforeEach((to, from) => {
  document.title = 'ICX-' + to?.name?.toString().toLocaleUpperCase() || 'APP'
  // 返回 false 以取消导航
  // return false
  return true
})

export default router;