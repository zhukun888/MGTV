<template>
	<view>
		<view class="tab-contain">
		    <view  class="tab" @click="seleted(1)" ><text :class="{active:selectedTab==1}" >荐书荐文</text></view>
		    <view  class="tab" @click="seleted(2)"><text  :class="{active:selectedTab==2}">党规党章</text></view>
		    <view  class="tab" @click="seleted(3)" ><text :class="{active:selectedTab==3}">党务指南</text></view>
		    <view  class="tab" @click="seleted(4)" ><text class="last" :class="{active:selectedTab==4}">党建关系擂台赛</text></view>
		</view>
        <split></split>
        <view  v-show="selectedTab==1"><book></book></view>
        <view v-show="selectedTab==2"><guide ></guide></view>
        <view v-show="selectedTab==3"><direction ></direction></view>
        <view v-show="selectedTab==4"><compsition ></compsition></view>
	</view>
</template>

<script>
    import split from "@/components/study/split"
    import compsition from "@/components/study/compsition.vue"
    import direction from "@/components/study/direction.vue"
    import guide from "@/components/study/guide.vue"
    import book from "@/components/study/book.vue"
	export default {
		data() {
			return {
				selectedTab:1,
			}
		},
        components:{
            split,guide,direction,compsition,book
        },
        onLoad(){
            
            window.addEventListener('popstate',this.open1,false)
        },
        
        onHide() {
            uni.removeStorageSync("examQuit");
        },
		methods: {
			seleted(num){
                this.selectedTab=num;
            },
            open1(){
                var exam=uni.getStorageSync("examQuit");
                console.log(exam)
                if(exam=="true"){
                     history.pushState(null, null, document.URL);
                }
            }
		}
	}
</script>

<style lang="scss">
.tab-contain{
    width: 750rpx;
    height: 70rpx;
    padding: 15rpx 31rpx 18rpx 37rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0rpx;
    .tab{
        flex: 1;
        display: inline-block;
        font-size: 28rpx;
        line-height: 28rpx;
        .active{
            color: rgba(221,81,76,1);
        }
        
        .last{
            display: inline-block;
            width:250rpx;
        }
    }
}
</style>
