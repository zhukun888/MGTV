<template>
	<view class="content">
		<view class="content_item" v-for="(item,id) in vote" :key="id">
			<view>
				<text>{{item.title}}</text>
				<text>投票时间:{{item.begin_time}}-{{item.end_time}}</text>
				<text>参加人数:{{item.join_num}}人</text>
			</view>
			<view @click="navItemClick(item.id)" v-if="item.time_state==2">进行中</view>
			<view @click="navItemClick(item.id)" v-if="item.time_state==3">已结束</view>
			<view @click="navItemClick(item.id)" v-if="item.time_state==1">未开始</view>
			<view @click="navItemClick(item.id)">></view>
		</view>
	</view>
</template>

<script>
	export default {
		props:["vote"],
		data() {
			return {
			};
		},
		onShow() {
			// this.getlist()
		},
		methods:{
			// async getlist() {
			// 	let res = await this.util.request({
			// 		url: '/api/mgtv/get_vote_list',
			// 		method: 'POST',
			// 	});
			// 	console.log(res)
			// 	this.list = res.data
			// },
			// 导航点击的处理函数
			navItemClick (id) {
				uni.navigateTo({
					url:'/pages/user/userActivity/Vote/Vote?id='+id
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		width: 660rpx;
		margin: 0 auto;
		margin-top: 20rpx;
		background-color: #FFFFFF;
		border-radius: 30rpx;
	
		.content_item {
			display: flex;
			align-items: center;
			margin-bottom: 10rpx;
			border-bottom: 2rpx solid #C8C7CC;
			view:nth-child(1) {
				width: 80%;
				text {
					display: block;
					font-size: 26rpx;
					padding-bottom: 10rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				text:nth-child(1){
					font-weight: 600;
					font-size: 28rpx;
				}
			}
			view:nth-child(2) {
				width: 15%;
				font-size: 28rpx;
			}
			view:nth-child(3) {
				width: 5%;
				font-size: 40rpx;
			}
		}
	
	}
</style>
