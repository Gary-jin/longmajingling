<template>
    <div class="tab1BoxAll">
        <div class="header"></div>
        <div class="W_100 H_100 MT_6">
            <div class="W_100 H_15">
                <div class="auth H_30 ML_4 ">
                    <div>
                        <img :src="info.avatar" v-if="info.avatar" alt="" style="border: 1.5px solid white;box-sizing: initial">
                        <img src="../assets/img/logo-200.png" v-else alt="" style="border: 2.5px solid white;box-sizing: initial">
                        <img src="../assets/img/maobi1.png" alt="" style="width:2rem;height: auto">
                        <span @click="openWin('tab2-detail')" style="padding-right: 5px">{{info.maobi_balance||0}}</span>
                    </div>
                    <img  @click="is_exchange" src="../assets/img/zhuanzeng.png" alt="">
                    <img  @click="openWin('tab3-withdraw')" src="../assets/img/tixian.png" alt="">
                </div>
                <div class="flexBox H_70">
                    <div class="W_70 H_100">
                        <div class="task ML_4">
                            <p class="fontS_10">{{info.str3}}</p>
                            <p class="fontS_10">{{info.str4}}</p>
                        </div>
                        <div class="toast ML_4">
                            <p class="fontS_10" >
                                <van-notice-bar
                                        :speed="60"
                                        :text="notice"
                                        :scrollable="true"
                                        color="white"  style="padding: 0;background-color: transparent;" class="fontS_12">
                                </van-notice-bar>
                            </p>
                        </div>
                    </div>
                </div>
            </div> 

            <div class="W_100 H_80 flexBox" style="overflow: hidden;">
                <!-- 左边 -->
                <div class="W_80 H_100 tab1LeftBox ">
                    <div class="MT_14">
                        <img class="ML_6" @click="openWin(`tab1-draw`)" style="width: 5rem;height:5rem" src="../assets/img/choujiang.png" alt="">
                    </div>
                    <!--气泡-->
                     <div class="H_10">
                        <div class="fishBox">
                            <div class="fish" v-for="(v,i) in time" :key="i">
                                <img src="../assets/img/maoliang.png" alt="" @click="fish(v)">
                                <van-count-down @finish="getinfo" class="fontS_13" v-if="(v.timestamp*1000)-new Date()>0" :time="(v.timestamp*1000)-new Date()" style="color: white"/>
                                <span class="color_fff fontS_13"  style="white-space: nowrap"  v-else>点击领取</span>
                            </div>
                        </div>
                     </div>
                     <div class="maoBox">
                            <!-- 摇奖 -->
                         <!-- <div class="W_20">
                            <img class="ML_6" @click="openWin(`tab1-draw`)" style="width: 5rem;height:5rem" src="../assets/img/choujiang.png" alt="">
                         </div> -->
                         <div class="W_80 H_80">
                             <img @click="cl_miao" src="../assets/img/maogif.gif" alt="" >
                         </div>
                     </div>
                     <!-- 喂食 -->
                    <div class="weishiBox color_fff">
                        <div class="">
                            <span class="ML_4" style="position: relative;top: 44px;">{{info.level}}级</span>
                            <div class="progress">
                                <span class="add_ml" v-show="add_ml" style="position: absolute;top:-30px;left: 50%;color: white;transform: translateX(-50%);z-index: 999">+15g</span>
                                <img :style="{left:100-info.sj_rate+'%'}" src="../assets/img/xin.png" alt="">
                                <div :style="{width:100-info.sj_rate+'%'}" style="height: 100%;border-radius: 333vw"></div>
                            </div>
                        </div>
                        <p class="fontS_10" style="text-align: center;margin-top: 7px">{{info.str2}}</p>
                        <!-- <div @click="eat" style="width: 80px;border: 2px solid #FFFFFF;padding: 1px 0" class="login MLR_auto MT_2 flex_rowC W_100 bg_F3CB7B  B_radius_15 fontS_12">
                            点击喂食
                        </div> -->
                        <div class="flex_rowC" >
                            <img @click="eat" style="width: 100px;" src="../assets/img/eat.png" alt="">
                        </div>
                    </div>
                </div>
                <!-- 右边 -->
                <div class="W_20 H_100 tab1RightBox ">
                     <!-- 榜单 -->
                    <div class="W_100 RightBoxFlex" >
                        <img @click="openWin(`tab1-turnable`)" src="../assets/img/zhuanpan.png" alt="">
                    </div>
                    <!-- 看视频 -->
                    <div class="W_100 RightBoxFlex"  >
                        <img @click="seevideo('see_video')" src="../assets/img/kanshipin.png" alt="">
                    </div>
                    <div style="text-align: center;display: flex;flex-flow: column;align-items: center;">
                        <van-count-down class="fontS_10" format='mm:ss' :time="(info.last_cat_view_video_timestamp*1000)-new Date()" style="color: #000"/>
                    </div>
                    <!-- 榜单 -->
                    <div class="W_100 RightBoxFlex" >
                        <img @click="bd_show=true" src="../assets/img/bangdan.png" alt="">
                    </div>
                    <!-- 收益 -->
                    <div class="W_100 RightBoxFlex">
                        <img  @click="openWin(`tab1-bonus`)" src="../assets/img/shouyi.png" alt="">
                    </div>

                    <!--玩家攻略-->
                    <div class="W_100 RightBoxFlex1">
                        <img  @click="openWin(`common-explain`,{type:`yxgl`,title:`玩家攻略`,type_:6})" src="../assets/img/gonglue.png" alt=""  >
                    </div>
                    <!-- 浏览商品 -->
                    <div class="W_100 RightBoxFlex1" >
                        <img @click="liulanDetail" src="../assets/img/liulan.png" alt="" >
                    </div>
                    <div @click="liulanDetail" class="v-dialog dialogBg fontS_10 ML_2" style="width:88%; text-align: center;display:inline-block" v-if="info.is_goods_award != '1'" >{{info.view_goods_count>=5?`领取元气丹`:info.view_goods_count+'/5'}}</div>
                        
                    <!-- 分享 -->
                    <div class="W_100 RightBoxFlex" @click="openWin(`tab1-share`)">
                        <img src="../assets/img/fenxiang1.png" alt="">
                    </div>
                </div>
            </div>
        </div>



        <!--转赠-->
        <van-popup class="zz" v-model="zz_show" style="width:85%;border-radius: 12px;height:420px">
            <img @click="zz_show=false" src="../assets/img/close1.png" alt="" style="width: 40px;height: 40px;position: absolute;right: 5px;top: 5px">
            <img  src="../assets/img/zzbg.png" alt="" style="">
            <div class=" send" >
                <div class=" flex_between "><span style="color:#ffffff;">手机号</span><input type="text" v-model='phone' placeholder="请输入对方手机号"></div>
                <div class=" flex_between "><span style="color:#ffffff;">数   量</span><input type="num" v-model='number' placeholder="输入赠送数量"></div>
                <div class=" flex_between "><span style="color:#ffffff;">所需数量</span><input type="number" v-model='+number*info.exchange_maobi_rate+Number(number)' disabled></div>
                <div class=" flex_between fontS_10"><span style="visibility: hidden">所需数量</span><span style="color: #fff;text-align: left;width: 100%;font-weight: 100;">手续费{{info.exchange_maobi_rate*100}}%</span></div>
            </div>
            <div class="flex_between send" style="width: 70%;margin:160px auto 0">
                <!-- <img @click="zz_show=false" :src="requireimg('zzqx')" alt="" style="width: 78px;height: 40px;">
                <img @click="zhuanzeng" :src="requireimg('zzqd')"  alt="" style="width: 78px;height: 40px;"> -->
                <div class="tab1popBtn textC PTB_2 B_radius_max" style="width:78px;" @click="zz_show=false">取消</div>
                <div class="tab1popBtn textC PTB_2 B_radius_max" style="width:78px;" @click="zhuanzeng">确定</div>
            </div>
            <p class="fontS_10 send" style="color: #fff;font-weight:100;line-height:30px;text-align: center;margin:230px auto 0;white-space: nowrap">*一经转增不给予退换，请确认手机号在进行操作</p>
        </van-popup>


        <!--榜单-->
        <van-popup  v-model="bd_show" style="width:90%;border-radius: 12px;height:auto;background-color: transparent;z-index: 9999999;">
            <img @click="bd_show=false" src="../assets/img/close1.png" alt="" style="width: 42px;height: 42px;position: absolute;right: 0;top: 10px">
            <img  src="../assets/img/bangdan1.png" alt="" style="">
            <div style="position: absolute;top:100px;width:85%;left: 50%;transform: translateX(-50%);">
                <div v-for="(v,i) in rank" :key="i" :class="{active:active==i}">
                        <div v-if="i==0" class="list flex_between color_fff" >
                            <div  style="text-align: center;min-width:30%"  @click="active=i">
                                <div class="fontS_24 color_fff textC" style="width: 45px;height: 25px;line-height: 25px;display:inline-block;margin: auto;margin-top: 1px;white-space: nowrap">
                                    <div class="W_100">{{v.rank}}</div>
                                    <div class="W_100 fontS_12">我的排名</div>
                                </div>
                                <img :src="v.avatar||requireimg(`logo-200`)" alt="" style="width: 40px;;height: 40px;vertical-align:-10px;margin: 0 5px 5px 10px;border-radius:20px;">
                            </div>
                            <div style="flex-grow: 1" class="text_overflow_1 W_20 ">
                                <h1 class="text_overflow_1">{{v.nickname}}</h1>
                                <p>{{v.level}}</p>
                            </div>
                            <div style="text-align: left;min-width:35%">
                                <p><img src="../assets/img/maobi1.png" alt="" style="width: 25px;;height: 25px;vertical-align: -7px;float: left">{{v.maobi}}个</p>
                            </div>
                        </div>
                    </div>
            </div>
            <div style="position: absolute;top:165px;width:85%;left: 50%;transform: translateX(-50%);overflow: auto;height: 57%;-webkit-overflow-scrolling: touch;overflow-scrolling: touch;">
                <van-list
                        v-model="uploading"
                        :finished="finished"
                        finished-text="没有更多了"
                        style="pointer-events: none;"
                        @load="rank_list">
                    <div v-for="(v,i) in rank" :key="i" :class="{active:active==i}">
                        <div v-if="i != 0" class="list flex_between color_fff" >
                            <div  style="text-align: center;min-width:30%"  @click="active=i">
                                <div class="fontS_14 " :class="{lg3:i<1}" v-if="i<1||i>3" style="width: 25px;height: 25px;line-height: 25px;display:inline-block;margin: auto;margin-top: 1px;white-space: nowrap">
                                    {{v.rank}}
                                </div>
                                <img  v-else :src="requireimg(`rank${i>3?3:i<1?1:i}`)" alt="" style="width: 30px;;height:auto;vertical-align: 0px">
                                <img :src="v.avatar||requireimg(`logo-200`)" alt="" style="width: 40px;;height: 40px;vertical-align:-10px;margin: 0 5px 0 10px;border-radius:20px;">
                            </div>
                            <div style="flex-grow: 1" class="text_overflow_1 W_20">
                                <h1 class="text_overflow_1">{{v.nickname}}</h1>
                                <p>{{v.level}}</p>
                            </div>
                            <div style="text-align: left;min-width:35%">
                                <p><img src="../assets/img/maobi1.png" alt="" style="width: 25px;;height: 25px;vertical-align: -7px;float: left">{{v.maobi}}个</p>
                            </div>
                        </div>
                    </div>
                </van-list>
            </div>
        </van-popup>

        <!--弹窗-->
        <!--红包弹窗 ***-->
        <van-popup class="tab1pop" v-model="hb_show" style="width:85%;padding: 20px;border-radius: 12px;height:420px">
            <div >
                <img @click="hideBannerAD()" src="../assets/img/close1.png" alt="" style="width: 40px;height: 40px;position: absolute;right: 5px;top: 5px">
                <div style="margin-top: 95px">
                    <div class="fontS_16" style="color: #ffffff;font-weight:bold;text-align: center">
                        恭喜获得 <span>￥{{level_show?red_money+'随机红包':red_money}}</span>
                        <p class="fontS_12" style="color: #cbd8fb;font-weight:100;line-height:30px;">点击气泡有几率产生随机红包</p>
                    </div>
                    <h1 style="text-align: center" class="fontS_16">
                        <img src="../assets/img/hongbao.png" alt="" style="width:150px;height:auto;border-radius: 7px;">
                    </h1>
                    <div @click="lingqu" class="login MLR_auto W_100 B_radius_10 fontS_16 tab1popBtn" style="width: 80%;padding:0 26px;line-height:40px;margin:22px  auto 5px;border-radius: 100px;text-align: center" >
                        点击领取
                    </div>
                    <p v-show="!level_show" class="fontS_12" style="color: #cbd8fb;font-weight:100;line-height:30px;text-align: center">看视频次数：{{info.view_video_count}}次</p>
                </div>
            </div>
        </van-popup>

        <!--喂食 元气丹不足 ***-->
        <van-popup class="tab1pop2" v-model="mb_show" style="width:85%;padding: 20px;border-radius: 12px;height:420px">
            <div >
                <img @click="hideBannerAD()" src="../assets/img/close1.png" alt="" style="width: 40px;height: 40px;position: absolute;right: 5px;top: 5px">
                <div style="margin-top: 95px">
                    <div class="fontS_18" style="color: #ffffff;font-weight:bold;text-align: center">
                        <div>您的元气丹已不足</div>
                    </div>
                    <h1 style="text-align: center" class="fontS_16">
                        <img src="../assets/img/maobi.png" alt="" style="width:150px;height:auto;border-radius: 7px;">
                    </h1>
                    <div @click="seevideo" class="login MLR_auto W_100 B_radius_10 fontS_16 tab1popBtn" style="width: 80%;padding:0 26px;line-height:40px;margin:22px  auto 5px;border-radius: 100px;text-align: center" >
                        看视频增加元气丹
                    </div>
                    <p class="fontS_12" style="color: #cbd8fb;font-weight:100;line-height:30px;text-align: center">看视频次数：{{info.view_video_count}}次</p>
                </div>
            </div>
        </van-popup>

        <!--元气丹  ***-->
        <van-popup class="tab1pop" v-model="mb1_show" style="width:90%;padding: 20px;border-radius: 12px;height:440px">
            <div >
                <img @click="hideBannerAD()" src="../assets/img/close1.png" alt="" style="width: 40px;height: 40px;position: absolute;right: 5px;top: 5px">
                <div style="margin-top: 95px">
                    <div class="fontS_18" style="color: #ffffff;font-weight:bold;text-align: center;">
                        恭喜获得<span>{{sp_maobi}}奖励</span>
                        <p class="fontS_12" style="color: #cbd8fb;font-weight:100;line-height:30px;">元气丹可用于给龙马喂食，等级越高所需元气丹越多</p>
                    </div>
                    <h1 style="text-align: center" class="fontS_16">
                        <img src="../assets/img/maobi.png" alt="" style="width:150px;height:auto;border-radius: 7px">
                    </h1>
                    <div @click="seevideo('qipao')" class="login MLR_auto W_100 B_radius_10 fontS_16 tab1popBtn" style="width: 80%;padding:0 26px;line-height:40px;margin:22px  auto 5px;border-radius: 100px;text-align: center" >
                        看视频翻倍
                    </div>
                    <p class="fontS_12" style="color: #cbd8fb;font-weight:100;line-height:30px;text-align: center">看视频次数：{{info.view_video_count}}次</p>
                </div>
            </div>
        </van-popup>
        <!--龙马 ***-->
        <van-popup class="tab1pop" v-model="mm_show" style="width:85%;padding: 20px;border-radius: 12px;height:420px">
            <div >
                <img @click="hideBannerAD()" src="../assets/img/close1.png" alt="" style="width: 40px;height: 40px;position: absolute;right: 5px;top: 5px">
                <div style="margin-top: 95px">
                    <div class="fontS_18" style="color: #ffffff;font-weight:bold;text-align: center">
                        恭喜获得<span>50级龙马</span>
                        <p class="fontS_12" style="color: #cbd8fb;font-weight:100;line-height:30px;">龙马每天可获得分红奖励，注意：如果本身等级超过50级，保持原来等级</p>
                    </div>
                    <h1 style="text-align: center" class="fontS_16">
                        <img src="../assets/img/a_miao.png" alt="" style="width:150px;height:auto;border-radius: 7px;">
                    </h1>
                    <div @click="lingqu" class="login MLR_auto W_100 B_radius_10 fontS_16 tab1popBtn" style="width: 80%;padding:0 26px;line-height:40px;margin:2px  auto 5px;border-radius: 100px;text-align: center" >
                        点击领取
                    </div>
                    <p class="fontS_12" style="color: #cbd8fb;font-weight:100;line-height:30px;text-align: center">看视频次数：{{info.view_video_count}}次</p>
                </div>
            </div>
        </van-popup>

        <!--看视频成功 ***-->
        <van-popup class="tab1pop" v-model="cv_success_show" style="width:90%;padding: 20px;border-radius: 12px;height:420px">
            <div >
                <img @click="cv_success_show=false " src="../assets/img/close1.png" alt="" style="width: 40px;height: 40px;position: absolute;right: 5px;top: 5px">
                <div style="margin-top: 95px">
                    <div class="fontS_18" style="color: #ffffff;font-weight:bold;text-align: center">
                        恭喜获得<span>{{sp_maobi}}奖励</span>
                        <p class="fontS_12" style="color: #cbd8fb;font-weight:100;line-height:30px;">元气丹可用于给龙马喂食，等级越高所需元气丹越多</p>
                    </div>
                    <h1 style="text-align: center" class="fontS_16">
                        <img src="../assets/img/maobi.png" alt="" style="width:150px;height:auto;border-radius: 7px;">
                    </h1>
                    <div @click="doubleVideo" class="login MLR_auto W_100 B_radius_10 fontS_16 tab1popBtn" style="width: 80%;padding:0 26px;line-height:40px;margin:2px  auto 5px;border-radius: 100px;text-align: center" >
                        点击领取
                    </div>
                    <p class="fontS_12" style="color: #cbd8fb;font-weight:100;line-height:30px;text-align: center">看视频次数：{{info.view_video_count}}次</p>
                </div>
            </div>
        </van-popup>
            <!-- 浏览商品  ***-->
            <!--元气丹-->
        <van-popup class="tab1pop" v-model="seeGoods" style="width:90%;padding: 20px;border-radius: 12px;height:440px">
            <div >
                <img @click="hideBannerAD()" src="../assets/img/close1.png" alt="" style="width: 40px;height: 40px;position: absolute;right: 5px;top: 5px">
                <div style="margin-top: 95px">
                    <div class="fontS_18" style="color: #ffffff;font-weight:bold;text-align: center">
                        恭喜获得<span>{{sp_maobi}}奖励</span>
                        <p class="fontS_12" style="color: #cbd8fb;font-weight:100;line-height:30px;">元气丹可用于给龙马喂食，等级越高所需元气丹越多</p>
                    </div>
                    <h1 style="text-align: center" class="fontS_16">
                        <img src="../assets/img/maobi.png" alt="" style="width:150px;height:auto;border-radius: 7px;">
                    </h1>
                    <div @click="seevideo('liulan')" class="login MLR_auto W_100 B_radius_10 fontS_16 tab1popBtn" style="width: 50%;padding:0 26px;line-height:40px;margin:2px  auto 5px;border-radius: 100px;text-align: center" >
                        看视频翻倍
                    </div>
                    <p class="fontS_12" style="color: #cbd8fb;font-weight:100;line-height:30px;text-align: center">看视频次数：{{info.view_video_count}}次</p>
                </div>
            </div>
        </van-popup>

        <audio id="miao"
               preload="auto"
               src="../assets/audio/miao.mp3">
        </audio>

        <audio id="eat"
               preload="auto"
               src="../assets/audio/eat.mp3">
        </audio>

        <audio id="bubble"
               preload="auto"
               src="../assets/audio/bubble.mp3">
        </audio>

        <audio id="redSound"
               preload="auto"
               src="../assets/audio/redSound.mp3">
        </audio>

        <audio id="bgSound"
               preload="auto"
               loop
               src="../assets/audio/bgSound.mp3">
        </audio>

    </div>
