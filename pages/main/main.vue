<template>
	<view class="home">
		<swiper indicator-dots circular autoplay>
			<swiper-item v-for="item in swipers" :key="item.id">
				<image :src="item.pic" @click="tourl(item.url)"></image>
			</swiper-item>
		</swiper>
		<view class="nav">
			<view class="nav_item" v-for="(item,id) in navs" :key="id" @click="navItemClick(item.url)">
				<image :src="item.icon" mode="aspectFit"></image>
				<text>{{item.name}}</text>
			</view>
		</view>
		<view class="contentBox">
			<view class="content_title">
				<image src="../../static/img/jvxing.png" mode="aspectFit"></image>
				<view class="content_title_text">
					<text>动态</text>
					<text @click="tovoice">更多</text>
				</view>
			</view>
			<view class="content_item" v-for="(item,id) in list" :key="id">
				<image :src="item.image" mode="aspectFit"></image>
				<view class="content_text" @click="fun(item.id)">
					<view class="content_ititle">{{item.title}}</view>
					<view>
						<text>{{item.add_time}}</text>
						<text>{{item.visit}}阅读</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'

	export default {
		computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
		data() {
			return {
				swipers: [],
				navs: [],
				list: []
			}
		},
		onLoad() {
			this.getindex()
		},
		onPullDownRefresh() {
			this.getindex()
			uni.stopPullDownRefresh()
		},
		methods: {
			//跳转文章详情页
			tovoice(){
				uni.navigateTo({
					url:'../mangde/voice/voice'
				})
			},
			tourl (url) {
				window.location.href = url
			},
			fun(id) {
				uni.navigateTo({
					url: '../mangde/voice/voicedetail?id=' + id
				})
			},
			async getindex() {
				let res = await this.util.request({
					url: '/api/mgtv/get_index',
					method: 'post',
				});
				console.log(res.data)
				this.navs = res.data.menu
				this.swipers = res.data.banner
				this.list = res.data.news
			},
			// 导航点击的处理函数
			navItemClick(url) {
				console.log(url)
				uni.navigateTo({
					url:'../../'+url
				})
			}

		}
	}
</script>

<style lang="scss">
	.home {
		width: 750rpx;
		background-color: #fff;

		swiper {
			margin: 0 auto;
			margin-top: 20rpx;
			width: 700rpx;
			height: 380rpx;

			image {
				height: 100%;
				width: 100%;
				border-radius: 20rpx;
			}
		}

		.nav {
			display: flex;
			margin: 0 auto;
			margin-top: 20rpx;
			width: 730rpx;
			border-radius: 30rpx;
			background-color: #fff;
			flex-wrap: wrap;

			.nav_item {
				width: 20%;
				text-align: center;

				image {
					width: 90rpx;
					height: 90rpx;
					color: #fff;
				}

				text {
					display: block;
					font-size: 26rpx;
					font-weight: 600;
				}
			}
		}

		.contentBox {
			width: 690rpx;
			margin: 0 auto;
			margin-top: 30rpx;
			border-radius: 30rpx;
			background: #fff;
			//padding-bottom: 20rpx;
			padding: 0 20rpx 20rpx 20rpx;

			.content_title {
				display: flex;
				align-items: center;
				width: 100%;
				height: 60rpx;
				border-bottom: 2rpx solid #C0C0C0;

				image {
					width: 40rpx;
					height: 50rpx;
				}

				.content_title_text {
					display: flex;
					width: 90%;
					height: 60rpx;
					justify-content: space-between;

					text {
						font-size: 28rpx;
						font-weight: 600;
						line-height: 60rpx;
						margin-left: 8rpx;
					}

					text:nth-child(2) {
						font-size: 26rpx;
						line-height: 60rpx;
					}
				}

			}

			.content_item {
				display: flex;
				align-items: center;
				width: 100%;
				height: 220rpx;
				border-bottom: 1px solid #eee;

				image {
					width: 45%;
					height: 65%;
					border-radius: 20rpx;
					margin-left: -15rpx;
				}

				.content_text {
					width: 55%;
					height: 65%;
					view {
						font-size: 28rpx;
						font-weight: 600;
						margin-left: 30rpx;
						margin-bottom: 40rpx;
					}
					.content_ititle{
						width: 100%;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
					}
					view:nth-child(2) {
						font-size: 25rpx;
						color: #666666;

						text:nth-child(1) {
							margin-right: 50rpx;
						}
					}
				}
			}
		}
	}
</style>
