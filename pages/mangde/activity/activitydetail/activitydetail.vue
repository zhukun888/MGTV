<template>
	<view class="home">
		<image :src="info.image" class = 'swiper' mode="aspectFit"></image>
		<view class="intro">
			<view class="intro_title">
				<image src="../../../../static/img/jvxing.png" mode="aspectFit"></image>
				<text v-if="info.cid==1">党委活动</text>
				<text v-if="info.cid==2">文明创建活动</text>
				<text v-if="info.cid==3">群体活动</text>
				<text v-if="info.cid==4">投票</text>
			</view>
			<text>{{info.content}}</text>
			<view class="activity">
				<view v-if="this.state==2" class="activity_left">
					<text>{{info.info}}</text>
					<text>开始报名时间:{{info.begin_time}}</text>
					<text>截止报名时间:{{info.end_time}}</text>
					<text>报名名额上限:{{info.limit_num}}人</text>
				</view>
				<view v-if="this.state!=2" class="activity_left1">
					<text>{{info.info}}</text>
					<text>开始报名时间:{{info.begin_time}}</text>
					<text>截止报名时间:{{info.end_time}}</text>
					<text>报名名额上限:{{info.limit_num}}人</text>
				</view>
				<image v-if="this.state==2"  class="imageclass" src="../../../../static/img/ing.png" mode="aspectFit"></image>
				<text>报名参与此活动，将获得10积分奖励</text>
			</view>
		</view>
		<view class="usersBox">
			<view class="users_title">
				<image src="../../../../static/img/shuqian.png" mode="aspectFit"></image>
				<view class="users_title_text">
					<text>已报名者</text>
					<text>{{info.join_num}}人</text>
				</view>
			</view>
			<view class="users">
				<view class="users_item" v-for="(item,index) in list" :key="index">
					<image :src="item.avatar" mode="aspectFit"></image>
					<text>{{item.username}}</text>
				</view>
			</view>
		</view>
		<view v-if="this.state==2" class="sign" @click="open">
			点击报名
		</view>
		<view v-if="this.state==1" class="signed">
			未开始
		</view>
		<view v-if="this.state==3" class="signed">
			已结束
		</view>
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog type="success" mode="base" title="提示" content="马上去报名" @confirm="confirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	export default {
		data() {
			return {
				id:1,
				state:1,
				info:{},
				list: [
					
				]
			}
		},
		components: {
			uniPopup,
			uniPopupDialog
		},
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
				this.id = option.id;
				this.state = option.state
				this.getinfo()
		    },
		methods: {
			//获取活动详情
			async getinfo() {
				let res = await this.util.request({
					url: '/api/mgtv/get_activity_detail?id='+this.id,
					method: 'POST',
				});
				this.info=res.data
				this.list = res.data.joinUser
			},
			open() {
				this.$refs.popup.open()
			},
			confirm(done) {
				uni.navigateTo({
					url: 'sign?id='+this.id
				}),
				done()
			}
		}
	}
</script>

<style lang="scss">
	.home {
		width: 750rpx;
		.swiper {
			display: block;
			width: 700rpx;
			height: 380rpx;
			margin: 0 auto;
			margin-top: 20rpx;
			border-radius: 20rpx;
		}

		.intro {
			width: 640rpx;
			margin: 0 auto;
			margin-top: 30rpx;
			border-radius: 30rpx;
			background: #fff;
			padding: 0 30rpx 20rpx 30rpx;

			.intro_title {
				display: flex;
				align-items: center;
				width: 100%;
				height: 60rpx;
				border-bottom: 2rpx solid #C8C7CC;

				image {
					width: 10rpx;
					height: 50rpx;
					margin-left: 15rpx;
				}

				text {
					font-size: 28rpx;
					font-weight: 600;
					line-height: 60rpx;
					margin-left: 20rpx;
				}
			}

			text {
				font-size: 26rpx;
			}
		}

		.activity {
			display: flex;
			flex-wrap: wrap;
			margin-top: 10rpx;
			padding-top: 20rpx;
			border-top: 2rpx solid #C8C7CC;

			.activity_left {
				width: 60%;
				background-color: #fff;

				text {
					display: block;
					color: #666666;
					margin-bottom: 8rpx;
				}
			}
			.activity_left1 {
				width: 100%;
				background-color: #fff;
			
				text {
					display: block;
					color: #666666;
					margin-bottom: 8rpx;
				}
			}
			.imageclass {
				width: 40%;
				height: 230rpx;
			}
		}

		.usersBox {
			width: 640rpx;
			margin: 0 auto;
			margin-top: 30rpx;
			border-radius: 30rpx;
			background: #fff;
			//padding-bottom: 20rpx;
			padding: 0 30rpx 20rpx 30rpx;

			.users_title {
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

				.users_title_text {
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

			.users {
				display: flex;
				margin: 0 auto;
				margin-top: 20rpx;
				width: 640rpx;
				border-radius: 30rpx;
				background-color: #fff;
				flex-wrap: wrap;

				.users_item {
					width: 20%;
					text-align: center;

					image {
						display: block;
						width: 50rpx;
						height: 50rpx;
						border-radius: 50%;
						margin: 5px auto;
					}

					text {
						font-size: 26rpx;
					}
				}
			}
		}

		.sign {
			margin: 0 auto;
			margin-top: 20rpx;
			margin-bottom: 20rpx;
			color: #fff;
			width: 700rpx;
			height: 70rpx;
			background-color: #dd514c;
			text-align: center;
			line-height: 70rpx;
			border-radius: 30rpx;
		}
		.signed {
			margin: 0 auto;
			margin-top: 20rpx;
			margin-bottom: 20rpx;
			color: #fff;
			width: 700rpx;
			height: 70rpx;
			background-color: #C8C7CC;
			text-align: center;
			line-height: 70rpx;
			border-radius: 30rpx;
		}
	}
</style>
