import { App } from 'vue'
import filters from '@/utils/filter'


declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $filters: typeof filters
  }
}

const registerGlobProp = (app: App) => {
  app.config.globalProperties.$filters = filters
}

export default registerGlobProp