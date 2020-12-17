<template>
<div>
	<h1>主页</h1>

<Floot></Floot>
</div>
</template>
<script>

	import Floot from "./Floot"
	export default {
		name:"Home",
		components:{
			Floot,
		},
		created(){
			this.$axios.post('user/getAll',{
		}).then((res)=>{
			console.log(res.data);
			})
		}
	}
</script>
<style >

</style>