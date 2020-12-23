import Vue from 'vue';
import Router from 'vue-router';
import Login from '../page/Login.vue'
import Home from '../page/Home.vue'
import Welcome from '../page/Welcome.vue'
import Users from '../page/user/Users.vue'
Vue.use(Router)

 const router =new Router({
  routes: [
  {path:"",redirect:"/login"},
  {path:"/login",component:Login},
  {path:"/home",component:Home,redirect:"/welcome",children:[
  	{path:"/welcome",component:Welcome},
  	{path:"/users",component:Users},
  ]},

  ]
});
//路由监听守卫，让路由跳转前，防止用户直接跳转
router.beforeEach((to,from,next) => {
	if(to.path === '/login') return next();
	const tokenStr = window.sessionStorage.getItem('token');
	if(!tokenStr) {next('/login')};
	next();
});

export default router;
