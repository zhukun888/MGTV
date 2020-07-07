<template>
    <view class="container">
        <view class="container-item">
            <view >
                <text class="date">2020年X月X期</text>
            </view>
            <view class="test-time">
                <text>考试时间：2020/4/16-2020/06/06</text>
            </view>
            <view class="score-look">
                <text>查看成绩</text>
            </view>
             <view class="test-start" @click="startTest">
                 <text>开始答题</text>
             </view>
        </view>
        <split></split>
    </view>
</template>

<script>
    import split from "@/components/study/split"
    export default {
        data(){
            return{
                
            }
        },
        components:{
            split,
        },
        methods:{
            startTest(){
                uni.navigateTo({
                    url:'../../pages/testPage/testPage',
                 
                    
                })
            }
        }
    }
</script>

<style lang="scss">
    .container{
        width: 750rpx;
        .container-item{
            padding: 48rpx 0rpx 42rpx 51rpx;
            position: relative;
            .date{
                display: inline-block;
                margin-bottom: 26rpx;
                font-size: 30rpx;
                line-height: 24rpx;
                color:rgba(0,0,0,1);
            }
            .test-time{
                display: inline-block;
                font-size: 28rpx;
                color:rgba(56,56,56,1);
            }
            .score-look{
                display: inline-block;
                margin-left: 140rpx;
                font-size: 24rpx;
                color:rgba(47,47,255,1);
            }
            .test-start{
                position: absolute;
                top:38rpx;
                right:39rpx;
                width:158rpx;
                height:58rpx;
                text-align: center;
                background:rgba(221,81,76,1);
                box-shadow:0px 3px 6px rgba(0,0,0,0.16);
                opacity:1;
                border-radius:12px;
                text{
                    font-size: 28rpx;
                    height: 37rpx;
                    line-height: 58rpx;
                    color: rgba(255,255,255,1);
                }
            }
        }
    }
</style>
