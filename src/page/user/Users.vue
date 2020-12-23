<template>
	<div>
		<el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>用户管理</el-breadcrumb-item>
  <el-breadcrumb-item>用户列表</el-breadcrumb-item>
</el-breadcrumb>
<el-card class="box-card">
<el-row :gutter="50">
	<el-col :span="9" >
		<el-input placeholder="请输入内容"  v-model="queryInfo.query" clearable  @clear="getUsers">
    <el-button slot="append" @click="search" icon="el-icon-search"></el-button>
  </el-input>
	</el-col >
	<el-col :span="4">
 <el-button type="primary" @click="dialogVisible = true">添加人员</el-button>
	</el-col>
</el-row>

<!-- 表格展示 -->
<el-table  stripe border
      :data="userList"
     >
			<el-table-column
       type = "index"
       >
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
       >
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话"
        >
      </el-table-column>
      <el-table-column
        prop="email"

        label="邮箱">
      </el-table-column>
       <el-table-column
        prop="mg_state"
        label="状态"
        >
        <template  slot-scope="scope">
        	<el-switch v-model="scope.row.mg_state" @change="changeStatus(scope.row)"></el-switch>
        </template>
      </el-table-column>
 			<el-table-column
        label="操作" width="200px"
       >
       <template slot-scope="scope" >
				<el-button type="primary" icon="el-icon-edit" size="mini" @click ="userEdit(scope.row.id)"></el-button>
				<el-button type="danger" icon="el-icon-delete"  @click="deleteUser(scope.row.id)" size="mini"></el-button>
				 <el-tooltip class="item" effect="dark" content="角色设置" placement="top"  :enterable="false">
     <el-button type="warning" icon="el-icon-s-tools" size="mini"></el-button>
    </el-tooltip>

       </template>
      </el-table-column>
</el-table>

<!-- 分页区域 -->
 <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
</el-card>
<!-- 弹出用户添加界面 -->
<el-dialog
  title="添加人员"
  :visible.sync="dialogVisible"
  width="50%" @close="closeDialog() "
 >
<el-form :model="addForm"  ref="addFormUser" :rules="addrules" label-width="100px" >
  <el-form-item label="姓名" prop="username">
    <el-input v-model="addForm.username"></el-input>
  </el-form-item>
<el-form-item label="密码" prop="password">
    <el-input v-model="addForm.password"></el-input>
  </el-form-item>
   <el-form-item label="电话" prop="mobile">
    <el-input v-model="addForm.mobile"></el-input>
  </el-form-item>
<el-form-item label="邮箱" prop="email">
    <el-input v-model="addForm.email"></el-input>
  </el-form-item>
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addNewuser()">确 定</el-button>
  </span>
</el-dialog>
<!-- 弹出用户修改界面 -->
<el-dialog
  title="提示"
  :visible.sync="userdiaVisible" @close="closeDiaUser() "
  width="50%"
 >
	<el-form :model="editForm" ref="editFormUser" label-width="100px">
		<el-form-item label="姓名">
			<el-input disabled v-model="editForm.username"></el-input>
		</el-form-item>
		<el-form-item label="电话" >
			<el-input v-model="editForm.mobile"></el-input>
		</el-form-item>
<el-form-item label="邮箱">
			<el-input v-model="editForm.email"></el-input>
		</el-form-item>
	</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="userdiaVisible = false">取 消</el-button>
    <el-button type="primary" @click="sureEdit()">确 定</el-button>
  </span>
</el-dialog>
	</div>

</template>
<script >
export default{

created(){
	this.getUsers();
},
data(){
	var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }
          callback();

      };
	return{
		queryInfo:{
			query:'',
			pagenum:1,
			pagesize:2,
		},
		userList:[],
		total:0,
		dialogVisible:false,
		userdiaVisible:false,
		addForm:{
				username:'',
				password:'',
				mobile:'',
				email:'',
		},
		editForm:{},
		addrules:{
 			username:	[
 			{ required: true, message: '请输入活动名称', trigger: 'blur' },
      { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
          ],
      password:[
			{validator:validatePass,trigger:'blur'},
      ]
		}
	}

},
methods:{
		getUsers(){
			this.$axios.get('users',{
				params:this.queryInfo
			}).then((res => {
				console.log(res.data);
				if(res.data.meta.status !=200) return this.$message.error("获取用户信息失败");
				this.userList = res.data.data.users;
				this.total = res.data.data.total;
			}));
		},
			handleSizeChange(val) {
        this.queryInfo.pagesize=val;
        this.getUsers();
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.queryInfo.pagenum=val;
        this.getUsers();
      },
      changeStatus(userInfo){

      	this.$axios.put(`users/${userInfo.id}/state/${userInfo.mg_state}`).then((res => {
      		if(res.data.meta.status != 200 ) return this.$message.error("设置人员状态失败");
      		this.$message.success("设置人员状态成功");
      	}) )
      },
      search(){
      	this.getUsers();
      },
      closeDialog(){
      	this.$refs.addFormUser.resetFields();
      },
      closeDiaUser(){
      	this.$refs.editFormUser.resetFields();
      },
      addNewuser(){
      	this.$refs.addFormUser.validate(valid => {
      		if(!valid) return;
      		this.$axios.post('users',this.addForm).
      		then((res) =>{
      			console.log(res.data);
      		if(res.data.meta.status !=201){
      			this.$message.error("添加用户失败");
      		}else{
      			this.$message.success("添加用户成功");
      		}
      		})
      		this.dialogVisible = false;
      		this.getUsers();
      	})
      },
      userEdit(id){
      	this.userdiaVisible = true;
      	this.$axios.get('users/'+id).then((res) =>{
      			console.log(res.data);
      	this.editForm=res.data.data;

      	});
      },
			sureEdit(){
				this.$refs.editFormUser.validate(valid =>{
					if(!valid) return;
					this.$axios.put('users/'+this.editForm.id,{
					email:this.editForm.email,
					mobile:this.editForm.mobile,
					}).then((res) => {
						if(res.data.meta.status!==200){
							return this.$message.error("更新用户信息失败");
						}
				this.userdiaVisible = false;
						this.getUsers();
						this.$message.success('更新用户信息成功');

					})
				});
			},
			deleteUser(id){
			this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        	}).then(() => {
        	this.$axios.delete('users/'+id).then((res) => {
        		if(res.data.meta.status !== 200) return this.$message.error("删除用户失败");
        	})
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
			this.getUsers();
			},

}

}

</script>
<style >
  .box-card {
    width: 100%;
  }

</style>