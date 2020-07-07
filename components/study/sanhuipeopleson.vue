
<template>
    <view class="content">
        <view class="content-item">
            <view class="head">
                <text class="title">{{ item.title }}</text>
                <text class="type">{{ item.class }}</text>
            </view>
            <view class="second">
                <text class="time">应到人数:{{ item.should_come }}</text>
            </view>
            <view class="address">实到人数:{{ item.come }}</view>
            <view class="last">
                <text class="host">主持人:{{ item.host }}</text>
            </view>
            <!-- <split></split> -->
        </view>
    </view>
</template>

<script>
import split from './split.vue';
export default {
    data() {
        return {};
    },
    props: {
        item: {
            type: Object,
            default: () => {
                return { title: '全面贯彻落实新时代的组织路线', should_come: 100, host: '张三',  come:98,class:"支部委员会" };
            }
        }
    },
    components: {
        split
    }
};
</script>

<style lang="scss">
.content {
    background: #f1f1f1;
    .content-item {
        padding-right: 32rpx;
        font-size: 0rpx;
        &:first-child {
            margin-top: -20rpx;
        }
        .head {
            margin-left: 20rpx;
            display: flex;
            font-size: 30rpx;
            margin-top: 20rpx;
            // justify-content: space-between;
            align-items: center;
            .type {
                display: inline-block;
                margin-left: 36rpx;
                height: 19rpx;
                line-height: 19rpx;
                font-size: 26rpx;
                padding: 10rpx 17rpx;
                border-radius: 20rpx;
                background: #df5c57;
                color: #ffffff;
            }
        }
        .second {
            margin-left: 20rpx;
            margin-top: 23rpx;
            font-size: 26rpx;
            height: 35rpx;
            line-height: 35rpx;
        }
        .address {
            margin-left: 20rpx;
            font-size: 26rpx;
            margin-top: 14rpx;
        }
        .last {
            display: flex;
            margin-left: 20rpx;
            margin-top: 14rpx;
            height: 44rpx;
            font-size: 26rpx;
            justify-content: space-between;
            align-items: center;
            .look {
                display: inline-block;
                position: relative;
                margin-right: 60rpx;
                width: 137rpx;
                height: 44rpx;
                line-height: 44rpx;
                text-align: center;
                border: 1px solid rgba(223, 92, 87, 1);
                border-radius: 15rpx;
                color: rgba(223, 92, 87, 1);
                bottom: 30rpx;
            }
        }
    }
}
</style>
