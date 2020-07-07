<template>
	<view class="home">
		<view class="content">
			<view class="title">{{title}}</view>
			<view class="content_title">
				<image src="../../../static/img/jvxing.png" mode="aspectFit"></image>
				<view class="content_title_text">
					<text>我有话要说</text>
					<text @click="back">返回文章页</text>
				</view>
			</view>
			<view class="content_text">
				<textarea :value="comment" @blur="bindTextAreaBlur" placeholder-style="color:#C0C0C0" placeholder="输入你想说的..."
				 maxlength="-1" />
				</view>
		</view>
		<view class="imagepre">
			<image v-for="item in tempFilePaths" :src="item" mode="aspectFit" @click="preview(item)"></image>
		</view>
		<!-- <view class="img" @click="upload">选择要上传的图片</view> -->
		<view class="submit" @click="submit">立即提交</view>
		<view class="comment">
			<view class="comment_top">
				<image src="../../../static/img/jvxing.png" mode="aspectFit"></image>
				<view>看看大家都说了什么</view>
			</view>
			<view class="comment_item" v-for="(item,index) in list" :key="index">
				<view class="avatar">
					<image src="../../../static/img/chaomei2.png" mode="aspectFit"></image>
				</view>
				<view class="content">
					<view class="content_user">{{item.userInfo.real_name}}</view>
					<view class="content_say">{{item.comment}}</view>
					<view class="content_img" >
						<image v-for="(i,index) in item.pics" :key="index"  :src="util.baseurl+i" mode="aspectFit"></image>
					</view>
					<view class="content_time">{{item.add_time}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import util from "../../../config.js"
	export default {
		data() {
			return {
				id:1,
				tempFilePaths:[],
				tempFiles:[],
				comment:'',
				title:'',
				pics:[],
				list:[],
				userInfo:{},
			}
		},
		onLoad: function (option) {
				this.id = option.id;
				this.getdetail();
				this.getcomment();
		  },
		onShow(){	
		    this.getcomment()
		},
		methods: {
			// ceshi(){
			// 	uni.navigateTo({
			// 		url: 'up'
			// 	})
			// },
			back(){
				uni.navigateBack({
				    delta: 1
				});
			},
			//失去焦点后
			bindTextAreaBlur: function (e) {
			            this.comment = e.detail.value
			        },
			//图片预览
			preview(current){
				uni.previewImage({
					current,
					urls:this.tempFilePaths,
				})
			},
			//获取标题
			async getdetail() {
				let res = await this.util.request({
					url: '/api/article/visit',
					data:{
						id:this.id
					},
					method: 'POST',
				});
				this.title = res.data.title
				this.total = res.data.total
			},
			//提交
			async submit() {
				//let list = JSON.parse(JSON.stringify(this.pics))
				let res = await this.util.request({
					url: '/api/users/add_comment',
					data:{
						id:this.id,
						comment:this.comment,
						//pics:list
					},
					method: 'POST',
				});
				console.log(list)
				//this.tempFilePaths=[];
				this.comment = '',
				this.getcomment()
			},
			//获取评论
			async getcomment() {
				let res = await this.util.request({
					url: '/api/article/get_reply_list?id='+this.id,
					method: 'POST',
				});
				this.list = res.data.list
			},
			//上传图片
			upload(){
				uni.chooseImage({
					count:9,
				    success: chooseImageRes=>{
						this.tempFilePaths = chooseImageRes.tempFilePaths
						this.urlTobase64(this.tempFilePaths[0])
						this.tempFilePaths.map((item)=>{
						       this.submitImg(item)
						})
				    }
				});
			},
			submitImg(filePath){
				
			   uni.uploadFile({
			   		url: util.baseurl+'/api/mgtv/upload', //仅为示例，非真实的接口地址
			   		filePath:filePath,
			   		name: 'filename',
					formData:{
						'token':this.userInfo.token
					},
			   		success: uploadFileRes=>{
			        let res = JSON.parse(uploadFileRes.data)
					console.log(res)
			   		this.pics.push(res.data.image_url) 
			   		}
			   	})
			}
		}
	}
</script>

<style lang="scss">
	.home{
		.content{
			width:750rpx;
			padding: 0;
			margin-top: 10rpx;
			background-color: #fff;
			.title{
				width: 690rpx;
				margin: 0 auto;
				margin-top: 20rpx;
				font-size: 45rpx;
			}
			.content_title{
				display: flex;
				align-items: center;
				width: 100%;
				height: 150rpx;
				border-bottom: 2rpx solid #C0C0C0;
				image {
					width: 40rpx;
					height: 50rpx;
				}
				.content_title_text {
					display: flex;
					width: 90%;
					height: 150rpx;
					justify-content: space-between;
				
					text {
						font-size: 28rpx;
						line-height: 150rpx;
						margin-left: 8rpx;
					}
				
					text:nth-child(2) {
						font-size: 26rpx;
						line-height: 150rpx;
						color:#0FA1DF;
					}
				}
			}
			.content_text{
				padding-top: 10rpx;
				width: 100%;
				textarea{
					width: 100%;
				}
			}
		}
		.imagepre{
			width: 690rpx;
			margin: 0 auto;
			margin-top: 20rpx;
			margin-bottom: 20rpx;
			display: flex;
			flex-wrap: wrap;
			image{
				width: 25%;
				height: 200rpx;
			}
		}
		.img{
			width: 690rpx;
			height: 80rpx;
			background-color: #dd514c;
			margin: 0 auto;
			margin-top: 20rpx;
			border-radius: 10rpx;
			text-align: center;
			line-height: 80rpx;
			color: #fff;
		}
		.submit{
			width: 690rpx;
			height: 80rpx;
			background-color: #dd514c;
			margin: 0 auto;
			margin-top: 20rpx;
			margin-bottom: 20rpx;
			border-radius: 10rpx;
			text-align: center;
			line-height: 80rpx;
			color: #fff;
		}
		.comment{
			width:750rpx;
			margin-top: 10rpx;
			background-color: #fff;
			.comment_top{
				width: 100%;
				height: 60rpx;
				border-bottom: 2rpx solid #ECECEC;
				display: flex;
				align-items: center;
				image{
					width: 20rpx;
					height: 50rpx;
					margin-left: 20rpx;
					margin-right: 20rpx;
				}
				.comment_top_text{
					margin-left: 370rpx;
				}
			}
			.comment_item{
				width:750rpx;
				display: flex;
				background-color: #fff;
				border-bottom: 2rpx solid #ECECEC;
				padding-bottom: 20rpx;
				.avatar{
					width: 68rpx;
					height: 68rpx;
					margin-left: 20rpx;
					margin-right: 20rpx;
					margin-top: 20rpx;
					image{
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}
				}
				.content{
					margin-top: 20rpx;
					width: 500rpx;
					.content_user{
						font-size: 30rpx;
						font-weight: 500;
						color: #C0C0C0;
						margin-top: 0;
					}
					.content_img{
						display: flex;
						flex-wrap: wrap;
						image{
							width: 157rpx;
							height: 157rpx;
							margin-right: 20rpx;
							margin-bottom: 20rpx;
						}
					}
					.content_time{
						font-size: 28rpx;
						margin-top: 0;
						color: #C0C0C0;
					}
				}
			}
		}
		
	}
</style>
