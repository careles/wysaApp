<template>
	<view>
		<view class="uni-padding-wrap uni-common-mt" style="z-index:9;position: sticky;top: 25upx;">
			<uni-segmented-control :current="current" :values="items" style-type="button" active-color="rgba(63,205,235,1)" @clickItem="onClickItem" />
		</view>
		<view class="content">
			<view v-if="current === 0">
				<uni-swipe-action>
				    <uni-swipe-action-item :options="message.options" v-for="message in messages" @click="onClick" @change="change" v-if="message.status==1">
				        <view class='cont'>{{message.context}}</view>
				    </uni-swipe-action-item>
				</uni-swipe-action>
			</view>
			<view v-if="current === 1">
				<uni-swipe-action>
				    <uni-swipe-action-item :options="message.options" v-for="message in messages" @click="onClick" @change="change" v-if="message.status==0">
				        <view class='cont'>{{message.context}}</view>
				    </uni-swipe-action-item>
				</uni-swipe-action>
			</view>
		</view>
	</view>
</template>

<script>
	import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
	import uniSwipeActionItem from '@/components/uni-swipe-action-item/uni-swipe-action-item.vue'
	import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue'
	export default {
		data(){
			return {
			items: ['未读', '已读'],
			current: 0, // 选卡
			  messages: [{
				  "id": "1",
				  "context": "我是id为1的消息, 我默认已读",
				  "status": "0",
				  "options": null,
			  },{
				  "id": "2",
				  "context": "我是id为2的消息, 我默认未读",
				  "status": "1",
				  "options": null,
			  }],
			  status0:[
				{
					text: '标记为未读',
				},
				{
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}
			  ],
			  status1: [
				{
					text: '标记为已读',
					style: {
						backgroundColor: 'rgb(254,156,1)'
					}
				},
				{
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}
			  ],
			}
		},
		onLoad() {
			for (var i = 0; i < this.messages.length; i++) {
				
				if (this.messages[i].status == 0) {
					this.messages[i].options = this.status0
				}
				
				if (this.messages[i].status == 1) {
					this.messages[i].options = this.status1
				}
			}
		},
		methods:{
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
				}
			},
			onClick(e){
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '当前点击的是第'+e.index+'个按钮，点击内容是'+e.content.text
				});
			},
			change(open){
			  // console.log('当前开启状态：'+ open)
			}
		},
		components:{
			uniSwipeAction,uniSwipeActionItem,uniSegmentedControl
		}
	}
</script>

<style>
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #fff;
		min-height: 100%;
		height: auto;
	}

	view {
		font-size: 14px;
		line-height: inherit;
	}

	.example-body {
		flex-direction: column;
		padding: 15px;
		background-color: #ffffff;
	}

	.word-btn-white {
		font-size: 18px;
		color: #FFFFFF;
	}

	.word-btn {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		border-radius: 6px;
		height: 48px;
		margin: 15px;
		background-color: #007AFF;
	}

	.word-btn--hover {
		background-color: #4ca2ff;
	}


	.cont {
		flex: 1;
		height: 45px;
		line-height: 45px;
		padding: 0 15px;
		position: relative;
		background-color: #fff;
		font-size: 15px;
		border-bottom-color: #F5F5F5;
		border-bottom-width: 1px;
		border-bottom-style: solid;
	}

	.example-body {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		padding: 10px 0;
		background-color: #fff;
	}

	.button {
		border-color: #e5e5e5;
		border-style: solid;
		border-width: 1px;
		padding: 4px 8px;
		border-radius: 4px;
	}

	.button-text {
		font-size: 15px;
	}
	
</style>