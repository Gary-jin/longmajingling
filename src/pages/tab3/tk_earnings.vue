<template>
    <div class="flex" style="position: relative;">
        <van-nav-bar
                title="淘客收益"
                left-arrow
                @click-left="close"
                class="header jianbian"
        />

        <section style="background-color:#EBEBEB;position: relative" >
            <div class="jianbian" style="position: absolute;top: 0;height:70px;width: 100%;z-index: 0"></div>
           <!-- <div style="position: relative;width: 100%;z-index:1;width: 92%;margin:20px auto" class="flex_between">
                <div style="color: white">
                    可提现余额 <br>
                    <span style="color: #FFBF61;line-height: 35px" class="fontS_19">￥{{info.balance}}</span>
                </div>
                <div @click="openWin(`tab3-withdraw`)" class="fontS_14 color_fff" style="border:1px solid;padding: 1px 3px;width:75px;line-height:20px;text-align: center;border-radius: 333px">
                    去提现>
                </div>
            </div>-->
            <div >
                <div style="margin:-20px auto 0;width: 92%;bottom: -55px;background-color: white;padding: 13px;box-sizing: border-box;border-radius: 10px;box-shadow:0 0 5px #999;position: relative;text-align: center">
                    <div class="" style="display: flex;justify-content:space-between;color: #333333;align-items: start;text-align: center">
                        <h1 style="color: #333;width: 50%" class="fontS_15">
                            累计到账
                            <p  class="fontS_14">
                                ￥{{info.total_in||0}}
                            </p>
                        </h1>
                        <h1 style="color: #333;width: 50%" class="fontS_15">
                            待结算
                            <p  class="fontS_14">
                                ￥{{info.no_in||0}}
                            </p>
                        </h1>
                    </div>
                </div>
                <div style="margin:20px auto;width: 92%;bottom: -55px;background-color: white;padding: 13px;box-sizing: border-box;border-radius: 10px;box-shadow:0 0 5px #999;position: relative">
                    <div class="average_3" style="display: flex;justify-content:space-between;color: #333333;align-items: start;text-align: center">
                        <h1 :class="{active:active==1}" @click="active=1" style="color: #333" class="fontS_12">
                            淘宝
                            <p  class="fontS_14">
                                (￥{{info.total_in_taobao||0}})
                            </p>
                        </h1>
                        <h1 :class="{active:active==2}"  @click="active=2"style="color: #333" class="fontS_12">
                            京东
                            <p  class="fontS_14">
                                (￥{{info.total_in_jd||0}})
                            </p>
                        </h1>
                        <h1 :class="{active:active==3}" @click="active=3" style="color: #333" class="fontS_12">
                            拼多多
                            <p  class="fontS_14">
                                (￥{{info.total_in_pdd||0}})
                            </p>
                        </h1>
                    </div>
                </div>
                <div style="margin:20px auto;width: 92%;bottom: -55px;background-color: white;padding: 13px 0;box-sizing: border-box;border-radius: 10px;box-shadow:0 0 5px #999;position: relative">
                    <div class="average_3" style="display: flex;justify-content:space-between;color: #333333;align-items: start;text-align: center">
                        <h1 style="color: #333;font-weight: 300;" class="fontS_14">

                        结算收益<img src="../../assets/img/wenhao1.png" alt="" style="width: 17px;height:17px" @click="wenhao(0)">
                            <p  class="fontS_18" style="line-height: 38px" >
                                ￥{{info.s1||0}}
                            </p>
                            <span style="font-weight: 100;color: #C6C6C6" class="fontS_12">上月收益</span>
                        </h1>
                        <h1 style="color: #333;font-weight: 300;" class="fontS_14">

                            预估收益<img src="../../assets/img/wenhao1.png" alt="" style="width: 17px;height:17px" @click="wenhao(1)">

                            <p  class="fontS_18" style="line-height: 38px" >
                                ￥{{info.s2||0}}
                            </p>
                            <span style="font-weight: 100;color: #C6C6C6" class="fontS_12">本月收益</span>
                        </h1>
                        <h1 style="color: #333;font-weight: 300;" class="fontS_14">

                            预估收益<img src="../../assets/img/wenhao1.png" alt="" style="width: 17px;height:17px" @click="wenhao(2)">

                            <p  class="fontS_18" style="line-height: 38px" >
                                ￥{{info.s3||0}}
                            </p>
                            <span style="font-weight: 100;color: #C6C6C6" class="fontS_12">上月收益</span>
                        </h1>

                    </div>

                    <div style="margin:20px auto 0;background-color: white;padding: 13px;box-sizing: border-box;position: relative;border-top: 6px solid #E2E2E2;padding-top:20px">
                        <div class="fontS_12" style="color:#2F65FF;position:absolute;left: 0;top: 10px;box-shadow: 0 0 4px #999;padding: 2px 10px 2px 5px;border-radius: 0 10px 10px 0">
                            今日
                        </div>
                        <div class="average_3 MTB_10" style="display: flex;justify-content:space-between;color: #333333;align-items: start;text-align: center;margin-bottom: 7px;">
                            <h1 style="color: #333;font-weight: 300;" class="fontS_14">

                                付款笔数<img src="../../assets/img/wenhao1.png" alt="" style="width: 17px;height:17px" @click="wenhao(3)">

                                <p  class="fontS_18" style="line-height: 38px" >
                                    ￥{{info.s4||0}}
                                </p>
                            </h1>
                            <h1 style="color: #333;font-weight: 300;" class="fontS_14">

                                预估收益<img src="../../assets/img/wenhao1.png" alt="" style="width: 17px;height:17px" @click="wenhao(4)">

                                <p  class="fontS_18" style="line-height: 38px" >
                                    ￥{{info.s5||0}}
                                </p>
                            </h1>
                            <h1 style="color: #333;font-weight: 300;" class="fontS_14">
                                分享赚
                                <p  class="fontS_18" style="line-height: 38px" >
                                    ￥{{info.s6||0}}
                                </p>
                            </h1>
                        </div>
                    </div>

                    <div style="margin:0px auto;background-color: white;padding: 13px;box-sizing: border-box;position: relative;border-top: 1px solid #F2F2F2">
                        <div class="fontS_12" style="color:#2F65FF;position:absolute;left: 0;top: 10px;box-shadow: 0 0 4px #999;padding: 2px 10px 2px 5px;border-radius: 0 10px 10px 0">
                            昨日
                        </div>

                        <div class="average_3 MTB_10" style="display: flex;justify-content:space-between;color: #333333;align-items: start;text-align: center;margin-bottom:7px;">
                            <h1 style="color: #333;font-weight: 300;" class="fontS_14">

                                付款笔数<img src="../../assets/img/wenhao1.png" alt="" style="width: 17px;height:17px" @click="wenhao(5)">

                                <p  class="fontS_18" style="line-height: 38px" >
                                    ￥{{info.s7||0}}
                                </p>
                            </h1>
                            <h1 style="color: #333;font-weight: 300;" class="fontS_14">

                                预估收益<img src="../../assets/img/wenhao1.png" alt="" style="width: 17px;height:17px" @click="wenhao(6)">

                                <p  class="fontS_18" style="line-height: 38px" >
                                    ￥{{info.s8||0}}
                                </p>
                            </h1>
                            <h1 style="color: #333;font-weight: 300;" class="fontS_14">
                                分享赚
                                <p  class="fontS_18" style="line-height: 38px" >
                                    ￥{{info.s9||0}}
                                </p>
                            </h1>
                        </div>
                    </div>
                </div>
                <!--规则-->
                <p v-html="info.award_rule" style="padding: 14px 14px 50px;margin-top: 70px"></p>
                <!--弹窗文字-->
                <van-popup v-model="show" style="width: 300px;min-height: 130px;border-radius: 10px;padding: 20px;text-align: center">
                        <h1>{{alert.title}}</h1>
                        <p style="line-height: 30px;margin-top: 5px;height: 50px;display: flex;align-items: center;justify-content: center"> {{alert.con}}</p>
                        <p @click="show=false" style="color: red" >知道啦</p>
                </van-popup>
            </div>
        </section>

    </div>
