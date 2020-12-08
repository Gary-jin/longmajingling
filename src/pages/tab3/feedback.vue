<template>
    <div class="flex">
        <van-nav-bar
                title="意见反馈"
                left-arrow
                @click-left="close"
                class="header"
        />
        <section >
            <h1>* 请选择反馈问题的类型</h1>
            <div>
                <van-radio-group v-model="radio">
                    <div class="flex_row_between PTB_3 BB_1_eee" style="padding:10px 0;line-height: 25px;" v-for="(v,i) in list" :key="i">
                        <div >
                            <span style="width:70px;display: inline-block" class="fontS_14">{{v.name}}</span>
                            <span class="fontS_14" style="color: #999999">{{v.text}}</span>
                        </div>
                        <div class="flex_colT flex_items_end" >
                            <van-radio :name="i"></van-radio>
                        </div>
                    </div>
                </van-radio-group>
            </div>
            <div class="BB_5_eee"></div>
            <h1>* 添加描述</h1>
            <textarea v-model="info" placeholder="请详细描述您遇到的问题（10字以上），上传界面截图、账号帮助更快解决！" name="" id="" cols="30" rows="10" style="border-radius: 5px;width: 100%;padding: 10px" class="B_1_eee">

            </textarea>
            <h1>* 上传图片(选填，提供问题截图)</h1>
            <van-uploader :after-read="afterRead"  v-model="fileList" multiple  :before-read="beforeRead"/>
            <div class="BB_5_eee MT_3"></div>
            <div @click="submit" class="MLR_auto MT_13 flex_rowC W_100 lmjl_btn_bg color_fff PTB_4 B_radius_max fontS_13" style="width: 70%">提交</div>
        </section>
    </div>
</template>

<script>
    import "@/assets/js/iconfont/iconfont.css";
    import {Component, Vue,Prop} from 'vue-property-decorator';
    import {mixins} from 'vue-class-component'
    import common from "@/assets/js/common"
    import { NavBar,RadioGroup, Radio,Uploader,Toast } from 'vant';
    import {ask_sub} from '@/assets/js/const';


    Vue.use(NavBar).use(RadioGroup).use(Radio).use(Uploader);

    @Component
    export default class extends mixins(common) {
        list=[{
            name:"性能体验",
            text:"白屏、卡顿、闪退、图片出不来等"
        },{
            name:"功能异常",
            text:"现有功能无法正常使用"
        },{
            name:"产品建议",
            text:"好的建议会被采纳"
        },{
            name:"其他反馈",

        }]
        radio='-1'
        info=''


        fileList= []

        // 返回布尔值
        beforeRead(file) {
            if(this.fileList.length>0){
                Toast("超过图片上传数量");
                return false;
            }
            if (file.type !== 'image/jpeg') {
                Toast('请上传 jpg 格式图片');
                return false;
            }

            return true;
        }

        afterRead(file) {
            // console.log(file.content);
            // console.log(this.fileList);
        }
        submit() {
            if(this.radio<0){
               return  Toast("请选择问题类型");
            }
            if(this.info.length<10){
               return  Toast("问题描述不少于10字");
            }
            let param={
                ask_type:++this.radio,
                info:this.info,
                img:this.fileList[0]?this.fileList[0].content:""
            }
            this.http(ask_sub,param).then(v=>{
                Toast(v.msg)
                if(v.code==0){
                    setTimeout(()=>{
                        this.close();
                    },1000)
                }

            })
        }
    }
</script>
<style lang="scss">
    @import "@/assets/css/app.scss";
    @import "@/assets/css/common.scss";
    input{
        line-height: 50px;
        border-bottom: 1px solid #E6E6E6;
        width: 100%;
        padding-left: 10px;
    }
    .van-nav-bar__text{
        color: white;
    }
    .van-radio__icon--checked .van-icon{
        background-color:#FFB838;
        border-color: #FFB838;
    }
    .van-radio__icon .van-icon{
        border: 1px solid #FFB838;

    }
    h1{
        color: #3868FF;
        line-height: 40px;
    }
    section{
        padding: 12px;
    }
</style>
