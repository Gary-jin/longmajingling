// var  baseUrl = 'http://longmajingling.vmall99.com/api/';//测试域名
var  baseUrl = 'http://lmjl.tongquan.gold/api/';//正式域名
/***********Auth********/

export var ImgVerify = baseUrl+'Auth/getCode';//获取验证图片

export var sendMsg = baseUrl+'Auth/sendMsg';//发送验证码

export var mobile_register = baseUrl+'Auth/mobile_register';//手机号注册

export var login = baseUrl+'Auth/login';//登录

export var forget_password = baseUrl+'Auth/forget_password';//忘记密码

/***********User********/
export var update_password = baseUrl+'User/update_password';//修改密码

export var userinfo = baseUrl+'User/info';//用户信息

export var move_rand_ad = baseUrl+'User/move_rand_ad';//个人中心中间随机广告

export var headimg = baseUrl+'User/headimg';//个人中心中间随机广告

export var update_nickname = baseUrl+'User/update_nickname';//修改昵称

export var update_mobile = baseUrl+'User/update_mobile';//修改手机号

export var bind_zfb = baseUrl+'User/bind_zfb';//绑定支付宝

export var taoke_info = baseUrl+'User/taoke_info';//淘客收益

export var total_in_list = baseUrl+'User/total_in_list';//收益

export var get_taoke_order_list = baseUrl+'User/get_taoke_order_list';//我的订单

export var get_find_order_rule = baseUrl+'User/get_find_order_rule';//找回订单规则

export var find_order = baseUrl+'User/find_order';//找回订单

export var ask_sub = baseUrl+'User/ask_sub';//反馈问题

export var contact_us = baseUrl+'User/contact_us';//联系我们

export var setsmrz = baseUrl+'User/smrz';//实名认证

export var my_team = baseUrl+'User/my_team';//团队

export var get_red = baseUrl+'User/get_red';//领取当日红包

export var balance_list = baseUrl+'User/balance_list';//收支账单

export var logout = baseUrl+'User/logout';//登出

/***********Taoke********/
export var get_lb_img = baseUrl+'Taoke/get_lb_img';//首页banner

export var buyLimitTimes = baseUrl+'Taoke/buyLimitTimes';//倒计时列表

export var buyLimitGoods = baseUrl+'Taoke/buyLimitGoods';//限时列表

export var get_taoke_goods_cate = baseUrl+'Taoke/get_taoke_goods_cate';//分类

export var appFistPageJHS = baseUrl+'Taoke/guess_your_love_goods_list';//猜你喜欢

export var get_search_history_list = baseUrl+'Taoke/get_search_history_list';//历史记录

export var get_goods_list = baseUrl+'Taoke/get_goods_list';//首页分类

export var super_search = baseUrl+'Taoke/search';//超级搜

export var get_goods_detail = baseUrl+'Taoke/get_goods_detail';//商品详情

export var get_goods_info_images = baseUrl+'Taoke/get_goods_info_images';//商品详情图片

export var guess_your_love_goods_list = baseUrl+'Taoke/appFistPageJHS';//为你推荐

export var get_share_info = baseUrl+'Taoke/get_share_info';//分享商品

export var getvideo = baseUrl+'Taoke/video';//抖劵视频

export var get_coupon_url = baseUrl+'Taoke/get_coupon_url';//获取优惠券链接

export var Qudao_index = baseUrl+'Qudao/index';//获取渠道

export var good_goods_and_jhs = baseUrl+'Taoke/good_goods_and_jhs';//好货专场 和聚划算

export var del_search_history = baseUrl+'Taoke/del_search_history';//删除历史搜索记录

/***********Home********/
export var get_yj_article = baseUrl+'Home/get_yj_article';//首页公告

export var article_list = baseUrl+'Home/article_list';//首页文章列表

export var article_info = baseUrl+'Home/article_info';//文章详情

export var qrcodeInfo = baseUrl+'Home/qrcodeInfo';//分享邀请

export var get_first_article = baseUrl+'Home/get_first_article';//首页公告

export var get_link = baseUrl+'Home/get_link';//首页天猫超市链接

export var get_images = baseUrl+'Home/get_images';//首页图

/***********Morning********/
export var tiaozhan = baseUrl+'Morning/tiaozhan';//参与挑战

export var tiaozhan_list = baseUrl+'Morning/tiaozhan_list';//参与挑战列表

export var getTiaoZhaninfo = baseUrl+'Morning/info';//挑战

export var get_share_img = baseUrl+'Morning/get_share_img';//挑战分享图片

export var Morning_dk = baseUrl+'Morning/dk';//我要打卡

/***********Article********/

export var get_articles = baseUrl+'Article/get_articles';//各种协议
// /***********Withdraw********/

