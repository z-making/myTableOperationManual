import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'

// 引入全局样式
import '@/assets/styles/index.scss'

import App from './App.vue'
import router from './router'

import myTable from '@/components/myTable.vue'


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus,{locale: zhCn,})

// 注册全局组件
app.component('myTable',myTable)

app.mount('#app')
