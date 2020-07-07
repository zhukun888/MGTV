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
				<view>{{information.title}}</view>
				<view>
					<text>截止日期:{{information.end_time}}</text>
					<text>{{information.join_num}}人已经参与投票</text>
				</view>
				<view>{{information.info}}</view>
			</view>
		</view>
		<view class="line-chart">
		</view>
		<form @submit="formSubmit" @reset="formReset">
			<view class="uni-form-item uni-column">
				<radio-group name="radio">
					<label v-for="(item,id) in information.options" :key="id">
						<radio style='transform:scale(0.6)' color='black' :value="item.label" /><text>{{item.value}}</text>
					</label>
				</radio-group>
			</view>
			<button form-type="submit">投票</button>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:0,
				information:{},
				value:'',
			}
		},
		onLoad: function (option) { 
				this.id = option.id;
				this.getinformation();
		    },
		methods: {
			async vote() {
				let res = await this.util.request({
					url: '/api/users/joinVote?id='+this.id+'&vote_value='+this.value,
					method: 'POST',
				});
			},
			async getinformation() {
				let res = await this.util.request({
					url: '/api/mgtv/get_vote_detail?id='+this.id,
					method: 'POST',
				});
				this.information = res.data
			},
			todetail(){
				uni.navigateTo({
					url: 'votedetail?id='+this.id
				})
			},
			formSubmit: function(e) {
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				var formdata = e.detail.value
				this.value = formdata.radio
				if(this.value==''){
					uni.showToast({
						icon: 'none',
						title: '请先选择选项'
					});
				}else{
					this.vote()
					this.todetail()
				}
			}
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
			//padding-bottom: 20rpx;
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
				view {
					margin-top: 15rpx;
					font-size: 29rpx;
				}

				view:nth-child(1) {
					font-size: 36rpx;
					font-weight: 600;
				}

				view:nth-child(2) {
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
			}
		}
		form {
			.uni-form-item .title {
				padding: 20rpx 0;
			}

			.uni-form-item {
				width: 700rpx;
				margin: 0 auto;
				background-color: #fff;
				margin-top: 30rpx;
				border-radius: 30rpx;
				padding: 8rpx 0;

				radio-group {
					label {
						display: block;
						margin: 20rpx;
					}
				}
			}

			.niming {
				width: 700rpx;
				margin: 20rpx auto;
			}

			button {
				margin-top: 20rpx;
				width: 700rpx;
				background: #dd514c;
				color: #fff;
				border-radius: 30rpx;
			}
		}
	}
</style>
