<template>
    <div class="flex" style="position: relative;">
        <van-nav-bar
                title="挑战明细"
                left-arrow
                @click-left="close"
                class="header"
        />
        <section style="height: 100%">

            <div style="position: absolute;top: 0;background-image: linear-gradient(to bottom,#3F65FF,#1179FF );height:160px;width: 100%;z-index: -1">

            </div>
            <div class="top"  style="display: flex;justify-content: space-around;text-align: center">
                <div>
                    <p>{{info.total_out}}</p>
                    <p>投入(元)</p>
                </div>
                <div>
                    <p>{{info.total_in}}</p>
                    <p>收入(元)</p>
                </div>
                <div>
                    <p>{{info.dk_days}}</p>
                    <p>参与(天)</p>
                </div>
                <div>
                    <p>{{info.dk_success_days}}</p>
                    <p>成功(天)</p>
                </div>
            </div>
            <div class="title_0" style="margin:40px 0;">
                <div>
                    <h1 style="font-size: 17px;font-weight:bold;line-height: 20px;margin: -10px auto -20px">我的战绩</h1>
                </div>
            </div>
            <div class="list1" v-if='list.length!=0'>
                <div>
                    <div class="W_30 textC">时间</div>
                    <div class="W_25 textC">挑战金额</div>
                    <div class="W_25 textC">打卡结果</div>
                    <div class="W_20 textC">返还金额</div>
                </div>
            </div>
        <van-pull-refresh v-model="isLoading" @refresh="getlists">
                    <div class="list" v-for="v in list" :key="v">
                        <div>
                            <div class="text_overflow_1 W_30 textC">{{v.create_time}}</div>
                            <div class="text_overflow_1 W_25 textC">{{v.total_in}}</div>
                            <div class="text_overflow_1 W_25 textC">{{v.str}}</div>
                            <div class="text_overflow_1 W_20 textC" style="color:#99C0FF ">{{v.money}}</div>
                        </div>
                    </div>
            </van-pull-refresh>
        </section>

    </div>
</template>
<script >
    import "@/assets/js/iconfont/iconfont.css";
    import {Component,Vue} from 'vue-property-decorator';
    import {mixins} from 'vue-class-component'
    import common from "@/assets/js/common"
    import {Search, NavBar, List, PullRefresh, Toast} from 'vant';
    Vue.use(Search).use(NavBar).use(PullRefresh).use(List);
    import {tiaozhan_list} from '@/assets/js/const';

    @Component
    export default class  extends mixins(common) {
        page=1;
        info={}
        list=[]
        mounted() {
           this.getlists();

            api.addEventListener({
                name: 'scrolltobottom',
                extra: {
                    threshold: 3 //设置距离底部多少距离时触发，默认值为0，数字类型
                }
            },()=>{
                this.morelist();
            });
        }
        getlists() {
            this.http(tiaozhan_list,{page:this.page}).then(v=>{
                this.info=v.data.info;
                this.list=v.data.list;
                // alert(JSON.stringify(v))
            })
        }
        morelist() {
            this.http(tiaozhan_list,{page:++this.page}).then(v=>{
                if(v.data.list.length==0){
                    Toast('没有更多了');
                }
                this.list=[...this.list,...v.data.list];
            })
        }
    }
</script>

<style lang="scss">
    @import "@/assets/css/app.scss";
    @import "@/assets/css/common.scss";
    .van-search__content{

        border-radius: 30px;
    }
    .van-nav-bar__text{
        color: white;
    }
    .van-nav-bar{
        background: transparent;
    }
    .top{
        color: white;
        &>div{
            margin-top: 20px;
        }
        & p{
            line-height: 30px;
            font-size: 25px;
        }
        & p+p{
            font-size: 14px;
        }
    }
    .list1{
        &>div{
            display: flex;
            justify-content: space-between;
            line-height: 30px;
            padding: 0 20px;
            font-weight: bold;
            color: #999;
        }
    }
    .list{
        &>div{
            display: flex;
            justify-content: space-between;
            line-height: 30px;
            padding: 0 20px;
            border-bottom: 1px solid #EFEFEF;
            // font-weight: bold;
            color: #999;
        }
    }
    [class*=van-hairline]::after{
        display: none;
    }
</style>
