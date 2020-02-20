  
<template>
	<view>
		<view class="u_info">
			<view class="title">昵称: </view>
			<input class="uni-input" value="测试" maxlength="10" @input="onKeyInput" />
		</view>
		<view class="u_info">
			<view class="title">性别: </view>
			<view style="flex: 6;">
				<picker @change="bindPickerChange" value="男" :range="array" range-key="name">
					<view class="uni-input">男</view>
				</picker>
			</view>
		</view>
		<view class="u_info" style="color: #666;" @click="nothing()">
			<view class="title">邮箱: </view>
			<input class="uni-input" value="12@qq.com" disabled="" maxlength="32" @input="onKeyInput" />
		</view>
		<view class="u_info">
			<view class="title">余额: </view>
			<input class="uni-input" value="11" disabled maxlength="10" @input="onKeyInput" />
		</view>
		<view class="u_info">
			<view class="title">创建时间: </view>
			<input class="uni-input" value="12312" maxlength="10" @input="onKeyInput" />
		</view>
		<view style="padding: 30rpx;">
			<button class="save_info" type="default" @click="updateUser()">保存</button>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				// baseUrl: this.GLOBAL.baseURL,
				user: '',
				birthday: '',
				array: [{name:'无'},{name: '男'}, {name:'女'}],
				inputValue: '',
			}
		},
		onShow() {
			this.user = uni.getStorageSync("user_key")
		},
		methods: {
			updateUser() {
				// console.log(this.user)
				let that = this
				uni.request({
					url: that.baseUrl + "/users/update",
					method: "POST",
					data: that.user,
					success(res) {
						if (res.data.code == 200) {
							uni.showToast({
							    icon: 'none',
								position: 'bottom',
							    title: res.data.msg
							});
							// console.log(res.data)
							that.user = res.data.result
							that.user.birthday = that.happenTimeFun(that.user.birthday)
							uni.setStorageSync("user_key", res.data.result)
						} else {
							uni.showToast({
							    icon: 'none',
								position: 'bottom',
							    title: res.data.msg
							});
						}
					}
				})
			},
			bindPickerChange: function(e) {
				// console.log('picker发送选择改变，携带值为：' + e.target.value)
				this.user.sex = e.target.value
			},
			nothing() {
				uni.showToast({
				    icon: 'none',
					position: 'bottom',
				    title: '邮箱是登录标识^_^, 暂不支持修改~'
				});
			},
			onKeyInput: function(event) {
				this.inputValue = event.target.value
			},
		}
	}
	
</script>

<style>
	.u_info{
		border-bottom: 1rpx solid #F5F2F0;
		padding: 30rpx;
		display: flex;
		justify-content: center;
	}
	
	.title {
		flex: 2;
		margin-top: 12upx;
	}
	.uni-input {
		flex: 6
	}
	
	.save_info{
		background:linear-gradient(-90deg,rgba(63,205,235,1),rgba(188,226,158,1));
	}
</style>