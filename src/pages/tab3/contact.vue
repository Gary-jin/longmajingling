<template>
    <div class="flex" style="position: relative;">
        <van-nav-bar
                title="联系我们"
                left-arrow
                @click-left="close"

                class="header jianbian"
        />
        <section  class="MT_2">
            <div style="padding:10px 14px">
                <div class="flex_row_between PTB_3 " :key="i" style="padding:10px 0" v-for="(v,i) in list">
                    <div>
                        <span style="width:75px;display: inline-block;margin-right:6px" class="fontS_14">{{v.name}}:</span>
                        <span class="fontS_14 tag-read">{{v.text}}</span>
                    </div>
                    <div class="flex_colT flex_items_end">
                        <span v-clipboard:copy="v.text" 
                            v-clipboard:success="copy" 
                            v-clipboard:error="copyerr"
                            class="color_fff PLR_3 PTB_1 B_radius_5 fontS_14 lmjl_btn_bg color_fff" >复制</span>
                    </div>
                </div>
            </div>
        </section>

    </div>
</template>
<script >
    import "@/assets/js/iconfont/iconfont.css";
    import {Component,Vue} from 'vue-property-decorator';
    import {mixins} from 'vue-class-component'
    import common from "@/assets/js/common"
    import { Search,NavBar, List,PullRefresh,NoticeBar,Toast} from 'vant';

    import {contact_us} from "@/assets/js/const";
    //复制到粘贴板插件
    import VueClipboard from 'vue-clipboard2'
    VueClipboard.config.autoSetContainer = true
    Vue.use(VueClipboard)
    Vue.use(Search).use(NavBar).use(PullRefresh).use(List).use(NoticeBar);




    @Component
    export default class contact extends mixins(common) {

        list=[{
            name:"客服QQ",
            text:"2132"
        },{
           name:"客服微信",
            text:"2132"
        },{
           name:"客服电话",
            text:"2132"
        },{
           name:"客服邮箱",
            text:"2132"
        },{
           name:"微信公众号",
            text:"2132"
        }]
        copy(){

            Toast("复制成功")

        }
        copyerr(){
            Toast("复制成功")

        }
        mounted(){
            this.http(contact_us).then(v=>{
                this.list[0].text=v.data.qq;
                this.list[1].text=v.data.wechat;
                this.list[2].text=v.data.phone;
                this.list[3].text=v.data.email;
                this.list[4].text=v.data.qq;
                this.list[5].text=v.data.wechat_gzh;
            })
        }
    }
</script>

<style lang="scss">
    @import "@/assets/css/common.scss";
    @import "@/assets/css/app.scss";
    .van-search__content{
        border-radius: 30px;
    }
    .van-nav-bar__text{
        color: white;
    }
    [class*=van-hairline]::after {
        display: none;
    }
    .lh{
        padding: 6px 14px;
        line-height: 37px;
        .icon_right span{
            color: #999;
        }
    }
</style>
