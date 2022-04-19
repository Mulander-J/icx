import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { getServeRunning } from '@/utils'

export const appRoutes:Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/layouts/ParentView.vue'),
    redirect:'/list',
    meta: {
      icon: 'hi-solid-home'
    },
    children:[
      {
        path: 'list',
        name: 'NodeList',
        component: () => import('@/views/core/Home.vue'),
      },
      {
        path: 'add',
        name: 'NodeCreate',
        component: () => import('@/views/core/Create.vue'),
      },
      {
        path: 'info/:id(\\d+)',
        name: 'Info',
        component: () => import('@/views/core/Info.vue'),
      },
    ]
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
    path: '/feedback/create',
    name: 'FeedbackCreate',
    component: () => import('@/views/feedback/Create.vue'),
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