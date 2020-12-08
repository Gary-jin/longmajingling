<template>
    <div style="position: relative;height: 100%;" :class="{jianbian:nav_ac>0}">
        <div style="position: absolute;top: 0;left: 0;width: 100%" class="lbbg">
            <!--轮播-->
            <van-swipe ref="lunbo" :show-indicators="false"  v-if="!nav_ac" >
                <van-swipe-item v-for="(item,i) in banner" :key="i" :style="{backgroundColor:item.color}"></van-swipe-item>
            </van-swipe>

        </div>
        <div  class="header flex" style="display: flex;justify-content: start;flex-flow: column;position: absolute;top: 0;left: 0;width: 100%">
            <div  class="header no_cg PLR_4 W_100 flex_shrink_0 " style="box-sizing: border-box" >
                <div class="flex_row_between PT_2" >
                    <van-search
                            @click="openWin('tab0-search')"
                            placeholder="请输入搜索关键词"
                            show-action
                            shape="round"
                            readonly="readonly"
                    >
                    </van-search>
                    <!-- <i class="iconfont iconxinxi1 color_fff fontS_20" @click="openWin('tab0-school',{type:'xx'})"></i> -->
                    <img :src="requireimg('pinglun')" style="width:25px;height:25px;" alt="" @click="openWin('tab0-school',{type:'xx'})">
                </div>

                <div class="flex W_100 " style="height: 50px">
                    <div ref="navEl" class="cate_scroll fontS_14 flex_rowL PTB_5 color_fff">
                        <!-- <div style='min-width:28px' class="MLR_2" :key="idx" v-for="(item,idx) in navArr" :class="nav_ac==idx?' BB_2_f2f2f2':''"
                             @click="sort_to(idx)">{{item.cate_name}}
                        </div> -->
                        <!-- ios兼容问题 -->
                        <van-tabs title-active-color="#FFC41C" @click="sort_to" title-inactive-color="#ffffff" v-model="activeName" background="none">
                            <van-tab v-for="(item,idx) in navArr" :name="idx"  title-style	="width:22px;padding-top:10px;"  :title="item.cate_name" :key="idx" ></van-tab>
                        </van-tabs>
                    </div>
                </div>
            </div>
            <!--筛选条件-->
            <div class="W_100 flex_row_around PTB_5 fontS_12  bg_fff"  v-if="nav_ac">
                <div class="flex_center" :class="sort==0?'color_FFC41C':'color_666'" @click="settj(0)">
                    <span>综合</span>
                </div>
                <div class="flex_center" :class="(sort==1||sort==2)?'color_FFC41C':'color_666'"
                     @click="settj(1)">
                    <span>价格</span>
                    <div class="flex_col_c" style="padding-top: 1px">
                        <i class="iconfont iconshang fontS_8" :class="sort==2?'color_FFC41C':'color_666'"
                        ></i>
                        <i class="iconfont iconxia1 fontS_8" :class="sort==1?'color_FFC41C':'color_666'"></i>
                    </div>
                </div>
                <div class="flex_center" :class="(sort==3||sort==4)?'color_FFC41C':'color_666'"
                     @click="settj(2)">
                    <span>佣金</span>
                    <div class="flex_col_c" style="padding-top: 1px">
                        <i class="iconfont iconshang fontS_8" :class="sort==4?'color_FFC41C':'color_666'"
                        ></i>
                        <i class="iconfont iconxia1 fontS_8" :class="sort==3?'color_FFC41C':'color_666'"></i>
                    </div>
                </div>
                <div class="flex_center" :class="(sort==5||sort==6)?'color_FFC41C':'color_666'"
                     @click="settj(3)">
                    <span>销量</span>
                    <div class="flex_col_c" style="padding-top: 1px">
                        <i class="iconfont iconshang fontS_8" :class="sort==6?'color_FFC41C':'color_666'"
                        ></i>
                        <i class="iconfont iconxia1 fontS_8" :class="sort==5?'color_FFC41C':'color_666'"></i>
                    </div>
                </div>

            </div>
            <section :class="{active:nav_ac>0}">
                <van-pull-refresh v-model="downloading" @refresh="onRefresh">
                    <van-list
                            v-model="uploading"
                            :finished="finished"
                            finished-text="没有更多了"
                            @load="getlistfeilei"
                    >
                        <!--轮播-->
                        <van-swipe @change="onChange"  :autoplay="3000" v-if="!nav_ac" class="no_cg B_radius_5">
                            <van-swipe-item v-for="(v,i) in banner" :key="i">
                                <img :src="v.src" alt="" style="width: 100%;height: 100%">
                            </van-swipe-item>
                        </van-swipe>

                        <div style="background-color: white" v-if="!nav_ac">
                            <!--首页入口-->
                            <div class="W_100 flex_row_left flex_wrap bg_fff MB_6">
                                <div class="textC W_20 MT_6 fontS_11 z_index_900" :key="i" v-for="(list,i) in tktype" @click="goto(list)">
                                    <img :src="requireimg(list.img)" alt="" class="W_65">
                                    <p>{{list.title}}</p>
                                </div>
                            </div>
                            <van-notice-bar
                                    color="#999999"
                                    background="#ffffff"
                                    :scrollable="true"
                                    :speed="55"
                                    :text="notice"
                                    class="BB_6_f2f2f2 BT_1_f2f2f2"
                            >
                                <template v-slot:left-icon>
                                    <img src="@/assets/img/gonggao.png" alt="" class="VW_6 MR_2">
                                </template>
                            </van-notice-bar>

