<template>
	<view class="page">
		<view class="user_count">
			<!-- 动态 -->
			<view class="dongtai count_item" >
				<text>$22</text>
				<text>余额</text>
			</view>
			<!-- 流水 -->
			<view class="fensi count_item" >
				<text><image src="../../static/icon/game.png"></image></text>
				<text>流水</text>
			</view>
		</view>
		<view class="liushui_title" style="margin-top: 220upx;border-bottom: 1upx solid rgba(63,205,235,1)">
			<text>最近记录</text><text style="font-size: 10upx;color: rgba(63,205,235,0.5);">(敬请期待~)</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		onNavigationBarButtonTap(event) {
			const buttonIndex = event.index;
			if (buttonIndex === 0) {
				uni.showToast({
					title: '提现操作'
				});
			}
		},
		methods: {
		},
		components:{
		}
	}
</script>

<style>
	.page{
		display: flex;
		justify-content: center;
	}
	.user_count{
		position: absolute;
		z-index: 99;
		width: 700upx;
		height: 200upx;
		/* background-color: #0077AA; */
		background:linear-gradient(-90deg,rgba(63,205,235,1),rgba(188,226,158,1));
		margin-top: 20upx;
		border-radius: 10upx;
		filter:alpha(Opacity=60);-moz-opacity:0.6;opacity: 0.6; 
		display: flex;
		justify-content: space-around;
	}
	
	.user_count .count_item{
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 50upx;
		color: #FFFDEF;
	}
	
	.user_count .count_item image{
		width: 40upx;
		height: 40upx;
	}
</style>
