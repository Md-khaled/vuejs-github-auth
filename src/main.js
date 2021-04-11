import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

import App from './App.vue'


// add these before Vue is instantiated

import router from './router'
import store from './store'

//sass
import "./sass/app.scss"

//bootstrap-5
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

//fontawesome
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';

//import jquery from 'jquery'
window.$ = window.jQuery  = require('jquery')

/*Axios*/
import VueAuthenticate from 'vue-authenticate';
Vue.use(VueAuthenticate, {
  baseUrl: 'http://localhost:8080', // Your API domain
  
  providers: {
    github: {
      clientId: 'Iv1.0db3470d75593452',
      redirectUri: 'http://localhost:8080' // Your client app URL
    }
  }
})

// window.axios = axios;

//set url
let url ='http://127.0.0.1:8000';
window.http=url;
axios.defaults.baseURL = url;
axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('access_token');
axios.defaults.headers.post['Content-Type'] = 'application/json';

/*iziToast*/
import 'izitoast/dist/css/iziToast.min.css'
import iziToastJs from 'izitoast/dist/js/iziToast.js'
window.iziToast = iziToastJs;

/*vue progress var*/
import VueProgressBar from 'vue-progressbar'
Vue.use(VueProgressBar, {
  color: 'rgb(143, 255, 199)',
  failedColor: 'red',
  height: '4px'
})

//vue pagination
Vue.component('pagination', require('laravel-vue-pagination'));

// Import the EventBus.
import { EventBus } from './event-bus.js';
window.bus = EventBus;

//Filter
import moment from 'moment';
Vue.filter('upperText',function (txt) {
  return txt.charAt(0).toUpperCase()+txt.slice(1);
});
Vue.filter('formateDate',function (dt) {
  return moment(dt).format('MMMM Do YYYY');
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

