<template>

    <div class="flex">
        <van-nav-bar
                left-arrow
                @click-left="close"
                @click-right="save"
                left-text="返回"
                class="header"
        />
        <section style="background-color: #ECECEC;text-align: center">
            <img :src="requireimg(`shouqian`)" alt="" style="width: 20%;height: auto;display: block;margin: 30px auto 10px;">
            <p class="fontS_13" style="color: #FF4B49">领取成功</p>
            <p class="fontS_13" style="color: #101010;margin: 20% auto 10px;">￥<span class="fontS_42">{{red_money}}</span></p>
            <p class="fontS_16" @click="openWin('tab3-withdraw')" style="text-align: center;color: #FF0000;margin:23% auto;border: 1px solid;width:80px;border-radius: 5px">可提现</p>
            <div @click="close" class="login MLR_auto W_100 bg_F3CB7B  B_radius_10 fontS_13" style="width: 50%;padding:0 26px;line-height:45px;border-radius: 10px;text-align: center" >
                返回上界面
            </div>
        </section>
    </div>
</template>

<script >
    import "@/assets/js/iconfont/iconfont.css";
    import {Component, Vue,Prop} from 'vue-property-decorator';
    import {mixins} from 'vue-class-component'
    import common from "@/assets/js/common"
    import record from "@/components/record.vue";
    import {Toast, NavBar} from 'vant';
    Vue.use(Toast).use(NavBar);
    @Component({
        components: {
            record
        }
    })
    export default class extends mixins(common) {
        red_money=api.pageParam.red_money
    }
</script>
<style lang="scss">
    @import "@/assets/css/app.scss";
    @import "@/assets/css/common.scss";

    .van-divider--hairline::after, .van-divider--hairline::before{
        background-color: #333;
    }
    .van-divider--hairline::after, .van-divider--hairline::after{
        background-color: #333;
    }
    .list{
        padding: 0 20px;
        line-height: 30px;
        border-bottom: 0;
        p{
            color: #101010;

        }
    }
    .bottom{
        width: 100%;
        position: fixed;
        bottom: 0;
        border-top: 1px solid #999;
        display: flex;
        justify-content: space-around;
        div{
            padding:3px 26px;
            width: 47%;padding:3px 26px;line-height:30px;margin: auto;border-radius: 100px;text-align: center;
            margin:10px;
        }
    }
</style>
