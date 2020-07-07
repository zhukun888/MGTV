<template>
	<view class="home">
		<view class="tabBar">
			<view :class="isColor?color:''" @click="change">我的活动</view>
			<view :class="isColor?'':color" @click="change">我的投票</view>
		</view>
		<myactivity v-if="isColor" :list="list"></myactivity>
		<myvote v-if="!isColor" :vote="vote"></myvote>
	</view>
</template>

<script>
	import myactivity from "../../../components/myactivity/myactivity.vue"
	import myvote from "../../../components/myvote1.vue"
	export default {
		data() {
			return {
				isColor: true,
				color: 'color',
				vote:[],
				list:[],
			}
		},
		components: {
			myactivity,
			myvote
		},
		onLoad() {
			this.getvote()
			this.getlist()
		},
		methods: {
			//获取我的投票列表
			async getvote() {
				let res = await this.util.request({
					url: '/api/mgtv/my_vote_list',
					method: 'POST',
				});
				console.log(res.data)
				this.vote = res.data
			},
			//获取我的活动列表
			async getlist() {
				let res = await this.util.request({
					url: '/api/mgtv/my_activity_list',
					method: 'POST',
				});
				console.log(res)
				this.list = res.data
			},
			change() {
				this.isColor = !this.isColor
			}
		}
	}
</script>

<style lang="scss">
	.home {
		width: 750rpx;

		.tabBar {
			display: flex;
			width: 700rpx;
			height: 80rpx;
			line-height: 80rpx;
			margin: 0 auto;
			margin-top: 20rpx;
			background-color: #fff;
			border-radius: 20rpx;

			.color {
				background-color: #dd514c;
				border-radius: 20rpx;
				color: #fff;
			}

			view {
				width: 50%;
				text-align: center;
			}
		}

	}
</style>
