<template>
    <div >
        <van-nav-bar
                title="完善信息"
                left-arrow
                @click-left="close"
                class="header"
        />
        <div class="overflow_hidden flex_grow_1 W_85 MLR_auto">

            <div class="MT_20">
                <h1 style="font-size:22px">
                    绑定手机号
                </h1>
                <h6 style="margin:10px 0;color: #666666">
                    新用户实名认证后可领养一只猫
                </h6>
                <!-- <div class="color_fff">手机号码</div> -->
                <div class="flex_row_left PT_10 PB_5 borderColor_ccc fontS_14">
                    <input maxlength="11" type="number" v-model="phone" class="W_100 PL_4 color_333 fontS_14" placeholder="请输入手机号">
                </div>
                <div class="flex_row_between  borderColor_ccc PTB_1 ">
                    <div class="flex_row_left W_75">
                        <!--<div class="fontS_13 W_35 color_fff PL_3">图片验证码</div>-->
                        <input v-model="picCode" type="text" placeholder="请输入图形验证码" class="PL_3 color_333 W_60 fontS_14">
                    </div>
                    <div class="W_30 PTB_2  fontS_14 B_radius_20 textC">
                        <img ref="Imgcg" @click="Imgcg" :src="ImgVerify" alt="" style="width: 190px;height:39px;margin-right: 0">
                    </div>
                </div>
                <div class="flex_row_between  borderColor_ccc PTB_2 MT_7">
                    <div class="flex_row_left W_75">
                        <!--<div class="fontS_13 W_35 color_fff PL_3">图片验证码</div>-->
                        <input v-model="code" type="text" placeholder="请输入验证码" class="PL_3 color_333 W_60 fontS_14">
                    </div>
                    <div @click="sendmsg('')" :class="{dtsend:dtsend}" class="W_30 PTB_2 lmjl_btn_bg color_fff fontS_14 B_radius_20 textC">{{fnSendMsgText}}</div>
                </div>
                <div class="flex_row_between borderColor_ccc PTB_4 MT_7 fontS_14">
                    <div class="flex_row_left W_70">
                        <input v-model="codeYQ" type="number" placeholder="请输入邀请码（选填）" class="PL_3 color_333 W_100 fontS_14">
                    </div>
                </div>
            </div>

            <div class="login MLR_auto MT_20 flex_rowC W_100 lmjl_btn_bg PTB_4 B_radius_max fontS_13" @click="fnAuthRegister">进入首页</div>

            <div :class="{active:isfocus}" class="absoluteBLR" style="display:flex;justify-content:center;bottom:3rem">
                <van-checkbox v-model="radio" checked-color="#4a69ff" style="margin-top:-2px;margin-right: 5px"></van-checkbox>

                登录注册即代表同意 <span style="color: #4a69ff" @click="openWin('common-explain',{title:'服务协议',type:'about',type_:1,})">《服务协议》</span>和 <span @click="openWin('common-explain',{title:'隐私协议',type:'about',type_:5,})" style="color: #4a69ff">《隐私协议》</span>
            </div>
        </div>
    </div>
</template>
<script >

    import {Component,Vue} from 'vue-property-decorator';
    import {mixins} from 'vue-class-component'
    import { NavBar, Checkbox, CheckboxGroup, Toast } from 'vant';
    import common from "@/assets/js/common"
    import {ImgVerify,mobile_register} from "@/assets/js/const"
    Vue.use(NavBar).use(Checkbox).use(CheckboxGroup).use(Toast);

    @Component
    export default class index extends mixins(common) {
        phone=""
        picCode=""
        code=""
        codeYQ = ""
        radio=false;
        isfocus=false;
        ImgVerify=ImgVerify;
        mounted() {
            var he=window.innerHeight
            window.onresize= () =>{
                if(window.innerHeight<he){
                    this.isfocus=true;
                }else{
                    this.isfocus=false;

                }
            }
        }
        updateImg() {

        }
        fnAuthRegister() {
            if(!this.radio)return Toast('请同意协议');

            if(!this.phone)return Toast('请输入正确的手机号');
            if(!this.picCode)return Toast('请输入图形验证码');
            if(!this.code)return Toast('请输入验证码');
            let info = {

            }
            this.http(xxxx,info).then((res)=>{
                if (res.code == 0 ) {
                    this.setStorage('token',v.data.token)
                    api.closeWin({
                        name: 'home'
                    });
                    api.openWin({
                        name: 'home',
                        url: './home.html',
                        reload:true,
                        useWKWebView: true,
                        slidBackEnabled:false
                    });
                }
            }) 


        }

    }
</script>

<style lang="scss">
    @import "@/assets/css/app.scss";
    @import "@/assets/css/common.scss";
    .cansend{
        background: #FF2A2E;
        color: white;
    }
    .dtsend{
        background: #CCCCCC;
        color: white;
    }
    .absoluteBLR.active{
        position: static;
        margin-top: 60px;
    }
</style>
