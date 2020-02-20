<template>
    <view>
		<uni-fab ref="fab" :pattern="pattern" :content="content" :horizontal="horizontal" :vertical="vertical" :direction="direction" @trigger="trigger" />
		<ygc-comment ref="ygcComment" 
		            :placeholder="'发布评论'" 
		            @pubComment="pubComment"></ygc-comment>
        <view class="uni-padding-wrap">
            <!-- 评论区 start -->
            <view class="uni-comment">
                <view class="uni-comment-list" v-for="comment1 in comments">
                    <view class="uni-comment-face">
                        <image src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png" mode="widthFix"></image>
                    </view>
                    <view class="uni-comment-body" >
                        <view class="uni-comment-top">
                            <text>{{comment1.user}}</text>
                        </view>
                        <view class="uni-comment-content">{{comment1.content}}</view>
                        <view class="uni-comment-date">
                            <view>2天前</view>
                            <view class="uni-comment-replay-btn" @click="comment(1)">{{comment1.comments.length}}回复</view>
                        </view>
						<view class="uni-comment-list" v-for="comment2 in comment1.comments">
						    <view class="uni-comment-face">
						        <image src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png" mode="widthFix"></image>
						    </view>
						    <view class="uni-comment-body">
						        <view class="uni-comment-top">
						            <text>{{comment2.user}}</text>
						        </view>
						        <view class="uni-comment-content">{{comment2.content}}</view>
						        <view class="uni-comment-date">
						            <view>2天前</view>
						        </view>
						    </view>
						</view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
	import ygcComment from '@/components/ygc-comment/ygc-comment.vue';
	import uniFab from '@/components/uni-fab/uni-fab.vue'
    export default {
        data() {
			return {
				maskState: 0,
				directionStr: '垂直',
				horizontal: 'left',
				vertical: 'bottom',
				direction: 'horizontal',
				pattern: {
					color: 'rgba(188,226,158,1)',
					backgroundColor: '#fff',
					selectedColor: 'rgba(63,205,235,1)',
					buttonColor: 'rgba(63,205,235,1)'
				},
				content: [{
						iconPath: '/static/icon/comment.png',
						selectedIconPath: '/static/icon/comment.png',
						text: '评论',
						active: false
					},{
						iconPath: '/static/shilu-login/ty1.png',
						selectedIconPath: '/static/shilu-login/ty1.png',
						text: '打赏',
						active: false
					}
				],
				contentStatus: 0, // 0一级评论, 1 次级评论
			}
        },
		onBackPress() {
			if (this.$refs.fab.isShow) {
				this.$refs.fab.close()
				return true
			}
			return false
		},
		methods: {
			trigger(e) {
				this.content[e.index].active = !e.item.active
				if(e.index===0){
					// this.maskState = this.maskState === 1? 0 : 1
					this.comment(0) // 一级评论
				}
				if(e.index===1){
					uni.showModal({
						title: '提示',
						content: '确定要打赏?(系统默认打赏$1~)',
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定')
							} else if (res.cancel) {
								console.log('用户点击取消')
							}
						}
					})
				}
			},
			/**
			 * 显示评论
			 */
			comment(status) {
				this.contentStatus = status === 0 ? 0 : 1
				this.$refs.ygcComment.toggleMask('show')
			},
			/**
			 * 评论发布
			 */
			pubComment(){
				uni.showModal({
					title: '提示',
					content: this.$refs.ygcComment.content+this.contentStatus,
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定')
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})
			}
		},
		props:["comments"],
		components: {ygcComment,uniFab}
    }
</script>

<style>
    /* comment */
    page {
        background-color: #f8f8f8;
    }

    .uni-padding-wrap {
        padding: 30upx;
    }

    view {
        font-size: 28upx;
    }

    .uni-comment {
        padding: 5rpx 0;
        display: flex;
        flex-grow: 1;
        flex-direction: column;
    }

    .uni-comment-list {
        flex-wrap: nowrap;
        padding: 10rpx 0;
        margin: 10rpx 0;
        width: 100%;
        display: flex;
    }

    .uni-comment-face {
        width: 70upx;
        height: 70upx;
        border-radius: 100%;
        margin-right: 20upx;
        flex-shrink: 0;
        overflow: hidden;
    }

    .uni-comment-face image {
        width: 100%;
        border-radius: 100%;
    }

    .uni-comment-body {
        width: 100%;
    }

    .uni-comment-top {
        line-height: 1.5em;
        justify-content: space-between;
    }

    .uni-comment-top text {
        color: #0A98D5;
        font-size: 24upx;
    }

    .uni-comment-date {
        line-height: 38upx;
        flex-direction: row;
        justify-content: space-between;
        display: flex !important;
        flex-grow: 1;
    }

    .uni-comment-date view {
        color: #666666;
        font-size: 24upx;
        line-height: 38upx;
    }

    .uni-comment-content {
        line-height: 1.6em;
        font-size: 28upx;
        padding: 8rpx 0;
    }

    .uni-comment-replay-btn {
        background: #FFF;
        font-size: 24upx;
        line-height: 28upx;
        padding: 5rpx 20upx;
        border-radius: 30upx;
        color: #333 !important;
        margin: 0 10upx;
    }
	.uni-fab-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}
</style>
