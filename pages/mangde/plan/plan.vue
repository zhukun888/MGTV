<template>
	<view class="home">
		<swiper indicator-dots circular autoplay>
			<swiper-item v-for="item in swipers" :key="item.id">
				<image :src="item.pic"></image>
			</swiper-item>
		</swiper>
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
					<text>{{item.name}}</text><radio style='transform:scale(0.8)' color='#dd514c' :value="item.value" :checked="value === current2"/>
				</view>
				</radio-group>
			</view>
			<view class="content_item" v-for="(item,id) in list" :key="id">
				<image :src="item.program_image" mode="aspectFit"></image>
				<view class="content_text">
					<view class="content_tit">
						<text>{{item.title}}</text>
					</view>
					<view class="content_info">简介:{{item.info}}</view>
					<view class="content_info_year">事迹年份：{{item.program_year}}年</view>
					<view class="content_info_detail"@click="navItemClick(item.id)">查看详情</view>
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
				items1:[
				],
				items2:[
					{
						value:"2020",
						name:'2020年',
					},
					{
						value:"2019",
						name:'2019年',
					},
					{
						value:"2018",
						name:'2018年',
					}
					// {
					// 	value:"2017",
					// 	name:'2017年',
					// },{
					// 	value:"2016",
					// 	name:'2016年',
					// }
				],
				name1:'荣誉称号',
				name2:'事迹年份',
				current1: 0,
				current2: 0,
				cid:'',
				value:'',
				list: [
				]
			}
		},
		onLoad(){
			this.getbanner();
			this.config();
			this.getlist();
		},
		onPullDownRefresh() {
			this.getbanner();
			this.config();
			this.getlist();
			uni.stopPullDownRefresh()
		},
		methods: {
			//默认的列表数据
			async getlist() {
			    let res = await this.util.request({
			        url:'/api/mgtv/get_program_list?cid='+this.cid+'&program_year='+this.value,
			        method: 'POST',
			    });
				this.list = res.data
			},
			//轮播图
			async getbanner() {
			    let res = await this.util.request({
			        url: '/api/mgtv/get_banner_list',
					data: {
					    type: 2
					},
			        method: 'POST',
			    });
				this.swipers = res.data
			},
			//配置项
			async config() {
			    let res = await this.util.request({
			        url: '/api/mgtv/get_config',
					data: {
					    name: 'program_category'
					},
			        method: 'POST',
			    });
				this.items1 = res.data
			},
			//配置项1变化
			radioChange1: function(evt) {
			            for (let i = 0; i < this.items1.length; i++) {
			                if (this.items1[i].value === evt.target.value) {
			                    this.current1 = i;
								this.name1=this.items1[i].label;
								this.isOk1=!this.isOk1;
								this.cid = evt.target.value;
								this.getlist()
			                    break;
			                }
			            }
			        },
			//配置项2变化
			radioChange2: function(evt) {
			            for (let i = 0; i < this.items2.length; i++) {
			                if (this.items2[i].value === evt.target.value) {
			                    this.current2 = i;
								this.name2=this.items2[i].name;
								this.isOk2=!this.isOk2;
								this.value=evt.target.value;
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
			navItemClick(id) {
				uni.navigateTo({
					url:'./detail/detail?id='+id,
				})
			}

		}
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

		.content {
			width: 660rpx;
			margin: 0 auto;
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
				// view:nth-child(4){
				// 	border-bottom:none;
				// }
			}

			.content_item {
				display: flex;
				align-items: center;
				width: 100%;
				height: 320rpx;
				border-bottom: 1px solid #eee;

				image {
					width: 30%;
					height: 100%;
				}

				.content_text {
					width: 70%;
					height: 80%;
					.content_tit{
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
					.content_info{
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
					}
					.content_info_year{
						margin-top: 30rpx;
					}
					.content_info_detail{
						margin-top: 30rpx;
					}
					view {
						font-size: 25rpx;
						margin-left: 30rpx;
						margin-bottom: 10rpx;
					}

					view:nth-child(4) {
						color: #fff;
						width: 120rpx;
						height: 40rpx;
						font-size: 22rpx;
						font-weight: 400;
						line-height: 40rpx;
						text-align: center;
						background: #dd514c;
						border-radius: 20rpx;
					}
				}
			}
		}
	}
</style>
