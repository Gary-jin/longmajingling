<template>
    <div class="flex">
        <van-nav-bar
                :title="title||'消息'"
                left-arrow
                @click-left="close"
                class="header"
        />
        <section style="background-color: #EEEEEE">
            <van-pull-refresh v-model="downLoading" @refresh="getlist" style="height: 100%">
                    <div class="list flex_between" v-for="v in list" @click="openWin('common-explain',{type:type,id:v.id})">
                        <img :src="v.img" alt="">
                        <h1 style="flex-grow: 1">{{v.title}}</h1>
                        <van-icon name="arrow" />
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
    import {Search, NavBar, List, PullRefresh, Toast,Icon } from 'vant';
    import {article_list} from "@/assets/js/const"

    Vue.use(Search).use(NavBar).use(PullRefresh).use(List).use(Icon);

    @Component
    export default class  extends mixins(common) {
        downLoading=false;
        upLoading=false;
        finished=false;
        type="sxy";
        title="";


        list=[];
        mounted() {
            this.type=api.pageParam.type;
            this.title=api.pageParam.title;
            this.getlist()
        }
        onRefresh() {
        }
        /*商学院列表*/
        getlist() {
            let param={
                type:this.type=="xx"?1:2
            }
            this.http(article_list,param).then(v=>{
                this.list=v.data.list;
                this.downLoading=false;
                if(v.code!=0)Toast(v.msg);
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

    .list{
        margin:5px 0;
        padding: 10px 16px;
        background-color: white;
        img:first-child{
            width: 50px ;
            height: 50px ;
            border-radius: 999px;
            margin-right: 10px;
        }
        & img:last-child {
            width: 30px;
            height: 32px;

        }
    }
</style>
