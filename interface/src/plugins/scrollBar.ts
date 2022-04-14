import { App } from 'vue'
import PerfectScrollbar from 'vue3-perfect-scrollbar'
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'

const registScroll = (app: App) => {
  app.use(PerfectScrollbar)
}
export default registScroll