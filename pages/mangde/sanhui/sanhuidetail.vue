<template>
    <view class="all">
        <split></split>
        <view class="header">
            <text>会议详情</text>
        </view>
        <meetingDetail></meetingDetail>
        <view class="people-number" @click="peopleDetain">
            <text class="title">与会人员</text>
            <text class="number">{{peopleNumber}}人</text>
        </view>
        <split></split>
        <view class="contain">
            <view class="title">
               <text >
                会议内容
            </text> 
            </view>
            <view class="detain">
              <text >
                {{contain}}
            </text>  
            </view>
            
        </view>
        <view class="bottom_item" @click="prompt(type)">
            <button :style="{background:color}" >{{type}}</button>
        </view>
    </view>
</template>

<script>
    import meetingDetail from "../../../components/study/meetingDetail.vue"
    import split from "../../../components/study/split.vue"
    export default{
        data(){
            return{
             peopleNumber:33,
             contain:"全市有14个区无本地报告新增确诊病例，具体为平谷区自有疫情以来无报告病例、延庆区157天、怀柔区143天、顺义区141天、密云区138天、石景山区14天、门头沟区13天、房山区13天、东城区12天、通州区8天、朝阳区7天、西城区6天、海淀区3天、昌平区3天。",
             type:"请签到",
            }
        },
        components:{meetingDetail,split},
        
        methods:{
            peopleDetain(){
                uni.navigateTo({
                    url:"./sanhuipeople"
                })
            },
            prompt(type){
                if(type=="请签到"){
                    alert("签到成功")
                   this.type="已签到"
                   
            }
        }},
        computed:{
            color(){
             if(this.type=="请签到"){
                 return "red"
            }else if(this.type=="已签到"){
                return "rgba(127,127,127,1)"
        }}},
        
    }
</script>

<style lang="scss">
    .all{
        margin: 0;
        padding: 0;
        position: relative;
        background: #F1F1F1;
        .header{
            margin-left: 56rpx;
            font-size: 30rpx;
            width: 75%;
            border-bottom: 1px solid rgba(190,181,181,1);
        }
        .people-number{
            display: flex;
            margin:8rpx 0 18rpx 0;
            justify-content: space-between;
            align-items: center;
            .title{
                margin-left: 53rpx;
            }
            .number{
                margin-right: 115rpx;
            }
           
        }
        .contain{
            .title{
             margin-left: 53rpx; 
               margin-top: 20rpx;
            }
            .detain{
                
                margin:19rpx 90rpx 0rpx 53rpx;
                font-size: 26rpx;
            }
        }
        .bottom_item{
            position: fixed;
            margin: 0 auto;  
            width: 637rpx;
            bottom: 63rpx;
            margin-left: 52rpx;
            border-radius:15px;
            font-size: 34rpx;
            
        }
    }
  
    
</style>
