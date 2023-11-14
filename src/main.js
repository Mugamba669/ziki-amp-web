import { createApp } from 'vue'
import AudioVisual from 'vue-audio-visual'
import App from './App.vue'
import router from './router'
import store from './store'

import "material-icons/css/material-icons.min.css";

createApp(App).use(AudioVisual).use(store).use(router).mount('#app');



