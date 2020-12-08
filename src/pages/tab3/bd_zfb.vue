<template>
    <div class="flex" style="position: relative;">
        <van-nav-bar
                :title="type=='wx'?'绑定微信':'绑定支付宝'"
                left-arrow
                @click-left="close"
                class="header jianbian"
        />

        <section class="PT_3">
            <p style="line-height:30px;padding:0px 14px">请输入相应的真实信息</p>
            <div class="flex_row_between  borderColor_ccc PTB_1">
                <div class="flex_row_left W_75">
                    <div class="fontS_13   PL_5" style="color: #333;min-width: 90px;" >真实姓名</div>
                    <input style="width: 250px;" v-model="name" type="text" :placeholder="type=='wx'?'请输入微信认证的真实姓名':'请输入支付宝认证的真实姓名'" class="PL_3 color_333 W_60 fontS_12">
                </div>
            </div>
            <div class="flex_row_between  borderColor_ccc PTB_1">
                <div class="flex_row_left W_75">
                    <div class="fontS_13   PL_5" style="color: #333;width: 90px;" >{{type=='wx'?'微信号':'支付宝号'}}</div>
                    <input v-model="account" type="text" :placeholder="type=='wx'?'请输入微信号':'请输入支付宝号'" class="PL_3 color_333 W_60 fontS_12">
                </div>
            </div>
            <div class="flex_row_between  borderColor_ccc PTB_1">
                <div class="flex_row_left W_75">
                    <div class="fontS_13   PL_5" style="color: #333;width: 90px;" >手机号码</div>
                    <input v-model="phone" placeholder="请输入手机号" type="text" class="PL_3 color_333 W_60 fontS_12">
                </div>
            </div>
            <div class="flex_row_between  borderColor_ccc" style="padding: 5px 14px 0 9px">
                <div class="flex_row_left W_75">
                    <div class="fontS_13 W_35  PL_3">图片验证码</div>
                    <input v-model="picCode" type="text" placeholder="请输入图形验证码" class="PL_3 color_333 W_60 fontS_14">
                </div>
                <div class="W_30 PTB_2  fontS_14 B_radius_20 textC" style="height: 55px">
                    <img ref="Imgcg" @click="Imgcg" :src="ImgVerify" alt="" style="width: 190px;height:auto;margin-right: 0;margin-top:0">
                </div>
            </div>
            <div class="flex_row_between  borderColor_ccc PTB_1 " style="padding-right:14px">
                <div class="flex_row_left W_75">
                    <div class="fontS_13 W_35  PL_5" style="color: #333">短信验证码</div>
                    <input  v-model="code" type="text" placeholder="请输入验证码" class="PL_3 color_333 W_60 fontS_12 ">
                </div>
                <div @click="sendmsg(``)" :class="{dtsend:dtsend}" style="line-height:20px;" class="W_30 PTB_2 lmjl_btn_bg color_fff fontS_14 B_radius_20 textC">{{fnSendMsgText}}</div>

            </div>
            <div @click="submit" class="MLR_auto MT_20 flex_rowC W_100 lmjl_btn_bg color_fff PTB_3 B_radius_max fontS_13" style="width: 80%;">保存</div>

        </section>

    </div>
</template>
<script >
    import "@/assets/js/iconfont/iconfont.css";
    import {Component,Vue} from 'vue-property-decorator';
    import {mixins} from 'vue-class-component'
    import common from "@/assets/js/common"
    import {Search, NavBar, List, PullRefresh, NoticeBar, Toast} from 'vant';
    import {ImgVerify,bind_zfb,userinfo} from '@/assets/js/const';
    Vue.use(Search).use(NavBar).use(PullRefresh).use(List).use(NoticeBar);



    @Component
    export default class  extends mixins(common) {
        fnSendMsgText="获取验证码";
        ImgVerify=ImgVerify;
        account="";
        code="";
        phone="";
        name="";
        userinfo={};
        type=api.pageParam.type;

        mounted() {
            this.getuserinfo()
        }
        submit() {
            if(!this.name)return Toast('请输入正式姓名');
            if(!this.account)return Toast('请输入绑定号');
            if(!this.code)return Toast('请输入短信验证码');
            let param={
                username:this.name,
                account:this.account,
                code:this.code,
                type:this.type=='wx'?2:1,
            }
              this.http(bind_zfb,param).then(v=>{
                  if(v.code==0){
                      Toast("绑定成功");
                      setTimeout(()=>{
                          this.close();
                          api.sendEvent({
                              name: 'tab3-safety',
                              extra: 0
                          });
                      },1000)
                  }else{
                      Toast(v.msg)
                  }
              })
        }
        getuserinfo() {
            this.http(userinfo).then(v=>{
                this.phone=v.data.info.mobile;
            })
        }
    }
</script>

<style lang="scss">
    @import "@/assets/css/common.scss";
    @import "@/assets/css/app.scss";
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
