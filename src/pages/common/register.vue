<template>
    <div >
        <van-nav-bar
                title="注册账号"
                left-arrow
                @click-left="close"
                class="header"
        />
        <div class="overflow_hidden flex_grow_1 W_85 MLR_auto">

            <div class="MT_10">
                <div class="color_fff">手机号码</div>
                <div class="flex_row_left  fontS_14 MT_5">
                    <img src="@/assets/img/yqmgl.png" alt="" style="width: 26px;height: 26px">
                    <input type="text" v-model="abc" class="W_100 PL_4 color_333 fontS_14 box" placeholder="请输入邀请码(选填)">
                </div>
                <div class="flex_row_left  fontS_14 MT_5">
                    <img src="@/assets/img/sjh.png" alt="" style="width: 26px;height: 26px">
                    <input type="text" v-model="phone" class="W_100 PL_4 color_333 fontS_14 box" placeholder="请输入手机号">
                </div>
                <div class="flex_row_left  fontS_14 MT_5">
                    <img src="@/assets/img/mm.png" alt="" style="width: 26px;height: 26px">
                    <input type="password" v-model="pas" class="W_100 PL_4 color_333 fontS_14 box" placeholder="请输入登录密码">
                </div>
                <div class="flex_row_left  fontS_14 MT_5" >
                    <img src="@/assets/img/yzm.png" alt="" style="min-width: 25px;height: 26px">
                    <input type="text" v-model="picCode" class="W_100 PL_4 color_333 fontS_14 box" placeholder="请输入图片验证码">
                    <img ref="Imgcg" @click="Imgcg" :src="ImgVerify" alt="" style="width: 190px;height:39px;margin-right: 0">
                </div>
                <div class="flex_row_left  fontS_14 MT_5" >
                    <img src="@/assets/img/dx.png" alt="" style="min-width: 25px;height: 26px">
                    <input type="text" v-model="yzCode" class="W_100 PL_4 color_333 fontS_14 box" placeholder="请输入短信验证码">
                    <div @click="sendmsg('reg')" :class="{dtsend:dtsend}" class=" PTB_2 lmjl_btn_bg color_fff fontS_14  textC" style="width:190px;line-height:30px;margin-right: 0">
                        {{fnSendMsgText}}
                    </div>
                </div>
            </div>
            <div class=" MLR_auto MT_20 flex_rowC W_100 lmjl_btn_bg PTB_4 B_radius_max color_fff fontS_13" @click="fnAuthRegister">完成注册</div>

            <div :class="{active:isfocus}" class="absoluteBLR" style="display:flex;justify-content:center;bottom:3rem">

                <van-checkbox v-model="radio" checked-color="#4a69ff" style="margin-top:-2px;margin-right: 5px"></van-checkbox>
                登录注册即代表同意 <span style="color: #4a69ff" @click="openWin('common-explain',{title:'服务协议',type:'about',type_:1,})">《服务协议》</span>和 <span @click="openWin('common-explain',{title:'隐私协议',type:'about',type_:5,})" style="color: #4a69ff">《隐私协议》</span>

            </div>
        </div>
    </div>
</template>
<script>

    import {Component,Vue} from 'vue-property-decorator';
    import {mixins} from 'vue-class-component'
    import {NavBar, Checkbox, CheckboxGroup, Toast} from 'vant';
    import common from "@/assets/js/common"
    import {ImgVerify,mobile_register} from "@/assets/js/const"

    Vue.use(NavBar).use(Checkbox).use(CheckboxGroup);

    @Component
    export default class index extends mixins(common) {
        abc="";
        phone="";
        picCode="";
        pas="";
        yzCode="";

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
            if(!this.picCode)return Toast('请输入图片验证码');
            if(!this.yzCode)return Toast('请输入验证码');
            if(!this.pas)return Toast('请输入登录密码');
            let param={
                mobile:this.phone,
                number:this.abc,
                code:this.yzCode,
                password:this.pas,
            }
            this.http(mobile_register,param).then(a=>{
                Toast(a.msg);
                if(a.code=="0")setTimeout(()=> this.close(),1000);
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
    .box{
        border: 1px solid #DBDBDB;
    }
    .flex_row_left img{
        margin-right: 17px;
    }
    input{
        line-height: 37px;
        padding:0px 10px ;
    }
    input::placeholder{
      color: #999!important;
    }
    .absoluteBLR.active{
        position: static;
        margin-top: 60px;
    }
</style>
