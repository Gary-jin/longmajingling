<template>
    <div>
        <van-nav-bar
                title="实名信息"
                left-arrow
                @click-left="close"
                @click-right="submit"
                right-text="确认"
                class="header"
        />
        <section>
            <input v-model="realname" type="text" placeholder="请填写真实姓名">
            <input v-model="sfz" type="text" placeholder="身份证号">
        </section>
    </div>
</template>

<script>
    import "@/assets/js/iconfont/iconfont.css";
    import {Component, Vue} from 'vue-property-decorator';
    import {mixins} from 'vue-class-component'
    import common from "@/assets/js/common"
    import {setsmrz} from "@/assets/js/const"
    import { NavBar,Toast} from 'vant';
    Vue.use(NavBar);

    @Component
    export default class extends mixins(common) {
        realname=''
        sfz=''

        submit(){
            api.sendEvent({
                name: 'tab3',
                extra: 0
            });
            if(!this.realname)return Toast("请输入真实姓名");
            if(!this.sfz)return Toast("请输入身份证号");

            let param={
                realname:this.realname,
                sfz:this.sfz
            }
            this.http(setsmrz,param).then(v=>{
                Toast(v.msg)
                if(v.code==0){
                    api.sendEvent({
                        name: 'tab3',
                        extra: 0
                    });
                    api.sendEvent({
                        name: 'tab1',
                        extra: 0
                    });
                    setTimeout(this.close,1000)
                }
            })
        }
    }
</script>
<style lang="scss">
    @import "@/assets/css/app.scss";
    input{
        line-height: 50px;
        border-bottom: 1px solid #E6E6E6;
        width: 100%;
        padding-left: 10px;
    }
    .van-nav-bar__text{
        color: white;
    }
    section{
        padding: 12px;
    }
</style>
