<template>
    <div class="flex" style="position: relative;">
        <van-nav-bar
                title="设置"
                left-arrow
                @click-left="close"
                class="header jianbian"
        />

        <section style="height: 100%;padding-top: 15px">
            <div style="padding: 0 14px">
                <div class="flex_row_between PTB_3 BB_1_f2f2f2" style="padding:10px 0">
                    <div class="flex_rowL W_100">
                        <img @click="changehead" :src="userinfo.headImg||requireimg(`logo-200`)" alt="" class="VWH_8 flex_shrink_0" style="width: 60px;height: 60px;border-radius: 666px">
                        <div class="flex_colT flex_items_start PL_3 W_100">
                            <span class="fontS_16 text_overflow_1 W_80" style="font-weight: bold">{{userinfo.nickname}}</span>
                            <span class="fontS_12 color_666 PT_1">邀请码：{{userinfo.number||'******'}}</span>
                        </div>
                    </div>
                    <div class="flex_colT flex_items_end">
                           <!-- <span class="color_fff PLR_3 PTB_1 B_radius_5 fontS_14 " style="border:1px solid;color: #FF292E">编辑</span> -->
                    </div>
                </div>
            </div>

            <div @click="openWin('tab3-safety')" class="flex_row_between PTB_3 BB_1_f2f2f2 lh" style="border-bottom:7px solid #DFDFDF">
                <div class="flex_rowL">
                    <span class="fontS_14 PL_3">账号与安全</span>
                </div>
                <i class="iconfont icon_right">
                    <span style="float: left;vertical-align: 3px"></span>
                </i>

            </div>
            <div @click="openWin('common-explain',{title:'关于龙马精灵',type:'about',type_:3,})" class="flex_row_between PTB_3 BB_1_f2f2f2 lh">
                <div class="flex_rowL">
                    <span class="fontS_14 PL_3">关于龙马精灵</span>
                </div>
                <i class="iconfont icon_right">
                    <span style="float: left;vertical-align: 3px"></span>
                </i>

            </div>
            <div @click="update" class="flex_row_between PTB_3 BB_1_f2f2f2 lh">
                <div class="flex_rowL">
                    <span class="fontS_14 PL_3">版本更新</span>
                </div>
                <i class="iconfont icon_right">
                    <span style="float: left;vertical-align: 3px;">{{update_info.update?"需更新":version}}</span>
                </i>

            </div>
            <div @click="clear" class="flex_row_between PTB_3 BB_1_f2f2f2 lh" style="border-bottom:7px solid #DFDFDF">
                <div class="flex_rowL">
                    <span class="fontS_14 PL_3">清除缓存</span>
                </div>
                <i class="iconfont icon_right">
                    <span style="float: left;vertical-align: 3px">{{huancun}}M</span>
                </i>
            </div>

            <div @click="quit" class=" MLR_auto MT_20 flex_rowC W_100 lmjl_btn_bg color_fff PTB_4 B_radius_max fontS_13" style="width: 70%">退出登录</div>
        </section>

        <!-- poput -->
         <van-popup position="bottom"  v-model="headerPopup" style="width:100%;padding: 20px;height:180px;background:none;">
            <div @click="putHead('library')" class="bg_fff textC PTB_3 fontS_16 B_radius_5 ">从相册选择一张</div>
            <div @click="captureImage('camera')" class="bg_fff textC PTB_3 fontS_16 B_radius_5 MT_2">拍照</div>
            <div @click="headerPopup = false" class="bg_fff textC PTB_3 fontS_16 B_radius_5 MT_8">取消</div>
        </van-popup>

    </div>
