import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./route/route.ts";
import ElementPlus from "element-plus";
import 'element-plus/dist/index.css';
import axiosInstance from "./servers/request.ts";
import Mock from 'mockjs';
import './mock';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
if (process.env.NODE_ENV === 'development') {
    // Mock.start(); // 在开发环境中启用Mock.js
    // import('./mock/mockApi.ts');
    // Mock.setup({
    //     timeout: '300-6000',
    // });
}
app.use(router).use(ElementPlus).provide("axios", axiosInstance).mount("#app");