<!-- <h1 @click="popadUrl('http://www.baidu.com')">ssssssssssssssssssssssssss</h1> -->

                            <!--轮播图首页1-->
                            <div class="W_100 animated fadeIn bg_fff PLR_3" v-show="lunboidx==0">
                                <!-- 邀请好友  商学院 -->
                                <div class="flex_row_between W_100 PTB_5">
                                    
                                    <div  v-if="yincangShow" class="flex_grow_1 PLR_5  W_50 bg_icon1 color_fff" style="height:100px;position: relative"
                                         @click="toPage('tab3-invite')">
                                        <div class="flex_rowL MT_6 PL_1">
                                            <!-- <img src="../assets/img/u_cart.png" style="width: 22px;height:22px;" alt=""> -->
                                            <h4 class="fontS_16" style="font-weight: bold">邀请好友</h4>
                                        </div>
                                        <div class="flex_row_between">
                                            <div>
                                                <div class="fontS_11 PB_4 PL_1">独乐乐不如众乐乐</div>
                                                <span class="B_radius_10 bg_fff fontS_11 PTB_1 PL_3 PR_2" style="color:#fc7c7b;">
                                                点击进入
                                                <!-- <i class="iconfont iconfanhui1 fontS_10"></i> -->
                                            </span>
                                            </div>
                                        </div>
                                        <img style="position:absolute;right: 11px;top: 15px;width: 17vw;height: auto" :src="img.yqhy" class="flex_shrink_0 object_fit_cover"
                                             alt="">
                                    </div>

                                    <div class="flex_grow_1 PLR_5 W_50 bg_icon2 color_fff" style="height:100px;position: relative"
                                         @click="toPage('tab0-school',{title:'商学院',type:'sxy'})">
                                        <div class="flex_rowL MT_6 PL_1">
                                            <!-- <img src="../assets/img/u_shop.png" style="width: 22px;height:22px;" alt=""> -->
                                            <h4 class="fontS_16" style="font-weight: bold">商学院</h4>
                                        </div>
                                        <div class="flex_row_between">
                                            <div>
                                                <div class="fontS_11 PB_4 PL_1">新手必看</div>
                                                <span class="B_radius_10 bg_fff fontS_11 PTB_1 PL_3 PR_2 " style="color:#4588FE;">
                                            点击进入
                                            <!-- <i class="iconfont iconfanhui1 fontS_10"></i> -->
                                            </span>
                                            </div>
                                            <img style="position:absolute;right: 11px;top: 15px;width: 17vw;height: auto" :src="img.sxy" class="flex_shrink_0 VW_15 VH_15" alt="">
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div v-if="yincangShow" @click="tomiao" class="PLR_3">
                                <div class="B_radius_10" style="overflow: hidden;">
                                    <img :src="img.ad" alt="" style="width:100%;height:auto;">
                                </div>
                                    
                            </div>

                            <!--爆款倒计时-->
                            <div style="height:20px;"></div>
                            <div class="W_100 VH_15 flex_row_between PLR_5 hotcake"
                                 style="background-size: 100% 100%;box-sizing: border-box;width: 96%;margin: auto">
                                <!-- <img :src="img.qg" alt="" class="VW_20"> -->
                                <span class="color_fff fontS_20 font_weight_bold">限时爆款</span>
                                <div class="color_fff PL_12">距离结束还剩</div>
                                <van-count-down :time="timevalue" @finish="gettimelist" class="flex_rowC fontS_14 color_fff">
                                    <template v-slot="timeData">
                                        <span class="itemss flex_rowC B_radius_5">{{timeData.hours}}</span>
                                        <span class="PLR_2">:</span>
                                        <span class="itemss flex_rowC B_radius_5">{{timeData.minutes}}</span>
                                        <span class="PLR_2">:</span>
                                        <span class="itemss flex_rowC B_radius_5">{{timeData.seconds}}</span>
                                    </template>
                                </van-count-down>
                            </div>


                            <!--切换时间-->
                            <van-tabs style="margin:10px  0" @change="getbaokuangood"  v-model="time_active">
                                <van-tab v-for="(item,index) in timeArr" color="#323233"   :key="index">
                                    <template v-slot:title>
                                        <div class="PLR_5 relative textC fontColfo" :key="idx" v-for="(item,idx) in timeArr" v-show="index==idx"
                                             :class="index==idx?'brbtomtime':'color_999'" >
                                            <p class="fontS_14 font_weight_800 xxx" :class="indexNOW==idx?'fontS_18 fontCol':''">
                                                {{item.time_mess}}</p>
                                            <p class="fontS_14 xxx" :class="indexNOW==idx?'fontCol':''">{{item.time_type}}</p>
                                        </div>
                                    </template>
                                </van-tab>
                            </van-tabs>


                            <!--热销商品-->
                            <div v-for="(item,i) in timegoosArry" :key="i" style="width: 94%;margin: auto"
                                 @click="toPage('tab0-goods_info',{'itemId':item.itemid,'type':item.type,'tkmoney':item.tkmoney,'qhprice':item.spe_price})">
                                <div class="PLR_2 flex_row_between PTB_4 flex_shrink_0 MB_4 B_radius_10 MM_box_shadow">
                                    <img v-lazy="item.img"  alt="" class="VW_30 VH_30 B_radius_5 flex_shrink_0">
                                    <div class="VH_30 flex_col_around W_100 PL_5">
                                        <div class="text_overflow_2 W_100">{{item.title}}</div>
                                        <div class="flex_row_left W_100 fontS_10">
                                            <div class="B_1_eeeeee color_red PLR_2 PTB_1 B_radius_5">预估收入：￥{{item.tkmoney}}</div>
                                        </div>
                                        <div class="flex_row_between W_100">
                                            <div>
                                                <span class="font_weight_bold fontS_15">￥{{item.spe_price}}</span>
                                                <span class="text_decoration_line-through color_999 fontS_11">{{item.price}}</span>
                                            </div>
                                            <div class="color_fff flex_rowC fontS_12 quanjian PLR_3">赠送{{item.amount}}优惠券
                                            </div>
                                        </div>
                                        <div class="color_999 W_100 fontS_10">{{item.sales}}人已买
                                            <span class="PL_1" v-if="item.goods_type=='tmall'">天猫</span>
                                            <span class="PL_1" v-if="item.goods_type=='taobao'">淘宝</span>
                                            <span class="PL_1" v-if="item.goods_type=='pdd'">拼多多</span>
                                            <span class="PL_1" v-if="item.goods_type=='jd'">京东</span>
                                        </div>
                                    </div>
                                </div>
                                <div style="height:10px;"></div>
                            </div>
                            
                            <img src="../assets/img/wntj.png" height="150" width="220" style="margin:10px auto;display: block"/>

                            <!--猜你喜欢-->

                            <div style="width: 94%;margin: auto" v-for="(item,i) in likeList" :key="i"
                                 @click="toPage('tab0-goods_info',{'itemId':item.itemid,'type':item.type,'tkmoney':item.tkmoney,'qhprice':item.spe_price})">
                                <div class="PLR_2 flex_row_between PTB_4 flex_shrink_0 MB_4 B_radius_10 MM_box_shadow">
                                    <img v-lazy="item.img" alt="" class="VW_30 VH_30 B_radius_5 flex_shrink_0">
                                    <div class="VH_30 flex_col_around W_100 PL_5">
                                        <div class="text_overflow_2 W_100">{{item.title}}</div>
                                        <div class="flex_row_left W_100 fontS_10">
                                            <div class="B_1_eeeeee color_red PLR_2 PTB_1 B_radius_5">预估收入：￥{{item.tkmoney}}</div>
                                        </div>
                                        <div class="flex_row_between W_100">
                                            <div>
                                                <span class="font_weight_bold fontS_15">￥{{item.spe_price}}</span>
                                                <span class="text_decoration_line-through color_999 fontS_11">{{item.price}}</span>
                                            </div>
                                            <div
                                                class="color_fff flex_rowC fontS_12 quanjian PLR_3">赠送{{item.amount}}优惠券
                                            </div>
                                        </div>
                                        <div class="color_999 W_100 fontS_10">{{item.sales}}人已买
                                            <span class="PL_1" v-if="item.goods_type=='tmall'">天猫</span>
                                            <span class="PL_1" v-if="item.goods_type=='taobao'">淘宝</span>
                                            <span class="PL_1" v-if="item.goods_type=='pdd'">拼多多</span>
                                            <span class="PL_1" v-if="item.goods_type=='jd'">京东</span>
                                        </div>
                                    </div>
                                </div>
                                <div style="height:10px;"></div>
                            </div>

                        </div>


                        <!--其他分类-->
                        <div class="W_100 bg_fff animated fadeIn">
                            <!--商品列表-->
                                <div class="flex_row_left flex_wrap PLR_3 bg_fff PB_4">
                                    <div v-show="nav_ac>0" :key="index" @click="toPage('tab0-goods_info',{'itemId':item.itemid,'type':item.type,'tkmoney':item.tkmoney,'qhprice':item.spe_price})"
                                         class="PT_4" v-for="(item,index) in sortList" :class="index%2==0?'PR_2':'PL_2'"
                                         style="width: 48%">
                                        <img v-lazy="item.img" alt="" class="W_100 VH_45 B_radiusT_5">
                                        <div class="bg_fff P_3 B_radiusB_5" style="margin-top: -3px">
                                            <div class="text_overflow_1 PB_2">{{item.title}}</div>
                                            <div class="flex_row_between W_100">
                                                <div class="fontS_10">
                                                    <span class="color_red fontS_14">￥{{item.spe_price}}</span>
                                                    <span class="text_decoration_line-through color_999 MR_1">{{item.price}}</span>
                                                    <span class="color_red">赚{{item.tkmoney}}</span>
                                                </div>
                                                <img v-if="item.goods_type=='tmall'" src="../assets/img/tm_icon.png" alt=""
                                                     style="width: 16px;height: 16px;">
                                                <img v-if="item.goods_type=='taobao'" src="../assets/img/tb.png" alt=""
                                                     style="width: 16px;height: 16px;">
                                                <img v-if="item.goods_type=='pdd'" src="../assets/img/copy_pdd.png" alt=""
                                                     style="width: 16px;height: 16px;">
                                                <img v-if="item.goods_type=='jd'" src="../assets/img/copy_jd.png" alt=""
                                                     style="width: 16px;height: 15px;">
                                            </div>

                                            <div class="flex_row_between PT_2 W_100">
                                                <div class="color_fff flex_rowC fontS_12 quanjian2">{{item.amount}}元券
                                                </div>
                                                <div  v-if="item.goods_type=='tmall'||item.goods_type=='taobao'" class="color_999 fontS_11">已售：{{item.sales}}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div v-show="nav_ac==0" style="width: 94%;margin: auto" class="flex_row_between PTB_4 flex_shrink_0"
                                         v-for="(item,i) in likeList" :key="i"
                                         @click="toPage('tab0-goods_info',{'itemId':item.itemid,'type':item.type,'tkmoney':item.tkmoney,'qhprice':item.spe_price})">
                                        <img v-lazy="item.img" alt="" class="VW_30 VH_30 B_radius_5 flex_shrink_0">
                                        <div class="VH_30 flex_col_around W_100 PL_5">
                                            <div class="text_overflow_2 W_100">{{item.title}}</div>
                                            <div class="flex_row_left W_100 fontS_10">
                                                <div class="B_1_eeeeee color_red PLR_2 PTB_1 B_radius_5">预估收入：￥{{item.tkmoney}}</div>
                                            </div>
                                            <div class="flex_row_between W_100">
                                                <div>
                                                    <span class="font_weight_bold fontS_15">￥{{item.spe_price}}</span>
                                                    <span class="text_decoration_line-through color_999 fontS_11">{{item.price}}</span>
                                                </div>
                                                <div  class="color_fff flex_rowC fontS_12 quanjian PLR_3">赠送{{item.amount}}优惠券
                                                </div>
                                            </div>
                                            <div class="color_999 W_100 fontS_10">{{item.sales}}人已买
                                                <span class="PL_1" v-if="item.goods_type=='tmall'">天猫</span>
                                                <span class="PL_1" v-if="item.goods_type=='taobao'">淘宝</span>
                                                <span class="PL_1" v-if="item.goods_type=='pdd'">拼多多</span>
                                                <span class="PL_1" v-if="item.goods_type=='jd'">京东</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </van-list>
                </van-pull-refresh>
            </section>
        </div>
        <!-- 系统公告 -->
        <van-popup  v-model="show" style="width: 80%;height:56%;overflow: inherit;border-radius: 10px">
            <img @click="show=false" src="@/assets/img/close.png" alt="" style="width: 24px;height: 24px;position: absolute;right: -1rem;top: -2.5rem">
            <div class="W_100 W_100 H_100" style="padding: 20px;overflow-y: scroll;">
                <div v-html="first_article.title" class="fontS_16" style="text-align: center"></div>
                <div v-html="first_article.info" style="margin-top: 10px"></div>
            </div>
        </van-popup>
        <!-- 弹窗广告     -->
        
        <van-popup  v-model="popadShow" style="width: 80%;height:60%;overflow: inherit;border-radius: 10px; background-color:transparent;">
            <img @click="popadShow=false" src="@/assets/img/close.png" alt="" style="width: 24px;height: 24px;position: absolute;right: -1rem;top: -2.5rem">
            <div class="W_100 H_100 flex_rowC">
                <img style="max-width:100%;" @click="popadUrl(popadList.click_url)" :src="popadList.image" alt="">
            </div>
        </van-popup>
            <!-- 智能搜索 -->
        <van-popup @close="show=true" class="search"  v-model="sh_show" style="position: relative;width: 80%;height:56%;padding: 20px;overflow: inherit;border-radius: 10px">
            <img @click="sh_show=false" src="@/assets/img/close.png" alt="" style="width: 24px;height: 24px;position: absolute;right: -1rem;top: -2.5rem">
            <div style="position: absolute;top: 180px;left: 0;width: 100%;text-align: center">
                <h1 class="text_overflow_2" style="line-height: 20px;font-weight: bold;width: 80%;margin:0 auto">{{search}}</h1>
                <van-divider style="width: 60%;margin:5px auto"  content-position="center">您是否搜索以下平台</van-divider>
            </div>
            <div class="W_100" style="position: absolute;bottom: 30px;left: 0;width: 100%;text-align: center">
                <div class="flex_row_around">
                    <div @click="(sh_show=false,toPage('tab0-searchList',{'word':search,searchType:1}))" style="flex-direction: column;display: flex">
                        <img :src="requireimg(`taobao`)" alt="" style="width: 50px;height: auto">
                        <!-- <span style="line-height: 60px;">淘宝</span> -->
                    </div>
                    <div @click="(sh_show=false,toPage('tab0-searchList',{'word':search,searchType:2}))" style="flex-direction: column;display: flex">
                        <img :src="requireimg(`jingdong`)" alt="" style="width: 50px;height: auto">
                        <!-- <span style="line-height: 60px;">京东</span> -->
                    </div>
                    <div @click="(sh_show=false,toPage('tab0-searchList',{'word':search,searchType:3}))" style="flex-direction: column;display: flex">
                        <img :src="requireimg(`pdd`)" alt="" style="width: 50px;height: auto">
                        <!-- <span style="line-height: 60px;">拼多多</span> -->
                    </div>
                </div>
                <img class="W_80" @click="sh_show=false" src="@/assets/img/quxiao.png" alt="">
            </div>
        </van-popup>

    </div>

