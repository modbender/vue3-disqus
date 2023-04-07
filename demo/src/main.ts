import { createApp } from "vue";
import Vue3Disqus from "../../src";
import App from "./App.vue";

createApp(App).use(Vue3Disqus, { shortname: "ktquez-dev-test" }).mount("#app");
