<template>
    <div class="flex">
        <van-nav-bar
                :title="pageParam.title"
                left-arrow
                @click-left="closeNow"
                class="header"
        />
        <van-search  @search="search"  placeholder="请输入您要搜索的商品" v-model="keyword" style="line-height: 30px;"/>
        <!--筛选条件-->
        <div class="W_100 flex_row_around PTB_5 fontS_12 bg_fff" style="border-top: 1px solid #EBEBEB">
            <div class="flex_center" :class="sort==0?'color_FFC41C':'color_666'" @click="settj(0)">
                <span>综合</span>
            </div>
            <div class="flex_center" :class="(sort==1||sort==2)?'color_FFC41C':'color_666'" @click="settj(1)">
                <span>价格</span>
                <div class="flex_col_c" style="padding-top: 1px">
                    <i class="iconfont iconshang fontS_8" :class="sort==2?'color_FFC41C':'color_666'"
                       style="margin-bottom: -3px"></i>
                    <i class="iconfont iconxia1 fontS_8" :class="sort==1?'color_FFC41C':'color_666'"></i>
                </div>
            </div>
            <div class="flex_center" :class="(sort==3||sort==4)?'color_FFC41C':'color_666'" @click="settj(2)">
                <span>佣金</span>
                <div class="flex_col_c" style="padding-top: 1px">
                    <i class="iconfont iconshang fontS_8" :class="sort==4?'color_FFC41C':'color_666'"
                       style="margin-bottom: -3px"></i>
                    <i class="iconfont iconxia1 fontS_8" :class="sort==3?'color_FFC41C':'color_666'"></i>
                </div>
            </div>
            <div class="flex_center" :class="(sort==5||sort==6)?'color_FFC41C':'color_666'" @click="settj(3)">
                <span>销量</span>
                <div class="flex_col_c" style="padding-top: 1px">
                    <i class="iconfont iconshang fontS_8" :class="sort==6?'color_FFC41C':'color_666'"
                       style="margin-bottom: -3px"></i>
                    <i class="iconfont iconxia1 fontS_8" :class="sort==5?'color_FFC41C':'color_666'"></i>
                </div>
            </div>
        </div>

        <section >
            <van-pull-refresh v-model="downloading" @refresh="getGoodsList">
                <van-list
                        v-model="uploading"
                        :finished="finished"
                        finished-text="没有更多了"
                        @load="getlists"
                        :immediate-check="false">
                    <!--商品列表-->
                    <div class="flex_row_left flex_wrap PLR_3  PB_4">
                        <div @click="toPage('tab0-goods_info',{'itemId':item.itemid,'type':item.type,'tkmoney':item.tkmoney,'qhprice':item.spe_price})"
                             class="W_50 PT_4" v-for="(item,index) in goodsList" :class="index%2==0?'PR_2':'PL_2'" :key="index">
                            <img v-lazy="item.img" alt="" class="W_100 VH_45 B_radiusT_5">
                            <div class="bg_fff P_3 B_radiusB_5" style="margin-top: -3px">
                                <div class="text_overflow_1 PB_2">{{item.title}}</div>
                                <div class="flex_row_between W_100">
                                    <div class="fontS_10">
                                        <span class="color_red fontS_14">￥{{item.spe_price}}</span>
                                        <span class="text_decoration_line-through color_999">{{item.price}}</span>
                                        <span class="color_red">赚{{item.tkmoney}}</span>
                                    </div>
                                    <img v-if="item.goods_type=='tmall'" src="../../assets/img/tm_icon.png" alt=""
                                         style="width: 16px;height: 16px;">
                                    <img v-if="item.goods_type=='taobao'" src="../../assets/img/tb.png" alt=""
                                         style="width: 16px;height: 16px;">
                                    <img v-if="item.goods_type=='pdd'" src="../../assets/img/copy_pdd.png" alt=""
                                         style="width: 16px;height: 16px;">
                                    <img v-if="item.goods_type=='jd'" src="../../assets/img/copy_jd.png" alt=""
                                         style="width: 16px;height: 15px;">
                                </div>

                                <div class="flex_row_between PT_2 W_100">
                                    <div class="color_fff flex_rowC fontS_10 quanjian">{{item.amount}}元券</div>
                                    <div  v-if="item.goods_type=='tmall'||item.goods_type=='taobao'" class="color_999 fontS_11">已售：{{item.sales}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </van-list>
            </van-pull-refresh>
        </section>
    </div>
</template>
<script>
    import "@/assets/js/iconfont/iconfont.css";
    import {Component, Vue} from 'vue-property-decorator';
    import {mixins} from 'vue-class-component'
    import common from "@/assets/js/common"
    import {Search, NavBar, List, PullRefresh,Lazyload } from 'vant';
    import {get_goods_list,good_goods_and_jhs} from '@/assets/js/const';


    Vue.use(Search).use(NavBar).use(PullRefresh).use(List).use(Lazyload);

    @Component
    export default class extends mixins(common) {
        keyword = "";
        sort = 0;
        goodsList = []
        list = [];
        page=0;
        pageParam = {}

        mounted() {
            this.pageParam = api.pageParam;
            this.getlists();
            this.addKeyback();
        }
        closeNow(){
            api.sendEvent({name: "turnableUpdata"});
            this.close()
        }
        addKeyback() {
            var that = this;
            api.addEventListener({
                name: 'keyback'
            }, function(ret, err) {
                api.sendEvent({name: "turnableUpdata"});
                that.close()
            });
        }
        /*获取商品列表*/
        getGoodsList() {
           this.page=0;
           this.goodsList=[];
           this.finished=false;
           this.getlists()
        }

        getlists() {
            let  param={
                cate_id:this.pageParam.cate_id,
                page:++this.page,
                keyword:this.keyword,
                type:this.pageParam.type,
                sort:this.sort
            }
            var url=get_goods_list;
            if(this.pageParam.title=="好货专场"||this.pageParam.title=="聚划算"){
                url=   good_goods_and_jhs;
                param.type=2;
                this.pageParam.title=="好货专场"&&(param.type=1)
            }

            this.http(url,param).then(v=>{
                this.downloading=false;
                this.uploading=false;
                if(this.pageParam.title=="好货专场"||this.pageParam.title=="聚划算"){
                    if(v.data.length==0)this.finished=true;
                    this.goodsList=[...this.goodsList,...v.data];
                }else{
                    if(v.data.list.length==0)this.finished=true;
                    this.goodsList=[...this.goodsList,...v.data.list];
                }

            })
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
            // console.log(that.sort)
            this.getGoodsList();
        }

        search() {
            var a=this.pageParam.title
            if(a=="淘宝"||a=="京东"||a=="拼多多"||a=="天猫"){
                this.openWin(`tab0-searchList`,{word:this.keyword})

            }else{
                this.getGoodsList()
            }
        }
    }
</script>

<style lang="scss">
    @import "@/assets/css/app.scss";
    @import "@/assets/css/common.scss";
    .quanjian{
        width: 45px;height: 18px;background: url('../../assets/img/quanjian.png') no-repeat;background-size: 100% 100%;
    }
    .van-search__content {
        margin:5px 10px;
        border-radius: 30px;
    }

    .van-search__content {
        background-color: #E8E8E8;
    }
    .van-icon-search{
        display: none;
    }
</style>
