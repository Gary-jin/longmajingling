<template>
    <div >
        <div class="tab3TopBg">
            <van-nav-bar
                    title="个人中心"
                    :left-arrow="false"
                    @click-right="openWin('tab3-setting',{},{reload:true})"
                    class="header jianbianTab3"
            >
            <img :src="requireimg(`setting`)" name="search" slot="right" style="width: 24px;vertical-align: -4px"/></van-nav-bar>
            <div class="header" style="margin:100px auto 0;width: 92%;bottom: -55px;background-color: white;padding: 13px 13px 0;box-sizing: border-box;border-radius: 10px;box-shadow:0 0 8px #d6e2fe;position: relative;top: -44px">
                <div style="display: flex;justify-content:start;color: #333333;align-items: center">
                    <img :src="userinfo.headImg||requireimg(`logo-200`)" alt="" style="width: 80px;height: 80px;border-radius: 7px;margin-top: -41px">
                    <h1 style="font-weight:bold;font-size: 1.4rem;flex-grow: 1;" class="ML_2 text_overflow_1">
                        {{userinfo.nickname}}
                        <p style="font-size: .8rem;margin-top: 2px;color: #999;font-weight: 100">
                            邀请码:{{userinfo.number||'******'}}
                        </p>
                    </h1>
                    <!-- <img  v-show="sh_miao&&userinfo.cat_level>=50" :src="requireimg(`zhaocaimao`)" alt="" style="width: 50px;height: 38px;border-radius: 7px;margin-top: -10px"> -->
                </div>

                <div style="display: flex;justify-content:space-between;color: #333333;align-items: center;margin-top:15px;text-align: left">
                    <h1 style="color: #999;width: 33.3%" class="fontS_12 textC">
                        龙马累计收益
                        <p style="color:#FF0000;font-weight:bold;" class="fontS_14">
                            ￥{{userinfo.taoke_total_in||0}}
                        </p>
                    </h1>
                    <h1 style="color: #999;width: 33.3%" class="fontS_12 textC">
                        本月预估
                        <p style="color:#FF0000;font-weight:bold;" class="fontS_14">
                            ￥{{userinfo.cur_month_yg||0}}
                        </p>
                    </h1>
                    <h1 style="color: #999;width:33.3%" class="fontS_12 textC">
                        上月结算
                        <p style="color:#FF0000;font-weight:bold;" class="fontS_14">
                            ￥{{userinfo.last_month_yg||0}}
                        </p>
                    </h1>
                </div>

                <div @click="openWin(`tab3-tk_earnings`)" style="border-top: 1px solid #DDDDDD;color: #727272;line-height: 30px;margin-top: 10px" class="fontS_10">
                    <span class="fontS_14">龙马收益</span>(每月25号自动结算佣金)
                    <span class="iconfont iconfanhui1" style="float: right"></span>
                </div>
            </div>
        </div>

        <div style="height: 100%;">
            <!-- <div class="jianbianTab3" style="position: absolute;top: 0;height:300px;width: 100%;z-index: -1"></div> -->
            <div v-if="yincangShow" style="background-color: #ffffff;padding-bottom: 10px">

                <div style="width: 97%;margin:0px auto 10px;" class="flex_row_between">
                    <img @click="openWin(`tab3-earnings`)"  :src="requireimg(`shouyi_`)" alt="" style="width: 50%;height: auto;border-radius: 7px;margin-top: -35px" />
                    <img  @click="openWin(`tab3-withdraw`)" :src="requireimg(`tixian_`)" alt="" style="width: 50%;height: auto;border-radius: 7px;margin-top: -35px" />
                </div>
                <div style="margin:0 auto;width: 92%;bottom: -55px;left: 4%;background-color: white;padding:10px;border-radius: 10px;box-shadow:0 0 8px #d6e2fe">
                    <div style="display: flex;justify-content:space-between;color: #333333;align-items: center;margin-top:15px;text-align: center">
                        <h1 @click="openWin(v.open)" v-for="(v,index) in mid_nav" :key="index" style="color: #999;width: 20%" class="fontS_12">
                            <img v-lazy="requireimg(v.img)"  alt="" style="width:2rem;height:2rem;margin-top: -10px">
                            <p style="color:#666;" class="fontS_12">
                                {{v.text}}
                            </p>
                        </h1>
                    </div>
                </div>
            </div>

            <!--红包任务-->
            <div style="width: 100%;margin: 10px auto;background-color: white">
                 <!-- <van-notice-bar
                        color="#000"
                        background="#ffffff"
                        :scrollable="true"
                        :speed="55"
                        :text="move_rand_ad"
                >
                    <template v-slot:left-icon>
                        <img src="@/assets/img/gonggao.png" alt="" class="VW_10">
                    </template>
                </van-notice-bar> -->

                <div style="width: 92%;margin:auto">
                    <!-- 跑马灯  未知原因造成的卡顿  使用 van-Swipe代替  -->
                        <div class="flex_rowC H_10vw">
                            <img src="@/assets/img/gonggao.png" alt="" class="VW_6 flex_shrink_0 MR_2" />
                            <van-Swipe :show-indicators="false" vertical :autoplay="2000" :touchable="false" class="W_100  H_100">
                                <van-Swipe-item v-for="(item, index) in move_rand_ad" class="flex_rowL text_overflow_1 fontS_12 color_999" :key="index">
                                    {{ item }}
                                </van-Swipe-item>
                            </van-Swipe>
                        </div>
                    <!-- 红包 -->
                    <div v-if="yincangShow"
                         class="flex_row_between  BB_1_f2f2f2" style="padding: .5rem 0">
                        <div class="flex_rowL">
                            <img v-lazy="requireimg(`hongbao_1`)" alt="" style="width:1.8rem;height:2.2rem;" class="flex_shrink_0">
                            <div class="flex_colT flex_items_start PL_3 ">
                                <span class="fontS_16">任务红包（最高5元）</span>
                                <span class="fontS_12 color_999 PT_1">{{userinfo.task_red_str1}}</span>
                            </div>
                        </div>
                        <div class="flex_colT flex_items_end">
                            <span @click="userinfo.task_red_is_show == 1 && userinfo.task_red_is_get!=1 && gethb('1')"
                                  :class="(userinfo.task_red_is_show == 1 && userinfo.task_red_is_get!=1 )? 'bg_F3274C':'bg_ccc'"
                                  class="color_fff PLR_4 PTB_1 B_radius_max fontS_12">{{userinfo.task_red_is_get==1?"已领取":"领取"}}</span>
                            <span class="fontS_12 color_999 PT_1">{{userinfo.task_red_str2}}</span>
                        </div>
                    </div>
                     <div v-if="yincangShow"
                         class="flex_row_between  BB_1_f2f2f2" style="padding: .5rem 0">
                        <div class="flex_rowL">
                            <img v-lazy="requireimg(`hongbao_1`)" alt="" style="width:1.8rem;height:2.2rem;" class="flex_shrink_0">
                            <div class="flex_colT flex_items_start PL_3 ">
                                <span class="fontS_16">视频红包（最高2元）</span>
                                <span class="fontS_12 color_999 PT_1">{{userinfo.video_red_str1}}</span>
                            </div>
                        </div>
                        <div class="flex_colT flex_items_end">
                            <span @click="userinfo.video_red_is_show == 1 &&  userinfo.video_red_is_get !=1 && gethb('2')"
                                  :class="(userinfo.video_red_is_show == 1 &&  userinfo.video_red_is_get !=1) ? 'bg_F3274C':'bg_ccc'"
                                  class="color_fff PLR_4 PTB_1 B_radius_max fontS_12">{{userinfo.video_red_is_get==1?"已领取":"领取"}}</span>
                            <!-- <span class="fontS_12 color_999 PT_1">{{userinfo.video_red_str2}}</span> -->
                        </div>
                    </div>
                    <!-- 红包end -->

                    <div v-if="yincangShow"  @click="smrzNow" class="flex_row_between PTB_2 BB_1_f2f2f2">
                        <div class="flex_rowL">
                            <img v-lazy="requireimg(`recom_smrz`)" alt="" style="width:1.9rem;height:1.9rem;" class="flex_shrink_0">
                            <span class="fontS_16 PL_3">实名信息</span>
                        </div>
                        <span style="text-align: right;vertical-align: 3px;color: #999;flex-grow: 1">{{userinfo.is_smrz==1?"已实名":`未实名`}}</span>
                        <i class="iconfont icon_right"  style="color: #9B9B9B"></i>
                    </div>
                    <div @click="openWin(`tab3-contact`)" class="flex_row_between PTB_2 BB_1_f2f2f2">
                        <div class="flex_rowL">
                            <img v-lazy="requireimg(`lianxi`)" alt="" style="width:1.9rem;height:1.9rem;" class="flex_shrink_0">
                            <span class="fontS_16 PL_3">联系我们</span>
                        </div>
                        <i class="iconfont icon_right" style="color: #9B9B9B">
                        </i>

                    </div>
                    <div  @click="openWin(`tab3-feedback`)"  class="flex_row_between PTB_2">
                        <div class="flex_rowL">
                            <img v-lazy="requireimg(`fankui`)" alt="" style="width:1.9rem;height:1.5rem;" class="flex_shrink_0">
                            <span class="fontS_16 PL_3">意见反馈</span>
                        </div>
                        <i class="iconfont icon_right" style="color: #9B9B9B"> </i>
                    </div>
                </div>

            </div>

        </div>
        <van-popup class="hb" v-model="show" >
            <img :src="requireimg(`logo-200`)" alt="" style="width: 30%;height: auto;display: block;margin: 20px auto;border-radius:10px">
             <p class="fontS_16" style="text-align: center;color: white">龙马精灵</p>
             <p class="fontS_18" style="text-align: center;color: #FFE08D;margin:23% 0 0">给你发了一个随机红包(最高2元)</p>
            <img @click="ling" :src="requireimg(`ling`)" alt="" style="width: 30%;height: auto;display: block;margin: 20px auto;border-radius:10px">
            <p class="fontS_16" style="text-align: center;color: #FFE08D;margin:23% auto 0;border: 1px solid;width:80px;border-radius: 5px">可提现</p>
        </van-popup>

        <audio id="redSound"
               preload="auto"
               src="../assets/audio/redSound.mp3">
        </audio>

    </div>
