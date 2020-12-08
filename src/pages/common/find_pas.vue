<template>
    <div >
        <van-nav-bar
                title="找回密码"
                left-arrow
                @click-left="close"
                class="header"
        />
        <div class="overflow_hidden flex_grow_1 W_85 MLR_auto">

            <div class="MT_20">
                <div class="color_fff">手机号码</div>
                <div class="flex_row_left PTB_3  borderColor_ccc fontS_14">
                    <input type="number" v-model="phone" class="W_100 PL_4 color_333 fontS_14" placeholder="请输入手机号">
                </div>

                <div class="flex_row_between  borderColor_ccc PTB_2 MT_6">
                    <div class="flex_row_left W_75">
                        <!--<div class="fontS_13 W_35 color_fff PL_3">图片验证码</div>-->
                        <input v-model="picCode" type="text" placeholder="请输入图形验证码" class="PL_3 color_333 W_60 fontS_14">
                    </div>
                    <div class="W_30 PTB_2  fontS_14 B_radius_20 textC">
                        <img ref="Imgcg" @click="Imgcg" :src="ImgVerify" alt="" style="width: 190px;height:auto;margin-right: 0">
                    </div>
                </div>
                <div class="flex_row_between  borderColor_ccc PTB_2 MT_6">
                    <div class="flex_row_left W_75">
                        <!--<div class="fontS_13 W_35 color_fff PL_3">图片验证码</div>-->
                        <input v-model="code" type="text" placeholder="请输入验证码" class="PL_3 color_333 W_60 fontS_14">
                    </div>
                    <div @click="sendmsg('')" :class="{dtsend:dtsend}" class="W_30 PTB_2 lmjl_btn_bg color_fff fontS_14 B_radius_20 textC">{{fnSendMsgText}}</div>

                </div>
                <div class="flex_row_between borderColor_ccc PTB_4 MT_6 fontS_14">
                    <div class="flex_row_left W_70">
                        <input type="password" maxlength="20" v-model="pas" placeholder="请输入密码" class="PL_3 color_333 W_100 fontS_14">
                    </div>
                </div>
            </div>

            <div class="MLR_auto MT_20 flex_rowC W_100 lmjl_btn_bg PTB_4 B_radius_max color_fff fontS_13" @click="fnAuthRegister">完成</div>

            <div :class="{active:isfocus}"  class="absoluteBLR" style="display:flex;justify-content:center;bottom:3rem">

                <van-checkbox v-model="radio" checked-color="#4a69ff" style="margin-top:-2px;margin-right: 5px"></van-checkbox>
                登录注册即代表同意 <span style="color: #4a69ff" @click="openWin('common-explain',{title:'服务协议',type:'about',type_:1,})">《服务协议》</span>和 <span @click="openWin('common-explain',{title:'隐私协议',type:'about',type_:5,})" style="color: #4a69ff">《隐私协议》</span>

            </div>
        </div>
    </div>
</template>
<script >
    import {Component,Vue} from 'vue-property-decorator';
    import {mixins} from 'vue-class-component'
    import {NavBar, Checkbox, CheckboxGroup, Toast} from 'vant';
    import common from "@/assets/js/common"
    import {forget_password,ImgVerify} from "@/assets/js/const"
    Vue.use(NavBar).use(Checkbox).use(CheckboxGroup);

    @Component
    export default class index extends mixins(common) {
        phone=""
        picCode=""
        code=""
        pas=""
        radio=false;
        ImgVerify=ImgVerify;
        isfocus=false;
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

        fnAuthRegister() {
            if(!this.radio)return Toast('请同意协议');

            if(!this.phone)return Toast('请输入手机号');
            if(!this.code)return Toast('请输入验证码');
            if(!this.pas)return Toast('请输入密码');
            // if(this.pas.length<8)return Toast('请输入大于8位长度的密码');


            let param={
                mobile:this.phone,
                code:this.code,
                password:this.pas
            }

            this.http(forget_password,param).then(v=>{
                Toast(v.msg);
                if(v.code=="0")setTimeout(()=>{
                  this.close();
                } ,1000);

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
