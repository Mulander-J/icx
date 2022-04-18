import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { getServeRunning } from '@/utils'

export const appRoutes:Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/core/Home.vue'),
    meta: {
      icon: 'hi-solid-home'
    }
  },
  {
    path: '/rank',
    name: 'rank',
    component: () => import('@/views/rank/index.vue'),
    meta: {
      icon: 'gi-rank-3'
    }
  },
  {
    path: '/activity',
    name: 'activity',
    component: () => import('@/views/activity/index.vue'),
    meta: {
      icon: 'oi-clock'
    }
  },
  {
    path: '/feedback',
    name: 'feedback',
    component: () => import('@/views/feedback/index.vue'),
    meta: {
      icon: 'md-feedback-round'
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/about/index.vue'),
    meta: {
      icon: 'ri-questionnaire-fill'
    }
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
    path: '/feedback/create',
    name: 'FeedbackCreate',
    component: () => import('@/views/feedback/create.vue'),
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
  const _isRuning = getServeRunning()
  // console.log('[_isRuning]',_isRuning)
  if(to.path!=='/sat' && !_isRuning){
    router.push({path: '/sat'})
    return false
  }

  document.title = 'ICX-' + to?.name?.toString().toLocaleUpperCase() || 'APP'  
  
  return true
})

export default router;