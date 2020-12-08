// @ts-nocheck
import {Component, Vue, Prop} from 'vue-property-decorator'
import axios from "axios"
import {Toast} from "vant";
// Send a POST request
import {ImgVerify,sendMsg,advert} from "@/assets/js/const"

declare interface http {
    url:string,
    data?:object,
    type?:any,
}

@Component
export default  class  extends Vue {
    sh_miao: boolean = true;/*显示猫圈*/

    finished: boolean = false;/*列表加载*/
    fnSendMsgText:string="获取验证码";
    dtsend:boolean=false;/*是否能发送短信 默认能*/


    uploading:boolean=false;/*上拉*/
    downloading:boolean=false;/*下拉*/
    finished:boolean=false;/*下拉结束*/
    
    chuanshanjiaAds = api.require("chuanshanjiaAds");
    tencentAds = api.require("tencentAds");
    CSJjlspId = '945491845'; //穿山甲测试广告位id    激励视频 
    bannerId = '945491842'; //穿山甲 bannerID

    // 优量汇 视频广告ID
    tencentvideoId_Android  = '1001232463033927'; 
    tencentvideoId_iOS = ''


    videoKind = '0'  //视频种类 0穿山甲 1优量汇  2两条联播


    //视频种类开关
    mounted(){
        this.http(advert).then((res)=>{
            if(res.code == 0){
                if(res.data.switch == 0){
                    this.videoKind = '0'
                } else if (res.data.switch == 1) {
                    this.videoKind = '1'
                } else if (res.data.switch == 2) {
                    this.videoKind = '2'
                }
            }
        })
    }
    //激励视频广告  
    videoLsit(way){
        var that = this;
        if(that.videoKind == '0'){
            that.showChuanshanjiaAd().then(suc=>{
                that.sendGame(way)
            })
        } else if (that.videoKind == '1') {
            that.showTencentAD().then(suc=>{
                that.sendGame(way)
            })
        } else {
            that.loadLbVideoAD(way)
        }
    }

    // 视频结束 发送事件
    sendGame(way){
        api.sendEvent({
            name: "videoEndWay",
            extra: {
                type: way
            }
        });
    }
    // 激励视频穿山甲
    showChuanshanjiaAd(rename,num,uid,callback) {
        let that = this;
        api.showProgress({
            title: "正在加载中",
            text: "请稍后...",
            modal: true
        });
        return new Promise((resolve, reject) => {
            that.chuanshanjiaAds.init(function(ret, err) {
                if (ret) {
                    that.chuanshanjiaAds.showRewardVideoAd({
                        adId: that.CSJjlspId ,//竖屏 (激励视频代码位id：945078817)
                        // rewardName: rename ? rename : "", //"gold",
                        // rewardAmount: num ? Number(num) : 0, //1
                        // userID: uid ? uid : ""
                    },
                    function(res, err) {
                            api.hideProgress();
                            if (res.eventType === "onVideoComplete" || res.eventType === "onAdClose") {
                                resolve(res.eventType);
                            }
                            // callback(res, err);
                    })
                } else {
                    api.hideProgress();
                    that.toast(JSON.stringify(err));
                }
            })
        });
    }
    // 激励视频优量汇
    showTencentAD(callback) {
        let that = this;
        let videoid;
        if (api.systemType == "ios") {
            videoid = that.tencentvideoId_iOS;
        } else {
            videoid = that.tencentvideoId_Android;
        }
        api.showProgress({
            title: "正在加载中",
            text: "请稍后...",
            modal: true
        });
        return new Promise((resolve, reject) => {
            that.tencentAds.loadRewardVideoAD({
                volumeOn: true,
                rewardVideoID: videoid
            },function(ret, err) {
                if (ret.status == "onVideoCached") {
                    api.hideProgress();
                    that.tencentAds.showRewardVideoAD();
                } else if (ret.status == "overdue") {
                    //失效
                    that.showTencentAD();
                } else if(ret.status == "onADClose" || ret.status == "onVideoComplete"){
                    resolve(ret.status);
                } else {
                    // callback(ret, err);
                }
                }
            );
        });
    }
    // 视频轮播
    loadLbVideoAD(way) {
        let that = this;
        let timer;
        let flag = true;
        //穿山甲 => 之后 优量汇
        that.showChuanshanjiaAd().then(res => {
            // alert(JSON.stringify(res));
            if (res === "onVideoComplete") {
                timer = setTimeout(() => {
                    that.showTencentAD().then(res => {
                        flag = false;
                        that.sendGame(way);
                    });
                }, 1000);
            }
            if (res === "onAdClose") {
                if (flag) {
                    clearTimeout(timer);
                    that.showTencentAD().then(res => {
                        that.sendGame(way);
                    });
                }
            }
        });
    }

