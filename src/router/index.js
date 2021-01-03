import Vue from 'vue';
import Router from 'vue-router';
import Login from '../page/Login.vue'
import Home from '../page/Home.vue'
import Welcome from '../page/Welcome.vue'
import Users from '../page/user/Users.vue'
import Test from '../page/Test.vue'
import Rights from "../page/user/Rights";
Vue.use(Router)

 const router =new Router({
  routes: [
  {path:"",redirect:"/login"},
  {path:"/login",component:Login},
    {path:"/test",component:Test},
  {path:"/home",component:Home,redirect:"/welcome",children:[
  	{path:"/welcome",component:Welcome},
  	{path:"/users",component:Users},
      {path:"/rights",component: Rights}
  ]},

  ]
});
//路由监听守卫，让路由跳转前，防止用户直接跳转
router.beforeEach((to,from,next) => {
	if(to.path === '/login' || to.path ==='/test') return next();
	const tokenStr = window.sessionStorage.getItem('token');
	if(!tokenStr) {next('/login')};
	next();
});

export default router;
