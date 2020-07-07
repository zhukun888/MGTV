<template>
	<view class="home">
		<view class="top">
		</view>
		<view class="marks">
			{{marks}}
		</view>
		<view class="content">
			<view class="content_item" v-for="(item,index) in list" :key="index">
				<view class="content_item_text1">
					<view class="content_item_mark">{{item.mark}}</view>
					<view class="content_item_time">{{item.add_time}}</view>
				</view>
				<view class="content_item_text2">+{{item.number}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				marks:1,
				list:[],
			}
		},
		onLoad: function (option) {
				this.marks = option.marks;
				this.getmarks()
		    },
		methods: {
			async getmarks() {
				let res = await this.util.request({
					url: '/api/users/user_integral_list',
					method: 'POST',
				});
				this.list=res.data
			},
		}
	}
</script>

<style lang="scss">
	.home{
		width: 750rpx;
		.top{
			width: 750rpx;
			height: 306rpx;
			background:linear-gradient(180deg,rgba(221,81,76,1) 0%,rgba(251,89,89,0) 100%);
		}
		.marks{
			width: 690rpx;
			height: 70rpx;
			color: #fff;
			font-size: 79rpx;
			font-weight: 600;
			margin: 0 auto;
			margin-top: -216rpx;
			margin-bottom: 30rpx;
		}
		.content{
			width: 690rpx;
			height: 1089rpx;
			margin: 0 auto;
			background-color: #fff;
			padding: 0;
			border-radius: 10rpx;
			.content_item{
				width:690rpx;
				height: 118rpx;
				border-bottom:2rpx solid #F4F4F4;
				display: flex;
				align-items: center;
				.content_item_text1{
					width: 80%;
					.content_item.mark{
					}
					.content_item_time{
						margin-top: 10rpx;
						color: #ACACAC;
						font-size: 24rpx;
					}
				}
				.content_item_text2{
					width: 20%;
					font-size: 30rpx;
					color: #07C060;
				}
			}
		}
	}
</style>
