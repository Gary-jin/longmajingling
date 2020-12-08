<template>
    <div style="height: 100%;background-color: #30058a">
        <img src="../../assets/img/zhuanpanbg.png" class="W_100 H_100" alt="" style="position: absolute">
        <img @click="tab1CloseExtend" src="@/assets/img/close1.png" alt="" style="width: 55px;height: 55px;position: absolute;left: 1rem;top: 2.5rem">
        <div class="drawTopR" @click="openWin(`common-explain`,{type:`about`,title:`游戏规则`,type_:8})">游戏规则</div>
        <!-- <span class="hint">
            <van-notice-bar
                    :speed="55"
                    :text="notice"
                    color="black"  style="padding: 0;background-color: transparent;" class="fontS_12">
            </van-notice-bar>
         </span> -->
         <div class="hintBox">
            <!-- <p v-for="(item,index) in notice" :key="index">{{item}}</p> -->
            <div style="height:30px;"></div>
            <van-notice-bar style="background:none;" color="#fff" scrollable :text="notice" />
         </div>
        <div style="position: absolute;top:55%;left: 50%;transform:translate(-50%,-50%);width:90vw;height:90vw;">
            <img :src="requireimg(`zpbg`)" alt="" style="position: absolute;width: 100%;height: auto;z-index: 3;left: 50%;top: 50%;transform: translate(-50%,-50%)">
            <img ref="turn"  class="turn" :src="requireimg(`jiangxiang`)" alt="" style="width: 70vw;height:auto;position:absolute;z-index: 3;left: 50%;top: 50%;margin-left: -35vw;margin-top:  -35vw">
            <img  :src="requireimg(`zhuanpan1`)" alt=""  style="position: absolute;top:50%;left: 50%;transform:translate(-50%,-50%);z-index: 2">
            <img @click="turnele" class="turnele" :src="requireimg(`zpjt`)" alt="" style="width: 83px;height: 100px;position: absolute;top:50%;left: 50%;transform:translate(-50%,-50%);z-index: 4">
        </div>
        <div class="bottom">
                <h1 class="fontS_14 color_fff">您还有<span class="fontS_16">{{info.last_zhuan_nums}}</span>次抽奖机会</h1>
                <span @click="openWin(`tab1-winner`)">中奖纪录 </span>
                <!-- <p class="MT_10 color_fff" @click="openWin(`common-explain`,{type:`about`,title:`游戏规则`,type_:8})">游戏规则</p> -->
        </div>

        <van-popup :class="type == 'video'?'tab1pop2':'tab1pop'" v-model="show" style="width:85%;padding: 20px;border-radius: 12px;height:420px">
            <img @click="show=false" src="@/assets/img/close1.png" alt="" style="width: 40px;height: 40px;position: absolute;right: 5px;top: 5px">
            <div v-if="type=='video'">
                <div style="margin-top: 95px">
                    <div class="fontS_22" style="color: #ffffff;font-weight:bold;text-align: center">
                        您暂时还没有<span>转盘次数哦</span>
                        <p class="fontS_12" style="color: #cbd8fb;font-weight:100;line-height:30px;">点击观看视频获得次数吧</p>
                    </div>
                    <h1 style="text-align: center；width:150px;height:100px" >
                        <!-- <img :src="requireimg('video')" alt="" style="width:150px;height:auto;border-radius: 7px;"> -->
                    </h1>
                    <div @click="seevideo" class="login MLR_auto W_100 tab1popBtn  B_radius_10 fontS_16" style="width: 80%;padding:0 26px;line-height:40px;margin:22px  auto 5px;border-radius: 100px;text-align: center" >
                        点击观看
                    </div>
                    <p class="fontS_12" style="color: #cbd8fb;font-weight:100;line-height:30px;text-align: center">看视频次数：{{num}}次</p>
                </div>
            </div>
            <div v-else-if="type=='maobi'">
                <div style="margin-top: 95px">
                    <div class="fontS_16" style="color: #ffffff;font-weight:bold;text-align: center">
                        恭喜获得<span >{{draw.award_str}}~</span>
                        <p class="fontS_12" style="color: #cbd8fb;font-weight:100;line-height:30px;">元气丹可用于给龙马喂食，等级越高所需元气丹越多</p>
                    </div>
                    <h1 style="text-align: center" class="fontS_16">
                        <img :src="requireimg('maobi')" alt="" style="width:150px;height:auto;border-radius: 7px;">
                    </h1>
                    <div @click="share" class="login MLR_auto W_100 tab1popBtn  B_radius_10 fontS_16" style="width: 80%;padding:0 26px;line-height:40px;margin:22px  auto 5px;border-radius: 100px;text-align: center" >
                        点击分享才能领取
                    </div>
                </div>