</template>
<script >
    import "@/assets/js/iconfont/iconfont.css";
    import {Component,Vue,Watch} from 'vue-property-decorator';
    import {mixins} from 'vue-class-component'
    import common from "@/assets/js/common"
    import { Lazyload,Search,NavBar, List,PullRefresh,NoticeBar,Icon,Popup,Swipe, SwipeItem,Toast } from 'vant';
    import {get_is_display,userinfo,move_rand_ad,get_red} from '@/assets/js/const';
    Vue.use(Lazyload).use(Search).use(NavBar).use(PullRefresh).use(List).use(NoticeBar).use(Icon).use(Popup).use(SwipeItem).use(Swipe);

    @Component
    export default class  extends mixins(common) {
        show = false
        mid_nav=[
            {text:"收支明细",img:"shouzhi_2",open:"tab3-shouzhi"},
            {text:"我的订单",img:"dingdan_2",open:"tab3-order"},
            {text:"找回订单",img:"zhaohui_2",open:"tab3-find_order"},
            {text:"我的团队",img:"team_2",open:"tab3-team"},
            {text:"邀请好友",img:"invite_2",open:"tab3-invite"},
        ]

        retRed=[
            {'title':'任务红包（最高5元）','sub_title':'完成邀请好友，签到，和喂猫','is_receive':1},
            {'title':'视频红包（最高2元）','sub_title':'当天看满15个视频','is_receive':1}
        ]

        userinfo={}
        move_rand_ad='111'
        red_money=0;

        pmdShow = false
        yincangShow = true 

        mounted() {
            this.getuserinfo();
            this.getmove_rand_ad();
            this.concealed()
            api.addEventListener({
                name: 'tab3'
            },()=>{this.getuserinfo()});

            api.addEventListener({
                name: 'tab3-setting'
            },()=>this.getuserinfo());
        }

        concealed() {
            let sysType;
            if(api.systemType == 'ios'){
                sysType = {type:'ios'}
            } else{
                sysType = ''
            }
            this.http(get_is_display,sysType).then(res => {
                if( res.data.is_display == false) {
                    this.yincangShow = false
                     
                    this.mid_nav=[
                        {text:"收支明细",img:"shouzhi_2",open:"tab3-shouzhi"},
                        {text:"我的订单",img:"dingdan_2",open:"tab3-order"},
                        {text:"找回订单",img:"zhaohui_2",open:"tab3-find_order"},
                        // {text:"我的团队",img:"team_2",open:"tab3-team"},
                        // {text:"邀请好友",img:"invite_2",open:"tab3-invite"},
                    ]
                }
            })
         }

        redbgSound() {
            document.querySelector("#redSound").play();
        }

        smrzNow (){
            if (this.userinfo.is_smrz!=1) {
                this.openWin(`tab3-realname`)
            } else {
                Toast("您已实名认证！")
            }
        }

        gethb(index) {
            this.http(get_red,{type:index}).then(v=>{
                if(v.code==0){
                    this.show=true;
                    this.red_money=v.data.red_money;
                    this.getuserinfo()
                }else {
                    Toast(v.msg)
                };
            })

        }
        @Watch("show")function(v){
            api.sendEvent({
                name: 'shadow',
                extra:v
            });
        }


        getuserinfo() {
            this.http(userinfo).then(v=>{
              this.userinfo=v.data.info;
            //   this.retRed[0].is_show=this.userinfo.task_red_is_show;
            //   this.retRed[1].is_show=this.userinfo.video_red_is_show;

            //   this.retRed[0].is_receive=this.userinfo.task_red_is_get;
            //   this.retRed[1].is_receive=this.userinfo.video_red_is_get;

            //   this.retRed[0].task_red_str1=this.userinfo.task_red_str1;
            //   this.retRed[0].task_red_str2=this.userinfo.task_red_str2;

            //   this.retRed[1].task_red_str2=this.userinfo.video_red_str1;


            })
        }

        getmove_rand_ad() {
            this.http(move_rand_ad).then(v=>{
                // this.move_rand_ad=v.data.list.join('\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0') ;
                this.move_rand_ad=v.data.list;
            })
        }

        ling() {
            this.redbgSound()
            this.show=false;
            this.openWin(`tab3-ling`,{red_money:this.red_money})
        }
    }
</script>

<style lang="scss">
    @import "@/assets/css/app.scss";
    .hb{
        text-align: center;
        background: url("../assets/img/hb_bg.png") no-repeat;
        background-size: 100% 100%;
        height: 70%;
        width: 80%;
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
    .jianbianTab3{
        background: #326bff;
        position: fixed;
        top: 0;
        width: 100%;
    }
    .tab3TopBg{
        background: url(./../assets/img/tab2TopBg.png) 0 0 no-repeat;
		background-size: 100% 70%;
        padding-top: 88px;
    }
</style>