</template>

<script>
    import {Component, Vue, Watch} from 'vue-property-decorator';
    import {mixins} from 'vue-class-component'
    import common from "@/assets/js/common"
    import {Popup, Toast, NoticeBar, List, CountDown} from 'vant';
    import {view_goods_view_video,feed_cat_view_vide,get_video_counts,get_sj_red_money,Cat_view_video,click_bubble,click_bubble_after,bubble_list,Catinfo,rank_list,is_smrz,exchange_maobi,feed_cat,get_maobi_by_view_goods,move_m_rand_ad} from '@/assets/js/const';

    Vue.use(Popup).use(NoticeBar).use(List ).use(CountDown );
    @Component
    export default class  extends mixins(common) {
        type = "";
        info = {};
        time = [];
        rank = [];
        page = 0;
        red_money = 0;
        active = 0;
        zz_show = false;
        bd_show = false;
        hb_show = false;/*红包*/
        mb_show = false;/*投喂 元气丹不足*/
        mb1_show = false;/*元气丹*/
        mm_show = false;/*猫*/
        miao_eye = false;
        level_show = false;
        add_ml = false;
        seeGoods =  false ; // 浏览商品 翻倍

        cv_success_show = false; //看视频成功  
        
        //cat普通看视频     zhuanpan大转盘看视频 
        //sign 签到看视频   view_goods浏览商品看视频
        seeNum = '';    

        phone = "";
        number = "";
        sp_maobi = "";
        notice = "";
        award_id = "";

        qipaoID = ""; // 气泡id

        isGqHc = "true"; // 监听app挂起和呼出开关

        mounted() {
            this.move_m_rand_ad();

            api.addEventListener({
                name: 'tab1'
            }, (ret) =>{
                this.bgSoundOpen();
                this.is_smrz();
                this.move_m_rand_ad();
            });

            this.addEventFn()
            this.addGqHcApp()  
            this.setStorage('isGqHc','true')
        }
        //  app 进入后台 或前台
        addGqHcApp() {
            var that = this;
            // app 进入后台
            api.addEventListener({
                name:'pause'
            }, function(ret, err){ 
                if(that.getStorage('isGqHc') == "true"){
                    that.bgSoundPause()   
                }
            });
            //从后台回到前台
            api.addEventListener({
                name:'resume'
            }, function(ret, err){  
                if (that.getStorage('isGqHc') == "true") {
                    that.bgSoundOpen()
                }  
            });  

            api.addEventListener({
                name:'openTab1Sound'
            }, function(ret, err){        
                that.bgSoundOpen()
            });
        }

        bgSoundOpen() {
            document.querySelector("#bgSound").play();
        }
        bgSoundPause() {
            document.querySelector("#bgSound").pause();
        }
        redbgSound() {
            document.querySelector("#redSound").play();
        }
        addEventFn () {
            //看广告 后 相关视频监听
           //cat 普通看视频  qipao 气泡元气丹翻   view_goods 浏览商品看视频  
           //sign 签到看视频  zhuanpan 大转盘看视频  tab2Lianxu tab2连续看视频
           // buzhuls 元气丹不足
           api.addEventListener({name: "videoEndWay"},(ret, err)=>{
               if (ret) {
                   // alert(JSON.stringify(ret.value.type))
                   if(ret.value.type == 'cat'){
                        this.bgSoundOpen()
                        this.CatViewVideo()
                   } else if (ret.value.type == 'view_goods'){
                       this.bgSoundOpen()
                       this.GoodsDouble()
                   } else if (ret.value.type == 'qipao'){
                       this.bgSoundOpen()
                       this.cv_success_show = true;
                       this.getinfo()
                   } else if (ret.value.type == 'buzhuls'){
                       this.bgSoundOpen()
                       this.feed_cat_view_vide()
                   } 
               } else {
                //    this.bgSoundOpen()
                   this.toast('加载失败，请重试！')
               }
           })
           api.addEventListener({name: "turnableUpdata"},(ret,err)=>{
               if(ret){
                   this.getinfo()
               }
           })
        }
        // 大战盘
        openWinturnable() {
            this.setStorage('isGqHc','false')
            this.bgSoundPause();
            this.openWin(`tab1-turnable`);
        }
        //看视频
        openseevideo() {
            this.setStorage('isGqHc','false')
            this.bgSoundPause();
            this.seevideo('see_video');
        }
        //收益
        openBonus () {
            this.setStorage('isGqHc','false')
            this.bgSoundPause();
            this.openWin(`tab1-bonus`);
        }
        //玩法攻略
        openeXplain() {
            this.setStorage('isGqHc','false')
            this.bgSoundPause();
            this.openWin(`common-explain`,{type:`yxgl`,title:`玩家攻略`,type_:6,bgTab2:'1'});
        }
        //分享
        openShare() {
            this.setStorage('isGqHc','false')
            this.bgSoundPause();
            this.openWin(`tab1-share`);
        }
        //元气丹详情列表
        openDetail() {
            this.setStorage('isGqHc','false')
            this.bgSoundPause();
            // bgTab2 判断二级页面返回是否 加载背景音效
            this.openWin(`tab2-detail`,{bgTab2:'1'});
        }
        // 提现
        openWithdraw() {
            this.setStorage('isGqHc','false')
            this.bgSoundPause();
            this.openWin('tab3-withdraw',{bgTab2:'1'})
        }
        // 摇奖
        openDraw() {
            this.setStorage('isGqHc','false')
            this.bgSoundPause();
            this.openWin('tab1-draw')
        }

        // 领取 浏览奖励
        liulanDetail () {
            if(this.info.is_goods_award != '1' && this.info.view_goods_count<5){
                this.openWin('tab0-taoke',{'title':'京东','type':'5'});
            } else {
                this.liulan()
            }
        }
        liulan() {
            this.http(get_maobi_by_view_goods).then(v => {
                if (v.code != 0) {
                    Toast(v.msg)
                } else {
                    this.getinfo()
                    this.showBannerAD('1',api.pageParam.HH, function(ret, err) {});
                    this.seeGoods = true;
                    this.sp_maobi = v.data.maobi;
                }
            })
        }
        /*转赠*/
        is_exchange() {
            if(this.info.is_exchange==0){
                Toast(this.info.str5)
            }else{
                this.zz_show=true;
            }
        }

        /*滚动公告*/
        move_m_rand_ad() {
            this.http(move_m_rand_ad).then(v => {
                this.notice = v.data.list.join('\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0');
            })
        }

        /*看视频*/
        seevideo(v) {
            var that = this;
            that.hideBannerAD()
            if (v == "see_video") {
                that.seeVideoNum('cat')
                // 看视频增加元气丹
            } else if (v=='liulan') {
                that.seeVideoNum('view_goods')
                // 浏览商品
            } else if (v=='qipao'){
                that.seeVideoNum('qipao')
                // 气泡 翻倍
            }else {
                // 喂食 元气丹不足
                that.http(get_video_counts,{type:'feed_cat'}).then((res)=>{
                    if(res.code == 0){
                        that.seeNum = res.data.count
                        if (that.seeNum>0) {
                            that.mb_show = false;
                            that.bgSoundPause()
                            that.videoLsit('buzhuls')
                        } else {
                            that.toast('此视频次数已用完')
                        }
                    }
                })
            }
        }
        // 喂食 元气丹不足 看视频奖励 
        feed_cat_view_vide() {
            this.http(feed_cat_view_vide).then((res)=>{
                if(res.code==0) {
                    this.getinfo()
                }
            })
        }
        // 浏览蓝商品翻倍
        GoodsDouble(){
            var that = this;
            that.http(view_goods_view_video).then((res)=>{
                if(res.code==0){
                    that.getinfo()
                }
            })
        }
        // 直接看视频  翻倍
        CatViewVideo () {
            this.http(Cat_view_video).then((res)=>{
                if (res.code == 0) {
                    this.toast(res.msg)
                    this.getinfo()
                }
            })
        }
        //浏览视频能翻倍元气丹
        doubleVideo () {
            this.hideBannerAD()
            this.http(click_bubble_after,{id:this.qipaoID}).then((res)=>{
                if(res.code == 0) {
                    this.toast(res.msg)
                    this.cv_success_show = false;
                    this.getinfo()
                }
            })
        }

        

        getinfo() {
            this.http(Catinfo).then(v => {
                this.info = v.data.info;
            })
            this.http(bubble_list).then(v => {
                this.time = v.data;
            })
        }

        /*喂猫*/
        eat() {
            this.http(feed_cat).then(v => {
                if (v.code == 0) {
                    document.querySelector("#eat").play();

                    this.add_ml=true;
                    setTimeout(()=>this.add_ml=false,1000)
                    if (v.data.is_sj == 1 && v.data.red_money > 0) {
                        Toast(`恭喜升级！`);

                        /*升级红包*/
                        this.hb_show = true;
                        this.level_show = true;
                        this.red_money = v.data.red_money;
                        this.award_id = v.data.red_money_id;
                    } else {
                        Toast('喂食成功')
                    }
                    this.getinfo();
                } else if (v.msg.indexOf('不足') != '-1') {
                    this.mb_show = true;
                } else {
                    Toast(v.msg)
                }
            })
        }

        /*转赠元气丹*/
        zhuanzeng() {
            if (!this.phone) return Toast(`请输入手机号`);
            if (!this.number) return Toast(`请输入转增数量`);
            let param = {
                mobile: this.phone,
                nums: this.number,
            }
            this.http(exchange_maobi, param).then(v => {
                if (v.code == 0) {
                    this.zz_show = false;
                    this.getinfo();
                    return Toast(`转赠成功`)
                }
                ;
                Toast(v.msg)

            })
        }

        is_smrz() {
            this.http(is_smrz).then(v => {
                if (v.data.is_smrz) {
                    this.getinfo();
                } else if(v.code!=403) {
                    this.openWin(`tab3-realname`)
                }
            })
        }

        rank_list() {
            this.http(rank_list, {page: ++this.page}).then(v => {
                this.uploading = false;
                if (v.data.list.length == 0) this.finished = true;
                this.rank = [...this.rank, ...v.data.list];
            })
        }

        /*点 鱼*/
        fish(v) {
            document.querySelector("#bubble").play();
            this.http(click_bubble, {id: v.id}).then(v => {
                if (v.code == 0) {
                    this.showBannerAD('1',api.pageParam.HH, function(ret, err) {});
                    this.qipaoID = v.data.id
                    this.level_show=false;
                    this.award_id = v.data.id;
                    if (v.data.type == 'maobi') {
                        this.mb1_show = true;
                        this.sp_maobi = v.data.str;
                    } else if (v.data.type == 'red_money') {
                        this.hb_show = true;
                        this.red_money = v.data.str;
                    } else {
                        this.mm_show = true;
                    }
                } else {
                    Toast(v.msg)
                }

                this.getinfo(); 


            })
        }

        lingqu() {
            this.redbgSound()
            this.hideBannerAD()
            if (this.level_show) {
                /*升级红包*/
                this.http(get_sj_red_money, {red_money_id: this.award_id}).then(v => {
                    if (v.code == 0) {
                        Toast('领取成功！')
                        this.hb_show = false;
                        this.mm_show = false;
                        return;
                    }
                    Toast(v.msg)
                })
            } else {
                /*气泡奖励领取*/
                this.http(click_bubble_after, {id: this.award_id}).then(v => {
                    if (v.code == 0) {
                        Toast('领取成功！')
                        this.hb_show = false;
                        this.mm_show = false;
                        return;
                    }
                    Toast(v.msg)

                })
            }

        }

        @Watch('zz_show')
        @Watch('bd_show')
        @Watch('mm_show')
        @Watch('hb_show')
        @Watch('mb_show')
        @Watch('mb1_show')
        onChangeValue(newVal, oldVal) {
            api.sendEvent({
                name: 'shadow',
                extra: newVal
            });
        }

        /*点 猫*/
        cl_miao() {
            let that =this;
            that.bgSoundPause();
            document.querySelector("#miao").play();

            setTimeout(() => {
                // that.miao_eye = false;
                that.bgSoundOpen()
            }, 1600)
        }

         hideBannerAD() {
            this.hb_show = false;
            this.mb_show = false;
            this.mb1_show = false;
            this.mm_show = false;
            this.seeGoods = false;
            // TODO 需要加上穿山甲，优量汇横幅广告类型判断
            let that = this;
            if (that.videoKind === 1) {
                that.tencentAds.closeBanner();
            } else {
                that.chuanshanjiaAds.init(function(ret, err) {
                    if (ret) {
                        that.chuanshanjiaAds.closeBanner({}, function(ret, err) {});
                    }
                });
            }
        }

        // 看视频次数限制
        //cat 普通看视频  qipao 气泡元气丹翻   view_goods 浏览商品看视频  
        //sign 签到看视频  zhuanpan 大转盘看视频 
        seeVideoNum(way){
            var that = this;
            that.http(get_video_counts,{type:way}).then((res)=>{
                if(res.code == 0){
                    that.seeNum = res.data.count
                    if(way == 'cat') {
                        if(that.seeNum>0){
                            that.getinfo()
                            // alert((that.info.last_cat_view_video_timestamp*1000)-new Date())
                            if ((that.info.last_cat_view_video_timestamp*1000)-new Date()<=0) {
                                that.bgSoundPause()
                                that.videoLsit('cat')
                            } else {
                                that.toast("请再等一等")
                            }
                        } else{
                            that.toast('此视频次数已用完')
                        }
                    } else if(way == 'view_goods'){
                        if (that.seeNum>0) {
                            that.seeGoods = false;
                            that.bgSoundPause()
                            that.videoLsit('view_goods')
                            // that.showChuanshanjiaAd().then(suc =>{
                            //     that.GoodsDouble()
                            // })
                        } else {
                            that.toast('此视频次数已用完')
                        }
                    } else if(way == 'qipao') {
                        if (that.seeNum>0) {
                            that.mb1_show = false;
                            that.bgSoundPause()
                            that.videoLsit('qipao')
                        } else {
                            that.toast('此视频次数已用完')
                        }
                    } 

                }
            })
        }

    };
