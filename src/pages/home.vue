<template>
        <van-tabbar class="vanTabbar" active-color="#4a69ff" v-model="active" :safe-area-inset-bottom=true @change="change">
            <van-tabbar-item v-for="(v,index) in navArr" :key="index">
                <img :src="requireimg(active==index?v.active:v.normal)" alt="" style="width:18px;height: 18px">
                {{v.title}}
            </van-tabbar-item>
            <van-overlay :show="show" />
        </van-tabbar>
</template>
<script >
    import {Component, Vue} from 'vue-property-decorator';
    import {mixins} from 'vue-class-component'
    import common from "@/assets/js/common"
    import { Tabbar, TabbarItem ,Overlay} from 'vant';
    import {getArticles,get_is_display} from "@/assets/js/const";
    Vue.use(Tabbar).use(TabbarItem).use(Overlay);

    @Component
    export default class  extends mixins(common) {
        active= 0;
        show= false;
        vanTabbarHeight = ''; //底部高度
        navArr=[
            {
                title:'首页',
                normal:"tab0-0",
                active:"tab0-1"
            },
            {
                title:'游戏',
                normal:"tab1-0",
                active:"tab1-1"
            },
            {
                title:'任务',
                normal:"tab2-0",
                active:"tab2-1"
            },
            {
                title:'我的',
                normal:"tab3-0",
                active:"tab3-1"
            }

        ]
            shangjia = false

        mounted() {
            api.sendEvent({name: 'tab0now'});
            this.safeAreaed()
            // 上架隐藏
            this.concealed()
            this.getSdAuth();
            this.funIniGroup();
            // this.agreement()
            api.addEventListener({
                name: 'home'
            }, (ret) =>{
                this.change(+ret.value)
            });

            api.addEventListener({
                name: 'shadow'
            }, (ret) =>{
                if(api.systemType=='ios'){
                    this.show=ret.value==true;
                }else{
                    this.show=ret.value=='true';
                }
            });

            this.exitApp();

            if(!this.sh_miao){
                this.navArr=[
                    {
                        title:'首页',
                        normal:"tab0-0",
                        active:"tab0-1"
                    },
                    {
                        title:'我的',
                        normal:"tab3-0",
                        active:"tab3-1"
                    }
                ]
            }

        }

         // 底部安全区域适配
        safeAreaed(){
            if(api.safeArea.bottom!='0'){
                this.vanTabbarHeight = document.querySelector(".vanTabbar").offsetHeight + api.safeArea.bottom
                // document.querySelector(".vanTabbar").style.bottom = api.safeArea.bottom + "px"
            } else{
                this.vanTabbarHeight = document.querySelector(".vanTabbar").offsetHeight
            }
    
        }

        concealed() {
            let sysType;
            if(api.systemType == 'ios'){
                sysType = {type:'ios'}
            } else{
                sysType = ''
            }
            this.http(get_is_display,sysType).then(res => {
                if(res.data.is_display == false ) {
                    this.shangjia = true
                    this.navArr=[
                        {
                            title:'首页',
                            normal:"tab0-0",
                            active:"tab0-1"
                        },
                        // {
                        //     title:'游戏',
                        //     normal:"tab1-0",
                        //     active:"tab1-1"
                        // },
                        // {
                        //     title:'任务',
                        //     normal:"tab2-0",
                        //     active:"tab2-1"
                        // },
                        {
                            title:'我的',
                            normal:"tab3-0",
                            active:"tab3-1"
                        }
                    ]
                }
            })
        }

    //    agreement() {
    //         // alert(this.getStorage('agreement'))
    //         if ( !this.getStorage('agreement') ) {
    //             this.http(getArticles,{type: '5'}).then(res => {
    //                 // alert(JSON.stringify(res.data))
    //                 api.openFrame({
    //                     name: 'common-agreementFrame',
    //                     url: './common-agreementFrame.html',
    //                     rect: {
    //                         x: 0,
    //                         y: 0,
    //                         w: 'auto',
    //                         h: 'auto'
    //                     },
    //                     pageParam: {
    //                         name: res.data.info
    //                     }
    //                 });
    //             })
    //         }
    //     }
        getSdAuth () {
            var has = this.hasPermission(['storage']);
            if (!has || !has[0] || !has[0].granted || !has[1] || !has[1].granted) {
                this.reqPermission(['storage']);
            }
        }

         hasPermission(one_per) {
            var rets = api.hasPermission({
                list: one_per
            });
            return rets;
        }

         reqPermission(perms, callback) {

            api.requestPermission({
                list: perms,
                code: 100001
            }, function (ret, err) {
                if (ret.list[0].granted) {

                } else {
                    api.closeWidget({
                        silent: true,
                    });
                }
            })

        }

        change(active) {
            this.active=active;

            if(this.shangjia){
                if (active==1) {
                    api.sendEvent({
                        name: 'tab2',
                        extra: 0
                    });
                }else if (active==2) {
                    api.sendEvent({
                        name: 'tab3',
                        extra: 0
                    });
                } else {
                    api.sendEvent({
                        name: 'tab0',
                        extra: 0
                    });
                }
            } else {
                api.sendEvent({
                    name: 'tab'+active,
                    extra: 0
                });
            }


            api.setFrameGroupIndex({
                name: "group",
                index: this.sh_miao?active:active==1?3:0
            });

            //  关闭banner 广告
            api.execScript({
                frameName: "tab1",
                script: "vm.$refs.page.hideBannerAD()"
            });
            api.execScript({
                frameName: "tab2",
                script: "vm.$refs.page.hideBannerAD()"
            });

            //游戏页面背景音效
            if (active!=1) {
                this.setStorage('isGqHc','false')
                api.execScript({
                    frameName: "tab1",
                    script: "vm.$refs.page.bgSoundPause()"
                });
            } else{
                this.setStorage('isGqHc','true')
                api.execScript({
                    frameName: "tab1",
                    script: "vm.$refs.page.bgSoundOpen()"
                });
            }
        }

        //载入frame组
        funIniGroup(){
            var frames = [];
                for (var i = 0; i < 4; i++) {
                    if(this.getStorage('yincang') == 'false') {
                        if (i==1){
                            i = 3
                        } else if(i==2){
                            i = 2
                        } else{
                            i = i
                        }
                    }
                    frames.push({
                        name: 'tab'+i,
                        url: 'tab'+i+'.html',
                        bounces:false,
                        reload:true,
                        bgColor: '#fff',
                        pageParam: {HH:this.vanTabbarHeight}
                    })
                }
            api.openFrameGroup({
                name: 'group',
                scrollEnabled: false,
                rect: {
                    x: 0,
                    y: 0,
                    w: api.winWidth,
                    h: api.winHeight - this.vanTabbarHeight
                },
                index: 0,
                preload:3,
                frames: frames
            }, function () {});
        }
    }
</script>

<style lang="scss">
    @import "@/assets/css/app.scss";
    .van-tabbar {
      height: 53px;
    }
    .van-tabbar-item__text{
        display: flex;
        flex-flow: column;
        justify-content: space-between;
        height: 40px;
        margin-top: -11px;
        & img{
            margin: auto;
        }
    }
</style>