<!--                <p class="fontS_12" style="color: #cbd8fb;font-weight:100;line-height:30px;text-align: center">看视频次数：{{draw.view_video_count}}次</p>-->
            </div>
            <div v-else-if="type=='video1'">
                <div style="margin-top: 95px">
                    <div class="fontS_16" style="color: #ffffff;font-weight:bold;text-align: center">
                        恭喜获得<span >{{draw.award_str}}~</span>
                        <p class="fontS_12" style="color: #cbd8fb;font-weight:100;line-height:30px;">领取倍速奖励之后获得的元气丹才可以翻倍</p>
                    </div>
                    <h1 style="text-align: center" class="fontS_16">
                        <img :src="requireimg('video')" alt="" style="width:150px;height:auto;border-radius: 7px;">
                    </h1>
                    <div @click="share" class="login MLR_auto W_100 tab1popBtn  B_radius_10 fontS_16" style="width: 80%;padding:0 26px;line-height:40px;margin:22px  auto 5px;border-radius: 100px;text-align: center" >
                        点击分享才能领取
                    </div>
                </div>
<!--                <p class="fontS_12" style="color: #cbd8fb;font-weight:100;line-height:30px;text-align: center">看视频次数：{{draw.view_video_count}}次</p>-->
            </div>
            <div v-else>
                <div style="margin-top: 95px">
                    <div class="fontS_16" style="color: #ffffff;font-weight:bold;text-align: center">
                        恭喜获得<span >{{draw.award_str}}~</span>
                        <p class="fontS_12" style="color: #cbd8fb;font-weight:100;line-height:30px;">只有分享之后才可以领取哦~</p>
                    </div>
                    <h1 style="text-align: center" class="fontS_16">
                        <img :src="requireimg('hongbao')" alt="" style="width:150px;height:auto;border-radius: 7px;">
                    </h1>
                    <div @click="share('bgSound')" class="login MLR_auto W_100 tab1popBtn  B_radius_10 fontS_16" style="width: 80%;padding:0 26px;line-height:40px;margin:22px  auto 5px;border-radius: 100px;text-align: center" >
                        点击分享才能领取
                    </div>
                </div>
<!--                <p class="fontS_12" style="color: #cbd8fb;font-weight:100;line-height:30px;text-align: center">看视频次数：{{draw.view_video_count}}次</p>-->
            </div>
        </van-popup>

        <audio id="redSound"
               preload="auto"
               src="../../assets/audio/redSound.mp3">
        </audio>


    </div>