export var get_Withdraw_info= baseUrl+'Withdraw/info';//提现详情

export var _withdraw= baseUrl+'Withdraw/withdraw';//提现

export var withdraw_list= baseUrl+'Withdraw/withdraw_list';//提现列表

/***********Task*********************/
export var tasksign= baseUrl+'Task/sign';//签到

export var  sign_view_video = baseUrl + 'Task/sign_view_video' //签到看视频 翻倍

export var taskinfo= baseUrl+'Task/info';//任务详情

export var maobi_list= baseUrl+'Task/maobi_list';//元气丹列表

export var get_maobi_award= baseUrl+'Task/get_maobi_award';//领取奖励

export var bind_tjr= baseUrl+'Task/bind_tjr';//绑定师傅

export var lx_view_video = baseUrl + "Task/view_video" // 连续签到看视频
// /***********Cat*********************/

export var rank_list= baseUrl+'Cat/rank_list';//榜单

export var is_smrz= baseUrl+'Cat/is_smrz';//是否实名

export var Catinfo= baseUrl+'Cat/info';//猫圈详情

export var exchange_maobi= baseUrl+'Cat/exchange_maobi';//转赠

export var get_m_share_img= baseUrl+'Cat/get_share_img';//分享

export var move_m_rand_ad= baseUrl+'Cat/move_rand_ad';//猫圈广告

export var feed_cat= baseUrl+'Cat/feed_cat';//喂猫

export var get_maobi_by_view_goods= baseUrl+'Cat/get_maobi_by_view_goods';//领取元气丹

export var bubble_list= baseUrl+'Cat/bubble_list';//气泡列表

export var click_bubble_after= baseUrl+'Cat/click_bubble_after';//点击气泡之后的操作

export var click_bubble= baseUrl+'Cat/click_bubble';//点击气泡领取奖励

export var Cat_view_video= baseUrl+'Cat/view_video';//猫圈直接观看视频 翻倍

export var get_sj_red_money= baseUrl+'Cat/get_sj_red_money';//领取猫升级红包

export var view_goods_view_video = baseUrl+'Cat/view_goods_view_video' //浏览商品 翻倍



/*********************      Yaojiangji       ***************************/

export var Yaojiangji_info= baseUrl+'Yaojiangji/info';//摇奖机

export var award= baseUrl+'Yaojiangji/award';//摇奖

export var exchange= baseUrl+'Yaojiangji/exchange';// 元气丹兑换摇奖机会

export var view_video= baseUrl+'Yaojiangji/view_video';// 观看广告视频兑换抽奖机会

export var award_list= baseUrl+'Yaojiangji/award_list';// 摇奖明细

/*****************************      Zhuanpan   ***********************************/

export var Zhuanpan_award_list= baseUrl+'Zhuanpan/award_list';// 中奖纪录

export var Zhuanpan_info= baseUrl+'Zhuanpan/info';// 大转盘页面详情数据

export var Zhuanpan_award= baseUrl+'Zhuanpan/award';// 抽奖

export var Zhuanpan_get_share_info= baseUrl+'Zhuanpan/get_share_info';// 抽奖

export var get_zhuanpan_award= baseUrl+'Zhuanpan/get_zhuanpan_award';//领取转盘奖励

export var zhuanpan_view_video= baseUrl+'Zhuanpan/view_video';//领取转盘奖励

/**********************      Send   *************************/

export var Send_info= baseUrl+'Send/info';// 猫圈分红详情

export var cat_list= baseUrl+'Send/cat_list';// 升级为龙马的记录

// ************************   pay ***********************
export var get_pay_sign_str= baseUrl+'Pay/get_pay_sign_str';// 猫圈分红详情

export var get_video_counts= baseUrl+'home/get_video_counts';// 看视频次数 

export var feed_cat_view_vide= baseUrl+'cat/feed_cat_view_video';// 喂食 元气丹不足 看视频奖励 

export var duobaoyu= baseUrl+'task/duobaoyu';// 任务墙

// ******************** 实名认证  最新 ***********************//

export var faceCertifyUrl = baseUrl+'user/face_certify_ff';         //支付宝刷脸认证

export var checkCertifyUrl = baseUrl + 'user/check_face_certify';   //支付宝刷脸认证结果查询

export var bind_mobile = baseUrl + 'Auth/bind_mobile';   //绑定手机号

export var authWxLogin = baseUrl + 'Auth/wx_login';   //微信登录

export var popad = baseUrl + 'home/popad';   //首页广告弹窗

export var getArticles = baseUrl + 'article/get_articles';   //用户隐私协议

export var get_is_display = baseUrl + 'home/get_is_display';   //上架隐藏 安卓

export var advert = baseUrl + 'home/advert';   // 视频开关
