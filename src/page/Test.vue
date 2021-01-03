<template>
	<div class="home_container">
		<!-- 登录区域 -->
			<div class="login_box">
			<!-- 头像区域 -->
					<div class="avator_box">
						<img class="mywife" src="../assets/login.jpg">
					</div>
					<el-form  ref="recome" class="login_form"  :model="form" :rules="rules">
						<!-- 用户名 -->
 			 					<el-form-item prop="username">
      								<el-input placeholder="请输入用户名" v-model="form.username"
   												 prefix-icon="el-icon-user-solid"
   													 ></el-input>
 								 </el-form-item>

								<el-form-item prop="password">
      								<el-input placeholder="请输入密码" v-model="form.password"
      						show-password	prefix-icon="el-icon-star-on"	></el-input>
 								 </el-form-item>

 								 <el-form-item>
 								 	<el-col :span ="16" :offset="2">
    	<el-button class="btns" type="primary" @click="login">登录</el-button></el-col>
   	  <el-button   class="btns"  type="info" @click="onSubmit">重置</el-button>
  </el-form-item>
 					</el-form>
			</div>
	</div>
</template>
<script >
	export default{
 		data() {
      return {
        form:{username:'admin',password:'123456'},
        rules:{
        	username:
        	[
        	{ required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
          ],
          password:[
					{ required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
        },
      }
   			 },
   	methods:{
   	//重置表单
   			onSubmit(){
   					console.log(this);
   					this.$refs.recome.resetFields();
   			},
   	//表单预验证(validate 预验证方法)
   		login(){
   			this.$refs.recome.validate(valid=>{
   					if(valid){
   						this.$axios.post('login',this.form).then(res =>{
   							console.log(res.data);
   						if (res.data.meta.status == 200) {
   							this.$message.success(res.data.meta.msg);
   						}else{
   							this.$message.error(res.data.meta.msg);
   						}
   						//将token存储在sessionStorage
   						window.sessionStorage.setItem("token",res.data.data.token);
   						//路由定向
   							this.$router.push("/home");

   						});
   					};
   			});
   		},
   	}

	}
</script>
<style  scoped>
.home_container{
	background-color: #2b4b6b;
	height: 100%;
}
.login_box{
	background-color: #FFFFFF;
	width:450px;
	height: 300px;
	border-radius: 3px;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%,-50%);
}

.avator_box{
	width: 130px;
	height: 130px;
	border-radius: 50%;
	border: 1px solid #ddd;
	position: absolute;
	left: 50%;
	transform: translate(-50%,-50%);

}
.mywife{
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	.login_form{
		position:absolute;
		bottom: 0;
		width: 100%;
		padding:0px 20px;
		box-sizing: border-box;
	}


</style>