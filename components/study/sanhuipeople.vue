<template>
    <view class="all">
       <split></split> 
         <view class="head">
             <text>{{title}}</text>
         </view>
         <view class="main">
             {{name}}
         </view>
    </view>

</template>

<script>
    import split from "./split.vue"
    export default{
        data(){
            return{
                
            }
        },
        components:{
            split,
        },
        props:{
            title:{
                type:String,
                default:'出席人员名单'
            },
            name:{
                type:String,
                default:'张三，李四，王麻子，朱坤，朱坤，自己啊飒飒，阿萨飒，阿萨飒，'
            }
        }
    }
</script>

<style lang="scss">
    .all{
        background: #F1F1F1;
        .head{
            margin-left: 41rpx;
            padding: 18rpx 0;
            width: 80%;
            border-bottom: 1px solid rgba(190,181,181,1);
            font-size: 30rpx;
        }
        .main{
            margin:15rpx 73rpx 34rpx 45rpx;
        }
    }
</style>
