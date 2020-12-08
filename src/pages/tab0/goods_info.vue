<template>
    <div >
        <div class="overflow_y flex_grow_1 W_100">
            <img @click="close" :src="requireimg(`back`)" alt="" style="padding: 10px;position: fixed;top: 40px;background-color: rgba(0,0,0,.5);width:40px;width: 40px;border-radius: 9999px;left: 20px;z-index: 99999">

            <!-- 轮播 -->
            <div class="relative VH_90 W_100 overflow_hidden" >
                <van-swipe   @change="onChange" :autoplay="3000" indicator-color="white" style="height: 100%">
                    <van-swipe-item v-for="(item,idx) of goods.images" :key="idx">
                        <img :src="item" alt="" style="width: 100%;height: 100%">
                    </van-swipe-item>
                    <div class="custom-indicator" slot="indicator">
                        {{ current }}/{{goods.images.length}}
                    </div>
                </van-swipe>
            </div>


            <!--商品信息-->
            <div class="P_4 W_100">
                <div style="overflow: hidden;display: flex;justify-content: start" >
                    <img v-if="goods.goods_type=='tmall'" src="@/assets/img/tm_icon.png" alt="" style="margin: 3px;width: 15px;height: 15px;">
                    <img v-if="goods.goods_type=='taobao'" src="@/assets/img/tb.png" alt="" style="margin: 3px;width: 15px;height: 15px;">
                    <img v-if="goods.goods_type=='pdd'" src="@/assets/img/copy_pdd.png" alt="" style="margin: 3px;width: 15px;height: 15px;">
                    <img v-if="goods.goods_type=='jd'" src="@/assets/img/copy_jd.png" alt="" style="margin: 3px;width: 15px;height: 15px;">
                    <div class="PL_1 fontS_14" style="float: left">{{goods.title?goods.title:goods.title}}</div>
                </div>

                <div class="flex_row_between PT_4">
                    <div class="color_red font_weight_bold fontS_14">券后价&ensp;&yen;{{goods.spe_price}}</div>
                    <div   v-if="goods.goods_type=='tmall'||goods.goods_type=='taobao'" class="fontS_11 color_999">月售：{{goods.sales}}</div>
                </div>

                <div class="flex_between PT_4">
                    <div class="fontS_11 color_999" v-if="goods.goods_type=='tmall'">天猫价：&yen;{{goods.price}}</div>
                    <div class="fontS_11 color_999" v-if="goods.goods_type=='taobao'">淘宝价：&yen;{{goods.price}}</div>
                    <div class="fontS_11 color_999" v-if="goods.goods_type=='pdd'">拼多多价：&yen;{{goods.price}}</div>
                    <div class="fontS_11 color_999" v-if="goods.goods_type=='jd'">京东价：&yen;{{goods.price}}</div>
                    <div class="B_1_eeeeee color_red fontS_10 PTB_1 PLR_3 B_radius_5">预估收入&ensp;&yen;{{goods.tkmoney?goods.tkmoney:goods.tkmoney}}</div>
                </div>

                <div class="flex_row_left PLR_6 color_fff W_100 MT_4 yhq" style="height:24vw" @click="getMakes(2)">
                    <div class="flex_self_end PB_7 PL_7" >
                        <div class="fontS_18" style="margin-left:30px">{{goods.amount}}元</div>
                        <div class="fontS_12 PT_2 fontS_10" v-if="goods.start_time" style="margin-bottom: -8px;margin-left:-16px">有效期：{{goods.start_time}}——{{goods.end_time}}</div>
                    </div>
                    <!--<div class="fontS_14" @click="getMakes(2)">立即领券</div>-->
                </div>

            </div>
            <!--店铺信息-->
            <!--<div class="W_100" v-if="(goods.goods_type=='tmall' || goods.goods_type=='taobao')&&goods.dpInfo.dpName">
                <div class="P_5 flex_row_between">
                    <div class="flex_row_left">
                        <img :src="goods.dpInfo.dpImg" alt="" class="VW_10 VH_10">
                        <div class="PL_4">
                            <div class="PB_1">{{goods.dpInfo.dpName}}</div>
                            <img src="../../assets/img/tamll.png" alt="" class="VW_20">
                        </div>
                    </div>
                    <div class="flex_rowC color_999" @click="toPage('tkstore_info','./tkstore_info.html',{'storedata':goods.dpInfo})">
                        <span>查看店铺所有优惠</span>
                        <i class="iconfont iconfanhui1 fontS_13"></i>
                    </div>
                </div>

                <div class="flex_row_between P_5 fontS_11 BT_1_eeeeee">
                    <div v-for="dpmsg in goods.dpInfo.eval">{{dpmsg.title}}：{{dpmsg.score}}&ensp;<span class="bg_red color_fff PLR_1">{{dpmsg.levelText}}</span></div>
                </div>
            </div>-->
            <!--商品详情-->
            <div style="overflow-x: hidden;box-sizing: border-box">
                <div class="PTB_4 PLR_6 flex_row_between BT_1_eeeeee BB_1_eeeeee">
                    <div class="fontS_14" >查看宝贝详情</div>
                    <i v-if="goods.type==1" class="iconfont" :class="isshow?'iconshang1':'iconxia'" @click="isshow=!isshow"></i>
                </div>

                <div class="W_100 animated fadeIn" v-show="isshow">
                    <img v-for="(pic,index) in goodsInfopic" :key="index" :src="pic" alt="" style="margin-bottom: -4px">
                </div>

                <!--为您推荐-->
                <div class="W_100 MT_4" v-if="goods.goods_type=='tmall'||goods.goods_type=='taobao'" >
                    <div class="W_100 flex_rowC">
                        <img src="../../assets/img/cnxh.png" class="W_50 MTB_6" alt="">
                    </div>
                    <!--商品列表-->
                    <div class="flex_row_left flex_wrap PLR_3 bg_fff PB_4">
                        <div @click="clicklove(item.itemid,item.type,item.tkmoney,item.spe_price)" class="W_50 PT_4" v-for="(item,index) in goodsInfolove" :key="index" :class="index%2==0?'PR_2':'PL_2'">
                            <img v-lazy="item.img" alt="" class="W_100 VH_45 B_radiusT_5">
                            <div class="bg_fff P_3 B_radiusB_5" style="margin-top: -3px">
                                <div class="text_overflow_1 PB_2">{{item.title}}</div>
                                <div class="flex_row_between W_100">
                                    <div class="fontS_10">
                                        <span class="color_red fontS_14">￥{{item.spe_price}}</span>
                                        <span class="text_decoration_line-through color_999">{{item.price}}</span>
                                        <span class="color_red">赚{{item.tkmoney}}</span>
                                    </div>
                                    <img v-if="item.goods_type=='tmall'" src="@/assets/img/tm_icon.png" alt="" style="width: 15px;height: 15px;">
                                    <img v-if="item.goods_type=='taobao'" src="@/assets/img/tb.png" alt="" style="width: 15px;height: 15px;">
                                    <img v-if="item.goods_type=='pdd'" src="@/assets/img/copy_pdd.png" alt="" style="width: 15px;height: 15px;">
                                    <img v-if="item.goods_type=='jd'" src="@/assets/img/copy_jd.png" alt="" style="width: 15px;height: 15px;">
                                </div>

                                <div class="flex_row_between PT_2 W_100">
                                    <div style="width: 45px;height: 18px;" class="color_fff flex_rowC fontS_10 quanjian2">{{item.amount}}元券</div>
                                    <div  class="color_999 fontS_11">已售：{{item.sales}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="yincangShow" class="W_100 flex_row_around flex_shrink_0 bg_fff PLR_5 PTB_2 BT_1_eeeeee" style="position: fixed;width: 100%;bottom: 0">
             <!-- <div class="W_45 textC PTB_4 color_fff B_radius_5 bg_666" @click="openWin('common-share',pageParam)">
                <p>分享赚</p>
            </div> -->
            <div class="W_45 textC PTB_4 color_fff B_radius_5 bg_666" @click="getMakes(1)">
                <p>分享赚￥{{goods.tkmoney>0?goods.tkmoney:''}}</p>
            </div>
            <div @click="getMakes(2)" class="W_45 textC PTB_4 color_fff B_radius_5 bg_A345FF">
                <p>自买赚￥{{goods.tkmoney>0?goods.tkmoney:''}}</p>
            </div>
        </div>

    </div>
</template>
<script>
    import "@/assets/js/iconfont/iconfont.css";
    import {Component,Vue} from 'vue-property-decorator';
    import {mixins} from 'vue-class-component'
    import common from "@/assets/js/common"
    import {Swipe, SwipeItem,Collapse, CollapseItem,Toast,Lazyload } from 'vant';
    import {get_goods_detail,guess_your_love_goods_list,get_coupon_url,Qudao_index} from '@/assets/js/const';


    Vue.use(Swipe).use(SwipeItem).use(Collapse).use(CollapseItem).use(Lazyload );
    @Component
    export default class index extends mixins(common) {
        activeNames= ['1']
        isshow=false;
        alibaichuan={};
        jdapp={};
        tkmoney={};
        type={};
        goodsInfopic={};
        qhprice=1;
        itemId=1;
        code=""
        radio="1";
        goodsInfo={};
        goods={};
        pageParam={};
        current=1
        goodsInfolove=[
            {
                title:1
            } ,{
                title:1
            }
        ];

        page=1;
        yincangShow = true;

        mounted() {
            if(this.getStorage('yincang') == 'false'){
                 this.yincangShow = false 
            }else{
                this.yincangShow = true 
            }
            this.pageParam=api.pageParam;
            api.addEventListener({
                name: 'scrolltobottom',
                extra: {
                    threshold: 3 //设置距离底部多少距离时触发，默认值为0，数字类型
                }
            },()=>{
                this.get_more_love_goods_list();
            });
            
            this.getgoodsData()
            this.guess_your_love_goods_list()
            this.getShopDetail()
            this.initSDK()
            this.initJDSDK()
        }

        getgoodsData() {
            let param={
                itemId:this.pageParam.itemId,
                type:this.pageParam.type,
            }
            this.http(get_goods_detail,param).then(v=>{
                this.goods=v.data.list;
            })
        }
        /*猜你喜欢*/
        guess_your_love_goods_list() {
            let param={
                itemId:this.pageParam.itemId,
                page:this.page,
            }
            this.http(guess_your_love_goods_list,param).then(v=>{

                this.goodsInfolove=v.data.list;

            })
        } /*猜你喜欢*/
        get_more_love_goods_list() {
            let param={
                itemId:this.pageParam.itemId,
                page:++this.page,
            }
            this.http(guess_your_love_goods_list,param).then(v=>{
                // if(v.data.list.length==0){
                //     Toast("没有更多了！")
                // }
                this.goodsInfolove=[... this.goodsInfolove,...v.data.list];
            })
        }
        // 初始化模块信息 淘宝
        initSDK() {
            this.alibaichuan = api.require('alibaichuan');
            var param = {
                isvcode: "feelinglife"
            };
            this.alibaichuan.initTaeSDK(param, function (ret, err) {
                if (ret) {
                    console.log(JSON.stringify(ret));
                } else {
                    console.log(JSON.stringify(err));
                }
            });
        }
        // 初始化京东
        initJDSDK() {
            this.jdapp = api.require('jdapp');
            this.jdapp.init({}, function (rs, err) {
                // alert(JSON.stringify(rs));
                // alert(JSON.stringify(err))
            })
        }

        //轮播索引
        onChange(index) {
            this.current = ++index;
        }

        //获取详情
        getdetail(){
            var that = this;
            that.$toast.loading({
                mask: true,
                loadingType:'spinner',
                message: '加载中...'
            });
            // $api.dom('.overflow_y').scrollTop = 0; //回到顶部
           /* that.http(taokeGet_goods_detail, 'post', {'itemId':that.itemId,'type':that.type}, function (res) {
                that.$toast.clear();
                // console.log(JSON.stringify(res));
                if (res.code == 0) {
                    that.goodsInfo = res.data.list;
                }else {
                    that.$toast(res.msg);
                    setTimeout(function () {
                        that.goBack();
                    },1500)
                }
            })*/
        }

         httpGetDetail(url, method, param, funSuc, funErr) {
            var headers = {
                'Content-Type': 'application/json;charset=utf-8'
            };
            api.ajax({
                url: url,
                method: method,
                headers: headers,
                data: {
                    body: param
                }
            }, function(ret, err) {
                if (ret) {
                    if (ret.code == 0) {
                        funSuc(ret);
                    } else {
                        funSuc(ret);
                    }
                } else {
                    console.log(JSON.stringify(err))
                }
            });
        }
        //淘宝天猫获取图片详情
        getShopDetail() {
            var that = this;
            that.goodsInfopic = [];
            this.httpGetDetail('http://h5api.m.taobao.com/h5/mtop.taobao.detail.getdesc/6.0/?data={"id":"' + this.pageParam.itemId+ '"}', 'get', '', function(res) {
                if (res) {
                    that.getValidImg(res.data.pcDescContent);
                } else {
                    console.log(error)
                }
            })
        }

        getValidImg(html1) {
            var that = this;
            var html = html1;
            html = html.replace(/src=\"/g, "src=\"http:");
            var srcRegex = /http:\/\/((?!>).)*?(png|jpg)/gi;
            var imgs= html.match(srcRegex);
            // console.log(JSON.stringify(imgs));
            for (var i = 0;i<imgs.length;i++){
                that.goodsInfopic.push(imgs[i]);
            }
        }

        //猜你喜欢
        clicklove(itemId,type,tkmoney,qhprice) {
            var that = this;
            this.pageParam={
                itemId : itemId,
                type : type,
                tkmoney : tkmoney,
                qhprice : qhprice,
            }
            this.getgoodsData()
            this.guess_your_love_goods_list()
            this.getShopDetail()
            window.scroll(0,0);
        }

        //分享赚or自买赚
        getMakes(idx){
            // idx  1分享赚  2自买赚
            var that = this;
            if(this.getStorage("token")){
                if(this.pageParam.type==1){
                    that.http(Qudao_index).then(res=>{
                        if (res.code == 0) {
                            if(res.data.child_code==22){
                                this.openWin('common-authorization',{'url': res.data.url})
                            }else if(res.data.child_code==11){
                                if(idx==1){
                                    this.openWin('common-share',this.pageParam)
                                }else {
                                    that.getlink();
                                }
                            }
                        }else {
                            that.$toast(res.msg)
                        }
                    })
                }else {
                    if(idx==1){
                        that.toPage('common-share',this.pageParam)
                    }else {
                        that.getlink();
                    }
                }
            }else {
                this.openWin('common-login');
            }
        }

        //获取优惠券链接
        getlink(){
            var that = this;
            that.$toast.loading({
                mask: true,
                loadingType:'spinner',
                message: '加载中...'
            });
            that.http(get_coupon_url, {'itemId':this.pageParam.itemId,'type':this.pageParam.type}).then(res=>{
                that.$toast.clear();
                console.log(JSON.stringify(res));
                if (res.code == 0) {
                    if(this.pageParam.type==1){
                        // console.log('淘宝');
                        var param = {
                            url: res.data.info.url,
                            clientType: "taobao",
                            backUrl: api.systemType === "ios"?"":"tbopen28232962",
                            nativeOpenFailedMode: "BROWER",
                            pid: "mm_508530194_778550497_109346500011"
                        };
                        that.alibaichuan.showPageByURL(param, function(ret, err) {
                            if (ret) {
                                console.log(JSON.stringify(ret));
                            } else {
                                console.log(JSON.stringify(err));
                            }
                        });

                    }else if(this.pageParam.type==2){
                        // console.log('京东');
                        that.jdapp.open_url({
                            url: res.data.info.url
                        });
                        // this.openWin('common-popadUrl',{webUrl:res.data.info.url})
                    }else if(this.pageParam.type==3){

                        if(api.systemType == 'ios'){
                            this.openWin('common-popadUrl',{webUrl:res.data.info.url})
                        } else {
                            var browser = api.require('webBrowser');
                            browser.open({
                                url: res.data.info.url
                            });
                        }


                    }else {
                        that.$toast('无法领取');
                    }
                }else {
                    that.$toast(res.msg)
                }
            })
        }
    }
</script>
<style lang="scss">
    @import "@/assets/css/app.scss";
    @import "@/assets/css/common.scss";
    .yhq{
        background: url('../../assets/img/yhq.png') no-repeat;
        background-size: 100% 100%
    }
    .cansend{
        background: #FF2A2E;
        color: white;
    }
    .dtsend{
        background: #CCCCCC;
        color: white;
    }
    .box{
        border: 1px solid #DBDBDB;
    }
    .van-search{
        box-sizing: border-box;
        border-radius: 30px;
        height: 30px;
        margin-top:calc(10% - 15px);
        overflow: hidden;
        background-color: initial;
    }
    .van-nav-bar__title, .van-nav-bar .van-icon{
        color: #999;
    }
    .van-icon{
        margin-top:6px;
        color: white!important;
    }
    .van-icon-search{
        color: #999!important;
    }
    .flex_row_left img{
        margin-right: 17px;
    }
    input{
        line-height: 35px;
    }
    .van-nav-bar__text{
        color: white;
    }
    .van-search__content{
        background-color: white;
    }
    .custom-indicator{
        position: absolute;
        right: 4vw;
        bottom:5vw;
        border-radius:15vw;
        z-index: 100;
        color: white;
        padding: 1vw 5vw;
        background-color: rgba(0,0,0,.5);
    }
    .quanjian2{
        width: 50px;
        height: 24px;
        background: url('../../assets/img/juan1.png') no-repeat;
        background-size: 100% 100%;
    }
    .bg_A345FF{
        background: #A345FF ;
    }
</style>
