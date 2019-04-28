// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import './config/rem'
import FastClick from 'fastclick'
// import store from './store/index.js'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import axios from "axios"
Vue.prototype.axios=axios;
import echarts from "echarts"
Vue.prototype.$echarts = echarts

if('addEventListener' in document){  //浏览器兼容判断
  document.addEventListener('DOMContentLoaded',function(){
    FastClick.attach(document.body);
  },false);
}

Vue.config.productionTip = false

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   components: { App },
//   template: '<App/>'
// })

new Vue({
  router
}).$mount("#app")
