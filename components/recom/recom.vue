<template>
	<view class="newsListBox">
		<view class="recom">为你推荐</view>
		<view class="list">
			<image src="../../static/img/qq.png" mode="aspectFit"></image>
			<view class="list_text">
				<view>中国共产党章程</view>
				<view>中国共产党十九大 / 2017-12 / 人民出版社</view>
			</view>
			<view class="reading">想读</view>
		</view>
		<view class="list">
			<image src="../../static/img/qq.png" mode="aspectFit"></image>
			<view class="list_text">
				<view>中国共产党章程</view>
				<view>中国共产党十九大 / 2017-12 / 人民出版社</view>
			</view>
			<view class="reading">想读</view>
		</view>
		<view class="list">
			<image src="../../static/img/qq.png" mode="aspectFit"></image>
			<view class="list_text">
				<view>中国共产党章程</view>
				<view>中国共产党十九大 / 2017-12 / 人民出版社</view>
			</view>
			<view class="reading">想读</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.newsListBox{
		width: 750rpx;
		.recom{
			width:750rpx;
			height:50rpx;
			margin-top: 20rpx;
			margin-bottom: 20rpx;
			line-height: 50rpx;
			background: #eee;
		}
		.list{
			display: flex;
			justify-content: center;
			align-items: center;
			width: 750rpx;
			height: 200rpx;
			border-top: 1px solid black;
			image{
				width:25%;
				height:150rpx;
			}
			.list_text{
				width:65%;
				view:nth-child(1){
					font-size: 32rpx;
					margin-bottom: 30rpx;
				}
				view:nth-child(2){
					font-size: 24rpx;
				}
			}
			.reading{
				width:10%;
				font-size: 28rpx;
				color: orange;
				margin-right: 20rpx;
			}
		}
	}
</style>
