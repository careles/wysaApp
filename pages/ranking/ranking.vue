<template>
	<view class="content">
		<!-- 首页导航模块 -->
		<view class="nav_wrap">
			<scroll-view class="nav" scroll-x="true">
				<view @click="activeNav(nav.name, nav.id)" class="nav_item " :class=" {active : currentIndexNav == nav.name}" v-for="(nav, index) in navlist" >
					{{nav.name}}
				</view>
			</scroll-view>
		</view>
		<view class="posts">
			<view class="uni-list">
				<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(value, key) in listData" :key="key" @click="goDetail(value)">
					<view class="uni-media-list">
						<view class="uni-media-list-rank">{{key+1}}</view>
						<image class="uni-media-list-logo" :src="value.cover"></image>
						<view class="uni-media-list-body">
							<view class="uni-media-list-text-top">游戏名{{key}}</view>
							<view class="uni-media-list-text-bottom">
								<text>二级分类</text>
								<text>热度</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<uni-load-more :status="status"  :icon-size="16" :content-text="contentText" />
		</view>
	</view>
</template>

<script>
	import uniSection from '@/components/uni-section/uni-section.vue'
	import uniSwiperDot from '@/components/uni-swiper-dot/uni-swiper-dot.vue'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	var dateUtils = require('../../common/util.js').dateUtils;
	
	export default {
		data() {
			return {
				info: [
					{
						icon_url: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg',
						content: '我是新闻'
					},
					{
						icon_url: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/muwu.jpg',
						content: '我是活动'
					},
					{
						icon_url: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg',
						content: '我是游戏'
					},
				],
				current: 0,
				dotsStyles: {
					backgroundColor: 'rgba(63,205,235,0.3)',
					border: '1px rgba(63,205,235,0.3) solid',
					color: '#fff',
					selectedBackgroundColor: 'rgba(63,205,235,0.3)',
					selectedBorder: '1px rgba(63,205,235,0.3) solid',
				},
				// 被点击首页导航菜单的索引
				currentIndexNav: '全部',
				active: '',
				//首页导航数据
				navlist: [
					{id: "1",name: "全部"},
					{id: "2",name: "热门"},
					{id: "3",name: "竞技"},
					{id: "4",name: "网游"},
					{id: "5",name: "单机"},
				],
				listData: [],
				last_id: '',
				reload: false,
				status: 'more',
				contentText: {
					contentdown: '上拉加载更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				}
			}
		},
		onLoad() {
			this.getBanner();
			this.getList();
		},
		onPullDownRefresh() {
			this.reload = true;
			this.last_id = '';
			this.getBanner();
			this.getList();
		},
		onReachBottom() {
			this.status = 'more';
			this.getList();
		},
		methods: {
			/**
			 * 轮播图切换事件
			 * @param {Object} e
			 */
			change(e) {
				this.current = e.detail.current
			},
			backgroudC(e){
				
				 
				
				//示例: 获取元素距离顶部的距离
				// console.log(this.$refs['nav'].getBoundingClientRect().top())
				// console.log(event.currentTarget.scrollTop)
				console.log(e.detail.y)
			},
			/**
			 * 点击首页导航按钮
			 */
			activeNav(name, id) {
				// console.log("123")
				this.currentIndexNav = name
				let that = this
				// uni.request({
				// 	url: that.baseUrl + "/videos/cid/" + id,
				// 	success(res) {
				// 		// console.log(res)
				// 		if(res.data.code == 200) {
				// 			that.videoslist = []
				// 			that.videoslist = res.data.result
				// 			// console.log(this.navlist)
				// 		}
				// 		else {
				// 			that.videoslist = []
				// 			uni.showToast({
				// 				icon: 'none',
				// 				position: 'bottom',
				// 				title: res.data.msg
				// 			});
				// 		}
				// 	}
				// })
			},
			getBanner() {
				let data = {
					column: 'id,post_id,title,author_name,cover,published_at' //需要的字段名
				};
				uni.request({
					url: 'https://unidemo.dcloud.net.cn/api/banner/36kr',
					data: data,
					success: data => {
						uni.stopPullDownRefresh();
						if (data.statusCode == 200) {
							this.banner = data.data;
						}
					},
					fail: (data, code) => {
						console.log('fail' + JSON.stringify(data));
					}
				});
			},
			getList() {
				var data = {
					column: 'id,post_id,title,author_name,cover,published_at' //需要的字段名
				};
				if (this.last_id) {
					//说明已有数据，目前处于上拉加载
					this.status = 'loading';
					data.minId = this.last_id;
					data.time = new Date().getTime() + '';
					data.pageSize = 10;
				}
				uni.request({
					url: 'https://unidemo.dcloud.net.cn/api/news',
					data: data,
					success: data => {
						if (data.statusCode == 200) {
							let list = this.setTime(data.data);
							this.listData = this.reload ? list : this.listData.concat(list);
							this.last_id = list[list.length - 1].id;
							this.reload = false;
						}
					},
					fail: (data, code) => {
						console.log('fail' + JSON.stringify(data));
					}
				});
			},
			goDetail: function(e) {
				// let detail = {
				// 	author_name: e.author_name,
				// 	cover: e.cover,
				// 	id: e.id,
				// 	post_id: e.post_id,
				// 	published_at: e.published_at,
				// 	title: e.title
				// };
				// uni.navigateTo({
				// 	url: '../detail/detail_post?detailDate=' + encodeURIComponent(JSON.stringify(detail))
				// });
				uni.navigateTo({
					url: '../detail/detail_game'
				})
			},
			setTime: function(items) {
				var newItems = [];
				items.forEach(e => {
					newItems.push({
						author_name: e.author_name,
						cover: e.cover,
						id: e.id,
						post_id: e.post_id,
						published_at: dateUtils.format(e.published_at),
						title: e.title
					});
				});
				return newItems;
			}
		},
		/**
		 * 当 searchInput 配置 disabled 为 true 时触发
		 */
		onNavigationBarSearchInputClicked(e) {
			uni.navigateTo({
				url: '/pages/search/search'
			});
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
		components: {
			uniSection,
			uniSwiperDot,
			uniLoadMore
		}
	}
</script>

<style>
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		min-height: 100%;
		height: auto;
		background-color: #fff; 
	}

	view {
		font-size: 14px;
		line-height: inherit;
	}

	.swiper-box {
		height: 200px;
	}

	.swiper-item {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: #999;
		color: #fff;
	}

	.image {
		width: 750rpx;
	}
	
	.game{
		display: flex;
		padding: 25upx;
		justify-content: space-around;
		border-bottom: 1upx solid rgba(63,205,235,0.1);
	}
	
	.game_item{
		width: 140upx;
		height: 140upx;
		border-radius: 10upx;
		/* background-color: #ffff; */
		background:linear-gradient(-90deg,rgba(63,205,235,0.3),rgba(188,226,158,0.3));
		color: rgba(63,205,235,1);
		font-size: 110upx;
		display: flex;
		justify-content: space-around;
	}

	/* 首页导航 */
	.nav_wrap {
		z-index:9;
		position:sticky;
		top: 0rpx;
		box-shadow: 0px 2px 6px rgba(63,205,235,0.3);
		background-color: #FFFFFF;
		/* background:linear-gradient(-90deg,rgba(63,205,235,0.3),rgba(188,226,158,0.3)); */
	}
	
	.nav {
		white-space: nowrap;
		padding: 5rpx 0;
	}
	.nav_item {
		padding: 20rpx 45rpx;
		font-size: 30rpx;
		display: inline-block;
		color: rgba(63,205,235,1);
	}
	.nav_item.active {
		border-bottom: 5rpx solid rgba(188,226,158,1);
		color: rgba(188,226,158,1);
	}

	.uni-media-list-rank{
		width: 100upx;
		height: 140upx;
		display: flex;
		justify-content: center;
		align-content: center;
		align-items: center;
		font-size: 60upx;
		background-image: -webkit-linear-gradient(left,rgba(63,205,235,1),rgba(188,226,158,0.1),rgba(63,205,235,0.2),rgba(188,226,158,0.3),rgba(63,205,235,0.4), rgba(188,226,158,0.5),rgba(63,205,235,0.6),rgba(188,226,158,0.7),rgba(63,205,235,0.8),rgba(188,226,158,0.9),rgba(63,205,235,0.3) 100%);
		-webkit-text-fill-color: transparent;/* 将字体设置成透明色 */
		-webkit-background-clip: text;/* 裁剪背景图，使文字作为裁剪区域向外裁剪 */
		-webkit-background-size: 200% 100%; 
		-webkit-animation: masked-animation 4s linear infinite;
	}
	
	.uni-media-list-logo {
		width: 140upx;
		height: 140upx;
		border-radius: 20upx;
	}

	.uni-media-list-body {
		height: auto;
		justify-content: space-around;
		margin-left: 15upx;
	}

	.uni-media-list-text-top {
		height: 74upx;
		font-size: 28upx;
		overflow: hidden;
	}

	.uni-media-list-text-bottom {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
</style>


