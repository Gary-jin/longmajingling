<template>
    <!-- <van-pull-refresh v-model="downLoading" @refresh="refresh" > -->
        <van-list
                v-model="upLoading"
                :finished="finished"
                finished-text="没有更多了"
                @load="change"
        >
            <div v-if="type=='winner'" style="padding:7px 14px;overflow-y: auto" >
                <div class="list flex_between" v-for="v in list" :key="v">
                    <div>
                        <h1>{{v.create_time}}</h1>
                    </div>
                    <div style="text-align: left;width:40%">
                        <p style=";color: #FF0000">
                            <img v-if="v.type=='maobi'" src="@/assets/img/maobi.png" alt="" style="width:40px;height:40px;margin-right: 10px;vertical-align: -15px;">
                            <img v-else-if="v.type=='red_money'" src="@/assets/img/hongbao.png" alt="" style="width:40px;height:40px;margin-right: 10px;vertical-align: -15px;">
                            <img v-else src="@/assets/img/video.png" alt="" style="width:40px;height:40px;margin-right: 10px;vertical-align: -15px;">

                            {{v.str}}
                        </p>
                    </div>
                </div>
            </div>
            <!--抽奖明细-->
            <div v-else-if="type=='cj'" style="padding:7px 14px;overflow-y: auto" >
                <div class="list flex_between" v-for="v in list" :key="v">
                    <div>
                        <h1>{{v.str1}}</h1>
                    </div>
                    <div  style="color: #333">
                        {{v.str2}}
                    </div>
                    <div style="text-align: right;" class="fontS_14">
                        <p style="color: #333">
                            {{v.create_time}}
                        </p>
                    </div>
                </div>
            </div>
            <!--收支-->
            <div v-else-if="type=='shouzhi'" style="padding:7px 14px;overflow-y: auto" >
                <div class="list flex_between" v-for="(v,i) in list" :key="i">
                    <div>
                        <h1 class="fontS_16">{{v.remark}}</h1>
                        <p style="line-height:18px;color: #999">{{v.create_time}}</p>
                    </div>

                    <div style="text-align: right;" class="fontS_10">
                        <p style="color:#FF0000;font-weight: bold" class="fontS_18">{{v.price}}</p>
                    </div>
                </div>
            </div>
            <div v-else style="padding:7px 14px;overflow-y: auto" v-for="(v,i) in list" :key="i">
                <div class="list flex_between">
                    <div>
                        <h1>{{v.str1}}<span  style="color: red">{{v.str2}}</span></h1>
                        <p>{{v.create_time}}</p>
                    </div>
                    <div style="text-align: center">
                        <p class="fontS_16" style="color: red">￥{{v.price}}</p>
                        <p v-if="v.status_text=='待审核'">审核中</p>
                        <p v-else-if="v.status_text=='已通过'" style="color: red">提现成功</p>
                        <p  v-else><img src="@/assets/img/gantanhao.png" alt="" style="width: 13px;height: 13px;color:#0CBD00;margin-right: 4px;vertical-align: -3px">被驳回</p>
                    </div>
                </div>
            </div>
        </van-list>
    <!-- </van-pull-refresh> -->
</template>

<script >
    import "@/assets/js/iconfont/iconfont.css";
    import {Component, Vue,Prop} from 'vue-property-decorator';
    import {mixins} from 'vue-class-component'
    import common from "@/assets/js/common"
    import {Panel, NavBar, List, PullRefresh, NoticeBar, Button, Divider, Icon,Toast} from 'vant';
    import {withdraw_list,award_list,Zhuanpan_award_list,balance_list} from "@/assets/js/const";

    Vue.use(Button).use(NavBar).use(PullRefresh).use(List).use(NoticeBar).use(Panel).use(Divider).use(Icon);

    @Component
    export default class extends mixins(common) {
        @Prop(String) type;
        list=[]
        downLoading = false;
        page = 0;
        finished = false;
        change(){
            switch (this.type) {
                case 'cj':
                    this.award_list();
                    break;
                case 'winner':
                    this.Zhuanpan_award_list();
                    break;
                case 'shouzhi':
                    this.balance_list();
                    break;
                default:
                    this.getwithdraw_list();
            }

        }

        refresh() {
            this.page=0;
            this.list=[];
            this.finished=false;
            switch (this.type) {
                case 'cj':
                    this.award_list();
                    break;
                case 'winner':
                    this.Zhuanpan_award_list();
                    break;
                case 'shouzhi':
                    this.balance_list();
                    break;
                default:
                    this.getwithdraw_list();
            }
        }

        /*提现列表*/
        getwithdraw_list() {
            this.http(withdraw_list,{page:++this.page}).then(v=>{
                this.downLoading=false;
                this.upLoading=false;
                this.list=[...this.list,...v.data.list];
                if(v.data.list.length==0)this.finished=true;
                if(v.code!=0)return Toast(v.msg);
            })
        }
        /*摇奖*/
        award_list() {
            this.http(award_list,{page:++this.page}).then(v=>{
                this.downLoading=false;
                this.upLoading=false;
                this.list=[...this.list,...v.data];
                if(v.data.length==0)this.finished=true;
                if(v.code!=0)return Toast(v.msg);
            })
        }
        /*转盘*/
        Zhuanpan_award_list() {
            this.http(Zhuanpan_award_list,{page:++this.page}).then(v=>{
                this.downLoading=false;
                this.upLoading=false;
                this.list=[...this.list,...v.data];
                if(v.data.length==0)this.finished=true;
                if(v.code!=0)return Toast(v.msg);
            })
        }
        /*收支*/
        balance_list() {
            this.http(balance_list,{page:++this.page}).then(v=>{
                this.downLoading=false;
                this.upLoading=false;
                this.list=[...this.list,...v.data];
                if(v.data.length==0)this.finished=true;
                if(v.code!=0)return Toast(v.msg);
            })
        }
    }
</script>

<style lang="scss">
    @import "@/assets/css/app.scss";
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
    .flex_between {
        button {
            margin-top: 7px;
            width: 32%;
            border-radius: 5px;
        }
    }
</style>
