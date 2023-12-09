import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./route/route.ts";
import ElementPlus from "element-plus";
import 'element-plus/dist/index.css';
import axiosInstance from "./servers/request.ts";
// import Mock from 'mockjs';
import './mock';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
zhCn.el.pagination.goto = '前往';
zhCn.el.pagination.pagesize = '页';

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

if (process.env.NODE_ENV === 'development') {
    // Mock.start(); // 在开发环境中启用Mock.js
    // import('./mock/price.ts');
    // Mock.setup({
    //     timeout: '300-6000',
    // });
}
app.use(router).use(ElementPlus, {
    locale: zhCn
}).provide("axios", axiosInstance).mount("#app");
