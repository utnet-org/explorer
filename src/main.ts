import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./route/route.ts";

import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import axiosInstance from "./servers/request.ts";
const app = createApp(App);
app.use(router).provide("axios", axiosInstance).use(createPinia()).use(ElementPlus).mount("#app");
