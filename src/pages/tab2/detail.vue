<template>
    <div class="flex">
        <van-nav-bar
                title="元气丹明细"
                left-arrow
                @click-left="closeWinDetail"
                class="header"
        />
        <section>
            <template>
			  <div>
			    <!--mescroll滚动区域的基本结构-->
			    <mescroll-vue class="mescroll header" ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
			      <!--内容...-->
                    <div>
                        <div class="top jianbian">
                            <p class="fontS_12">元气丹总数</p>
                            <h1 class="fontS_28"> {{info.maobi_balance}}</h1>
                        </div>
                        <div class="fa_list" style="padding:7px 14px;overflow-y: auto">
                            <div class="list flex_between" v-for="(v,index) in list" :key="index">
                                <div style="flex-shrink: 0">
                                    <div>
                                    </div>
                                </div>
                                <span style=";margin:0 10px -3px;display: block;color: #4a69ff">{{v.money}}</span>
                                <div style="width: 50%;text-align: center">
                                    <h1 >{{v.remark}}</h1>
                                </div>
                                <div style="text-align: right;width:40%">
                                    <p style=";color: #999">
                                        {{v.create_time}}</p>
                                </div>
                            </div>
                        </div>
                    </div>

			    </mescroll-vue>
			  </div>
			</template>
        </section>
    </div>
</template>
<script>
    import MescrollVue from 'mescroll.js/mescroll.vue'
    import "@/assets/js/iconfont/iconfont.css";
    import {Component, Vue} from 'vue-property-decorator';
    import {mixins} from 'vue-class-component'
    import common from "@/assets/js/common"
    import {Search, NavBar, List, PullRefresh} from 'vant';

    Vue.use(Search).use(NavBar).use(PullRefresh).use(List);
    import {taskinfo, maobi_list} from "@/assets/js/const"

    @Component({
        components: {
            MescrollVue
        }
    })
    export default class extends mixins(common) {

        mescroll = null;
        mescrollDown = {};
        mescrollUp = {
            callback: this.upCallback,
            page: {
                num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
                size: 20 //每页数据条数,默认10
            }
        }



        info = {};
        page = 0;
        list = [];
        // loading = false;
        // finished = false;
        mounted() {
            this.list = []
            this.getmaobi();
            this.getlist();
            if (api.pageParam.bgTab2 == 1) {
                this.addKeyback()
            }
        }


        mescrollInit (mescroll) {
            this.mescroll = mescroll  // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
        }
        upCallback (page, mescroll) {
            this.http(maobi_list, {page: page.num}).then(res => {
                if (res.code == 0) {
                    let arr = res.data.list === '' ? [] : res.data.list
                    if (page.num === 1) this.list = []
                    this.list = this.list.concat(arr)
                    this.$nextTick(() => {
                        mescroll.endSuccess(res.data.list.length, true)
                    })
                }
            }).catch((e) => {
                mescroll.endErr()
            })
        }



















        closeWinDetail() {
            if (api.pageParam.bgTab2 == 1){
                this.list = []
                this.tab1CloseExtend()
            } else{
                this.list = []
                this.close()
            }
            
        }
        getmaobi() {
            this.http(taskinfo).then(v => {
                this.info = v.data.info;
            })
        }
        // getlist() {
        //     this.http(maobi_list, {page: ++this.page}).then(v => {
        //         if (v.code == 0) {
        //             this.loading=false;
        //             if(v.data.list.length==0) {
        //                 this.finished=true;
        //             } else{
        //                 this.list = [...this.list, ...v.data.list];
        //             }
        //             // this.list = this.list.push(v.data.list)
        //         }
        //     })
        // }

    }
</script>

<style lang="scss">
    @import "@/assets/css/app.scss";

    [class*=van-hairline]::after {
        border: 0;
    }

    .top {
        text-align: center;
        color: white;
        padding: 30px 0;
        h1 {
            line-height: 50px;
        }

        p {
            line-height: 40px;
        }
    }

    .list {
        border: 0;
        // padding: 10px 0;
        height: 50px;

        & > div:first-child {
            width: 20px;
            height: 20px;
            background: #9eaefd;
            border-radius: 999px;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;

            div {
                width: 10px;
                height: 10px;
                background: #4a69ff;
                border-radius: 999px;

                &::before {
                    content: "";
                    display: block;
                    height: 100%;
                    width: 1px;
                    background-color: #F2F2F2;
                    position: absolute;
                    left: 50%;
                    top: -10px;
                    z-index: -1;

                }

                &::after {
                    content: "";
                    display: block;
                    height: 100%;
                    width: 1px;
                    background-color: #F2F2F2;
                    position: absolute;
                    left: 50%;
                    top: 20px;

                }
            }
        }
    }

    .fa_list .list:first-child div div {
        &::before {
            display: none;
        }
    }

    .fa_list .list:last-child div div {
        &::after {
            display: none;
        }
    }
    .mescroll {
        position: fixed;
        top: 44px;
        bottom: 0;
        height: auto;
    }
</style>
