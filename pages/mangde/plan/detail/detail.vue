<template>
	<view class="home">
		<view class="head">
			<image :src="info.program_image" mode="aspectFit"></image>
			<text>{{info.title}}</text>
		</view>
		<view class="intro">
			<view class="intro_title">
				<image src="../../../../static/img/jvxing.png" mode="aspectFit"></image>
				<text>简介</text>
			</view>
			<text>{{info.info}}</text>
		</view>
		<view class="intro">
			<view class="intro_title">
				<image src="../../../../static/img/jvxing.png" mode="aspectFit"></image>
				<text>先进事迹</text>
			</view>
			<text>{{info.content}}</text>
		</view>
		<view class="bottomBox">
			<view class="bottom">
				<image @click="change" :src="flag ? require('../../../../static/img/dianzan.png'):require('../../../../static/img/dianzan2.png')"
				 mode="aspectFit"></image>
				<view @click="tovote">去投票</view>
			</view>
		</view>

	</view>
</template>

<script>
	var jweixin = require('jweixin-module');
	export default {
		data() {
			return {
				flag: true,
				id: 0,
				info: {},
				share: {},
				url:'',
			}
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			this.id = option.id;
			this.getdetail();
			this.getshare();
			console.log(this.id)
		},
		methods: {
			tovote(){
				uni.navigateTo({
					url:"../../../fengvote/fenglist"
				})
			},
			//获取分享信息
			async getshare() {
				let url=window.location.href.split("#")[0];
				console.log(url)
				let res = await this.util.request({
					url: '/api/mgtv/shareWechat',
					data:{
						shareUrl:url
					},
					method: 'post',
				});
				this.share = res.data
				success:{
					this.performShar()
				}
			},
			performShar() {
				this.url=window.location.href.split("#")[0],
				jweixin.config({
					debug: this.share.debug,
					appId: this.share.appId,
					timestamp: this.share.timestamp,
					nonceStr: this.share.nonceStr,
					signature: this.share.signature,
					jsApiList: this.share.jsApiList,
				});
				jweixin.error(() => {
				})
				jweixin.ready(function() { //需在用户可能点击分享按钮前就先调用
					jweixin.onMenuShareAppMessage({
						title: '大家好', // 分享标题
						desc: '222222', // 分享描述
						link: this.url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
						imgUrl: this.info.program_image, // 分享图标
						success: function() {

						}
					})
					jweixin.onMenuShareTimeline({
						title: this.info.title, // 分享标题
						desc: this.info.info, // 分享描述
						link: this.url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
						imgUrl: this.info.program_image, // 分享图标
						success: function() {

						}
					})
				});
			},
			//获取详情
			sharemessage(){
				uni.showToast({
					icon: 'none',
					title: '点击右上角进行分享'
				});
			},
			async getdetail() {
				let res = await this.util.request({
					url: '/api/mgtv/get_program_detail?id=' + this.id,
					method: 'post',
				});
				this.info = res.data;
			},
			change() {
				this.flag = !this.flag
				if (this.flag) {
					uni.showToast({
						icon: 'none',
						title: '取消成功'
					});
				} else {
					uni.showToast({
						icon: 'none',
						title: '点赞成功'
					});
				}
			}
		}
	}
</script>

<style lang="scss">
	.home {
		.head {
			width: 750rpx;
			height: 400rpx;
			border-bottom-right-radius: 60%;
			border-bottom-left-radius: 60%;
			border-bottom: 2rpx solid #C8C7CC;
			background-color: #fff;
			padding-top: 30rpx;

			image {
				display: block;
				width: 300rpx;
				height: 300rpx;
				margin: 0 auto;
				border-radius: 50%;
			}

			text {
				display: block;
				width: 400rpx;
				height: 100rpx;
				text-align: center;
				line-height: 100rpx;

				margin: 0 auto;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}

		.intro {
			width: 700rpx;
			margin: 0 auto;
			margin-top: 30rpx;
			border-radius: 30rpx;
			background: #fff;
			padding-bottom: 20rpx;

			.intro_title {
				display: flex;
				align-items: center;
				width: 100%;
				height: 60rpx;
				border-bottom: 2rpx solid #C8C7CC;

				image {
					width: 10rpx;
					height: 50rpx;
					margin-left: 28rpx;
				}

				text {
					font-size: 28rpx;
					line-height: 60rpx;
					margin-left: 20rpx;
				}
			}

			text {
				font-size: 26rpx;
			}
		}

		.bottomBox {
			height: 100rpx;

			.bottom {
				display: flex;
				justify-content: center;
				align-items: center;
				position: fixed;
				bottom: 0;
				width: 750rpx;
				height: 100rpx;
				background: #fff;

				image {
					width: 40rpx;
					height: 40rpx;
					margin-right: 50rpx;
				}

				view {
					color: #fff;
					width: 300rpx;
					height: 60rpx;
					background-color: #dd514c;
					text-align: center;
					line-height: 60rpx;
					border-radius: 30rpx;
					font-size: 28rpx;
				}
			}
		}

	}
</style>
