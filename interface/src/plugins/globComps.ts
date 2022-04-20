import { App } from 'vue'
import NoData from '@/components/NoData.vue'
import DataView from '@/components/DataView.vue'
import RtBtn from '@/components/buttons/RtBtn.vue'
import CpBtn from '@/components/buttons/CpBtn.vue'
import Divide from '@/components/Divide.vue'

const registerGlobComps = (app: App) => {
  app.component("no-data", NoData)
  app.component("data-view", DataView)
  app.component("rt-btn", RtBtn)
  app.component("cp-btn", CpBtn)
  app.component("divide", Divide)
}

export default registerGlobComps