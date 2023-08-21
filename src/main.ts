import './assets/main.css'
import 'remixicon/fonts/remixicon.css'
import { createApp } from 'vue'

import Toast from "vue-toastification";

import "vue-toastification/dist/index.css";
import 'notivue/notifications.css' // Only needed if using built-in notifications
import 'notivue/animations.css'

import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'


import App from './App.vue'

const app = createApp(App)


app.component('v-select', vSelect)
app.component('VueDatePicker',VueDatePicker)
app.use(Toast);
app.mount('#app')
