import { createApp } from 'vue'
import router from './router'
import { store } from "./store"
import registDirectives from './directives'
import registIcons from './plugins/icon'
import registScroll from './plugins/scrollBar'
import App from './App.vue'
import './styles/index.css'

const app = createApp(App)

registDirectives(app)
registIcons(app)
registScroll(app)

app
.use(store)
.use(router)
.mount('#root')