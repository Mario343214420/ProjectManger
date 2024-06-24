import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import store from './store'
import router from './router'
createApp(App).use(store).use(ElementPlus).use(router).mount('#app')

