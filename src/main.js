import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import Vuetify from 'vuetify';
// import 'vuetify/dist/vuetify.min.css';
import "material-icons/css/material-icons.min.css";
// import 'vue-tour/dist/vue-tour.css';
createApp(App).use(store).use(router).mount('#app');



