import { App } from 'vue'
import RtBtn from '@/components/RtBtn.vue'
import NoData from '@/components/NoData.vue'


const registerGlobComps = (app: App) => {
  app.component("rt-btn", RtBtn)
  app.component("no-data", NoData)
}

export default registerGlobComps