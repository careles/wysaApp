<template>
	<view>
		<view class="header">
			<view class="img-view">
				<image :src="imgUrls" class="background-image"></image>
			</view>
			<view class="user_icon_view">
				<image :src="user_icon" class="user_icon" v-if="isLogin"></image>
				<image src="../../static/shilu-login/logo.png" class="user_icon" v-if="!isLogin"></image>
			</view>
			<view class="user_count" v-if="isLogin">
				<!-- 动态 -->
				<view class="dongtai count_item" >
					<text>22</text>
					<text>动态</text>
				</view>
				<!-- 关注 -->
				<view class="guanzhu count_item">
					<text>11</text>
					<text>关注</text>
				</view>
				<!-- 粉丝 -->
				<view class="fensi count_item" >
					<text>22</text>
					<text>粉丝</text>
				</view>
			</view>
			<view class="user_count" v-if="!isLogin">
				<text class="tips">登录开启更多知识~</text>
			</view>
		</view>
		<view class="menu" v-if="isLogin">
			<uni-list>
				<navigator url="/pages/user/money">
					<uni-list-item :show-extra-icon="true" :extra-icon="shop" title="钱包" />
				</navigator>
				<navigator url="/pages/user/info">
					<uni-list-item :show-extra-icon="true" :extra-icon="person" title="个人信息" />
				</navigator>
				<navigator url="/pages/user/collect">
					<uni-list-item :show-extra-icon="true" :extra-icon="star" title="个人收藏" />
				</navigator>
				<navigator url="/pages/user/post">
					<uni-list-item :show-extra-icon="true" :extra-icon="upload" title="创作投稿" />
				</navigator>
				<navigator url="/pages/user/message">
					<uni-list-item :show-badge="true" :show-extra-icon="true" :extra-icon="chat" title="系统通知" badge-text="12" />
				</navigator>
			</uni-list>
		</view>
		<button type="default" @click="toLogin" class="toLogin" v-if="!isLogin">登录/注册</button>
	</view>
</template>

<script>
	import uniSection from '@/components/uni-section/uni-section.vue'
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	
	export default {
		data() {
			return {
				imgUrls: "/static/shuijiao.jpg",
				user_icon: "/static/logo.png",
				shop: {
					color: 'rgba(63,205,235,1)',
					size: '22',
					type: 'shop'
				},
				person: {
					color: 'rgba(63,205,235,1)',
					size: '22',
					type: 'person'
				},
				chat: {
					color: 'rgba(63,205,235,1)',
					size: '22',
					type: 'chat'
				},
				upload: {
					color: 'rgba(63,205,235,1)',
					size: '22',
					type: 'upload'
				},
				star: {
					color: 'rgba(63,205,235,1)',
					size: '22',
					type: 'star'
				},
			}
		},
		methods: {
			/**
			 * 去登录页
			 */
			toLogin(){
				uni.navigateTo({
				    url: '/pages/login/login'
				});
			}
		},
		onShow() {
			// 判断是否登陆
			let user = uni.getStorageSync('user_key')
			if (!user) {
				this.isLogin = false
			} else {
				
				this.isLogin = true
			}
		},
		/**
		 * 监听导航栏按钮
		 * @param {Object} e
		 */
		onNavigationBarButtonTap(e) {
			if (e.index === 0) {
				uni.navigateTo({
				    url: '/pages/user/set'
				});
			}
		},
		components: {
			uniSection,
			uniList,
			uniListItem
		}
	}
</script>

<style>
	.header{
		display: flex;
		justify-content: center;
	}
	
	.background-image,
	.img-view {
		width: 750upx;
		height: 500upx;
		
	}
	
	.user_icon_view {
		position: absolute;
		z-index: 99;
		width: 220upx;
		height: 220upx;
		box-shadow:0upx 12upx 13upx 0upx rgba(63,205,235,0.47);
		margin-top: 100upx;
		border-radius: 50%;
	}
	
	.user_icon_view .user_icon{
		width: 220upx;
		height: 220upx;
		border-radius: 50%;
	}
	
	.user_count{
		position: absolute;
		z-index: 99;
		width: 650upx;
		height: 200upx;
		/* background-color: #0077AA; */
		background:linear-gradient(-90deg,rgba(63,205,235,1),rgba(188,226,158,1));
		margin-top: 400upx;
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
	}
	
	.menu{
		margin-top: 105upx;
	}
	
	.tips{
		position: absolute;
		color: #FFFFFF;
		font-size: 33upx;
		margin-top: 76upx;
	}
	
	.toLogin{
		margin-top: 500upx;
		width: 60%;
		background:linear-gradient(-90deg,rgba(63,205,235,1),rgba(188,226,158,1));
	}
</style>
