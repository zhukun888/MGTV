<template>
	<view class="home">
		<swiper indicator-dots circular autoplay>
			<swiper-item v-for="item in swipers" :key="item.id">
				<image :src="item.pic" @click="tourl(item.url)"></image>
			</swiper-item>
		</swiper>
		<!-- <view class="notice">
			<image src="../../../static/img/0.jpg"></image>
			<view>
				<span>李玉芬</span>报名参加了各级党组织集中召开学习十九大精神主题党日活动
			</view>
		</view> -->
		<view class="content">
			<view class="selectBox">
				<view @click="change1">
					<text>{{name1}}</text>
					<image :src="isOk1?'../../../static/img/xiala.png':'../../../static/img/xialared.png'" mode="aspectFit"></image>
				</view>
				<view @click="change2">
					<text>{{name2}}</text>
					<image :src="isOk2?'../../../static/img/xiala.png':'../../../static/img/xialared.png'" mode="aspectFit"></image>
				</view>
			</view>
			<view class="hide" :style="{'display':(isOk1?'none':'block')}">
				<radio-group name="radio" @change="radioChange1">
				<view v-for="(item, value) in items1" :key="item.value">
					<text>{{item.label}}</text><radio style='transform:scale(0.8)' color='#dd514c' :value="item.value" :checked="value === current1" />
				</view>
				</radio-group>
			</view>
			<view class="hide" :style="{'display':(isOk2?'none':'block')}">
				<radio-group name="radio" @change="radioChange2">
				<view v-for="(item, value) in items2" :key="item.value">
					<text>{{item.label}}</text><radio style='transform:scale(0.8)' color='#dd514c' :value="item.value" :checked="value === current2"/>
				</view>
				</radio-group>
			</view>
			<view class="content_item" v-for="(item,id) in list" :key="id">
				<image :src="item.image" mode="aspectFit"></image>
				<view class="content_text">
					<view class="content_tit">{{item.title}}</view>
					<view v-if="item.cid==2">文明创建活动</view>
					<view v-if="item.cid==1">党委活动</view>
					<view v-if="item.cid==3">群体活动</view>
					<view v-if="item.cid==4">投票活动</view>
					<view v-if="item.time_state==2" @click="navItemClick(item.id,item.time_state)">立即报名</view>
					<view v-if="item.time_state==1" @click="navItemClick(item.id,item.time_state)">未开始</view>
					<view v-if="item.time_state==3" @click="navItemClick(item.id,item.time_state)">已结束</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isOk1:true,
				isOk2:true,
				swipers: [
				],
				items1:[],
				items2:[
				],
				name1:'活动类型',
				name2:'活动状态',
				current1: 0,
				current2: 0,
				cid:'',
				value:'',
				list:[
				]
			}
		},
		onLoad() {
			this.getbanner();
			this.config1();
			this.config2();
			this.getlist();
		},
		onPullDownRefresh() {
			this.getbanner();
			this.config1();
			this.config2();
			this.getlist();
			uni.stopPullDownRefresh()
		},
		methods: {
			tourl (url) {
				window.location.href = url
			},
			//获取活动列表
			async getlist() {
			    let res = await this.util.request({
			        url: '/api/mgtv/get_activity_list?cid='+this.cid+'&time_state='+this.value,
			        method: 'POST',
			    });
			    console.log(res)
				this.list = res.data
			},
			//获取轮播图
			async getbanner() {
			    let res = await this.util.request({
			        url: '/api/mgtv/get_banner_list',
					data: {
					    type: 3
					},
			        method: 'POST',
			    });
			    console.log(res)
				this.swipers = res.data
			},
			//获取配置项信息
			async config1() {
			    let res = await this.util.request({
			        url: '/api/mgtv/get_config',
					data: {
					    name: 'activity_category'
					},
			        method: 'POST',
			    });
				this.items1 = res.data
			},
			async config2() {
			    let res = await this.util.request({
			        url: '/api/mgtv/get_config',
					data: {
					    name: 'time_state'
					},
			        method: 'POST',
			    });
				this.items2 = res.data
			},
			radioChange1: function(evt) {
			            for (let i = 0; i < this.items1.length; i++) {
			                if (this.items1[i].value === evt.target.value) {
			                    this.current1 = i;
								this.name1=this.items1[i].label;
								this.isOk1=!this.isOk1;
								this.cid = evt.target.value;
								console.log(this.cid)
								this.getlist()
			                    break;
			                }
			            }
			        },
			radioChange2: function(evt) {
			            for (let i = 0; i < this.items2.length; i++) {
			                if (this.items2[i].value === evt.target.value) {
			                    this.current2 = i;
								this.name2=this.items2[i].label;
								this.isOk2=!this.isOk2;
								this.value = evt.target.value;
								console.log(this.value)
								this.getlist()
			                    break;
			                }
			            }
			        },
			change1(){
				this.isOk1=!this.isOk1;
				this.isOk2=true;
			},
			change2(){
				this.isOk2=!this.isOk2;
				this.isOk1=true;
			},
			// 导航点击的处理函数
			navItemClick (id,state) {
				uni.navigateTo({
					url:'activitydetail/activitydetail?id='+id+'&state='+state
				})
			}
		},
		}
