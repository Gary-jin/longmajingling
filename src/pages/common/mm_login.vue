<template>
    <div >
        <van-nav-bar
                title="密码登录"
                left-arrow
                @click-left="close"
                class="header"
        />
        <div class="overflow_hidden flex_grow_1 W_85 MLR_auto">

            <div class="MT_20">
                <h1 style="font-size:22px">
                    欢迎登录
                </h1>
                <div class="flex_row_left PTB_3  borderColor_ccc fontS_14 MT_15">
                    <input  type="number" v-model="phone" class="W_100 PL_4 color_333 fontS_14" placeholder="请输入手机号码">
                </div>
                <div class="flex_row_between borderColor_ccc PTB_4 MT_7 fontS_14">
                    <div class="flex_row_left W_70">
                        <input v-model="pas" type="password" placeholder="请输入密码" class="PL_3 color_333 W_100 fontS_14">
                    </div>
                </div>
                <span style="float: right;color: #999;margin-top: 20px" @click="openWin('common-find_pas')">忘记密码</span>
            </div>

            <div style="margin-top:15rem" class="MLR_auto MT_40 flex_rowC W_100 lmjl_btn_bg PTB_4 color_fff B_radius_max fontS_13" @click="fnAuthRegister">密码登录</div>

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
    import {login} from "@/assets/js/const"

    Vue.use(NavBar).use(Checkbox).use(CheckboxGroup);
    @Component
    export default class index extends mixins(common) {
        // phone = '150000000'
        // phone="15093092497"
        // phone =  "13526524170"
        // pas="123456"
        phone=""
        pas=""
        radio=true;
        isfocus=false
        fnAuthRegister() {
            if(!this.phone)return Toast('请输入手机号码');
            if(!this.pas)return Toast('请输入密码');
            if(!this.radio)return Toast('请同意协议');

            let param={
                mobile:this.phone,
                password:this.pas
            }

            this.http(login,param).then(v=>{
                Toast(v.msg)
                if(v.code=="0")setTimeout(()=>{
                    this.setStorage('token',v.data.token)
                    api.closeWin({
                        name: 'home'
                    });
                    api.openWin({
                        name: 'home',
                        url: './home.html',
                        useWKWebView: true,
                        reload:true,
                        slidBackEnabled:false
                    });
                    api.sendEvent({
                        name: 'tab0',
                        extra: 0
                    });
                    api.sendEvent({name: 'firstRegister'});
                } ,1000);

            })
        }

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
