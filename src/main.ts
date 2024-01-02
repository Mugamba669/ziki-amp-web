import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'material-icons/css/material-icons.min.css';
import 'primeicons/primeicons.css';
import 'primevue/resources/themes/lara-light-green/theme.css';
import PrimeVue from 'primevue/config'

const app = createApp(App)

app.use(PrimeVue)
app.use(router)
app.use(store)
app.mount('#app')
