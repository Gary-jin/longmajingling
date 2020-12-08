<template>
    <div class="header">
        <div class="header W_100 flex_shrink_0">
            <div class="P_4 flex_row_left relative flex_shrink_0">
                <i class="iconfont iconfanhui fontS_20 color_fff" @click="close"></i>
            </div>
        </div>

        <div class="overflow_hidden flex_grow_1">
            <div class="absoluteTLR MLR_auto textC color_fff" style="top: 8rem">
                <img src="@/assets/img/logo-200.png" alt="" class="VW_25 VH_25 ">
            </div>
            <div v-show="yincangShow" @click="goWx"
                 class=" absoluteBLR MLR_auto flex_rowC color_fff W_75 lmjl_btn_bg PTB_4 B_radius_max fontS_15"
                 style="bottom:15rem">
                <i class="iconfont iconweiixn fontS_20 PR_2">
                    <img src="@/assets/img/login-wx.png" alt="" style="width: 24px;vertical-align: -5px"></i>
                微信登录
            </div>
            <div v-show="!sh_miao" @click="openWin('common-mm_login')"
                 class=" absoluteBLR MLR_auto flex_rowC color_fff W_75 lmjl_btn_bg PTB_4 B_radius_max fontS_15"
                 style="bottom:15rem">
                登录
            </div>
            <div class="absoluteBLR" style="display:flex; justify-content:center;bottom:12rem">
                <span style="margin-right: 10px" @click="openWin('common-register')">注册账号</span>
                <span v-show="sh_miao" style="padding-left: 10px;border-left: 1px solid #999" @click="openWin('common-mm_login')">密码登录</span>
            </div>
            <div class="absoluteBLR" style="display:flex;justify-content:center;bottom:3rem">
               <!-- <van-radio-group v-model="radio" @click="radio !=radio" checked-color="#FF2452" style="margin-top:-2px;margin-right: 5px">
                    <van-radio name="true"></van-radio>
                </van-radio-group> -->
                <i @click="radio = !radio" class="iconfont icon_wancheng PL_1 MR_1 fontS_18" :class="radio ? 'iconCol' : 'color_gray_300'"></i>
                登录注册即代表同意 <span style="color: #4a69ff" @click="openWin('common-explain',{title:'服务协议',type:'about',type_:1,})">《服务协议》</span>和 <span @click="openWin('common-explain',{title:'隐私协议',type:'about',type_:5,})" style="color: #4a69ff">《隐私协议》</span>
            </div>
        </div>
    </div>
</template>
<script >
    import {Component,Vue} from 'vue-property-decorator';
    import {mixins} from 'vue-class-component'
    import common from "@/assets/js/common"
    import {login,authWxLogin} from "@/assets/js/const"
    import {Toast,Radio,RadioGroup} from "vant";
        Vue.use(Radio).use(RadioGroup)
    @Component
    export default class index extends mixins(common) {
        radio= true ;
        wx = api.require("wxPlus");
        yincangShow = true;
        goWx() {
            // this.wechatLogin()
            // this.openWin("common-bd_phone")
            if(!this.radio){
                Toast('请先同意《服务协议》和《隐私协议》！')
            } else{
                this.wxLogin()
            }
        }

        // TODO 事件方法统一独立，避免套娃形式
			wxLogin() {
				var that = this;
				that.wx.auth({}, function(ret, err) {
					if (ret.status) {
						that.getWxToken(ret.code);
					}
				});
			}
			getWxToken(code) {
                let that = this;
                that.wx.getToken({
                            code: code
                    },
                    function(ret, err) {
                        if (ret.status) {
                            that.getWxUserInfo(ret);
                        }
                    }
                );
			}
			getWxUserInfo(params) {
                let that = this;
                that.wx.getUserInfo({
                        accessToken: params.accessToken,
                        openId: params.openId
                    },
                    function(ret, err) {
                        if (ret.status) {
                            that.isBindMobile(ret);
                        }
                    }
                );
			}
			isBindMobile(info) {
                let that = this;
                var params = {
                    openid: info.openid,
                    unionid: info.unionid
                };
                that.http(authWxLogin, params).then(function(res) {
                    if (res.code == 0) {
                        var status = res.data.is_bind_mobile;
                        if (status == 1 && res.data.token) {
                            that.setStorage("token", res.data.token);
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
                        } else if (status == 0) {
                            that.openWin("common-bindPhoneNumber", {
                                openid: info.openid,
                                unionid:info.unionid,
                                headimgurl: info.headimgurl,
                                nickname: info.nickname
                            }); //去绑定手机号
                        }
                    }
                });
			}

        mounted() {
            this.exitApp();
            api.sendEvent({name: 'tab0now'});
            if(this.getStorage('yincang') == 'false'){
                 this.yincangShow = false 
            }else{
                this.yincangShow = true 
            }
        }

        login() {
            if(!this.phone)return Toast('请输入手机号');
            if(!this.picCode)return Toast('请输入图片验证码');

            let param={
                mobile:this.phone,
                picCode:this.picCode
            }

            this.http(login,param).then(v=>{
                Toast(v.msg)
            })

        }
    }
</script>

<style lang="scss">
    @import "@/assets/css/app.scss";
    @import "@/assets/css/common.scss";

    .login {
        background-image: linear-gradient(to right, #FF6F5D, #FF2A2E);
    }
    .iconCol{
		color: #4a69ff;
	}
</style>