</script>

<style lang="scss">
    @import "@/assets/css/app.scss";
    @import "@/assets/css/common.scss";
    .tab1BoxAll{
        width: 100%;
        height: 100vh;
        background: url(../assets/img/maoquanbg.png) 0 0 no-repeat;
        background-size: 100% 100%;
        overflow: hidden;
        .flexBox{
            display: flex;
        }
        .auth{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            position: relative;
            div{
                height: 26px;
                display: flex;
                justify-content:  flex-start;
                background-color:rgba(0,0,0,.61) ;
                align-items: center;
                border-radius: 10px;
                top: -10px;
                padding-right: 5px;
                color: white;
                img:first-child{
                    width: 36px;
                    height: 36px;
                    border-radius: 100px;
                    position: absolute;
                    left: -3px;
                }
                img+img {
                    margin: 0 0px 0 36px;
                    width: 17px;
                    height: 17px;
                    border-radius: 100px;
                }

            }
            &>img{
                width: 60px;
                height: 37px;
                margin-left: 10px;
            }
        }
        .task{
            width:13rem;
            height: 3.3rem;
            background-image: url("../assets/img/bg_3.png");
            background-size: 100% 100%;
            padding: 5px;
            margin-top: 10px;
            // box-shadow: 0 1px 20px #999;
            color: #ffffff;
            p{
                white-space: nowrap;
                line-height:16px;
                padding-left: 12px;
            }
        }
        .toast{
            width:11rem;
            color:white;
            background:linear-gradient(to right,#9952c1,rgba(0,0,0,0));
            border-radius: 5px;
            margin-top: 10px;
            white-space: nowrap;
            .van-notice-bar{
                height:25px;
            }
        }
        .tab1RightBox{
            .RightBoxFlex{
                display: flex;
                justify-content: center;
                margin-top: 10px;
            }
            img{
                width: 10vw;
                height: 11vw;
            }
             .RightBoxFlex1{
                display: flex;
                justify-content: center;
                margin-top: 10px;
                img{
                    width: 10vw;
                    height: 14vw;
                }
            }
            .dialogBg{
                background: rgba(0,0,0,.7) ;
                &::before{
                    border-bottom-color: rgba(0,0,0,.7);
                }
            }
        }
        .tab1LeftBox{
            .fishBox{
                display: flex;
                // margin-top: 50px;
                padding-left:30px;
                >div{
                    position: relative;
                    animation: bounce 1.2s infinite ease-in-out alternate;
                }
                >div:nth-child(1){
                    top: 100px;
                    left: 10px;
                    >img{
                        width: 4rem;
                        height: 4rem;
                    }
                }
                >div:nth-child(2){
                    top: 30px;
                    left: -15px;
                    animation-delay:0.2s;
                    >img{
                        width: 6rem;
                        height: 6rem;
                    }
                }
                >div:nth-child(3){
                    top: -10px;
                    left: 0px;
                    animation-delay:0.4s;
                }
                >div:nth-child(4){
                    top: -20px;
                    left: 30px;
                    animation-delay:0.6s;
                }
                >div:nth-child(5){
                    top: 50px;
                    left: 20px;
                    animation-delay:0.8s;
                    >img{
                        width: 3.5rem;
                        height: 3.5rem;
                    }
                }
                >div:nth-child(6){
                    top: 110px;
                    left: -20px;
                    animation-delay: 1s;
                    >img{
                        width: 3.5rem;
                        height: 3.5rem;
                    }
                }
                .fish{
                    width:4rem;
                    height:4.1rem;
                    min-width: 4rem;
                    color: white;
                    text-align: center;
                    display: flex;
                    flex-flow: column;
                    align-items: center;
                }
            }
            .maoBox{
                width: 290px;
                height: 290px;
                // margin-top: 130px;
                display: flex;
                >div:nth-child(1){
                    // margin-top: 170px;
                    margin-left: 20%;
                    >img{
                        width: 100% ;
                        height: 100%;
                    }
                }
            }
        }



    }





    .bd{
        background: url("../assets/img/bangdan1.png") no-repeat ;
        background-size: cover;
    }
    
    .tab1pop{
        background: url("../assets/img/tab1pop.png") 0 0 no-repeat ;
        background-size: 100% 100%; 
    }
    .tab1pop2{
        background: url("../assets/img/tab1pop2.png") 0 0 no-repeat ;
        background-size: 100% 100%; 
    }
    .tab1popBtn{
        background:#ffdc02;
        color: #a85326;
        font-weight: bold;
    }
    .fenxiang .van-popup{
        &::before{
            background-color: white;
        }
        &::after{
            background-color: white;
        }
        background-color: transparent;
    }
    .zz{
        background-color: transparent;
        .send{
            position: absolute;
            top: 100px;
            width: 80%;
            margin: auto;
            left: 50%;
            transform: translateX(-50%);
        }
    }
    .fenxiang.van-popup--center{
        transform: translate(-50%,-50%);
    }
    .list {
        // border-bottom: 1px dashed #333;
        padding: 8px 0;
        max-height: 300px;
        overflow-y: auto;
    }
    .send{
        margin: auto;
        &>div{
            margin: 8.5px 0;
        }
        span{
            color: #333;
            width:100px;
            font-weight: bold;
        }
        input{
            padding: 3px;
            width: 100%;
            line-height: 2rem;
            background-color: white;
            // border: 1px solid #DBDBDB ;s
        }
    }
    
    .van-popup{
        overflow-y: initial;
    }

    

    
    .right_img{
        position: absolute;
        right:15px;
        top:12vw;
        display: flex;
        flex-flow: column;
        justify-content:  flex-end;
        align-items:  flex-end;
        img{
            float: right;
            width: 10vw;
            height: auto;
        }
        &>*{
            margin:2vw  0;
        }
    }
    .bottom{
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translate(-50%,0);
    }
    .bottomMao{
        position: relative;
        left: -50px;
        top: 50px;
    }
    .van-notice-bar{
        height:25px;
    }
    .progress{
        width: 55%;
        border-radius:10px;
        border: 2px solid #F3FFD7;
        background: url("../assets/img/tan2jindu.png") 0 0 no-repeat;
        background-size: 100% 100%;
        box-shadow: 0px 2px 2px rgba(0,0,0,.3);
        height: 1.1rem;
        margin: 30px 0 5px 50px;
        position: relative;
        img{
            position: absolute;
            width: 30px;
            height: auto;
            top: -30px;
            transform: translateX(-50%);
        }
        div{
            background-image: linear-gradient(to bottom,#0058b6,#33acb7,#00a347);
        }
    }
    .lg3{
        background-image: url("../assets/img/huipao.png");
        background-size: 100% 100%;
        /*border-radius: 999px;background-image: linear-gradient(to bottom,#EBDC99,#E3C45C);border: 1px solid #B9A348;*/
    }
    .active{
        // background-image:linear-gradient(to bottom,#FBEF9B,#FCD94D,#FCC526) ;
        // border: 1px solid #FAD661;
        border-radius: 3px;
    }
    @keyframes bounce {
        0% {
            transform: translateY(0px);
        }
        100% {
            transform: translateY(10px);
        }
    }
    @keyframes bounce1 {
        0% {
            transform: translateY(10px);
        }
        100% {
            transform: translateY(0px);
        }
    }
    .add_ml{
        animation:add_ml 1s;

    }
    @keyframes add_ml {
        from{
            transform: translateY(10px);
        }
        to{
            transform: translateY(0);
        }
    }
    .weishiBox{
        position: fixed;
        bottom: 20px;
        width: 200px;
        left: 50%;
        transform: translateX(-50%);
    }
</style>
