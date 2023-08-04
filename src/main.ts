import './assets/main.css'
import 'remixicon/fonts/remixicon.css'
import { createApp } from 'vue'


import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

import App from './App.vue'

createApp(App).component('v-select', vSelect).component('VueDatePicker',VueDatePicker).mount('#app')