</template>
<script>
    import "@/assets/js/iconfont/iconfont.css";
    import {Component,Vue,Watch} from 'vue-property-decorator';
    import {mixins} from 'vue-class-component'
    import common from "@/assets/js/common"
    import { Popup ,NavBar, List,PullRefresh,NoticeBar,Button } from 'vant';
    import {taoke_info} from "@/assets/js/const";


    Vue.use(Popup ).use(Button).use(NavBar).use(PullRefresh).use(List).use(NoticeBar);
    @Component
    export default class  extends mixins(common) {

        info={}
        active=1
        show=false;
        alert={}
        mounted() {

          this.getinfo();
        }

        wenhao(index) {
            this.show=true;
               switch (index) {
                    case 0:
                        this.alert={
                            title:"结算收益",
                            con:"上个月确认收获的订单收益，每月25日结算后，将转入余额中",
                        }
                        break;

                   case 1:
                        this.alert={
                            title:"预估收益",
                            con:"本月内创建的所有订单预估收益",
                        }
                        break;
                     case 2:
                        this.alert={
                            title:"预估收益",
                            con:"上个月内创建的所有订单预估收益",
                        }
                        break;

                   case 3:
                        this.alert={
                            title:"今日付款笔数",
                            con:"今日内所有付款的订单数量，包含有效\n" +
                                "                         订单和失效订单",
                        }
                        break;


                   case 4:
                       this.alert={
                           title:"今日预估收益",
                           con:"今日内创建的所有订单预估收益",
                       }
                       break;


                   case 5:
                        this.alert={
                            title:"昨日付款笔数",
                            con:"昨日内所有付款的订单数量，包含有效\n" +
                                "                       订单和失效订单",
                        }
                       break;
                      case 6:
                        this.alert={
                            title:"昨日预估收益",
                            con:" 昨日内创建的所有订单预估收益",
                        }
                        break;

               }
        }
        @Watch('active')
        getinfo() {
            this.http(taoke_info,{type:this.active}).then(v=>{
                this.info=v.data.info;
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
    [class*=van-hairline]::after{
        display: none;
    }
    .icon_right:before{
        position: relative;
        top: 4px;
    }
    .average_3>h1{
        width: 33.33333%;
        p{
           margin-top:7px;
        }
    }
    .average_3>h1+h1{
        border-left: 1px solid #F2F2F2;
    }


    .average_3>h1{
        position: relative;
        &.active::after{
            position: absolute;
            width: 50%;
            height: 3px;
            background-color: #2F65FF;
            content: "";
            display: block;
            left: 50%;
            bottom:-13px;
            transform: translateX(-50%);
        }
        img{
            vertical-align: -2px;
        }
    }
</style>
