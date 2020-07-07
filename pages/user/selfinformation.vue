<template>
	<view class="home">
		<view class="geren">
			<view class="touxiang">
				<text>头像</text>
				<image src="../../static/img/chaomei2.png" mode="aspectFit"></image>
			</view>
			<view class="item">
				<text>姓名</text>
				<text>{{info.real_name}}</text>
			</view>
			<view class="item">
				<text>性别</text>
				<text>{{sex}}</text>
			</view>
			<view class="item">
				<text>身份证号</text>
				<text>{{info.card}}</text>
			</view>
			<view class="item">
				<text>手机</text>
				<text>{{info.phone}}</text>
			</view>
			<view class="item">
				<text>生日</text>
				<text>{{info.birthday}}</text>
			</view>
		</view>
		<view class="dangnei">
			<view class="item">
				<text>所属公司</text>
				<text>{{info.company}}</text>
			</view>
			<view class="item">
				<text>所属组织</text>
				<text>{{info.depart_name}}</text>
			</view>
			<view class="item">
				<text>党内职务</text>
				<text>{{info.level}}</text>
			</view>
			<view class="item">
				<text>荣誉称号</text>
				<text>{{info.title}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info:{},
				sex:'',
			}
		},
		onLoad() {
			this.getselfinfo()
		},
		methods: {
			setsex(){
				if(this.info.sex==0){
					this.sex='保密'
				}else if(this.info.sex==1){
					this.sex='男'
				}else if(this.info.sex==2){
					this.sex='女'
				}
			},
			//获取个人信息
			async getselfinfo() {
			    let res = await this.util.request({
			        url: '/api/users/get_my_user_info',
			        method: 'POST',
			    });
			    console.log(res)
				this.info = res.data
				success:{
					this.setsex()
				}
			},
		}
	}
</script>

<style lang="scss">
	.home {
		.geren {
			width: 750rpx;
			//height: 564rpx;
			background-color: #fff;
			margin-top: 20rpx;
			.touxiang {
				display: flex;
				width: 750rpx;
				height: 94rpx;
				border-bottom: 2rpx solid #eee;
				align-items: center;
				justify-content: space-between;
				text{
					margin-left: 20rpx;
				}
				image {
					width: 60rpx;
					height: 60rpx;
					border-radius: 50%;
					margin-right: 20rpx;
				}
			}

			.item {
				display: flex;
				width: 750rpx;
				height: 94rpx;
				border-bottom: 2rpx solid #eee;
				align-items: center;
				justify-content: space-between;
				text:nth-child(1){
					margin-left: 20rpx;
				}
				text:nth-child(2){
					margin-right: 20rpx;
				}
			}
		}
		.dangnei {
			width: 750rpx;
			height: 470rpx;
			background-color: #fff;
			margin-top: 20rpx;
		
			.item {
				display: flex;
				width: 750rpx;
				height: 94rpx;
				border-bottom: 2rpx solid #eee;
				align-items: center;
				justify-content: space-between;
				text:nth-child(1){
					margin-left: 20rpx;
				}
				text:nth-child(2){
					margin-right: 20rpx;
				}
			}
		}
	}
</style>
