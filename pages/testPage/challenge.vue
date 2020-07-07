<template>
  <view class="all">
      <split></split>
      <view class="head">
          <text >本学期学习排名</text><input type="text" value="" placeholder="   搜索用户名"  @blur="show_list"/>
          <view class="icon">
              
          </view>
      </view>
  </view>
</template>

<script>
    import split from "../../components/study/split.vue"
    export default{
        data(){
            return {
               list:[]      
            }
        },
        components:{
            split,
        },
        methods:{
           show_list(){
               
           } 
        }
    }
</script>

<style scoped lang="scss">
    .all{
        width: 750rpx;
        .head{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            height: 102rpx;
            align-items: center;
            border-bottom: solid 1px rgba(137,137,137,1);
            text{
                // display: inline-block;
                width: 224rpx;
                font-size:32rpx;
                line-height: 32rpx;
                margin-left: 27rpx;
            }
            input{
                // display: inline-block;
                // width: 360rpx;
                background: #A0A0A0;
                border-radius:25rpx;
                margin-right: 9rpx;
                padding-left: 63rpx;
            }
            .icon{
                position: absolute;
                left: 53%;
                width:23rpx;
                height:23rpx;
                border:2px solid rgba(151,147,147,1);
                border-radius:50%;
                opacity:1;
            }
        }
    }
</style>
