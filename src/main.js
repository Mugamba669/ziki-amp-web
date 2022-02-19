import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import VueTour from 'vue-tour'
import "material-icons/css/material-icons.min.css";
import 'vue-tour/dist/vue-tour.css';
createApp(App)/*.use(VueTour)*/.use(store).use(router).mount('#app');



