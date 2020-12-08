<template>
    <div class="flex" >
        <div class="dkbgBox">
            <van-nav-bar
                    title="早起打卡"
                    left-arrow
                    @click-left="close"
                    right-text="挑战明细"
                    @click-right="openWin('tab0-detail')"
                    class="header"
            />
            <!-- <img src='../../assets/img/dkbg.png' alt="" style="height: auto;width: 100%;position: absolute;top: 0;left: 0;z-index: -1" > -->
                <div style="text-align: center;color: white">
                    <p style="margin-top: 3rem;font-size: 18px;">{{info.str}}</p>
                    <p style="font-size: 30px;line-height: 52px">{{info.total_money}}</p>
                    <p style="font-size: 12px">已有<span>{{info.join_nums}}</span>人参与</p>
                    <p style="font-size: 12px;line-height: 20px;margin-bottom: 1rem"  @click="openWin(`common-explain`,{type:`tzgz`,title:`挑战规则`,type_:2})">挑战规则》</p>
                </div>
                <div class="btn" style="background: #326bff;" @click="show=true">我要挑战</div>
                <div class="btn" style="background: #326bff;" @click="clockIn()">我要打卡</div>
                <div class="invite fontS_12" @click="show1=true">
                    <div>
                        <img :src="requireimg(`friend`)" alt="">
                    </div>
                    邀请 <br> 好友
                </div>
                <div style="height:80px;"></div>
        </div>
        <section>
            <div class="mid_1">
                <div style="color:#326bff;">成功：{{info.dk_success_nums}}</div>
                <div style="color:red">失败：{{info.dk_fail_nums}}</div>
                <!-- <div><img  src="../../assets/img/yaoguai1.png" alt="" style="margin:4px auto -4px"><br>成功 <span>{{info.dk_success_nums}}</span></div>
                <div><img src="../../assets/img/yaoguai.png" alt=""><br>失败 <span>{{info.dk_fail_nums}}</span></div> -->
            </div>

            <div class="mid_ zk" style="margin: 60px 0">
                 <div class="zkk">
                      <div></div>
                      今日战况
                  </div>
                <div style="  position: relative;">
                    <img :src="info.first_dk_user_obj.avatar||requireimg(`logo-200`)" alt="">
                    <p style=";background-color: #326bff;color: white;border-radius: 100px;z-index:3;font-size: 12px;width: 70%;margin:50px auto 5px">早起之星</p>
                    <p style="color:#326bff;">{{info.first_dk_user_obj.nickname||'未来早起之星'}}</p>
                    <span>{{info.first_dk_user_obj.dk_time}}</span>
                </div>
                <div style="  position: relative;">
                    <img :src="info.max_maobi_dk_user_obj.avatar||requireimg(`logo-200`)" alt="">
                    <img style="width: 48px;position: absolute;left:11px;top: -38px;border: 0" :src="requireimg(`huangguan`)" alt="">
                    <p style=";background-color: #326bff;color: white;border-radius: 100px;z-index:3;font-size: 12px;width: 70%;margin:50px auto 5px">手气之星</p>
                    <p style="color:#326bff;">{{info.max_maobi_dk_user_obj.nickname||'未来手气之星'}}</p>
                    <span>{{info.max_maobi_dk_user_obj.dk_time}}</span>
                </div>
                <div style="position: relative;">
                    <img :src="info.yili_dk_user_obj.avatar||requireimg(`logo-200`)" alt="">
                    <p style=";background-color: #326bff;color: white;border-radius: 10px;z-index:3;font-size: 12px;width: 70%;margin:50px auto 5px">毅力之星</p>
                    <p style="color:#326bff;">{{info.yili_dk_user_obj.nickname||'未有毅力之星'}}</p>
                    <span>{{info.yili_dk_user_obj.dk_time}}</span>
                </div>
            </div>
        </section>
        <van-popup v-model="show" :duration="0" round  position="bottom">
            <p style="text-align: center;color: #101010;margin: 13px 0">参与早上6:00~8:00 <br>
                早起分红挑战</p>

            <div style="width: 100%;padding:0 28px">
                <div class="flex_between a33" style="flex-flow: wrap">
                    <van-button :class="{active:type==i}" @click="type=i"  v-for="(v,i) in je" :key="i" color="#CCCCCC" plain class="fontS_17" style="line-height: 14px;">
                        <p class="fontS_16" style="margin-top: 10px;">{{v.fen}}</p>
                        <p class="fontS_12" style="margin:10px 0;">{{v.text}}</p>
                    </van-button>
                </div>
                <p class="fontS_12 MT_2" style="color: red">提示：1份等于1元，购买份数越多，打卡成功后赚的越多</p>
            </div>
            <h1 style="border-bottom: 1px solid #DFDFDF;padding-left: 28px;line-height: 32px">支付方式</h1>
            <div style="width: 100%;padding:0 28px">
                <van-radio-group v-model="radio">
                    <div class="flex_row_between PTB_3 BB_1_eee" style="padding:10px 0;line-height: 25px;" v-for="(v,i) in list" :key="i">
                        <div >
                            <img :src="requireimg(i==0?`wx`:`zfb`)" alt="" style="width: 22px;height: 22px;vertical-align: -6px;margin-right: 5px">
                            <span class="fontS_14">{{v.name}}</span>
                        </div>
                        <div class="flex_colT flex_items_end" >
                            <van-radio :name="i"></van-radio>
                        </div>
                    </div>
                </van-radio-group>

                <div class="flex_between" style="margin-bottom:20px">
                    <div @click="show=false" style="width: 30%;border:1px solid #999" class=" MLR_auto MT_7 flex_rowC W_100 bg_F3CB7B PTB_1 B_radius_15 fontS_13" >取消</div>
                    <div  @click="comeon" style="width: 30%"  class="login MLR_auto MT_7 flex_rowC W_100 bg_F3CB7B PTB_1 B_radius_15 fontS_13">确定</div>
                </div>
            </div>
        </van-popup>

        <van-popup @click="show1=false"  class="fenxiang" v-model="show1" style="width:87%;padding: 20px;border-radius: 12px;bottom:-50px;overflow: initial">
            <img  :src="requireimg(`close`)" alt="" style="width: 24px;height: 24px;position: absolute;right: 0;top: -35px">
            <img :src="get_share_img" alt="" style="width: 70% ;height: auto;margin: auto;display: block">
            <van-divider style="width:50%;color: white;margin:20px auto">分享方式</van-divider>
            <div class="flex_between" style="margin:50px 0 0;text-align: center">
                <div @click="send(0)" style="display: flex;flex-flow: column" @click.stop="">
                    <img :src="requireimg(`pyq`)" alt="" style="width: 40px;height: 40px;background-color: white;border-radius: 66px">
                    <span style="color: white;margin-top: 10px">朋友圈</span>
                </div>
                <div @click="send(1)" style="display: flex;flex-flow: column">
                    <img :src="requireimg(`wx`)" alt="" style="width: 40px;height: 40px">
                    <span style="color: white;margin-top: 10px">微信</span>
                </div>
                <div @click="save"  style="display: flex;flex-flow: column">
                    <img :src="requireimg(`download`)" alt="" style="width: 40px;height: 40px;display: block;margin: auto">
                    <span style="color: white;margin-top: 10px">保存图片</span>
                </div>
            </div>
        </van-popup>
    </div>
