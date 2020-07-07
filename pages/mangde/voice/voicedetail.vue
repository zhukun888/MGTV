<template>
	<view class="home">
		<view class="content">
			<view>{{info.title}}</view>
			<view>{{info.author}}</view>
			<view>
				<rich-text :nodes="strings"></rich-text>
			</view>
		</view>
		<view class="comment">
			<view class="comment_top">
				<image src="../../../static/img/jvxing.png" mode="aspectFit"></image>
				<view>评论(共{{total}}条)</view>
				<view class="comment_top_text" @click="navItemClick">我要评论</view>
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
				id: 1,
				info: {},
				strings: '',
				list: [],
				total:'',
			}
		},
		onLoad: function(option) {
			this.id = option.id;
			this.getdetail();
			this.getcomment();
		},
		onShow() {
			this.getcomment()
		},
		methods: {
			async getdetail() {
				let res = await this.util.request({
					url: '/api/article/visit',
					data: {
						id: this.id
					},
					method: 'POST',
				});
				this.info = res.data
				this.strings = res.data.content
			},
			//获取评论
			async getcomment() {
				let res = await this.util.request({
					url: '/api/article/get_reply_list?id='+this.id,
					method: 'POST',
				});
				this.list = res.data.list
				this.total = res.data.total
			},
			navItemClick(id) {
				uni.navigateTo({
					url: 'voicecomment?id=' + this.id
				})
			},
		}
	}
</script>

<style lang="scss">
	.home {
		.content {
			width: 750rpx;
			padding: 0;
			margin-top: 10rpx;
			background-color: #fff;

			view {
				width: 690rpx;
				margin: 0 auto;
				margin-top: 20rpx;
			}

			view:nth-child(1) {
				font-size: 35rpx;
				font-weight: 600;
			}

			view:nth-child(3) {
				padding-bottom: 20rpx;
			}
		}

		.comment {
			width: 750rpx;
			margin-top: 10rpx;
			background-color: #fff;

			.comment_top {
				width: 100%;
				height: 60rpx;
				border-bottom: 2rpx solid #C0C0C0;
				display: flex;
				align-items: center;
				font-size: 28rpx;

				image {
					width: 20rpx;
					height: 50rpx;
					margin-left: 20rpx;
					margin-right: 20rpx;
				}

				.comment_top_text {
					margin-left: 370rpx;
					color: #DD514C;
				}
			}

			.comment_item {
				width: 750rpx;
				display: flex;
				background-color: #fff;
				border-bottom: 2rpx solid #C0C0C0;
				padding-bottom: 20rpx;

				.avatar {
					width: 68rpx;
					height: 68rpx;
					margin-left: 20rpx;
					margin-right: 20rpx;
					margin-top: 20rpx;

					image {
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}
				}

				.content {
					margin-top: 20rpx;
					width: 500rpx;

					.content_user {
						font-size: 30rpx;
						font-weight: 500;
						color: #C0C0C0;
						margin-top: 0;
					}

					.content_img {
						display: flex;
						flex-wrap: wrap;

						image {
							width: 157rpx;
							height: 157rpx;
							margin-right: 20rpx;
							margin-bottom: 20rpx;
						}
					}

					.content_time {
						font-size: 28rpx;
						margin-top: 0;
						color: #C0C0C0;
					}
				}
			}
		}
	}
</style>
