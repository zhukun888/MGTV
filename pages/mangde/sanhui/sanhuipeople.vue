<template>
    <view class="all">
         <split></split>
        <view class="head">
            <text>人员详情</text>
        </view>
        <sanhuipeopleson></sanhuipeopleson>
        <sanhuipeople title="出席人员名单"></sanhuipeople>
        <sanhuipeople title="未出席人员名单"></sanhuipeople>
        <sanhuipeople title="请假人员"></sanhuipeople>
    </view>
</template>

<script>
import split from "../../../components/study/split.vue"
import sanhuipeople from "../../../components/study/sanhuipeople.vue"
import sanhuipeopleson from "../../../components/study/sanhuipeopleson.vue"
export default{
    data(){
        return{
           
        }
    },
    components:{split,sanhuipeople,sanhuipeopleson}
}
</script>

<style lang="scss" >
    .all{
        background: #F1F1F1;
        // margin-left: 41rpx;
        .head{
            margin: 20rpx 0 ;
            margin-left: 41rpx;
            padding-bottom: 13rpx;
            width: 80%;
            height: 41rpx;
            line-height: 41rpx;
            border-bottom: 2px solid rgba(190,181,181,1);
            
        }
        
    }
    
</style>