</template>
<script>
    import "@/assets/js/iconfont/iconfont.css";
    import {Component, Vue, Watch} from 'vue-property-decorator';
    import {mixins} from 'vue-class-component'
    import common from "@/assets/js/common"

    import {qrcodeInfo,get_is_display,getArticles,popad,get_lb_img,buyLimitTimes,buyLimitGoods,get_taoke_goods_cate,appFistPageJHS,get_goods_list,get_yj_article,get_first_article,get_link,get_images} from "@/assets/js/const";
    import {Lazyload,Divider,Popup ,Search, Swipe, SwipeItem, NoticeBar, CountDown, List, PullRefresh, Tab, Tabs, Toast,Dialog} from 'vant';


    Vue.use(Lazyload).use(Dialog).use(Divider).use(Search).use(Popup ).use(Swipe).use(SwipeItem).use(NoticeBar).use(CountDown).use(List).use(PullRefresh).use(Tabs).use(Tab);
    @Component
    export default class  extends mixins(common) {
        lunboidx = 0;
        sort = 0;/*分类筛选*/

        show = false;/*公告弹窗*/
        sh_show = false;/*搜索弹窗*/
        timevalue =0;/*倒计时*/

        first_article = "";/*公告内容*/
        search = "";/*搜索内容*/
        navArr = [
            {cate_name: "精选"},
        ]
        timeArr= []
        timegoosArry = []

        page=0;
        likeList=[];
        sortList=[];
        time_active=0;
        navArr_active = 0;
        tktype = [
            {'title': '淘宝', 'img': 'taobao', 'name': 'tab0-taoke',type:3},
            {'title': '京东', 'img': 'jingdong', 'name': 'tab0-taoke',type:5},
            {'title': '拼多多','img': 'pdd', 'name': 'tab0-taoke',type:6},
            {'title': '9.9包邮', 'img': 'baoyou', 'name': 'tab0-taoke',type:1},
            {'title': '抖劵视频','img': 'doujuan', 'name': 'tab0-video'},
            {'title': '天猫', 'img': 'tianmao', 'name': 'tab0-taoke',type:2},
            {'title': '天猫超市', 'img': 'chaoshi', 'name': 'tab0-taoke'},
            {'title': '好货专场', 'img': '2-8', 'name': 'tab0-taoke',type:8},
            {'title': '聚划算', 'img': '2-9', 'name': 'tab0-taoke',type:4},
            {'title': '早起打卡', 'img': '2-10','name': 'tab0-clock_in'}
        ]//首页淘客类型

        img={}
        nav_ac = 0;
        notice ="";/*公告*/
        banner=[];

        popadShow = true; //广告弹窗
        popadList = [];

        indexNOW = ''
        activeName = ''
        yincangShow =  true
        mounted() {
            /*粘贴板*/
            var clipBoard = api.require('clipBoard');
            if(!localStorage.getItem('first')){
                clipBoard.set({
                    value: ''
                }, (ret, err)=> { });
                localStorage.setItem('first',1)
            }

            clipBoard.get((ret, err)=> {
                if (ret) {
                    // alert(ret.value)
                   if(ret.value!=""){
                       this.search=ret.value;
                       this.sh_show=true;

                       clipBoard.set({
                           value: ''
                       }, (ret, err)=> { });

                   }else{
                       this.show=true;
                   }
                }

                this.get_first_article();
            });

            this.http(popad).then((res)=>{
                if(res.code == 0 && res.data.enabled == 1){
                    this.popadShow = true;
                    this.popadList = res.data
                } else{
                    this.popadShow = false;
                }
            })
            this.concealed()

            api.addEventListener({
                name: 'tab0now'
            }, (ret) =>{
                this.inviteLise()
            });
            api.addEventListener({
                name: 'tab0'
            }, (ret) =>{
                this.getbanner();
            });
            this.get_images();
            this.get_taoke_goods_cate();
            this.getbanner();
            this.get_yj_article();
            this.getbaokuan();


            api.addEventListener({
                 name: 'firstRegister'
            }, (ret) =>{
                if(!this.getStorage('firstRegister')){
                    this.getbanner();
                    this.get_taoke_goods_cate();
                }
            });
        }
        // 分享海报缓存
        inviteLise(){
            this.http(qrcodeInfo).then(v=>{
                // this.info=v.data;
                this.setStorage('inviteLiseNow',v.data)
            })
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
                    this.tktype = [
                        // {'title': '淘宝', 'img': 'taobao', 'name': 'tab0-taoke',type:3},
                        // {'title': '京东', 'img': 'jingdong', 'name': 'tab0-taoke',type:5},
                        // {'title': '拼多多','img': 'pdd', 'name': 'tab0-taoke',type:6},
                        {'title': '9.9包邮', 'img': 'baoyou', 'name': 'tab0-taoke',type:1},
                        // {'title': '抖劵视频','img': 'doujuan', 'name': 'tab0-video'},
                        // {'title': '天猫', 'img': 'tianmao', 'name': 'tab0-taoke',type:2},
                        // {'title': '天猫超市', 'img': 'chaoshi', 'name': 'tab0-taoke'},
                        {'title': '好货专场', 'img': '2-8', 'name': 'tab0-taoke',type:8},
                        {'title': '聚划算', 'img': '2-9', 'name': 'tab0-taoke',type:4},
                        // {'title': '早起打卡', 'img': '2-10','name': 'tab0-clock_in'}
                    ]
                }
            })
         }
        popadUrl(url){
            if(api.systemType == 'ios'){
                this.openWin('common-popadUrl',{webUrl:url})
            } else {
                var browser = api.require('webBrowser');
                browser.open({
                    url: url,
                    titleBar:{
                        bg: "#d72825",          
                        textColor: "#fff"
                    }
                });
            }

        }

        @Watch('sh_show')
        @Watch('show')
        function(v) {
            api.sendEvent({
                name: 'shadow',
                extra: v
            });
        }


        get_images() {
            this.http(get_images).then(v=>{
                this.img=v.data.info;
            })
        }
        getbanner() {
            this.http(get_lb_img).then(v=>{
                this.banner=v.data.banner;
            })
        }
        /*首页公告*/
        get_yj_article() {
            this.http(get_yj_article).then(v=>{
                this.notice=v.data.list.join('\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0') ;
            })
        }
        /*首页弹窗公告*/
        get_first_article() {
            this.http(get_first_article).then(v=>{
                this.first_article=v.data;
                // this.get_images();
                // this.get_taoke_goods_cate();
                // this.getbanner();
                // this.get_yj_article();
                // this.getbaokuan();


                // this.appFistPageJHS();
                // this.getbaokuangood();
            })
        }
        /*爆款*/
        getbaokuan() {
            this.http(buyLimitTimes).then(v=>{
                this.timeArr=v.data;
                v.data.map((v,i)=>{
                    if(v.time_type=="疯抢中"){
                        this.time_active=i;
                        this.getbaokuangood(i);
                        this.timevalue=v.timestamp*1000-(new Date().getTime());

                    }
                })
            })
        }
        /*爆款商品*/
        getbaokuangood(index) {
            // alert(index)
            this.indexNOW = index
            let param={
                time_id:this.timeArr[index].time_id||'',
                page:1,
                limit:5
            }
            this.http(buyLimitGoods,param).then(v=>{
                this.timegoosArry=v.data;
            })
        }

        /*分类*/
        get_taoke_goods_cate() {
            this.http(get_taoke_goods_cate,{type:"1"}).then(v=>{
                this.navArr=[...this.navArr,...v.data.list];
            })
        }

       /*猜你喜欢*/
        appFistPageJHS() {
            this.http(appFistPageJHS,{page:++this.page}).then(v=>{
                this.likeList=v.data;
            })
        }
        /*分类列表*/
        get_goods_list() {
            let  param={
                cate_id:this.navArr[this.nav_ac].cate_id,
                page:++this.page,
                type:7,
                sort:this.sort
            }
            this.http(get_goods_list,param).then(v=>{
                if(v.data.list.length==0){
                    this.finished=true;
                }
                this.uploading=false;
                this.downloading=false;
                this.sortList=[...this.sortList,...v.data.list];
            })
        }
        sort_to(index) {
            this.page=0;
            this.nav_ac=index;
            if(index>0){
                this.get_goods_list();
            }
        }

        /*整个首页刷新*/
        @Watch('nav_ac')
        @Watch('sort')
        onRefresh() {
            setTimeout(() => {
                this.downloading = false;
            }, 500);
            this.page=0;
            this.finished=false;
            this.sortList=[];
            this.likeList=[];
            this.getlistfeilei();
        }

        settj(index) {
            var that = this;
            if (index == 0) {//综合
                this.sort = 0;
            } else if (index == 1) { //高低价格
                if (that.sort === 2) {
                    this.sort = 1;
                } else {
                    this.sort = 2;
                }
            } else if (index == 2) { //佣金
                if (this.sort === 4) {
                    this.sort = 3;
                } else {
                    this.sort = 4;
                }
            } else if (index == 3) { //销量
                if (this.sort === 6) {
                    this.sort = 5;
                } else {
                    this.sort = 6;
                }
            }
            this.get_goods_list();
        }

        tomiao() {
            api.sendEvent({
                name: 'home',
                extra: 1
            });
        }
        getlistfeilei() {
            if(this.nav_ac>0){
                let  param={
                    cate_id:this.navArr[this.nav_ac].cate_id,
                    page:++this.page,
                    type:7,
                    sort:this.sort
                }
                this.http(get_goods_list,param).then(v=>{
                    if(v.data.list.length==0){
                        this.finished=true;
                    }
                    this.uploading=false;
                    this.downloading=false;
                    this.sortList=[...this.sortList,...v.data.list];
                })
            }else{
                this.http(appFistPageJHS,{page:++this.page}).then(v=>{
                    if(v.data.length==0){
                        this.finished=true;
                    }
                    this.uploading=false;
                    this.downloading=false;
                    this.likeList=[...this.likeList,...v.data];
                })
            }
        }
        onSearch() {
            this.openWin("tab0-search")
        }
        gettimelist() {
            this.getbaokuan();
            this.getbaokuangood();
        }
        onChange(index) {
            this.$refs.lunbo.swipeTo(index,{immediate:true})
        }

        goto(list) {
            if(list.title=='抖劵视频'){
                let option = Object.assign({
                    name: list.name,
                    url: list.name + '.html',
                    useWKWebView: true,
                    pageParam: {'title':list.title,'type':list.type} || {},
                    reload:true,
                });
                api.openWin(option);
                return

            }else if(list.title=='天猫超市'){
                this.http(get_link,{type:1}).then(v=>{
                    // alert(JSON.stringify(v.data.info))
                    if(api.systemType == 'ios'){
                        this.openWin('common-popadUrl',{webUrl:v.data.info})
                    } else {
                        var browser = api.require('webBrowser');
                        browser.open({
                            url:v.data.info
                        });
                    }
                })

                return
            }
            this.openWin(list.name,{'title':list.title,'type':list.type});
        }
    }
