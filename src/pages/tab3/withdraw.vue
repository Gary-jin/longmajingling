<template>
    <div class="flex" style="position: relative;">
        <van-nav-bar
                title="提现"
                right-text="明细"
                @click-left="closeWinDetail"
                @click-right="openWin('tab3-draw_record')"
                left-arrow
                class="header jianbian"
        />
        <section style="position: relative;padding-bottom:50px;width: 100%;overflow-x: hidden">
            <div style="position: relative;width: 100%;;height:140px;text-align: center;justify-content: space-around" class=" jianbian ">
                <div style="width: 85%;margin: auto" class="flex_between">
                    <div style="color:white;line-height:100px;position: relative;display: block" class="fontS_15">
                        账户总余额
                        <img  @click.stop="show=0"  src="../../assets/img/wenhao.png" alt="" style="width: 15px;vertical-align: -2px">
                          <div v-show="show==0"  class="v-dialog fontS_10">
                              余额钱包+打卡钱包
                          </div>
                        <span style="color: white;margin-top: -50px;display: block">￥ <span class="fontS_25">{{info.total_balance}}</span></span>

                    </div>
                    <div style="color:white;line-height:100px;position: relative;display: block" class="fontS_15">
                        余额钱包
                        <img  @click.stop="show=1"  src="../../assets/img/wenhao.png" alt="" style="width: 15px;vertical-align: -2px">
                          <div v-show="show==1"  class="v-dialog fontS_10" style="left: 22%">
                              除去打卡收益以外的收益
                          </div>
                        <span style="color: white;margin-top: -50px;display: block">￥ <span class="fontS_25">{{info.balance}}</span></span>
                    </div>
                    <div style="color:white;line-height:100px;position: relative;display: block" class="fontS_15">
                        打卡钱包
                        <img  @click.stop="show=2"  src="../../assets/img/wenhao.png" alt="" style="width: 15px;vertical-align: -2px">
                          <div v-show="show==2"  class="v-dialog fontS_10" style="left: 32%;width: 80px">
                              每日成功打卡获得的收益
                          </div>
                        <span style="color: white;margin-top: -50px;display: block">￥ <span class="fontS_25">{{info.dk_balance}}</span></span>

                    </div>
                </div>

            </div>
            <div style="padding: 0px 20px" class="a33">
                <h1>选择提现分类</h1>
                <div class="flex_betw font_001">
                    <van-button :class="{active:type_0==0}" @click="type_0=0"   color="#2F65FF" plain class="fontS_13" style="line-height: 14px">余额收益提现
                    </van-button>
                    <van-button :class="{active:type_0==1}" @click="type_0=1"   color="#2F65FF" plain class="fontS_13 ML_2" style="line-height: 14px;margin-left:1vw">打卡收益提现
                    </van-button>
                </div>
            </div>
            <div style="padding: 0px 20px" class="a33">
                <h1>提现方式</h1>
                <div class="flex_betw" >
                    <!-- <van-button color="#2F65FF" plain class="fontS_14" style="line-height: 14px;"  :class="{active:type_1==0}" @click="type_1=0">
                        <img   :src="requireimg(`wx`)" alt="" style="width:17px;height:17px;vertical-align: -3px;margin-right: 3px">微信
                    </van-button> -->
                    <van-button color="#2F65FF" plain class="fontS_14" style="line-height: 14px;margin-left: 1%" :class="{active:type_1==1}"  @click="type_1=1">
                        <img :src="requireimg(`zfb`)" alt="" style="width:17px;height:17px;vertical-align: -3px;margin-right: 3px">支付宝
                    </van-button>
                </div>
            </div>
            <div class="jine a3" style="padding: 0px 20px" >
                <h1>提现金额</h1>
                <div v-if="type_0==1">
                    <input v-model="money" placeholder="请输入提现金额" type="number" style="line-height: 35px;border: 1px solid #DBDBDB;color: #666;width: 70%;margin-right: 10px;"> <span v-show="money>0">共计{{money*info.dk_withdraw_sxf+Number(money)}}元</span>
                </div>
                <div v-else class="flex_between" style="flex-flow: wrap;justify-content: start">
                    <van-button v-show="v==0.3?info.is_first==1:true" :class="{active:type_2==i}" @click="sel_money(v,i)"  v-for="(v,i) in info.money_arr" :key="i" color="#2F65FF" plain class="fontS_17" style="line-height: 14px;">
                        {{v}}元
                    </van-button>
                </div>
            </div>
            <div style="padding:20px;color: #999999;line-height:24px">
                <h1>注意事项</h1>
                <p>1.提现前需先<span @click="shiming" style="color:#2F65FF;">实名认证</span>，1元/5元提现需完成<span @click="openWinTab()" style="color:#2F65FF;">指定任务方可提现</span></p>
                <p>2.提现将在周一至周五工作日24小时内审批到账，周末不审批，请耐心等待</p>
                <p>3.提现手续费{{info.dk_withdraw_sxf*100}}%</p>
                <p>4.1元提现要求：连续看视频签到7天；5元提现要求：连续每天看15个视频广告7天，提一次后从头算，超过七天按七天算</p>
                <p> 5.提现不到账？请查看<span @click="openWin(`common-explain`,{type:`yxgl`,title:`提现说明`,type_:4})" style="color:#2F65FF;">提现说明</span></p>
            </div>

            <div @click="submit" :class="{active:type_0==0?type_2<0:!(money>0)}" class="MLR_auto  color_fff W_75 lmjl_btn_bg  PTB_3 B_radius_10 fontS_16" style="text-align: center;border-radius: 300px">
                立即提现
            </div>
        </section>

    </div>
