<template>
    <view class="main" @click="textReding">
        <view class="content">
            <view><text class="tit">{{ title }}</text></view>
            <view class="">
                <image src="@/static/guide/arrow.png" mode="" class="pic"></image>
            </view> 
        </view>
        <split></split>
    </view>
</template>

<script>
import split from '@/components/study/split';
export default {
    data() {
        return {};
    },
    props: {
        title: {
            type: String,
            default: '总纲'
        },
        url:{
            type:String,
            default:"../../pages/lovingstudy/textReading"
        }
    },
    components: { split },
    methods:{
        textReding(){
            uni.navigateTo({
                url:this.url,
        })
    }
}}
</script>

<style lang="scss">
.main{
    // height: 122rpx;
    
    .content{
        height: 110rpx;
        width: 100%;
        line-height: 110rpx;
        font-size: 0;
        .tit{
            display: inline-block;
            margin-left: 43rpx;
            // width: 300rpx;
            font-size: 34rpx;
            // width: 100%;
            // float: left;
        }
       .pic{
           display: inline-block;
           position: relative;
           right: -680rpx;
           height: 33rpx;
           width: 18rpx;
           top:-100rpx
           
    }

}
}
</style>
