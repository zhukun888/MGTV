<template>
	<view class="home">
		<image src="../../static/img/vote.png" mode="aspectFit"></image>
		<view class="vote" @click="vote">去投票</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			vote(){
				uni.navigateTo({
					url:"fenglist"
				})
			}
		}
	}
</script>

<style lang="scss">
	.home{
		width: 750rpx;
		position: relative;
		image{
			width: 750rpx;
			height: 1613rpx;
			margin-top:-3rpx;
			margin-bottom: -8rpx;
		}
		.vote{
			position: absolute;
			bottom:144rpx;
			left: 228rpx;
			width: 300rpx;
			height: 60rpx;
			color: #fff;
			background-color: #6d1839;
			text-align: center;
			line-height: 60rpx;
			border-radius: 30rpx;
			font-size: 28rpx;
			font-weight: 600;
		}
	}
</style>
