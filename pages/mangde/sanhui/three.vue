<template>
    <view class="home">
        <view class="search"><input placeholder="请输入会议名称" auto-focus="true" @input="search($event)"/></view>
        <view class="tab">
            <view @click="select(1)" :class="{ active: showFlag == 1 }">
                <image :src="url1" mode="" class="icon"></image>
                <view>待开始</view>
            </view>
            <view @click="select(2)" :class="{ active: showFlag == 2 }">
                <image :src="url2" mode="" class="icon"></image>
                <view>进行中</view>
            </view>
            <view @click="select(3)" :class="{ active: showFlag == 3 }">
                <image :src="url3" mode="" class="icon"></image>
                <view>已完成</view>
            </view>
        </view>
        <split></split>
        <view class="content">
            <view class="content-item" v-for="(item, index) in content" :key="index">
                <view class="head">
                    <text class="title">{{ item.title }}</text>
                    <text class="type">{{ item.class }}</text>
                </view>
                <view class="second">
                    <text class="time">时间:{{ item.time }}</text>
                </view>
                <view class="address">地址:{{ item.address }}</view>
                <view class="last"><text class="host">主持:{{ item.host }}</text><text class="look" @click="detailLook">查看会议</text></view>
                <split></split>
            </view>
            
        </view>
    </view>
</template>

<script>
import split from '../../../components/study/split.vue';
export default {
    data() {
        return {
            content: [
                {
                    title: '全面贯彻落实新时代的组织路线',
                    class: '支部委员会',
                    host: '张三',
                    time: '2020/11/12 11：30',
                    address: '长沙市开福区XX路1010会议室',
                    
                },
                {
                    title: '全面贯彻落实新时代的组织路线',
                    class: '党课教育',
                    host: '张三',
                    time: '2020/11/12 11：30',
                    address: '长沙市开福区XX路1010会议室',
                    
                },
                {
                    title: '全面贯彻落实新时代的组织路线',
                    class: '党课教育',
                    host: '张三',
                    time: '2020/11/12 11：30',
                    address: '长沙市开福区XX路1010会议室',
                  
                }
            ],
            url1: '../../../static/sanhui/4.png',
            url2: '../../../static/sanhui/2.png',
            url3: '../../../static/sanhui/3.png',
            showFlag: 1
        };
    },
    components: { split },
    methods: {
        select(num) {
            let url4 = '../../../static/sanhui/1.png';
            let url5 = '../../../static/sanhui/2.png';
            let url6 = '../../../static/sanhui/3.png';
            this.showFlag = num;
            switch (num) {
                case 1:
                    this.url1 = '../../../static/sanhui/4.png';
                    this.url2 = url5;
                    this.url3 = url6;
                    break;
                case 2:
                    this.url2 = '../../../static/sanhui/5.png';
                    this.url1 = url4;
                    this.url3 = url6;
                    break;
                case 3:
                    this.url3 = '../../../static/sanhui/6.png';
                    this.url1 = url4;
                    this.url2 = url5;
                    break;
            }
        },
        search(event){
          console.log(event.target.value);  
        },
        detailLook(){
            console.log(2)
            uni.navigateTo({
                url:'./sanhuidetail',
            })
        }
    },
    mounted() {}
};
</script>

<style lang="scss">
.home {
    padding: 0;
    margin: 0 auto;
    background: #f1f1f1;
    .search {
        display: flex;
        align-items: center;
        width: 700rpx;
        height: 50rpx;
        margin-top: 25rpx;
        margin-left: 25rpx;
        background: rgb(199, 199, 199);
        color: rgba(160, 160, 160, 1);
        border-radius: 15rpx;
        input {
            width: 100%;
            height: 50rpx;
            border-radius: 15rpx;
        }
    }
    .tab {
        // width: 711rpx;
        height: 60rpx;
        display: flex;
        margin: 22rpx 115rpx 16rpx 46rpx;
        // border: 2px solid #eee;
        border-radius: 15rpx;
        justify-content: space-between;
        text-align: center;
        .active {
            border-bottom: solid 6rpx red;
        }
        view {
            // border-right:2px solid #eee;
            text-align: center;
            line-height: 60rpx;
            // width:237rpx;
            height: 60rpx;
            display: flex;
            align-items: center;

            .icon {
                display: inline-block;
                width: 28rpx;
                height: 28rpx;
                margin-right: 19rpx;
            }
        }
    }
    .content{
        background: #F1F1F1;
        .content-item{
            padding-right: 32rpx;
            font-size: 0rpx;
            &:first-child{
                margin-top: -20rpx;
            }
            .head{
                margin-left: 41rpx;
                display: flex;
                font-size: 30rpx;
                margin-top: 20rpx;
                // justify-content: space-between;
                align-items: center;
                .type{
                    display: inline-block;
                    margin-left: 36rpx;
                    height: 19rpx;
                    line-height: 19rpx;
                    font-size: 26rpx;
                    padding: 10rpx 17rpx;
                    border-radius: 20rpx;
                    background: #DF5C57;
                    color: #FFFFFF;
                }
            }
            .second{
                margin-left: 41rpx;
                margin-top: 23rpx;
                font-size: 26rpx;
                height: 35rpx;
                line-height: 35rpx;
            }
            .address{
                margin-left: 41rpx;
                font-size: 26rpx;
                margin-top: 14rpx;
            }
            .last{
                display: flex;
                margin-left: 41rpx;
                margin-top: 14rpx;
                height: 44rpx;
                font-size: 26rpx;
                justify-content: space-between;
                align-items: center;
                .look{
                    display: inline-block;
                    position: relative;
                    margin-right: 60rpx;
                    width: 137rpx;
                    height: 44rpx;
                    line-height: 44rpx;
                    text-align: center;
                    border:1px solid rgba(223,92,87,1);
                    border-radius:15rpx;
                    color: rgba(223,92,87,1);
                    bottom: 30rpx;
                }
            }
            
           
            
        }
    }
    
}
</style>
