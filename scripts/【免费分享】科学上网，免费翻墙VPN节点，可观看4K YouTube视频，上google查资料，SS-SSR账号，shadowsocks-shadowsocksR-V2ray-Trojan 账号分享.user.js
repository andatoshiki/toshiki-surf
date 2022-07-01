// ==UserScript==
// @name    【免费分享】科学上网，免费翻墙VPN节点，可观看4K YouTube视频，上google查资料，SS/SSR账号，shadowsocks/shadowsocksR/V2ray/Trojan 账号分享
// @namespace    zkq
// @version      3.5
// @description  【永久免费】【作者自购VPS】【24小时全天候不断流】【2.5G高速流量】【不限流量】【无需注册】【无诱导充值】【集成淘宝优惠券助手】，低调回归，推荐最新翻墙VPN工具trojan，拒绝被识别被检测。使用方法在脚本详情里。
// @author       意外
// @include *zkq8.com/*
// @include http*://chaoshi.detail.tmall.com/*
// @include http*://detail.tmall.com/*
// @include http*://item.taobao.com/*
// @include http*://list.tmall.com/*
// @include http*://list.tmall.hk/*
// @include http*://www.taobao.com/*
// @include http*://www.tmall.com/*
// @include http*://s.taobao.com/*
// @include http*://detail.tmall.hk/*
// @include http*://chaoshi.tmall.com/*
// @require https://cdn.bootcss.com/jquery/2.2.4/jquery.min.js
// @require  https://greasyfork.org/scripts/388397-%E5%A4%A7%E9%A2%9D%E4%BC%98%E6%83%A0%E5%88%B8%E8%84%9A%E6%9C%AC%E5%BA%93/code/%E5%A4%A7%E9%A2%9D%E4%BC%98%E6%83%A0%E5%88%B8%E8%84%9A%E6%9C%AC%E5%BA%93.js
// @grant        none
// @run-at       document-end
// ==/UserScript==

function test_url(host_url) {
var host=location.host;
var ps = host.indexOf(host_url);

    if (ps<0) {
		return 0;
	}
		return 1;
}

(function() {
    'use strict';
	if(test_url("zkq8.com")) {
    var ssdata = "<p style='font-weight:bold;'>点击以下三个链接，所有账号为防止流量异常，不定期会更新密码</p><div id='max-panel'><a style='color: #FF0000;font-weight:bold;' href='/index.php?r=ddq'>点击我，显示SS账号信息</a><span>&emsp;&emsp;&emsp;&emsp;</span><a style='color: #00FF00;font-weight:bold;' href='/index.php?r=p'>点击我，显示SSR账号信息</a>&emsp;&emsp;&emsp;&emsp;<a style='color: #0000FF;font-weight:bold;' href='/index.php?r=nine'>点击我，显示V2ray/Trojan账号信息</a></div>";
   $('#content').append(ssdata);
   $('#sf_wrap').before("<div id='ss' style='text-align: center;'></div>");
   $("#ss").load('/ss_link.txt');
   $('.head-tit').before("<div id='ssr' style='text-align: center;'></div>");
   $("#ssr").load('/ssr_link.txt');
   $('.nine_banner_tab').before("<div id='v2ray' style='text-align: center;'></div>");
   $("#v2ray").load('/v2ray_link.txt');
   }
})();