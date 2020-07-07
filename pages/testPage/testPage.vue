<template>
    <view>
        <view class="title">
            <text class="dsc">{{subjiect_list[current_question].learn_type_name}}</text>
            <text class="order">{{ current_question+1 }}/{{ this.subjiect_list.length }}</text>
        </view>
        <split></split>
        <view class="question">
            <view class="title"><text>题目</text></view>
            <view class="content">
                <text>{{ subjiect_list[current_question].title }}</text>
            </view>
            <view
                class="answer"
                v-for="(option, answer, index) in answers"
                @click="add(answer,option,index)"
                :class="{selected:count_click[index]==1,right:his_ans[current_question].indexOf(answer)!=-1&&right_answer.indexOf(answer)!=-1,'not-right':his_ans[current_question].indexOf(answer)!=-1&&right_answer.indexOf(answer)==-1}"
            >
                <text>{{ answer.toUpperCase()+'. '+option }}</text>
            </view>
            <view class="prompt-detail" v-show="this.promptShow">
                <text class="header">答案解析</text>
                <text>
                    
                    <span class="right-answer">正确答案：{{ correct_options }}</span>
                    <span class="right-answer">您的答案：{{this.his_ans[this.current_question].toUpperCase()}}</span>
                </text>
                <view class="detail">
                    <text>{{ detail }}</text>index
                </view>
                <view class="close"><text>×</text></view>
            </view>
        </view>
        <view class="bottom">
            <view class="last-question" @click="back"><text>上一题</text></view>
            <view class="sure" @click="next_to" v-show="!is_sure">
                <text>{{surestring}}</text>
            </view>
            <view class="sure" @click="sure" v-show="is_sure">
                <text>确定</text>
            </view>
        </view>
        <uni-popup ref="popups" type="dialog">
        			<uni-popup-dialog type="success" mode="base" title="提示" @close="close(done)" content="确定要退出吗？结果将不会保存" @confirm="confirm1"></uni-popup-dialog>
        </uni-popup>
    </view>
</template>

