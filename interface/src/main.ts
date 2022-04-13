import { createApp } from 'vue'
import router from './router'
import { store } from "./store"
import registDirectives from './directives'
import App from './App.vue'
import './styles/index.css'

const app = createApp(App)

registDirectives(app)

app
.use(store)
.use(router)
.mount('#root')