    //横幅广告
    showBannerAD(type, offsetHeight,callback) {
        let that = this;
        if (that.videoKind == 0) {
            that.chuanshanjiaAds.init(function(ret, err) {
                if (ret) {
                    that.chuanshanjiaAds.showBanner({
                            adId: that.bannerId,
                            rect: {
                                x: 0,
                                y: api.winHeight -
                                    api.winWidth / 6.667 - offsetHeight,
                                // y: 100,
                                w: api.winWidth,
                                h: 0
                            },
                            fixedOn: "tab" + type,
                            fixed: false
                        },
                        (ret, err) => {
                            if (ret && ret.eventType == "ADH_bannerDidClick") {
                                this.hideBannerAD();
                            } else if (ret && ret.eventType == "onDownloadPaused") {
                                this.hideBannerAD();
                            } else if (ret && ret.eventType == "onDownloadFinished") {
                                this.hideBannerAD();
                            } else if (ret && ret.eventType == "DislikeOnSelected") {
                                this.hideBannerAD();
                            } else {
                                callback(ret, err);
                            }
                        }
                    );
                }
            });
        } else {
            this.tencentAds.showBanner({
                    x: 0,
                    y: api.winHeight -
                        api.winWidth / 6.667 -offsetHeight,
                    fixedOn: "tab" + type,
                    fixed: true
                },
                (ret, err) => {
                    callback(ret, err);
                    if (ret.status === 'close') {
                        that.hideBannerAD();
                    }
                    // TODO 同穿山甲广告模块一样加上回调方法
                }
            );
        }
    }
    // //关闭横幅广告
    // hideBannerAD() {
    //     // TODO 需要加上穿山甲，优量汇横幅广告类型判断
    //     let that = this;
    //     if (that.videoKind === 1) {
    //         that.tencentAds.closeBanner();
    //     } else {
    //         that.chuanshanjiaAds.init(function(ret, err) {
    //             if (ret) {
    //                 that.chuanshanjiaAds.closeBanner({}, function(ret, err) {});
    //             }
    //         });
    //     }
    // }

    /*点击图片更换验证码*/
    Imgcg() {
        this.$refs.Imgcg.src=ImgVerify;
    }
    //关闭应用
     exitApp() {
        api.addEventListener({
            name: 'keyback'
        }, function (ret, err) {
            
            api.toast({
                msg: '再按一次退出' + api.appName,
                duration: 2000,
                location: 'bottom'
            });

            api.addEventListener({
                name: 'keyback'
            }, function (ret, err) {
                // api.execScript({
                //     frameName: "tab1",
                //     script: "vm.$refs.page.bgSoundOpen()"
                // });
                
                api.closeWidget({
                    id: 'A6043885498010',
                    retData: {name: 'closeWidget'},
                    silent: true
                });

            });

            setTimeout(function () {
                exitApp();
            }, 3000)
        });
    }

    // 监听物理返回
    addKeyback() {
        var that = this;
        api.addEventListener({
            name: 'keyback'
        }, function(ret, err) {
            that.close()
            that.openTab1Sound()
        });
    }
    // 游戏页面相关返回
    tab1CloseExtend() {
        this.close()
        this.openTab1Sound()
    }
    //打开游戏页面背景音效
    openTab1Sound() {
        api.sendEvent({ name: "openTab1Sound" });
    }

    sendmsg(reg:string) {
        if(this.dtsend==true)return ;
        this.dtsend=false;
        if(!this.phone) return Toast('请输入正确的手机号');
        if(!this.picCode)return Toast('请输入图形验证码');
        if(!this.dtsend){
            var num=120;
            let param={
                mobile:this.phone,
                picCode:this.picCode,
                type:reg
            }
            this.http(sendMsg,param).then(v=>{
                  console.log(v)
                 Toast(v.msg)
                 if(!v.code=="0"){
                     this.Imgcg()
                }else{
                    this.dtsend=true;
                    this.time_=setInterval(()=>{
                        if(num<2){
                            this.fnSendMsgText="获取验证码";
                            this.dtsend=false;
                            return clearInterval(this.time_)
                        }
                        this.fnSendMsgText=--num+"秒"
                    },1000)
                    return
                };
            })

        }
    }


    openWin(name:string, pageParam?:object, option?:object) {
        option = Object.assign({
            name: name,
            url: name + '.html',
            useWKWebView: true,
            pageParam: pageParam || {},
            allowEdit: true,
            animation:{
                type:"movein",
                subType:"from_right",       //动画子类型（详见动画子类型常量）
                duration:400                //动画过渡时间，默认300毫秒
            }
        }, option || {});
        this.$ac.openWin(option);
    }
    toPage(name:string, pageParam?:object, option?:object) {
        option = Object.assign({
            name: name,
            url: name + '.html',
            useWKWebView: true,
            pageParam: pageParam || {},
            allowEdit: true,
            animation:{
                subType:"from_right",       //动画子类型（详见动画子类型常量）
                duration:100                //动画过渡时间，默认300毫秒
            }
        }, option || {});
        api.openWin(option);
    }

