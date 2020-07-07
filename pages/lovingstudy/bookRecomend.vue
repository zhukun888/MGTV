<template>
    <view>
        <split></split>
        <view class="container">
            <view class="head">
                <view class="image"></view>
                <view class="content">
                    <view class="title">
                        <text>{{ title }}</text>
                    </view>
                    <view class="author">
                        <text>作者：{{ author }}</text>
                    </view>
                    <view class="public">
                        <text>{{ public }}</text>
                    </view>
                    <view class="public-time"><text>出版时间：{{ publickTime }}</text></view>
                </view>
            </view>
            <textReadingHead title="内容简介"></textReadingHead>
            <view class="main">
                <text>{{passage}}</text>
            </view>
        </view>
        
    </view>
</template>

<script>
import split from '../../components/study/split.vue';
import textReadingHead from "@/components/study/textReadingHead.vue"
export default {
    data() {
        return {};
    },
    props: {
        title: {
            type: String,
            default: '中国共产党章程'
        },
        author: {
            type: String,
            default: '中国工会'
        },
        public: {
            type: String,
            default: '人民出版社'
        },
        publickTime: {
            type: String,
            default: '2000/3/4'
        },
        passage:{
            type:String,
            default:'八大党章和修改党章报告是建国以来毛泽东建党思想发展的重要标志，是探索执政党建设规律的初步成果，同以前历次的党章不同，八大党章是我们党领导革命胜利并转人经济建设之后制定的第一一部党章，反映了执政的党所处在的特殊地位、环境及时代赋予的责任；特别是还反映了我国生产资料私有制的社会主义改造基本完成，全面开展社会主义建设的新形势、新要求s'
        }
    },
    components: {
        split,textReadingHead
    }
};
</script>

<style lang="scss">
.container {
    // display: flex;
    background: #F1F1F1;
    // flex-direction: column;
    align-items: center;
    width:100% ;
    // direction: ;
    flex-direction: row;
    .main{
       margin: 0 28rpx 0 42rpx;
       font-size: 34rpx;
       line-height: 50rpx;
    }
    .head{display: flex;
   
    font-size: 0rpx;}
    .image{
        // display: inline-block;
        margin: 25rpx 73rpx 44rpx 48rpx;
        width: 235rpx;
        height: 314rpx;
        background: rgba(238,238,238,1);
    }
    .content{
        // vertical-align: top;
        // display: inline-block;
        // display: flex;
        background: #F1F1F1;
        .title{
            display: inline-block;
            margin-top: 70rpx;
            text-align: left;
            line-height: 48rpx;
            height: 48rpx;
            font-size: 36rpx;
        }
        .author{
            margin-top: 45rpx;
            font-size: 30rpx;
        }
        .public{
            margin-top: 17rpx;
            font-size: 30rpx;
        }
        .public-time{
            margin-top: 17rpx;
            font-size: 30rpx;
        }
          
    }
}
</style>
