<template>
	<view>
		 <category :categoryList="categoryList" :subCategoryList="subCategoryList" @categoryMainClick="categoryMainClick" @categorySubClick="categorySubClick" activeTextColor="rgba(63,205,235,1)"></category>
	</view>
</template>

<script>
	import category from "@/components/qiyue-category/qiyue-category.vue"
	export default {
		data() {
			return {
				categoryList:[],
				subCategoryList:[]
			}
		},
		methods: {
			categoryMainClick(category){
				this.subCategoryList = category.subCategoryList;
			},
			categorySubClick(category){
				console.log(category);
			}
		},
		mounted() {
			for(var i=0;i<20;i++){
				var subList = [];
				for(var j=0;j<30;j++){
					subList.push({"name":"分类"+i+":游戏"+j,"logo":"http://placehold.it/50x50"})
				}
				this.categoryList.push({"name":"分类"+i,"subCategoryList":subList})
			}
			this.subCategoryList = this.categoryList[0].subCategoryList;
		},
		/**
		 * 监听导航栏按钮
		 * @param {Object} e
		 */
		onNavigationBarButtonTap(e) {
			if (e.index === 1) {
				uni.navigateTo({
				    url: '/pages/search/search'
				});
			}
			if (e.index === 0) {
				uni.navigateTo({
				    url: '/pages/user/message'
				});
			}
		},
		components:{
			category
		}
	}
</script>

<style>

</style>
