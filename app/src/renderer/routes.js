import LandingPageView from 'components/LandingPageView';
import MainMenu from 'components/MainMenu';
import VuexTest from 'components/VuexTest';
import Chart from 'components/Chart'

export default [
  // {
  //   path: '/',
  //   name: 'landing-page',
  //   component: LandingPageView
  // },
  {
    path: '/',
    name: 'main-menu',
    component: MainMenu,
    children:[{
      path: 'echart',
      component: Chart
    },{
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
