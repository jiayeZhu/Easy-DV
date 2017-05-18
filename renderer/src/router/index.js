import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import MainMenu from '@/components/MainMenu'
import Chart from '@/components/Chart'
import VuexTest from '@/components/VuexTest'
import DBPage from '@/components/DBConnect'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      // component: Hello
      component: MainMenu,
      redirect: '/DB',
      children:[
        {
          path:'DB',
          component: DBPage
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
