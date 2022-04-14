import { createApp } from 'vue'
import router from './router'
import { store } from "./store"
import registDirectives from './directives'
import registerGlobProp from './plugins/globProp'
import registerGlobComps from './plugins/globComps'
import registIcons from './plugins/icon'
import registScroll from './plugins/scrollBar'
import App from './App.vue'
import './styles/index.css'

const app = createApp(App)

registDirectives(app)
registerGlobProp(app)
registerGlobComps(app)
registIcons(app)
registScroll(app)

app
.use(store)
.use(router)
.mount('#root')