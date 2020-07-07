<template>
    <view>
    <view class="content">
        <text class="title">{{ title }}</text>
        <image src="../../static/shouchang.png" class="pic1"></image>
        <image src="../../static/fenxiang.png" class="pic2"></image>
    </view>
    
    </view>
</template>

<script>
export default {
    data() {
        return {};
    },
    props: {
        title: {
            type: String,
            default: '第一章党员'
        },
     
    }
};
</script>

<style lang="scss" scoped>
.content {
    display: flex;
    flex-direction: row;
    height: 46rpx;
    background: #F1F1F1;
    line-height: 46rpx;
    width: 100%;
    margin: 36rpx 25rpx 63rpx 0rpx;
    padding-left: 42rpx;
    align-items: center;
    font-size: 34rpx;
    .title {
        margin-right: 326rpx;
        width: 200rpx;
    }
    .pic1 {
        width: 45rpx;
        height: 45rpx;
        margin-right: 50rpx;
    }
    .pic2 {
        // display: inline-block;
        width: 43rpx;
        height: 34rpx;
    }
}
</style>
