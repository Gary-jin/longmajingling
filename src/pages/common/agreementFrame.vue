<template>
    <div class="agreementBox bg_000_4">
        <div class="agreementBoxCore">
            <div class="Core_txtTop ">
                <!-- <div class="PLR_3" v-html="dataList"></div> -->
                <div class="textC fontS_22 ">服务协议与隐私政策</div>
                <div>
                    请你务必审慎阅读，充分理解“服务协议”和“隐私政策”各条款，包括但不限于：为了向你提供即时通讯，内容分享等服务，我们需要收集你的设备信息，操作日志等个人信息。你可以在“设置”中查看，变更，删除个人信息并管理你的授权。
                </div>
                <div>
                    你可阅读 <span @click="openWin('common-explain',{title:'服务协议',type:'about',type_:1,})" style="color: #006fc4;">《服务协议》</span>和 <span @click="openWin('common-explain',{title:'隐私协议',type:'about',type_:5,})" style="color: #006fc4;">《隐私政策》</span>了解详细信息。如你同意，请点击“同意”开始接受我们的服务。
                </div>
            </div>
            <div class="Core_Btn PLR_10 fontS_16">
                <div @click="cancel">暂不使用</div>
                <div @click="confirm">同意</div>
            </div>
        </div>
    </div>
    
</template>
<script>
    import "@/assets/js/iconfont/iconfont.css";
    import {Component, Vue, Watch} from 'vue-property-decorator';
    import {mixins} from 'vue-class-component'
    import common from "@/assets/js/common"

    import {getArticles} from "@/assets/js/const";
    import {Dialog} from 'vant';


    Vue.use(Dialog);
    @Component
    export default class  extends mixins(common) {
        showdialog = false;
        dataList = api.pageParam.name

        mounted() {
            // this.agreement()
            // alert(2)
            // alert(JSON.stringify(this.dataList))
        }

        confirm(){
            this.setStorage('agreement',"false");
            this.setStorage('firstRegister',"true");
            // alert(this.getStorage('agreement'))
            // api.closeFrame()
            this.openWin('common-login');
        }
        cancel(){
            api.closeWidget({
                id: 'A6043885498010',
                retData: {
                    name: 'closeWidget'
                },
                animation: {
                    type: 'flip',
                    subType: 'from_bottom',
                    duration: 500
                },
                silent:true
            });
        }
             // 用户协议弹窗
        

    }
</script>

<style lang="scss">
    @import "@/assets/css/app.scss";
    // @import "@/assets/css/common.scss";
    .agreementBox{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba( #000000, 0.8);

    }
    .agreementBoxCore{
        width: 80%;
        height: 40%;
        background: #ffffff;
        border-radius: 15px;
    }
    .Core_txtTop{
        width: 100%;
        height: 80%;
        padding: 15px;
    }
    .Core_Btn{
        width: 100%;
        height: 20%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        >div:nth-child(1){
            color: red;
        }
        >div:nth-child(2){
            color: #006fc4;
        }
    }
</style>
