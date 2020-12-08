<template>
    <div style="height: 100%;background-color: #9025ff">
        <!-- <van-nav-bar
                right-text="抽奖明细"
                @click-right="openWin(`tab1-draw_list`)"
                :left-arrow="false"
                class="header"
                style="position:absolute;z-index: 3333;width: 100%"
        /> -->
        <img src="../../assets/img/yjj.png" alt="" style="position: absolute">
        <div class="drawTopR" @click="openWin(`tab1-draw_list`)">抽奖明细</div>
        <img @click="tab1CloseExtend" src="@/assets/img/close1.png" alt="" style="width: 40px;height: 40px;position: absolute;left: 2rem;top: 2rem">
        <img  src="@/assets/img/yjz.png" alt="" style="width: 86%; position: absolute;left: 2rem;top: 7rem">
        <img @click="ruleWin" src="@/assets/img/yjwf.png"  alt="" style="z-index:99;width: 30px; position: absolute;left: 21.9rem;top: 30rem">
        <div class="yj">

            <!-- 轮播 -->
            <!-- <span class="hint">
                    <van-notice-bar
                      :speed="90"
                      :text="notice"
                      :scrollable="true"
                      color="white"  style="padding: 0;background-color: transparent;" class="fontS_12">
                    </van-notice-bar>
            </span> -->
            <div>
                <div class="award_money">
                    <span>{{info.award_money}}</span>
                </div>
            </div>
            <p class="color_fff">剩余抽奖机会：{{info.last_join_nums}}次</p>
            <!-- <div class="kuang">
                <img @click="close" src="@/assets/img/kuang.png" alt="" style="">
                <span>
                    剩余抽奖机会：
                    <span class="fontS_16">{{info.last_join_nums}}</span>
                    次
                </span>
            </div> -->
            <div class="PLR_10">
                <div class="award_num">
                    <div v-for="(a,index) in num" :key="index"><span>{{a}}</span></div>
                </div>
            </div>
            <!-- <div class="flex_between">
                <div v-for="(a,index) in num" :key="index">
                    <img @click="close" src="@/assets/img/hongbao_.png" alt="" style="">
                    <span class="fontS_30">{{a}}</span>
                </div>
                <div style="width: 2vw;height: 2vw;background:white;border-radius: 33vw;position: absolute;left:46%;bottom: 1vw;transform: translateX(-50%)"></div>
            </div> -->

            <img @click="draw"  src="@/assets/img/yjan.png" alt="" style="width: 180px;height: auto;margin: 55px auto 0">

            <div class="progress">
                <p>第{{info.cur_date}}期：剩余时间  <van-count-down @finish="getinfo" :time="time__" style="display: inline-block;color: #d66c0e;font-weight: bold"/></p>
                <!-- <div></div> -->
                <!-- <p style="margin-top: 30px">玩法规则</p>
                <p v-html="rule"></p> -->
            </div>
            <div class="PLR_10">
                <div class="zjName">
                    <p v-for="(item,index) in notice" :key="index">{{item}}</p>
                </div>
            </div>
        </div>
        <van-popup class="congratulate" v-model="show" style="width:80%;padding: 20px;border-radius: 12px;height:220px">
            <div v-show="show">
                <img @click="show=false" src="@/assets/img/close.png" alt="" style="width: 24px;height: 24px;position: absolute;right: 0;top: -35px">
                <h1 style="text-align: center" class="fontS_16">
                    <img :src="requireimg(congratulate?'yjd':'shibai')" alt="" style="width:93px;height:auto;border-radius: 7px">
                </h1>
                <p class="fontS_16 MT_3" style="font-weight:100;line-height:30px;text-align: center"> {{ congratulate?`恭喜您，获得${bonus}元红包`:`很遗憾，您没有中奖`}}</p>
                <div @click="again" class="login MLR_auto W_100 bg_F3CB7B  B_radius_10 fontS_13" style="width:70%;padding:0 26px;line-height:30px;margin:10px auto;border-radius: 100px;text-align: center" >
                   {{ congratulate?`领取红包`:`再来一次`}}
                </div>
            </div>
        </van-popup>

        <van-popup class="congratulate" v-model="ruleShow" style="width:80%;padding: 20px;border-radius: 12px;height:220px;background:#fff;">
            <img @click="ruleShow=false" src="@/assets/img/close.png" alt="" style="width: 24px;height: 24px;position: absolute;right: 0;top: -35px">
            <div class="W_100 H_100" style="overflow-y: scroll;">
                <div v-html="rule"></div>
            </div>
        </van-popup>

        <van-popup class="tab1pop" v-model="pop_show" style="width:85%;padding: 20px;border-radius: 12px;height:420px">
            <div>
                <img @click="pop_show=false" src="@/assets/img/close1.png" alt="" style="width: 40px;height: 40px;position: absolute;right: 5px;top: 5px">
                <div style="margin-top: 80px">
                    <h1 style="text-align: center" class="fontS_16">
                        <img :src="requireimg('5c8867055fb6d')" alt="" style="width:70%;height:auto;border-radius: 7px;">
                    </h1>
                    <div @click="btn1(1)" class="login MLR_auto W_100 tab1popBtn B_radius_10 fontS_12" style="width:80%;padding:0 26px;line-height:40px;margin:20px  auto 5px;border-radius: 100px;text-align: center" >
                        观看视频得3次抽奖机会
                    </div>
                    <div @click="btn1(0)" class="login MLR_auto W_100 tab1popBtn B_radius_10 fontS_12" style="width: 80%;padding:0 26px;line-height:40px;margin:10px  auto 5px;border-radius: 100px;text-align: center" >
                        两元气丹兑换1次抽奖机会
                    </div>
                    <p class="fontS_12" style="color: #cbd8fb;font-weight:100;text-align: center">看视频次数：{{info.view_video_count}}次</p>
                    <p class="fontS_12" style="color: #cbd8fb;font-weight:100;line-height:30px;text-align: center">每期只能看一次视频或者买一次</p>
                </div>
            </div>
        </van-popup>


        <audio id="draw"
               preload="auto"
               src="../../assets/audio/draw.mp3">
        </audio>
    </div>
