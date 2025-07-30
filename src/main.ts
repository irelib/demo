import { createApp } from "vue";
import { router } from "@/router";
import "reset-css";
import "@/styles/reset.scss";
import "@/styles/index.scss";
import "@/styles/variable.scss";
import "tdesign-vue-next/es/style/index.css";
import "overlayscrollbars/overlayscrollbars.css";
import App from "./App.vue";

const app = createApp(App);

app.use(router);
app.mount("#app");
