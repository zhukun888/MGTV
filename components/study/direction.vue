<template>
    <view>
    <view class="header">
        <view class="title" @click="select(1)" :class="{active:currentIndex==1}"><text>红色精神</text></view>
        <view class="title" @click="select(2)" :class="{active:currentIndex==2}"><text>党大会制度</text></view>
        <view class="title" @click="select(3)" :class="{active:currentIndex==3}"><text>农村基层建设</text></view>
        <view class="title" @click="select(4)" :class="{active:currentIndex==4}"><text>党内选取制度</text></view>
    </view>
    <split></split>
    <guideson></guideson>
    <guideson></guideson>
    <guideson></guideson>
    <guideson></guideson>
    </view>
</template>

<script>
    import split from "@/components/study/split"
    import guideson from "@/components/study/guideson"
    export default{
        data(){
            return{
              currentIndex:0//当前选中  
            }
        },
        components:{
            split,guideson,
        },
        methods:{
            select(num){
                this.currentIndex=num;
            }
        }
        
    }
</script>

<style lang="scss" scoped>
    .header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 58rpx;
         margin-right: 100rpx;
        .title{
            height: 31rpx;
            line-height: 31rpx;
            font-size: 16rpx;
            padding: 5rpx 22rpx ;
            background: rgba(132,132,132,1);
            border-radius: 7rpx;
            color: rgba(255,255,255,1);
            &:first-child{
                margin-left: 41rpx;
            }
            &.active{
                background: rgba(223,92,87,1);
            }
      }   
    }
    
</style>
