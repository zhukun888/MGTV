<template>
    <view>
        <view class="recommend">
            <text>为你推荐</text>
        </view>
    <bookson></bookson>
    <bookson></bookson>
    <bookson></bookson>
    <bookson></bookson>
    <bookson></bookson>
    <bookson></bookson>
    </view>
</template>

<script>
    import bookson from "@/components/study/bookson.vue"
    export default {
        data(){
            return{
                
            }
        },
        components:{
            bookson,
        }
    }
</script>

<style lang="scss">
    .recommend{
        margin: 0 105rpx 0 33rpx;
        height: 66rpx;
        line-height: 66rpx;
        border-bottom: 1px solid rgba(179,177,177,1);
        font-size: 30rpx;
        color:rgba(0,0,0,1);
    }
</style>
