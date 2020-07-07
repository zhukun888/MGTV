<template>
	<view class="home">
		<view class="form">
			<view class="form_title">
				<image src="../../../../static/img/biezhen.png" mode="aspectFit"></image>
				<text>个人信息</text>
			</view>
			<view class="form_content">
				<text>姓名</text>
				<text>{{self.real_name}}</text>
			</view>
			<view class="form_content">
				<text>手机</text>
				<text>{{self.phone}}</text>
			</view>
			<view class="form_content">
				<text>性别</text>
				<text>{{self.sex==1?'男':'女'}}</text>
			</view>
			<view class="form_content">
				<text>生日</text>
				<text>{{self.birthday}}</text>
			</view>
			<view class="form_content">
				<text>地区</text>
				<text>{{self.nickname}}</text>
			</view>
		</view>
		<view class="form">
			<view class="form_title">
				<image src="../../../../static/img/biezhen.png" mode="aspectFit"></image>
				<text>个人信息</text>
			</view>
			<view class="form_content">
				<text>党内职务</text>
				<text>{{self.level}}</text>
			</view>
			<view class="form_content">
				<text>荣誉称号</text>
				<text>{{self.title}}</text>
			</view>
			<view class="form_content">
				<text>所在部门</text>
				<text>{{self.depart_name}}</text>
			</view>
		</view>
		<view class="sign" @click="submit">
			提交报名信息
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				self:{},
				id:1,
			}
		},
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
				this.id = option.id;
				console.log(this.id)
				this.getuserinfo()
		    },
		methods: {
			async getuserinfo() {
			    let res = await this.util.request({
			        url: '/api/users/get_my_user_info',
			        method: 'post',
			    });
				this.self = res.data
				console.log(res.data)
			},
			async submit() {
			    let res = await this.util.request({
			        url: '/api/users/joinActivity?id='+this.id,
			        method: 'post',
			    });
				success:{
					uni.showToast({
						icon: 'none',
						title: '报名成功'
					});
				}
			},
		}
	}
</script>

<style lang="scss">
	.home{
		.form{
			width: 750rpx;
			background-color: #fff;
			margin-top: 20rpx;
			.form_title{
				display: flex;
				width: 750rpx;
				height:100rpx;
				border-bottom:2rpx solid #C8C7CC;
				margin-bottom: 20rpx;
				image{
					width:20%;
					height: 90%;
				}
				text{
					display: block;
					line-height: 100rpx;
					font-weight: 600;
					margin-left: -10rpx;
				}
			}
			.form_content{
				display: flex;
				text{
					display: block;
					font-size: 26rpx;
					font-weight: 600;
					margin-left: 60rpx;
					margin-bottom: 30rpx;
				}
			}
		}
		.sign{
			margin:0 auto;
			margin-top: 20rpx;
			margin-bottom: 20rpx;
			color: #fff;
			width: 700rpx;
			height: 70rpx;
			background-color:#dd514c;
			text-align: center;
			line-height: 70rpx;
			border-radius: 30rpx;
			font-size: 28rpx;
			font-weight: 600;
		}
	}
</style>
