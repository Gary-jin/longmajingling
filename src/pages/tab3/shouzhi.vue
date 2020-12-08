<template>

    <div class="flex">
        <van-nav-bar
                title="收支账单"
                left-arrow
                @click-left="close"
                class="header"
        />

        <section>
            <Record type="shouzhi"></Record>
        </section>

    </div>
</template>

<script lang="ts">
    import "@/assets/js/iconfont/iconfont.css";
    import {Component, Vue} from 'vue-property-decorator';
    import {mixins} from 'vue-class-component'
    import common from "@/assets/js/common"
    import { NavBar} from 'vant';
    import Record from "@/components/record.vue";

    Vue.use(NavBar);
    @Component({
        components:{Record}
    })
    export default class extends mixins(common) {

    }
</script>
<style lang="scss">
    @import "@/assets/css/app.scss";
    @import "@/assets/css/common.scss";

    .van-tab__pane {
        .list {
            border-bottom: 0;
            width: calc(100% - 120px);
        }

        border-bottom: 1px solid #ebedf0;
        padding: 12px;

        p {
            color: #999;
        }

        h1 {
            color: #101010;
        }
    }
</style>