<script>
import split from '@/components/study/split';
import uniPopup from '@/components/uni-popup/uni-popup.vue'
import uniPopupDialo from '@/components/uni-popup/uni-popup-dialog1.vue'
import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
export default {
    data() {
        return {
            exam_id:0,
            his_ans:[],//缓存已经答过的题
            count_click:[0,0,0,0],
            is_sure:true,
            current_question: 0,//当前的题的index
            promptShow: false,
            selectAnswers: [0, 0, 0, 0],
            surestring: '下一题',
            subjiect_list:[
            {"learn_type_name":"多选题","learn_type":"2","score":5,"title":"中国阿萨是世界上最大的国家总面积是","content":{a:1233333322222221,b:22,c:33,d:44},"correct_options":"a,b",suggest:"2222222222我是芒果TV CTO"},
            {"learn_type_name":"单选题","learn_type":"1","score":5,"title":"11111111","content":{a:222211,b:22,c:33,d:22},"correct_options":"a",suggest:"33333333333"},
            {"learn_type_name":"单选题","learn_type":"1","score":5,"title":"中国北极___________落成于2014年7月28日，是中国建成的首个北极科考站。","content":{a:"长江",b:"黄河",c:33},"correct_options":"a",suggest:"中国北极___________落成于2014年7月28日，是中国建成的首个北极科考站。"},
            ]//获取的题库
        }
    },
    components: {
        split,uniPopup,uniPopupDialog,uniPopupDialo
    },
    onLoad(){
      this.subjiect_list.forEach((item)=>{
          this.$set(item,"ans_add",new Set())
      }),
      this.his_ans.push("");
      history.pushState(null, null, document.URL);
      console.log(document.URL);
      window.addEventListener('popstate',this.open1,false)
      
    },
    onShow() {
       console.log("!!!");
    },
    onUnload() {
    			window.removeEventListener("popstate", this.open1,false);
    		},
    computed: {
        detail() {//提示框的提示内容
            return   this.subjiect_list[this.current_question].suggest;
        },
        answers(){//当前题的选项
            return this.subjiect_list[this.current_question].content;
            
        },
        correct_options(){//提示框的正确答案显示
            return this.subjiect_list[this.current_question].correct_options.toUpperCase()
        },
        current_add_ans(){//当前的题的已选集合
            return this.subjiect_list[this.current_question].ans_add 
        },
        type(){//题的类型1是单选题，2是多选题
            return this.subjiect_list[this.current_question].learn_type
        },
        right_answer(){
            return this.subjiect_list[this.current_question].correct_options
        },
       
        
    },
    watch:{
      current_question(newV ,oldV){//通过判断是否确认过答案判断ADD和NEXT的交互逻辑，
          if(this.his_ans[newV]!=""){this.add=function(){return null};this.is_sure=false;this.promptShow=true;this.next_to=()=>{if(this.surestring=="提交"){console.log("完成考试");this.commit()}else{this.current_question+=1;this.his_ans.push("");}}}//返回时只显示提供下一题，并且无法再次选择，并且下一题逻辑改变
          else{
              this.add=this.add_to;
              this.is_sure=true 
              this.next_to=this.next
              this.count_click=[0,0,0,0]
              console.log(this.his_ans)
              this.promptShow=false
          }
          if(this.current_question+1==this.subjiect_list.length){this.surestring="提交";}
      }
    },
    methods:{
        add_to(answer,option,index){//选中时推入每个题自己的and_add数组,修改代表每个选项是否被选中的click_count数组为0还是1
           if(this.type==2){ //多选题
            if(this.count_click[index]==0){//选择
                this.$set(this.count_click,index,1)
                this.current_add_ans.add(answer)
                // console.log(this.current_add_ans);
                
            }else{//取选
                this.current_add_ans.delete(answer)
                 this.$set(this.count_click,index,0)
                console.log(2);
                this.count_click[index]=0;
                // console.log(this.count_click)
                // console.log(this.current_add_ans)
            }
            
            }
            else{//单选题
                this.count_click.forEach((item,index)=>{
                    this.$set(this.count_click,index,0)
                });//对所有项清零
                this.$set(this.count_click,index,1);
                this.current_add_ans.clear()
                this.current_add_ans.add(answer)
                console.log(this.current_add_ans)
                //对点击的项置一
            }
           
          
        },
        add(answer,option,index){
            this.add_to(answer,Option,index);
        },
        commit(){
            let count=0
            this.subjiect_list.forEach((item,index)=>{
                if(item.correct_options==this.his_ans[index]){
                  count++  
                }
            })
          uni.navigateTo({
              url:"commit?id="+this.exam_id+"&count="+count
          });
        },
        back(){//回到上一题
            if(this.current_question==0){alert("😀已经从头开始啦")}
            else{
                this.current_question-=1;}
                this.count_click=[0,0,0,0]//清除已选
                this.surestring="下一题"//显示下一题
            },
            sure(){//确认按钮交互一直不变，不需要副本
            if(this.count_click.toString()==[0,0,0,0].toString()){console.log("请选择")}else{
           this.$set(this.his_ans,this.current_question, Array.from(this.current_add_ans).sort().join(","))//每点击一次给给当前题目加
            this.is_sure=false;//下一题按钮出现
            
            this.promptShow=true
            console.log(this.his_ans)
            if(this.current_question+1==this.subjiect_list.length){this.surestring="提交" }//最后一题
            this.add=function(){return null}}
            
        },
        done(){
          history.pushState(null,null,document.URL)  
        },
        close(done){
               // uni.navigateTo({
               //    url:"@/pages/testPage/testPage"
               // });
                done()   
                  
        },
        open1() {
        				
        				this.$refs.popups.open()
                        // history.pushState(null, null, document.URL);
                        
        			},
        next(){//作为副本保存
            console.log(this.his_ans)
            if(this.surestring=="提交"){console.log("完成考试");this.commit()}//最后一题,点击提交
              else{ this.current_question+=1;//点击下一题
               this.count_click=[0,0,0,0]
               this.his_ans.push("")//给his_ans注入一个空字符串，，防止点击下一题出错
               this.is_sure=true}//按钮变为确定
              this.add= this.add_to
              
            },
         next_to(){//运行
             this.next()
         } ,
           confirm1(done) {
           				 uni.setStorageSync("examQuit","true");
           				uni.switchTab({
           				    url: '/pages/lovingstudy/lovingstudy'
           				});
                        // history.pushState(null,null,document.URL)
           				done();
                       
           			}
    }
}
</script>
<style lang="scss" scoped>
.title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 28rpx;
    
    width: 750rpx;
    height: 70rpx;
    .dsc {
        display: inline-block;
        padding: 48rpx;
    }
    .order {
        display: inline-block;
        margin-right: 37rpx;
    }
}
.question {
    width: 750rpx;
    font-size: 28rpx;
    .title {
        margin-left: 48rpx;
    }
    .content {
        margin-left: 48rpx;
        padding: 0px;
        margin-right: 63rpx;
        margin-bottom: 80rpx;
        background: #F1F1F1;
        // min-height: 400rpx;
        // background:rgba(255,255,255,1);
    }
    .answer {
        display: inline-block;
        min-width: 260rpx;
        height: 58rpx;
        margin-bottom: 87rpx;
        margin-left: 48rpx;
        border-radius: 12px;
        line-height: 58rpx;
        padding-left: 40rpx;
        padding-right: 40rpx;
        text-align: left;
        color: #F1F1F1;
        opacity: 1;
        background: rgba(148, 143, 143, 1);
        &:last-child {
            background: rgba(148, 143, 143, 1);
        }
        &.selected {
            background: rgba(5, 153, 207, 1);
        }
        &.right {
            background: rgba(5, 207, 164, 1);
        }
        &.not-right {
            background: rgba(221, 81, 76, 1);
        }
    }
    .prompt-detail {
        position: relative;
        margin-top: 40rpx;
        margin-left: 24rpx;
        margin-right: 24rpx;
        height: 400rpx;
        background: #F1F1F1;
        padding: 23rpx;
        .header {
            margin-left: 0;
            display: block;
            margin-bottom: 38rpx;
        }
        .right-answer {
            display: block;
            color: #d24c4c;
        }
        .detail {
            margin-top: 35rpx;
            margin-right: 53rpx;
        }
        .close {
            position: absolute;
            right: 0rpx;
            top: 0rpx;
            padding: 20rpx;
            text-align: center;
            vertical-align: middle;
            font-weight: 700;
            font-size: 28rpx;
        }
    }
}
.bottom {
    position: fixed;
    width: 100%;
    // z-index: 100;
    // background-color: #F1F1F1;
    display: flex;
    height: 58rpx;
    text-align: center;
    align-items: center;
    justify-content: space-between;
    bottom: 37rpx;
    background: #F1F1F1;
    line-height: 58rpx;

    .last-question {
        width: 158rpx;
        height: 100%;
        border: 1px solid rgba(112, 112, 112, 1);
        border-radius: 12px;
        margin-left: 54rpx;
        margin-right: 300rpx;
    }
    .sure {
        height: 100%;
        width: 158rpx;
        border: 1px solid rgba(112, 112, 112, 1);
        border-radius: 12px;
        margin-right: 50rpx;
    }
    image {
        margin-left: 20rpx;
        margin-right: 30rpx;
        width: 35rpx;
        height: 35rpx;
    }
}
</style>
