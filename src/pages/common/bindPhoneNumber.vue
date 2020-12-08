<template>
	<div style="height:100vh;" class="flex_colT flex_items_stretch bg_fff">
     <van-nav-bar
        title="绑定手机号" left-arrow @click-left="close" class="header" />

		<div style="height:100vh;" class="flex_grow_1 PLR_6">
			<div class="PT_8">
				<p class="fontS_22">绑定您的手机号</p>
				<span class="color_666 fontS_12 PT_2">欢迎进入龙马精灵生态系统</span>
			</div>
			<div class="PT_8">
        <div class="BB_1_f2f2f2 PT_8 flex_rowL flex_items_end">
				  <input v-model="mobile" type="number" class="flex_grow_1 PB_2 fontS_14" placeholder="请输入手机号码" />
        </div>
				<div class="BB_1_f2f2f2 PT_4 flex_rowL flex_items_end">
					<input v-model="picCode" type="text" class="flex_grow_1 PB_2 fontS_14" placeholder="请输入图形验证码" />
					<!-- <img @click="$asyncComputed.imgCodeUrl.update()" :src="imgCodeUrl" alt="" class="VW_20 flex_shrink_0 MTB_2" /> -->
          <img ref="Imgcg" @click="Imgcg" :src="ImgVerify" alt="" class="VW_25 flex_shrink_0 " />
        </div>
				<div class="BB_1_f2f2f2 PT_8 flex_rowL flex_items_end">
					<input v-model="msgcode" type="text" class="flex_grow_1 PB_2 fontS_14" placeholder="请输入验证码" />
					<span @click="fnAuthSendMsg" :class="downCountShow ? ' lmjl_btn_bg' : 'bg_ccc'" class="color_fff PTB_2 PLR_5 B_radius_5 flex_shrink_0 MB_1">{{ fnSendMsgText }}</span>
				</div>
				<div class="BB_1_f2f2f2 PT_8 flex_rowL flex_items_end">
          <input v-model="number" type="text" class="flex_grow_1 PB_2 fontS_14" placeholder="邀请码(非必填)" />
        </div>
			</div>
			<div @click="bindWX" :class="mobile && msgcode ? 'lmjl_btn_bg' : 'bg_ccc'" class="fontS_18 W_90 PTB_2 MLR_auto MT_40 textC B_radius_5 color_fff">
				完善信息
			</div>
		</div>

	</div>
</template>

<script>

    import {Component,Vue} from 'vue-property-decorator';
    import {mixins} from 'vue-class-component'
    import {NavBar, Checkbox, CheckboxGroup, Toast} from 'vant';
    import common from "@/assets/js/common"
    import {ImgVerify,mobile_register,sendMsg,bind_mobile} from "@/assets/js/const"

    Vue.use(NavBar).use(Checkbox).use(CheckboxGroup);
    @Component
    export default class index extends mixins(common) {
      ImgVerify=ImgVerify;
      mobile = ''; //手机号
      picCode = '' // 图文验证码
      msgcode = '' // 验证码
      number = '' // 邀请码

      fnSendMsgText= '获取验证码'
      downCount = 0 ;
      downCountShow = true;
   
			// 获取验证码
			fnAuthSendMsg() {
				var that = this;
				if (this.downCount === 0) {
					this.http(sendMsg, {
						picCode: this.picCode,
            mobile: this.mobile,
            type:''
					}).then(function(res) {
						if (res.code == 0) {
							that.downCount = 60;
							var tempFn = setInterval(function() {
								if (that.downCount > 0) {
                  that.fnSendMsgText =   "重新获取(" + that.downCount + ")" ;
                  that.downCount--;
                  that.downCountShow = false;
								} else {
                  that.downCountShow = true;
                  that.fnSendMsgText = "获取验证码";
                  clearInterval(tempFn);
								}
							}, 1000);
						}
						api.toast({
							msg: res.msg,
							duration: 2000,
							location: "bottom"
						});
					});
				}
			}
			bindWX() {
				var params = {
					openid: api.pageParam.openid,
					unionid: api.pageParam.unionid,
					headimgurl: api.pageParam.headimgurl,
					nickname: api.pageParam.nickname,
					mobile: this.mobile,
					code: this.msgcode,
					number: this.number
				};
				this.http(bind_mobile, params).then(res => {
					if (res.code == 0) {
						this.setStorage("token", res.data.token);
						api.closeWin({
                name: 'home'
            });
            api.openWin({
                name: 'home',
								url: './home.html',
								useWKWebView: true,
                reload:true,
                slidBackEnabled:false
						});
						api.sendEvent({
								name: 'tab0',
								extra: 0
						});
						api.sendEvent({name: 'firstRegister'});
					} else {
						this.toast(res.msg);
					}
				});
			}

    }
</script>

<style  lang="scss">
    @import "@/assets/css/common.scss";
    @import "@/assets/css/app.scss";
    .MS_BG_CFFC209{
      background: #FF2A2E;
    }
</style>
