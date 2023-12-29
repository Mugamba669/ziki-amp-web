import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "primevue/resources/themes/lara-light-green/theme.css";
import PrimeVue from "primevue/config";
import "material-icons/css/material-icons.min.css";
import "./registerServiceWorker";

createApp(App).use(PrimeVue).use(store).use(router).mount("#app");
