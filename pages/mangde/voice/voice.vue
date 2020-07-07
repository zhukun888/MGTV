<template>
	<view class="home">
		<swiper indicator-dots circular autoplay>
			<swiper-item v-for="item in swipers" :key="item.id">
				<image :src="item.pic" @click="tourl(item.url)"></image>
			</swiper-item>
		</swiper>
		<view class="contentBox">
			<view class="content_title">
				<image src="../../../static/img/jvxing.png" mode="aspectFit"></image>
				<view class="content_title_text">
					<text>动态</text>
				</view>
			</view>
			<view class="content_item" v-for="(item,id) in list" :key="id">
				<image :src="item.image_input[0]" mode="aspectFit"></image>
				<view class="content_text">
					<view class="content_ititle">{{item.title}}</view>
					<view>
						<text>{{item.add_time}}</text>
						<!-- <text v-if="item.cid==1">通知</text>
						<text v-if="item.cid==2">新闻</text>
						<text v-if="item.cid==3">事迹</text>
						<text v-if="item.cid==4">党规</text>
						<text v-if="item.cid==5">党务</text> -->
						<text @click="navItemClick(item.id)">详情</text>
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
				navs: [
				],
				list: [
					
				],
			}
		},
		onLoad(){
			this.getbanner()
			this.getarticle()
		},
		onPullDownRefresh() {
			this.getbanner()
			this.getarticle()
			uni.stopPullDownRefresh()
		},
		methods: {
			tourl (url) {
				window.location.href = url
			},
			async getbanner() {
			    let res = await this.util.request({
			        url: '/api/mgtv/get_banner_list',
					data:{
						type:4
					},
			        method: 'POST',
			    });
				this.swipers = res.data;
			},
			async getarticle() {
			    let res = await this.util.request({
			        url: '/api/article/get_cid_article',
			        method: 'POST',
			    });
				this.list = res.data
			},
			// 导航点击的处理函数
			navItemClick(id) {
				uni.navigateTo({
					url:'voicedetail?id='+id
				})
			},
		
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
						margin-bottom: 30rpx;
					}
					.content_ititle{
						width: 100%;
						max-height:55%;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
					}
					view:nth-child(2) {
						font-size: 25rpx;
						color: #666666;
						display: flex;
						text:nth-child(1) {
							display: block;
							width: 150rpx;
							height: 41rpx;
							line-height: 41rpx;
							margin-right: 30rpx;
						}
						text:nth-child(2) {
							display: block;
							width: 150rpx;
							height: 41rpx;
							text-align: center;
							line-height: 41rpx;
							color: #fff;
							border-radius: 20rpx;
							background-color: #dd514c;
						}
						
					}
				}
			}
		}
	}
</style>
