<template>
    <div >
        <van-nav-bar
                title="分享"
                left-arrow
                @click-left="close"
                class="header"
        />
        <div class="overflow_hidden flex_grow_1 W_85 MLR_auto">
            <div class="overflow_y flex_grow_1">
                <div class="W_100">
                    <div class="P_4 flex_row_between fontS_13">
                        <span>分享文案</span>
                        <span  v-clipboard:copy="shareInfo.text"
                               v-clipboard:success="copy"
                               v-clipboard:error="copyerr" class="color_ff604a">复制淘口令</span>
                    </div>
                    <div class="P_4 bg_eee color_666 fontS_12" id="shareText">
                        <p>{{shareInfo.goods_name}}</p>
                        <p class="PT_4">【在售价】{{shareInfo.price}}元</p>
                        <p class="PT_4">【券后价】{{shareInfo.spe_price}}元</p>
                        <p class="PT_3">--------------</p>
                        <!--<p class="marginB5"> 复制这条信息 <span id='tkl'>2314qwewq</span>，打开【手机淘宝】即可查看</p>-->
                        <p>{{shareInfo.text}}</p>
                    </div>
                </div>

                <div class="W_100 flex_between PTB_2 PL_2 ">
                    <div style="width:33%">
                        <div   class="relative W_100" v-for="(item,index) in shareInfo.images" :key="index" v-if="index==0" @click='imgS(item)'>
                            <van-checkbox v-model="item.check" style="position: absolute;top:3px;right: 5px"></van-checkbox>
                            <img :src="item.img" class="W_100 H_100 object_fit_cover"/>
                        </div>
                    </div>

                    <div style="width: 66%" class="flex_row_left flex_wrap">
                        <div style="width: 24vw;height: 24vw" class="relative PR_2 PB_2" v-for="(item,index) in shareInfo.images" :key="index" v-if="index>0&&index<5" @click='imgS(item)'>
                            <van-checkbox v-model="item.check" style="position: absolute;top:3px;right: 5px"></van-checkbox>
                            <img :src="item.img" class="W_100 H_100 object_fit_cover"/>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 分享 -->
            <div v-if="shareInfo.images!=''" class="B_radius_20 textC W_90 MLR_auto MTB_3 PTB_4 lmjl_btn_bg color_fff" @click='shareImage()'>立即分享</div>
        </div>
    </div>
</template>
<script>

    import {Component,Vue} from 'vue-property-decorator';
    import {mixins} from 'vue-class-component'
    import {NavBar, RadioGroup, Checkbox, Toast} from 'vant';
    import common from "@/assets/js/common"
    import {get_share_info} from "@/assets/js/const"
    //复制到粘贴板插件
    import VueClipboard from 'vue-clipboard2'
    VueClipboard.config.autoSetContainer = true
    Vue.use(NavBar).use(Checkbox).use(RadioGroup).use(VueClipboard);

    @Component
    export default class index extends mixins(common) {
        sharepics=[]
        img=[]

        itemId=''
        type=''
        shareInfo= {
            "images": [],
            "goods_name": "",
            "price": "",
            "spe_price": '',
            "tkl": '',
            "text": ""
        }//分享信息

        mounted() {
            let param={
                itemId:api.pageParam.itemId,
                type:api.pageParam.type,
            }
            this.http(get_share_info,param).then(v=>{
                if (v.code == 0) {
                    this.shareInfo=v.data.info;
                    this.shareInfo.images=this.shareInfo.images.map((v,i)=>{
                            return {
                                img:v,
                                check:false
                            }
                    })
                    // alert(JSON.stringify(  this.shareInfo))
                } else {
                    Toast(v.msg)
                }
               
            })
        }

        copy() {
            Toast('复制成功')
        }
        copyerr() {
            Toast('复制失败')
        }

        //选择分享照片
        imgS (item) {
            if (item.check) {
                item.check = false
            } else {
                item.check = true
            }
        }

        //立即分享
        shareImage () {
            var a=this.shareInfo.images.some(v=>v.check)
            if(a){
                this.img=[]
                this.shareInfo.images.map(v=>v.check?this.img.push(v.img):"")

                this.invite_img()
            }else{
                Toast('请选择分享图片')
            }
        }
        invite_img() {
            var inShare = api.require('inShare');
            var that=this
            var length=-1;
            var path=[]
            function aa(){
                var a=that.img[++length];
                var name = 'fs://' + a.substring(a.lastIndexOf('/') + 1);
                api.download({
                    url: a,
                    savePath: name,
                    report: true,
                    cache: true,
                    allowResume: true
                }, (ret, err)=> {
                    if (ret.state == 1) {
                        path.push(name)
                        //下载成功
                        if(length>=that.img.length-1){

                            inShare.shareImgsTo({
                                imgPaths:path.join(','),
                                sendPattern: 'ALL',
                                // app:'wxFriend',
                            },function(ret,err){
                                /*if(ret.status){
                                    alert(JSON.stringify(ret));
                                }else{
                                    alert(ret.errorMessage);
                                }*/
                            });
                        }else{
                            aa();
                        }
                    } else {

                    }
                });
            }
            aa()
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
    .box{
        border: 1px solid #DBDBDB;
    }
    .flex_row_left img{
        margin-right: 17px;
    }
    input{
        line-height: 45px;
        padding:0px 10px ;
    }
    input::placeholder{
        color: #999!important;
    }

    body {
        background: #FDF9F8;
    }
    .tgs_i_item {
        width: 8rem;
        height: 8rem;
        min-width: 8rem;
        min-height: 8rem;
        margin-right: 0.416rem;
    }
    .pdd_goods_share .common_radio {
        position: absolute;
        right: 1rem;
        top: 0.416rem;
        display: inline-block;
        background: #fff;
    }

    .pdd_goods_share  .common_radio.on::before {
        left: 0.45rem;
    }

    .rps_widget {
        position: fixed;
        margin: auto;
        bottom: 10px;
        left: 0;
        right: 0;
        padding: 1rem 0;
        width: 90%;
        text-align: center;
        color: white;
        background: linear-gradient(to right , #FFC462, #FD8D2A);
        border-radius: 25px;
    }
    .rps_widget p{
        margin: 1rem 0;
    }
    .rps_widget>div {
        margin-bottom: 1rem;
    }
    .rps_widget img {
        width: 4rem;
        height: 4rem;
        margin: 0 1rem;
    }
    .tgs_imgList {
        width: 100%;
        overflow: scroll;
    }

    .taoCommond-imgs > div {
        width: 48%;
    }
    .tc_i_right {
        align-items: flex-start;
        height: auto;
    }
    .tc_i_right >div{
        width: 100%;
    }
    .tc_i_right >div{
        width: 48%;
    }
    .taoCommond-info p {
        margin: 0;
        font-size: 1.2rem;
        color: #999;
    }
    .common_submit_btn {
        position: absolute;
    }
    .none {
        display: none;
    }

</style>
