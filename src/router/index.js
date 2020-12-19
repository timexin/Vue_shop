import Vue from 'vue';
import Router from 'vue-router';
import Login from '../page/Login.vue'
import Home from '../page/Home.vue'
Vue.use(Router)

 const router =new Router({
  routes: [
  {path:"/login",component:Login},
  {path:"/home",component:Home},

  ]
});

router.beforeEach((to,from,next) => {
	if(to.path === '/login') return next();
	const tokenStr = window.sessionStorage.getItem('token');
	if(!tokenStr) {next('/login')};
	next();
});

export default router;