</template>
<script >
    import "@/assets/js/iconfont/iconfont.css";
    import {Component,Vue} from 'vue-property-decorator';
    import {mixins} from 'vue-class-component'
    import common from "@/assets/js/common"
    import {tiaozhan,getTiaoZhaninfo,get_share_img,Morning_dk,is_smrz,get_pay_sign_str} from '@/assets/js/const';

    import {Button, NavBar, List, PullRefresh, Popup, Radio, RadioGroup, Divider, Toast} from 'vant';
    Vue.use(Button).use(NavBar).use(PullRefresh).use(List).use(Popup ).use(Radio ).use(RadioGroup ).use(Divider );
    @Component
    export default class  extends mixins(common) {
        je=[{
            fen:"1份",
            text:"小试牛刀"
        },{
            fen:"3份",
            text:"出手不凡"
        },{
            fen:"5份",
            text:"锋芒毕露"
        },{
            fen:"10份",
            text:"心狠手辣"
        },]
        type=0;
        list=[{
            name:"微信方式",
        },{
            name:"支付宝方式",
        }]
        radio=0

        info={}
        get_share_img="";
        show=false;
        show1=false;

        save() {
                api.showProgress({
                    title: '',
                    text: '正在保存',
                    modal: true
                });

                // alert(this.get_share_img)
                // var that=this

                    api.download({
                        url: this.get_share_img,
                        report: true,
                        cache: true,
                        allowResume: true
                    }, (ret, err)=> {
                        if (ret.state == 1) {
                            //下载成功
                            api.saveMediaToAlbum({
                                path: ret.savePath,
                                groupName:"龙马精灵"
                            }, (ret)=> {
                                if (ret && ret.status) {
                                        Toast('保存成功');
                                        api.hideProgress();

                                } else {
                                    Toast('保存失败')
                                }
                            });

                        } else {

                        }
                    });

        }

        send(index) {
            var type=""
            if(!index){
                /*微信*/
                type="wxCircle"
            }else{
                type="wxFriend"
            }

            var inShare = api.require('inShare');

            var a=this.get_share_img;
            var name = 'fs://' + a.substring(a.lastIndexOf('/') + 1);
            api.download({
                url: a,
                savePath: name,
                report: true,
                cache: true,
                allowResume: true
            }, (ret, err)=> {
                if (ret.state == 1) {
                    //下载成功

                    inShare.shareImgsTo({
                        imgPaths:ret.savePath,
                        sendPattern: 'ONLY',
                        app:type,
                    },function(ret,err){
                        /*if(ret.status){
                            alert(JSON.stringify(ret));
                        }else{
                            alert(ret.errorMessage);
                        }*/
                    });

                } else {

                }
            });
        }
        mounted() {
            this.http(get_share_img).then(v=>{
                this.get_share_img=v.data.info
                // alert(JSON.stringify(v.data))
            })
            this.getTiaoZhaninfo();
        }

        getTiaoZhaninfo() {
            this.http(getTiaoZhaninfo).then(v=>{
                this.info=v.data.info
                // alert(JSON.stringify(v.data))
            })
        }
        comeon() {
            let param={
                money:0,
                pay_type:this.radio==0?'wechatpay':'alipay'
            }
            switch (this.type) {
                case 0:
                    param.money=1
                    break;
                case 1:
                    param.money=3
                    break;
                case 2:
                    param.money=5
                    break;
                 case 3:
                    param.money=10
                    break;
            }
            // alert(JSON.stringify(param))
            // return
            // if(this.radio == 0){
            //     // 微信 支付
            //     this.giftPay(param)
            // }else {
            //     // 支付宝支付
            // }
                this.giftPay(param)
        }

        giftPay(param) {
            let that = this
            that.http(tiaozhan,param).then((res)=>{
                if (res.code == 0 ) {
                    // 微信 支付
                    let payTypeNow =  that.radio == '0' ? 'wechatpay':'alipay'
                    let payPar = {
                        paySite: res.data.paySite,
                        payType: payTypeNow,
                        payId: res.data.payId
                    }
                    that.http(get_pay_sign_str,payPar).then((ree)=>{
                        if(ree.code == 0){
                            if(that.radio == 0){
                                that.goWxPay(ree.data.info.pay_sign_str)
                            } else{
                                that.goAlPay(ree.data.info.pay_sign_str)
                            }
                        }
                    })
                }
            })
        }
        // 微信支付
        goWxPay(param) {
            // alert(param)
            param = JSON.parse(param)

            var that = this
            var wxPay = api.require('wxPayPlus')
            var info = {
                apiKey: param.appid,
                orderId: param.prepayid,
                mchId: param.partnerid,
                nonceStr: param.noncestr,
                timeStamp: param.timestamp,
                sign: param.sign
            }
            wxPay.payOrder(info, function (ret, err) {
                if (ret.status) {
                    that.toast('支付成功')
                    that.getTiaoZhaninfo()
                } else {
                    if (err.code === -2) {
                        that.toast('取消支付')
                    } else {
                        that.toast('支付失败')
                    }
                }
            })
        }
        // 支付宝支付
        goAlPay(params) {
            var that = this;
            var aliPayPlus = api.require("aliPayTradePlus");
            aliPayPlus.payOrder({
                orderInfo: params
                }, function (ret, err) {
                switch (ret.code) {
                    case '9000':
                    that.toast('支付成功')
                    that.getTiaoZhaninfo()
                    break
                    case '6001':
                    that.toast('取消支付')
                    break
                    case '8000':
                    that.toast('正在处理中')
                    break
                    default:
                    that.toast('支付失败')
                }
                })
        }

        //打卡
        clockIn () {
            let that = this;
            that.http(is_smrz).then((res)=>{
                if(res.data.is_smrz){
                    that.http(Morning_dk).then((res)=>{
                        that.toast(res.msg)
                    })
                } else if(res.code!=403) {
                    that.openWin(`tab3-realname`)
                }
            })
        }

    }
