import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./route/route.ts";
import ElementPlus from "element-plus";
import axiosInstance from "./servers/request.ts";
const app = createApp(App);
app.use(router).use(ElementPlus).provide("axios", axiosInstance).mount("#app");
