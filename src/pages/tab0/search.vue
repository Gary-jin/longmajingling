<template>
    <div >
        <van-nav-bar
                right-text="搜索"
                left-arrow
                @click-left="close"
                @click-right="toPage('tab0-searchList',{'word':value})"
                class="header"
        >
            <template v-slot:title >
                <van-search placeholder="请输入搜索关键词" v-model="value"  @search="toPage('tab0-searchList',{'word':value})"/>
            </template>
        </van-nav-bar>


        <!--历史搜索-->
        <div class="P_5">
            <div class="flex_row_between PB_5">
                <div class="flex_between">
                    <p class="PL_1">历史记录</p>
                </div>
                <img @click="del" v-if="list.list.length>0" :src="requireimg(`del`)" alt="" style="width: 17px;">
            </div>
            <div class="flex_row_left flex_wrap fontS_14">
                <div v-for="(item,index) in list.list" :key="index" class="fontS_10 B_1_eeeeee B_radius_15 PTB_2 PLR_4 MR_5 MB_5 color_666" @click="toPage('tab0-searchList',{'word':item})">{{item}}</div>
            </div>
        </div>

        <!--热门搜索-->
        <div class="P_5">
            <div class="flex_row_left PB_5">
                <p class="PL_1">大家都在搜</p>
            </div>
            <div class="flex_row_left flex_wrap fontS_14">
                <div v-for="item in list.hot_list" :key="index" class="fontS_10 B_1_eeeeee B_radius_15 PTB_2 PLR_4 MR_5 MB_5 color_666" @click="toPage('tab0-searchList',{'word':item})">{{item}}</div>
            </div>
        </div>
    </div>
</template>
<script >

    import {Component,Vue} from 'vue-property-decorator';
    import {mixins} from 'vue-class-component'
    import common from "@/assets/js/common"
    import { Search,NavBar,Icon,Toast} from 'vant';
    import {get_search_history_list,del_search_history} from "@/assets/js/const"


    Vue.use(Search).use(NavBar).use(Icon );
    @Component
    export default class index extends mixins(common) {
        list={ };
        value="";
        mounted() {

            api.addEventListener({
                name: 'search'
            },()=>this.getuserinfo());

            this.getuserinfo()

        }

        getuserinfo() {
            this.http(get_search_history_list).then(v=>{
                this.list=v.data;
            })
        }

        del() {
            this.http(del_search_history).then(v=>{
                if(v.code==0){
                    Toast('删除成功')
                }
                this.getuserinfo();
            })
        }
    }
</script>

<style lang="scss">
    @import "@/assets/css/app.scss";
    @import "@/assets/css/common.scss";
    .cansend{
        background: #FF2A2E;
        color: white;
    }
    .dtsend{
        background: #CCCCCC;
        color: white;
    }
    .van-nav-bar__title{
        min-width: 65%;
    }
    .box{
        border: 1px solid #DBDBDB;
    }
    .van-search{
        box-sizing: border-box;
        border-radius: 30px;
        height: 30px;
        overflow: hidden;
        margin-top:10px;
        background-color: initial;
    }
    .van-nav-bar__title, .van-nav-bar .van-icon{
        color: #999;
    }
    .van-icon{
        margin-top:6px;
        color: white!important;
    }
    .van-icon-search{
        color: #999!important;
    }
    .flex_row_left img{
        margin-right: 17px;
    }
    input{
        line-height: 35px;
    }
    .van-nav-bar__text{
        color: white;
    }
    .van-search__content{
        background-color: white;
    }
</style>
