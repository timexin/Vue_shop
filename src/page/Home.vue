<template>
	<el-container class="con">
  <el-header>
  <div class="joker">
		<img src="../assets/shakou.png">
		<div class="veryJoker"><span>原来我只是一个小丑</span></div>
  </div>
<el-button type="info" @click="exit"> 退出</el-button>
	</el-header>
  <el-container>
    <el-aside :width="isChange?'64px':'200px'">
    <div class="toggle-button" @click="change">|||</div>
     <el-menu
      background-color="#545c64"
      text-color="#fff" :collapse-transition="false"
      active-text-color="#ffd04b" :collapse="isChange" router
      :default-active = "activePath">
      <el-submenu :index="menu.id+''" v-for="menu in menuList" :key="menu.id">
        <template slot="title">
          <i :class="iconsObj[menu.id]"></i>
          <span slot="title">{{menu.authName}}</span>
        </template>
 			 <el-menu-item :index="'/'+child.path" v-for="child in menu.children" :key="child.id" @click="activePathCha('/'+child.path)">
 			 <template slot="title">
          <i class="el-icon-menu"></i>
          <span >{{child.authName}}</span>
        </template>
 			</el-menu-item>
      </el-submenu>

    </el-menu>
  </el-aside>
    <el-main>

    	<router-view></router-view>
  	</el-main>
  </el-container>
</el-container>
</template>
<script >
	export default{
data(){
	return {
			menuList:[],
			iconsObj:{
				'125':'el-icon-star-off',
				'103':'el-icon-s-cooperation',
				'101':'el-icon-s-opportunity',
				'102':'el-icon-edit-outline',
				'145':'el-icon-paperclip',
			},
			isChange:false,
			activePath:'',
	}
},

created(){
	this.getMenuList();
	this.activePath = window.sessionStorage.getItem("activePath");
},
methods:{
	exit(){
		window.sessionStorage.clear();
		this.$router.push('/login');
	},
	getMenuList(){
		this.$axios.get('menus').then((res =>{
			console.log(res.data);
			if(res.data.meta.status !=200){ return this.$message.error(res.data.meta.msg)};
			this.menuList = res.data.data;
		}))
	},
	change(){
			this.isChange = !this.isChange;
	},
	activePathCha(activePath){
			window.sessionStorage.setItem("activePath",activePath);
			this.activePath=activePath;
	},
}}
</script>
<style scoped>
.el-header{
	background-color:#B3C0D1;
	padding: 0;
	display: flex;
	justify-content: space-between;
}
.el-aside{
	background-color: #545c64;

}
.el-main{
	background-color: #E9EEF3;
}
.el-menu{
	border-right: none;
	}
.joker img{
	max-width:60px;
	float: left;
	box-sizing: border-box;
}
.veryJoker{
	margin-left: 60px;
	height: 60px;
	font-size: 20px;
	padding-top: 16.8px;
	color: #A5EF60;
}
.con{
	height: 100%;
}
.toggle-button{
	background-color: #E5B2D1;
	fong-size:10px;
	line-height: 22px;
	color: #fff;
	text-align: center;
	letter-spacing: 0.2em;
	cursor: pointer;
}


</style>