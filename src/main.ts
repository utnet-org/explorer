import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./route/route.ts";
import ElementPlus from "element-plus";
import 'element-plus/dist/index.css';
import axiosInstance from "./servers/request.ts";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(router).use(ElementPlus).provide("axios", axiosInstance).mount("#app");
