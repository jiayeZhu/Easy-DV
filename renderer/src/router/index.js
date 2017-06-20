import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import MainMenu from '@/components/MainMenu'
import Chart from '@/components/Chart'
import VuexTest from '@/components/VuexTest'
import DBPage from '@/components/DBConnect'
import DataFilterPage from '@/components/DataFilter'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainMenu',
      // component: Hello
      component: MainMenu,
      redirect: '/DB',
      children:[
        {
          path:'DB',
          component: DBPage
        },
        {
          path:'datafilter',
          component: DataFilterPage
        },
        {
          path:'echart',
          component: Chart
        },
        {
          path: 'vuextest',
          component: VuexTest
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
