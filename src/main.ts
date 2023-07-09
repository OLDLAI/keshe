import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'

// import.meta.env.DEV && (await import('@/mock/index'))//开发环境
import('@/mock/index')

const app = createApp(App)
app.use(router).use(ElementPlus).use(createPinia()).mount('#app')
