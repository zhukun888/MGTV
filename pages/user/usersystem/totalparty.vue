<template>
	<view class="home">
		<view class="top">
			{{childlist1.department}}
		</view>
		<view class="bottom">
			<view class="bottom_item" v-for="(item,index) in childlist1.person" :key="index">
				<view class="left">
					<image src="../../../static/img/nan.png" mode="aspectFit" v-if="item.sex==0"></image>
					<image src="../../../static/img/nan.png" mode="aspectFit" v-if="item.sex==1"></image>
					<image src="../../../static/img/nv.png" mode="aspectFit" v-if="item.sex==2"></image>
					<text>{{item.real_name}}</text>
				</view>
				<view class="right">
					<text>{{item.level}}</text>
				</view>
			</view>
		</view>
		<view class="middle">
			下级组织
		</view>
		<view class="last">
			<view class="last_item" hover-class="change" v-for="(item,id) in childlist1.children" :key="id" @click="navItemClick(item.id)">
				<view class="left">
					<image src="../../../static/img/tuandui.png" mode="aspectFit"></image>
					<text>{{item.name}}</text>
				</view>
				<view class="right">
					<text>></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//党总支id
				id1:1,
				//党委id
				id2:1,
				department:'',
				person:[],
				childlist:{},
				list:[],
				childlist1:{},
			}
		},
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
				this.id1 = option.id1;
				this.id2 = option.id2;
				console.log(this.id1)
				console.log(this.id2)
				this.getlist()
		    },
		methods: {
			navItemClick (id) {
					uni.navigateTo({
						url:'partybranch?id1='+id+'&id2='+this.id2+'&id3='+this.id1
					})
			},
			async getlist() {
			    let res = await this.util.request({
			        url: '/api/users/getDepartmentList',
			        method: 'POST',
			    });
				this.list = res.data.data[0].children;
				for(var i=0;i<this.list.length;i++){
					if(this.id2 == this.list[i].id){
						this.childlist = this.list[i]
					}
				}
				console.log(this.childlist)
				for(var i=0;i<this.childlist.children.length;i++){
					if(this.id1 == this.childlist.children[i].id){
						this.childlist1 = this.childlist.children[i]
					}
				}
			},
		}
	}
</script>

<style lang="scss">
	.home{
		.top{
			width: 750rpx;
			height:100rpx;
			background-color: #fff;
			margin-top: 20rpx;
			line-height: 100rpx;
			padding-left: 30rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.middle{
			width: 750rpx;
			height:60rpx;
			line-height: 60rpx;
			margin-top:20rpx;
			padding-left: 30rpx;
		}
		.bottom{
			margin-top: 20rpx;
			.bottom_item{
				display: flex;
				justify-content: space-between;
				width: 750rpx;
				height:100rpx;
				background-color: #fff;
				.left{
					width:500rpx;
					height:100rpx;
					display: flex;
					align-items: center;
					image{
						width:8%;
						height: 50%;
						margin-left: 50rpx;
						margin-right: 10rpx;
					}
					text{
						line-height: 100rpx;
					}
				}
				.right{
					width:250rpx;
					line-height: 100rpx;
					color:#666666;
				}
			}
		}
		.last{
			.change{
				background-color: #EEEEEE !important;
			}
			margin-top: 20rpx;
			.last_item{
				display: flex;
				justify-content: space-between;
				width: 750rpx;
				height:100rpx;
				background-color: #fff;
				.left{
					width:700rpx;
					height:100rpx;
					display: flex;
					align-items: center;
					image{
						width:8%;
						height: 50%;
						margin-left: 50rpx;
						margin-right: 10rpx;
					}
					text{
						font-size: 24rpx;
						line-height: 50rpx;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
					}
				}
				.right{
					width:50rpx;
					line-height: 100rpx;
					color:#666666;
				}
			}
		}
	}
</style>
