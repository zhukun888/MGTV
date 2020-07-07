<template>
	<view class="home">
		<view class="userBox">
			<!-- <view class="user" v-if="!hasLogin">
				<view class="usertop">
					<image :src="ava?'../../static/img/chaomei1.png':this.avatar" mode="aspectFit" @click="getCode"></image>
					<view class="usertext">
						<view>点击用户登录</view>
						<view>{{title}}</view>
					</view>
				</view>
			</view> -->
			<view class="user" v-if="!hasLogin">
				<view class="usertop" @click="toreg">
					<image src='../../static/img/chaomei1.png' mode="aspectFit"></image>
					<view class="usertext">
						<view>{{ava?'点击头像登录':name}}</view>
						<view>{{ava?'请先登录':'请等待审核'}}</view>
					</view>
				</view>
			</view>
			<view class="user" v-show="hasLogin">
				<view class="usertop">
					<image src="../../static/img/chaomei1.png" mode="aspectFit"></image>
					<view class="usertext">
						<view>{{info.real_name}}</view>
						<view>积分:{{info.integral}}</view>
					</view>
					<view class="more" @click="edit">更多</view>
				</view>
				<view class="userbottom">
					<view class="information">
						<view>{{info.depart_name}}</view>
					</view>
					<view class="information">
						<view>{{info.level}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="navBox">
			<view class="nav_item" v-for="(item,id) in navs" :key="id" @click="navItemClick(item.url)">
				<image :src="item.icon" mode="aspectFit"></image>
				<text>{{item.name}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import util from "../../config.js"
	export default {
		computed: {
			...mapState(['hasLogin'])
		},
		data() {
			return {
				navs: [],
				info: {},
				information: {},
				ava:true,
				name:''
			}
		},
		onLoad: function (option) {
				if(option.real_name){
					this.name = option.real_name;
				}
				this.changeava()//检测登录改变头像
				this.reload()//检测缓存是否登录
				this.getmenu()
		  },
		methods: {
			// ttt(){
			// 	uni.navigateTo({
			// 		url: '../fengvote/fenglist'
			// 	})
			// },
			...mapMutations(['login', 'change']),
			toreg() {
				uni.navigateTo({
					url: '/pages/login/userlogin'
				})
			},
			//回调获取到信息后，通过getinformation()填充页面
			// reload(){
			// },
			//回调后获取信息
			//改状态
			changeava(){
				if(this.name){
					this.ava=false
				}
			},
			reload(){
				const userInfo = uni.getStorageSync('userInfo');
				if (userInfo) {
					this.getinformation()
					this.change()
				}
				
			},
			reget() {
				const userInfo = uni.getStorageSync('userInfo');
				if (userInfo.token) {//有token代表已经登录
					this.getinformation()
					this.change()
				}else{
					
					const num = this.getUrlParam('code')//code的值给num
					if (num) {
						this.getmessage(num)
						//清掉code
						var currenturl = window.location.href;
						if (location.href.indexOf("?code=") != -1) {
							var newUrl = location.href.split("?")[0];
							history.pushState('', '', newUrl); //参数可省略
						}
					}else{
						if( userInfo.uid>0 &&  userInfo.real_name==''){
							uni.navigateTo({
								url: '/pages/login/login?uid=' + userInfo.uid
							})
						}else if( userInfo.real_name){
							const userInfo = uni.getStorageSync('userInfo');
							this.avatar = userInfo.avatar
							this.ava=false
							this.title='审核中'
						}else{
							this.title=''
						}
					}
				}
			},
			getUrlParam(name) {//获得URLcode的值
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
				var r = window.location.search.substr(1).match(reg);
				if (r != null) return unescape(r[2]);
				return null;
			},
			async getinformation() {
				let res = await this.util.request({
					url: '/api/users/get_my_user_info',
					method: 'POST',
				});
				this.info = res.data
			},
			//产生三位随机数。得到传入微信的STATE
			getnum() {
				var num = '';
				for (var i = 0; i < 3; i++) {
					num += Math.floor(Math.random() * 10);
				}
				return num
			},
			getCode() {
				const code = this.getUrlParam('code') // 截取code
				const local = util.baseurl+'/wxh5/pages/user/user'
				const appid = util.appid
				let state = this.getnum()
				if (code == null || code === '') { // 如果没有code，则去请求
				console.log(local)
				console.log(appid)
					window.location.href =
						'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=' + encodeURIComponent(
							local) + '&response_type=code&scope=snsapi_userinfo&state=' + state + '#wechat_redirect'//进入微信登录页面返回一个带CODE的原URL
				} else {
					this.getmessage(code)
				}
			},
			tologin() {
				if (this.info.real_name == '') {
					uni.navigateTo({
						url: '/pages/login/login?uid=' + this.info.uid
					})
				}else{
					const userInfo = uni.getStorageSync('userInfo');
					this.avatar = userInfo.avatar
					this.ava=false
					this.title='审核中'
				}
			},
			async getmessage(code) {//将code提交给后台
				let res = await this.util.request({
					url: '/api/login/loginByCode?code=' + code,
					method: 'POST',
				});
				this.info = res.data;
				
				this.login(this.info);
				if (this.info.real_name == '') {
					uni.navigateTo({
						url: '/pages/login/login?uid=' + this.info.uid
					})
				}else{
					const userInfo = uni.getStorageSync('userInfo');
					this.avatar = userInfo.avatar
					this.ava=false
					this.title='审核中'
				}
				window.location.reload();
			},
			async getmenu() {
				let res = await this.util.request({
					url: '/api/mgtv/get_my_naviga',
					method: 'POST',
				});
				this.navs = res.data.my_index_menu
			},
			// fun(){
			// 	uni.navigateTo({
			// 		url: '/pages/login/login'
			// 	})
			// },
			//从本地获取个人信息
			// getinfomation() {
			// 	uni.getStorage({
			// 		key: 'userInfo',
			// 		success: function(res) {
			// 			this.information = res.data
			// 		}
			// 	});
			// },
			edit() {
				uni.navigateTo({
					url: 'selfinformation'
				})
			},
			navItemClick(url) {
				uni.navigateTo({
					url:'../../'+url
				})
			}
		}
	}
</script>

<style lang="scss">
	.home {
		width: 750rpx;

		.userBox {
			width: 750rpx;
			height: 600rpx;
			background-image: url(../../static/img/back.png);
			background-size: 100% 100%;
			margin-top: -90rpx;
			display: flex;
			justify-content: center;

			.user {
				margin-top: 190rpx;
				width: 701rpx;
				height: 311rpx;
				border-radius: 10rpx;
				background-color: #dd514c;

				.usertop {
					width: 701rpx;
					height: 65%;
					display: flex;
					align-items: center;

					image {
						width: 130rpx;
						height: 130rpx;
						border-radius: 50%;
						background-color: #fff;
						margin-left: 61rpx;
						margin-right: 30rpx;
					}

					.usertext {
						display: block;
						background-color: #dd514c;
						width: 200rpx;
						height: 100rpx;

						view {
							width: 200rpx;
							color: #fff;
						}

						view:nth-child(2) {
							background-color: #dd514c;
							font-size: 24rpx;
							font-weight: 500;
							margin-top: 20rpx;
						}
					}

					.more {
						color: #fff;
						font-size: 24rpx;
						margin-left: 140rpx;
					}
				}

				.userbottom {
					width: 701rpx;
					height: 35%;
					background-color: #f98077;
					border-bottom-right-radius: 10rpx;
					border-bottom-left-radius: 10rpx;
					display: flex;

					.information {
						width: 50%;
						height: 100%;

						view {
							width: 100%;
							height: 50%;
							color: #fff;
							text-align: center;
							line-height: 100%;
						}

						view:nth-child(1) {
							margin-top: 6rpx;
							line-height: 290%;
							font-weight: 600;
							font-size: 28rpx;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
				
						}

						// view:nth-child(2) {
						// 	font-size: 24rpx;
						// 	font-weight: 400;
						// 	margin-top: 6rpx;
						// }
					}
				}
			}
		}

		.navBox {
			width: 690rpx;
			margin: 0 auto;
			margin-top: 20rpx;
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			align-items: center;

			.nav_item {
				justify-content: center;
				align-items: center;
				margin: 20rpx auto;
				width: 220rpx;
				height: 260rpx;
				border-radius: 20rpx;
				background-color: #fff;
				font-size: 40rpx;
				font-weight: 600;
				text-align: center;

				image {
					display: block;
					width: 66rpx;
					height: 81rpx;
					margin: 0 auto;
					margin-top: 63rpx;
				}

				text {
					display: block;
					font-size: 25rpx;
					margin-top: 20rpx;
				}
			}
		}
	}
</style>
