<template>

    <div class="flex">
        <van-nav-bar
                title="我的订单"
                left-arrow
                @click-left="close"
                class="header"
        />
        <section>
            <van-tabs v-model="activeName" @change="change" color="#3868FF">
                <van-pull-refresh v-model="downloading" @refresh="change">
                        <van-tab :title="v.title"  v-for="(v,i) in list_top" :key="i">
                            <van-list
                                    v-model="uploading"
                                    :finished="finished"
                                    finished-text="没有更多了"
                                    @load="getlist"
                            >
                                <div class="flex_between"  v-for="(v,i) in list" :key="i" style="border-bottom: 1px solid #F2F2F2;padding: 5px 0">
                                    <img :src="v.imgUrl" alt="" style="width: 95px;height: 95px;">
                                    <div class="list ">
                                        <h1 class="text_overflow_1">
                                            <img v-show="v.tmall==2" src="@/assets/img/tm_icon.png" alt="" style="width: 20px;height: 20px;vertical-align: -5px;margin-right:3px">
                                            <img v-show="v.tmall==4" src="@/assets/img/copy_pdd.png" alt="" style="width: 20px;height: 20px;vertical-align: -5px;margin-right:3px">
                                            <img v-show="v.tmall==3" src="@/assets/img/copy_jd.png" alt="" style="width: 20px;height: 20px;vertical-align: -5px;margin-right:3px">
                                            <img v-show="v.tmall==1" src="@/assets/img/tb.png" alt="" style="width: 20px;height: 20px;vertical-align: -5px;margin-right:3px">
                                            {{v.goods_info}}
                                        </h1>
                                        <p class="fontS_13">创建日 {{v.create_time}}  <span style="float: right">{{activeName==0&&v.o_status==1?"已付款":v.o_status==2?"已结算":"已失效"}}</span></p>
                                        <p class="fontS_13">订单号:{{v.order_no}}
                                            <span v-clipboard:copy="v.order_no"
                                                                   v-clipboard:success="copy"
                                                                   v-clipboard:error="copyerr"  style="float: right;border: 1px solid #999;padding: 0 6px;border-radius: 999px">复制</span></p>
                                        <p class="fontS_13">消费金额：{{v.pay_money}}</p>
                                        <p style="color: #FF0000;float: right;font-size:15px">预计佣金：{{v.commission_money||0}}</p>
                                    </div>
                                </div>
                            </van-list>

                        </van-tab>
                </van-pull-refresh>
            </van-tabs>
        </section>
    </div>
</template>

<script >
    import "@/assets/js/iconfont/iconfont.css";
    import {Component, Vue, Prop} from 'vue-property-decorator';
    import {mixins} from 'vue-class-component'
    import common from "@/assets/js/common"
    import {NavBar, List, PullRefresh, Tab, Tabs, Toast} from 'vant';
    import {get_taoke_order_list} from "@/assets/js/const";
    //复制到粘贴板插件
    import VueClipboard from 'vue-clipboard2'
    VueClipboard.config.autoSetContainer = true;

    Vue.use(NavBar).use(PullRefresh).use(List).use(Tab).use(Tabs).use(VueClipboard);
    @Component
    export default class extends mixins(common) {
        activeName=0
        page=0
        isLoading=false
        list_top= [{
            title: "全部"
        }, {
            title: "已付款"
        }, {
            title: "已结算"
        }, {
            title: "已失效"
        },]
        list=[]

        copy() {
            Toast('复制成功')
        }
        copyerr() {
            Toast('复制失败')
        }
        getlist() {
            this.http(get_taoke_order_list,{order_status:this.activeName,page:++this.page}).then(v=>{
                this.downloading=false;
                this.uploading=false;
                this.list=[...this.list,...v.data.list];
                if(v.data.list.length==0)return this.finished=true;
                if(v.code!=0)return Toast(v.msg);
            })
        }
        change(a) {
            this.page=0;
            this.list=[];
            this.finished=false;
            this.getlist();
        }
    }
</script>
<style lang="scss">
    @import "@/assets/css/app.scss";
    .van-tabs--line .van-tabs__wrap{
        position: relative;
        z-index: 99999;
    }
    .van-tabs__content{
        height: 100%;
    }
    .van-tab__pane {
        .list {
            border-bottom: 0;
            width: calc(100% - 108px);
        }
        padding: 12px;

        p {
            color: #999;
        }

        h1 {
            color: #101010;
        }
    }
</style>