</template>
<script >
    import "@/assets/js/iconfont/iconfont.css";
    import {Component, Vue} from 'vue-property-decorator';
    import {mixins} from 'vue-class-component'
    import common from "@/assets/js/common"
    import {NavBar,Button,Toast} from 'vant';
    import {get_Withdraw_info,_withdraw,userinfo} from "@/assets/js/const";

    Vue.use(Button).use(NavBar);
    @Component
    export default class extends mixins(common) {
        type_0=0;
        type_1=0;
        type_2=-1;
        money="";
        show=-1
        info={}
        userinfo={}

        mounted() {
            this.getinfo();
            this.getuserinfo();
            if (api.pageParam.bgTab2 == 1) {
                this.addKeyback()
            }
            document.documentElement.onclick= () =>{
                this.show=-1;
            }
        }
        closeWinDetail() {
            if (api.pageParam.bgTab2 == 1){
                this.tab1CloseExtend()
            } else(
                this.close()
            )
        }

        getinfo() {
            this.http(get_Withdraw_info).then(v=>{
                this.info=v.data.info;
            })
        }
        submit() {
            // if(this.type_1<0)return Toast("请选择提现方式");
            if(this.type_1!=1)return Toast("请选择提现方式");
            
            if(this.type_0==0){
                if(this.info.money_arr[this.type_2]==undefined)return Toast("请选择提现金额");
            }else{
                if(this.money<=0)return Toast("请填写提现金额");
            }

            let param={
                account_type:this.type_0==0?1:2,
                withdraw_type:this.type_1==0?'wechatpay':'alipay',
                money:this.type_0==0?this.info.money_arr[this.type_2]:this.money
            }
            this.http(_withdraw,param).then(v=>{
                Toast(v.msg);
                if(v.code==0)setTimeout(()=>this.close,1000)
            })
        }
        sel_money(v,i) {
            if(!this.info.money1_is_click){
                if(v==1)return Toast("未达到领取条件！");
                if(v==5)return Toast("未达到领取条件！");
            }
            this.type_2=i;
        }
        getuserinfo () {
            this.http(userinfo).then((res)=>{
                if(res.code == 0){
                    this.userinfo=res.data.info;
                }
            })
        }
        shiming() {
            if(this.userinfo.is_smrz!=1){
                this.openWin("tab3-realname")
            } else {
                Toast("你已实名认证！")
            }
        }
        openWinTab () {
            api.sendEvent({
                name: 'home',
                extra: 3
            });
            this.close() 
        }
    }
</script>

<style lang="scss">
    @import "@/assets/css/common.scss";
    @import "@/assets/css/app.scss";
    .font_001 {
        .van-button__text{
            width: 100%;
            white-space: nowrap;
        }
        .van-button--normal{
            padding: 0;
        }
    }
    .v-dialog{
        position: absolute;
        z-index: 1111;
        top: 60px;
        left: 33%;
        width: 100px;
        line-height: 18px;
        white-space: initial;
        background-color: rgba(0,0,0,.7);
        &::before{
            border-bottom-color: rgba(0,0,0,.7);

        }
    }
    .login.active{
        background-image: linear-gradient(to right,#4D4D4D,#4D4D4D);
    }
    .van-button{
        height: 36px;
    }
    .a33 .van-button__text{
        color: #333;
    }

    .a33 .active,.a3 .active{
        color: #2F65FF;
        background-color: #99C0FF;
    }
    .a33 .active .van-button__text{
        color: #2F65FF;
    }
    .jine{
        .van-button{
            height: 64px;
            margin-left:1%;
        }
    }
    .van-search__content {

        border-radius: 30px;
    }

    .van-nav-bar__text {
        color: white;
    }

    [class*=van-hairline]::after {
        display: none;
    }

    .icon_right:before {
        position: relative;
        top: 4px;
    }

    .average_3 > h1 {
        width: 33.33333%;

        p {
            margin-top: 7px;
        }
    }

    .average_3 > h1 + h1 {
        border-left: 1px solid #F2F2F2;
    }

    .list {
        border-bottom: 1px solid #ebedf0;
        padding: 6px 0;

        p {
            line-height: 23px;
            color: #999999;
        }

        h1 {
            line-height: 23px;
            color: #333;
        }

        div:nth-child(2) {
            color: red;
        }
    }
    h1 {
        font-size: 16px;
        margin-top: 15px;
        margin-bottom: 5px;
    }
    .flex_betw button {
        margin-top: 7px;
        width: 32%;
        border-radius: 5px;
    }
    .flex_between button {
        margin-top: 7px;
        width: 32%;
        border-radius: 5px;
    }
</style>
