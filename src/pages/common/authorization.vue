<template>
    <div >
        <van-nav-bar
                title="授权"
                left-arrow
                @click-left="close"
                class="header"
        />
    </div>
</template>
<script >

    import {Component,Vue} from 'vue-property-decorator';
    import {mixins} from 'vue-class-component'
    import { NavBar, RadioGroup, Radio, Toast } from 'vant';
    import common from "@/assets/js/common"

    Vue.use(NavBar).use(Radio).use(RadioGroup).use(Toast);

    @Component
    export default class index extends mixins(common) {
        info={}
        url=''
        title=''

        mounted() {
            if(api.systemType == 'ios'){
                this.openWin('common-popadUrl',{webUrl:api.pageParam.url})
            } else {
                var browser = api.require('webBrowser');
                browser.openView({
                    url: api.pageParam.url,
                    rect: {
                        x: 0,
                        y: document.querySelector('.header').clientHeight,
                        w: 'auto',
                        h: 'auto'
                    }
                }, function (ret, err) {
                    // console.error(JSON.stringify(ret))
                    if (ret.url) {
                        if (ret.url.indexOf('http://yichao2.vmall99.com/api/qudao/back_bind') >= 0) {
                            setTimeout(function () {
                                api.closeWin({
                                    // name: 'win_name'
                                });
                            }, 1000);
                        }
    
                    }
                });
            }


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
</style>
