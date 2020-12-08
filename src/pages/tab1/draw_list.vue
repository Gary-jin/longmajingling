<template>
    <div class="flex" >
        <van-nav-bar
                title="抽奖明细"
                left-arrow
                @click-left="close"
                class="header"
        />
        <section style="height: 100%">
            <Record type="cj"></Record>
        </section>
    </div>
</template>
<script lang="ts">
    import "@/assets/js/iconfont/iconfont.css";
    import {Component, Vue} from 'vue-property-decorator';
    import {mixins} from 'vue-class-component'
    import common from "@/assets/js/common"
    import Record from "@/components/record.vue";
    import {NavBar, List, Swipe, SwipeItem, PullRefresh} from 'vant';

    Vue.use(NavBar).use(PullRefresh).use(List).use(Swipe).use(SwipeItem);

    @Component({
        components: {
            PullRefresh,
            Record,
            Swipe, SwipeItem,
            List,
            NavBar,
        }
    })
    export default class extends mixins(common) {

    }
</script>

<style lang="scss">
    @import "@/assets/css/app.scss";
</style>