</template>
<script >
    import "@/assets/js/iconfont/iconfont.css";
    import {Component,Vue} from 'vue-property-decorator';
    import {mixins} from 'vue-class-component'
    import common from "@/assets/js/common"
    import { Search,NavBar, List,PullRefresh,NoticeBar,Toast,Popup} from 'vant';
    import {userinfo,headimg,logout,get_is_display} from '@/assets/js/const';

    Vue.use(Search).use(NavBar).use(PullRefresh).use(List).use(NoticeBar).use(Popup);



    @Component
    export default class  extends mixins(common) {
        userinfo={}
        huancun=0

        update_info={};
        version=0
        headerPopup=false
        mounted() {
            var mam = api.require('mam');
            mam.checkUpdate((ret, err)=>{
                if (ret) {
                  this.update_info=ret.result
                }
            });
            this.version=api.appVersion
            this.getuserinfo();
            this.gethuancun()

            api.addEventListener({
                name: 'tab3-setting'
            },()=>this.getuserinfo());

        }
        quit(){

            this.http(logout).then(v=>{
                if(v.code==0){
                    this.yincang()
                    
                }else{
                    Toast('登出失败')
                }
            })

        }
        // 上架隐藏
        yincang () {
            var that = this;
            let sysType;
            if(api.systemType == 'ios'){
                sysType = {type:'ios'}
            } else{
                sysType = ''
            }
            this.http(get_is_display,sysType).then(function(res) {
                if (res.code == 0) {
                    that.clearStorage()
                    that.setStorage('yincang',res.data.is_display)
                    that.setStorage('agreement',"false");
                    that.openWin('common-login');
                } else{
                    that.clearStorage()
                    that.setStorage('agreement',"false");
                    that.openWin('common-login');
                }
            })
        }
        getuserinfo() {
            this.http(userinfo).then(v=>{
                this.userinfo=v.data.info;
            })
        }

        gethuancun() {
            api.getCacheSize((ret)=>{
                var size = ret.size;
                this.huancun=(size/1024/1024).toFixed(2)
            });
        }
        clear() {
            api.clearCache(()=>{
                api.toast({
                    msg: '清除完成'
                });
                this.gethuancun()
            });
        }
        changehead() {
            this.headerPopup = true
        }

        putHead (val) {
            api.getPicture({
                sourceType: val,
                encodingType: 'jpg',
                mediaValue: 'pic',
                destinationType: 'base64',
                allowEdit: true,
                quality: 100,
                saveToPhotoAlbum: false
            }, (ret) =>{
                if (ret.data!='') {
                    this.http(headimg,{avatar:ret.base64Data}).then(v=>{
                        if(v.code==0){
                            this.headerPopup = false
                            this.userinfo.headImg=v.data.avatar;
                            api.sendEvent({
                                name: 'tab3-setting',
                                extra: 0
                            });
                            Toast("更换成功")
                        }
                    })
                }
            });
        }

        captureImage(way) {
            this.getSystemAuth("camera", function() {
                this.putHead(way)
            });
        }

        //检查更新
        update () {
            api.showProgress({
                title: '努力检查中...',
                text: '先喝杯茶...',
                modal: false
            });
            var mam = api.require('mam');
            mam.checkUpdate(function (ret, err) {
                api.hideProgress();
                if (ret.status) {
                    console.log(JSON.stringify(ret))
                    var result = ret.result;
                    if (result.update == true && result.closed == false) {
                        var str = '新版本型号:' + result.version + ';\n 更新提示语:' + result
                            .updateTip + ';\n发布时间:' + result.time;
                        api.confirm({
                            title: '有新的版本,是否下载并安装 ',
                            msg: str,
                            buttons: ['确定', '取消']
                        }, function (ret, err) {
                            if (ret.buttonIndex == 1) {
                                if (api.systemType == "android") {
                                    api.download({
                                        url: result.source,
                                        report: true
                                    }, function (ret, err) {
                                        if (ret && 0 == ret.state) {
                                            /* 下载进度 */
                                            api.toast({
                                                msg: "正在下载应用" +ret.percent +"%",
                                                duration: 2000
                                            });
                                        }
                                        if (ret && 1 == ret.state) {
                                            /* 下载完成 */
                                            var savePath = ret.savePath;
                                            api.installApp({
                                                appUri: savePath
                                            });
                                        }
                                    });
                                }
                                if (api.systemType == "ios") {
                                    api.openWin({
                                        name: 'iosUrl',
                                        url: result.source,
                                        useWKWebView: true,
                                    });
                                }
                            }
                        });
                    }else {
                        api.alert({
                            msg: "暂无更新"
                        });
                    }
                } else {
                    api.alert({
                        msg: "暂无更新"
                    });
                }
            });
        }
    }
</script>

<style lang="scss">
    @import "@/assets/css/app.scss";
    @import "@/assets/css/common.scss";
    .van-search__content{

        border-radius: 30px;
    }
    .van-nav-bar__text{
        color: white;
    }
    [class*=van-hairline]::after {
        display: none;
    }
    .fontS_14{
        font-weight: 500;
        color: #101010;
    }
    .lh{
        padding: 6px 14px;
        line-height: 37px;
        .icon_right span{
            color: #999;
        }
    }
</style>