</template>
<script >
    import {Component,Vue} from 'vue-property-decorator';
    import {mixins} from 'vue-class-component'
    import common from "@/assets/js/common"
    import Pop from "@/components/Pop.vue";
    import {NavBar, Popup,NoticeBar,CountDown,Toast } from 'vant';
    import {Yaojiangji_info,award,exchange,view_video,get_articles} from '@/assets/js/const';

    Vue.use(Popup).use(NavBar).use(NoticeBar).use(CountDown );
    @Component({
        components:{Pop}
    })
    export default class extends mixins(common) {
        pop_show=false;/*财宝箱弹窗*/
        show=false;/*中间弹窗*/
        congratulate=false;/*是否中奖*/
        num=[9,9,9,9];/*是否中奖*/
        ruleShow = false ;

        info={};
        notice='';
        rule='';
        bonus=0;
        time__=0;
        time=null;
        mounted() {
            this.getinfo();
            this.addEventFn();
            this.addKeyback();
        }

        addEventFn () {
            //看广告 后 相关视频监听
           //cat 普通看视频  qipao 气泡元气丹翻   view_goods 浏览商品看视频  
           //sign 签到看视频  zhuanpan 大转盘看视频  tab2Lianxu tab2连续看视频
           // buzhuls 元气丹不足  viewVideo 看完视频领三次抽奖机会
           api.addEventListener({name: "videoEndWay"},(ret, err)=>{
               if (ret) {
                   if(ret.value.type == 'viewVideo'){
                       this.viewVideo()
                   }
               } else {
                   this.toast('加载失败，请重试！')
               }
           })
        }

        again() {
          this.congratulate?'':(this.draw(),this.show=false);
        }

        ruleWin() {
            this.ruleShow  = true
        }

        btn1(can) {
            if(can == 1){
                //todo  看完视频领三次抽奖机会
                let that = this;
                that.videoLsit('viewVideo')
            }else{
                this.http(exchange).then(v=>{
                   if(v.code==0){
                       Toast('兑换成功');
                       this.pop_show=false;
                       this.getinfo();
                   }
                })
            }
        }

        viewVideo() {
            this.http(view_video).then(v=>{
                if(v.code==0){
                    this.pop_show = false
                    Toast('已获取3次抽奖机会')
                    this.getinfo();
                }
            })
        }

        getinfo() {
            this.http(Yaojiangji_info).then(v=>{
                this.info=v.data;
                this.time__=v.data.end_timestamp*1000-new Date();
                // this.notice=v.data.list.join('\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0');
                this.notice=v.data.list;
            })
            this.http(get_articles,{type:7}).then(v=>{
                this.rule=v.data.info;
            })
        }
        draw() {
            /*无抽奖次数*/
            if(this.info.last_join_nums<1){
                this.pop_show=true;
                return
            }

            this.http(award).then(v=>{
                if(v.code==0){
                    document.querySelector("#draw").play();  
                    this.getinfo();
                    var nn;
                    this.time=setInterval(()=>{
                        nn=(Math.random()*10+'').replace('.','').split('')
                        this.num=[nn[0],nn[1],nn[2],nn[3]]
                    },1)

                    if(v.code==0&&v.data.is_award==1){
                        setTimeout(()=>{
                            this.num=this.info.award_money_str.replace('.','').split('')
                            this.bonus=v.data.award_money;
                            clearInterval(this.time)
                            this.congratulate=true;
                            this.show=true;
                        },5000)
                    }else{
                        setTimeout(()=>{
                            if(this.num=this.info.award_money_str.replace('.','').split('')){
                                this.num=[nn[0],nn[1],nn[2],nn[3]]
                            }
                            clearInterval(this.time)
                            this.congratulate=false;
                            this.show=true;
                        },5000)
                    }
                }else{
                        Toast(v.msg)
                }


            })



        }
    }
