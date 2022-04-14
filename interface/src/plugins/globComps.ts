import { App } from 'vue'
import RtBtn from '@/components/RtBtn.vue'


const registerGlobComps = (app: App) => {
  app.component("rt-btn", RtBtn);
}

export default registerGlobComps