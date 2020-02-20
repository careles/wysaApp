<template>
	<view>
		<view class="banner">
			<image class="banner-img" src="/static/shuijiao.jpg"></image>
			<view class="banner-title" @click="goOfficial">进入官网</view>
		</view>
		<view class="article-meta">
			<text class="article-author">游戏名</text>
			<text class="article-text">发表于</text>
			<text class="article-time">2019</text>
		</view>
		<view class="article-content">
			<!-- <rich-text :nodes="htmlNodes"></rich-text> -->
			游戏描述
			游戏描述
			游戏描述
			游戏描述
		</view>
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
						<image class="uni-media-list-logo" :src="value.cover"></image>
						<view class="uni-media-list-body">
							<view class="uni-media-list-text-top">{{ value.title }}</view>
							<view class="uni-media-list-text-bottom">
								<text>{{ value.author_name }}</text>
								<text>{{ value.published_at }}</text>
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
	import htmlParser from '@/common/html-parser'
	var dateUtils = require('../../common/util.js').dateUtils;
	const DETAIL_PAGE_PATH = '/pages/template/list2detail-detail/list2detail-detail';


	export default {
		data() {
			return {
				// 被点击首页导航菜单的索引
				currentIndexNav: '新闻',
				active: '',
				//首页导航数据
				navlist: [
					{id: "1",name: "新闻"},
					{id: "2",name: "攻略"},
					{id: "3",name: "活动"},
					{id: "4",name: "图片"},
					{id: "5",name: "视频"},
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
		onNavigationBarButtonTap(event) {
			const buttonIndex = event.index;
			if (buttonIndex === 0) {
				uni.showToast({
					title: '收藏操作'
				});
			}
		},
		methods: {
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
				let detail = {
					author_name: e.author_name,
					cover: e.cover,
					id: e.id,
					post_id: e.post_id,
					published_at: e.published_at,
					title: e.title
				};
				uni.navigateTo({
					url: '../detail/detail_post?detailDate=' + encodeURIComponent(JSON.stringify(detail))
				});
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
			},
			goOfficial() {
				// uni.navigateTo({
				// 	url:'/pages/detail/detail_game_official'
				// })
				uni.navigateTo({
					url: '/pages/detail/detail_official',
				});
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
		},
		components:{
			uniSection,
			uniSwiperDot,
			uniLoadMore
		}
	}
</script>

<style>
	.banner {
		display: flex;
		height: 460upx;
		overflow: hidden;
		position: relative;
		background-color: #ccc;
		z-index:9;
		position:sticky;
		top: 0;
	}

	.banner-img {
		width: 100%;
	}

	.banner-title {
		max-height: 84upx;
		overflow: hidden;
		position: absolute;
		left: 30upx;
		bottom: 30upx;
		width: 90%;
		font-size: 32upx;
		font-weight: 400;
		line-height: 42upx;
		color: white;
		z-index: 11;
	}

	.article-meta {
		padding: 20upx 40upx;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		color: gray;
	}

	.article-text {
		font-size: 26upx;
		line-height: 50upx;
		margin: 0 20upx;
	}

	.article-author,
	.article-time {
		font-size: 30upx;
	}

	.article-content {
		padding: 0 30upx;
		overflow: hidden;
		font-size: 30upx;
		margin-bottom: 30upx;
	}
	
	/* 首页导航 */
	.nav_wrap {
		z-index:9;
		position:sticky;
		top: 460rpx;
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
	.uni-media-list-logo {
		width: 180upx;
		height: 140upx;
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
