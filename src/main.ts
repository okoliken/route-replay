import './assets/main.css'
import 'remixicon/fonts/remixicon.css'
import { createApp } from 'vue'
// import VueGoogleMaps from '@fawmi/vue-google-maps'

import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
// import VueMapboxTs from "vue-mapbox-ts";

import App from './App.vue'

const app = createApp(App)


// app.use(VueGoogleMaps, {
//     load: {
//         key: 'AIzaSyCBguFgxPOH6AuAiz0ZXXoo_fJAp4AR8WE',
//     },
// })

// app.use(VueMapboxTs)
app.component('v-select', vSelect)
app.component('VueDatePicker',VueDatePicker)
app.mount('#app')
