import Vue from 'vue';
import Electron from 'vue-electron';
import Resource from 'vue-resource';
import Router from 'vue-router';
import iView from 'iview';
import 'iview/dist/styles/iview.css';    // 使用 CSS

import App from './App'
import routes from './routes'

// import IEcharts from 'vue-echarts-v3';


Vue.use(Electron);
Vue.use(Resource);
Vue.use(Router);
Vue.use(iView);
// Vue.use(IEcharts);
Vue.config.debug = true;

const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes
})

/* eslint-disable no-new */
new Vue({
  router,
  ...App
}).$mount('#app')
