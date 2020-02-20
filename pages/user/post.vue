<template>
	<view>
		<view class="uni-padding-wrap uni-common-mt" style="z-index:9;position: sticky;top: 25upx;">
			<uni-segmented-control :current="current" :values="items" style-type="button" active-color="rgba(63,205,235,1)" @clickItem="onClickItem" />
		</view>
		<view class="content">
			<view v-show="current === 0">
				<view class="uni-list">
					<view class="uni-list-cell" hover-class="uni-list-cell-hover" @click="goDetail(value)">
						<view class="uni-media-list">
							<image class="uni-media-list-logo" src="../../static/shuijiao.jpg"></image>
							<view class="uni-media-list-body">
								<view class="uni-media-list-text-top">标题</view>
								<view class="uni-media-list-text-bottom">
									<text>已发布</text>
									<text>时间</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view v-show="current === 1">
				<view class="uni-list">
					<view class="uni-list-cell" hover-class="uni-list-cell-hover" @click="goDetail(value)">
						<view class="uni-media-list">
							<image class="uni-media-list-logo" src="../../static/shuijiao.jpg"></image>
							<view class="uni-media-list-body">
								<view class="uni-media-list-text-top">标题</view>
								<view class="uni-media-list-text-bottom">
									<text style="color: red;">违规退回</text>
									<text>时间</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view v-show="current === 2">
				<view class="example-body">
					<uni-steps :options="list1" active-color="rgba(63,205,235,1)" :active="active" />
				</view>
				<view>
					<view v-show="active==0" style="padding: 30upx;">
						<button class="tougao" type="default" @click="postClass('新闻投稿')">新闻投稿</button>
						<button class="tougao" type="default" @click="postClass('攻略投稿')">攻略投稿</button>
						<button class="tougao" type="default" @click="postClass('图片投稿')">图片投稿</button>
						<button class="tougao" type="default" @click="postClass('视频投稿')">视频投稿</button>
						<text>你选择了 <text style="color: #00BFFF;">{{postType}}</text></text>
					</view>
					<view v-show="active==1">
						<text style="color: rgba(63,205,235,0.3);">点击图片选择封面</text>
						<view class="post_icon" style="display: flex;justify-content: center;">
							<image @click="chooseIcon()" :src="postIcon" style="border-radius: 20upx;width: 270upx;height: 210upx;"></image>
						</view>
						<view class="u_info">
							<view class="title">分类一: </view>
							<view style="flex: 6;">
								<picker @change="bindPickerChange" value="竞技" :range="cateOne" range-key="name">
									<view class="uni-input">竞技</view>
								</picker>
							</view>
						</view>
						<view class="u_info">
							<view class="title">分类二: </view>
							<view style="flex: 6;">
								<picker @change="bindPickerChange" value="益智" :range="cateTwo" range-key="name">
									<view class="uni-input">益智</view>
								</picker>
							</view>
						</view>
						<view class="u_info">
							<view class="title">游戏名: </view>
							<view style="flex: 6;">
								<picker @change="bindPickerChange" value="益智" :range="games" range-key="name">
									<view class="uni-input">益智</view>
								</picker>
							</view>
						</view>
						<view class="u_info">
							<view class="title">稿件标题: </view>
							<input class="uni-input" value="测试" maxlength="10" @input="onKeyInput" />
						</view>
					</view>
					<view v-show="active==2" class="container">
						<view class="page-body">
							<view class='wrapper' style="z-index: 10;">
								<view class='toolbar' @tap="format">
									<view :class="formats.bold ? 'ql-active' : ''" class="iconfont icon-zitijiacu" data-name="bold"></view>
									<view :class="formats.italic ? 'ql-active' : ''" class="iconfont icon-zitixieti" data-name="italic"></view>
									<view :class="formats.underline ? 'ql-active' : ''" class="iconfont icon-zitixiahuaxian" data-name="underline"></view>
									<view :class="formats.strike ? 'ql-active' : ''" class="iconfont icon-zitishanchuxian" data-name="strike"></view>
									<view :class="formats.align === 'left' ? 'ql-active' : ''" class="iconfont icon-zuoduiqi" data-name="align"
									 data-value="left"></view>
									<view :class="formats.align === 'center' ? 'ql-active' : ''" class="iconfont icon-juzhongduiqi" data-name="align"
									 data-value="center"></view>
									<view :class="formats.align === 'right' ? 'ql-active' : ''" class="iconfont icon-youduiqi" data-name="align"
									 data-value="right"></view>
									<view :class="formats.align === 'justify' ? 'ql-active' : ''" class="iconfont icon-zuoyouduiqi" data-name="align"
									 data-value="justify"></view>
									<view :class="formats.lineHeight ? 'ql-active' : ''" class="iconfont icon-line-height" data-name="lineHeight"
									 data-value="2"></view>
									<view :class="formats.letterSpacing ? 'ql-active' : ''" class="iconfont icon-Character-Spacing" data-name="letterSpacing"
									 data-value="2em"></view>
									<view :class="formats.marginTop ? 'ql-active' : ''" class="iconfont icon-722bianjiqi_duanqianju" data-name="marginTop"
									 data-value="20px"></view>
									<view :class="formats.previewarginBottom ? 'ql-active' : ''" class="iconfont icon-723bianjiqi_duanhouju"
									 data-name="marginBottom" data-value="20px"></view>
									<view class="iconfont icon-clearedformat" @tap="removeFormat"></view>
									<view :class="formats.fontFamily ? 'ql-active' : ''" class="iconfont icon-font" data-name="fontFamily" data-value="Pacifico"></view>
									<view :class="formats.fontSize === '24px' ? 'ql-active' : ''" class="iconfont icon-fontsize" data-name="fontSize"
									 data-value="24px"></view>
				
									<view :class="formats.color === '#0000ff' ? 'ql-active' : ''" class="iconfont icon-text_color" data-name="color"
									 data-value="#0000ff"></view>
									<view :class="formats.backgroundColor === '#00ff00' ? 'ql-active' : ''" class="iconfont icon-fontbgcolor"
									 data-name="backgroundColor" data-value="#00ff00"></view>
				
									<view class="iconfont icon-date" @tap="insertDate"></view>
									<view class="iconfont icon--checklist" data-name="list" data-value="check"></view>
									<view :class="formats.list === 'ordered' ? 'ql-active' : ''" class="iconfont icon-youxupailie" data-name="list"
									 data-value="ordered"></view>
									<view :class="formats.list === 'bullet' ? 'ql-active' : ''" class="iconfont icon-wuxupailie" data-name="list"
									 data-value="bullet"></view>
									<view class="iconfont icon-undo" @tap="undo"></view>
									<view class="iconfont icon-redo" @tap="redo"></view>
				
									<view class="iconfont icon-outdent" data-name="indent" data-value="-1"></view>
									<view class="iconfont icon-indent" data-name="indent" data-value="+1"></view>
									<view class="iconfont icon-fengexian" @tap="insertDivider"></view>
									<view class="iconfont icon-charutupian" @tap="insertImage"></view>
									<view :class="formats.header === 1 ? 'ql-active' : ''" class="iconfont icon-format-header-1" data-name="header"
									 :data-value="1"></view>
									<view :class="formats.script === 'sub' ? 'ql-active' : ''" class="iconfont icon-zitixiabiao" data-name="script"
									 data-value="sub"></view>
									<view :class="formats.script === 'super' ? 'ql-active' : ''" class="iconfont icon-zitishangbiao" data-name="script"
									 data-value="super"></view>
									<view class="iconfont icon-shanchu" @tap="clear"></view>
									<view :class="formats.direction === 'rtl' ? 'ql-active' : ''" class="iconfont icon-direction-rtl" data-name="direction"
									 data-value="rtl"></view>
				
								</view>
				
								<editor @input="postContent" id="editor" class="ql-container" :placeholder="placeholder" showImgSize showImgToolbar showImgResize
								 @statuschange="onStatusChange" :read-only="readOnly" @ready="onEditorReady">
								</editor>
							</view>
						</view>
					</view>
					<view v-show="active==3">
						<uni-section title="标签预览" type="line"></uni-section>
						<view class="uni-list">
							<view class="uni-list-cell" hover-class="uni-list-cell-hover" @click="goDetail(value)">
								<view class="uni-media-list">
									<image class="uni-media-list-logo" src="value.cover"></image>
									<view class="uni-media-list-body">
										<view class="uni-media-list-text-top">标题</view>
										<view class="uni-media-list-text-bottom">
											<text>发布人</text>
											<text>时间</text>
										</view>
									</view>
								</view>
							</view>
						</view>
						<uni-section title="文章预览" type="line"></uni-section>
						<u-parse :content="postContentHtml" @preview="preview" @navigate="navigate" ></u-parse>
					</view>
				</view>
				<view style="padding: 30rpx;display: flex;justify-content: center;">
					<button class="save_info" type="default" @click="changeUp()" v-if="active != 0 ">上一步</button>
					<button class="save_info" type="default" @click="changeDown()" v-if="active != 3 && postType != null">下一步</button>
					<button class="save_info_f" type="default" v-if="active == 3">发布</button>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import uniSteps from '@/components/uni-steps/uni-steps.vue'
	import uniSection from '@/components/uni-section/uni-section.vue'
	import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue'
	import uParse from '@/components/u-parse/u-parse.vue'
	export default {
		data() {
			return {
				// baseUrl: this.GLOBAL.baseURL,
				items: ['发布', '草稿', '投稿'],
				current: 0, // 选卡
				user: '',
				birthday: '',
				cateOne: [{name:'无'},{name: '男'}, {name:'女'}],
				cateTwo: [{name:'无'},{name: '男'}, {name:'女'}],
				games: [{name:'无'},{name: '男'}, {name:'女'}],
				inputValue: '',
				active: 0, // 投稿步骤
				postType: null, // 投稿类型
				list1: [{
					title: '类型'
				}, {
					title: '信息'
				}, {
					title: '写稿'
				}, {
					title: '预览'
				}],
				readOnly: false,
				formats: {},
				placeholder: "开始输入...",
				postContentHtml: null,// 富文本html格式内容
				postContentText: null,// 富文本无格式内容
				postIcon: '../../static/shuijiao.jpg',
				newIcon: '', // 稿件预览图
				orderIcon: '' // 稿件旧图
			}
		},
		onShow() {
			this.user = uni.getStorageSync("user_key")
		},
		methods: {
			/**
			 * 上传图片
			 */
			updateIcon() {
				let that = this
				// console.log(that.user)
				// var user = that.user
				wx.uploadFile({
					url: that.baseUrl + '/users/updateIcon/' + that.user.id,
					filePath: that.user.icon, 
					name:'file',
					// fromData: user, // 把user传上去, 再后端修改头像路径
					// header: {"content-type": "multipart/form-data"},
					success: (res) =>{
						// console.log(res.data)
						var result = res.data
						var jsonStr= res.data;
						jsonStr = jsonStr.replace(" ","");
						if(typeof jsonStr!= 'object'){
						  jsonStr= jsonStr.replace(/\ufeff/g,"");//重点
						  var jj = JSON.parse(jsonStr);
						  res.data = jj;
						}
						if (res.data.code == 200){
							uni.showToast({
								icon: 'none',
								position: 'bottom',
								title: res.data.msg
							})
							uni.setStorageSync("user_key", res.data.result)
							that.user = uni.getStorageSync("user_key")
							console.log(that.user)
						} else {
							uni.showToast({
								icon: 'none',
								position: 'bottom',
								title: res.data.msg
							})
						}
					}
				}) 
			},
			/**
			 * 选择图片
			 */
			chooseIcon() {
				// console.log(11)
				let that = this
				uni.chooseImage({
					count: 1, // 一张头像
					sizeType: ['original'], // 原图
					sourceType:['album'], // 从相册选择
					success: function (res) {
						that.newIcon = res.tempFilePaths[0];
						// 备份院头像路径
						// console.log(res.tempFilePaths[0])
						that.orderIcon = that.postIcon
						// 更换当前头像为新头像
						that.postIcon = that.newIcon
						// 是否确认修改
						uni.showModal({
							content: "确定更换吗~",
							success(res) {
								if(res.confirm) {
									// 上传到后台
									// that.updateIcon()
									uni.showToast({
									    icon: 'none',
										position: 'bottom',
									    title: '假装上传到后台'
									});
								} else {
									// 恢复旧头像
									that.postIcon = that.orderIcon
								}
							}
						})
					}
				})
				// console.log(that.userIcon)
				// uni.uploadFile({
				// 	url: '',
				// 	filePath: that.userIcon
				// })
			},
			/**
			 * 富文本输入
			 * @param {Object} event
			 */
			postContent: function(event) {
				this.postContentHtml = event.mp.target.html
				this.postContentText = event.mp.target.text
				console.log(this.postContentHtml)
				console.log(this.postContentText)
			},
			/**
			 * 投稿类型选择
			 * @param {Object} value
			 */
			postClass(value) {
				this.postType = value
			},
			/**
			 * 选卡选择
			 * @param {Object} e
			 */
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
				}
			},
			/**
			 * 投稿上一步
			 */
			changeUp() {
				if (this.active > 0) {
					this.active -= 1
				} 
			},
			/**
			 * 投稿下一步
			 */
			changeDown() {
				if (this.active < this.list1.length - 1) {
					if (this.postType != null){
						this.active += 1
					} else {
						uni.showToast({
						    icon: 'none',
							position: 'bottom',
						    title: '请选择投稿类型'
						});
					}
				} 
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
			/**
			 * 富文本方法
			 */
			readOnlyChange() {
				this.readOnly = !this.readOnly
			},
			onEditorReady() {
				uni.createSelectorQuery().select('#editor').context((res) => {
					this.editorCtx = res.context
				}).exec()
			},
			undo() {
				this.editorCtx.undo()
			},
			redo() {
				this.editorCtx.redo()
			},
			format(e) {
				let {
					name,
					value
				} = e.target.dataset
				if (!name) return
				// console.log('format', name, value)
				this.editorCtx.format(name, value)

			},
			onStatusChange(e) {
				const formats = e.detail
				this.formats = formats
			},
			insertDivider() {
				this.editorCtx.insertDivider({
					success: function() {
						console.log('insert divider success')
					}
				})
			},
			clear() {
				this.editorCtx.clear({
					success: function(res) {
						console.log("clear success")
					}
				})
			},
			removeFormat() {
				this.editorCtx.removeFormat()
			},
			insertDate() {
				const date = new Date()
				const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
				this.editorCtx.insertText({
					text: formatDate
				})
			},
			insertImage() {
				uni.chooseImage({
					count: 1,
					success: (res) => {
						this.editorCtx.insertImage({
							src: res.tempFilePaths[0],
							alt: '图像',
							success: function() {
								console.log('insert image success')
							}
						})
					}
				})
			}
		},
		onLoad() {
			// 加载富文本的图标
			uni.loadFontFace({
				family: 'Pacifico',
				source: 'url("https://sungd.github.io/Pacifico.ttf")'
			})
		},
		components: {
			uniSection,
			uniSteps,
			uniSegmentedControl,
			uParse
		},
	}
	
</script>

<style>
	@import "./editor-icon.css";
	@import "../../components/u-parse/u-parse.css";
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
		width: 30%;
		/* background:linear-gradient(-90deg,rgba(63,205,235,1),rgba(188,226,158,1)); */
	}
	.save_info_f{
		width: 30%;
		background:linear-gradient(-90deg,rgba(63,205,235,1),rgba(63,205,235,1));
	}
	
	.example-body {
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 14px;
		/* background-color: #ffffff; */
		margin-top: 20upx;
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
	
	.tougao{
		margin-top: 30upx;
	}
	
	/* 富文本样式 */
	
	.wrapper {
		padding: 5px;
	}

	.iconfont {
		display: inline-block;
		padding: 8px 8px;
		width: 24px;
		height: 24px;
		cursor: pointer;
		font-size: 20px;
	}

	.toolbar {
		box-sizing: border-box;
		border-bottom: 0;
		font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
	}


	.ql-container {
		box-sizing: border-box;
		padding: 12px 15px;
		width: 100%;
		min-height: 30vh;
		height: auto;
		background: #fff;
		margin-top: 20px;
		font-size: 16px;
		line-height: 1.5;
	}

	.ql-active {
		color: #06c;
	}
</style>