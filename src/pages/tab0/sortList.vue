<template>
    <div class="flex">
        <van-nav-bar
                :title="text"
                left-arrow
                @click-left="close"
                class="header no_cg"
        >
        </van-nav-bar>

        <div class="flex W_100 no_cg jianbian" style="height: 50px">
            <div ref="navEl" class="cate_scroll fontS_14 flex_rowL color_fff PTB_5">
                <div class="PLR_4 relative" v-for="(item,idx) in navArr" :class="nav_ac==idx?'color_FFC41C':''"
                     @click="nav_ac=idx">{{item.cate_name}}
                </div>
            </div>
        </div>
        <!--筛选条件-->
        <div class="W_100 flex_row_around PTB_5 fontS_12 bg_fff">
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
            <van-pull-refresh v-model="isLoading" @refresh="getlists">
                <van-list
                        v-model="upLoading"
                        :finished="finished"
                        finished-text="没有更多了"
                        @load="getlists"
                        :immediate-check="false">
                    <!--商品列表-->
                    <div class="flex_row_left flex_wrap PLR_3 bg_eee PB_4">
                        <div @click="openWin('tab0-searchList',{'itemId':item.itemid,'type':item.type,'tkmoney':item.tkmoney,'qhprice':item.spe_price})" class="W_50 PT_4" v-for="(item,index) in goodsList" :class="index%2==0?'PR_2':'PL_2'">
                            <img :src="requireimg(`logo`)" alt="" class="W_100 VH_45 B_radiusT_5">
                            <div class="bg_fff P_3 B_radiusB_5" style="margin-top: -3px">
                                <div class="text_overflow_1 PB_2">{{item.title}}</div>
                                <div class="flex_row_between W_100">
                                    <div class="fontS_10">
                                        <span class="color_red fontS_14">￥{{item.spe_price}}</span>
                                        <span class="text_decoration_line-through color_999">{{item.price}}</span>
                                        <span class="color_red">赚{{item.tkmoney}}</span>
                                    </div>
                                    <img v-if="item.goods_type=='tmall'" src="../../assets/img/tm_icon.png" alt="" style="width: 16px;height: 16px;">
                                    <img v-if="item.goods_type=='taobao'" src="../../assets/img/tb.png" alt="" style="width: 16px;height: 16px;">
                                    <img v-if="item.goods_type=='pdd'" src="../../assets/img/copy_pdd.png" alt="" style="width: 16px;height: 16px;">
                                    <img v-if="item.goods_type=='jd'" src="../../assets/img/copy_jd.png" alt="" style="width: 16px;height: 15px;">
                                </div>
                                <div class="flex_row_between PT_2 W_100">
                                    <div style="width: 45px;height: 18px;background: url('../../assets/img/quanjian1.png')no-repeat;background-size: 100% 100%;" class="color_FFC41C flex_rowC fontS_10">{{item.amount}}元券</div>
                                    <div class="color_999 fontS_11">已售：{{item.sales}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </van-list>
            </van-pull-refresh>
        </section>
    </div>
</template>
<script lang="ts">
    import "@/assets/js/iconfont/iconfont.css";

    import {Component,Vue} from 'vue-property-decorator';
    import {mixins} from 'vue-class-component'
    import common from "@/assets/js/common"
    import { Search,NavBar} from 'vant';

    Vue.use(Search).use(NavBar);
    @Component({
        components: {
            Search,
            NavBar,
        }
    })
    export default class index extends mixins(common) {
        code:string=""
        sort:number=0;
        upLoading:boolean=false;
        isLoading:boolean=false;

        text:string="精选";
        nav_ac: number = 0;
        navArr: Array<object> = [
            {cate_name: "精选"},
            {cate_name: "精选"},
            {cate_name: "精选"},
            {cate_name: "精选"},
            {cate_name: "精选"},
            {cate_name: "精选"},
            {cate_name: "精选"},
            {cate_name: "精选"},
            {cate_name: "精选"},
            {cate_name: "精选"},
            {cate_name: "精选"},
            {cate_name: "精选"},
            {cate_name: "精选"},

        ]

        goodsList:Array<object>=[
            {title:"111"},
            {title:"111"},
            {title:"111"},
            {title:"111"},
        ];
        settj(index: number) {
            var that = this;
            // $api.dom('.overflow_y').scrollTop = 0; //回到顶部
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
            this.getlistfeilei();
        }

        getlistfeilei() {

        }


    }
</script>

<style lang="scss">
    @import "@/assets/css/app.scss";
    @import "@/assets/css/common.scss";
    .quanjian{
        width: 45px;height: 18px;background: url('../../assets/img/quanjian.png') no-repeat;background-size: 100% 100%;
    }

    .van-search__content{
        background-color: white;
    }
    [class*=van-hairline]::after{
        border: 0;
    }
</style>
