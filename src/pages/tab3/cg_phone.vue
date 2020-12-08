<template>
    <div class="flex" style="position: relative;">
        <van-nav-bar
                title="修改手机号"
                left-arrow
                @click-left="close"

                class="header jianbian"
        />

        <section  class="PT_5">
            <p style="color: #999;line-height:30px;padding:0 14px 0">请输入您需要绑定的新手机号</p>
            <div class="flex_row_between  borderColor_ccc PTB_2">
                <div class="flex_row_left W_75">
                    <div class="fontS_13 W_35 PL_3" style=" color: #333;width: 86px;" >新手机号</div>
                    <input v-model="phone" type="text" placeholder="请输入手机号" class="PL_3 color_333 W_60 fontS_14">
                </div>
            </div>

            <div class="flex_row_between  borderColor_ccc  " style="padding:0px 14px 0 0">
                <div class="flex_row_left W_75">
                    <div class="fontS_13 W_35  PL_3">图片验证码</div>
                    <input v-model="picCode" type="text" placeholder="请输入图形验证码" class="PL_3 color_333 W_60 fontS_14">
                </div>
                <div class="W_30 PTB_2  fontS_14 B_radius_20 textC" style="height: 60px">
                   <img ref="Imgcg" @click="Imgcg" :src="ImgVerify" alt="" style="width: 190px;height:auto;margin-top: 5px">
                </div>
            </div>
            <div class="flex_row_between  borderColor_ccc PTB_2 MT_2" style="padding-right:14px">
                <div class="flex_row_left W_75">
                    <div class="fontS_13 W_35  PL_3" style="color: #333">验证码</div>
                    <input style="width: 100px" v-model="code" type="text" placeholder="请输入验证码" class="PL_3 color_333 W_60 fontS_14 ">
                </div>
                <div @click="sendmsg('')" :class="{dtsend:dtsend}" style="line-height:20px;" class="W_30 PTB_2 color_fff lmjl_btn_bg fontS_14 B_radius_20 textC">{{fnSendMsgText}}</div>

            </div>
            <div @click="change" class="MLR_auto MT_25 flex_rowC W_100 lmjl_btn_bg color_fff PTB_4 B_radius_max fontS_13" style="width: 80%;">确认修改</div>

        </section>

    </div>
</template>
<script >
    import "@/assets/js/iconfont/iconfont.css";
    import {Component,Vue} from 'vue-property-decorator';
    import {mixins} from 'vue-class-component'
    import common from "@/assets/js/common"
    import {Search, NavBar, List, PullRefresh, NoticeBar, Toast} from 'vant';
    import {update_mobile,ImgVerify} from "../../assets/js/const";


    Vue.use(Search).use(NavBar).use(PullRefresh).use(List).use(NoticeBar);

    @Component
    export default class  extends mixins(common) {
        phone="";
        code="";
        picCode="";
        ImgVerify=ImgVerify;
        change() {
            let param={
                mobile:this.phone,
                code:this.code,
            }
            this.http(update_mobile,param).then(v=>{
                if(v.code==0){
                    Toast("修改成功")
                    setTimeout(()=>{
                        this.close();
                    },1000)
                }else{
                    Toast(v.msg)
                }
            })
        }


    }
</script>

<style lang="scss">
    @import "@/assets/css/app.scss";
    @import "@/assets/css/common.scss";
    .van-search__content{

        border-radius: 30px;
    }
    .van-nav-bar__text{
        color: white;
    }
    [class*=van-hairline]::after {
        display: none;
    }
    .lh{
        padding: 6px 14px;
        line-height: 37px;
        .icon_right span{
            color: #999;
        }
    }
    .flex_row_between{
        line-height: 45px;
    }
    .cansend{
        background: #FF2A2E;
        color: white;
        line-height: 20px;
    }
    .dtsend{
        background: #CCCCCC;
        color: white;
        line-height: 20px;
    }
</style>
