<template>
	<div>
		<div class="color_fff header W_100 PL_4 headerBg" style="padding-left: 0;position: relative;">
			<div class="flex_row_between PT_2 W_98" style="margin: auto;width:85%;">

				<div class="flex_rowL flex_items_end" style="margin-top: 20px;">
					<span class="fontS_40 lineH_0">{{info.maobi_balance}}</span>
					<span class="fontS_16 font_weight_bolder PL_2">元气丹</span>
					<img @click="openWin('tab2-detail')" :src="requireimg(`maobi`)" alt=""
						 class="ML_2 object_fit_scale" style="width:75px;height: 75px;transform: translateY(10px)">
				</div>
			</div>
			<p class="PTB_4 W_98" style="margin: auto;width: 86%;height: 80px;display: block">元气丹可用于喂养龙马，龙马等级越高，收益越高</p>

			<div style="margin: auto;width: 92%;position: absolute;bottom:-60px;left: 4%;background-color: white;padding: 13px;box-sizing: border-box;border-radius: 10px;box-shadow:0 0 5px #999 ">
				<div style="display: flex;justify-content:space-between;color: #333333;align-items: center">
					<h1 style="font-weight:bold;font-size: 1.2rem">已连续签到<span style="color:#326bff;font-size: 1.6rem">{{info.lx_sign_days}}</span>天</h1>
					<p style="font-size: .8rem;color: #999;text-align: right">
						连续7天看视频签到可得 <br>
						1元提现机会
					</p>
				</div>
				<div class="line" style="position: relative;display: flex;justify-content: space-between;width:100%;margin:10px auto 0">
						<div @click="toseev(v)"   v-for="v in 7" :key="v" class="fontS_12" style="display: flex;flex-flow:column;color: #999;white-space: nowrap;text-align: center;margin-top:10px">
							<img  v-lazy="requireimg(v>info.lx_sign_days?'maobi':v>info.lx_bei_days? 'maobi_hui':'qiandao1')" alt="">
							<span style=";text-align: center" >{{v>info.lx_sign_days?v+"天":v>info.lx_bei_days? "已签到":'翻1倍'}}</span>
						</div>
				</div>
			</div>
		</div>

		<div class="PLR_3 bg_fff BB_7_f2f2f2" style="margin-top:5rem;">
			<div class="BB_1_f2f2f2 PTB_2 fontS_18 PL_2">每日工作</div>
			<div  v-for="(item, index) in info.every_day_work" :key="index"
				 class="flex_row_between PTB_2 Box_bott BB_1_f2f2f2">
				<div class="flex_rowL">
					<img v-lazy="requireimg(`every_${index}`)" alt="" class="VWH_8 flex_shrink_0">
					<div class="flex_colT flex_items_start PL_3 ">
						<span class="fontS_14">{{item.str1}}</span>
						<span class="fontS_12 color_999 PT_1">{{item.str3}}</span>
					</div>
				</div>
				<span :class="item.is_show==='已完成'?'color_999':''" class="fontS_12" style="text-align: center">
					<p  v-show="item.is_show==1" :class="{over:item.is_get==1}"    @click="draw(item,index)" class="fontS_10 jianbianBtn" style="color: white;border-radius: 10px;padding: 3px 4px;margin:7px 0 -3px;width: 60px;">
						{{item.is_get==1?"已领取":"领取奖励"}}
					</p>
					<p class="PT_1 color_999">{{item.str2}}</p>
				</span>
			</div>
		</div>

		<div class="PLR_3 bg_fff BB_7_f2f2f2">
			<div class="BB_1_f2f2f2 PTB_2 fontS_18 PL_2">推荐工作</div>
			<div @click="showfa(item,index)" v-for="(item, index) in info.extend_work" :key="index"
				 class="flex_row_between PTB_2 Box_bott BB_1_f2f2f2">
				<div class="flex_rowL">
					<img v-lazy="requireimg(`recom_${index}`)" alt="" class="VWH_8 flex_shrink_0">
					<div class="flex_colT flex_items_start PL_3 ">
						<span class="fontS_14">{{item.str1}}</span>
						<span class="fontS_12 color_999 PT_1">{{item.str3}}</span>
					</div>
				</div>
				<span :class="item.is_show==='已完成'?'color_999':''" class="fontS_12 color_999" style="text-align: right">
					{{item.str2}}
					<p v-show="index=='sf'?true:item.is_show==1"   @click="show=true" class="fontS_14 jianbianBtn " style="background-color: white;background-image: initial;padding: 3px 4px;margin:7px 0 -3px;width:80px;">
						{{item.is_over==1?"已完成":"未完成"}}
					</p>
				</span>
			</div>
		</div>

		<van-popup class="tab1pop" v-model="pop_show" style="width:85%;padding: 20px;border-radius: 12px;height:420px">
			<!--红包弹窗-->
			<div v-if="type=='hb'" style="height:190px">
				<img @click="hideBannerAD()" src="@/assets/img/close1.png" alt="" style="width: 40px;height: 40px;position: absolute;right: 5px;top: 5px">
				<div style="margin-top: 95px">
					<div class="fontS_16" style="color: #ffffff;font-weight:bold;text-align: center">
						恭喜获得<span>￥1.99随机红包</span>
						<p class="fontS_12" style="color: #cbd8fb;font-weight:100;line-height:30px;">点击气泡有几率产生随机红包</p>
					</div>
					<h1 style="text-align: center" class="fontS_16">
						<img v-lazy="requireimg('hongbao')" alt="" style="width:150px;height:auto;border-radius: 7px;">
					</h1>
					<div class="login MLR_auto W_100 tab1popBtn tab1popBtn B_radius_10 fontS_13" style="width: 50%;padding:0 26px;line-height:30px;margin:22px  auto 5px;border-radius: 100px;text-align: center" >
						点击领取
					</div>
					<p class="fontS_12" style="color: #cbd8fb;font-weight:100;line-height:30px;text-align: center">看视频次数：X次</p>
				</div>
			</div>
			<!--抽奖宝箱-->
			<div v-else-if="type=='cb'" style="height:175px">
				<img @click="hideBannerAD()" src="@/assets/img/close1.png" alt="" style="width: 40px;height: 40px;position: absolute;right: 5px;top: 5px">
				<div style="margin-top: 95px">
					<div class="fontS_16 MT_5" style="color: #ffffff;font-weight:bold;text-align: center">
						完成任务 恭喜获得<span>{{info.task_maobi}}元气丹</span>
						<p class="fontS_12" style="color: #cbd8fb;font-weight:100;line-height:30px;">完成每日任务可获得一个最高5元红包</p>
					</div>
					<h1 style="text-align: center" class="fontS_16">
						<img v-lazy="requireimg('hongbao1')" alt=""  style="width:70%;height:auto;border-radius: 7px;">
					</h1>
					<div @click="lingqu_ever" class="login MLR_auto W_100 tab1popBtn tab1popBtn B_radius_10 fontS_13" style="width: 80%;padding:0 26px;line-height:30px;margin:10px  auto 5px;border-radius: 100px;text-align: center" >
						点击领取
					</div>
				</div>
			</div>
			<!--抽奖宝箱  登录红包-->
			<div v-else-if="type=='qd'" style="height:190px">
				<img @click="hideBannerAD()" src="@/assets/img/close1.png" alt="" style="width: 40px;height: 40px;position: absolute;right: 5px;top: 5px">
				<div style="margin-top: 95px">
					<div class="fontS_16 MT_5" style="color: #ffffff;font-weight:bold;text-align: center">
						已签到<span>{{info.lx_sign_days}}</span>天 获得<span>{{info.today_sign_maobi}}</span>元气丹
						<p class="fontS_12" style="color: #cbd8fb;font-weight:100;line-height:30px;">连续7天观看视频签到可得1元提现机会</p>
					</div>
					<h1 style="text-align: center" class="fontS_16">
						<img v-lazy="requireimg('5c8867055fb6d')" alt="" style="width:70%;height:auto;border-radius: 7px;">
					</h1>
					<div @click="seevideo" class="login MLR_auto W_100 tab1popBtn tab1popBtn B_radius_10 fontS_13" style="width: 80%;padding:0 26px;line-height:30px;margin:10px  auto 5px;border-radius: 100px;text-align: center" >
						看视频
					</div>
					<p class="fontS_12" style="color: #cbd8fb;font-weight:100;line-height:30px;text-align: center">{{info.view_video_nums}}</p>
				</div>
			</div>


			<!--元气丹-->
			<div v-else-if="type=='pop_showsign'" style="height:190px">
				<img @click="pop_show=false" src="@/assets/img/close1.png" alt="" style="width: 40px;height: 40px;position: absolute;right: 5px;top: 5px">
				<div style="margin-top: 95px">
					<div class="fontS_16" style="color: #ffffff;font-weight:bold;text-align: center">
						恭喜获得1元气丹
						<p class="fontS_12" style="color: #cbd8fb;font-weight:100;line-height:30px;">连续7天观看视频签到可得1元提现机会</p>
					</div>
					<h1 style="text-align: center" class="fontS_16">
						<img v-lazy="requireimg('maobi')" alt="" style="width:150px;height:auto;border-radius: 7px;">
					</h1>
					<div @click="signVideo()" class="login MLR_auto W_100 tab1popBtn B_radius_10 fontS_13" style="width: 50%;padding:0 26px;line-height:30px;margin:22px  auto 5px;border-radius: 100px;text-align: center" >
						看视频翻倍
					</div>
				</div>
			</div>
		</van-popup>

		<van-popup v-model="pop_show1" style="width:85%;padding: 20px;border-radius: 12px;height:220px">
				<!--师傅-->
			<div v-if="type=='fa'" style="height:150px">
				<h1 style="text-align: center" class="fontS_18">
					确认师傅
				</h1>
				<input v-model="yaoqing" type="text" style="width: 100%;line-height: 40px;border: 1px solid #DBDBDB;margin:20px 0" placeholder="请输入邀请码">
				<div class="flex_between">
					<div @click="pop_show1=false"
						 class="MLR_auto flex_rowC color_000 W_75 PTB_1 tab1popBtn  B_radius_10 fontS_15"
						 style="width:40%;">
						取消
					</div>
					<div @click="savefa"
						 class="login  MLR_auto flex_rowC color_fff W_75 PTB_1  tab1popBtn B_radius_10 fontS_15"
						 style="width:40%">
						确定
					</div>
				</div>
			</div>
		</van-popup>

	</div>
