<template>
	<view class="mask" :class="maskState===0 ? 'none' : maskState===1 ? 'show' : ''" @click="toggleMask">
		<view class="mask-content"  @click.stop.prevent="stopPrevent">
			<view class="mask-content-topbar">
				<view class="left" @click="toggleMask">取消</view>
				<view class="right" @click="pubComment">发布</view>
			</view>
			<view class="mask-content-input">
				<textarea class="textarea"
					v-model="content"
					:placeholder="placeholder"
					:cursor-spacing = "100"
					:show-confirm-bar = "false"
					:focus="maskState ? true : false"
					maxlength="140"></textarea>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "ygcComment",
		//属性
		props: {
			placeholder: {
				type: String
			}
		},
		data() {
			return {
				maskState: 0,
				content: ''
			};
		},
		methods: {
			stopPrevent(){},
			toggleMask(type){
				let timer = type === 'show' ? 10 : 300;
				let	state = type === 'show' ? 1 : 0;
				// this.maskState = 2;
				setTimeout(()=>{
					this.maskState = state;
				}, timer)
			},
			pubComment() {
				this.$emit('pubComment',this.content);
			}
		}
	}
</script>

<style lang="scss" scoped>
	$font-color-base: #606266;
	$base-color: #5A9BEC;
	.mask{
		display: flex;
		align-items: flex-end;
		position: fixed;
		left: 0;
		top: var(--window-top);
		bottom: 0;
		width: 100%;
		background: rgba(0,0,0,0);
		z-index: 9995;
		transition: .3s;
		-webkit-transition: .3s; 
		.mask-content{
			width: 100%;
			// min-height: 30vh;
			// max-height: 70vh;
			background: #FFFFFF;
			transform: translateY(100%);
			transition: 1s;
			-webkit-transition: 1s; 
			// overflow-y:scroll;
			display: flex;
			flex-direction: column;
			.mask-content-topbar{
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				padding: 20upx 30upx;
				font-size: 32upx;
				.left{
					color: $font-color-base;
				}
				.right{
					color: $base-color;
					font-weight: 500;
				}
			}
			.mask-content-input{
				width: 718upx;
				padding: 0 16upx 20upx;
				.textarea {
					height: 100px;
					width: 686upx;
					padding: 16upx;
					border:2upx solid #d5d5d6;
					border-radius: 8upx;
				}
			}
		}
		&.none{
			display: none;
		}
		&.show{
			background: rgba(0,0,0,.4);
			.mask-content{
				transform: translateY(0);
			}
		}
	}

</style>
