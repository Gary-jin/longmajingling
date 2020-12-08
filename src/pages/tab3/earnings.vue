<template>
    <div class="flex" style="position: relative;">
        <van-nav-bar
                title="收益明细"
                left-arrow
                @click-left="close"
                class="header jianbian"
        />

        <section style="position: relative" class="flex">
            <div style="position: relative;width: 100%;z-index:1;padding:30px 20px 80px" class="flex_between jianbian">
                <div style="color: white;line-height: 25px">
                    累计余额 <br>
                    <span style="color: #FFBF61;font-weight: bold" class="fontS_22">￥{{info.total_in}}</span>
                </div>
                <div @click="openWin(`tab3-withdraw`)" class="fontS_14 color_fff" style="border:1px solid;padding: 1px 3px;width:75px;line-height:20px;text-align: center;border-radius: 333px">
                    去提现>
                </div>

                <div style="width: 92%;bottom:-120px;background-color: white;padding:9px 13px 3px;box-sizing: border-box;border-radius: 10px;box-shadow:0 2px 10px #999;position: absolute;left: 4%">
                    <div class="average_3 fontS_14" style="display: flex;justify-content:space-between;color: #333333;align-items: start;text-align: center">
                        <h1 :class="{active:active==0}" @click="active=0">
                            佣金收益<img @click.stop="al_active=0" src="../../assets/img/wenhao1.png" alt="">
                            <p  style="line-height: 38px" >
                                ￥{{info.money1}}
                            </p>
                            <div v-show="al_active==0" class="v-dialog fontS_10">
                                淘客下级购物获得的奖励+个人已到账的佣金收益
                            </div>
                        </h1>
                        <h1  :class="{active:active==1}" @click="active=1">
                            打卡收益<img @click.stop="al_active=1" src="../../assets/img/wenhao1.png" alt="" >
                            <p   style="line-height: 38px" >
                                ￥{{info.money2}}
                            </p>
                            <div  v-show="al_active==1" class="v-dialog fontS_10">
                                早起打卡挑战成功获  得的奖励

                            </div>
                        </h1>
                        <h1 :class="{active:active==2}" @click="active=2">
                            红包收益<img @click.stop="al_active=2" src="../../assets/img/wenhao1.png" alt="">
                            <p   style="line-height: 38px" >
                                ￥{{info.money3}}
                            </p>
                            <div  v-show="al_active==2" class="v-dialog fontS_10">
                                龙马升级、点击气泡、摇奖 机、转盘、任务红包、视频红包的收益
                            </div>
                        </h1>


                    </div>
                    <div class="average_2 fontS_14" style="display: flex;justify-content:space-between;color: #333333;align-items: start;text-align: center">
                        <h1  :class="{active:active==3}" @click="active=3">
                            分红收益<img @click.stop="al_active=3" src="../../assets/img/wenhao1.png" alt="">
                            <p style="line-height: 38px" >
                                ￥{{info.money4}}
                            </p>

                            <div  v-show="al_active==3" class="v-dialog fontS_10">
                                自己的龙马收益  +徒弟徒孙贡献的分红收益

                            </div>
                        </h1>
                        <h1  :class="{active:active==4}" @click="active=4">
                            贡献收益<img @click.stop="al_active=4" src="../../assets/img/wenhao1.png" alt="" >
                            <p   style="line-height: 38px" >
                                ￥{{info.money5}}
                            </p>
                            <div  v-show="al_active==4" class="v-dialog fontS_10">
                                徒弟徒孙看视频贡献  的收益
                            </div>
                        </h1>
                    </div>
                </div>
            </div>
            <div style="width: 100%;margin-top:77px">
                <div>
                    <div style="line-height: 40px;border-bottom:1px solid #ebedf0;margin-top: 70px;padding: 0 20px">
                        {{list_top[active]}}收益明细<van-icon name="arrow-down" style="margin-left: 5px"/>
                    </div>
                    <div class="list flex_between"  style="padding: 5px 20px" v-for="v in list" :key="v">
                        <div>
                            <h1 class="fontS_16">{{v.remark}}</h1>
                            <p>{{v.create_time}}</p>
                        </div>
                        <div class="fontS_18">
                            ￥{{v.price}}
                        </div>
                    </div>
                </div>

                <p style="color: #999;line-height:30px;padding: 14px 14px 50px;margin-top: 50px">
                </p>

            </div>
        </section>

    </div>