</template>
<script>
    import "@/assets/js/iconfont/iconfont.css";
    import {Component, Vue} from 'vue-property-decorator';
    import {mixins} from 'vue-class-component'
    import common from "@/assets/js/common"
    import {qrcodeInfo,get_video_counts,Zhuanpan_info,Zhuanpan_award,Zhuanpan_get_share_info,get_zhuanpan_award,zhuanpan_view_video} from '@/assets/js/const';
    import {NoticeBar,CountDown,Popup,Toast} from 'vant';
    Vue.use(NoticeBar).use(CountDown ).use(Popup );



    @Component
    export default class extends mixins(common) {
        info={}
        notice=''
        type=''
        show=false


        num=0
        draw={}

        seeNum = ''

        award_id=''
        qrImag = ''

        mounted() {
            this.getinfo();
            this.addEventFn()
            this.invite()
            this.addKeyback()
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
                   if(ret.value.type == 'zhuanpan'){
                       this.seeVideoOver()
                   }
               } else {
                   this.toast('加载失败，请重试！')
               }
           })
        }
        invite() {
            this.http(qrcodeInfo).then((res)=>{
                if(res.code == 0){
                    this.qrImag = res.data.thumb[0]
                }
            })
        }
        turnele() {
            if(this.info.last_zhuan_nums==0){
                 this.type="video"
                return this.show=true;
            }

            this.http(Zhuanpan_award).then(v=>{
                if(v.code==0){
                 /* v.data={
                   "id":1,
                   "award_id":8,
                   "award_str": "1元气丹奖励",
                   "view_video_count": 0
               }*/
                    // this.num=v.data.view_video_count;
                    this.award_id=v.data.award_id;
                    this.draw=v.data;
                    this.getinfo();

                    this.$refs.turn.removeAttribute('class');

                    setTimeout(()=>{
                        this.$refs.turn.setAttribute('class',`active${v.data.id} turn`)
                    })
                    switch (v.data.id) {
                        case 1:
                        case 3:
                        case 4:
                        case 5:
                        case 7:
                            setTimeout(()=>{
                                this.type="maobi"
                                this.show=true;
                            },5000)
                            break
                        case 2:
                            setTimeout(()=>{
                                this.type="hongbao"
                                this.show=true;
                                this.redbgSound()
                            },5000)
                            break

                        case 6:
                        case 8:

                            setTimeout(()=>{
                                this.type="video1"
                                this.show=true;
                            },5000)
                            break
                    }
                }else{
                    Toast(v.msg)
                }

            })




        }

        // share() {
        //     this.http(Zhuanpan_get_share_info).then(v=>{
        //         //todo  微信分享网页链接
        //         var inShare = api.require('inShare');

        //         var a = v.data.url;
        //         var name = 'fs://' + a.substring(a.lastIndexOf('/') + 1);
        //         api.download({
        //             url: a,
        //             savePath: name,
        //         }, (ret, err)=> {
        //             // alert(JSON.stringify(ret))
        //             return
        //             if (ret.state == 1) {
        //                 //下载成功
        //                 inShare.shareImgsTo({
        //                     imgPaths:ret.savePath,
        //                     sendPattern: 'ONLY',
        //                     description: v.data.text,
        //                     app:'wxFriend',
        //                 },function(ret,err){
        //                     if(ret.status){
        //                         this.getinfo();
        //                     }else{
        //                         // alert(ret.errorMessage);
        //                     }
        //                 });

        //             } else {

        //             }
        //         });

        //         inShare.shareTextTo({
        //             content:v.data.url,
        //             sendPattern:'ONLY',
        //             app:'wxFriend',
        //         },function(ret,err){
        //             if(ret.status){
        //                 alert(JSON.stringify(ret));
        //                 this.getinfo();
        //             }else{
        //                 alert(ret.errorMessage);
        //             }
        //         });
                    
        //          /*分享后领奖*/
        //         this.http(get_zhuanpan_award,{award_id:this.award_id}).then(v=>{
        //             if(v.code==0){
        //                 this.show=false
        //                 return Toast('领取成功')
        //             } else {
        //                 Toast(v.msg)
        //             }
        //         })
        //     })
        // }

        share(way){
            var inShare = api.require('inShare');
            var that=this
            var path=[]
            var a=that.qrImag;
            var name = 'fs://' + a.substring(a.lastIndexOf('/')+1).replace('?','');
            api.download({
                url: a,
                savePath: name,
                report: true,
                cache: true,
                allowResume: true
            }, (ret, err)=> {
                if (ret.state == 1) {
                    path.push(name)
                    //下载成功
                    inShare.shareImgsTo({
                        imgPaths:path.join(','),
                        sendPattern: 'ALL',
                        app:'wxFriend',
                    },function(ret,err){
                        if(ret.status){
                            // alert("asdasd");
                        }else{
                            // alert(ret.errorMessage);
                        }
                    });
                }
            });
            that.inviteOK()
            
        }

        inviteOK(){
            this.http(get_zhuanpan_award,{award_id:this.award_id}).then(v=>{
                if(v.code==0){
                    this.show = false
                    // Toast('领取成功')
                    // 更新游戏页面 元气丹数量
                    api.sendEvent({
                        name: "turnableUpdata"
					});
                } else {
                    Toast(v.msg)

                }
            })
        }

        getinfo() {
            this.http(Zhuanpan_info).then(v=>{
                this.info=v.data;
                this.num=v.data.view_video_count;
                this.notice=v.data.list.join('\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0');
                // this.notice=v.data.list;
            })
        }
        // 看视频
        seevideo() {
            this.seeVideoNum('zhuanpan')
        }
        // 看视频后
        seeVideoOver() {
            let that = this;
            that.http(zhuanpan_view_video).then((res)=>{
                if (res.code == 0 ){
                    that.getinfo()
                } else {
                    Toast(res.msg)
                }
            })
        }

         // 看视频次数限制
        //cat 普通看视频  qipao 气泡元气丹翻   view_goods 浏览商品看视频  
        //sign 签到看视频  zhuanpan 大转盘看视频 
        seeVideoNum(way){
            var that = this;
            that.http(get_video_counts,{type:way}).then((res)=>{
                if(res.code == 0){
                    that.seeNum = res.data.count
                    if (that.seeNum>0) {
                        that.show = false

                        this.videoLsit('zhuanpan')
                        // that.showChuanshanjiaAd().then(suc =>{
                        //     that.seeVideoOver();
                        // })
                    } else{
                        that.toast('此视频次数已用完')
                    }
                }
            })
        }
    }
