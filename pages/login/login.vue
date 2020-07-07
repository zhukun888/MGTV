<template>
	<view class="content">
		<image src="../../static/img/chaomei.png" mode=""></image>
		<view class="userinput">
			<view class="userBox">
				<image src="../../static/img/loginuser.png"></image>
				<view class="input">
					<view>|</view>
					<input v-model="name" type="text" placeholder="请输入姓名" placeholder-class="holder" />
				</view>
			</view>
			<view class="idBox">
				<image src="../../static/img/Id.png"></image>
				<view class="input">
					<view>|</view>
					<input v-model="idcard" type="text" placeholder="请输入身份证号" placeholder-class="holder" />
				</view>
			</view>
			<view class="phoneBox">
				<image src="../../static/img/phone.png"></image>
				<view class="input">
					<view>|</view>
					<input v-model="phone" type="number" placeholder="请输入电话号码" placeholder-class="holder" />
				</view>
			</view>
			<view class="comBox">
				<image src="../../static/img/com.jpg"></image>
				<view class="input">
					<view class="line">|</view>
					<!-- <input v-model="com" type="text" placeholder="请输入公司" placeholder-class="holder" /> -->
					<picker @change="bindPickerChange" :value="index" :range="list">
						<view class="uniinput">{{title}}</view>
					</picker>
				</view>
			</view>
			<view class="pwBox">
				<image src="../../static/img/Id.png"></image>
				<view class="input">
					<view>|</view>
					<input v-model="pw1" type="password"  placeholder="请输入密码" placeholder-class="holder" />
				</view>
			</view>
			<view class="pwBox1">
				<image src="../../static/img/Id.png"></image>
				<view class="input">
					<view>|</view>
					<input v-model="pw2" type="password"  placeholder="请再次输入密码" placeholder-class="holder" />
				</view>
			</view>
		</view>
		<view class="select">
			<view class="queren" @click="rules">快速注册</view>
			<view class="quxiao" @click="navItemClick">取消</view>
		</view>
		<view class="shouci">
			首次登录请先进行身份认证
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: '',
				idcard: '',
				phone: '',
				com: '',
				index: 0,
				array: [],
				list:[],
				company:'',
				title:'请选择所属公司',
				pw1:'',
				pw2:'',
				real_name:''
			}
		},
		onLoad() {
			this.getcon();
		},
		methods: {
			rules() {
				//身份证号验证规则
				var Reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
				var res = Reg.test(this.idcard);
				var ph = /^1(3|4|5|6|7|8|9)\d{9}$/;
				var phnum = ph.test(this.phone);
				var pw = /^^[0-9a-zA-Z]{6,20}$/;
				var pwres = pw.test(this.pw1);
				if (this.name == '') {
					uni.showToast({
						title: '请输入姓名',
						icon: "none"
					})
				} else if (!res) {
					uni.showToast({
						title: '请输入正确的身份证号',
						icon: "none"
					})
				} else if (!pwres) {
					uni.showToast({
						title: '密码只支持字母数字和符号，且要大于6位',
						icon: "none"
					})
				}else if (this.pw1!=this.pw2) {
					uni.showToast({
						title: '两次密码不一致',
						icon: "none"
					})
				}else if (!phnum) {
					uni.showToast({
						title: '请输入正确的手机号',
						icon: "none"
					})
				} else if (this.company == '') {
					uni.showToast({
						title: '请选择公司',
						icon: "none"
					})
				} else {
					this.addinfo()
					function jump() {
						uni.switchTab({
							url: '/pages/user/user'
						})
					}
					setTimeout(jump, 1000)
				}
			},
			 bindPickerChange: function(e) {
			            console.log('picker发送选择改变，携带值为', e.target.value)
			            this.index = e.target.value
						this.title = this.list[this.index]
						this.company = this.list[this.index]
						console.log(this.company)
			        },
			async addinfo() {
				let res = await this.util.request({
					url: '/api/login/reg',
					data: {
						real_name: this.name,
						card: this.idcard,
						phone: this.phone,
						company:this.company,
						pwd:this.pw1,
					},
					method: 'POST',
				});
				console.log(res.data)
				this.real_name = res.data.real_name
				uni.showToast({
					title: res.msg,
					icon: "none"
				})
			},
			getArrayProps(array, key) {
			    var key = key || "value";
			    var res = [];
			    if (array) {
			        array.forEach(function(t) {
			            res.push(t[key]);
			        });
			    }
			    return res;
			},
			//获取公司配置项
			async getcon() {
				let res = await this.util.request({
					url: '/api/mgtv/get_config.html',
					data: {
						name:'user_company'
					},
					method: 'POST',
				});
				this.array = res.data
				this.list = this.getArrayProps(this.array,'label');
				   console.log(this.list);
			},
			navItemClick() {
				uni.switchTab({
					url: '/pages/user/user?real_name='+this.real_name
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
			margin-top: 80rpx;
			width: 220rpx;
			height: 196rpx;
		}

		.userinput {
			margin: 0 auto;
			margin-top: 70rpx;
			width: 650rpx;
			//height: 160rpx;
			border: 2rpx solid #C0C0C0;
			border-radius: 10rpx;

			.userBox {
				width: 650rpx;
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
					width: 500rpx;
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
				width: 650rpx;
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
					width: 500rpx;
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
			.pwBox1 {
				width: 650rpx;
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
					width: 500rpx;
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
				width: 650rpx;
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
					width: 500rpx;
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
				width: 650rpx;
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
					width: 500rpx;
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
				width: 650rpx;
				height: 80rpx;
				display: flex;
				border-bottom: 2rpx solid #C0C0C0;
				image {
					width: 40rpx;
					height: 30rpx;
					margin: 0 auto;
					margin-top: 27rpx;
				}

				.input {
					display: flex;
					width: 500rpx;
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
							color:#C0C0C0;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
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
