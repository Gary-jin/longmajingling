<template>
    <div v-if="type=='tixian'">
        <div class="tixian">
            <h1 class="fontS_16">一、提现说明：</h1>
            <p>1.通常情况，龙马精灵每天提现次数上限为10次，每天
                提现金额上限为2000元，若超过次数或金额，
                则超出部分需次日才能提现成功；
                </p>
            <p>2、提现申请将在工作日24小时审批到账，最迟不超过
                3个工作日，请耐心等待；</p>
        </div>
        <van-divider />
        <div class="tixian">
            <h1 class="fontS_16">二、提现不到账</h1>
            <p>提现前，请检测您的微信账号是否正常，如出现以下
                3种情况会被微信端对拦截导致提现失败（<span>非官方原因</span>）：
                </p>
            <p> <span>1、您的微信号存在风险</span></p>
            <p> <span>2、您的微信号未在微信做实名认证</span></p>
            <p> <span>3、您的微信号被微信冻结</span></p>
            <p>       官方会对这3类提现做失败退回处理，请绑定真实
                有效的微信号后再次申请提现。与此同时，
                这3类账号可能会被列为风险用户名单，将被风控系统
                重点关注。</p>
        </div>
        <van-divider />
    </div>
</template>

<script lang="ts">
    import "@/assets/js/iconfont/iconfont.css";
    import {Component, Vue,Prop} from 'vue-property-decorator';
    import {mixins} from 'vue-class-component'
    import common from "@/assets/js/common"
    import {Panel, NavBar, List, PullRefresh, NoticeBar, Button, Divider, Icon} from 'vant';
    Vue.use(Button).use(NavBar).use(PullRefresh).use(List).use(NoticeBar).use(Panel).use(Divider).use(Icon);
    @Component({
        components: {
            Button,
            Divider,
            PullRefresh,
            Icon,
            NoticeBar,
            List,
            Panel,
        }
    })
    export default class extends mixins(common) {
        @Prop(String) type?: string
    }
</script>

<style lang="scss">
    @import "@/assets/css/app.scss";
    .tixian{
        padding:0 20px;
        h1{
            line-height: 50px;
        }
        span{
            color: red;
        }
        p{
            line-height: 25px;
            color: #999999;
        }
    }
</style>
