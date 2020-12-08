<template>

    <div class="flex">
        <van-nav-bar
                title="找回订单"
                left-arrow
                @click-left="close"
                class="header"
        />
        <section style="padding-bottom: 50px">
            <img src="@/assets/img/find.png" alt="" style="width: 65px;height: 65px;margin: 25px auto;display: block">
            <div style="padding: 0 20px" class="con">
                <p>第一步：由于淘宝官方规范市场，用户必须完成淘宝账号
                    授权才可以自动获取佣金，请尽快完成授权</p>
                <div @click="shouquan" class="login MLR_auto MT_4 flex_rowC W_100 bg_F3CB7B PTB_4 B_radius_10 fontS_13" >去淘宝授权</div>
                <p style="margin: 20px 0 8px;">第二步：未获得佣金的订单需手动找回才可获</p>
                <div class="login MLR_auto  flex_rowC W_100 bg_F3CB7B PTB_4 B_radius_10 fontS_13" style="position:relative;background-color: white;background-image: initial;border: 1px solid #E51C23">
                    <input v-model="order" type="text" placeholder="    输入淘宝订单编号">
                    去淘宝授权
                    <div @click="find_order" class="login MLR_auto  W_100 bg_F3CB7B  B_radius_10 fontS_13" style="position: absolute;top:50%;transform:translateY(-50%);right: 2px;width: auto;padding:0 26px;line-height:38px" >
                        找回
                    </div>
                </div>
            </div>
            <div style="text-align: center;height: auto;margin: 30px auto">
                <img src="@/assets/img/find_order.jpg" alt="" style="width:95%;height:auto;margin: 10px auto;display: block">
            </div>
            <div style="padding: 0 20px" class="gz">
                <h1>查询规则：</h1>
                <p v-for="v in rule"> {{v}}</p>
            </div>
        </section>

    </div>
</template>

<script>
    import "@/assets/js/iconfont/iconfont.css";
    import {Component, Vue} from 'vue-property-decorator';
    import {mixins} from 'vue-class-component'
    import common from "@/assets/js/common"
    import { NavBar,Toast} from 'vant';

    import {get_find_order_rule,find_order} from "@/assets/js/const";

    Vue.use(NavBar);

    @Component
    export default class extends mixins(common) {
        rule=[]
        order=""
        mounted() {
           this.getrule();
        }

        shouquan() {
            this.http('http://taoqimao.vmall99.com/api/Qudao/index').then(res=>{
                if (res.code == 0) {
                    if(res.data.child_code==22){
                        this.openWin('common-authorization',{'url': res.data.url})
                    }else if(res.data.child_code==11){
                        Toast("已授权")
                    }
                }
            })
        }
        getrule() {
            this.http(get_find_order_rule).then(v=>{
                this.rule=v.data;
            })
        }
        find_order() {
            if(this.order=="")return Toast("请输入订单编号");
            this.http(find_order,{order_no:this.order}).then(v=>{
                // this.rule=v.data;
                Toast(v.msg);
            })
        }
    }
</script>
<style lang="scss">
    @import "@/assets/css/app.scss";
    @import "@/assets/css/common.scss";
    p{
        color:#101010;
    }
    .gz{
        h1{
            color: #333333;
            line-height: 25px;
        }
        p{
            color: #999;
            line-height: 24px;
        }
    }
    .con{
        .login{
            border-radius: 222px;
        }
        input{
            font-weight: initial;
        }
        line-height: 22px;
        font-weight: bold;
    }
</style>
