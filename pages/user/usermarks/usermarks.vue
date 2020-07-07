<template>
	<view class="home">
		<view class="top">
			<image src="../../../static/img/chaomei2.png" mode="aspectFit"></image>
			<view class="top_text1">{{info.real_name}}</view>
			<view class="top_text2">
				<view class="top_text2_1">总积分</view>
				<view class="top_text2_2">{{info.integral}}</view>
				<view class="top_text2_3" @click="navItemClick(info.integral)">查看明细>></view>
			</view>
		</view>
		<view class="middle">积分规则</view>
		<view class="item">
			<image src="../../../static/img/denglu.png" mode="aspectFit"></image>
			<view class="item_text">
				<view>登录</view>
				<view>+{{login}}积分</view>
			</view>
			<view class="item_button1">
				已获得
			</view>
		</view>
		<view class="item">
			<image src="../../../static/img/yuedu.png" mode="aspectFit"></image>
			<view class="item_text">
				<view>阅读文章</view>
				<view>+{{read}}积分</view>
			</view>
			<view class="item_button" @click="navTo('/pages/mangde/voice/voice')">
				去获得
			</view>
		</view>
		<view class="item">
			<image src="../../../static/img/fenxiang.png" mode="aspectFit"></image>
			<view class="item_text">
				<view>分享</view>
				<view>+{{share}}积分</view>
			</view>
			<view class="item_button" @click="navTo('/pages/mangde/plan/plan')">
				去获得
			</view>
		</view>
		<view class="item">
			<image src="../../../static/img/jifenhuodong.png" mode="aspectFit"></image>
			<view class="item_text">
				<view>参加活动</view>
				<view>+{{attend}}积分</view>
			</view>
			<view class="item_button" @click="navTo('/pages/mangde/activity/activity')">
				去获得
			</view>
		</view>
		<view class="item">
			<image src="../../../static/img/pinglun.png" mode="aspectFit"></image>
			<view class="item_text">
				<view>评论</view>
				<view>+{{word}}积分</view>
			</view>
			<view class="item_button" @click="navTo('/pages/mangde/voice/voice')">
				去获得
			</view>
		</view>
		<view class="item">
			<image src="../../../static/img/huabankaobei-.png" mode="aspectFit"></image>
			<view class="item_text">
				<view>投票</view>
				<view>+{{vote}}积分</view>
			</view>
			<view class="item_button" @click="navTo('/pages/mangde/votelist/votelist')">
				去获得
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info:{},
				login:1,
				read:1,
				share:1,
				attend:1,
				word:1,
				vote:1,
			}
		},
		onLoad() {
			this.getmarks()
		},
		onShow() {
			this.getmessage()
		},
		methods: {
			async getmessage() {
				let res = await this.util.request({
					url: '/api/users/get_my_user_info',
					method: 'POST',
				});
				this.info=res.data
			},
			async getmarks() {
				let res = await this.util.request({
					url: '/api/users/get_integral_rule',
					method: 'POST',
				});
				this.login=res.data[0].value
				this.read=res.data[1].value
				this.share=res.data[5].value
				this.attend=res.data[3].value
				this.vote=res.data[4].value
				this.word=res.data[2].value
			},
			navTo(url){
				uni.navigateTo({
					url
				})
			},
			navItemClick(marks) {
					uni.navigateTo({
						url: '../marksdetail/marksdetail?marks='+marks
					})
			}
		}
	}
</script>

<style lang="scss">
	.home{
		width: 750rpx;
		.top{
			width:690rpx;
			height: 300rpx;
			background-color: #FF7B62;
			margin: 0 auto;
			margin-top: 20rpx;
			display: flex;
			align-items: center;
			border-radius: 20rpx;
			image{
				width: 120rpx;
				height: 120rpx;
				border-radius: 50%;
				margin-right: 40rpx;
				margin-left: 20rpx;
			}
			.top_text1{
				color: #fff;
				font-size: 34rpx;
				font-weight: 600;
				width: 150rpx;
				text-align: center;
			}
			.top_text2{
				color: #fff;
				width: 160rpx;
				margin-left: 100rpx;
				text-align: center;
				.top_text2_1{
					font-size: 30rpx;
					font-weight: 300;
				}
				.top_text2_2{
					font-size: 60rpx;
					font-weight: 500;
				}
				.top_text2_3{
					font-size: 20rpx;
					font-weight: 300;
				}
			}
		}
		.middle{
			width: 690rpx;
			margin: 0 auto;
			color: #B2B2B2;
			font-size: 24rpx;
			margin-top: 20rpx;
		}
		.item{
			width: 690rpx;
			margin: 0 auto;
			margin-top: 30rpx;
			height: 100rpx;
			display: flex;
			align-items: center;
			image{
				width: 50rpx;
				height: 50rpx;
				margin-right: 20rpx;
				margin-left: 20rpx;
			}
			.item_text{
				width: 50%;
				margin-right: 260rpx;
				view:nth-child(1){
					font-size: 30rpx;
				}
				view:nth-child(2){
					font-size: 26rpx;
					color:#7B7B7B;
				}
			}
			.item_button{
				width: 30%;
				height: 40rpx;
				color: #fff;
				background-color: #DD514C;
				border-radius: 20rpx;
				font-size: 24rpx;
				text-align: center;
				line-height: 40rpx;
			}
			.item_button1{
				width: 30%;
				height: 40rpx;
				color: #fff;
				background-color: #07C060;
				border-radius: 20rpx;
				font-size: 24rpx;
				text-align: center;
				line-height: 40rpx;
			}
		}
	}
</style>