    //关闭window
    closeWin(name?:string, animation?:object) {
       /* if(name.target){
            return api.closeWin();
        }*/
        api.closeWin({
            name: name || '',
            animation: animation || {
                type: "fade",
                duration: 300 //动画过渡时间，默认300毫秒

            }
        });
    } //关闭window

    close() {
        api.closeWin();
    }

    requireimg(imgname:string){
        return require(`@/assets/img/${imgname.trim()}.png`)
    }

     //获取系统权限后执行fn
     getSystemAuth (str, fn) {
        var that = this;
        if (this.isAuth(str)) {
            fn && fn.call(this);
        } else {
            api.confirm(
                {
                    title: "提示",
                    msg: "此操作需要获取相应系统权限,是否允许?",
                    buttons: ["确定", "取消"]
                },
                function (ret, err) {
                    if (ret.buttonIndex === 1) {
                        requestPermission(str);
                    } else {
                        api.toast({
                            msg: "您拒绝了相应系统权限申请",
                            duration: 2000,
                            location: "bottom"
                        });
                    }
                }
            );
        }

        function requestPermission(str) {
            str &&
            api.requestPermission(
                {
                    list: [str],
                    code: 1
                },
                function (ret, err) {
                    console.log(JSON.stringify(ret));
                    if (that.isIos) {
                        api.addEventListener(
                            {
                                //回到app时触发 解决ios 授权完成授权状态没有改变的问题
                                name: "resume"
                            },
                            function (res, err) {
                                fn && fn.call(that);
                                this.getSystemAuth(str, fn);
                                api.removeEventListener({
                                    name: "resume"
                                }); //移除事件监听
                            }
                        );
                    } else {
                        if (ret.list[0].granted) {
                            fn && fn.call(that);
                        } else {
                            api.confirm(
                                {
                                    title: "提示",
                                    msg:
                                        "您拒绝了系统权限请求,这样将不能使用相关服务,是否手动开启?",
                                    buttons: ["确定", "取消"]
                                },
                                function (ret, err) {
                                    if (ret.buttonIndex === 1) {
                                        requestPermission(str);
                                    }
                                }
                            );
                        }
                    }
                }
            );
        }
    }





   /* http(http:http){
       /!* var key = getKey(); //生成随机key

        var rsa = RSA(key); //生成对key 进行加密

        let params = AESEnc(key, JSON.stringify(http.params)); //对传入的参数进行加密*!/
       /!* var tokenInfo = this.getStorage('tokenInfo');
        // return new Promise(function (resolve, reject) {
            axios({
                method: http.type||'post',
                url:http.url,
                headers:{
                    'Content-Type': 'application/json;charset=utf-8',
                    'token': "11"
                },
                data:http.data
            }).then(a=>{
                console.log(a)
            })*!/
        // })




        api.showProgress({
            title: '努力加载中',
            text: '请稍后...',
            modal:  true
        });

        // params = params || {};
        // var that = this;
        // console.log(JSON.stringify(params));
        // var key = getKey(); //生成随机key

        // var rsa = RSA(key); //生成对key 进行加密

        // params = AESEnc(key, JSON.stringify(params)); //对传入的参数进行加密
        // console.log(JSON.stringify(key));
        // console.log(JSON.stringify(rsa));
        // console.log(JSON.stringify(params));

        var tokenInfo = localStorage.getItem('tokenInfo');
        var headers = {
            'Content-Type': 'application/json;charset=utf-8',
            'token': tokenInfo && tokenInfo.token ? tokenInfo.token : ''
        };
        // console.log(JSON.stringify(headers));

        return new Promise(function (resolve, reject) {
            api.ajax({
                url: url,
                method: method || 'post',
                headers: headers,
                // timeout: 60,
                data: {
                    body: param.param
                }
            }, function (ret:object, err:object) {
                api.hideProgress();
                console.log('当前页面打开方式: ' + (api.frameName.length ? 'frame' : 'window'));
                console.log('当前页面文件名: ' + (api.frameName.length ? api.frameName : api.winName));
                console.log(JSON.stringify(url));
                console.log(JSON.stringify(err));

                if (ret) {
                    ret.data = JSON.parse(AESDec(key, ret.data)); //解密

                    console.log(JSON.stringify(ret));

                    // if (ret.code == 403) {
                    //     that.rmStorage('tokenInfo');
                    //     api.sendEvent({
                    //         name: 'tokenInfoEvent'
                    //     });
                    //     that.openWin('common-login', {}, {
                    //         slidBackEnabled: false
                    //     });
                    // }

                    resolve(ret);
                } else {
                    api.toast({
                        msg: '操作失败,请检查网络状态! 错误码:' + err.statusCode,
                        duration: 2000,
                        location: 'bottom'
                    }); // reject(err);
                }
            });
        });
    }*/
}