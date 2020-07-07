<template>
	<view class="home">
		<view class="voteBox">
			<view class="vote_title">
				<image src="../../../../static/img/shuqian2.png" mode="aspectFit"></image>
				<view class="vote_title_text">
					<text>投票</text>
				</view>
			</view>
			<view class="vote">
				<view class="votetop">{{information.title}}</view>
				<view class="votemid">
					<text>截止日期:{{information.end_time}}</text>
					<text>{{information.join_num}}人已经参与投票</text>
				</view>
				<view class="votebot">{{information.info}}</view>
			</view>
		</view>
		<view class="votedetail">
			<view class="detail_item" v-for="(item,index) in list" :key="index">
				<text class="detail_tit">{{item.value}}</text>
				<view class="detail">
					<view class="detail_clu":style="'width:'+ (item.num/information.join_num) * 100 +'%;'">
					</view>
				</view>
				<text class="detail_num">{{item.num}}票</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: 0,
				information: {},
				list:[],
				
			}
		},
		onLoad: function(option) {
			this.id = option.id;
			this.getinformation();
		},
		methods: {
			async getinformation() {
				let res = await this.util.request({
					url: '/api/mgtv/get_vote_detail?id=' + this.id,
					method: 'POST',
				});
				this.list = res.data.options
				this.information = res.data
			},
		}
	}
</script>

<style lang="scss">
	.home {
		width: 750rpx;

		.voteBox {
			width: 640rpx;
			margin: 0 auto;
			margin-top: 30rpx;
			border-radius: 30rpx;
			background: #fff;
			//margin-bottom: 30rpx;
			padding: 0 30rpx 20rpx 30rpx;
			.vote_title {
				display: flex;
				align-items: center;
				width: 100%;
				height: 60rpx;
				border-bottom: 2rpx solid #C8C7CC;

				image {
					width: 40rpx;
					height: 50rpx;
					margin-left: 10rpx;
				}

				.vote_title_text {
					display: flex;
					width: 90%;
					height: 60rpx;
					justify-content: space-between;

					text {
						font-size: 28rpx;
						font-weight: 600;
						line-height: 60rpx;
						margin-left: 20rpx;
					}
				}

			}

			.vote {
				.votetop{
					margin-top: 15rpx;
					font-size: 36rpx;
					font-weight: 600;
				}

				.votemid{
					margin-top: 15rpx;
					display: flex;
					justify-content: space-between;
					font-size: 28rpx;

					text {
						display: block;
					}

					text:nth-child(2) {
						display: block;
						color: #666666;
					}
				}
				.votebot{
					margin-top: 15rpx;
					font-size: 28rpx;
				}
			}
		}
		.votedetail{
			width: 690rpx;
			margin: 0 auto;
			border-radius: 30rpx;
			background-color: #fff;
			// margin-top: 30rpx;
			// padding-bottom: 20rpx;
			.detail_item{
				width: 100%;
				height: 40rpx;
				display: flex;
				margin-top: 50rpx;
				text{
					font-size: 28rpx;
				}
				text:nth-child(1){
					width: 150rpx;
					height: 40rpx;
					line-height: 40rpx;
					text-align: center;
				}
				.detail_tit{
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				.detail{
					width:440rpx;
					.detail_clu{
						margin-right: 20rpx;
						//width: 400rpx;
						height: 40rpx;
						background-color: #6D9EF4;
					}
				}
				.detail_num{
					width: 100rpx;
					text-align: center;
				}
			}
		}
	}
</style>