</script>

<style lang="scss">
	.home {
		width: 750rpx;
		swiper {
			margin: 0 auto;
			margin-top: 20rpx;
			width: 700rpx;
			height: 380rpx;
			image {
				height: 100%;
				width: 100%;
				border-radius: 30rpx;
			}
		}
		// .notice{
		// 	display: flex;
		// 	align-items: center;
		// 	width: 700rpx;
		// 	height: 100rpx;
		// 	background-color: #fff;
		// 	border-radius: 30rpx;
		// 	margin: 20rpx auto;
		// 	image{
		// 		margin-left: 10rpx;
		// 		width: 50rpx;
		// 		height:50rpx;
		// 		border-radius: 50%;
		// 	}
		// 	view{
		// 		margin-left: 10rpx;
		// 		font-size: 20rpx;
		// 		span{
		// 			color: red;
		// 		}
		// 	}
		// }
		.content{
			position: relative;
			width:660rpx;
			margin:0 auto;
			margin-top: 20rpx;
			background-color: #FFFFFF;
			border-radius: 30rpx;
			.selectBox{
				display:flex;
				width: 100%;
				height:60rpx;
				border-bottom: 1px solid #eee;
				view{
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 28rpx;
					width: 50%;
					text-align: center;
					color:#666666;
					image{
						margin-left: 9rpx;
						width: 25rpx;
						height: 25rpx;
					}
				}
			}
			.hide{
				margin-top: 60rpx;
				display: none;
				position: absolute;
				width: 660rpx;
				background-color: #fff;
				z-index: 999;
				box-shadow: darkgrey 3rpx 3rpx 3rpx 3rpx;
				view{
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding:0 30rpx 0 30rpx;
					height: 60rpx;
					border-bottom:2rpx solid #C0C0C0;
					font-size: 28rpx;
					line-height: 60rpx;
				}
				view:nth-child(4){
					border-bottom:none;
				}
			}
			.content_item{
				display: flex;
				align-items: center;
				width: 100%;
				height: 250rpx;
				border-bottom: 1px solid #eee;
				image{
					width: 45%;
					height:65%;
					border-radius: 20rpx;
				}
				.content_text{
					width: 55%;
					height:60%;
					.content_tit{
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
					}
					view{
						font-size: 25rpx;
						font-weight: 600;
						margin-left: 30rpx;
						margin-bottom: 30rpx;
					}
					view:nth-child(2){
						font-size: 20rpx;
						color: #666666;
					}
					view:nth-child(3){
						color: #fff;
						width:120rpx;
						height: 40rpx;
						font-size: 22rpx;
						font-weight: 400;
						line-height: 40rpx;
						text-align: center;
						background:#dd514c;
						border-radius: 20rpx;
					}
				}
			}
		}
	}
</style>