</template>
<script >
    import "@/assets/js/iconfont/iconfont.css";
    import {Component,Vue,Watch} from 'vue-property-decorator';
    import {mixins} from 'vue-class-component'
    import common from "@/assets/js/common"
    import { Panel ,NavBar, List,PullRefresh,NoticeBar,Button ,Divider,Icon  } from 'vant';
    import Dialog from "@/components/dialog.vue";
    import {total_in_list} from "@/assets/js/const";

    Vue.use(Button).use(NavBar).use(PullRefresh).use(List).use(NoticeBar).use(Panel).use(Divider ).use(Icon  );


    @Component({
        components:Dialog
    })
    export default class extends mixins(common) {
        active=0;
        al_active=-1;
        info={};
        list={};
        list_top=["佣金","打卡","红包","分红","贡献"];
        mounted() {

            this.getinfo();
            document.documentElement.onclick= () =>{
                    this.al_active=-1;
            }
        }

        @Watch('active') function(v,pre_v){
          this.getinfo();
        }
        getinfo() {
            let a=this.active;
            this.http(total_in_list,{type:++a}).then(v=>{
                this.info=v.data.info;
                this.list=v.data.list;
                /*this.list=[{
                    "price": "0.32",
                    "create_time": "2019-12-28 23:25:13",
                    "remark": "18025358000购物,父2代,淘客订单分佣"
                }];*/
            })
        }
    }
</script>

<style lang="scss">
    @import "@/assets/css/app.scss";
    section{
        overflow-x:hidden;
    }

    .v-dialog{
        position: absolute;
        z-index: 1111;
        top: 17px;
        right: 6px;
        width: 90px;
        white-space: initial;
        background-color: rgba(0,0,0,.7);
        &::before{
            border-bottom-color: rgba(0,0,0,.7);

        }
    }
    .average_2 .v-dialog{
        position: absolute;
        z-index: 1111;
        top: 17px;
        right:32%;
        width: 120px;
        white-space: initial;
    }
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
        width: 33%;
        box-sizing: initial;
        position: relative;
        p{
            margin-top:7px;
        }
        position: relative;
        &.active::after{
            position: absolute;
            width: 80%;
            height: 3px;
            background-color: #2F65FF;
            content: "";
            display: block;
            left: 50%;
            transform: translateX(-50%);
        }
        img{
            margin-left: 5px;
            width: 17px;height: 17px;
            vertical-align: -3px;

        }
    }
    .average_3>h1+h1{
        margin-left: 0;
        &.active::after{
            position: absolute;
            width: 75%;
            height:3px;
            background-color: #2F65FF;
            content: "";
            display: block;
            left: 50%;
            transform: translateX(-50%);
        }
        &::before{
            position: absolute;
            width: 1px;
            height:45px;
            background-color: #F2F2F2;
            /*background-color: red;*/
            content: "";
            display: block;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
        }
    }
    .average_2 h1{
        margin: 20px 0 0;
        width: 50%;
        img{
            width: 17px;height: 17px;
            vertical-align: -3px;
            margin-left: 5px;
        }
    }
    .average_2>h1{
        position: relative;

    }
    .average_2>h1+h1::before{
        position: absolute;
        width: 1px;
        height:45px;
        background-color: #F2F2F2;
        /*background-color: red;*/
        content: "";
        display: block;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
    }
    .average_2>h1.active::after{
         position: absolute;
         width: 45%;
         height:3px;
         background-color: #FF0000;
         content: "";
         display: block;
         left: 50%;
         transform: translateX(-50%);
     }
    .list{
        border-bottom: 1px solid #ebedf0;
        padding:6px 0;
        p{
            line-height: 23px;
            color: #999999;
        }
        h1{
            line-height: 23px;
            color: #333;
        }
        div:nth-child(2){
            color: red;
        }
    }
</style>
