<template>

    <div>
        <van-nav-bar
                title="我的订单"
                left-arrow
                @click-left="close"
                class="header"
        />
        <record ></record>
    </div>
</template>

<script lang="ts">
    import "@/assets/js/iconfont/iconfont.css";
    import {Component, Vue,Prop} from 'vue-property-decorator';
    import {mixins} from 'vue-class-component'
    import common from "@/assets/js/common"
    import record from "@/components/record.vue";
    import {Panel, NavBar, List, PullRefresh, NoticeBar, Button, Divider, Icon} from 'vant';
    Vue.use(Button).use(NavBar).use(PullRefresh).use(List).use(NoticeBar).use(Panel).use(Divider).use(Icon);

    @Component({
        components: {
            Button,
            record,
            Divider,
            PullRefresh,
            Icon,
            NoticeBar,
            List,
            Panel,
        }
    })
    export default class extends mixins(common) {
        @Prop(String) type?: string
    }
</script>
<style lang="scss">
    @import "@/assets/css/app.scss";
    @import "@/assets/css/common.scss";
</style>
