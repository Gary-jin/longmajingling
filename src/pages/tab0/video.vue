<template>
    <div class="flex" style="position: relative;background-color:black">
        <van-nav-bar
                title="抖劵视频"
                left-arrow
                @click-left="close"
                class="header"
                style="position: absolute;width: 100%"
        />
        <van-swipe style="height:100%"   vertical :show-indicators=false @change="onChange">
            <van-swipe-item v-for="(v,i) in list" :key="i" style="position:relative;">
                <video loop="loop"  class="" ref="aa"  style="position: absolute;top: 50%;left:50%;transform: translate(-50%,-50%)" :src="v.video_url"></video>
                <div class="con">
                    <p>{{v.title}}</p>
                    <div style="display: flex;justify-content: start;margin: 5px 0">
                        <div class="coupons">券后￥{{v.spe_price}}</div>
                        <div class="coupons">{{v.amount}}元券</div>
                    </div>
                    <p>{{v.itemdesc}}</p>
                </div>
                <div style="position:absolute;right:13px;top: 50%;text-align: center" @click="toPage('tab0-goods_info',{'itemId':v.itemid,'type':v.type,'tkmoney':v.tkmoney,'qhprice':v.spe_price})">
                    <img :src="v.img" alt="" style="width: 55px;height: 55px;border-radius: 1000px ">
                    <p style="color: white">去购买</p>
                </div>
            </van-swipe-item>
        </van-swipe>
    </div>
</template>
<script >
    import "@/assets/js/iconfont/iconfont.css";
    import {Component, Vue} from 'vue-property-decorator';
    import {mixins} from 'vue-class-component'
    import common from "@/assets/js/common"
    import {NavBar, List, Swipe, SwipeItem, PullRefresh} from 'vant';
    import {getvideo} from '@/assets/js/const';

    Vue.use(NavBar).use(PullRefresh).use(List).use(Swipe).use(SwipeItem);

    @Component
    export default class extends mixins(common) {
        list=[];
        index=0;
        page=1;
        allindex=[0]
        mounted() {
            this.http(getvideo,{page:this.page}).then(v=>{
                this.list=v.data.list;
                this.$nextTick(()=>{
                    this.$refs.aa[0].play();
                })
            })
        }
        onChange(index) {

            this.$refs.aa[this.index].pause();
            this.$refs.aa[index].play();
            this.index=index;
            var a=this.allindex.some((v,i)=>{
                return v==index
            })
            a?"":this.allindex.push(index);
            if(this.allindex.length>=10){
                this.allindex=[0];
                this.loadflash();
            }
        }

        loadflash(){
            // this.allindex[this.allindex.length-1]


            this.http(getvideo,{page:++this.page}).then(v=>{
                this.list=[this.list[this.allindex[this.allindex.length-1]],...v.data.list];
                this.$nextTick(()=>{
                    this.$refs.aa[0].play();
                })
            })
        }
    }
</script>

<style lang="scss">
    @import "@/assets/css/app.scss";
    @import "@/assets/css/common.scss";

    .van-search__content {
        border-radius: 30px;
    }

    .van-nav-bar__text {
        color: white;
    }

    .van-nav-bar {
        background: transparent;
    }
    [class*=van-hairline]::after {
        display: none;
    }
    .con{
        color: white;
        position: absolute;
        bottom: 20px;
        left: 0;
        padding: 0 15px;
        line-height: 20px;
        div{
            div{
                background: url("../../assets/img/quanjian.png") 100% 100%;
            }
        }
    }
    .coupons{
        background-color: transparent;
        background: url("../../assets/img/juan.png") no-repeat;
        background-size: 100% 100% !important;
        padding: 2px 3px;
    }
    .coupons+.coupons{
        background-color: transparent;
        background: url("../../assets/img/juan1.png") no-repeat;
        background-size: 100% 100% !important;
        margin-left: 5px;
        padding: 2px 3px;
    }
</style>
