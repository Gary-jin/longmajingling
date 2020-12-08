<template>
    <div class="flex" style="position: relative;">
        <van-nav-bar
                :title="type==1?'修改密码':'设置密码' "
                left-arrow
                @click-left="close"

                class="header jianbian"
        />

        <section v-if="type == 1"  class="PT_5">
            <p style="color: #999;line-height:30px;padding: 0px 14px">请输入您当前登录密码</p>
            <div class="flex_row_between  borderColor_ccc PTB_2">
                <div class="flex_row_left W_75">
                    <div class="fontS_13 W_35  PL_5" style="color: #333;width:130px;" >当前登录密码</div>
                    <input v-model="old_password" type="password" placeholder="请输入当前登录密码" class="PL_3 color_333 W_60 fontS_14">
                </div>
            </div>
            <div class="flex_row_between  borderColor_ccc PTB_2 " style="padding-right:14px">
                <div class="flex_row_left W_75">
                    <div class="fontS_13 W_35  PL_5" style="color: #333;width: 130px;" >确认新密码</div>
                    <input  v-model="new_password" type="password" placeholder="确认新密码" class="PL_3 color_333 W_60 fontS_14 ">
                </div>
            </div>
<!--            <p style="color: #999;line-height:30px;padding: 14px 14px 0">必须是8-20位密码</p>-->
            <div @click="change(1)" class="MLR_auto MT_20 flex_rowC W_100 lmjl_btn_bg color_fff PTB_4 B_radius_max fontS_13" style="width: 80%;">确认修改</div>
        </section>
        <section v-else class="PT_5">
            <div class="flex_row_between  borderColor_ccc PTB_2 " style="padding-right:14px">
                <div class="flex_row_left W_75">
                    <div class="fontS_13 W_35  PL_5" style="color: #333;width: 130px;" >设置密码</div>
                    <input  v-model="set_password1" type="password" placeholder="请输入密码" class="PL_3 color_333 W_60 fontS_14 ">
                </div>
            </div>
            <div class="flex_row_between  borderColor_ccc PTB_2 " style="padding-right:14px">
                <div class="flex_row_left W_75">
                    <div class="fontS_13 W_35  PL_5" style="color: #333;width: 130px;" >确认密码</div>
                    <input  v-model="set_password2" type="password" placeholder="确认密码" class="PL_3 color_333 W_60 fontS_14 ">
                </div>
            </div>
            <div @click="change(2)" class="MLR_auto MT_20 flex_rowC W_100 lmjl_btn_bg color_fff PTB_4 B_radius_max fontS_13" style="width: 80%;">确认</div>
        </section>

    </div>
</template>
<script >
    import "@/assets/js/iconfont/iconfont.css";
    import {Component,Vue} from 'vue-property-decorator';
    import {mixins} from 'vue-class-component'
    import common from "@/assets/js/common"
    import {NavBar, Toast} from 'vant';
    import {update_password} from "@/assets/js/const"

    Vue.use(NavBar);

    @Component
    export default class cg_pas extends mixins(common) {
        old_password="";
        new_password="";
        set_password1 = '';
        set_password2 = '';
        type = api.pageParam.type
        mounted() {
        }
        change(way) {
            if(way ==1) {
                if(!this.old_password)return Toast('请输入当前登录密码');
                if(!this.new_password)return Toast('请输入新密码');
            } else {
                if(!this.set_password1)return Toast('请输入密码');
                if(!this.set_password2)return Toast('请确认密码');
                if(this.set_password2!=this.set_password1)return Toast('输入密码不一致');
                if(this.set_password1.length<6 || this.set_password2.length<6) return Toast("密码长度不能小于6位")
            }
            let  ttyy = way == 1 ? '1':'2'
            let  pas1 = way == 1 ? this.old_password : this.set_password2
            let  pas2 = way == 1 ? this.new_password : this.set_password1
            let param={
                old_password:pas1,
                new_password:pas2,
                type: ttyy
            }
            this.http(update_password,param).then(v=>{
                Toast(v.msg);
                if(v.code=="0")setTimeout(()=> this.close(),1000);
                api.sendEvent({name: "tab3-safety"});
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
