<template>
    <view class="commit-content">
        <view class="main">本次答对的题目数:<text class="num-correct">{{count}}</text>道</view>
        <view class="main">正确率:<text class="ratio">{{ratio}}</text></view>
        <view class="main">错题数:<text class="not-right">{{num_notright}}</text></view>
        <view class="main">用时:<text class="time">{{time}}</text></view>
        <view class="main">积分:<text class="time">{{score}}</text></view>
        <view class="choose">
            <view @click="back">返回</view>
            <view @click="challenge">发起挑战</view>
            <view @click="again">再来一次</view>
        </view>
    </view>
</template>

<script>
    export default{
        data(){
           return {
               id:0,
               count:0,
               ratio:'',
               num_notright:0,
               time:'',
               score:Number,
           } 
        },
        onLoad(option){//接受来自API的数据并且格式化
            this.id=option.id;
            this.count=option.count
            // this.count=50
            this.ratio=Math.round(34/50*100)+'%'
            this.score=28
            this.time="00:06:38"
        },
        methods:{
            back(){
                uni.switchTab({
                    url:"../lovingstudy/lovingstudy"
                })
            },
            challenge(){
                uni.navigateTo({
                    url:"./challenge"
                })
            },
            again(){
                uni.navigateTo({
                    url:"./testPage"
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .commit-content{
        margin: 113rpx  auto 504rpx auto;
        width: 85%;
        height:690rpx;
        background: rgba(255,255,255,1);
        .main{
            margin: 0 0 40rpx 53rpx;
            height: 37rpx;
            line-height: 37rpx;
            &:first-child{
                margin-top: 53rpx;
            }
            &:last-child{
                margin-bottom: 93rpx;
            }
            .num-correct{
               margin:0 32rpx 0 32rpx;
               font-size:42rpx; 
               color:rgba(5,207,164,1);
            }
            .ratio{
                margin-left: 47rpx;
                font-size:42rpx;
                color:rgba(5,207,164,1);
            }
            .not-right{
                margin-left: 47rpx;
            }
            .time{
               margin-left: 75rpx; 
            }
          
        }
        .choose{
            display: flex;
            margin-top: 200rpx;
            flex-direction: row;
            justify-content: space-around;
            view{
                text-align: center;
                height: 58rpx;
                width: 158rpx;
                line-height: 58rpx;
                border: 1px solid rgba(112,112,112,1);
                border-radius:12px;
            }
        }   
    }
</style>
