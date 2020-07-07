<template>
	<view class="content">
		<image src="../../static/img/chaomei.png" mode=""></image>
		<view class="userinput">
			<view class="phoneBox">
				<image src="../../static/img/phone.png"></image>
				<view class="input">
					<view>|</view>
					<input v-model="phone" type="number" placeholder="请输入手机号码" placeholder-class="holder" />
				</view>
			</view>
			<view class="pwBox">
				<image src="../../static/img/Id.png"></image>
				<view class="input">
					<view>|</view>
					<input v-model="pw1" type="password"  placeholder="请输入密码" placeholder-class="holder" />
				</view>
			</view>
		</view>
		<view class="select">
			<view class="queren" @click="rules">登录</view>
			<view class="quxiao" @click="navItemClick">去注册</view>
		</view>
	</view>
</template>

<script>
	import {
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				pw1:'',
				phone:'',
				info:{},
			}
		},
		methods: {
			...mapMutations(['login', 'change']),
			rules() {
				var ph = /^1(3|4|5|6|7|8|9)\d{9}$/;
				var phnum = ph.test(this.phone);
				var pw = /^[0-9a-zA-Z]{6,20}$/;
				var pwres = pw.test(this.pw1);
				if (!pwres) {
					uni.showToast({
						title: '请输入正确的密码',
						icon: "none"
					})
				}else if (!phnum) {
					uni.showToast({
						title: '请输入正确的手机号',
						icon: "none"
					})
				} else {
					this.addinfo()
					function jump() {
						uni.switchTab({
							url: '/pages/user/user',
							success: function() {
							        location.reload()
							    }
						})
						
					}
					setTimeout(jump, 1000)
				}
			},
			async addinfo() {
				let res = await this.util.request({
					url: '/api/login/login',
					data: {
						account:this.phone,
						pwd:this.pw1,
					},
					method: 'POST',
				});
				console.log(res.data)
				this.info = res.data
				this.login(this.info)
			},
			navItemClick() {
				uni.navigateTo({
					url: 'login'
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		background-color: #fff;
		width: 750rpx;

		image {
			margin: 0 auto;
			margin-top: 150rpx;
			width: 220rpx;
			height: 196rpx;
		}

		.userinput {
			margin: 0 auto;
			margin-top: 70rpx;
			width: 590rpx;
			//height: 160rpx;
			border: 2rpx solid #C0C0C0;
			border-radius: 10rpx;

			.userBox {
				width: 590rpx;
				height: 80rpx;
				border-bottom: 2rpx solid #C0C0C0;
				display: flex;

				image {
					margin: 0 auto;
					margin-top: 27rpx;
					width: 27rpx;
					height: 31rpx;
				}

				.input {
					display: flex;
					width: 410rpx;
					height: 80rpx;

					view {
						width: 2rpx;
						height: 80rpx;
						line-height: 80rpx;
						color: #C0C0C0;
						margin-right: 20rpx;
					}

					input {
						width: 409rpx;
						height: 80rpx;

						.holder {
							font-size: 26rpx;
							line-height: 80rpx;
						}
					}
				}
			}
			.pwBox {
				width: 590rpx;
				height: 80rpx;
				display: flex;
				image {
					width: 40rpx;
					height: 30rpx;
					margin: 0 auto;
					margin-top: 27rpx;
				}
			
				.input {
					display: flex;
					width: 410rpx;
					height: 80rpx;
			
					view {
						width: 2rpx;
						height: 80rpx;
						line-height: 80rpx;
						color: #C0C0C0;
						margin-right: 20rpx;
					}
			
					input {
						width: 409rpx;
						height: 80rpx;
			
						.holder {
							font-size: 26rpx;
							line-height: 80rpx;
						}
					}
				}
			}
			.idBox {
				width: 590rpx;
				height: 80rpx;
				border-bottom: 2rpx solid #C0C0C0;
				display: flex;

				image {
					width: 40rpx;
					height: 30rpx;
					margin: 0 auto;
					margin-top: 27rpx;
				}

				.input {
					display: flex;
					width: 410rpx;
					height: 80rpx;

					view {
						width: 2rpx;
						height: 80rpx;
						line-height: 80rpx;
						color: #C0C0C0;
						margin-right: 20rpx;
					}

					input {
						width: 409rpx;
						height: 80rpx;

						.holder {
							font-size: 26rpx;
							line-height: 80rpx;
						}
					}
				}
			}

			.phoneBox {
				width: 590rpx;
				height: 80rpx;
				border-bottom: 2rpx solid #C0C0C0;
				display: flex;

				image {
					width: 40rpx;
					height: 30rpx;
					margin: 0 auto;
					margin-top: 27rpx;
				}

				.input {
					display: flex;
					width: 410rpx;
					height: 80rpx;

					view {
						width: 2rpx;
						height: 80rpx;
						line-height: 80rpx;
						color: #C0C0C0;
						margin-right: 20rpx;
					}

					input {
						width: 409rpx;
						height: 80rpx;

						.holder {
							font-size: 26rpx;
							line-height: 80rpx;
						}
					}
				}
			}

			.comBox {
				width: 590rpx;
				height: 80rpx;
				display: flex;

				image {
					width: 40rpx;
					height: 30rpx;
					margin: 0 auto;
					margin-top: 27rpx;
				}

				.input {
					display: flex;
					width: 410rpx;
					height: 80rpx;

					.line {
						width: 2rpx;
						height: 80rpx;
						line-height: 80rpx;
						color: #C0C0C0;
						margin-right: 20rpx;
					}

					picker{
						width: 409rpx;
						height: 80rpx;

						.uniinput {
							font-size: 28rpx;
							line-height: 80rpx;
							color:#999999;
						}
					}
				}
			}
		}

		.select {
			width: 670rpx;
			display: flex;
			margin: 0 auto;
			justify-content: space-between;

			.queren {
				width: 260rpx;
				height: 80rpx;
				margin: 0 auto;
				margin-top: 30rpx;
				text-align: center;
				background-color: #dd514c;
				color: #FFFFFF;
				line-height: 80rpx;
				font-size: 28rpx;
				border-radius: 10rpx;
			}

			.quxiao {
				width: 260rpx;
				height: 80rpx;
				margin: 0 auto;
				margin-top: 30rpx;
				text-align: center;
				background-color: #ececec;
				color: #dd514c;
				line-height: 80rpx;
				font-size: 28rpx;
				border-radius: 10rpx;
			}
		}

		.shouci {
			width: 590rpx;
			height: 25rpx;
			margin: 0 auto;
			margin-top: 20rpx;
			line-height: 25rpx;
			font-size: 25rpx;
		}
	}
</style>
