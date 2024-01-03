import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import "material-icons/css/material-icons.min.css";
import './registerServiceWorker'

createApp(App).use(store).use(router).mount('#app');



