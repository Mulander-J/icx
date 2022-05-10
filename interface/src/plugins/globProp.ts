import { App } from 'vue'
import filters from '@/utils/filter'
import verify from '@/components/verify/index'


declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $filters: typeof filters
  }
}

const registerGlobProp = (app: App) => {
  app.config.globalProperties.$filters = filters
  app.config.globalProperties.$verify = verify
}

export default registerGlobProp