</script>

<style lang="scss">
    @import "@/assets/css/app.scss";

    .hint{
        border-radius: 5px ;
        background-color:#FF8A84 ;
        color: #333333;
        position: fixed;
        top: 14rem;
        left: 50%;
        width: 50%;
        transform: translateX(-50%);
        white-space: nowrap;
        height: 25px;
        .van-notice-bar{
            height: 34px;
        }
        .van-notice-bar__content{
            line-height: 1.3rem;
        }

    }
    .turn.active1{
        transform: rotate(10826deg);
        transition:all 5s ;
    }
    .turn.active2{
        transform: rotate(10777.5deg);
        transition:all 5s ;
    }
    .turn.active3{
        transform: rotate(10724deg);
        transition:all 5s ;
    }
     .turn.active4{
        transform: rotate(11042.5deg);
        transition:all 5s ;
    }
     .turn.active5{
        transform: rotate(11002.5deg);
        transition:all 5s ;
    }
     .turn.active6{
        transform: rotate(10967.5deg);
        transition:all 5s ;
    }
     .turn.active7{
        transform: rotate(10925.5deg);
        transition:all 5s ;
    }
     .turn.active8{
        transform:rotate(11244.5deg);
        transition:all 5s ;
    }

    .van-popup{
        overflow-y: initial;
    }
    .bottom{
        text-align: center;
        &>span{
            width: 200px;
            
            border-radius:1000px ;
            background-color:#ffe05e ;
            color: #3c0d9c;
            padding: 8px 5px;
            position: initial;
            margin:7px auto 0;
            display: block;
            white-space: nowrap;
            font-size: 18px;
            font-weight: bold;
        }
        position: fixed;
        bottom: 2rem;
        left: 50%;
        transform: translateX(-50%);
    }
    .drawTopR{
        position: absolute;
        right: 0;
        top: 5rem;
        padding:5px 10px;
        // background: #edaafe;
        background-image: linear-gradient(to bottom,#6b2ede,#8e53fe,#6b2ede);
        color: #ffffff;
        border-radius: 15px 0 0 15px;
        font-style: italic;
    }
    .hintBox{
        position: fixed;
        top: 9rem;
        left: 50%;
        width: 70%;
        height: 100px;
        transform: translateX(-50%);
        overflow-y: scroll;
        text-align: center;
        color: #ffffff;
    }

    .tab1pop{
        background: url("../../assets/img/tab1pop.png") 0 0 no-repeat ;
        background-size: 100% 100%; 
    }
    .tab1pop2{
        background: url("../../assets/img/tab1pop2.png") 0 0 no-repeat ;
        background-size: 100% 100%; 
    }
    .tab1popBtn{
        background:#ffdc02;
        color: #a85326;
        font-weight: bold;
    }
</style>
