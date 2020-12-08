<template>
    <div class="flex" >
        <!-- <van-nav-bar
                title="分红详情"
                left-arrow
                @click-left="close"
                class="header"
        /> -->
        <div class="header flex_shrink_0 flex_rowC BT_2 PB_2">
            <span
                @click="tab1CloseExtend()"
                class="absolute PL_2 iconfont icon_return fontS_16"
                style="left: 0;"
            ></span>
            <span class="fontS_16 font_weight_bold">分红详情</span>
            <!-- <span class="absolute PR_2 color_17A68A" style="right: 0;">零钱记录</span> -->
        </div>
        <van-list
                v-model="uploading"
                :finished="finished"
                finished-text="没有更多了"
                @load="getlist"
        >
            <div style="padding:0 12px;box-sizing: border-box;line-height: 25px;margin: 1rem 0">
                <p class="fontS_15" style="font-weight:bold;">
                    广告收益
                    <img  src="@/assets/img/close.png" alt="" style="width:20px;height:20px;vertical-align: -5px">
                    <span class="fontS_14" style="color: #999999;float: right;font-weight: initial;">每天中午12:00核算</span>
                </p>
            </div>

            <div style="padding: 0 12px;" class="flex_between sy">
                <div>
                    <h1 class="fontS_19">{{info.num1}}</h1>
                     <p class="fontS_12">昨天收益</p>
                </div>
                <div>
                    <h1>{{info.num2}}</h1>
                     <p>历史收益</p>
                </div>
            </div>

            <div style="padding:0 12px;box-sizing: border-box;line-height: 25px;margin: 1rem 0">
                <p class="fontS_15" style="font-weight:bold;">
                    广告收益
                    <img  src="@/assets/img/close.png" alt="" style="width:20px;height:20px;vertical-align: -5px">
                    <span class="fontS_14" style="color: #999999;float: right;font-weight:initial;">每天中午12:00核算</span>
                </p>
            </div>
            <div style="padding:0 12px;text-align: center">
                <div class="MM_box_shadow B_radius_10 zcm" style="padding: 10px 0">
                    <div class="flex_rowC">
                        <div class="pjsy color_fff">平均收益：{{info.num3}}</div>
                    </div>
                    <div class="flex_between" style="text-align: center;width: 100%;margin: 20px 0">
                        <div>
                            <h1 class="fontS_19" style="color: #ff6246;">{{info.num4}}</h1>
                            <p class="fontS_12">全网总数</p>
                        </div>
                        <div style="border-left: 1px solid white">
                            <h1 class="fontS_19" style="color: #ff6246;">{{info.num5}}</h1>
                            <p class="fontS_12">今天产出</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="md" style="width: 71px;height: 2px;position: relative;left: 50%;transform: translateX(-50%);margin-top: 20px">
            </div>

            <div class="PLR_2">
                <div class="MM_box_shadow MB_2 B_radius_10" v-for="v in list" :key="v" style="display: flex;justify-content:start;color: #333333;align-items: center;padding: 12px;">
                    <img :src="v.avatar||requireimg(`logo-200`)" alt="" style="width:45px;height:45px;border-radius:999px;">
                    <h1  class="fontS_12" style="margin-left: 15px;flex-grow: 1">{{v.str}}
                        <p >{{v.str1}}</p>
                    </h1>
                    <p class="fontS_10 color_999" style="justify-content: flex-end">{{v.create_time}}</p>
                </div>
            </div>
        </van-list>
    </div>

</template>
<script>
    import {Component, Vue} from 'vue-property-decorator';
    import {mixins} from 'vue-class-component'
    import common from "@/assets/js/common"
    import {NavBar, List, PullRefresh} from 'vant';
    import {Send_info,cat_list} from "@/assets/js/const";
    Vue.use(NavBar).use(PullRefresh).use(List);
    @Component
    export default class extends mixins(common) {
        info={};
        list=[];
        page=0;
        mounted() {
            this.getinfo();
            this.addKeyback()
        }
        getinfo() {
            this.http(Send_info).then(v=>{
               this.info=v.data
            })
        }
        getlist() {
            this.http(cat_list,{page:++this.page}).then(v=>{
             /*   v.data=[{
                    "avatar": "http://taoqimao.abc/upload/TxWWVTt5tmW64T41577516770.png",
                    "str": "用户150****2497成功升级为龙马",
                    "create_time": "2020-01-14 17:39:33"
                }]*/
                this.uploading=false;
                if(v.data.length==0){
                    this.finished=true;
                }
               this.list=[...this.list,...v.data];
            })
        }

    }
</script>

<style lang="scss">
    @import "@/assets/css/app.scss";

    // .md::before{
    //     content: "";
    //     display: block;
    //     height: 0;
    //     border: 3px solid  transparent;
    //     border-bottom-color: rgba(226,103,157,1);
    //     position: absolute;
    //     top:-6px;
    //     left: 50%;
    //     margin-left: -2px;
    //     transform: translateX(-50%);
    // }
    .sy{
        text-align: center;
        color: white;

        &>div{
            background-image:url("../../assets/img/sybg.png");
            background-size: 100% 100%;
            width: 50%;
            height: 120px;
        }
        &>div+div{
            background-image:url("../../assets/img/sybg1.png") ;
        }
        h1{
            margin-top: 17px;
            line-height: 30px;
        }
        p{
            line-height: 35px;
        }
    }
    .zcm>div>*{
        width: 50%;
        text-align: center;
    }
    .MM_box_shadow{
        box-shadow: 0px 2px 6px 0px rgba(204, 204, 204, 1);
    }
    .pjsy{
        background:url("../../assets/img/pjsy.png") 0 0 no-repeat;
        background-size: 100% 100%;
        height: 40px;
        line-height: 40px;
    }
    // .van-nav-bar{
    //     background: #fff !important;
    //     color: #000 !important;
    //     border: none !important;
    // }
</style>
