<template>
        <div>
                <van-nav-bar
                        title="分享海报"
                        left-arrow
                        @click-left="tab1CloseExtend"
                        class="header"
                />
                <img :src="info" alt="" style="width: 100%;height: auto;padding: 13px">
                <div style="position: fixed;bottom: 0;width: 100%;background-color:#F7F7F7 " class="flex_row_around">
                                <div @click="share(0)" class="flex_col_around fontS_12" style="margin: 10px 0 0">
                                        <img :src="requireimg(`wx`)" alt="" style="width: 35px;height: 35px;">
                                        <span style="margin: 10px 0">微信好友</span>
                                </div>
                                <div @click="share(1)" class="flex_col_around fontS_12" style="margin: 10px 0 0">
                                        <img :src="requireimg(`pyq`)" alt="" style="width: 35px;height: 35px;">
                                        <span style="margin: 10px 0">朋友圈</span>
                                </div>
                                <div  @click="share(2)" class="flex_col_around fontS_12" style="margin: 10px 0 0">
                                        <img :src="requireimg(`download`)" alt="" style="width: 35px;height: 35px;">
                                        <span style="margin: 10px 0">保存图片</span>
                                </div>
                </div>
        </div>
</template>
<script >
    import "@/assets/js/iconfont/iconfont.css";
    import {Component, Vue} from 'vue-property-decorator';
    import {mixins} from 'vue-class-component'
    import common from "@/assets/js/common"
    import Record from "@/components/record.vue";
    import {NavBar, List, Swipe, SwipeItem, PullRefresh,Toast} from 'vant';

    import {get_m_share_img} from '@/assets/js/const';


    Vue.use(NavBar).use(PullRefresh).use(List).use(Swipe).use(SwipeItem);

    @Component({
        components: {
            PullRefresh,
            Record,
            Swipe, SwipeItem,
            List,
            NavBar,
        }
    })
    export default class extends mixins(common) {
        info=''
        mounted() {
            this.http(get_m_share_img).then(v=>{
                this.info=v.data.info;
            })

            this.addKeyback()
        }

        share(index) {
            var inShare = api.require('inShare');

            let type="";
            switch (index) {
                 case 0:
                     type='wxFriend'
                     break;

                case 1:
                    type='wxCircle'
                     break;
                default:
                    api.download({
                        url: this.info,
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

                                        Toast('保存成功');
                                        api.hideProgress();

                                } else {
                                    Toast('保存失败')
                                }
                            });

                        } else {

                        }
                    });

                    return;


            }

            api.download({
                url: this.info,
                report: true,
                cache: true,
                allowResume: true
            }, (ret, err)=> {
                if (ret.state == 1) {
                    //下载成功
                        inShare.shareImgsTo({
                            imgPaths:ret.savePath,
                            sendPattern: 'ONLY',
                            app:type,
                        },function(ret,err){
                            /*if(ret.status){
                                alert(JSON.stringify(ret));
                            }else{
                                alert(ret.errorMessage);
                            }*/
                        });
                } else {

                }
            });
        }
    }
</script>

<style lang="scss">
    @import "@/assets/css/app.scss";

    .md::before{
        content: "";
        display: block;
        height: 0;
        border: 3px solid  transparent;
        border-bottom-color: rgba(226,103,157,1);
        position: absolute;
        top:-6px;
        left: 50%;
        margin-left: -2px;
        transform: translateX(-50%);
    }
    .sy{
        text-align: center;
        color: white;

        &>div{
            background-color:#2F9AFA ;
            width: 48%;
            border-radius: 5px;
        }
        &>div+div{
            background-color:#708EFC ;
        }
        h1{
            margin-top: 17px;
            line-height: 30px;
        }
        p{
            line-height: 35px;
        }
    }
    .zcm>div>*{
        width: 50%;
        text-align: center;
    }
</style>
