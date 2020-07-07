<template>
	<view class="home">
		<image src="../../../static/img/votelist.jpeg" mode="aspectFit"></image>
		<myvote :vote="vote"></myvote>
	</view>
</template>

<script>
	import myvote from "../../../components/myvote.vue"
	export default {
		data() {
			return {
				vote:[]
			}
		},
		components: {
			myvote
		},
		onLoad() {
			this.getvote()
		},
		methods: {
			//获取投票列表
			async getvote() {
				let res = await this.util.request({
					url: '/api/mgtv/get_vote_list',
					method: 'POST',
				});
				console.log(res)
				this.vote = res.data
			},
		}
	}
</script>

<style lang="scss">
	.home {
		width: 750rpx;
			image{
				display: block;
				width: 700rpx;
				height: 300rpx;
				margin: 0 auto;
				border-radius: 20rpx;
				margin-top: 20rpx;
			}
	}
</style>
