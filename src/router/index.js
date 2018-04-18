import Vue from 'vue'
import VueRouter from 'vue-router'
import {routers, appRouter} from './router';
Vue.use(VueRouter)


export const router = new VueRouter({
  routes: routers
});

router.beforeEach((to, from, next) => {
  next();
});

router.afterEach((to) => {
  window.scrollTo(0, 0);
});
