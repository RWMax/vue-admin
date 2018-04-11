import Vue from 'vue'
import Router from 'vue-router'
import App from '@/containers/App'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '/',
      component: App,
      children: [
      	{
      		path: '/',
      		name: 'workplace',
      		component: () => import('@/containers/dashboard/WorkPlace')
      	},
      	{
      		path: '/dashboard/workplace',
      		name: 'workplace',
      		component: () => import('@/containers/dashboard/WorkPlace')
      	}
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/containers/login/Login')
    }
  ]
})
