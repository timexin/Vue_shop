import Vue from 'vue';
import Router from 'vue-router';
import Home from '../components/Home.vue';
import First from '../components/first.vue';

Vue.use(Router)

export default new Router({
  routes: [
    {  path: '/',component:Home,},
		{  path: '/user',component:First,},
  ]
})