</template>
<script >
	import "@/assets/js/iconfont/iconfont.css";
	import {Component, Vue, Watch} from 'vue-property-decorator';
	import {mixins} from 'vue-class-component'
	import common from "@/assets/js/common"
	import {taskinfo,tasksign,get_maobi_award,bind_tjr,sign_view_video,lx_view_video} from "@/assets/js/const"
	import {Lazyload,Popup,Search, Swipe, SwipeItem, NoticeBar, CountDown, List, PullRefresh,Tab, Tabs ,Toast} from 'vant';
	Vue.use(Lazyload).use(Popup).use(Search).use(Swipe).use(SwipeItem).use(NoticeBar).use(CountDown).use(List).use(PullRefresh).use(Tabs).use(Tab);

	@Component
	export default class  extends mixins(common) {
		pop_show=false;
		type='cb';

		pop_show1=false;
		yaoqing='';
		info={}
		index=""


		mounted() {
			var that=this;
			api.addEventListener({
				name: 'tab2'
			}, (ret) =>{
				this.http(tasksign).then(v=>{
					if(v.code==0){
						that.type='qd';
						that.pop_show=true;
					}
				})
				this.getinfo();
				this.addEventFn()
			});
			this.getinfo();
			this.addEventFn()
		}
		addEventFn(){
			//看广告 后 相关视频监听
			//cat 普通看视频  qipao 气泡元气丹翻   view_goods 浏览商品看视频  
			//sign 签到看视频  zhuanpan 大转盘看视频  tab2Lianxu tab2连续看视频
			// 
			api.addEventListener({name: "videoEndWay"},(ret, err)=>{
					if (ret) {
							// alert(JSON.stringify(ret.value.type))
							if(ret.value.type == 'tab2Lianxu'){
								this.seeVideoOver()
							} else if (ret.value.type == 'signViewVideo') {
								this.signViewVideo()
							}
					} else {
							this.toast('加载失败，请重试！')
					}
			})

		}
		getinfo() {
			this.http(taskinfo).then(v=>{
				this.info=v.data.info;
			})
		}

		showfa(v,i) {
			if(i=="sf"&&v.is_over==0){
				this.type='fa';
				this.pop_show1=true;
			}
		}

		savefa() {
			if(this.yaoqing=="")return Toast("请输入邀请码");
			this.http(bind_tjr,{number:this.yaoqing}).then(v=>{
				Toast(v.msg)
				if(v.code==0){
					this.pop_show1=false;
					this.getinfo();
				}
			})
		}

		draw(value,index) {
			if(value.is_get==1)return;
			if (index == 'sign') {
				this.type = 'pop_showsign'
				this.pop_show = true
				this.index=index;
				this.lingqu_ever()
				
			} else {
				this.type='cb';
				this.pop_show=true;
				this.info.task_maobi=value.price;
				this.index=index;
			}
			this.showBannerAD('1',api.pageParam.HH, function(ret, err) {});
		}

		// 签到看视频翻倍 ******************************************************************//
		signVideo () {
			var that = this
			that.hideBannerAD()
			that.pop_show = false;
			that.videoLsit('signViewVideo')
		}

		signViewVideo() {
			this.http(sign_view_video).then((res)=>{
				if (res.code == 0) {
					this.getinfo()
				} 
			})

		}		

		/*每日红包领取*/
		lingqu_ever() {
			var param={}
			this.index=='sign'&&(param.type=1);
			this.index=='friend'&&(param.type=2);
			this.index=='cat'&&(param.type=3);
			this.index=='video'&&(param.type=4);

			this.http(get_maobi_award,param).then(v=>{
				Toast(v.msg)
				if(v.code==0){
					this.hideBannerAD()
					if(this.index=='sign'){
						this.type = 'pop_showsign'
						this.pop_show = true
					} else{
						this.pop_show=false;
					}
				}
				this.getinfo();
			})
		}


		lingqu() {
			this.pop_show=true;
		}

		@Watch('pop_show')
		function(v) {
			api.sendEvent({
				name: 'shadow',
				extra: v
			});
		}
		/*连续 看视频*/
		seevideo() {
			this.pop_show=false;
			this.videoLsit('tab2Lianxu')
		}
		seeVideoOver() {
			this.http(lx_view_video).then((res)=>{
				if(res.code == 0){
					this.getinfo()
				}
			})
		}

		// 点 步进器
		toseev(i) {
			if(this.info.lx_sign_days==i&&i>this.info.lx_bei_days){
				this.type='qd';
				this.pop_show=true;
			}
		}

		hideBannerAD() {
				this.pop_show = false;
				// TODO 需要加上穿山甲，优量汇横幅广告类型判断
				let that = this;
				if (that.videoKind === 1) {
						that.tencentAds.closeBanner();
				} else {
						that.chuanshanjiaAds.init(function(ret, err) {
								if (ret) {
										that.chuanshanjiaAds.closeBanner({}, function(ret, err) {});
								}
						});
				}
		}
				
	}
</script>

<style lang="scss">
	@import "@/assets/css/app.scss";
	.line{
		display: flex;
		justify-content: center;
		&::before{
			content: "";
			position: absolute;
			display: block;
			background-color: rgba(0,0,0,.1);
			width: 95%;
			height:2px;
			left: 50%;
			top: 50%;
			transform: translate(-50%,-50%);
			z-index: 0;
		}
		img{
			width:2.3rem;height:auto;
			margin: auto;
			position: relative;
		}
	}
	.over{
		background-image: linear-gradient(to right,#B9B9B9,#959595)!important;
	}
	.Box_bott:last-child{
		border-bottom: none;
	}
	.headerBg{
		background: url(./../assets/img/tab2TopBg.png) 0 0 no-repeat;
		background-size: 100% 100%;
	}
	.jianbianBtn{
		background: #326bff;
	}
	.tab1pop{
        background: url("../assets/img/tab1pop.png") 0 0 no-repeat ;
        background-size: 100% 100%; 
    }
    .tab1popBtn{
        background:#ffdc02;
        color: #a85326;
        font-weight: bold;
    }
</style>
