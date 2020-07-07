<template>
	<view class="home">
		<view class="main">
			<image class='toppic' src="../../static/img/top.png" mode="aspectFit"></image>
			<image class='dangzhibu' src="../../static/img/dangzhibu.png" mode="aspectFit"></image>
			<view class="main_top">
				<view :class="isAdd1.indexOf(index)!==-1?'main_top_item_click1':'main_top_item1'" v-for="(item,index) in list1" :key="index"
				 @click="light1(index,item.id)">
					<image class='main_top_pic' :src="item.program_image" mode="aspectFit"></image>
					<view class="main_top_star">
						<image class="xingxing" src="../../static/img/star.png" mode="aspectFit"></image>
						<text>{{item.num}}票</text>
					</view>
					<view class="main_top_look" @click="tolook(item.id)">
						<text>查看事迹</text>
					</view>
				</view>
			</view>
			<image class='dangyuan' src="../../static/img/dangyuan.png" mode="aspectFit"></image>
			<view class="main_top">
				<view :class="isAdd2.indexOf(index)!==-1?'main_top_item_click':'main_top_item'" v-for="(item,index) in list2" :key="index"
				 @click="light2(index,item.id)">
					<image class='main_top_pic' :src="item.program_image" mode="aspectFit"></image>
					<view class="main_top_star">
						<image class="xingxing" src="../../static/img/star.png" mode="aspectFit"></image>
						<text>{{item.num}}票</text>
					</view>
					<view class="main_top_look" @click="tolook(item.id)">
						<text>查看事迹</text>
					</view>
				</view>
			</view>
			<image class='dangzhibu' src="../../static/img/dangwu.png" mode="aspectFit"></image>
			<view class="main_top">
				<view class="main_top_item" v-for="(item,index) in list3" :key="index">
					<image class='main_top_pic' :src="item.program_image" mode="aspectFit"></image>
					<!-- <view class="main_top_star">
						<image class ="xingxing"  src="../../static/img/star.png" mode="aspectFit"></image>
						<text>{{item.num}}票</text>
					</view> -->
					<view class="main_top_look" @click="tolook(item.id)">
						<text>查看事迹</text>
					</view>
				</view>
			</view>
			<view class="bottombox">
				<view class="bottom">
				<view @click="addVote">点击投票</view>
				<view @click="todetail">查看规则</view>
			     </view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isAdd1: [],
				isAdd2: [],
				ids1: [],
				ids2: [],
				ids:[],
				list1:[],
				list2:[],
				list3:[],
			}
		},
		onLoad() {
			this.getlist1()
			this.getlist2()
			this.getlist3()
		},
		methods: {
			todetail(){
				uni.navigateTo({
					url:'fengvote'
				})
			},
			tolook(id){
				uni.navigateTo({
					url:'../mangde/plan/detail/detail?id='+id
				})
			},
			async addVote() {
				this.ids=this.ids1.concat(this.ids2)
				console.log(JSON.stringify(this.ids))
				let res = await this.util.request({
					url: '/api/users/addVote',
					data:{
						ids:JSON.stringify(this.ids)
					},
					method: 'POST',
				});
				this.ids1=[]
				this.ids2=[]
				if(res.code==200){
					uni.showToast({
						title: '投票成功',
						icon: "none"
					})
					function jump() {
						uni.redirectTo({
						    url: 'fenglist'
						});
					}
					setTimeout(jump, 1000)
				}
			},
			async getlist1() {
				let res = await this.util.request({
					url: '/api/mgtv/get_program_list.html?cid=3&program_year=2020',
					method: 'POST',
				});
				this.list1 = res.data
			},
			async getlist2() {
				let res = await this.util.request({
					url: '/api/mgtv/get_program_list.html?cid=1&program_year=2020',
					method: 'POST',
				});
				this.list2 = res.data
			},
			async getlist3() {
				let res = await this.util.request({
					url: '/api/mgtv/get_program_list.html?cid=2&program_year=2020',
					method: 'POST',
				});
				this.list3 = res.data
			},
			light1(index, id) {
				let indexItem = this.isAdd1.indexOf(index);
				if (indexItem == -1) {
					if (this.isAdd1.length < 3) {
						this.isAdd1.push(index);
					}
				} else {
					this.isAdd1.splice(indexItem, 1);
				}
				//console.log(this.isAdd1)
				let item = this.ids1.indexOf(id);
				if (item == -1) {
					if (this.ids1.length < 3) {
						this.ids1.push(id);
					}
				} else {
					this.ids1.splice(item, 1);
				}
				console.log(this.ids1)
			},
			light2(index, id) {
				let indexItem = this.isAdd2.indexOf(index);
				if (indexItem == -1) {
					if (this.isAdd2.length < 3) {
						this.isAdd2.push(index);
					}
				} else {
					this.isAdd2.splice(indexItem, 1);
				}
				//console.log(this.isAdd2)
				let item = this.ids2.indexOf(id);
				if (item == -1) {
					if (this.ids2.length < 3) {
						this.ids2.push(id);
					}
				} else {
					this.ids2.splice(item, 1);
				}
				console.log(this.ids2)
			},
		}
	}
