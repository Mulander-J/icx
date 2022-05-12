import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { getServeRunning } from '@/utils'

export const appRoutes:Array<RouteRecordRaw> = [
  {
    path: '/app',
    name: 'Square',
    component: () => import('@/layouts/ParentView.vue'),
    redirect:'/app/square',
    meta: {
      icon: 'hi-solid-home'
    },
    children:[
      {
        path: 'square',
        name: 'Square',
        component: () => import('@/views/core/Home.vue'),
      },
      {
        path: 'add',
        name: 'Create',
        component: () => import('@/views/core/Modify.vue'),
      },
      {
        path: 'edit/:id(\\d+)',
        name: 'Modify',
        component: () => import('@/views/core/Modify.vue'),
      },
      {
        path: 'info/:id(\\d+)',
        name: 'Info',
        component: () => import('@/views/core/Info.vue'),
      }
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
    path: '/vote',
    name: 'Vote',
    redirect:'/vote/list',
    component: () => import('@/layouts/ParentView.vue'),
    meta: {
      icon: 'gi-mailed-fist'
    },
    children:[
      {
        path: 'list',
        name: 'Votes',
        component: () => import('@/views/vote/index.vue'),
      },
      {
        path: 'frozen/:id(\\d+)',
        name: 'Frozen',
        component: () => import('@/views/vote/Frozen.vue'),
      }
    ]
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
    name: 'Feedback',
    redirect:'/feedback/list',    
    component: () => import('@/layouts/ParentView.vue'),
    meta: {
      icon: 'md-feedback-round'
    },
    children:[
      {
        path: 'list',
        name: 'Report',
        component: () => import('@/views/feedback/index.vue'),
      },
      {
        path: 'add',
        name: 'Feedback_ADD',
        component: () => import('@/views/feedback/Create.vue'),
      },
    ]
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/about/index.vue'),
    meta: {
      icon: 'ri-questionnaire-fill'
    }
  },
  {
    path: '/tool',
    name: 'Tool',
    component: () => import('@/views/tool/index.vue'),
    meta: {
      icon: 'fa-tools'
    }
  },
]

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Root',
    redirect:'/app',
  },
  ...appRoutes,
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