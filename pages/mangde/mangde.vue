<template>
	<view class="home">
		<swiper indicator-dots circular autoplay>
			<swiper-item v-for="item in swipers" :key="item.id">
				<image :src="item.pic" @click="tourl(item.url)"></image>
			</swiper-item>
		</swiper>
		<view class="navBox">
			<view class="nav_item" v-for="(item,index) in navs" :key="index" @click="navItemClick(item.path)">
				<image :src="item.src" mode="aspectFit"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swipers: [
				],
				navs:[
					{
						src:'../../static/img/voice.png',
						path: '/pages/mangde/voice/voice'
					},
					{
						src:'../../static/img/fengmang.png',
						path: '/pages/mangde/plan/plan'
					},
					{
						src:'../../static/img/huodong.png',
						path: '/pages/mangde/activity/activity'
					},
					{
						src:'../../static/img/three.png',
						path: '/pages/mangde/sanhui/three'
					}
				]
			}
		},
		onLoad() {
			this.getbanner()
		},
		methods: {
			tourl (url) {
				window.location.href = url
			},
			//获取轮播图
			async getbanner() {
			    let res = await this.util.request({
			        url: '/api/mgtv/get_banner_list',
					data: {
					    type: 5
					},
			        method: 'POST',
			    });
				this.swipers = res.data
			},
			// 导航点击的处理函数
			navItemClick (url) {
				uni.navigateTo({
					url
				})
			}
			
		}
	}
</script>

<style lang="scss">
	.home{
		width: 750rpx;
		swiper {
			margin: 0 auto;
			margin-top: 20rpx;
			width: 700rpx;
			height: 380rpx;
			image {
				height: 100%;
				width: 100%;
				border-radius: 30rpx;
			}
		}
		.navBox{
			width: 750rpx;
			margin: 0 auto;
			margin-top: 20rpx;
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			align-items: center;
			.nav_item{
				// display: flex;
				// border: 2rpx solid #C8C7CC;
				// justify-content: center;
				// align-items: center;
				// margin: 10rpx auto;
				// width: 320rpx;
				// height: 200rpx;
				// border-radius: 30rpx;
				// background-color: #fff;
				// font-size: 40rpx;
				// font-weight: 600;
				image{
					width: 350rpx;
					height: 200rpx;
					border-radius: 20rpx;
				}
			}
		}
	}
</style>