</script>

<style lang="scss">
	.home {
		width: 750rpx;

		.main {
			width: 750rpx;
			background: url(../../static/img/background.png) repeat-y;
			background-size: 100% 100%;

			.toppic {
				display: block;
				margin: 0 auto;
			}

			.dangzhibu {
				display: block;
				width: 500rpx;
				height: 200rpx;
				margin: 0 auto;
			}

			.main_top {
				width: 750rpx;
				display: flex;
				flex-wrap: wrap;
				justify-content: center;

				.main_top_item {
					width: 374rpx;
					height: 600rpx;
					//background:red;
					margin: 10rpx auto;
					position: relative;
					display: flex;
					justify-content: center;
					align-items: center;

					.main_top_pic {
						display: block;
						width: 100%;
						height: 100%;
					}

					.main_top_star {
						width: 160rpx;
						height: 50rpx;
						//background-color: red;
						display: flex;
						position: absolute;
						bottom: 50rpx;
						left: 92rpx;
						justify-content: center;
						align-items: center;

						.xingxing {
							display: block;
							width: 40rpx;
							height: 40rpx;
							margin-right: 10rpx;
						}

						text {
							display: block;
							//width: 120rpx;
							color: #fff;
							text-align: center;
							font-size: 20rpx;
						}
					}
					.main_top_look{
						position: absolute;
						bottom: -6rpx;
						left: 92rpx;
						width: 160rpx;
						height: 40rpx;
						background-color: #6d1839;
						text-align: center;
						border-radius: 30rpx;
						line-height: 40rpx;
						text{
							display: block;
							border-radius: 30rpx;
							width: 160rpx;
							height: 40rpx;
							font-size: 24rpx;
							text-align: center;
							line-height: 40rpx;
							color: #fff;
						}
					}
				}
				.main_top_item1 {
					width: 374rpx;
					height: 508rpx;
					//background:red;
					margin: 10rpx auto;
					position: relative;
					display: flex;
					justify-content: center;
					align-items: center;
				
					.main_top_pic {
						display: block;
						width: 100%;
						height: 100%;
					}
				
					.main_top_star {
						width: 160rpx;
						height: 50rpx;
						//background-color: red;
						display: flex;
						position: absolute;
						bottom: 52rpx;
						left: 92rpx;
						justify-content: center;
						align-items: center;
				
						.xingxing {
							display: block;
							width: 40rpx;
							height: 40rpx;
							margin-right: 10rpx;
						}
				
						text {
							display: block;
							//width: 120rpx;
							color: #fff;
							text-align: center;
							font-size: 20rpx;
						}
					}
					.main_top_look{
						position: absolute;
						bottom: -6rpx;
						left: 92rpx;
						width: 160rpx;
						height: 40rpx;
						background-color: #6d1839;
						text-align: center;
						border-radius: 30rpx;
						line-height: 40rpx;
						text{
							display: block;
							border-radius: 30rpx;
							width: 160rpx;
							height: 40rpx;
							font-size: 24rpx;
							text-align: center;
							line-height: 40rpx;
							color: #fff;
						}
					}
					
				}

				.main_top_item_click {
					width: 374rpx;
					height: 600rpx;
					background:red;
					border-radius: 40rpx;
					margin: 10rpx auto;
					position: relative;
					display: flex;
					justify-content: center;
					align-items: center;
					.main_top_pic {
						display: block;
						width: 100%;
						height: 100%;
					}
					
					.main_top_star {
						width: 160rpx;
						height: 50rpx;
						//background-color: red;
						display: flex;
						position: absolute;
						bottom: 50rpx;
						left: 92rpx;
						justify-content: center;
						align-items: center;
					
						.xingxing {
							display: block;
							width: 40rpx;
							height: 40rpx;
							margin-right: 10rpx;
						}
					
						text {
							display: block;
							//width: 120rpx;
							color: #fff;
							text-align: center;
							font-size: 20rpx;
						}
					}
					.main_top_look{
						position: absolute;
						bottom: -6rpx;
						left: 92rpx;
						width: 160rpx;
						height: 40rpx;
						background-color: #6d1839;
						text-align: center;
						border-radius: 30rpx;
						line-height: 40rpx;
						text{
							display: block;
							border-radius: 30rpx;
							width: 160rpx;
							height: 40rpx;
							font-size: 24rpx;
							text-align: center;
							line-height: 40rpx;
							color: #fff;
						}
					}
				}
				.main_top_item_click1 {
					width: 374rpx;
					height: 508rpx;
					background:red;
					border-radius: 40rpx;
					margin: 10rpx auto;
					position: relative;
					display: flex;
					justify-content: center;
					align-items: center;
					.main_top_pic {
						display: block;
						width: 100%;
						height: 100%;
					}
					
					.main_top_star {
						width: 160rpx;
						height: 50rpx;
						//background-color: red;
						display: flex;
						position: absolute;
						bottom: 52rpx;
						left: 92rpx;
						justify-content: center;
						align-items: center;
					
						.xingxing {
							display: block;
							width: 40rpx;
							height: 40rpx;
							margin-right: 10rpx;
						}
					
						text {
							display: block;
							//width: 120rpx;
							color: #fff;
							text-align: center;
							font-size: 20rpx;
						}
					}
					.main_top_look{
						position: absolute;
						bottom: -6rpx;
						left: 92rpx;
						width: 160rpx;
						height: 40rpx;
						background-color: #6d1839;
						text-align: center;
						border-radius: 30rpx;
						line-height: 40rpx;
						text{
							display: block;
							border-radius: 30rpx;
							width: 160rpx;
							height: 40rpx;
							font-size: 24rpx;
							text-align: center;
							line-height: 40rpx;
							color: #fff;
						}
					}
				}
			}

			.dangyuan {
				display: block;
				width: 500rpx;
				height: 200rpx;
				margin: 0 auto;
			}

			.bottombox{
				height: 100rpx;
				.bottom {
					height: 100rpx;
					width: 750rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					position: fixed;
					bottom: 0;
					width: 750rpx;
					height: 100rpx;
					background: #fff;
				
					view {
						color: #fff;
						width: 230rpx;
						height: 60rpx;
						background-color: #6d1839;
						text-align: center;
						line-height: 60rpx;
						border-radius: 30rpx;
						font-size: 28rpx;
						font-weight: 600;
					}
					view:nth-child(1){
						margin-right: 20rpx;
					}
					view:nth-child(2){
						margin-left: 20rpx;
					}
				}
			}
		}
	}
</style>
