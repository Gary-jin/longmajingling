<template>
<div>
  <van-nav-bar title="红包" left-arrow @click-left="close" class="header jianbian"/>
  <div v-show="sh_miao"  v-for="(item, index) in retRed" :key="index"
      class="flex_row_between  BB_1_f2f2f2" style="padding: .5rem 10px">
      <div class="flex_rowL">
          <img :src="requireimg(`hongbao_1`)" alt="" class="VWH_8 flex_shrink_0">
          <div class="flex_colT flex_items_start PL_3 ">
              <span class="fontS_16">{{item.title}}</span>
              <span class="fontS_12 color_666 PT_1">{{item.task_red_str1}}</span>
          </div>
      </div>
      <div class="flex_colT flex_items_end">
          <span @click="item.is_show===1 && gethb(index)"
              :class="item.is_show===1?'bg_F3274C':'bg_ccc'"
              class="color_fff PLR_3 PTB_1 B_radius_5 fontS_12">{{item.task_red_is_get==1?"已领取":"领取"}}</span>
          <span class="fontS_12 color_666 PT_1">{{item.task_red_str2}}</span>
      </div>
  </div>
  <van-popup class="hb" v-model="show" >
      <img :src="requireimg(`logo-200`)" alt="" style="width: 30%;height: auto;display: block;margin: 20px auto;border-radius:10px">
        <p class="fontS_16" style="text-align: center;color: white">龙马精灵</p>
        <p class="fontS_18" style="text-align: center;color: #FFE08D;margin:23% 0 0">给你发了一个随机红包(最高5元)</p>
      <img @click="ling" :src="requireimg(`ling`)" alt="" style="width: 30%;height: auto;display: block;margin: 20px auto;border-radius:10px">
      <p class="fontS_16" @click="tixian()" style="text-align: center;color: #FFE08D;margin:23% auto 0;border: 1px solid;width:80px;border-radius: 5px">可提现</p>
  </van-popup>
  <van-popup class="hb" v-model="show2" >
      <img :src="requireimg(`logo-200`)" alt="" style="width: 30%;height: auto;display: block;margin: 20px auto;border-radius:10px">
        <p class="fontS_16" style="text-align: center;color: white">龙马精灵</p>
        <p class="fontS_18" style="text-align: center;color: #FFE08D;margin:23% 0 0">给你发了一个随机红包(最高2元)</p>
      <img @click="ling" :src="requireimg(`ling`)" alt="" style="width: 30%;height: auto;display: block;margin: 20px auto;border-radius:10px">
      <p class="fontS_16" @click="tixian()" style="text-align: center;color: #FFE08D;margin:23% auto 0;border: 1px solid;width:80px;border-radius: 5px">可提现</p>
  </van-popup>
</div>
</template>
<script >
    import {Component, Vue} from 'vue-property-decorator';
    import {mixins} from 'vue-class-component'
    import common from "@/assets/js/common"
    import {NavBar, Tabbar, TabbarItem ,Overlay,Popup} from 'vant';
    import {userinfo,get_red} from "@/assets/js/const"
    Vue.use(Tabbar).use(TabbarItem).use(Overlay).use(NavBar).use(Popup);

    @Component
    export default class  extends mixins(common) {
      retRed=[
          {'title':'任务红包（最高5元）','sub_title':'完成邀请好友，签到，和喂猫','is_receive':1,is_show:"",task_red_str1:"",task_red_str2:""},
          {'title':'视频红包（最高2元）','sub_title':'当天看满15个视频','is_receive':1,is_show:"",task_red_str2:""}
      ]
      userinfo={};
      red_money=0;
      show = false;
      show2 = false;
      mounted() {
        this.getuserinfo()
      }
      getuserinfo() {
          this.http(userinfo).then(v=>{
            this.userinfo=v.data.info;
            this.retRed[0].is_show=this.userinfo.task_red_is_show;
            this.retRed[1].is_show=this.userinfo.video_red_is_show;

            this.retRed[0].is_receive=this.userinfo.task_red_is_get;
            this.retRed[1].is_receive=this.userinfo.video_red_is_get;

            this.retRed[0].task_red_str1=this.userinfo.task_red_str1;
            this.retRed[0].task_red_str2=this.userinfo.task_red_str2;

            this.retRed[1].task_red_str2=this.userinfo.video_red_str1;
          })
      }

      gethb(index) {
          this.http(get_red,{type:++index}).then(v=>{
              if(v.code==0){
                  this.show=true;
                  this.red_money=v.data.red_money;
                  this.getuserinfo()
              }else {
                  Toast(v.msg)
              };
          })

      }
      ling() {
        this.show=false;
        this.openWin(`tab3-ling`,{red_money:this.red_money})
      }
      tixian(){
        this.show=false;
        this.openWin('tab3-withdraw')
      }
    }
</script>

<style lang="scss">
    @import "@/assets/css/app.scss";
    .hb{
        text-align: center;
        background: url("../../assets/img/hb_bg.png") no-repeat;
        background-size: 100% 100%;
        height: 70%;
        width: 80%;
    }
    .van-search__content{
        border-radius: 30px;
    }
    .van-nav-bar__text{
        color: white;
    }
    [class*=van-hairline]::after{
        display: none;
    }
</style>
