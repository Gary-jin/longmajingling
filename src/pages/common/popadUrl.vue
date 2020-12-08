<template>
    <div class="flex" >
        <van-nav-bar
                title=""
                left-arrow
                @click-left="close"
                class="header"
        />
        <section style="height: 100%">
            <iframe :src="webUrl" class="W_100 H_100"></iframe>
        </section>
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
        webUrl=api.pageParam.webUrl;
        mounted() {
          // alert(this.webUrl)
        }
    }
</script>
<style lang="scss">
    @import "@/assets/css/app.scss";
</style>
