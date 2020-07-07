<template>
    <view class="bookson">
        <view class="bookpic">
            
        </view>
        <view class="content">
            <view class="title">
                <text class="main">{{title}}</text>
                <text class="want" @click="want">想读</text> 
            </view>
             <view class="info">
                 <text>{{info}}</text>
             </view>
             
        </view>
       
        
    </view>
</template>

<script>
    export default {
        data(){
            return {
                
            }
        },
        props:{
            title:{
              type:String,
                default:'中国共产党章程'
            },
            info:{
                type:String,
                default:'中国国会十九大/2017-12/人民出版社'
            },
            url:{
                type:String,
                default:"../../pages/lovingstudy/bookRecomend"
            }
        },
        methods:{
            want(){
                    uni.navigateTo({
                        url:this.url,
                })
            }
        }
        
    }
</script>

<style lang="scss">
    .bookson{
        display: flex;
        background:#F1F1F1 ;
    }
    
    .bookpic{
        display: inline-block;
        margin: 28rpx 38rpx 35rpx 33rpx;
        width: 140rpx;
        height: 187rpx;
        background: rgba(238,238,238,1);
    }
    .content{
        display: flex;
        .title{
            margin-top: 70rpx;
            font-size: 0;
            .main{
                margin-right: 180rpx;
                height: 40rpx;
                line-height: 40rpx;
                font-size: 30rpx;
                // background:;
            }
            .want{
                display: inline-block;
                width: 100rpx;
                height:40rpx;
                line-height: 40rpx;
                font-size: 23rpx;
                text-align: center;
                background: rgba(223,92,87,1);
                border-radius: 7rpx;
                color: #FFFFFF;
            }
         
        }
        .info{
            margin-top: 36rpx;
            height: 35rpx;
            font-size: 26rpx;
        }
    }
    
</style>
