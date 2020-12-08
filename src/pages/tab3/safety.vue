<template>
    <div class="flex" style="position: relative;">
        <van-nav-bar
                title="账号与安全"
                left-arrow
                class="header jianbian"
                @click-left="close"
                @click-right="save"
                right-text="保存"

        />
        <section style="height: 100%;padding-top: 15px">
            <div class="flex_row_between PTB_3 BB_1_f2f2f2 lh">
                <div class="flex_rowL">
                    <span class="fontS_14 PL_3">会员昵称</span>
                </div>
                <input maxlength="10" placeholder="请输入昵称" style="float: left;vertical-align: 3px;color: #999;text-align: right" class="fontS_15" type="text" v-model="userinfo.nickname">
            </div>
            <div @click="openWin('tab3-cg_phone')" class="flex_row_between PTB_3 BB_1_f2f2f2 lh">
                <div class="flex_rowL">
                    <span class="fontS_14 PL_3">修改手机号</span>
                </div>
                <span style="flex-grow: 1;text-align: right;color: #999">
                    {{num}}
                    <i class="iconfont icon_right color_000"></i>
                </span>
                <!-- <i  style="flex-grow: 1;text-align: right;color: #999">{{num}}</i> -->
            </div>
            <!--  2 设置  1 修改 -->
            <div @click="openWin('tab3-cg_pas',{type : userinfo.is_set_password == '1' ? '1':'2'})" class="flex_row_between PTB_3 BB_1_f2f2f2 lh">
                <div class="flex_rowL">
                    <span class="fontS_14 PL_3">{{userinfo.is_set_password == '1'?"修改密码":"设置密码"}}</span>
                </div>
                <i class="iconfont icon_right">
                    <span style="float: left;vertical-align: 3px;"></span>
                </i>
            </div>
            <div @click="userinfo.is_bind_zfb==0&&openWin('tab3-bd_zfb',{type:'zfb'})" class="flex_row_between PTB_3 BB_1_f2f2f2 lh"
                 style="border-top:7px solid #DFDFDF">
                <div class="flex_rowL">
                    <span class="fontS_14 PL_3">支付宝账户</span>
                </div>
                <i class="iconfont icon_right">
                    <span style="float: left;vertical-align: 3px">{{userinfo.is_bind_zfb==0?'未绑定':'已绑定'}}</span>
                </i>

            </div>
            <div @click="userinfo.is_bind_wx==0&&openWin('tab3-bd_zfb',{type:'wx'})" class="flex_row_between PTB_3 BB_1_f2f2f2 lh"
                >
                <div class="flex_rowL">
                    <span class="fontS_14 PL_3">微信账户</span>
                </div>
                <i class="iconfont icon_right">
                    <span style="float: left;vertical-align: 3px">{{userinfo.is_bind_wx==0?'未绑定':'已绑定'}}</span>
                </i>

            </div>
        </section>

    </div>
</template>
<script >
    import "@/assets/js/iconfont/iconfont.css";
    import {Component, Vue} from 'vue-property-decorator';
    import {mixins} from 'vue-class-component'
    import common from "@/assets/js/common"
    import {Search, NavBar, List, PullRefresh, NoticeBar,Toast} from 'vant';
    import {userinfo,update_nickname} from '@/assets/js/const';

    Vue.use(Search).use(NavBar).use(PullRefresh).use(List).use(NoticeBar);


    @Component
    export default class extends mixins(common) {
        userinfo={}
        num=""
        mounted() {
            this.getuserinfo();
            api.addEventListener({
                name: 'tab3-safety'
            },()=>this.getuserinfo());
        }

        save() {
            this.http(update_nickname,{nickname:this.userinfo.nickname}).then(v=>{
              Toast( v.code==0?"修改昵称成功":"修改昵称失败")
                api.sendEvent({
                    name: 'tab3-setting',
                    extra: 0
                });
            })
        }
        getuserinfo() {
            this.http(userinfo).then(v=>{
                this.userinfo=v.data.info;
                this.num=`${this.userinfo.mobile.substring(0,3)}****${this.userinfo.mobile.substring(7,11)}`
            })
        }

    }
</script>

<style lang="scss">
    @import "@/assets/css/app.scss";
    @import "@/assets/css/common.scss";

    .van-search__content {

        border-radius: 30px;
    }

    .van-nav-bar__text {
        color: white;
    }

    [class*=van-hairline]::after {
        display: none;
    }

    .lh {
        padding: 6px 14px;
        line-height: 37px;

        .icon_right span {
            color: #999;
        }
    }
</style>