</script>

<style lang="scss">
    @import "@/assets/css/app.scss";


    html{
        background-color: #F1463C
    }
    .congratulate{
        background-color: #FFDFE0;
    }
    .header{
        background: transparent;
        .van-nav-bar__text{
            color: white;
        }
    }
    [class*=van-hairline]::after{
        border: 0;
    }
    .progress{
        margin-top:11px;
        color: #d66c0e;
        text-align: center;
    }
    .zjName{
        // background: #000;
        width: 100%;
        height: 35px;
        margin-top: 10px;
        overflow-y: scroll;
    }
    .yj{
        width: 86%;
        height: 60%;
        position: absolute;
        top: 16rem;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        flex-flow: column;
        text-align: center;
        background: url(./../../assets/img/yjc.png) 0 0 no-repeat;
        background-size: 100% 100%;
        .hint{
            border-radius: 5px ;
            background:linear-gradient(to right,transparent,rgba(255,251,252,.5),transparent) ;
            color:#fff;
            width: 100%;
            margin: 20px 0 10px;
            text-align: center;
            white-space: nowrap;
            height: 25px;
            .van-notice-bar{
                height: 30px;
            }
            .van-notice-bar__content{
                line-height: 1.4rem;
            }
        }
        .hint+span{
            color: #FBE300;
            font-weight: bold;
        }
        .award_money{
            margin-top: 73px;
            font-size: 30px;
            font-weight: bold;
            color: #fffbd4;
            display: flex;
            height: 32px;
            >span{
                margin-left: 190px;
                
            }
        }

        // &>div>div {
        //     position: relative;
        //     width:25%;
        //     height:auto;
        //     margin: 10px;
        //     img {
        //         width: 100%;
        //         height: 100%;
        //     }
        //     span {
        //         position: absolute;
        //         left: 50%;
        //         bottom: 6px;
        //         color: white;
        //         transform: translateX(-50%);
        //         span{
        //             color: #FBE313;
        //         }
        //     }
        // }

        .award_num{
            display: flex;
            // background: #000;
            color: #fff;
            margin-top: 115px;
            justify-content: space-around;
            font-size: 18px;
        }
        .kuang{
            margin-top: 30px;
            img{
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                width: 170px;
                height: auto;
            }
            &>span{
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                color: white;
                line-height: 48px;
                span{
                    color: yellow;
                }
            }
        }
    }

    .drawTopR{
        position: absolute;
        right: 0;
        top: 3rem;
        padding:5px 10px;
        background: #edaafe;
        color: #fe6c2d;
        border-radius: 5px 0 0 5px;
    }
    .tab1pop{
        background: url("../../assets/img/tab1pop.png") 0 0 no-repeat ;
        background-size: 100% 100%; 
    }
    .tab1popBtn{
        background:#ffdc02;
        color: #a85326;
        font-weight: bold;
    }
</style>
