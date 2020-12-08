<template>

    <div class="flex">
        <van-nav-bar
                title="我的团队"
                left-arrow
                @click-left="close"
                @click-right="show=true"
                right-text="师傅"
                class="header"
        />
        <section>
            <van-tabs v-model="activeName" color = '#2F65FF'>
                <van-pull-refresh v-model="downloading" @refresh="getlist">
                    <van-list
                            v-model="uploading"
                            :finished="finished"
                            finished-text="没有更多了"
                            @load="getlist"
                    >
                        <van-tab :title="v.title"  v-for="(v,i) in list_top" :key="i">
                                <div v-for="v in list" :key="v" class="list flex_between" style="width: 100%;border-bottom:1px solid #e9e9e9">
                                    <div>
                                        <h1 style="color: #101010" class="fontS_16">{{v.mobile}} </h1>
                                        <p>{{v.create_time}}</p>
                                    </div>
                                    <div style="text-align: center;color: #101010" class="fontS_16">
                                        {{v.cat_level}}
                                    </div>
                                    <div style="color: #999">
                                        {{v.smrz}}
                                    </div>
                                </div>
                        </van-tab>
                    </van-list>
                    <p style="text-align: center;color: #999;margin: 30px 0">共有{{list.length}}名{{activeName==0?'徒弟':'徒孙'}}</p>
                </van-pull-refresh>
            </van-tabs>

        </section>

        <van-popup v-model="show" style="width:80%;padding: 20px;border-radius: 12px;height:auto">
               <h1 style="text-align: center;margin-bottom:15px;font-weight: bold" class="fontS_16">我的师傅</h1>
                <div style="display: flex;justify-content:start;color: #333333;align-items: center">
                    <img :src="teacher.avatar||requireimg(`logo-200`)" alt="" style="width:45px;height:45px;border-radius: 7px;margin:20px 10px 10px">
                    <h1  class="fontS_12" style="flex-grow: 1">
                        {{teacher.nickname}}
                        <p >
                            {{teacher.mobile?teacher.mobile:'您还没有师傅'}}
                        </p>
                    </h1>
                    <p style="justify-content: right" v-if="teacher.cat_level">{{teacher.cat_level+'级'}}</p>
                </div>
                <div style="display: flex;justify-content:start;color: #333333;align-items: center;margin: 20px 0 20px 10px">
                    <img src="@/assets/img/wx.png" alt="" style="width:24px;height:24px;border-radius: 7px;margin:0px 10px 0 0">
                    <h1  class="fontS_12" style="flex-grow: 1">{{teacher.wx_username||"师傅偷懒没有设置"}}</h1>
                    <p v-clipboard:copy="teacher.wx_username"
                       v-clipboard:success="copy"
                       v-clipboard:error="copyerr" style="background-color: #999999;border-radius: 3px;padding: 5px 12px;color: white">复制微信号</p>
                </div>

                <div @click="show=false" class="login MLR_auto W_100 lmjl_btn_bg  B_radius_10 fontS_13" style="width: 50%;padding:0 26px;line-height:30px;margin: auto;border-radius: 100px;text-align: center" >
                    确定
                </div>
        </van-popup>
    </div>
</template>

<script >
    import "@/assets/js/iconfont/iconfont.css";
    import {Component, Vue,Watch} from 'vue-property-decorator';
    import {mixins} from 'vue-class-component'
    import common from "@/assets/js/common"
    import {my_team} from "@/assets/js/const"
    import record from "@/components/record.vue";
    import {NavBar, List, PullRefresh, Divider, Icon, Tab, Tabs, Popup, Toast} from 'vant';
    //复制到粘贴板插件
    import VueClipboard from 'vue-clipboard2'
    VueClipboard.config.autoSetContainer = true;
    Vue.use(VueClipboard)
    Vue.use(NavBar).use(PullRefresh).use(List).use(Tab).use(Tabs).use(Popup);
    @Component
    export default class extends mixins(common) {
        show=false;
        activeName=0;
        page=0;

        list_top=[{
            title:"徒子"
        }, {
            title: "徒孙"
        }]
        list=[]
        teacher={}

        copy(){
            Toast("复制成功")

        }
        copyerr(){
            Toast("复制成功")

        }
        @Watch('activeName') function(v) {
            this.list=[];
            this.page=0;
            this.getlist();
        }
        getlist() {
            let param={
                type:this.activeName?2:1,
                page:++this.page,
            }
            this.http(my_team,param).then(v=>{
                this.downloading=false;
                this.uploading=false;
                if(v.data.list.length==0)this.finished=true;
                this.list=[...this.list,...v.data.list];
                this.teacher=v.data.teacher;
            })
        }
    }
</script>
<style lang="scss">
    @import "@/assets/css/app.scss";
    @import "@/assets/css/common.scss";
    .van-tab__pane{
        .list{
            border-bottom: 0;
            width: calc(100% - 120px);
            padding:15px 0 10px;
        }
        padding:7px 12px;
        p{
            color: #999;
        }
        h1{
            color: #101010;
        }
    }
    .van-nav-bar__text{
        color: white;
    }
    .van-tabs--line .van-tabs__wrap{
        position: relative;
        z-index: 9;
    }
</style>
