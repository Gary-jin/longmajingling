<template>
        <van-popup v-model="pop_show" style="width:80%;padding: 20px;border-radius: 12px;height:220px">
           <!--红包弹窗-->
            <div v-if="type=='hb'">
                <img @click="pop_show=false" src="@/assets/img/close.png" alt="" style="width: 24px;height: 24px;position: absolute;right: 0;top: -35px">
                <h1 style="text-align: center" class="fontS_16">
                    <img :src="requireimg('hongbao')" alt="" style="width:150px;height:auto;border-radius: 7px;margin-top: -95px">
                </h1>
                <div class="fontS_16" style="color: #333333;font-weight:bold;text-align: center">
                    恭喜获得 <span style="color: red">￥1.99随机红包</span>
                    <p class="fontS_12" style="color: #999;font-weight:100;line-height:30px;">点击气泡有几率产生随机红包</p>
                </div>
                <div class="login MLR_auto W_100 bg_F3CB7B  B_radius_10 fontS_13" style="width: 50%;padding:0 26px;line-height:30px;margin:22px  auto 5px;border-radius: 100px;text-align: center" >
                    点击领取
                </div>
                <p class="fontS_12" style="color: #999;font-weight:100;line-height:30px;text-align: center">看视频次数：X次</p>
            </div>
            <!--抽奖宝箱-->
            <div v-else-if="type=='cb'">
                <img @click="pop_show=false" src="@/assets/img/close.png" alt="" style="width: 24px;height: 24px;position: absolute;right: 0;top: -35px">
                <h1 style="text-align: center" class="fontS_16">
                    <img :src="requireimg('5c8867055fb6d')" alt="" style="width:150px;height:auto;border-radius: 7px;margin-top: -95px">
                </h1>
                <div @click="btn1" class="login MLR_auto W_100 bg_F3CB7B  B_radius_10 fontS_13" style="width:80%;padding:0 26px;line-height:30px;margin:42px  auto 5px;border-radius: 100px;text-align: center" >
                    观看视频得3次抽奖机会
                </div>
                <div class="login MLR_auto W_100 bg_F3CB7B  B_radius_10 fontS_13" style="width: 80%;padding:0 26px;line-height:30px;margin:10px  auto 5px;border-radius: 100px;text-align: center" >
                    两元气丹兑换1次抽奖机会
                </div>
                <p class="fontS_12" style="color: #999;font-weight:100;text-align: center">看视频次数：X次</p>
                <p class="fontS_12" style="color: #999;font-weight:100;line-height:30px;text-align: center">每期只能看一次视频或者买一次</p>
            </div>
            <!--抽奖宝箱-->
            <div v-else-if="type=='qd'">
                <img @click="pop_show=false" src="@/assets/img/close.png" alt="" style="width: 24px;height: 24px;position: absolute;right: 0;top: -35px">
                <h1 style="text-align: center" class="fontS_16">
                    <img :src="requireimg('5c8867055fb6d')" alt="" style="width:150px;height:auto;border-radius: 7px;margin-top: -95px">
                </h1>
                <div class="fontS_16" style="color: #333333;font-weight:bold;text-align: center">
                    恭喜获得 <span style="color: red">￥1.99随机红包</span>
                    <p class="fontS_12" style="color: #999;font-weight:100;line-height:30px;">点击气泡有几率产生随机红包</p>
                </div>
                <div class="login MLR_auto W_100 bg_F3CB7B  B_radius_10 fontS_13" style="width: 80%;padding:0 26px;line-height:30px;margin:10px  auto 5px;border-radius: 100px;text-align: center" >
                    两元气丹兑换1次抽奖机会
                </div>
                <p class="fontS_12" style="color: #999;font-weight:100;line-height:30px;text-align: center">每期只能看一次视频或者买一次</p>
            </div>

            <!--元气丹-->
            <div v-else>
                <img @click="pop_show=false" src="@/assets/img/close.png" alt="" style="width: 24px;height: 24px;position: absolute;right: 0;top: -35px">
                <h1 style="text-align: center" class="fontS_16">
                    <img :src="requireimg('maobi')" alt="" style="width:150px;height:auto;border-radius: 7px;margin-top: -95px">
                </h1>
                <div class="fontS_16" style="color: #333333;font-weight:bold;text-align: center">
                    已签到1天 获得X元气丹
                    <p class="fontS_12" style="color: #999;font-weight:100;line-height:30px;">连续7天看视频签到可得1元提现机会</p>
                </div>
                <div class="login MLR_auto W_100 bg_F3CB7B  B_radius_10 fontS_13" style="width: 50%;padding:0 26px;line-height:30px;margin:22px  auto 5px;border-radius: 100px;text-align: center" >
                    看视频翻倍
                </div>
                <p class="fontS_12" style="color: #999;font-weight:100;line-height:30px;text-align: center">看视频次数：X次</p>
            </div>
        </van-popup>
</template>
<script >
    import "@/assets/js/iconfont/iconfont.css";
    import {Component, Vue,Prop,Watch,PropSync} from 'vue-property-decorator';
    import {mixins} from 'vue-class-component'
    import common from "@/assets/js/common"
    import {Popup} from 'vant';
    Vue.use(Popup);

    @Component
    export default class pop extends mixins(common) {
        type="cb";
        pop_show=true;
        mounted() {
            // alert(this.type)
        }
    }
</script>
<style lang="scss">
    @import "@/assets/css/app.scss";
    .van-popup{
        overflow-y: initial;
    }
</style>
