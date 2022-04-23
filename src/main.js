import { createApp } from 'vue'
import AudioVisual from 'vue-audio-visual'
import KnobControl from 'vue-knob-control'
import App from './App.vue'
import router from './router'
import store from './store'
// import VueTour from 'vue-tour'

// require('vue-tour/dist/vue-tour.css')
// import Vuetify from 'vuetify';
// import 'vuetify/dist/vuetify.min.css';
import "material-icons/css/material-icons.min.css";
// import 'vue-tour/dist/vue-tour.css';
createApp(App).use(KnobControl).use(store).use(router).mount('#app');



