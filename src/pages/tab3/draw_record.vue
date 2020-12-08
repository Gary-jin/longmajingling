<template>
    <div class="flex" style="position: relative;">
        <van-nav-bar
                title="提现记录"
                left-arrow
                @click-left="close"
                class="header jianbian"
        />
        <section style="position: relative;padding-bottom:50px;height: 100%">
                <record ></record>
        </section>

    </div>
</template>
<script >
    import "@/assets/js/iconfont/iconfont.css";
    import {Component, Vue} from 'vue-property-decorator';
    import {mixins} from 'vue-class-component'
    import common from "@/assets/js/common"
    import record from "@/components/record.vue";
    import {Panel, NavBar, List, PullRefresh, NoticeBar, Button, Divider, Icon} from 'vant';
    import {withdraw_list} from "@/assets/js/const";

    Vue.use(Button).use(NavBar).use(PullRefresh).use(List).use(NoticeBar).use(Panel).use(Divider).use(Icon);

    @Component({
        components: {
            record,
        }
    })
    export default class extends mixins(common) {
        // list=[{
        //     "str1": "支付宝提现",
        //     "str2": "(佣金部分)",
        //     "create_time": "2019-09-11 20:38:49",
        //     "price": "9.70",
        //     "status_text": "待审核",
        //     "reason": "dfdf"
        // }]
        list = []
        created() {
            this.http(withdraw_list).then(v=>{
                this.list=v.data.list;
            })
        }
    }
</script>

<style lang="scss">
    @import "@/assets/css/app.scss";
    @import "@/assets/css/common.scss";

    .van-search__content {

        border-radius: 30px;
    }

    .van-nav-bar__text {
        color: white;
    }

    [class*=van-hairline]::after {
        display: none;
    }

    .icon_right:before {
        position: relative;
        top: 4px;
    }

    .average_3 > h1 {
        width: 33.33333%;
        p {
            margin-top: 7px;
        }
    }

    .average_3 > h1 + h1 {
        border-left: 1px solid #F2F2F2;
    }

    .list {
        border-bottom: 1px solid #ebedf0;
        padding: 6px 0;

        p {
            line-height: 23px;
            color: #999999;
        }

        h1 {
            line-height: 23px;
            color: #333;
        }

        div:nth-child(2) {
            color: red;
        }
    }
    h1 {
        line-height: 45px;
        font-size: 16px;
    }
    .flex_between {
        button {
            margin-top: 7px;
            width: 32%;
            border-radius: 5px;
        }
    }
</style>