</script>

<style lang="scss">
    @import "@/assets/css/app.scss";
    .dkbgBox{
        background: url(../../assets/img/dkbg.png) 0 0 no-repeat;
        background-size: 100% 100%;
    }
    .fenxiang{
        height: initial;
        background-color:transparent;
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

    .fenxiang.van-popup--center{
        transform: translate(-50%,-50%);
    }
    .van-search__content{

        border-radius: 30px;
    }
    .van-nav-bar__text{
        color: white;
    }
    .van-nav-bar{
        background: transparent;
    }
    [class*=van-hairline]::after{
        display: none;
    }
    .btn{
        width: 170px;
        line-height: 35px;
        text-align: center;
        color: white;
        margin:1rem auto;
        border-radius: 3rem;
        display: block;
    }
    .invite{
        position: absolute;
        top: 180px;
        right: 0;
        color: white;
        padding: 5px 10px 5px 20px;
        height: 40px;
        // background-image: linear-gradient(to right,#FF7D6C,#FF3335);
        background: #fff;
        color: #326bff;
        div {

            height: 40px;
            width: 47px;
            border-radius: 111000px;
            position: absolute;
            // background-color: #F07A44;
            background: #ffffff;
            top: 0;
            left: -10px;
            z-index: 0;
            margin-left: -20px;
            padding: 2.45px 6px;
        }
    }
    .mid_1{
        padding: 0 30px;
        display: flex;
        justify-content: space-between;
        margin:30px auto 20px; 
        
    }
    .mid_{
        width: 200px;
        display: flex;
        justify-content: space-between;
        line-height: 30px;
        // margin:200px auto 0;
        
        img {
            object-fit: contain;
            width: 32px;
            height: 50px;
        }
        span{
            padding-top: 10px;
            color: #FF7F7F;
        }
    }
    .zk{
        text-align: center;
        width: 100%;
        justify-content: space-around;
        line-height:20px;
        position: relative;
        &>div{
            min-width:80px;
        }
        img {
            display: block;
            border-radius: 1000px;
            overflow: hidden;
            width:60px;
            margin: auto;
            height: 60px;
            position: absolute;
            left:10px;
            z-index: -1;
        }

        span+span{
            font-weight: bold;
        }
        .zkk{
            position: absolute;
            left: 0;
            top:-15px;
            padding: 13px;
            color:white;
            line-height: 13px;
            font-size: 16px;
            background: url('../../assets/img/zk.png');
            background-size: 100% 100%;
        }
        div:nth-child(3) img{
                border: 1px solid #FFB736;
        }
    }
    .zk div:nth-child(2),.zk div:nth-child(4){
        margin-top:50px;
    }
    .van-button{
        height: 80px;
        border:1px solid #999;
    }
    .a33 .van-button__text{
        color: #333;
    }

    .a33 .active,.a3 .active{
        color:white;
        border-color: #FF9EA1;
        border: 0;
        background-image: linear-gradient(to right,#FF8676,#FF4443);
    }
    .a33 .active .van-button__text{
        color: white;
    }
    .jine{
        .van-button{
            height: 64px;
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
    .flex_between button {
        margin-top: 7px;
        width: 48%;
        border-radius: 5px;
    }
</style>
