<template>
	<view class="content">
		<view class="content_item" v-for="(item,index) in list" :key="index">
			<image :src="item.image" mode="aspectFit"></image>
			<view class="content_text">
				<view class="content_tit">{{item.title}}</view>
				<view v-if="item.cid==2">文明创建活动</view>
				<view v-if="item.cid==1">党委活动</view>
				<view v-if="item.cid==3">群体活动</view>
				<view v-if="item.cid==4">投票活动</view>
				<view @click="navItemClick(item.id)">已报名</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:["list"],
		data() {
			return {
			}
		},
		methods: {
			// 导航点击的处理函数
			navItemClick (id) {
				uni.navigateTo({
					url:'../../../pages/mangde/activity/activitydetail/activitydetail?id='+id
				})
			}
		}
	}
</script>

<style lang="scss">
	.content{
		width:660rpx;
		margin:0 auto;
		margin-top: 20rpx;
		background-color: #FFFFFF;
		border-radius: 30rpx;
		.content_item{
			display: flex;
			align-items: center;
			width: 100%;
			height: 250rpx;
			border-bottom: 1px solid #eee;
			image{
				width: 45%;
				height:65%;
				border-radius: 20rpx;
			}
			.content_text{
				width: 55%;
				height:60%;
				view{
					font-size: 25rpx;
					font-weight: 600;
					margin-left: 30rpx;
					margin-bottom: 30rpx;
				}
				.content_tit{
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
				}
				view:nth-child(2){
					font-size: 20rpx;
					color: #666666;
				}
				view:nth-child(3){
					color: #fff;
					width:120rpx;
					height: 40rpx;
					font-size: 22rpx;
					font-weight: 400;
					line-height: 40rpx;
					text-align: center;
					background:#dd514c;
					border-radius: 20rpx;
				}
			}
		}
	}
</style>
