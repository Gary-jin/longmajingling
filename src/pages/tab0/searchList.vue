<template>
    <div class="flex">
        <van-nav-bar
                right-text="搜索"
                left-arrow
                @click-left="close"
                @click-right="search"
                class="header no_cg"
        >
            <template v-slot:title>
                <van-search placeholder="请输入搜索关键词" v-model="word"  @search="search" />
            </template>
        </van-nav-bar>
        <div class="flex_row_around  color_333  PT_2 jianbian">
            <div class="relative W_33 textC" @click="searchType=1"><span  :class="{active:searchType==1}">淘宝</span></div>
            <div class="relative W_33 textC"  @click="searchType=2"><span :class="{active:searchType==2}">京东</span></div>
            <div class="relative W_33 textC"  @click="searchType=3"><span :class="{active:searchType==3}">拼多多</span></div>
        </div>
        <!--筛选条件-->
        <div class="W_100 flex_row_around PTB_4 fontS_12 bg_fff">
            <div class="flex_center" :class="sort==0?'color_FFC41C':'color_666'" @click="settj(0)">
                <span>综合</span>
            </div>
            <div class="flex_center" :class="(sort==1||sort==2)?'color_FFC41C':'color_666'" @click="settj(1)">
                <span>价格</span>
                <div class="flex_col_c" style="padding-top: 1px">
                    <i class="iconfont iconshang fontS_8" :class="sort==2?'color_FFC41C':'color_666'" ></i>
                    <i class="iconfont iconxia1 fontS_8" :class="sort==1?'color_FFC41C':'color_666'"></i>
                </div>
            </div>
            <div class="flex_center" :class="(sort==3||sort==4)?'color_FFC41C':'color_666'" @click="settj(2)">
                <span>佣金</span>
                <div class="flex_col_c" style="padding-top: 1px">
                    <i class="iconfont iconshang fontS_8" :class="sort==4?'color_FFC41C':'color_666'"></i>
                    <i class="iconfont iconxia1 fontS_8" :class="sort==3?'color_FFC41C':'color_666'"></i>
                </div>
            </div>
            <div class="flex_center" :class="(sort==5||sort==6)?'color_FFC41C':'color_666'" @click="settj(3)">
                <span>销量</span>
                <div class="flex_col_c" style="padding-top: 1px">
                    <i class="iconfont iconshang fontS_8" :class="sort==6?'color_FFC41C':'color_666'"></i>
                    <i class="iconfont iconxia1 fontS_8" :class="sort==5?'color_FFC41C':'color_666'"></i>
                </div>
            </div>

        </div>
         <section>
             <van-pull-refresh v-model="downloading" @refresh="search">
                 <van-list
                         v-model="uploading"
                         :finished="finished"
                         finished-text="没有更多了"
                         @load="getlist"
                         :immediate-check="false">
                     <!--商品列表-->
                     <div class="flex_row_left flex_wrap PLR_3 bg_eee PB_4">
                         <div @click="openWin('tab0-goods_info',{'itemId':item.itemid,'type':item.type,'tkmoney':item.tkmoney,'qhprice':item.spe_price})" class="W_50 PT_4" v-for="(item,index) in list" :class="index%2==0?'PR_2':'PL_2'">
                             <img v-lazy="item.img" alt="" class="W_100 VH_45 B_radiusT_5">
                             <div class="bg_fff P_3 B_radiusB_5" style="margin-top: -3px">
                                 <div class="text_overflow_1 PB_2">{{item.title}}</div>
                                 <div class="flex_row_between W_100">
                                     <div class="fontS_10">
                                         <span class="color_red fontS_14">￥{{item.spe_price}}</span>
                                         <span class="text_decoration_line-through color_999 MR_1">{{item.price}}</span>
                                         <span class="color_red">赚{{item.tkmoney}}</span>
                                     </div>
                                     <img v-if="item.goods_type=='tmall'" src="../../assets/img/tm_icon.png" alt="" style="width: 16px;height: 16px;">
                                     <img v-if="item.goods_type=='taobao'" src="../../assets/img/tb.png" alt="" style="width: 16px;height: 16px;">
                                     <img v-if="item.goods_type=='pdd'" src="../../assets/img/copy_pdd.png" alt="" style="width: 16px;height: 16px;">
                                     <img v-if="item.goods_type=='jd'" src="../../assets/img/copy_jd.png" alt="" style="width: 16px;height: 15px;">
                                 </div>
                                 <div class="flex_row_between PT_2 W_100">
                                     <div class="color_fff flex_rowC fontS_10 quanjian">{{item.amount}}元券</div>
                                     <div v-if="item.goods_type=='tmall'||item.goods_type=='taobao'" class="color_999 fontS_11">已售：{{item.sales}}</div>
                                 </div>
                             </div>
                         </div>
                     </div>
                 </van-list>
             </van-pull-refresh>
         </section>
    </div>
</template>
<script >
    import "@/assets/js/iconfont/iconfont.css";

    import {Component,Vue,Watch} from 'vue-property-decorator';
    import {mixins} from 'vue-class-component'
    import common from "@/assets/js/common"
    import {super_search} from "@/assets/js/const"
    import {Search, NavBar,List , Lazyload,PullRefresh} from 'vant';

    Vue.use(Search).use(NavBar).use(List).use(PullRefresh).use(Lazyload);

    @Component
    export default class index extends mixins(common) {

        sort=0;
        page=0;
        searchType=1;
        list=[]
        word="";
        settj(index) {
            if (index == 0) {//综合
                this.sort = 0;
            } else if (index == 1) { //高低价格
                if (this.sort === 2) {
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
        }
        @Watch('searchType')
        @Watch('sort')
        search() {
            this.page=0;
            this.finished=false;
            this.list=[];
            this.getlist();
        }

        getlist() {
            let param={
                keyword:this.word,
                type:this.searchType,
                sort:this.sort,
                page:++this.page
            }
            this.http(super_search,param).then(v=>{
                api.sendEvent({
                    name: 'search',
                    extra: 0
                });
                this.uploading=false;
                this.downloading=false;
                if(v.data.list.length==0)this.finished=true;
                this.list=[...this.list,...v.data.list]
            })
        }
        mounted() {
            this.word=api.pageParam.word
            this.searchType=api.pageParam.searchType||1;
            this.getlist();
        }


    }
</script>

<style lang="scss">
    @import "@/assets/css/app.scss";
    @import "@/assets/css/common.scss";
    .quanjian{
        width: 45px;height: 18px;background: url('../../assets/img/quanjian.png') no-repeat;background-size: 100% 100%;
    }
    .van-hairline--bottom::after {
         border-bottom-width:0px;
    }
    .van-nav-bar__title{
        min-width: 65%;
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
        overflow: hidden;
        margin-top:10px;
        background-color: initial;
    }
    .relative{
        line-height:40px;
        & span,{
            width: auto;
            color:white;
            padding:10px 0;
        }
    }
    .relative span.active{
        border-bottom: 1px solid ;
        color: #FFC41C;
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

    input{
        line-height: 35px;
    }
    .van-nav-bar__text{
        color: white;
    }
    .van-search__content{
        background-color: white;
    }
</style>