</script>

<style lang="scss">
    @import "@/assets/css/app.scss";
    @import "@/assets/css/common.scss";
    .search{
        background: url("../assets/img/search_youhui.png") 0 0 no-repeat;
        background-size:100% auto;
    }
    .fontS_14.font_weight_800+p{
        line-height: 16px;
    }
    .van-tabs--line .van-tabs__wrap{
        height: 60px;
    }
    .hotcake {
        // background-image: url('../assets/img/timebg.png');
        background: #326bff;
        border-radius: 15px;
    }

    .van-swipe__indicator {
        background: white;
        opacity: 1;
    }

    .van-swipe{
        height: 300px;
    }

    .quanjian{
        // width: 45px;
        height: 24px;
        // background: url('../assets/img/quanjian.png') no-repeat;
        // background-size: 100% 100%;
        background: #326bff;
        border-radius: 5px 5px;
        background: linear-gradient(to bottom, #80c8f9, #518FFA);
    }
    .quanjian2{
        width: 50px;
        height: 24px;
        background: url('../assets/img/juan1.png') no-repeat;
        background-size: 100% 100%;
    }
    section{
        &.active{
            background-color: white;
            border: 0;
        }
        .van-swipe {
            color: white;
            width: 95%;
            margin: auto;
            height:200px;
        }
    }
    pull-refresh__head{
        border: 0;
    }
    .lbbg{
        overflow: hidden;
        .van-swipe-item::after{
            position: absolute;bottom: 0;
            content: "";
            display: block;
            width: 120%;
            border-radius: 100%;
            height: 50%;
            left:50%;
            transform: translate(-50%,57%);
            background-color: white;
        }
    }

    .van-search {
        width: 90%;
        margin: auto;
        background: transparent!important;
        padding: 5px;
    }
    .van-search__action {
        display: none;
    }

    .van-field__left-icon .van-icon, .van-field__right-icon .van-icon {
        margin-left: 4.5rem !important;
    }

    .semicircle_bg { /*背景*/
        background-repeat: no-repeat;
        background-size: 100% 80%;
        background-image: url('../assets/img/frame0_bg2.png');
        background-position: 0 180px;
    }

    .fenlei .van-swipe__indicator { /*导航分类*/
        width: 30px;
        height: 5px;
        border-radius: 0;
        border: 1px solid lightgray;
    }

    .fenlei .van-swipe__indicators {
        height: 5px;
        top: 0;
    }

    .itemss { /*倒计时*/
        width: 2rem;
        height: 2rem;
        background-color: #ffffff;
        color: #326bff;
    }
    [class*=van-hairline]::after{
        border: 0;
    }
    .brbtomtime::after { /*限时爆款选中*/
        content: '';
        width: 30px;
        height: 3px;
        background: #326bff;
        position: absolute;
        margin: auto;
        bottom: -5px;
        left: 0;
        right: 0;
    }
    .van-tabs__line{
        background-color: #326bff;
    }
    .brbtomtime::after{
        display: none;
    }
    .fontS_14.font_weight_800.fontS_18{
        line-height: 34px;
    }
    div[role="tab"] p{
            color: #999!important;
            font-size: 14px!important;
            vertical-align: bottom!important;

        &+p{
            color: #999!important;
            font-size: 12px!important;
        }
    }
    div[role="tab"].van-tab--active p{
            color: #333!important;
            font-size: 22px!important;
        &+p{
            color: #333!important;
            font-size: 14px!important;
        }
    }
    .bkzq .van-swipe__indicator { /*爆款专区*/
        opacity: 1;
        border: 1px solid lightgray;
        background: white;
    }

    .bkzq .van-swipe__indicator--active {
        border: 0;
    }
    .van-swipe__indicator--active{
        background-color: black;
    }
    .bg_icon1{
        background: url(./../assets/img/bg_icon1.png) 0 0 no-repeat;
		background-size: 100% 100%;
    }
    .bg_icon2{
        background: url(./../assets/img/bg_icon2.png) 0 0 no-repeat;
		background-size: 100% 100%;
    }
    .fontColfo .xxx.fontCol{
        color: #326bff !important;
    }
    .MM_box_shadow{
        box-shadow: 0px 2px 6px 0px rgba(204, 204, 204, 1);
    }
</style>
