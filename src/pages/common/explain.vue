<template>

    <div>
        <van-nav-bar
                :title="page.title?page.title:'提现说明'"
                left-arrow
                @click-left="closeWinDetail"
                class="header"
        />

        <!-- <div class="header flex_shrink_0 flex_rowC BT_2 PB_2 bg_fff BB_1_f2f2f2">
            <span
                @click="closeWin()"
                class="absolute PL_2 iconfont iconfanhui fontS_16"
                style="left: 0;"
            ></span>
            <span class="fontS_16 font_weight_bold">{{page.title?page.title:'提现说明'}}</span>
        </div> -->

        <!--游戏攻略-->
        <div v-if="page.type=='yxgl'" v-html="info" style="padding: 14px">
            {{info}}
        </div>
        <!--转盘规则-->
        <div v-else-if="page.type=='yxgz'" v-html="info" style="padding: 14px">
            {{info}}
        </div>
        <!--关于我们-->
        <div v-else-if="page.type=='about'" v-html="info" style="padding: 14px">
        </div>
        <!--挑战规则-->
        <div v-else-if="page.type=='tzgz'" v-html="info" style="padding: 14px 14px 14px 28px">
        </div>
        <!--商学院  公告-->
        <div v-else-if="page.type=='xx'||page.type=='sxy'" v-html="info" style="padding: 14px">
        </div>
        <!--挑战规则-->
        <div v-else-if="page.type=='txsm'" v-html="info" style="padding: 14px 14px 14px 28px"></div>
        <div v-else>
            <explain type="tixian"></explain>
        </div>
    </div>
</template>

<script>
    import "@/assets/js/iconfont/iconfont.css";
    import {Component, Vue,Prop} from 'vue-property-decorator';
    import {mixins} from 'vue-class-component'
    import common from "@/assets/js/common"
    import explain from "@/components/explain.vue";
    import {Panel, NavBar, List, PullRefresh, NoticeBar, Button, Divider, Icon} from 'vant';
    Vue.use(Button).use(NavBar).use(PullRefresh).use(List).use(NoticeBar).use(Panel).use(Divider).use(Icon);
    import {get_articles,article_info} from '@/assets/js/const';

    @Component({
        components: {
            explain
        }
    })
    export default class extends mixins(common) {
        info=""
        page=api.pageParam;
        @Prop(String) title;
        mounted() {
            if (api.pageParam.bgTab2 == 1) {
                this.addKeyback()
            }
            switch (this.page.type) {
                case 'about':
                    this.http(get_articles,{type:this.page.type_}).then(v=>{
                        this.info=v.data.info;
                    })
                    break;
                case 'yxgl':
                case 'tzgz':
                case 'txsm':
                    this.http(get_articles,{type:this.page.type_}).then(v=>{
                        this.info=v.data.info;
                    })
                    break;
                case 'xx':
                case 'sxy':
                    this.page.title='详情';
                    this.http(article_info,{id:api.pageParam.id}).then(v=>{
                        this.info=v.data.info;
                    })
                    break;
            }
        }
        closeWinDetail() {
            if (api.pageParam.bgTab2 == 1){
                this.tab1CloseExtend()
            } else(
                this.close()
            )
        }
    }
</script>
<style lang="scss">
    @import "@/assets/css/app.scss";
</style>
