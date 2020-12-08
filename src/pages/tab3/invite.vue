<template>

    <div class="flex">
        <van-nav-bar
                title="邀请分享"
                left-arrow
                @click-left="close"
                @click-right="save"
                right-text="保存图片"
                class="header"
        />
        <section>
            <div class="swiper-container">
                <div class="swiper-wrapper" >
                    <div v-for="(v,index) in info.thumb" :key="index" class="swiper-slide" style="width: 80%">
                        <img :src="v"  alt="" style="height:auto;margin: auto;display: block">
                        <!-- <img :src="require(v)" alt="" style="height:auto;margin: auto;display: block"> -->
                    </div>

                </div>
                <!-- Add Pagination -->
                <div class="swiper-pagination"></div>
            </div>


            <van-divider style="width: 60%;margin:20px auto; color: #101010">邀请规则</van-divider>
            <div class="list" style="margin-bottom: 100px">
                <p v-for="(v,i) in info.rule" :key="i">{{v}}</p>
            </div>
        </section>
        <div class="bottom">
            <div @click="invite"  class=" MLR_auto W_100 B_radius_10 fontS_13" style="color:#FFFFFF;background-color:#999" >
                分享邀请链接
            </div>
            <div @click="invite_img" class="color_fff MLR_auto W_100 lmjl_btn_bg  B_radius_10 fontS_13" >
                分享邀请海报
            </div>
        </div>

    </div>
</template>

<script >
    import "@/assets/js/iconfont/iconfont.css";
    import "swiper/css/swiper.min.css";
    import {Component, Vue,Prop} from 'vue-property-decorator';
    import {mixins} from 'vue-class-component'
    import common from "@/assets/js/common"
    import {qrcodeInfo} from "@/assets/js/const"
    import Swiper from "swiper"

    import {Swipe,Toast, SwipeItem,Panel, NavBar, List, PullRefresh, NoticeBar, Button, Divider, Icon,Tab, Tabs,Popup} from 'vant';
    Vue.use(Swipe).use(Toast).use(SwipeItem).use(Button).use(NavBar).use(PullRefresh).use(List).use(NoticeBar).use(Panel).use(Divider).use(Icon).use(Tab).use(Tabs).use(Popup);
    @Component
    export default class invite extends mixins(common) {
        info={};
        mounted() {
            var swiper = new Swiper('.swiper-container', {
                effect: 'coverflow',
                grabCursor: true,
                centeredSlides: true,
                slidesPerView: 'auto',
                coverflowEffect: {
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows : true,
                },
                autoplay:true,
                observer:true, //修改swiper自己或子元素时，自动初始化swiper
                observeParents:true,//修改swiper的父元素时，自动初始化swiper
                pagination: {
                    el: '.swiper-pagination',
                },
            });


            if (this.getStorage('inviteLiseNow')) {
                this.info = this.getStorage('inviteLiseNow')
            } else {
                this.http(qrcodeInfo).then(v=>{
                    this.info=v.data;
                })
            }

        }

        save() {
            api.showProgress({
                title: '',
                text: '正在保存',
                modal: true
            });
            var that=this
            var length=-1;
            function aa(){
                var a=that.info.thumb[++length];
                api.download({
                    url: a,
                    report: true,
                    cache: true,
                    allowResume: true
                }, (ret, err)=> {
                    if (ret.state == 1) {
                        //下载成功
                         api.saveMediaToAlbum({
                            path: ret.savePath,
                            groupName:"龙马精灵"
                        }, (ret)=> {
                            if (ret && ret.status) {
                                if(length>=that.info.thumb.length-1){
                                    Toast('保存成功');
                                    api.hideProgress();

                                }else{
                                    aa();
                                }
                            } else {
                                Toast('保存失败')
                            }
                        });

                    } else {

                    }
                });
            }
            aa()
        }
        invite() {

            //todo 微信链接分享

            var inShare = api.require('inShare');
            inShare.shareTextTo({
                content:this.info.copy_url,
                sendPattern:'ONLY',
                app:'wxFriend',
            },function(ret,err){
                if(ret.status){
                    // alert(JSON.stringify(ret));
                }else{
                    // alert(ret.errorMessage);
                }
            });
        }
        invite_img() {
            var inShare = api.require('inShare');
            var that=this
            var length=-1;
            var path=[]
            function aa(){
                var a=that.info.thumb[++length];
                var name = 'fs://' + a.substring(a.lastIndexOf('/')+1).replace('?','');
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
                        if(length>=that.info.thumb.length-1){
                            // alert(path.join(','))
                            inShare.shareImgsTo({
                                imgPaths:path.join(','),
                                sendPattern: 'ALL',
                                app:'wxFriend',
                            },function(ret,err){
                                if(ret.status){
                                    // alert(JSON.stringify(ret));
                                }else{
                                    // alert(ret.errorMessage);
                                }
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
    @import "@/assets/css/common.scss";
    @import "@/assets/css/app.scss";
    .van-divider--hairline::after, .van-divider--hairline::before{
        background-color: #333;
    }
    .van-divider--hairline::after, .van-divider--hairline::after{
        background-color: #333;
    }
    .list{
        padding: 0 20px;
        line-height: 30px;
        border-bottom: 0;
        p{
            color: #101010;

        }
    }
    .van-nav-bar__text{
        color: white;
    }
    .bottom{
        width: 100%;
        position: fixed;
        bottom: 0;
        background-color: white;
        border-top: 1px solid #E9E9E9;
        display: flex;
        justify-content: space-around;
        div{
            padding:5px 15px;
            width: 47%;padding:3px 26px;line-height:37px;border-radius: 100px;text-align: center;
            margin:10px;
        }
    }
</style>
