<template>
  <div>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    <el-breadcrumb-item>权限列表</el-breadcrumb-item>
  </el-breadcrumb>


  <el-card class="box-card" >


  </el-card>

  </div>

</template>

<script>
    export default {
        name: "Purview",
        data(){
          return {
            rightsList:[]
          }
        },
        created() {
          this.getRightsList();
        },
        methods:{
          getRightsList(){
            this.$axios.get('rights/list').then((res) =>{
              if(res.data.meta.status != 200) return this.$message.error("获取权限列表失败");
              this.rightsList= res.data.data;
            })
          }
        }
    }
</script>

<style scoped>

</style>
