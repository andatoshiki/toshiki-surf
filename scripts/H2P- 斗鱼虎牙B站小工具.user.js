// ==UserScript==
// @name			H2P: 斗鱼虎牙B站小工具
// @namespace		http://tampermonkey.net/
// @version			2.1.6
// @icon			http://www.douyutv.com/favicon.ico
// @description		黑暗模式：斗鱼虎牙 B 站 ____ 清爽模式：斗鱼虎牙 B 站 ________ <斗鱼>：抽奖、抄袭、循环弹幕，关键词回复 ____ 批量取关、直播时长、真实人数 ____ 暂停播放、静音、关闭滚动弹幕、默认画质、宽屏模式、领取鱼塘（自动寻宝）、签到、自动维持亲密度 ________ <虎牙>：抄袭、循环弹幕 ____ 暂停播放、静音、关闭滚动弹幕、默认画质、宽屏模式、领取宝箱 ________ <B 站>：抄袭、循环弹幕 ____ 暂停播放、静音、关闭滚动弹幕、默认画质、宽屏模式、签到
// @author			H2P
// @compatible		chrome
// @match			*://*.douyu.com/0*
// @match			*://*.douyu.com/1*
// @match			*://*.douyu.com/2*
// @match			*://*.douyu.com/3*
// @match			*://*.douyu.com/4*
// @match			*://*.douyu.com/5*
// @match			*://*.douyu.com/6*
// @match			*://*.douyu.com/7*
// @match			*://*.douyu.com/8*
// @match			*://*.douyu.com/9*
// @match			*://*.douyu.com/topic/*
// @match			https://www.douyu.com/directory/myFollow
// @match           *://*.bilibili.com/
// @match           *://*.bilibili.com/?*
// @match			*://*.bilibili.com/video/*
// @match			*://*.t.bilibili.com/*
// @match			*://*.bilibili.com/ranking?*
// @match			*://live.bilibili.com/*
// @match			*://*.huya.com/*
// @note			2019.03.18-V0.2.00		循环弹幕可以设置多条，随机发送；新增弹幕倒计时；界面美化一下？抽奖弹幕新增一种查询类型
// @note			2019.03.18-V0.3.00		界面修改；界面可隐藏；可以设置是否发送默认弹幕
// @note			2019.03.18-V0.3.01		小 BUG 修复
// @note			2019.03.19-V0.4.00		引入 JQuery 改写，还没改完；更新了弹幕抽奖元素获取（因为斗鱼改了）；增加设置抽奖弹幕次数；发送弹幕时可以修改循环弹幕
// @note			2019.03.23-V0.4.01		完善了一下代码；完善了界面；修改了字体
// @note			2019.03.23-V0.5.00		添加了斗鱼清爽模式 : 隐藏部分、隐藏全部、删除元素
// @note			2019.03.23-V0.5.01		修缮清爽模式；添加自动领取观看鱼丸（不是鱼秀宝箱）
// @note			2019.03.24-V0.5.02-03	修缮自动领取观看鱼丸；修缮隐藏全部元素的返回按钮；修改介绍。。。
// @note			2019.03.26-V0.5.04		修缮自动领取观看鱼丸，如果无法领取则清除循环
// @note			2019.03.28-V0.5.05		解决 jQuery $ 冲突；清爽模式处理粉丝节
// @note			2019.03.31-V0.6.00-01	添加“功能自动化”设置面板；修改介绍
// @note			2019.04.02-V0.6.02		代码重写
// @note			2019.04.04-V0.6.03		添加抄袭弹幕；完善设置信息存储
// @note			2019.05.25-V0.6.04		完善清爽模式退出
// @note			2019.06.11-V0.6.05		更新斗鱼领取宝箱
// @note			2019.07.04-V0.7.00		聚合脚本图标；删去抽奖弹幕
// @note			2019.07.05-V0.7.01-02	添加抽奖弹幕；发送时间设定改为间隔时间，单位改为毫秒；修改循环弹幕会自动保存
// @note			2019.07.06-V0.7.03		发送弹幕时间在间隔内随机
// @note			2019.07.06-V0.7.04		更新介绍（我觉得我输在介绍不够长、不够骚）
// @note			2019.07.06-V0.7.05		自动领鱼丸更新；抽奖弹幕更新（感谢 beacoolguy 的反馈）
// @note			2019.07.06-V0.7.06		自动点击抽奖弹幕“一键参与”（仅限发弹幕抽奖）；清爽模式屏蔽贵族弹幕
// @note			2019.07.09-V0.7.07		抽奖弹幕“一键参与”（仅限条件 : 发弹幕和关注主播）；样式修改；新功能（关键词自动回复展望）
// @note			2019.07.09-V0.7.08		清爽模式针对“topic”直播间和大屏幕优化
// @note			2019.07.11-V0.7.09		添加关键词回复（目前只能设置关键词和回复，无法使用）
// @note			2019.07.14-V0.8.00-01	关键词回复可以使用啦！！！（最多五条关键词）
// @note			2019.08.12-V0.8.02-03	弹幕抽奖完善拥有粉丝牌的抽奖条件；部分清爽模式修改
// @note			2019.08.13-V0.8.04-08	清爽模式部分隐藏修缮
// @note			2019.09.05-V0.8.09		修缮关键词回复对于有粉丝牌无效的问题
// @note			2019.09.08-V0.9.00		关键词回复可以添加和删除；新一轮抽奖开启后清除上一轮抽奖弹幕内容
// @note			2019.09.10-V0.9.01		解决初始化失败的问题
// @note			2019.09.10-V0.9.02		解决关键词回复自己弹幕的问题
// @note			2019.09.10-V0.9.03		解决初始化失败的问题
// @note			2019.09.12-V0.9.04		在主播公司旁显示直播时长
// @note			2019.09.14-V1.0.00-01	Vue 重写自动发送弹幕和自动化配置界面；取消默认弹幕，抄袭弹幕增加抄袭间隔；取消显示直播时长；更新介绍
// @note			2019.09.14-V1.0.02		修复弹幕抽奖不工作；添加删除无关元素
// @note			2019.09.14-V1.0.03		修复弹幕抽奖不工作；Vue 重写清爽模式
// @note			2019.09.14-V1.0.04		修复关键词回复无法自动配置的问题；添加保留词 {showT} 用于替换主播直播时长
// @note			2019.09.15-V1.0.05		将主播直播时长保存在本地；修复 {showT} 替换失败问题
// @note			2019.09.15-V1.0.06		修复抽奖弹幕赠送 666 的问题
// @note			2019.09.16-V1.0.07		设置抄袭弹幕和循环弹幕优先级相同
// @note			2019.09.16-V1.0.08		解决 topic 房间 id 获取失败的问题
// @note			2019.09.24-V1.0.09		清除分区冠军赛；自动最低（高）画质
// @note			2019.09.24-V1.1.00		自动参与火力全开；解决自动签到、领取鱼丸一直检测的问题
// @note			2019.09.25-V1.1.01		更新自动领取鱼丸；解决处于发送等待期尝试发送弹幕的问题；领取鱼丸发送弹幕任务无法完成
// @note			2019.09.25-V1.1.02		添加在电脑面前检测
// @note			2019.09.28-V1.1.03		修复删除元素后宽屏导致礼物栏显示空白的问题
// @note			2019.10.06-V1.1.04		清爽模式增加单独处理弹幕栏；清爽信息栏还未实现
// @note			2019.10.07-V1.1.05		优化清爽模式；全屏模式、网页全屏已失效
// @note			2019.10.07-V1.1.06		解决宽屏模式白屏的问题；添加清爽模式功能；全屏模式、网页全屏在 Mac Chrome 会失效
// @note			2019.10.08-V1.1.07-08	优化清爽模式按键；新增删除元素解决内存溢出；修改介绍
// @note			2019.10.13-V1.1.09		普通直播间关灯模式优化；topic 房间清爽模式播放器和删除元素优化
// @note			2019.10.14-V1.1.10		优化 topic 房间和大屏关灯模式
// @note			2019.10.14-V1.2.01-02	优化脚本界面；添加脚本清爽，页面加载时即可清爽；修改介绍
// @note			2019.10.15-V1.2.03		修复设置版面清爽模式启动后无限触发的问题；修复脚本清爽无法启动的问题
// @note			2019.10.15-V1.2.04-05	优化关灯模式；针对有背景直播间优化；静音、关闭弹幕自动化；修改介绍
// @note			2019.10.16-V1.2.06		更新快捷键（Shift + a : 打开发送弹幕界面；Shift + s : 打开清爽模式界面；Shift + d : 打开自动设置界面）
// @note			2019.10.17-V1.2.07		修改按钮配色
// @note			2019.10.19-V1.3.01		弹幕栏清爽后显示直播间热度和直播时长；优化脚本清爽（针对有背景图片的直播间）
// @note			2019.10.19-V1.3.02		脚本清爽普通直播间白屏问题
// @note			2019.10.19-V1.3.03		脚本清爽有背景的普通直播间白屏问题；完善主播直播时间获取；弹幕栏清爽（去除标签）
// @note			2019.10.19-V1.3.04		完善弹幕栏清爽（去除背景颜色）
// @note			2019.10.20-V1.3.05		解决脚本清爽启动消除弹幕栏清爽的 BUG
// @note			2019.10.24-V1.3.06-08	增加显示真实人数；修复真实人数 BUG
// @note			2019.11.11-V1.3.09		弹幕抽奖更新；真实人数更新
// @note			2019.11.13-V1.3.10		签到后关闭弹出的框；宽屏模式显示竞猜
// @note			2019.11.15-V1.3.11		修复抽奖弹幕会复制“复制”两个字的问题
// @note			2019.11.17-V1.3.12-13	清爽模式和宽屏模式优化；关灯模式优化
// @note			2019.12.10-V1.4.01		批量取关
// @note			2019.12.29-V1.4.02		清爽模式自定义；快捷键清除弹幕（Shift + c）；清爽模式快捷键（Shift + u/i/o/p）；礼物栏清爽优化
// @note			2020.04.16-V1.4.03		清爽模式信息栏、弹幕栏、播放器更新（有背景的直播间播放器还未更新）
// @note			2020.04.16-V1.4.04		清爽模式信息栏优化
// @note			2020.04.26-V1.4.05		代码修改
// @note			2020.04.27-V1.4.06		自动给有牌子的主播赠送一根荧光棒
// @note			2020.04.28-V1.4.07		发送弹幕部分使用原生 JS 重写
// @note			2020.04.29-V1.4.08		弹幕栏清爽模式优化
// @note			2020.04.29-V1.4.09		关灯模式改为黑暗模式
// @note			2020.04.29-V1.4.10		黑暗模式需要手动开启
// @note			2020.04.30-V1.5.01		黑暗模式优化，且可以自动开启
// @note			2020.04.30-V1.5.02		网页打开就是黑暗模式，无需加载原来的样式
// @note			2020.04.30-V1.5.03-04	黑暗模式优化
// @note			2020.04.30-V1.5.05		脚本清爽礼物栏优化
// @note			2020.04.30-V1.5.06		修复关键词回复 BUG
// @note			2020.04.30-V1.5.07		修复抽奖弹幕 BUG
// @note			2020.05.05-V1.5.08-09	清爽模式优化，页面加载过程中即可隐藏元素
// @note			2020.05.07-V1.6.00		代码重写完毕，不依赖于 jQuery 和 Vue
// @note			2020.05.07-V1.6.01		修复抽奖弹幕提取失败的问题
// @note			2020.05.07-V1.6.02		针对 topic 房间优化清爽模式和黑暗模式
// @note			2020.05.07-V1.6.03		黑暗模式按钮修改到右上角，并且关注列表也有黑暗模式
// @note			2020.05.07-V1.6.04		修复自动静音 BUG
// @note			2020.05.07-V1.6.05		领取鱼塘优化
// @note			2020.05.07-V1.6.06		解决关键词回复会回复同一个弹幕的问题
// @note			2020.05.08-V1.7.00		B 站首页和 video 黑暗模式
// @note			2020.05.08-V1.7.01-02	B 站动态和排行榜黑暗模式；黑暗模式优化
// @note			2020.05.08-V1.7.03		修复不能赠送荧光棒的问题
// @note			2020.05.09-V1.7.04		斗鱼黑暗模式和礼物栏清爽模式优化
// @note			2020.05.10-V1.7.05		斗鱼礼物栏清爽模式优化
// @note			2020.05.11-V1.7.06		黑暗模式快捷键修改
// @note			2020.05.11-V1.7.07		自动暂停播放
// @note			2020.05.13-V1.8.00		黑暗模式（灰色、黑色、自定义）
// @note			2020.05.13-V1.8.01		黑暗模式自定义优化
// @note			2020.05.19-V1.8.02		B 站黑暗模式优化
// @note			2020.05.19-V1.8.03		斗鱼黑暗模式、领取鱼丸优化
// @note			2020.05.19-V1.8.04		清爽模式独立出来
// @note			2020.05.19-V1.8.05		修复抽奖弹幕复制“弹幕：”的问题
// @note			2020.05.19-V1.8.06		B 站直播间清爽模式
// @note			2020.05.20-V1.8.07		自动领取鱼丸 BUG 修复
// @note			2020.05.20-V1.8.08-11	虎牙清爽模式优化；斗鱼清爽模式优化
// @note			2020.05.25-V1.8.12		斗鱼脚本界面简化，修复宽屏模式和网页全屏不能自动设置的 BUG
// @note			2020.05.25-V1.8.13		虎牙清爽优化
// @note			2020.05.25-V1.8.14		修复斗鱼抽奖弹幕 BUG
// @note			2020.05.28-V1.8.15		斗鱼领取鱼塘自动寻宝
// @note			2020.06.01-V1.8.16		优化斗鱼自动寻宝和 topic 房间背景
// @note			2020.06.01-V1.8.17		虎牙黑暗模式
// @note			2020.06.02-V1.8.18		黑暗模式和清爽模式优化
// @note			2020.06.02-V1.8.19-20	斗鱼清爽模式优化，抽奖弹幕不会进入下一轮的 BUG
// @note			2020.06.03-V1.8.21-32	B 站直播黑暗模式优化，B 站直播清爽模式优化，虎牙清爽模式优化
// @note			2020.06.15-V1.8.33		斗鱼默认画质 BUG 修复
// @note			2020.06.15-V1.9.01-02	虎牙循环弹幕，虎牙清爽模式优化
// @note			2020.06.16-V1.9.03-05	虎牙自动化配置，修改介绍，斗鱼清爽模式优化
// @note			2020.06.16-V1.9.06 		斗鱼自动寻宝 BUG 修复
// @note			2020.06.17-V2.1.01-06 	B 站自动化配置，清爽模式优化，修改介绍
// ==/UserScript==

(() => {
	'use strict';

	const $H2P = function (xpath, one = true) {
        if (one) { return document.querySelector(xpath); }
        else { return Array.from(document.querySelectorAll(xpath)); }
	}
	
	const myKeyCode = {
		'a': 65, 'b': 66, 'c': 67, 'd': 68, 'e': 69, 'f': 70, 'g': 71,
		'h': 72, 'i': 73, 'j': 74, 'k': 75, 'l': 76, 'm': 77, 'n': 78,
		'o': 79, 'p': 80, 'q': 81, 'r': 82, 's': 83, 't': 84,
		'u': 85, 'v': 86, 'w': 87, 'x': 88, 'y': 89, 'z': 90,
	}

	const isDouyu			= window.location.href.includes('douyu.com');
    const isDouyuTopic		= window.location.href.startsWith('https://www.douyu.com/topic/');
    const isDouyuFollow 	= window.location.href.startsWith('https://www.douyu.com/directory/myFollow');
    
    const isBilibili		= window.location.href.includes('bilibili.com');
    const isBilibiliHome	= window.location.href === 'https://www.bilibili.com' || window.location.href === 'https://www.bilibili.com/' || window.location.href.startsWith('https://www.bilibili.com/?');
	const isBilibiliVideo	= window.location.href.startsWith('https://www.bilibili.com/video/');
	const isBilibiliAct		= window.location.href.startsWith('https://t.bilibili.com/');
	const isBilibiliRank	= window.location.href.startsWith('https://www.bilibili.com/ranking?');
	const isBilibiliLive	= window.location.href.startsWith('https://live.bilibili.com/');

	const isHuya			= window.location.href.includes('huya.com');
	const isHuyaFollow		= window.location.href.includes('huya.com/myfollow');








// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //
// 
// 															全局样式
// 
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //

	let eleStyle = document.createElement('style');
	eleStyle.innerHTML += `
		.h2p-flex-main-start {
			height          : 22px;
			margin          : 0 0 15px 0;
			display         : flex;
			flex-flow		: row wrap;
			justify-content : flex-start;
			align-items     : center;
		}
		.h2p-flex-main-center {
			height          : 22px;
			margin          : 0 0 14px 0;
			display         : flex;
			flex-flow       : row wrap;
			justify-content : center;
			align-items     : center;
		}
		
		.h2p-flex-main-end {
			height          : 22px;
			margin          : 0 0 15px 0;
			display         : flex;
			flex-flow		: row wrap;
			justify-content : flex-end;
			align-items     : center;
		}
		.h2p-item-100p {
			width           : 100%;
		}
		.h2p-item-75p {
			width           : 75%;
		}
		.h2p-item-50p {
			width           : 50%;
		}
		.h2p-item-33p {
			width           : 33.33%;
		}
		.h2p-item-25p {
			width           : 25%;
		}
    `;
	document.head.appendChild(eleStyle);








// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //
// 
// 															黑暗模式
// 
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //

	const LSClear = 'h2p-DY-config-clear';
	let config_clear_pre = {
		isClearNav	: false,
		isClearInfo	: false,
		isClearAside: false,
		isClearGift	: false,
		isClearBar	: false,
		isClearPlay	: false,
		blackMode	: false,
		clearMode	: false,
		BMGrey		: true,
		BMBlack		: false,
		BMDIY		: false,
		BMBGDeep	: '#2d2e37',
		BMBGLight	: '#363636',
		BMFontDeep	: '#a7a7a7',
		BMFontLight	: '#888888',
	};
	let config_clear = {};
	Object.assign(config_clear, config_clear_pre);
	let config_clear_tmp = JSON.parse(localStorage.getItem(LSClear)) || {};
	Object.assign(config_clear, config_clear_tmp);
	for (let key in config_clear) { if (!(key in config_clear_pre)) { delete config_clear[key]; } }
	localStorage.removeItem(LSClear);
	localStorage.removeItem('h2p-config-clear');
	localStorage.setItem(LSClear, JSON.stringify(config_clear));
	
	function blackMode () {
		console.log(`${config_clear.blackMode ? '启动' : '关闭'} : 黑暗模式`);

		let black = {
			bg: {
				deep	: config_clear.BMDIY ? config_clear.BMBGDeep : (config_clear.BMBlack ? '#000000' : '#2d2e37'),
				light	: config_clear.BMDIY ? config_clear.BMBGLight : (config_clear.BMBlack ? '#121212' : '#282930'),
			},
			font: {
				deep	: config_clear.BMDIY ? config_clear.BMFontDeep : (config_clear.BMBlack ? '#999999' : '#a7a7a7'),
				light	: config_clear.BMDIY ? config_clear.BMFontLight : (config_clear.BMBlack ? '#676767' : '#777777'),
			}
		}; 

		if (config_clear.blackMode) {
			if ($H2P('style#h2p-style-blackMode')) { $H2P('style#h2p-style-blackMode').remove(); }
			let eleStyle = document.createElement('style');
			eleStyle.id = 'h2p-style-blackMode';
			eleStyle.innerHTML += `
				.h2p-dropdown-menu {
					background-color: ${black.bg.light};
					color: ${black.font.deep};
					border-color: ${black.bg.light};
					box-shadow: 0 2px 6px ${black.bg.light};
				}
			`;
			if (isDouyu) {
				eleStyle.innerHTML += `
					body, div.Header-wrap, main.layout-Main, div.FishpondTreasure-v4-area { background-color: ${black.bg.deep}!important; }
				`;
				// header 左边
				eleStyle.innerHTML += `
					div.Header-wrap { border-bottom-color: ${black.bg.deep}; }
					#js-header div.HeaderNav a.EntryNav-desc, #js-header ul.Header-menu > li a,
					svg.Header-icon use, .DropMenuList-name { color: ${black.font.deep}; }
					.public-DropMenu-drop { background-color: ${black.bg.deep}; box-shadow: 0 2px 6px ${black.bg.light}; }
					a.Category-item { background-color: ${black.bg.light}; }
				`;
				// 搜索框
				eleStyle.innerHTML += `
					#js-header div.Header-right div.Search { background-color: ${black.bg.light}; border: 1px solid ${black.bg.light}; }
					#js-header div.Header-right div.Search svg.Header-icon, .Search-hot-title { color: ${black.font.deep}; }
					.Search-hotList a { color: ${black.font.light}; }
					.Search-hotList li:hover { background-color: ${black.bg.light}; }
					.Search-direct { background-color: ${black.bg.light}; border-color: ${black.bg.light}; }
				`;
				// header 右边
				eleStyle.innerHTML += `
					#js-header div.Header-right a.public-DropMenu-link, .User-nickname a,
					.DropPaneList.HistoryList .DropPaneList-title, .DropPaneList span.DropPaneList-title,
					.YubaMessage-link { color: ${black.font.deep}; }
					.DropPaneList > a:hover, .YubaMessage-link:hover { background-color: ${black.bg.light}; }
				`;
				// 侧边栏
				eleStyle.innerHTML += `
					.Aside-main--shrink, .Aside-toggle { background-color: ${black.bg.deep}; }
					.Aside-toggle>i:before { border-right-color: ${black.bg.deep}; }
					.Aside-shrink-item:last-child { border-top-color: ${black.bg.deep}; }
				`;
				// 主播信息
				eleStyle.innerHTML += `
					div#js-player-title { background-color: ${black.bg.deep}; border-color: ${black.bg.light}; border-bottom-color: ${black.bg.deep}; }
					div.Title-roomInfo div.Title-row h3.Title-header, div.Title-roomInfo div.Title-row h2.Title-anchorNameH2,
					div.Title-roomInfo div.Title-row a.Title-anchorHot div.Title-anchorText, div.Title-roomInfo div.Title-anchorLocation span,
					div.Title-roomInfo div.Title-sharkWeight span, div.Title-roomInfo div.Title-row div.Title-blockInline span { color: ${black.font.deep}; }
				`;
				// 礼物栏
				eleStyle.innerHTML += `
					div#js-player-toolbar, .GiftInfoPanel-cont { background-color: ${black.bg.deep}; border-color: ${black.bg.light}; }
					div#js-player-toolbar div.PlayerToolbar-ywInfo span,
					div#js-player-toolbar div.PlayerToolbar-ycInfo span, .GiftExpandPanel-descName, .GiftInfoPanel-name { color: ${black.font.deep}; }
					div#js-player-toolbar div.PlayerToolbar-Content:nth-child(2) div.PlayerToolbar-ContentCell:nth-child(1) { visibility: hidden; }
					div.GiftExpandPanel { background-color: ${black.bg.deep}; border-color: ${black.bg.deep}; }
					span.BatchGiveForm-num { background-color: ${black.bg.light}; border-color: ${black.bg.light}; color: ${black.font.deep}; }
					div.ShieldTool-list { background-color: ${black.bg.light}; border-color: ${black.bg.light}; }
				`;
				// 背包
				eleStyle.innerHTML += `
					.Backpack { background-color: ${black.bg.deep}; border-color: ${black.bg.deep}; }
					.Backpack-name { color: ${black.font.deep}; }
					.Backpack-propPanel, .Backpack-prop.is-blank { background-color: ${black.bg.deep}; }
					.Backpack-arrowInner { border-color: ${black.bg.deep}; }
				`;
				// 弹幕栏
				eleStyle.innerHTML += `
					div#js-player-asideMain { background-color: ${black.bg.deep}; border-color: ${black.bg.light}; }
				`;
				// 弹幕栏 - 公告
				eleStyle.innerHTML += `
					div.layout-Player-announce { background-color: ${black.bg.deep}; border-bottom-color: ${black.bg.light}; }
					div.layout-Player-rank ul.ChatTabContainer-titleWraper--tabTitle li { background-color: ${black.bg.deep}; border-color: ${black.bg.deep}; }
				`;
				// 弹幕栏 - 周榜
				eleStyle.innerHTML += `div.ChatRankWeek-headerContent { background-color: ${black.bg.deep}; }`;
				// 弹幕栏 - 贵宾
				eleStyle.innerHTML += `div.NobleRank, div.NobleRankTips { background-color: ${black.bg.deep}; }`;
				// 弹幕栏 - 粉丝团
				eleStyle.innerHTML += `
					div.FansRankInfo, div.ChatTabContainer { background-color: ${black.bg.deep}; }
					div.FansRankInfo span { color: ${black.font.deep}; }
				`;
				// 弹幕栏 - 主体
				eleStyle.innerHTML += `
					div#js-player-barrage, div.Barrage-main { background-color: ${black.bg.deep}; }
					span.Barrage-content { color: ${black.font.deep}; }
					div.Barrage { border-color: ${black.bg.light}; }
				`;
				// 弹幕栏 - 聊天框
				eleStyle.innerHTML += `
					div.layout-Player-chat { background-color: ${black.bg.deep}; }
					div.layout-Player-chat textarea.ChatSend-txt { background-color: ${black.bg.deep}; color: ${black.font.deep}!important; }
				`;
				// 弹幕栏脚本面板
				eleStyle.innerHTML += `
					div#h2p-div-clear-anchorHot { background-color: ${black.bg.deep}; border-bottom: 1px solid ${black.bg.deep}}
					div#h2p-div-clear-anchorHot div.Title-anchorText,
					div#h2p-div-clear-anchorHot div.Title-blockInline:nth-child(2) span.Title-row-icon,
					div#h2p-div-clear-anchorHot div.Title-blockInline:nth-child(2) i.Title-row-text { color: ${black.font.deep}; }
				`;
				// 互动预言
				eleStyle.innerHTML += `
					div#guess-main-panel { background: ${black.bg.deep}; border-color: ${black.bg.light}; }
					div.GuessMainPanelHeader-panelLeft span.GuessMainPanelHeader-slogon { color: ${black.font.deep}; }
					div.GuessGameBox, div.GuessReturnYwFdSlider-numIptWrap { background: ${black.bg.deep}; border-color: ${black.bg.light}; }
					div.GuessGameBox-header div.boxLeft, div.GuessReturnYwFdSlider-giftName { color: ${black.font.deep}; }
					div.GuessRankPanel-rank { border-color: ${black.bg.light}; }
					div.GuessReturnYwFdSlider-numIptWrap, div.GuessRankPanel,
					input.GuessReturnYwFdSlider-numIpt { background-color: ${black.bg.light}; border-color: ${black.bg.light}; color: ${black.font.deep}; }
					a.GuessGuideList-itemBox { background-color: ${black.bg.light}; }
					h2.guessGame--ell { color: ${black.font.deep}; }
					.GuessGuideList-item:hover { background-color: ${black.bg.deep}; }
				`;
				// 友邻
				eleStyle.innerHTML += `
					div#js-bottom-right { background-color: ${black.bg.deep}; }
					div.AnchorFriendPane-title { border-bottom-color: ${black.bg.light}!important }
					div.AnchorFriendPane-title h3 { color: ${black.font.deep}!important; }
					div.AnchorLike-ItemBox { border-color: ${black.bg.light}; }
					div.AnchorFriend-footer { border-top-color: ${black.bg.light}; }
					div.AnchorFriend-footer a { background-color: ${black.bg.deep}; color: ${black.font.deep}; }
					div.GuessReturnYwFdSlider { background-color: ${black.bg.deep}; border-color: ${black.bg.deep};}
					div.AnchorFriendPane-title a:first-child { display: none; }
				`;
				// 聊天框
				eleStyle.innerHTML += `
					.main-left { background-color: ${black.bg.deep}; border-right: 1px solid ${black.bg.light}; }
					.motorcadeHeader-motorcadeName-3mPkv { color: ${black.font.deep}; }
					.cl-item-username { color: ${black.font.light}; }
					.cl-item-line { background-color: ${black.bg.light}; }
					.main-left-header.main-left-header-small, .jumpBox-jumpBox-2BlGl { border-color: ${black.bg.light}; }
				`;
				if (isDouyuFollow) {
					eleStyle.innerHTML += `
						div.layout-Module-head.ScrollTabFrame-head { background-color: ${black.bg.deep}; color: ${black.font.deep}; }
						div.layout-Cover-card { background-color: ${black.bg.deep}; }
					`;
					// 特别关注等按钮
					eleStyle.innerHTML += `
						.layout-Module-label { background-color: ${black.bg.light}; border-color: ${black.bg.light}; }
					`;
					// 可能感兴趣
					eleStyle.innerHTML += `
						.AthenaBoothPanel-wrapper, .AthenaBoothPanel-item { background-color: ${black.bg.light}; }
						.AthenaBoothPanel-des h3 { color: ${black.font.deep}; }
						.AthenaBoothPanel-followBtn { border-color: ${black.font.light}; color: ${black.font.light}; }
					`;
					// 每个卡片
					eleStyle.innerHTML += `
						.DyLiveCover-wrap, .DyLiveCover-wrap.is-hover,
						.DyLiveRecord { background-color: ${black.bg.light}; }
						.DyLiveCover-intro, .DyLiveRecord-intro { color: ${black.font.deep}; }
					`;
				}
				if (isDouyuTopic) {
					eleStyle.innerHTML += `
						div.wm-general div.wm-general-bgblur, div.wm-general div.wm-general-wrapper { background: ${black.bg.deep}!important; }
					`;
				}
			} else if (isBilibili) {
				// 导航栏
				eleStyle.innerHTML += `
					body, #internationalHeader, #internationalHeader > div.mini-header { background: ${black.bg.deep}; }
					.international-header .nav-search #nav_searchform { background-color: ${black.bg.light}; }
					.international-header .mini-type .nav-link .nav-link-ul .nav-link-item .link,
					.mini-type .nav-user-center .user-con .item .name,
					.video-toolbar .ops > span, .video-toolbar .appeal-text,
					.international-header .nav-search .nav-search-keyword,
					.bilibili-search-history .history-item a { color: ${black.font.deep}; }
					.international-header .mini-type .user-con.logout .item a { color: ${black.font.deep}!important; }
					.international-header .mini-type .nav-search #nav_searchform,
					.bilibili-search-history { background: ${black.bg.light}; border-color: ${black.bg.light}; color: ${black.font.deep}; }
					.bili-banner[data-v-3120f830] { background: ${black.bg.deep}!important; }
				`;
				// 导航栏头像下拉框
				eleStyle.innerHTML += `
					.van-popover { background: ${black.bg.light}!important; }
					.van-popper-avatar .nickname[data-v-0a67b02a],
					.van-popper-avatar .links .link-title[data-v-0a67b02a] { color: ${black.font.deep}; }
					.van-popper-avatar .level-info .grade[data-v-0a67b02a],
					.van-popover a, .van-popper-avatar .count-item .item-value[data-v-0a67b02a] { color: ${black.font.light}; }
					.van-popper-avatar .coins[data-v-0a67b02a],
					.van-popper-avatar .counts[data-v-0a67b02a],
					.van-popper-avatar .links[data-v-0a67b02a] { border-bottom-color: ${black.bg.light}!important; }
					.van-popper-avatar .links .link-item[data-v-0a67b02a]:hover,
					.van-popper-avatar .logout a[data-v-0a67b02a]:hover { background: ${black.bg.deep}!important; }
					.van-popper-avatar .level-intro[data-v-0a67b02a] { background: ${black.bg.light}!important; color: ${black.font.light}; }
				`;
				// 登录
				eleStyle.innerHTML += `
					.van-popper-login .title[data-v-106692e2], .lang-intro-item, .lang-change .lang-title { color: ${black.font.deep}; }
					.van-popper-login .vp-container[data-v-106692e2], .lang-change { background-color: ${black.bg.deep}; border-color: ${black.bg.deep}; }
					.lang-change .lang-intro { background-color: ${black.bg.deep}; }
					.lang-change .lang-intro-item:hover { background-color: ${black.bg.light}; }
					.lang-change .lang-item:hover { background-color: ${black.bg.light}; }
				`;
				if (isBilibiliHome) {
					// 导航栏下边
					eleStyle.innerHTML += `
						.page-tab .con li { border: 1px solid transparent; }
						.international-header a { color: ${black.font.deep}; }
						.tab-line-itnl { border-color: ${black.font.deep}; }
					`;
					// 主体部分
					eleStyle.innerHTML += `
						a { color: ${black.font.deep}; }
						div.international-home { background-color: ${black.bg.deep}; }
						.contact-help { box-shadow: none; }
					`;
					// 主体部分 - 推广
					eleStyle.innerHTML += `
						.storey-title .no-link, .storey-title .text-info a,
						.video-card-common .ex-title { color: ${black.font.deep}; }
					`;
					// 主体部分 - 正在直播
					eleStyle.innerHTML += `
						.storey-title .name, .storey-title .text-info,
						.live-card .up .txt .name, .live-card .up .txt .desc,
						.exchange-btn .btn { color: ${black.font.deep}; }
					`;
					// 主体部分 - 动画
					eleStyle.innerHTML += `
						.rank-header .name, .live-tabs .tab-switch,
						.rank-header .more { color: ${black.font.deep}; }
					`;
					// 主体部分 - 番剧
					eleStyle.innerHTML += `
						.time-line .tab-switch .tab-switch-item,
						.special-recommend header { color: ${black.font.deep}; }
						.time-line .tl-link { background-color: ${black.bg.deep}; }
					`;
					// 主体部分 - 漫画
					eleStyle.innerHTML += `
						.time-line .tab-switch .tab-switch-item,
						.manga-panel .tab-switch .tab-switch-item, .manga-panel .app-download-link,
						.special-recommend header, .manga-rank .tab-switch .tab-switch-item,
						.manga-panel .manga-list-box .manga-card .manga-title { color: ${black.font.deep}; }
					`;
					// 底部
					eleStyle.innerHTML += `
						body, .international-footer { background: ${black.bg.deep}; }
						.international-footer a, .international-footer .link-box .link-item.link-c p { color: ${black.font.deep}; }
						.international-footer .link-box .link-item { border-color: ${black.bg.light}; }
					`;
					// 右边导航栏
					eleStyle.innerHTML += `
						.elevator .list-box { background-color: ${black.bg.light}; border-color: ${black.bg.light}; }
						.elevator .list-box .item { background-color: ${black.bg.light}; color: ${black.font.deep}; }
						.elevator .list-box .item.sort { border-top-color: ${black.bg.light}; }
						.elevator .list-box .item.back-top { border-color: ${black.bg.light}; }
					`;
				} else if (isBilibiliVideo) {
					// 信息栏
					eleStyle.innerHTML += `
						.video-info .video-title .tit { color: ${black.font.deep}; }
					`;
					// 播放器
					eleStyle.innerHTML += `
						#bilibiliPlayer { box-shadow: none; }
						.bilibili-player-video-sendbar, .bilibili-player-video-sendbar .bilibili-player-video-inputbar { background-color: ${black.bg.light}; }
						.video-desc .info, .bilibili-player-video-info, .bilibili-player * { color: ${black.font.deep}; }
						.video-toolbar, .v-wrap .s_tag { border-bottom-color: ${black.bg.light}; }
						.bilibili-player-video-sendbar .bilibili-player-video-inputbar .bilibili-player-video-inputbar-wrap { background-color: ${black.bg.deep}; border-color: ${black.bg.deep}; }
						.s_tag .tag-area > li { background-color: ${black.bg.light}; border-color: ${black.bg.light}; }
						.bilibili-player-video-sendbar .bilibili-player-video-inputbar .bilibili-player-video-danmaku-input,
						.s_tag .tag-area>li>a { color: ${black.font.deep}; }
						.s_tag .btn-add { background-color: ${black.bg.light}; }
					`;
					// 相关推荐
					eleStyle.innerHTML += `
						.v-wrap .danmaku-wrap, .bui-collapse .bui-collapse-wrap, .bui-collapse .bui-collapse-header,
						.player-auxiliary-area .player-auxiliary-filter, .video-page-card .card-box .pic-box { background-color: ${black.bg.light}; }
						.up-info .u-info .name .message, .info .title[data-v-3220bba8],
						.up-info .u-info .name .username,
						.player-auxiliary-area .player-auxiliary-filter-title,
						.bui-collapse .bui-collapse-header .bui-collapse-arrow,
						.recommend-list .rec-title, .video-page-card .card-box .info .title { color: ${black.font.deep}; }
					`;
					// 活动
					eleStyle.innerHTML += `
						.activity-m .inside-wrp { border-color: ${black.bg.light}; color: ${black.font.deep}; }
					`;
					// 评论
					eleStyle.innerHTML += `
						.bb-comment .comment-send .textarea-container textarea { background-color: ${black.bg.light}!important; border-color: ${black.bg.light}!important; }
						.bb-comment .comment-send .comment-emoji { border-color: ${black.bg.light}!important; }
						.bb-comment { background: ${black.bg.deep}!important; }
						.comment-m .b-head, .bb-comment .comment-header .tabs-order li,
						.paging-box, .paging-box .tcd-number, .bb-comment * { color: ${black.font.deep}!important; }
						.bb-comment .comment-list .list-item .con { border-top-color: ${black.bg.light}!important; }
						.bb-comment .comment-send .comment-submit { color: #fff!important; }
					`;
					// 创作团队
					eleStyle.innerHTML += `
						.members-info__header[data-v-f843d968], .members-info .up-card .avatar[data-v-f843d968] { background-color: ${black.bg.light}!important; }
						.members-info__header .title[data-v-f843d968] { color: ${black.font.deep}; }
					`;
					// 返回顶端
					eleStyle.innerHTML += `
						.float-nav .nav-menu .item { background-color: ${black.bg.light}!important; border-color: ${black.bg.light}; }
					`;
				} else if (isBilibiliAct) {
					// 主体
					eleStyle.innerHTML += `
						#app, .fixed-bg[data-v-00ee8950] { background: ${black.bg.deep}; }
					`;
					// 导航栏
					eleStyle.innerHTML += `
						.international-header .mini-type .nav-link .nav-link-ul .nav-link-item .link:hover { color: ${black.font.deep}; }
						.channel-menu-mini { background-color: ${black.bg.light}; }
						.channel-menu-mini .box a { color: ${black.font.light}; }
						.channel-menu-mini .box a:hover { background-color: ${black.bg.deep}; color: ${black.font.deep}; }
					`;
					// 个人信息
					eleStyle.innerHTML += `
						.user-panel[data-v-f8464120], .user-panel .content[data-v-f8464120],
						.feed-card .loading-content .loading-text[data-v-38950b07] { background: ${black.bg.light}; }
						.tc-black, .user-panel .content .bottom .number-part .numbers[data-v-f8464120] { color: ${black.font.deep}; }
					`;
					// 正在直播
					eleStyle.innerHTML += `
						.live-panel[data-v-21b530d8], .scroll-content[data-v-08ab5c2b] { background: ${black.bg.light}; }
						.live-panel-item .live-detail .up-name[data-v-d3f65ede] { color: ${black.font.deep}; }
					`;
					// 话题
					eleStyle.innerHTML += `
						.new-topic-panel[data-v-58cf9fb5], .new-topic-panel .tag-item .label[data-v-58cf9fb5] { background-color: ${black.bg.light}; }
						.new-topic-panel .tag-item .content[data-v-58cf9fb5] { color: ${black.font.light}; }
					`;
					// 公告栏
					eleStyle.innerHTML += `
						.notice-panel .img-container .notice-img[data-v-64440e39] { background-color: ${black.bg.light}; }
					`;
					// 发布动态
					eleStyle.innerHTML += `
						.editor[data-v-5cfa03f0], .publish-panel[data-v-e0d83596],
						.home-page .home-container .home-content .center-panel .section-block[data-v-00ee8950] { background-color: ${black.bg.light}; }
						.core-style[data-v-5cfa03f0] { background-color: ${black.bg.light}!important; color: ${black.font.deep} }
						.title[data-v-b3d54e6c], .emoji[data-v-60ae9c4d] { background-color: ${black.bg.deep}; }
						.title[data-v-268b12ee] { color: ${black.font.deep} }
						.static-popup[data-v-b3d54e6c], .static-popup[data-v-268b12ee] { background-color: ${black.bg.deep}; border-color: ${black.bg.deep} }
					`;
					// 动态
					eleStyle.innerHTML += `
						.card, .card-list { background-color: ${black.bg.light}!important; }
						.feed-title[data-v-baaa0e9e], .feed-card[data-v-38950b07], .most-viewed-panel[data-v-28eb68ea],
						.tab-bar[data-v-58304b2a], .img-content[data-v-2ef3df58] { background-color: ${black.bg.light}; color: ${black.font.deep}; }
						.card[data-v-62336402], .video-container[data-v-3022fc8b],
						.article-container[data-v-3d352df6] { background-color: ${black.bg.light}; border-color: ${black.bg.light}!important; }
						.card .main-content .user-name a[data-v-62336402] { color: ${black.font.deep}; }
						.content-full[data-v-77d7458b], .content-ellipsis[data-v-77d7458b] { color: ${black.font.light}; }
						.card-content .repost[data-v-0ff3934a] { background-color: ${black.bg.light}; }
						.article-container .text-area .title[data-v-3d352df6],
						.video-container .text-area .title[data-v-3022fc8b],
						.card .main-content .user-name a[data-v-0636105e] { color: ${black.font.deep}; }
						.article-container:hover .text-area[data-v-3d352df6] { box-shadow: none; }
						.card .button-area .more-button[data-v-62336402] { color: ${black.font.deep}; }
						.card .more-panel[data-v-62336402],
						.card .more-panel[data-v-62336402]:after { background-color: ${black.bg.deep}; border-color: ${black.bg.deep}!important; color: ${black.font.deep}; }
					`;
					// 登陆板子
					eleStyle.innerHTML += `
						.login-panel[data-v-23be4e6a], .notice-panel[data-v-64440e39] { background-color: ${black.bg.light}; }
						.title h1[data-v-23be4e6a], .notice-panel .title[data-v-64440e39] { color: ${black.font.deep}; }
					`;
				} else if (isBilibiliRank) {
					// 导航栏下面
					eleStyle.innerHTML += `
						.primary-menu-itnl, .page-tab .con li { border-color: transparent; }
						.international-header a, .rank-menu li { color: ${black.font.deep}; }
						.other { border-color: ${black.font.light};; }
					`;
					// 主体
					eleStyle.innerHTML += `
						.rank-tab-wrap, .rank-list-head .rank_tips { background-color: ${black.bg.light}; }
						.rank-tab-wrap .rank-dropdown { background-color: ${black.bg.deep}; border-color: ${black.bg.deep}; color: ${black.font.deep}; }
						.rank-tab-wrap .rank-tab, .rank-list-head .rank_tips,
						.rank-item .content .info .title, .other .other-link .title { color: ${black.font.deep}; }
						.rank-item { border-bottom-color: ${black.bg.light}; }
						.rank-item:hover { box-shadow: 0 2px 5px ${black.bg.light}; }
					`;
				} else if (isBilibiliLive) {
					// 导航栏
					eleStyle.innerHTML += `
						.link-navbar[data-v-1118c224] { background: ${black.bg.deep}; }
						.link-navbar .main-ctnr .nav-logo[data-v-1118c224], .link-navbar .nav-item[data-v-3c413834],
						.shortcuts-ctnr[data-v-250967d4] { color: ${black.font.deep}; }
						.search-bar-ctnr .search-bar[data-v-7b227b1e] { background-color: ${black.bg.light}; }
						.search-bar-ctnr .search-bar input[data-v-7b227b1e] { color: ${black.font.light}; }
						.link-navbar-ctnr { background: ${black.bg.deep}; box-shadow: none; }
					`;
					// 主体
					eleStyle.innerHTML += `
						.room-bg[data-v-0654e230]:after { background: ${black.bg.deep}; }
					`;
					// 主播信息
					eleStyle.innerHTML += `
						#head-info-vm { background: ${black.bg.deep}!important; border-color: ${black.bg.light}!important; }
						.room-title[data-v-3d2a7540] { color: ${black.font.deep}; }
					`;
					// 礼物栏
					eleStyle.innerHTML += `
						#gift-control-vm { background: ${black.bg.deep}!important; border-color: ${black.bg.deep}!important; }
						.gift-sender-panel[data-v-1a9c7a62] { background: ${black.bg.light}; }
						.gift-info-title[data-v-2a59e9ce] { color: ${black.font.deep}; }
						.count-choice[data-v-2a59e9ce] { background: ${black.bg.light}; border-color: ${black.bg.light}; }
						.choice-item[data-v-8932cea6] { background: ${black.bg.light}; color: ${black.font.light}; }
						.choice-item.active[data-v-8932cea6], .choice-item[data-v-8932cea6]:hover { background: ${black.bg.light}; }
						.link-input[data-v-d24aeb24] { background: ${black.bg.deep}; color: ${black.font.deep}; }
						.gift-item.buy.hover[data-v-43f6afd4], .gift-item.buy[data-v-43f6afd4]:hover { background: ${black.bg.deep}; }
						.gift-control-panel .right-part .gift-presets .gift-panel-box[data-v-5e37006c] { background: ${black.bg.light}; }
						.gift-item .label[data-v-43f6afd4] { color: ${black.font.light}; }
						.count-choice[data-v-04fb3a0e] { background: ${black.bg.light}; border-color: ${black.bg.light}; }
						.awarding-panel[data-v-7e6fabd1] { background: ${black.bg.deep}; border-color: ${black.bg.deep}; color: ${black.font.deep}; }
					`;
					// 简介
					eleStyle.innerHTML += `
						.content-wrapper[data-v-2e6a8a0b] { background: ${black.bg.deep}; border-color: ${black.bg.deep}; }
						.room-introduction-tags[data-v-325717da] { border-bottom-color: ${black.font.light};  }
					`;
					// 弹幕
					eleStyle.innerHTML += `
						.chat-history-panel,
						.live-room-app .app-content .app-body .player-and-aside-area .aside-area .chat-control-panel { background: ${black.bg.deep}; }
						.chat-input[data-v-4a6a1454] { background-color: ${black.bg.light}; border-color: ${black.bg.light}; color: ${black.font.light}; }
						.danmaku-content { color: ${black.font.deep}; }
						#aside-area-vm { border-color: ${black.bg.light}; }
						#rank-list-vm, #rank-list-ctnr-box { background-color: ${black.bg.deep}!important; }
					`;
					// 主播公告
					eleStyle.innerHTML += `
						.announcement-cntr[data-v-74afbc60] { background-color: ${black.bg.deep}; border-color: ${black.bg.deep}; }
						.announcement-cntr .content[data-v-74afbc60] { border-top-color: ${black.font.light}; color: ${black.font.light}; }
						.glory-name[data-v-550db3af] { color: ${black.font.deep}; }
					`;
					// 绘马祈愿
					eleStyle.innerHTML += `
						.ema-wishing.ema-wishing[data-v-86b8b1ec] { background-color: ${black.bg.deep}; border-color: ${black.bg.deep}; }
						.title[data-v-86b8b1ec] { color: ${black.font.deep}; }
					`;
					// 动态
					eleStyle.innerHTML += `
						.feed-title[data-v-648a58c6] { background-color: ${black.bg.deep}; color: ${black.font.deep}; }
						.card[data-v-71e01794] { background-color: ${black.bg.deep}; border-color: ${black.bg.deep}!important; }
						.content-full[data-v-77d7458b] { color: ${black.font.deep}; }
						.card-content .repost[data-v-4f2a88dc] { background-color: ${black.bg.light}; }
						.video-container[data-v-3022fc8b] { background-color: ${black.bg.light}; border-color: ${black.bg.light}; }
						.video-container .text-area .title[data-v-3022fc8b] { color: ${black.font.deep}; }
					`;
					// 右部侧边栏
					eleStyle.innerHTML += `
						.side-bar-cntr[data-v-75105314] { background-color: ${black.bg.deep}; border-color: ${black.bg.deep}; }
					`;
					// 底部
					eleStyle.innerHTML += `
						.link-footer[data-v-237d6c0f] { background-color: ${black.bg.deep}; border-top-color: ${black.bg.deep}; }
					`;
				}
			} else if (isHuya) {
				eleStyle.innerHTML += `
					body { background-color: ${black.bg.deep}!important; }
				`;
				// 导航栏
				eleStyle.innerHTML += `
					.hy-header-style-normal .duya-header-wrap { background-color: ${black.bg.deep}!important; border-bottom-color: ${black.bg.deep}!important; }
					.hy-header-style-normal .hy-nav-link,
					.hy-header-style-normal .hy-nav-title,
					.duya-header .nav-user .nav-user-title span { color: ${black.font.deep}!important; }
					.hy-header-style-normal .duya-header-search input,
					.hy-header-style-normal .duya-header-search input:focus { background-color: ${black.bg.light}!important; }
					.search-suggest .search-item { color: ${black.font.light}!important; }
					.search-suggest .search-item:hover { background-color: ${black.bg.deep}!important; }
					.nav-expand-list { background-color: ${black.bg.light}!important; }
					.nav-expand-game dt { color: ${black.font.deep}!important; }
					.nav-expand-game dd a { color: ${black.font.light}!important; border-color: ${black.font.light}!important; }
					.video-title, .hy-header-match-sec-hd { color: ${black.font.deep}!important; }
					.video-item, span.match-name { color: ${black.font.light}!important; }
					.video-item:hover { background-color: ${black.bg.light}!important; }
					.nav-expand-list-more, .tt-user-card .u-links { background-color: ${black.bg.light} }
					.nav-expand-history .history-bd li a,
					.tt-user-card .u-info .exp .between,
					.tt-user-card .u-info .nick, .tt-user-card .u-assets,
					.tt-user-card .u-task .task-mod .mod-tit { color: ${black.font.deep}!important; }
					.search-suggest { background-color: ${black.bg.light}!important; }
					.tt-user-card .u-task .task-mod { border-top-color: ${black.bg.light}!important; }
				`;
				// 侧边栏
				eleStyle.innerHTML += `
					.sidebar-hide { background-color: ${black.bg.deep}!important; border-bottom-color: ${black.bg.deep}!important; }
					.sidebar-hide .sidebar-icon-item { border-bottom-color: ${black.bg.deep}!important; }
				`;
				// 主体
				eleStyle.innerHTML += `
					#J_spbg, .room-wrap, #J_roomPlayerLayer,
					body.mode-page-theater .room-core, .match_body_wrap { background-color: ${black.bg.deep}!important; }
					#J_mainRoom { background: ${black.bg.deep}!important; }
					#J_spbg > img { display: none; }
				`;
				// 主播信息 
				eleStyle.innerHTML += `
					.room-hd, #share-entrance { background-color: ${black.bg.deep}!important; }
					.room-hd .host-info .host-title h1 { color: ${black.font.deep}!important; }
				`;
				// 礼物栏
				eleStyle.innerHTML += `
					#player-gift-wrap,
					.player-face .player-face-arrow { background-color: ${black.bg.deep}!important; }
					.player-face .player-face-arrow:hover { background-color: ${black.bg.deep}!important; }
					.player-face li .plaer-face-icon-bg { border-color: ${black.bg.light}!important; }
					.player-face li:hover .plaer-face-icon-bg { background-color: ${black.bg.deep}!important; }
					#player-gift-tip, #player-gift-tip .bottom { background-color: ${black.bg.deep}!important; border-color: ${black.bg.deep}!important; }
					#player-gift-tip .arrow1:after, #player-gift-tip .arrow1:before { border-color: ${black.bg.deep}!important; }
					#player-gift-tip .btns li { background-color: ${black.bg.light}; border-color: ${black.bg.light}!important; color: ${black.font.light}!important; }
					.player-gift-left, .player-gift-right { background-color: ${black.bg.deep}!important; }
					#player-gift-tip .txt h3 { color: ${black.font.deep}!important; }
				`;
				// 弹幕栏
				eleStyle.innerHTML += `
					.room-profileNotice, .room-profileNotice div { background-color: ${black.bg.light}!important; border-color: ${black.bg.light}!important; }
					.liveStatus-replay .week-rank__btn { background-color: ${black.bg.light}!important; color: ${black.font.light}!important; }
					.week-rank__bd .week-rank__unit { background-color: ${black.bg.light}!important; border-color: ${black.bg.light}!important; color: ${black.font.deep}!important; }
					.week-rank__bd li:hover { background-color: ${black.bg.light}!important; }
					.room-sidebar { background-color: ${black.bg.deep}!important; border-color: ${black.bg.light}!important; }
					.chat-room__list .msg-nobleSpeak { background-color: ${black.bg.deep}!important; }
					.chat-room__list .msg { color: ${black.font.deep}; }
					#tipsOrchat { border-top-color: ${black.bg.deep}!important; }
					.chat-room__ft { background-color: ${black.bg.deep}!important; }
					.chat-room__ft .chat-room__ft__chat, .chat-room__input { border-color: ${black.bg.deep}!important; }
					.chat-room__input .msg-input textarea { background-color: ${black.bg.light}!important; color: ${black.font.light}!important }
					.fansBadge-box { background-color: ${black.bg.deep}!important; color: ${black.font.light}!important; }
					.room-panel { background-color: ${black.bg.light}!important; border-color: ${black.bg.light}!important; color: ${black.font.light}!important; }
					.fansBadge-hig { color: ${black.font.light}!important; }
					.chat-room__list .msg-timed span { background-color: ${black.bg.light}!important; }
				`;
				// 主播动态
				eleStyle.innerHTML += `
					.room-moments .moments-nav .moments-nav-item { color: ${black.font.deep}!important; }
					.room-moments .moments-content { background-color: ${black.bg.deep}!important; }
					.moment-item { background-color: ${black.bg.deep}!important; border-color: ${black.bg.deep}!important; }
					.moment-item .moment-cnt { color: ${black.font.deep}!important; }
					.moment-item .interacts-comment { color: ${black.font.light}!important; }
					.moment-item .moment-comment { background-color: ${black.bg.light}!important; border-color: ${black.bg.light}!important; }
					._1ZYvj2uEXcHWFv7awTHSeB { color: ${black.font.light}!important; }
					._2YIUQGPP7SUwr8QErlnVDk._3nr_XoL7ZMsSeLA84_9TNq { border-color: ${black.font.light}!important; }
					.moment-item .moment-video { background-color: ${black.bg.deep}!important; }
				`;
				// 签约工会
				eleStyle.innerHTML += `
					.room-union .union-title { color: ${black.font.deep}!important; }
					.room-union .union-box { background-color: ${black.bg.light}!important; border-color: ${black.bg.light}!important; }
					.room-union .union-name { color: ${black.font.deep}!important; }
				`;
				// 猜你喜欢
				eleStyle.innerHTML += `
					.room-youlike .youlike-title { color: ${black.font.deep}!important; }
					.room-youlike .youlike-box, .youlike-item .amount { background-color: ${black.bg.light}!important; }
					.youlike-item .nick { color: ${black.font.deep}!important; }
					.youlike-item .title { color: ${black.font.light}!important; }
				`;
				if (isHuyaFollow) {
					eleStyle.innerHTML += `
						.list-hd .title, .subscribe-live-item .txt .msg-row .nick { color: ${black.font.deep}!important; }
						.subscribe-live-item, .hy-side .hy-side-nav-item { background-color: ${black.bg.light}!important; }
						.subscribe-live-item:hover { box-shadow: 2px 2px 10px ${black.bg.light}; }
						.list-hd .follow-ctrl { background-color: ${black.bg.deep}!important;  }
					`;
				}
			}
			document.body.appendChild(eleStyle);
		} else {
			if ($H2P('style#h2p-style-blackMode')) { $H2P('style#h2p-style-blackMode').remove(); }
		}
	}
	if (config_clear.blackMode) { blackMode(); }

	const whiteBase64s = {
        douyu: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTg4OTA0NDY4Njk1IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjIxMTkiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNODUzLjMzMzMzMyA2NTMuNDRMOTk0Ljc3MzMzMyA1MTIgODUzLjMzMzMzMyAzNzAuNTZWMTcwLjY2NjY2N2gtMTk5Ljg5MzMzM0w1MTIgMjkuMjI2NjY3IDM3MC41NiAxNzAuNjY2NjY3SDE3MC42NjY2Njd2MTk5Ljg5MzMzM0wyOS4yMjY2NjcgNTEyIDE3MC42NjY2NjcgNjUzLjQ0Vjg1My4zMzMzMzNoMTk5Ljg5MzMzM0w1MTIgOTk0Ljc3MzMzMyA2NTMuNDQgODUzLjMzMzMzM0g4NTMuMzMzMzMzdi0xOTkuODkzMzMzek01MTIgNzY4Yy0xNDEuNDQgMC0yNTYtMTE0LjU2LTI1Ni0yNTZzMTE0LjU2LTI1NiAyNTYtMjU2IDI1NiAxMTQuNTYgMjU2IDI1Ni0xMTQuNTYgMjU2LTI1NiAyNTZ6IiBwLWlkPSIyMTIwIiBmaWxsPSIjZmZmZmZmIj48L3BhdGg+PC9zdmc+',
        bilibili: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTg4OTA0NDY4Njk1IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjIxMTkiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNODUzLjMzMzMzMyA2NTMuNDRMOTk0Ljc3MzMzMyA1MTIgODUzLjMzMzMzMyAzNzAuNTZWMTcwLjY2NjY2N2gtMTk5Ljg5MzMzM0w1MTIgMjkuMjI2NjY3IDM3MC41NiAxNzAuNjY2NjY3SDE3MC42NjY2Njd2MTk5Ljg5MzMzM0wyOS4yMjY2NjcgNTEyIDE3MC42NjY2NjcgNjUzLjQ0Vjg1My4zMzMzMzNoMTk5Ljg5MzMzM0w1MTIgOTk0Ljc3MzMzMyA2NTMuNDQgODUzLjMzMzMzM0g4NTMuMzMzMzMzdi0xOTkuODkzMzMzek01MTIgNzY4Yy0xNDEuNDQgMC0yNTYtMTE0LjU2LTI1Ni0yNTZzMTE0LjU2LTI1NiAyNTYtMjU2IDI1NiAxMTQuNTYgMjU2IDI1Ni0xMTQuNTYgMjU2LTI1NiAyNTZ6IiBwLWlkPSIyMTIwIiBmaWxsPSIjZmZmZmZmIj48L3BhdGg+PC9zdmc+',
		bilibiliVideo: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTg4OTA0NDY4Njk1IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjIxMTkiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNODUzLjMzMzMzMyA2NTMuNDRMOTk0Ljc3MzMzMyA1MTIgODUzLjMzMzMzMyAzNzAuNTZWMTcwLjY2NjY2N2gtMTk5Ljg5MzMzM0w1MTIgMjkuMjI2NjY3IDM3MC41NiAxNzAuNjY2NjY3SDE3MC42NjY2Njd2MTk5Ljg5MzMzM0wyOS4yMjY2NjcgNTEyIDE3MC42NjY2NjcgNjUzLjQ0Vjg1My4zMzMzMzNoMTk5Ljg5MzMzM0w1MTIgOTk0Ljc3MzMzMyA2NTMuNDQgODUzLjMzMzMzM0g4NTMuMzMzMzMzdi0xOTkuODkzMzMzek01MTIgNzY4Yy0xNDEuNDQgMC0yNTYtMTE0LjU2LTI1Ni0yNTZzMTE0LjU2LTI1NiAyNTYtMjU2IDI1NiAxMTQuNTYgMjU2IDI1Ni0xMTQuNTYgMjU2LTI1NiAyNTZ6IiBwLWlkPSIyMTIwIiBmaWxsPSIjMjEyMTIxIj48L3BhdGg+PC9zdmc+',
		finally: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTg4ODU0ODgyOTUxIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjIxMzYiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNTEyIDc2OEMzNzAuNzczMzMzIDc2OCAyNTYgNjUzLjIyNjY2NyAyNTYgNTEyIDI1NiAzNzAuNzczMzMzIDM3MC43NzMzMzMgMjU2IDUxMiAyNTYgNjUzLjIyNjY2NyAyNTYgNzY4IDM3MC43NzMzMzMgNzY4IDUxMiA3NjggNjUzLjIyNjY2NyA2NTMuMjI2NjY3IDc2OCA1MTIgNzY4TTg1My4zMzMzMzMgNjUzLjIyNjY2NyA5OTQuNTYgNTEyIDg1My4zMzMzMzMgMzcwLjc3MzMzMyA4NTMuMzMzMzMzIDE3MC42NjY2NjcgNjUzLjIyNjY2NyAxNzAuNjY2NjY3IDUxMiAyOS40NCAzNzAuNzczMzMzIDE3MC42NjY2NjcgMTcwLjY2NjY2NyAxNzAuNjY2NjY3IDE3MC42NjY2NjcgMzcwLjc3MzMzMyAyOS40NCA1MTIgMTcwLjY2NjY2NyA2NTMuMjI2NjY3IDE3MC42NjY2NjcgODUzLjMzMzMzMyAzNzAuNzczMzMzIDg1My4zMzMzMzMgNTEyIDk5NC41NiA2NTMuMjI2NjY3IDg1My4zMzMzMzMgODUzLjMzMzMzMyA4NTMuMzMzMzMzIDg1My4zMzMzMzMgNjUzLjIyNjY2N1oiIHAtaWQ9IjIxMzciIGZpbGw9IiNhN2E3YTciPjwvcGF0aD48L3N2Zz4=',
    };
	const blackBase64 = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTg4ODU0MzQ2ODgzIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjIxMjciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNTEyIDc2OHExMDUuOTg0IDAgMTgwLjk5Mi03NS4wMDh0NzUuMDA4LTE4MC45OTItNzUuMDA4LTE4MC45OTItMTgwLjk5Mi03NS4wMDhxLTUyLjAxMDY2NyAwLTEwNS45ODQgMjQuMDIxMzMzIDY2LjAwNTMzMyAyOS45OTQ2NjcgMTA3LjAwOCA5My4wMTMzMzN0NDEuMDAyNjY3IDEzOS4wMDgtNDEuMDAyNjY3IDEzOS4wMDgtMTA3LjAwOCA5My4wMTMzMzNxNTQuMDE2IDI0LjAyMTMzMyAxMDUuOTg0IDI0LjAyMTMzM3pNODU0LjAxNiAzNzAuMDA1MzMzbDEzOS45ODkzMzMgMTQxLjk5NDY2Ny0xMzkuOTg5MzMzIDE0MS45OTQ2NjcgMCAyMDAuMDIxMzMzLTIwMC4wMjEzMzMgMC0xNDEuOTk0NjY3IDEzOS45ODkzMzMtMTQxLjk5NDY2Ny0xMzkuOTg5MzMzLTIwMC4wMjEzMzMgMCAwLTIwMC4wMjEzMzMtMTM5Ljk4OTMzMy0xNDEuOTk0NjY3IDEzOS45ODkzMzMtMTQxLjk5NDY2NyAwLTIwMC4wMjEzMzMgMjAwLjAyMTMzMyAwIDE0MS45OTQ2NjctMTM5Ljk4OTMzMyAxNDEuOTk0NjY3IDEzOS45ODkzMzMgMjAwLjAyMTMzMyAwIDAgMjAwLjAyMTMzM3oiIHAtaWQ9IjIxMjgiIGZpbGw9IiNhN2E3YTciPjwvcGF0aD48L3N2Zz4=';

    const whiteBase64 = isDouyu ? whiteBase64s.finally : (isBilibili ? (isBilibiliHome || isBilibiliRank ? whiteBase64s.bilibili : whiteBase64s.bilibiliVideo) : whiteBase64s.finally);

	new Promise((resolve, reject) => {
		let eleStyle = document.createElement('style');
		eleStyle.innerHTML += `
			#h2p-img-blackMode { cursor: pointer; }
			.h2p-dropdown {
				position	: relative;
				display		: inline-block;
				vertical-align: middle;
			}
			.h2p-dropdown:hover .h2p-dropdown-menu {
				display		: flex;
				visibility	: visible;
			}
			.h2p-dropdown-menu {
				position	: absolute;
				left		: -97px;
				top			: ${isDouyu ? '' : (isBilibili ? '20px' : '')};
				width		: 210px;
				padding		: 10px;
				border		: 1px solid #d2d2d2;
				border-radius: 5px;
				box-shadow	: 0 2px 6px rgba(0,0,0,.1);
				background	: #ffffff;
				color		: #000000;
				display		: flex;
				visibility	: hidden;
				flex-flow	: row wrap;
				font-size	: 15px;
				font-family	: WeibeiSC-Bold, STKaiti;
				z-index		: 999;
			}
			.h2p-dropdown .h2p-flex-main-start, .h2p-dropdown .h2p-flex-main-center {
				margin		: 0;
			}
			.h2p-dropdown span {
				cursor		: default;
				user-select	: none;
			}
			#h2p-div-blackMode-select span {
				margin-left	: 2px; 
			}
			.h2p-dropdown .input-color-show {
				cursor		: pointer;
				width		: 50px;
				height		: 20px;
				padding		: 0;
				margin-left	: 10px;
				outline		: none;
			}
			#h2p-div-blackMode-BG {
				position	: fixed;
				top			: 0;
				left		: 0;
				width		: 100%;
				height		: 100%;
				display		: none;
				opacity		: 0;
			}
        `;
        if (isDouyu) {}
        else if (isBilibili) {
            eleStyle.innerHTML += `
				a.link.van-popover__reference[href$="app.bilibili.com"] { display: none!important; }
            `;
        }
		document.head.appendChild(eleStyle);

		let div = document.createElement('div');
		div.className = 'h2p-dropdown';
		div.title = '黑暗模式';
        if (isDouyu) {
			div.style = 'position: relative; float: left; margin: 15px -20px 15px 20px;';
            div.innerHTML = `
                <img id="h2p-img-blackMode" class="h2p-dropdown-img" style="width: 30px; height: 30px;" src="${config_clear.blackMode ? blackBase64 : whiteBase64}">
            `;
        }
        else if (isBilibili) {
			if (isBilibiliHome || isBilibiliAct || isBilibiliRank || isBilibiliVideo) {
				div.style = 'display: flex; justify-content: center;';
				div.classList.add('nav-link-item');
			} else if (isBilibiliLive) {
				div.style = 'margin: 0 13px; justify-content: center;';
			}
            div.innerHTML = `
                <img id="h2p-img-blackMode" style="width: 20px; height: 20px;" src="${config_clear.blackMode ? blackBase64 : whiteBase64}">
            `;
        } else if (isHuya) {
			div.classList.add('hy-nav-right');
			div.style = 'position: absolute; right: -35px;';
			div.innerHTML = `
                <img id="h2p-img-blackMode" style="width: 25px; height: 25px;" src="${config_clear.blackMode ? blackBase64 : whiteBase64}">
            `;
		} else {
			div.style = '';
            div.innerHTML = `
                <img id="h2p-img-blackMode" style="width: 25px; height: 25px;" src="${config_clear.blackMode ? blackBase64 : whiteBase64}">
            `;
		}

		let divDropDown = document.createElement('div');
		divDropDown.className = 'h2p-dropdown-menu';
		if (isDouyu) {
		} else if (isBilibili) {
		} else if (isHuya) {
			divDropDown.style = 'left: -112px;';
		}
		divDropDown.innerHTML += `
			<div id="h2p-div-blackMode-select" style="width: 100%;">
				<div class="h2p-flex-main-center h2p-item-100p" style="margin-bottom: 5px;">
					<div class="h2p-flex-main-start h2p-item-50p">
						<input id="h2p-input-blackMode-grey" type="checkbox">
						<span>灰色</span>
					</div>
					<div class="h2p-flex-main-start h2p-item-50p">
						<input id="h2p-input-blackMode-black" type="checkbox">
						<span>黑色</span>
					</div>
				</div>
				<div class="h2p-flex-main-start h2p-item-100p" style="margin-bottom: 5px;">
					<div class="h2p-flex-main-start h2p-item-50p">
						<input id="h2p-input-blackMode-DIY" type="checkbox">
						<span>自定义</span>
					</div>
				</div>
			</div>
			<div id="h2p-div-blackMode-set" style="width: 100%;">
				<div class="h2p-flex-main-start h2p-item-100p" style="margin-bottom: 5px;">
					<div class="h2p-flex-main-start h2p-item-50p">
						<span>背景</span>
						<input id="h2p-input-blackMode-DIY-BG-deep" class="input-color-show" type="color" value="#2d2e37">
					</div>
					<div class="h2p-flex-main-start h2p-item-50p">
						<span>面板</span>
						<input id="h2p-input-blackMode-DIY-BG-light" class="input-color-show" type="color" value="#363636">
					</div>
				</div>
				<div class="h2p-flex-main-start h2p-item-100p" style="margin-bottom: 5px;">
					<div class="h2p-flex-main-start h2p-item-50p">
						<span>标题</span>
						<input id="h2p-input-blackMode-DIY-font-deep" class="input-color-show" type="color" value="#a7a7a7">
					</div>
					<div class="h2p-flex-main-start h2p-item-50p">
						<span>正文</span>
						<input id="h2p-input-blackMode-DIY-font-light" class="input-color-show" type="color" value="#888888">
					</div>
				</div>
			</div>
		`;
		div.appendChild(divDropDown);

		let setINVL_wait_div_header = setInterval(() => {
            if ($H2P('img#h2p-img-blackMode')) {
                window.clearInterval(setINVL_wait_div_header);
                setINVL_wait_div_header = null;
                return;
            }

			if (isDouyu && $H2P('div.Header-right')) {
				window.clearInterval(setINVL_wait_div_header);
				setINVL_wait_div_header = null;
				$H2P('div.Header-right').appendChild(div);
				resolve();
			} else if (isBilibili) {
				if (isBilibiliHome || isBilibiliAct || isBilibiliRank || isBilibiliVideo) {
					if ($H2P('ul.nav-link-ul > li:nth-child(8)')) {
						window.clearInterval(setINVL_wait_div_header);
						setINVL_wait_div_header = null;
						$H2P('ul.nav-link-ul').appendChild(div);
						resolve();
					}
				} else if (isBilibiliLive) {
					if ($H2P('div.dp-table-cell.v-middle > a[data-v-3c413834]:nth-child(10)')) {
						window.clearInterval(setINVL_wait_div_header);
						setINVL_wait_div_header = null;
						$H2P('div.dp-table-cell.v-middle > a[data-v-3c413834]:nth-child(10)').parentNode.appendChild(div);
						resolve();
					}
				}
			} else if (isHuya && $H2P('div#J_duyaHeaderRight')) {
				window.clearInterval(setINVL_wait_div_header);
				setINVL_wait_div_header = null;
				$H2P('div.duya-header-bd').appendChild(div);
				resolve();
			}
			
			if (!isDouyu && !isBilibili && !isHuya) {
				window.clearInterval(setINVL_wait_div_header);
				setINVL_wait_div_header = null;
				div.style.left = '250px';
				document.body.appendChild(div);
				resolve();
			}
		}, 500);
	})
	.then(() => {
		document.addEventListener('keydown', (e) => {
			// 黑暗模式快捷键
			if (e.shiftKey && e.which == myKeyCode.z) { $H2P('img#h2p-img-blackMode').click(); }
		});

		let eleBM = $H2P('img#h2p-img-blackMode');
		eleBM.addEventListener('click', () => {
			config_clear.blackMode = !config_clear.blackMode;
			localStorage.setItem(LSClear, JSON.stringify(config_clear));
			eleBM.src = config_clear.blackMode ? blackBase64 : whiteBase64;
			updateClearModeIcon();
			blackMode();
		});

		let eleSelect = $H2P('div#h2p-div-blackMode-select');
		eleSelect.addEventListener('click', (event) => {
			if (event.target.tagName.toLowerCase() !== 'input') { return; }

			const target = event.target;
			if (target.id === 'h2p-input-blackMode-grey') {
				config_clear.BMGrey = true;
				config_clear.BMBlack = false;
				config_clear.BMDIY = false;
				$H2P('input#h2p-input-blackMode-grey').checked = config_clear.BMGrey;
				$H2P('input#h2p-input-blackMode-black').checked = false;
				$H2P('input#h2p-input-blackMode-DIY').checked = false;
			} else if (target.id === 'h2p-input-blackMode-black') {
				config_clear.BMGrey = false;
				config_clear.BMBlack = true;
				config_clear.BMDIY = false;
				$H2P('input#h2p-input-blackMode-grey').checked = false;
				$H2P('input#h2p-input-blackMode-black').checked = config_clear.BMBlack;
				$H2P('input#h2p-input-blackMode-DIY').checked = false;
			} else if (target.id === 'h2p-input-blackMode-DIY') {
				config_clear.BMGrey = false;
				config_clear.BMBlack = false;
				config_clear.BMDIY = true;
				$H2P('input#h2p-input-blackMode-grey').checked = false;
				$H2P('input#h2p-input-blackMode-black').checked = false;
				$H2P('input#h2p-input-blackMode-DIY').checked = config_clear.BMDIY;
			}
			localStorage.setItem(LSClear, JSON.stringify(config_clear));
			blackMode();
		})

		$H2P('input#h2p-input-blackMode-DIY-BG-deep').addEventListener('change', (event) => {
			config_clear.BMBGDeep = event.target.value;
			localStorage.setItem(LSClear, JSON.stringify(config_clear));
			blackMode();
		}, false);
		$H2P('input#h2p-input-blackMode-DIY-BG-light').addEventListener('change', (event) => {
			config_clear.BMBGLight = event.target.value;
			localStorage.setItem(LSClear, JSON.stringify(config_clear));
			blackMode();
		}, false);
		$H2P('input#h2p-input-blackMode-DIY-font-deep').addEventListener('change', (event) => {
			config_clear.BMFontDeep = event.target.value;
			localStorage.setItem(LSClear, JSON.stringify(config_clear));
			blackMode();
		}, false);
		$H2P('input#h2p-input-blackMode-DIY-font-light').addEventListener('change', (event) => {
			config_clear.BMFontLight = event.target.value;
			localStorage.setItem(LSClear, JSON.stringify(config_clear));
			blackMode();
		}, false);
	})
	.then(() => {
		if (config_clear.BMGrey) { $H2P('input#h2p-input-blackMode-grey').checked = true; }
		if (config_clear.BMBlack) { $H2P('input#h2p-input-blackMode-black').checked = true; }
		if (config_clear.BMDIY) { $H2P('input#h2p-input-blackMode-DIY').checked = true; }

		if (config_clear.BMBGDeep) { $H2P('input#h2p-input-blackMode-DIY-BG-deep').value = config_clear.BMBGDeep; }
		if (config_clear.BMBGLight) { $H2P('input#h2p-input-blackMode-DIY-BG-light').value = config_clear.BMBGLight; }
		if (config_clear.BMFontDeep) { $H2P('input#h2p-input-blackMode-DIY-font-deep').value = config_clear.BMFontDeep; }
		if (config_clear.BMFontLight) { $H2P('input#h2p-input-blackMode-DIY-font-light').value = config_clear.BMFontLight; }
	})








// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //
// 
// 															清爽模式
// 
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //

	function clearNav () {
		console.log(`${config_clear.isClearNav ? '启动' : '关闭'} : 清爽导航栏`);
		if (config_clear.isClearNav) {
			if ($H2P('style#h2p-style-clear-nav')) { return; }
			let eleStyle = document.createElement('style');
			eleStyle.id = 'h2p-style-clear-nav';
			if (isDouyu) {
				// 斗鱼 logo、游戏、活动
				eleStyle.innerHTML += `
					a.Header-logo, div.public-DropMenu.Game, div.HeaderNav,
					.HeaderGif-left, .HeaderGif-right { display: none!important; }
				`;
				// 客户端、开播
				eleStyle.innerHTML += `
					div.Header-download-wrap, div.Header-broadcast-wrap { display: none!important; }
				`;
				// 用户头像 hover
				eleStyle.innerHTML += `
					div.UserInfo div.Task, div.UserInfo div.CloudGameLink, div.Promotion { display: none!important; }
				`;
			} else if (isBilibili) {
				if (isBilibiliVideo) {
					// 游戏中心
					eleStyle.innerHTML += `
						ul.nav-link-ul > li.nav-link-item:nth-child(3) { display: none!important; }
					`;
					// 评论上方的活动
					eleStyle.innerHTML += `
						#activity_vote { display: none!important; }
					`;
				} else if (isBilibiliLive) {
					// 全部、下载
					eleStyle.innerHTML += `
						div.dp-table-cell.v-middle > a[data-v-3c413834]:nth-child(4),
						div.shortcuts-ctnr > div[data-v-250967d4]:nth-child(3) { display: none!important; }
					`;
				}
			} else if (isHuya) {
				// logo、开播、下载
				eleStyle.innerHTML += `
					#duya-header-logo, .hy-nav-kaibo, #hy-nav-download { display: none!important; }
				`;
				// 游戏广告
				eleStyle.innerHTML += `
					.nav-expand-list.nav-expand-game > a > img { display: none!important; }
				`;
			}
			document.body.appendChild(eleStyle);
		} else {
			if ($H2P('style#h2p-style-clear-nav')) { $H2P('style#h2p-style-clear-nav').remove(); }
		}
	}

	function clearInfo () {
		console.log(`${config_clear.isClearInfo ? '启动' : '关闭'} : 清爽主播信息`);
		if (config_clear.isClearInfo) {
			if ($H2P('style#h2p-style-clear-info')) { return; }
			let eleStyle = document.createElement('style');
			eleStyle.id = 'h2p-style-clear-info';
			if (isDouyu) {
				eleStyle.innerHTML += `
					div#js-player-title { min-height: auto!important; }
					div.Title { height: 100%!important; }
				`;
				// 直播间左下角水印
				eleStyle.innerHTML += `
					.watermark-442a18 { display: none!important; }
				`;
				// 背景图片、神秘超皇
				eleStyle.innerHTML += `
					.shark-webp .Title.is-emperor8, .Title.is-emperor8 { background: transparent!important; }
					.Title-EmperorRecommend-wrap { display: none!important; }
				`;
				// 头像、举报、友邻
				eleStyle.innerHTML += `
					div.Title-anchorPic, div.Title-roomInfo div.Title-col.is-left > div.Title-blockInline:nth-child(2),
					.Title-addFriend { display: none!important; }
					.Title { padding: 8px 10px 8px 15px; }
				`;
				// 官方称号、认证、房间导航
				eleStyle.innerHTML += `
					div.Title-roomInfo > div.Title-row:nth-child(2) > div.Title-col:nth-child(1) > div.Title-blockInline:last-child,
					.Title-txAuthentication, .Title-category { display: none!important; }
				`;
				// 友邻、工会、体重
				eleStyle.innerHTML += `
					div.Title-roomInfo > div.Title-row:nth-child(2) > div.Title-col:nth-child(2),
					div.Title-roomInfo > div.Title-row:nth-child(3) { display: none!important; }
				`;
			} else if (isBilibili) {
				if (isBilibiliLive) {
					// 主播状态
					// 区域、时间排行榜
					eleStyle.innerHTML += `
						h1[data-v-3d2a7540] > span.live-status-label, div.week-star-rank,
						.area-text[data-v-3d2a7540], .hour-rank[data-v-ff41ac56] { display: none!important; }
					`;
					// 排名礼物、挑战、第几关
					eleStyle.innerHTML += `
						.icon-label[data-v-5132d762],
						.chaos-pk-banner, .june-activity-entry[data-v-14468678] { display: none!important; }
					`;
					// 头像框
					eleStyle.innerHTML += `
						.header-info-ctnr[data-v-63dda861] .pendant-item.bg-no-repeat.bg-center.bg-cover.face-avatar-box,
						.loli-ctnr, .up-info .u-face .pendant { display: none!important; }
					`;
					// 关注、举报、分享
					eleStyle.innerHTML += `
						.attention-btn-ctnr,
						div.upper-right-ctnr[data-v-3d2a7540] > div[data-v-3d2a7540]:nth-child(1),
						div.upper-right-ctnr[data-v-3d2a7540] > div[data-v-3d2a7540]:nth-child(2) { display: none!important; }
					`;
				}
			} else if (isHuya) {
				// 房间导航、关注人数
				eleStyle.innerHTML += `
					.main-room .box-crumb, .room-hd .host-channel { display: none!important; }
					.room-hd .host-control .subscribe-entrance { display: none!important; }
				`;
				// 守护、认证
				eleStyle.innerHTML += `
					.room-hd .host-info .open-souhu, .room-hd .tencent-identification { display: none!important; }
				`;
				// 视频、房间号、举报、分享、客户端看、下载游戏
				eleStyle.innerHTML += `
					.room-hd .host-video, .room-hd .host-rid { display: none!important; }
					.illegal-report, #share-entrance { display: none!important; }
					.room-hd .host-control .jump-to-phone { display: none!important; }
					#J_roomGameBuy { display: none!important; }
				`;
			}
			document.body.appendChild(eleStyle);
		} else {
			if ($H2P('style#h2p-style-clear-info')) { $H2P('style#h2p-style-clear-info').remove(); }
		}
	}

	function clearAside () {
		console.log(`${config_clear.isClearAside ? '启动' : '关闭'} : 清爽侧边栏`);
		if (config_clear.isClearAside) {
			if ($H2P('style#h2p-style-clear-aside')) { return; }
			let eleStyle = document.createElement('style');
			eleStyle.id = 'h2p-style-clear-aside';
			if (isDouyu) {
				eleStyle.innerHTML += `
					aside#js-aside { display: none!important; }
				`;
			} else if (isBilibili) {
				eleStyle.innerHTML += `
					div.item.help { display: none!important; }
				`;
				if (isBilibiliLive) {
					eleStyle.innerHTML += `
						div#sidebar-vm { display: none!important; }
					`;
				}
			} else if (isHuya) {
				// 侧边栏
				eleStyle.innerHTML += `
					.mod-sidebar { display: none!important; }
				`;
			}
			document.body.appendChild(eleStyle);
		} else {
			if ($H2P('style#h2p-style-clear-aside')) { $H2P('style#h2p-style-clear-aside').remove(); }
		}
	}

	function clearGift () {
		console.log(`${config_clear.isClearGift ? '启动' : '关闭'} : 清爽礼物栏`);
		if (config_clear.isClearGift) {
			if ($H2P('style#h2p-style-clear-gift')) { return; }
			let eleStyle = document.createElement('style');
			eleStyle.id = 'h2p-style-clear-gift';
			if (isDouyu) {
				// 全民乐 PK、礼物、欢乐开黑、打弱鸡
				eleStyle.innerHTML += `
					div.ToolbarActivityArea div.PlayerToolbar-Task, div.SuperFansBubble,
					div.ToolbarActivityArea div.BattleShipEnter, div.ToolbarActivityArea div.RomanticDateComponent,
					.PlayFishBallEnter, .HappyPlayIcon { display: none!important; }
					.PlayerToolbar-signCont { visibility: hidden; }
				`;
				// 鱼购精选、打赏君
				eleStyle.innerHTML += `
					.ActivityItem[data-flag=douyugoods], .ActivityItem[data-flag=projectLiveReward],
					.ActivityItem[data-flag=''],
					.ActiviesExpanel-ExpandBtn { display: none!important; }
				`;
				// 礼物红包、房间等级、周的标签
				eleStyle.innerHTML += `
					.ActivityItem[data-flag=propRedEnvelope],
					.ActivityItem[data-flag=room_level],
					.GiftItem-leftConnerMark { display: none!important; }
				`;
			} else if (isBilibili) {
				if (isBilibiliLive) {
					// 开通大航海、心愿、礼物图
					eleStyle.innerHTML += `
						div.m-guard-ent[data-v-6a9d8f6c], .wish-icon.no-wish[data-v-58df7695],
						.mailbox-cntr[data-v-cb2af25c] { display: none!important; }
					`;
				}
			} else if (isHuya) {
				// 礼物周星榜、超星榜、贵族
				eleStyle.innerHTML += `
					#week-star-btn, #super-star-rank, #player-noble-btn { display: none!important; }
				`;
				// 星际巡航、欢乐对对碰、零点战神
				eleStyle.innerHTML += `
					#diy-activity-icon-1373, #diy-activity-icon-1599, #diy-activity-icon-1149 { display: none!important; }
					.diy-activity-icon { display: none!important; }
				`;
				// 宝箱文字、礼物栏大小
				eleStyle.innerHTML += `
					#player-box .player-box-tip { display: none!important; }
					.player-face .player-face-list { width: 335px!important; }
				`;
			}
			document.body.appendChild(eleStyle);
		} else {
			if ($H2P('style#h2p-style-clear-gift')) { $H2P('style#h2p-style-clear-gift').remove(); }
		}
	}

	function clearBar () {
		console.log(`${config_clear.isClearBar ? '启动' : '关闭'} : 清爽弹幕栏`);
		if (config_clear.isClearBar) {
			if ($H2P('style#h2p-style-clear-bar')) { return; }
			let eleStyle = document.createElement('style');
			eleStyle.id = 'h2p-style-clear-bar';
			if(isDouyu) {
				eleStyle.innerHTML += `
					div#js-player-barrage { top: 32px!important; }
				`;
				// 公告、开通贵族公告
				// 聊天室、战队牌子
				eleStyle.innerHTML += `
					div.AnchorAnnounce, div.layout-Player-rankAll, div.layout-Player-rank { display: none!important; }
					div.BarrageBanner { display: none!important; }
					div.MatchSystemChatRoomEntry, div.MatchSystemTeamMedal { display: none!important; }
				`;
				// 弹幕标签、置顶弹幕、签到手速王
				eleStyle.innerHTML += `
					.FansMedal.is-made, .RoomLevel, .shark-webp .Motor, .Barrage-noble, .Medal,
					.BarrageTips, .FansMedal, .ChatAchievement-image { display: none!important; }
					.Barrage-notice--noble { background: transparent!important; border: none; padding: 0 10px; }
					#js-floatingbarrage-container { display: none!important; }
					.Baby { display: none!important; }
				`;
				// 喇叭、贵族弹幕、超链弹幕、火力全开、名字前标志、表情
				// 房管弹幕、房间通知、超链接弹幕
				eleStyle.innerHTML += `
					div.Horn4Category, div.ChatNobleBarrage, div.BarrageSuperLink, div.Barrage-firstCharge,
					.FirePowerIcon, .RoleAvatar-wrapper, .Emot-image { display: none!important; }
					.Barrage--paddedBarrage, .Barrage-icon--sys { padding: 0 10px; }
					.Barrage-notice, .HyperLink { display: none!important; }
				`;
			} else if (isBilibili) {
				if(isBilibiliLive) {
					// 榜单
					eleStyle.innerHTML += `
						div#rank-list-vm { display: none!important; }
						.live-room-app .app-content .app-body .player-and-aside-area .aside-area .chat-history-panel { border-radius: 11px 11px 0 0; height: calc(100% - 145px); }
						.chat-history-panel .chat-history-list.with-penury-gift { height: 100%; }
					`;
					// 牌子、活动牌子、舰长标志、爷、弹幕对齐
					// 牌子
					eleStyle.innerHTML += `
						.fans-medal-item-ctnr, .live-title-icon, .guard-icon,
						.vip-icon, .title-label { display: none!important; }
					`;
					// 房管弹幕
					eleStyle.innerHTML += `
						.guard-level-1, .guard-level-2 { padding: 4px 5px!important; margin: 0!important; }
						.chat-history-panel .chat-history-list .chat-item.danmaku-item.guard-level-1:before,
						.chat-history-panel .chat-history-list .chat-item.danmaku-item.guard-level-2:before { background-color: transparent!important; border-image: none!important; }
						.chat-history-panel .chat-history-list .chat-item.danmaku-item.guard-level-1:after,
						.chat-history-panel .chat-history-list .chat-item.danmaku-item.guard-level-2:after { background: none!important; }
						
					`;
					// 投喂信息、礼物弹幕
					eleStyle.innerHTML += `
						.chat-item.misc-msg.guard-buy, .chat-item.gift-item, #penury-gift-msg { display: none!important; }
					`;
					// 自己名称颜色
					eleStyle.innerHTML += `
						.chat-history-panel .chat-history-list .chat-item.danmaku-item .user-name.my-self { color: #903d95; }
					`;
				}
			} else if (isHuya) {
				// 周榜、营收
				eleStyle.innerHTML += `
					#J_roomSideHd, #wrap-income { display: none!important; }
					#chatRoom { height: calc(100% - 100px)!important; }
					.chat-room__bd { height: 100%!important; }
				`;
				// 弹幕标签、房管等标签
				eleStyle.innerHTML += `
					.J_msg[data-id="0"],
					.chat-room__list .msg-normal-decorationSuffix,
					.chat-room__list .msg-nobleSpeak-decorationSuffix { display: none!important; }
					.msg-normal-decorationPrefix, .msg-nobleSpeak-decorationPrefix { display: none!important; }
					.chat-room__list .msg-nobleSpeak { padding: 2px 9px; margin: 0; }
					.chat-room__list .msg-normal { padding: 2px 9px; }
				`;
				// 表情、续费通知、官方通知
				eleStyle.innerHTML += `
					span.msg > img,
					.msg-noble.noble-recharge-level-1,
					.msg-sys { display: none!important; }
				`;
				// 弹幕背景、系统消息、爵位标签、置顶弹幕
				eleStyle.innerHTML += `
					.chat-room__list .msg-nobleSpeak { background-color: transparent; }
					.chat-room__list .msg-auditorSys { display: none!important; }
					.box-noble-level-1:after, .box-noble-level-2:after, .box-noble-level-3:after,
					.box-noble-level-4:after, .box-noble-level-5:after, .box-noble-level-6:after { display: none!important; }
					#J_box_msgOfKing { display: none!important; }
				`;
				// 进入直播间、粉丝动员大会
				eleStyle.innerHTML += `
					.msg-nobleEnter, #wrap-ext { display: none!important; }
				`;
				// 粉丝牌、上电视、弹幕大小
				eleStyle.innerHTML += `
					.fans-icon,
					.msg-onTVLottery-text { display: none!important; }
					.chat-room__list .msg-normal { font-size: 13px; }
				`;
			}
			document.body.appendChild(eleStyle);
		} else {
			if ($H2P('style#h2p-style-clear-bar')) { $H2P('style#h2p-style-clear-bar').remove(); }
		}
	}

	function clearPlay () {
		console.log(`${config_clear.isClearPlay ? '启动' : '关闭'} : 清爽播放器`);
		if (config_clear.isClearPlay) {
			if ($H2P('style#h2p-style-clear-play')) { return; }
			let eleStyle = document.createElement('style');
			eleStyle.id = 'h2p-style-clear-play';
			if (isDouyu) {
				// 悬浮广告、鱼吧、友邻、全名吃鸡
				eleStyle.innerHTML += `
					#js-room-activity, .layout-Bottom-mainEntity, #js-bottom-right,
					.css-widgetWrapper-EdVVC { display: none!important; }
				`;
				// 互动预言位置
				eleStyle.innerHTML += `
					.guessGameContainer { margin-bottom: 15px; }
				`;
				if (isDouyuTopic) {
					eleStyle.innerHTML += `
						div#root > div.wm-general:nth-child(2), div#root > div.wm-general:nth-child(n+4), div.wm_footer,
						div#root > div.bc-wrapper { display: none!important; }
						div#root > div.wm-general:nth-child(3) { margin-top: 70px; }
						div#root > div.wm-general:nth-child(3) > div { background: none!Important; }
					`;
				} else if (isDouyuFollow) {
					eleStyle.innerHTML += `
						.Prompt-container { display: none!important; }
					`;
				}
			} else if (isBilibili) {
				if (isBilibiliHome) {
					// 联系客服、左下角的猫
					eleStyle.innerHTML += `
						.contact-help { display: none!important; }
						.mascot { display: none!important; }
					`;
					// 下载 APP
					eleStyle.innerHTML += `
						.app-download-link { display: none!important; }
					`;
				}
				else if (isBilibiliVideo) {
					// 大家围观的直播
					eleStyle.innerHTML += `
						#live_recommand_report { display: none!important; }
					`;
				} else if (isBilibiliLive) {
					// 视频 logo
					eleStyle.innerHTML += `
						.bilibili-live-player-video-logo { display: none!important; }
					`;
					// 背景
					eleStyle.innerHTML += `
						div.room-bg[data-v-0654e230] { background: none!important; }
					`;
					// 礼物栏下滚动条目、他的动态、底部公司信息
					eleStyle.innerHTML += `
						div.left-container > div.flip-view[data-v-0d837194] { display: none!important; }
						.room-feed { display: none!important; }
						div#link-footer-vm { display: none!important; }
					`;
					// 绘马祈愿
					eleStyle.innerHTML += `
						.wish-part { display: none!important; }
					`;
				} else if (isBilibiliAct) {
					// 头像框、用户反馈论坛
					eleStyle.innerHTML += `
						.card .user-head .user-decorator,
						.notice-panel { display: none!important; }
					`;
				}
			} else if (isHuya) {
				// 背景图片、KPL 背景图
				eleStyle.innerHTML += `
					#J_spbg { display: none!important; }
					.diy-comps-wrap { display: none!important; }
					#J_mainRoom { background: transparent!important; }
					.sidebar-min .main-room { padding: 10px 40px 0; }
				`;
				// 动态、签约工会、猜你喜欢
				eleStyle.innerHTML += `
					.room-core { margin-bottom: 20px; }
					.room-footer { display: none!important; }
				`;
				// 滚动弹幕、虎扯
				eleStyle.innerHTML += `
					#player-marquee-wrap, .ball-view--19sRps-ih3GIs4n1CGztMM { display: none!important; }
				`;
				if (isHuyaFollow) {
					eleStyle.innerHTML += `
						div.hy-mm { display: none!important; }
					`;
					
				}
			}
			document.body.appendChild(eleStyle);
		} else {
			if ($H2P('style#h2p-style-clear-play')) { $H2P('style#h2p-style-clear-play').remove(); }
		}
	}

	function clearMode () {
		console.log(`${config_clear.clearMode ? '启动' : '关闭'} : 清爽模式`);
		if (config_clear.isClearNav) {
			if (config_clear.clearMode) { clearNav(); }
			else {
				config_clear.isClearNav = false;
				clearNav();
				config_clear.isClearNav = true;
			}
		}
		if (config_clear.isClearInfo) {
			if (config_clear.clearMode) { clearInfo(); }
			else {
				config_clear.isClearInfo = false;
				clearInfo();
				config_clear.isClearInfo = true;
			}
		}
		if (config_clear.isClearAside) {
			if (config_clear.clearMode) { clearAside(); }
			else {
				config_clear.isClearAside = false;
				clearAside();
				config_clear.isClearAside = true;
			}
		}
		if (config_clear.isClearGift) {
			if (config_clear.clearMode) { clearGift(); }
			else {
				config_clear.isClearGift = false;
				clearGift();
				config_clear.isClearGift = true;
			}
		}
		if (config_clear.isClearBar) {
			if (config_clear.clearMode) { clearBar(); }
			else {
				config_clear.isClearBar = false;
				clearBar();
				config_clear.isClearBar = true;
			}
		}
		if (config_clear.isClearPlay) {
			if (config_clear.clearMode) { clearPlay(); }
			else {
				config_clear.isClearPlay = false;
				clearPlay();
				config_clear.isClearPlay = true;
			}
		}
	}

	if (config_clear.clearMode) { clearMode(); }

	const clearBase64s = {
		clear: {
			white: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTg5ODU4MDI2Mzg4IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE2NjQ3IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTY1MC43NTIgMTU5Ljc0NGMxOC45NDQgNTguODggMzYuODY0IDE3MS4wMDgtNTcuODU2IDMyMS41MzYtMTguOTQ0LTE3NS42MTYtNzMuMjE2LTIxMi40OC0xMTcuNzYtMjQ5Ljg1Ni0xNDguOTkyLTEyNS40NCAxMC43NTItMjY2LjI0IDExNS43MTItMTcxLjAwOCAzMi43NjggMjkuNjk2IDQ4LjY0IDY0IDU5LjkwNCA5OS4zMjh6TTI3NS40NTYgMjIzLjc0NGM2MC40MTYgMTMuMzEyIDE2Ni45MTIgNTMuNzYgMjQ5Ljg1NiAyMTAuOTQ0LTE2MS4yOC03MS42OC0yMjAuMTYtNDMuMDA4LTI3NC45NDQtMjMuMDRDNjYuNTYgNDc4LjIwOCAyNC41NzYgMjY5LjMxMiAxNTkuNzQ0IDIyNS43OTJjNDEuNDcyLTEzLjMxMiA3OS4zNi05LjcyOCAxMTUuNzEyLTIuMDQ4eiBtLTEzMi42MDggMzU3LjM3NmM0MS45ODQtNDYuMDggMTI5LjUzNi0xMTcuNzYgMzA3LjcxMi0xMTAuNTkyLTE0Mi44NDggMTAzLjkzNi0xNDcuNDU2IDE2OS40NzItMTU3LjY5NiAyMjYuODE2LTM0LjMwNCAxOTEuNDg4LTIzNi4wMzIgMTIzLjkwNC0yMDUuODI0LTE0Ljg0OCA4LjcwNC00My4wMDggMzEuMjMyLTc0LjI0IDU1LjgwOC0xMDEuMzc2eiBtMjQzLjIgMjkzLjM3NmMtMTguOTQ0LTU4Ljg4LTM2Ljg2NC0xNzEuMDA4IDU3Ljg1Ni0zMjEuNTM2IDE4LjQzMiAxNzUuNjE2IDczLjIxNiAyMTIuNDggMTE3Ljc2IDI0OS44NTYgMTQ4Ljk5MiAxMjUuNDQtMTAuNzUyIDI2Ni4yNC0xMTUuNzEyIDE3MS4wMDgtMzIuNzY4LTI5LjY5Ni00OC42NC02NC01OS45MDQtOTkuMzI4eiBtMzc1LjgwOC02NGMtNjAuOTI4LTEzLjMxMi0xNjYuOTEyLTUzLjI0OC0yNDkuODU2LTIxMC45NDQgMTYxLjI4IDcxLjY4IDIyMC4xNiA0My4wMDggMjc0Ljk0NCAyMy4wNCAxODMuMjk2LTY2LjA0OCAyMjUuMjggMTQyLjMzNiA5MC4xMTIgMTg1Ljg1Ni00MC45NiAxMy4zMTItNzkuMzYgOS43MjgtMTE1LjIgMi4wNDh6IG0xMzIuMDk2LTM1Ny4zNzZjLTQxLjQ3MiA0Ni4wOC0xMjkuNTM2IDExNy43Ni0zMDcuNzEyIDExMC41OTIgMTQyLjg0OC0xMDMuOTM2IDE0Ny40NTYtMTY5LjQ3MiAxNTcuNjk2LTIyNi44MTYgMzQuMzA0LTE5MS40ODggMjM2LjAzMi0xMjMuOTA0IDIwNi4zMzYgMTQuODQ4LTkuMjE2IDQzLjAwOC0zMS4yMzIgNzQuMjQtNTYuMzIgMTAxLjM3NnoiIHAtaWQ9IjE2NjQ4IiBmaWxsPSIjZmZmZmZmIj48L3BhdGg+PHBhdGggZD0iTTY1MC43NTIgMTU5Ljc0NGMxOC45NDQgNTguODggMzYuODY0IDE3MS4wMDgtNTcuODU2IDMyMS41MzYtMTguOTQ0LTE3NS42MTYtNzMuMjE2LTIxMi40OC0xMTcuNzYtMjQ5Ljg1Ni0xNDguOTkyLTEyNS40NCAxMC43NTItMjY2LjI0IDExNS43MTItMTcxLjAwOCAzMi43NjggMjkuNjk2IDQ4LjY0IDY0IDU5LjkwNCA5OS4zMjh6IiBwLWlkPSIxNjY0OSIgZmlsbD0iI2ZmZmZmZiI+PC9wYXRoPjwvc3ZnPg==',
			grey: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTg5ODU4MDI2Mzg4IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE2NjQ3IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTY1MC43NTIgMTU5Ljc0NGMxOC45NDQgNTguODggMzYuODY0IDE3MS4wMDgtNTcuODU2IDMyMS41MzYtMTguOTQ0LTE3NS42MTYtNzMuMjE2LTIxMi40OC0xMTcuNzYtMjQ5Ljg1Ni0xNDguOTkyLTEyNS40NCAxMC43NTItMjY2LjI0IDExNS43MTItMTcxLjAwOCAzMi43NjggMjkuNjk2IDQ4LjY0IDY0IDU5LjkwNCA5OS4zMjh6TTI3NS40NTYgMjIzLjc0NGM2MC40MTYgMTMuMzEyIDE2Ni45MTIgNTMuNzYgMjQ5Ljg1NiAyMTAuOTQ0LTE2MS4yOC03MS42OC0yMjAuMTYtNDMuMDA4LTI3NC45NDQtMjMuMDRDNjYuNTYgNDc4LjIwOCAyNC41NzYgMjY5LjMxMiAxNTkuNzQ0IDIyNS43OTJjNDEuNDcyLTEzLjMxMiA3OS4zNi05LjcyOCAxMTUuNzEyLTIuMDQ4eiBtLTEzMi42MDggMzU3LjM3NmM0MS45ODQtNDYuMDggMTI5LjUzNi0xMTcuNzYgMzA3LjcxMi0xMTAuNTkyLTE0Mi44NDggMTAzLjkzNi0xNDcuNDU2IDE2OS40NzItMTU3LjY5NiAyMjYuODE2LTM0LjMwNCAxOTEuNDg4LTIzNi4wMzIgMTIzLjkwNC0yMDUuODI0LTE0Ljg0OCA4LjcwNC00My4wMDggMzEuMjMyLTc0LjI0IDU1LjgwOC0xMDEuMzc2eiBtMjQzLjIgMjkzLjM3NmMtMTguOTQ0LTU4Ljg4LTM2Ljg2NC0xNzEuMDA4IDU3Ljg1Ni0zMjEuNTM2IDE4LjQzMiAxNzUuNjE2IDczLjIxNiAyMTIuNDggMTE3Ljc2IDI0OS44NTYgMTQ4Ljk5MiAxMjUuNDQtMTAuNzUyIDI2Ni4yNC0xMTUuNzEyIDE3MS4wMDgtMzIuNzY4LTI5LjY5Ni00OC42NC02NC01OS45MDQtOTkuMzI4eiBtMzc1LjgwOC02NGMtNjAuOTI4LTEzLjMxMi0xNjYuOTEyLTUzLjI0OC0yNDkuODU2LTIxMC45NDQgMTYxLjI4IDcxLjY4IDIyMC4xNiA0My4wMDggMjc0Ljk0NCAyMy4wNCAxODMuMjk2LTY2LjA0OCAyMjUuMjggMTQyLjMzNiA5MC4xMTIgMTg1Ljg1Ni00MC45NiAxMy4zMTItNzkuMzYgOS43MjgtMTE1LjIgMi4wNDh6IG0xMzIuMDk2LTM1Ny4zNzZjLTQxLjQ3MiA0Ni4wOC0xMjkuNTM2IDExNy43Ni0zMDcuNzEyIDExMC41OTIgMTQyLjg0OC0xMDMuOTM2IDE0Ny40NTYtMTY5LjQ3MiAxNTcuNjk2LTIyNi44MTYgMzQuMzA0LTE5MS40ODggMjM2LjAzMi0xMjMuOTA0IDIwNi4zMzYgMTQuODQ4LTkuMjE2IDQzLjAwOC0zMS4yMzIgNzQuMjQtNTYuMzIgMTAxLjM3NnoiIHAtaWQ9IjE2NjQ4IiBmaWxsPSIjYTdhN2E3Ij48L3BhdGg+PHBhdGggZD0iTTY1MC43NTIgMTU5Ljc0NGMxOC45NDQgNTguODggMzYuODY0IDE3MS4wMDgtNTcuODU2IDMyMS41MzYtMTguOTQ0LTE3NS42MTYtNzMuMjE2LTIxMi40OC0xMTcuNzYtMjQ5Ljg1Ni0xNDguOTkyLTEyNS40NCAxMC43NTItMjY2LjI0IDExNS43MTItMTcxLjAwOCAzMi43NjggMjkuNjk2IDQ4LjY0IDY0IDU5LjkwNCA5OS4zMjh6IiBwLWlkPSIxNjY0OSIgZmlsbD0iI2E3YTdhNyI+PC9wYXRoPjwvc3ZnPg==',
			black: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTg5ODU4MDI2Mzg4IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE2NjQ3IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTY1MC43NTIgMTU5Ljc0NGMxOC45NDQgNTguODggMzYuODY0IDE3MS4wMDgtNTcuODU2IDMyMS41MzYtMTguOTQ0LTE3NS42MTYtNzMuMjE2LTIxMi40OC0xMTcuNzYtMjQ5Ljg1Ni0xNDguOTkyLTEyNS40NCAxMC43NTItMjY2LjI0IDExNS43MTItMTcxLjAwOCAzMi43NjggMjkuNjk2IDQ4LjY0IDY0IDU5LjkwNCA5OS4zMjh6TTI3NS40NTYgMjIzLjc0NGM2MC40MTYgMTMuMzEyIDE2Ni45MTIgNTMuNzYgMjQ5Ljg1NiAyMTAuOTQ0LTE2MS4yOC03MS42OC0yMjAuMTYtNDMuMDA4LTI3NC45NDQtMjMuMDRDNjYuNTYgNDc4LjIwOCAyNC41NzYgMjY5LjMxMiAxNTkuNzQ0IDIyNS43OTJjNDEuNDcyLTEzLjMxMiA3OS4zNi05LjcyOCAxMTUuNzEyLTIuMDQ4eiBtLTEzMi42MDggMzU3LjM3NmM0MS45ODQtNDYuMDggMTI5LjUzNi0xMTcuNzYgMzA3LjcxMi0xMTAuNTkyLTE0Mi44NDggMTAzLjkzNi0xNDcuNDU2IDE2OS40NzItMTU3LjY5NiAyMjYuODE2LTM0LjMwNCAxOTEuNDg4LTIzNi4wMzIgMTIzLjkwNC0yMDUuODI0LTE0Ljg0OCA4LjcwNC00My4wMDggMzEuMjMyLTc0LjI0IDU1LjgwOC0xMDEuMzc2eiBtMjQzLjIgMjkzLjM3NmMtMTguOTQ0LTU4Ljg4LTM2Ljg2NC0xNzEuMDA4IDU3Ljg1Ni0zMjEuNTM2IDE4LjQzMiAxNzUuNjE2IDczLjIxNiAyMTIuNDggMTE3Ljc2IDI0OS44NTYgMTQ4Ljk5MiAxMjUuNDQtMTAuNzUyIDI2Ni4yNC0xMTUuNzEyIDE3MS4wMDgtMzIuNzY4LTI5LjY5Ni00OC42NC02NC01OS45MDQtOTkuMzI4eiBtMzc1LjgwOC02NGMtNjAuOTI4LTEzLjMxMi0xNjYuOTEyLTUzLjI0OC0yNDkuODU2LTIxMC45NDQgMTYxLjI4IDcxLjY4IDIyMC4xNiA0My4wMDggMjc0Ljk0NCAyMy4wNCAxODMuMjk2LTY2LjA0OCAyMjUuMjggMTQyLjMzNiA5MC4xMTIgMTg1Ljg1Ni00MC45NiAxMy4zMTItNzkuMzYgOS43MjgtMTE1LjIgMi4wNDh6IG0xMzIuMDk2LTM1Ny4zNzZjLTQxLjQ3MiA0Ni4wOC0xMjkuNTM2IDExNy43Ni0zMDcuNzEyIDExMC41OTIgMTQyLjg0OC0xMDMuOTM2IDE0Ny40NTYtMTY5LjQ3MiAxNTcuNjk2LTIyNi44MTYgMzQuMzA0LTE5MS40ODggMjM2LjAzMi0xMjMuOTA0IDIwNi4zMzYgMTQuODQ4LTkuMjE2IDQzLjAwOC0zMS4yMzIgNzQuMjQtNTYuMzIgMTAxLjM3NnoiIHAtaWQ9IjE2NjQ4Ij48L3BhdGg+PHBhdGggZD0iTTY1MC43NTIgMTU5Ljc0NGMxOC45NDQgNTguODggMzYuODY0IDE3MS4wMDgtNTcuODU2IDMyMS41MzYtMTguOTQ0LTE3NS42MTYtNzMuMjE2LTIxMi40OC0xMTcuNzYtMjQ5Ljg1Ni0xNDguOTkyLTEyNS40NCAxMC43NTItMjY2LjI0IDExNS43MTItMTcxLjAwOCAzMi43NjggMjkuNjk2IDQ4LjY0IDY0IDU5LjkwNCA5OS4zMjh6IiBwLWlkPSIxNjY0OSI+PC9wYXRoPjwvc3ZnPg==',
		},
		back: {
			white: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTg5ODYyNDc4Mzg4IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE5NDQ0IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTUwMC4wNjEwODcgMjQ2Ljg0OTA4NGwxLjEwMjEwMS0xNzMuNTkzNjYzTDE0OC4xMTMzMzkgMzY1LjE2NjgxN2wzNDkuMzIzOTkgMjk1LjY1MzYyNyAxLjA0Mjc0OS0xNjUuODE3NTZjMzQ4LjgyMjU3IDQ3LjI4NTk1NiAxOTguMTY5Mzg1IDI1Ni45NzI2NTMtMC42MTYwMyA0NTUuNzQxNjk1QzExODYuNDYxMTE1IDUwMS40ODY1NTIgNzc2Ljg0ODAxNyAyOTQuNTM4MjIzIDUwMC4wNjEwODcgMjQ2Ljg0OTA4NHoiIHAtaWQ9IjE5NDQ1IiBmaWxsPSIjZmZmZmZmIj48L3BhdGg+PC9zdmc+',
			grey: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTg5ODYyNDE3ODI3IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE5MjYxIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTUwMC4wNjEwODcgMjQ2Ljg0OTA4NGwxLjEwMjEwMS0xNzMuNTkzNjYzTDE0OC4xMTMzMzkgMzY1LjE2NjgxN2wzNDkuMzIzOTkgMjk1LjY1MzYyNyAxLjA0Mjc0OS0xNjUuODE3NTZjMzQ4LjgyMjU3IDQ3LjI4NTk1NiAxOTguMTY5Mzg1IDI1Ni45NzI2NTMtMC42MTYwMyA0NTUuNzQxNjk1QzExODYuNDYxMTE1IDUwMS40ODY1NTIgNzc2Ljg0ODAxNyAyOTQuNTM4MjIzIDUwMC4wNjEwODcgMjQ2Ljg0OTA4NHoiIHAtaWQ9IjE5MjYyIiBmaWxsPSIjYTdhN2E3Ij48L3BhdGg+PC9zdmc+',
			black: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTg5ODYyNDc4Mzg4IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE5NDQ0IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTUwMC4wNjEwODcgMjQ2Ljg0OTA4NGwxLjEwMjEwMS0xNzMuNTkzNjYzTDE0OC4xMTMzMzkgMzY1LjE2NjgxN2wzNDkuMzIzOTkgMjk1LjY1MzYyNyAxLjA0Mjc0OS0xNjUuODE3NTZjMzQ4LjgyMjU3IDQ3LjI4NTk1NiAxOTguMTY5Mzg1IDI1Ni45NzI2NTMtMC42MTYwMyA0NTUuNzQxNjk1QzExODYuNDYxMTE1IDUwMS40ODY1NTIgNzc2Ljg0ODAxNyAyOTQuNTM4MjIzIDUwMC4wNjEwODcgMjQ2Ljg0OTA4NHoiIHAtaWQ9IjE5NDQ1IiBmaWxsPSIjMDAwMDAwIj48L3BhdGg+PC9zdmc+',
		}
	};
	
	const clearBase64	= {
		black: clearBase64s.clear.grey,
		white: isDouyu ? clearBase64s.clear.grey : (isBilibiliHome || isBilibiliRank ? clearBase64s.clear.white : (isHuya ? clearBase64s.clear.grey : clearBase64s.clear.black)),
	}
    const backBase64	= {
		black: clearBase64s.back.grey,
		white: isDouyu ? clearBase64s.back.grey : (isBilibiliHome || isBilibiliRank ? clearBase64s.back.white : (isHuya ? clearBase64s.back.grey : clearBase64s.back.black)),
	}

	new Promise((resolve, reject) => {
		let eleStyle = document.createElement('style');
		eleStyle.innerHTML += `
			#h2p-img-clearMode { cursor: pointer; }
			#h2p-div-clearMode-select span {
				margin-left: 2px;
			}
        `;
        if (isDouyu) {}
        else if (isBilibili) {
            eleStyle.innerHTML += `
                ul.nav-link-ul > li:last-child > span { display: none!important; }
            `;
        }
		document.head.appendChild(eleStyle);

		let div = document.createElement('div');
		div.className = 'h2p-dropdown';
		div.title = '清爽模式';
        if (isDouyu) {
			div.style = 'position: relative; float: left; margin: 15px -20px 15px 30px;';
            div.innerHTML = `
                <img id="h2p-img-clearMode" class="h2p-dropdown-img" style="width: 30px; height: 30px;" src="${config_clear.clearMode ? (config_clear.blackMode ? backBase64.black : backBase64.white) : (config_clear.blackMode ? clearBase64.black : clearBase64.white)}">
            `;
        }
        else if (isBilibili) {
			if (isBilibiliHome || isBilibiliAct || isBilibiliRank || isBilibiliVideo) {
				div.style = 'display: flex; justify-content: center;';
				div.classList.add('nav-link-item');
			} else if (isBilibiliLive) {
				div.style = 'margin: 0 10px; justify-content: center;';
			}
            div.innerHTML = `
                <img id="h2p-img-clearMode" style="width: 20px; height: 20px;" src="${config_clear.clearMode ? (config_clear.blackMode ? backBase64.black : backBase64.white) : (config_clear.blackMode ? clearBase64.black : clearBase64.white)}">
            `;
        } else if (isHuya) {
			div.classList.add('hy-nav-right');
			div.style = 'position: absolute; right: -70px;';
			div.innerHTML = `
				<img id="h2p-img-clearMode" style="width: 25px; height: 25px;" src="${config_clear.clearMode ? (config_clear.blackMode ? backBase64.black : backBase64.white) : (config_clear.blackMode ? clearBase64.black : clearBase64.white)}">
            `;
		} else {
			div.style = '';
            div.innerHTML = `
                <img id="h2p-img-clearMode" style="width: 20px; height: 20px;" src="${config_clear.clearMode ? (config_clear.blackMode ? backBase64.black : backBase64.white) : (config_clear.blackMode ? clearBase64.black : clearBase64.white)}">
            `;
		}

		let divDropDown = document.createElement('div');
		divDropDown.className = 'h2p-dropdown-menu';
		if (isDouyu) {
		} else if (isBilibili) {
		} else if (isHuya) {
			divDropDown.style = 'left: -147px;';
		}
		divDropDown.innerHTML += `
			<div id="h2p-div-clearMode-select" style="width: 100%;">
				<div class="h2p-flex-main-center h2p-item-100p" style="margin-bottom: 5px;">
					<div class="h2p-flex-main-start h2p-item-50p">
						<input id="h2p-input-clearMode-nav" type="checkbox">
						<span>导航栏</span>
					</div>
					<div class="h2p-flex-main-start h2p-item-50p">
						<input id="h2p-input-clearMode-info" type="checkbox">
						<span>主播信息</span>
					</div>
				</div>
				<div class="h2p-flex-main-center h2p-item-100p" style="margin-bottom: 5px;">
					<div class="h2p-flex-main-start h2p-item-50p">
						<input id="h2p-input-clearMode-aside" type="checkbox">
						<span>侧边栏</span>
					</div>
					<div class="h2p-flex-main-start h2p-item-50p">
						<input id="h2p-input-clearMode-gift" type="checkbox">
						<span>礼物栏</span>
					</div>
				</div>
				<div class="h2p-flex-main-center h2p-item-100p" style="margin-bottom: 5px;">
					<div class="h2p-flex-main-start h2p-item-50p">
						<input id="h2p-input-clearMode-bar" type="checkbox">
						<span>弹幕栏</span>
					</div>
					<div class="h2p-flex-main-start h2p-item-50p">
						<input id="h2p-input-clearMode-play" type="checkbox">
						<span>播放器</span>
					</div>
				</div>
			</div>
		`;
		div.appendChild(divDropDown);

		let setINVL_wait_div_header = setInterval(() => {
            if ($H2P('img#h2p-img-clearMode')) {
                window.clearInterval(setINVL_wait_div_header);
                setINVL_wait_div_header = null;
                return;
            }

			if (isDouyu && $H2P('div.Header-right')) {
				window.clearInterval(setINVL_wait_div_header);
				setINVL_wait_div_header = null;
				$H2P('div.Header-right').appendChild(div);
				resolve();
			} else if (isBilibili) {
                if (isBilibiliHome || isBilibiliAct || isBilibiliRank || isBilibiliVideo) {
					if ($H2P('ul.nav-link-ul > li:nth-child(8)')) {
						window.clearInterval(setINVL_wait_div_header);
						setINVL_wait_div_header = null;
						$H2P('ul.nav-link-ul').appendChild(div);
						resolve();
					}
				} else if (isBilibiliLive) {
					if ($H2P('div.dp-table-cell.v-middle > a[data-v-3c413834]:nth-child(10)')) {
						window.clearInterval(setINVL_wait_div_header);
						setINVL_wait_div_header = null;
						$H2P('div.dp-table-cell.v-middle > a[data-v-3c413834]:nth-child(10)').parentNode.appendChild(div);
						resolve();
					}
				}
			} else if (isHuya && $H2P('div#J_duyaHeaderRight')) {
				window.clearInterval(setINVL_wait_div_header);
				setINVL_wait_div_header = null;
				$H2P('div.duya-header-bd').appendChild(div);
				resolve();
			}
			
			if (!isDouyu && !isBilibili && !isHuya) {
				window.clearInterval(setINVL_wait_div_header);
				setINVL_wait_div_header = null;
				div.style.left = '300px';
				document.body.appendChild(div);
				resolve();
			}
		}, 500);
	})
	.then(() => {
		document.addEventListener('keydown', (e) => {
			// 黑暗模式快捷键
			if (e.shiftKey && e.which == myKeyCode.x) { $H2P('img#h2p-img-clearMode').click(); }
		});

		let eleClearMode = $H2P('img#h2p-img-clearMode');
		eleClearMode.addEventListener('click', () => {
			config_clear.clearMode = !config_clear.clearMode;
			localStorage.setItem(LSClear, JSON.stringify(config_clear));
			eleClearMode.src = config_clear.clearMode ? (config_clear.blackMode ? backBase64.black : backBase64.white) : (config_clear.blackMode ? clearBase64.black : clearBase64.white);
			clearMode();
		});

		let eleVary = $H2P('div#h2p-div-clearMode-select');
		eleVary.addEventListener('click', (event) => {
			if (event.target.tagName.toLowerCase() !== 'input') { return; }

			const target = event.target;
			if (target.id === 'h2p-input-clearMode-nav') {
				config_clear.isClearNav = !config_clear.isClearNav;
				if (config_clear.clearMode) { clearNav(); }
			}
			else if (target.id === 'h2p-input-clearMode-info') {
				config_clear.isClearInfo = !config_clear.isClearInfo;
				if (config_clear.clearMode) { clearInfo(); }
			}
			else if (target.id === 'h2p-input-clearMode-aside') {
				config_clear.isClearAside = !config_clear.isClearAside;
				if (config_clear.clearMode) { clearAside(); }
			}
			else if (target.id === 'h2p-input-clearMode-gift') {
				config_clear.isClearGift = !config_clear.isClearGift;
				if (config_clear.clearMode) { clearGift(); }
			}
			else if (target.id === 'h2p-input-clearMode-bar') {
				config_clear.isClearBar = !config_clear.isClearBar;
				if (config_clear.clearMode) { clearBar(); }
			}
			else if (target.id === 'h2p-input-clearMode-play') {
				config_clear.isClearPlay = !config_clear.isClearPlay;
				if (config_clear.clearMode) { clearPlay(); }
			}
			localStorage.setItem(LSClear, JSON.stringify(config_clear));
		}, false);
	})
	.then(() => {
		if (config_clear.isClearNav)	{ $H2P('input#h2p-input-clearMode-nav').checked = true; }
		if (config_clear.isClearInfo)	{ $H2P('input#h2p-input-clearMode-info').checked = true; }
		if (config_clear.isClearAside)	{ $H2P('input#h2p-input-clearMode-aside').checked = true; }
		if (config_clear.isClearGift)	{ $H2P('input#h2p-input-clearMode-gift').checked = true; }
		if (config_clear.isClearBar)	{ $H2P('input#h2p-input-clearMode-bar').checked = true; }
		if (config_clear.isClearPlay)	{ $H2P('input#h2p-input-clearMode-play').checked = true; }
	})

	function updateClearModeIcon () {
		$H2P('img#h2p-img-clearMode').src = config_clear.clearMode ? (config_clear.blackMode ? backBase64.black : backBase64.white) : (config_clear.blackMode ? clearBase64.black : clearBase64.white);
	}

	if (isBilibili && !isBilibiliLive) { return; }









// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //
// 
// 															取消关注
// 
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //

	if (isDouyuFollow) {
		let anchorsSelected = [];
		
		new Promise((resolve, reject) => {
			let INVL_AddBtnCancelFollow = setInterval(() => {
				if ($H2P('div#filter-tab-expandable-wrapper') && !$H2P('a#h2p-a-cancelFollow')) {
					window.clearInterval(INVL_AddBtnCancelFollow);
					INVL_AddBtnCancelFollow = null;
					resolve();
				}
			}, 500);
		})
		.then(() => {
			let a_cancelFollow = document.createElement('a');
			a_cancelFollow.id = 'h2p-a-cancelFollow';
			a_cancelFollow.className = 'layout-Module-label';
			a_cancelFollow.innerHTML = `
				<strong>取消关注</strong>
			`;
			$H2P('div#filter-tab-expandable-wrapper').appendChild(a_cancelFollow);
		})
		.then(() => {
			$H2P('a#h2p-a-cancelFollow').addEventListener('click', () => {
				let anchorSelected = $H2P('li.layout-Cover-item div.DyLiveCover-selectArea.is-active', false);
				anchorSelected.forEach(anchor => {
					let anchorHref = anchor.nextSibling.href;
					if (!anchorHref || anchorHref.length == 0) {
						anchorHref = anchor.parentNode.href;
					}
					let anchorId = anchorHref.split('/').pop();
					anchorsSelected.push(anchorId);
				});
				console.log(anchorsSelected);
				setTO_cancelFollow();
			});
		})
		.catch(error => { console.log(error); })
		
		function setTO_cancelFollow () {
			if (anchorsSelected && anchorsSelected.length > 0) {
				for (let i = 0; i < anchorsSelected.length; i++) {
					let anchorId = anchorsSelected[i];
					setTimeout(() => {
						cancelFollow(anchorId);
					}, (i + 1) * 1000);
				}
			}
		}

		function cancelFollow (anchorId) {
			fetch(`https://www.douyu.com/room/follow/cancel_confuse/${anchorId}`, {
				method: 'POST'
			})
			.then(res => res.json())
			.then(res => {
				if (res && 'error' in res && res.error === 0) {
					console.log(`成功取消关注主播 : ${anchorId}`);
					let parentEle = $H2P(`a[href="/${anchorId}"]`).parentNode;
					// 从主播 id 找到主播信息所在 ele 的根节点
					while (!parentEle.classList.contains('layout-Cover-item') && parentEle.tagName.toLowerCase() !== 'body') {
						parentEle = parentEle.parentNode;
					}
					if (parentEle.classList.contains('layout-Cover-item') && parentEle.tagName.toLowerCase() !== 'body') {
						parentEle.remove();
					}
				} else {
					console.log(`取消关注主播 : ${anchorId} 失败`);
				}
			});
		}
		return;
	}








// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //
// 
// 															全局变量
// 
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //

	// 用户拥有牌子的主播信息
	let roomOfAnchorFan = undefined;

	let userInfo = {
		nickName	: '',				// 昵称
		isAnchorFan : false,			// 是否拥有主播的粉丝牌
	};	

	let roomInfo = {
		id		: '',
		showT	: 0,
		online	: 0,
	}








// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //
// 
// 															主播信息获取
// 
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //

	if (isDouyu) {
		const LSInfo = 'h2p-DY-config-info';
		let config_info = JSON.parse(localStorage.getItem(LSInfo)) || {
			showTs: {},
		};

		// 获取 roomInfo.id
		let regNums = /\d+/;
		if (regNums.test($H2P('head > title').textContent)) {
			roomInfo.id = regNums.exec($H2P('head > title').textContent)[0];
		} else {
			roomInfo.id = regNums.exec(window.location.href)[0];
		}

		// 获取在线人数
		let urlId = isDouyuTopic ? window.location.href.split('=').pop() : window.location.pathname.split('/').pop();
		fetch(`https://bojianger.com/data/api/common/search.do?keyword=${urlId}`)
		.then(res => res.json())
		.then(res => {
			try {
				if (res.data) {
					if (res.data.online) { roomInfo.online = Number(res.data.online); }
					else if (res.data.anchorVo) { roomInfo.online = Number(res.data.anchorVo.audience_count); }
				} else {
					let res = JSON.parse(JSON.stringify(res));
					roomInfo.online = Number(res.split('online":')[1].split(',')[0]);
				}
				console.log(`Succeed getting online : ${roomInfo.online}.`);
			} catch (error) {
				console.log(error);
				console.log('Fail to get online');
			}
		});

		// 获取直播时间
		let showTs = {};
		if (Array.isArray(config_info.showTs)) {
			config_info.showTs = {};
			localStorage.setItem(LSInfo, JSON.stringify(config_info));
		} else { showTs = config_info.showTs || {}; }
		let [showT, getT] = [0, 0];
		if (showTs[roomInfo.id]) {
			showT = showTs[roomInfo.id].showT;
			getT = showTs[roomInfo.id].getT;
		}
		// 获取时间 < 6h
		if ((((new Date().getTime() / 1000) - getT) / 3600.0) < 6) {
			roomInfo.showT = showT;
			console.log(`Succeed getting anchor showTime : ${roomInfo.showT}.`);
		} else {
			fetch('https://www.douyu.com/betard/' + roomInfo.id)
			.then(res => res.json())
			.then(res => {
				try {
					if (res) {
						if (res.cache_time) {
							roomInfo.showT = Number.parseInt(res.cache_time);
						} else {
							let r = res.split('"cache_time":')[1];
							let l = r.substr(0, r.indexOf(','));
							roomInfo.showT = Number.parseInt(l);
						}
						config_info.showTs[roomInfo.id] = {
							'showT' : roomInfo.showT,
							"getT" : Number.parseInt(new Date().getTime() / 1000)
						};
						console.log(`Succeed getting anchor showTime : `);
						console.log(config_info.showTs[roomInfo.id]);
						localStorage.setItem(LSInfo, JSON.stringify(config_info));
					} else { console.log('Fail to get anchor showTime.') }
				} catch (error) {
					console.log(error);
					console.log('Fail to get anchor showTime.')
				}
			});
		}

		// 根据 cookie 获取用户昵称
		let cookies = document.cookie.split(/;\s/g);
		for (let i = 0; i < cookies.length; i++) {
			let cookie = cookies[i];
			let keyVal = cookie.split('=');
			if (keyVal && keyVal.length == 2 && keyVal[0] == 'acf_nickname') {
				userInfo.nickName = keyVal[1];
				break;
			}
		}

		// 自动获取已有徽章的主播
		new Promise((resolve, reject) => {
			let iframe = document.createElement('iframe');
			iframe.id = 'h2p-fansBadgeList';
			iframe.style = 'display: none;'
			iframe.src = '/member/cp/getFansBadgeList';
			document.body.appendChild(iframe);
			setTimeout(resolve, 250);
		})
		.then(() => {
			let iframe = $H2P('iframe#h2p-fansBadgeList');
			iframe.addEventListener('load', () => {
				// 获取有粉丝牌的主播房间号
				roomOfAnchorFan = {};
				let idoc = iframe.contentWindow.document;
				let ele_anchors = Array.from(idoc.querySelectorAll('table.aui_room_table.fans-badge-list > tbody > tr'));
				for ( let i = 0; i < ele_anchors.length; i++ ) {
					let ele = ele_anchors[i];
					let anchorURL = ele.querySelector('td:nth-child(2)').querySelector('a').getAttribute('href');
					let anchorName = ele.querySelector('td:nth-child(2)').querySelector('a').textContent;
					let anchorRoom = ele.getAttribute('data-fans-room');
					let anchorUp = Number(ele.querySelector('td:nth-child(4)').querySelector('span').textContent);
					roomOfAnchorFan[anchorRoom] = {anchorName, anchorURL, anchorUp};
				}
				console.log('有粉丝牌的主播房间号');
				console.log(roomOfAnchorFan);
				let anchorRoom= window.location.href.split('/').pop();
				userInfo.isAnchorFan = anchorRoom in roomOfAnchorFan;
				setTimeout(() => { $H2P('iframe#h2p-fansBadgeList').remove(); }, 2000)
			});
		})
		.catch(error => console.log(error));

		new Promise((resolve, reject) => {
			// 主播热度、在线人数、直播时长
			let divBar = document.createElement('div');
			divBar.id = 'h2p-div-clear-anchorHot';
			divBar.classList = 'h2p-flex-main-start h2p-h-100p';
			divBar.style = 'padding: 3px 10px 0; margin: 0;';
			divBar.innerHTML = `
				<div class="Title-blockInline h2p-item-33p">
					<a id="a-anchorHot" class="Title-anchorHot" title="直播热度">
						<i class="Title-anchorHotIcon" style="margin-top: -4px">
							<svg style="width: 16px; height: 16px;">
								<use xlink:href="#hot_84f8212"></use>
							</svg>
						</i>
						<div class="Title-anchorText" style="margin-left: 2px;">0</div>
					</a>
				</div>
				<div class="Title-blockInline h2p-item-33p">
					<div id="div-online" title="真实人数" style="margin-top: -7px">
						<div class="Title-anchorFriendWrapper">
							<div class="Title-row-span">
								<span class="Title-row-icon">
									<svg style="width:15px; height:15px">
										<use xlink:href="#friend_b0b6380"></use>
									</svg>
								</span>
								<i class="Title-row-text" style="margin-left: 2px;">0</i>
							</div>
						</div>
					</div>
				</div>
				<div class="Title-blockInline h2p-item-33p">
					<a id="a-anchorShowT" class="Title-anchorHot" title="直播时长">
						<div class="AnchorFriendCard-avatar is-live" style="height: 19px; border: none; margin: 2px 5px 0 -4px;"></div>
						<div class="Title-anchorText" style="margin-left: 2px;">0</div>
					</a>
				</div>
			`;

			let setINVL_wait_div_announce = setInterval(() => {
				if ($H2P('div.layout-Player-asideMainTop') && $H2P('div.BarrageSuperLink') && $H2P('div.ChatToolBar')) {
					window.clearInterval(setINVL_wait_div_announce);
					setINVL_wait_div_announce = null;
					setTimeout(() => {
						$H2P('div.layout-Player-announce').appendChild(divBar);
						resolve();
					}, 2000);
				}
			}, 500);
		})
		.then(() => {
			setTO_showAnchorHot();
		})

		function setTO_showAnchorHot () {
			return setTimeout(() => {
				let anchorHot = Number($H2P('a.Title-anchorHot > div.Title-anchorText').textContent) || 0;
				let str_anchorHot = '' + anchorHot;
				if (anchorHot > 9999) { str_anchorHot = parseInt(anchorHot/10000) + 'w'; }
				$H2P('a#a-anchorHot > div.Title-anchorText').textContent = str_anchorHot;
				
				if (roomInfo.showT > 0) {
					let showT = Number.parseInt((new Date().getTime() / 1000) - roomInfo.showT) / 3600.0;
					let h = Number.parseInt(showT);
					let m = Number.parseInt((showT - h) * 60);
					let s = Number.parseInt(((showT - h) * 60 - m) * 60);
					// 设置直播时长
					setInterval(() => {
						s += 1;
						if (s >= 60) { m += 1; s = 0; }
						if (m >= 60) { h += 1; m = 0; }
						let strShowT = `${h}:`;
						if (m >= 10) { strShowT += m + ':'; }
						else { strShowT += '0' + m + ':'; }
						if (s >= 10) { strShowT += s; }
						else { strShowT += '0' + s; }
						$H2P('a#a-anchorShowT > div.Title-anchorText').textContent = strShowT;
					}, 1000);
				}
				// 直播热度和在线人数
				setInterval(() => {
					let anchorHot = Number($H2P('a.Title-anchorHot div.Title-anchorText').textContent) || 0;
					if (anchorHot > 9999) { anchorHot = Number.parseInt(anchorHot / 10000) + 'w'; }
					if ($H2P('a#a-anchorHot > div.Title-anchorText')) { $H2P('a#a-anchorHot > div.Title-anchorText').textContent = anchorHot; }

					let online = roomInfo.online;
					if (online > 9999) { online = Number.parseInt(online / 10000) + 'w'; }
					$H2P('div#div-online i.Title-row-text').textContent = online;
				}, 5000);
			}, 200);
		}
	}








// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //
// 
// 															🐯和面板初始化
// 
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //

	const LSScript = 'h2p-DY-config-script';
	let config_script_pre = {
		icon	: '🐯'
	};
	let config_script = {};
	Object.assign(config_script, config_script_pre);
	let config_script_tmp = JSON.parse(localStorage.getItem(LSScript)) || {};
	Object.assign(config_script, config_script_tmp);
	for (let key in config_script) { if (!(key in config_script_pre)) { delete config_script[key]; } }
	localStorage.removeItem(LSScript);
	localStorage.setItem(LSScript, JSON.stringify(config_script));

	let viewShow_bar	=  false;
	let viewShow_config	=  false;
	let viewShow_script	=  false;

	new Promise((resolve, reject) => {
		// 创建元素样式
		let eleStyle = document.createElement('style');
		eleStyle.type = 'text/css';
		eleStyle.innerHTML += `
			#h2p-div-sign {
				width			: 18px;
				height			: 18px;
				display			: inline-block;
				vertical-align 	: middle;
			}
			#h2p-div-sign span {
				font-size		: 18px;
				cursor			: pointer;
			}

			#div-DYScript input, #div-DYScript button, #div-DYScript select {
				outline			: none;
				line-height		: 10px;
			}
			#div-DYScript {
				position 		: absolute;
				bottom 			: ${isBilibiliLive ? 147 : 1}px;
				min-width 		: 335px;
				max-width 		: 335px;
				border 			: none;
				margin 			: 0 0 0 -1px;
				box-shadow		: #c7c7c7 0 -5px 5px 0;
				display         : flex;
				flex-flow       : row wrap;
				z-index 		: 999;
			}
			#div-DYScript .h2p-div-inlinepanel {
				min-width 		: 315px;
				max-width 		: 315px;
				padding 		: 10px;
				border-width	: 0 0 1px 0;
				font-family		: WeibeiSC-Bold, STKaiti;
				font-size		: 16px;
				background		: #f5f5f5;
			}

			#div-DYScript .h2p-div-inlinetab {
				min-width 		: 335px;
				max-width 		: 335px;
				border-top		: 1px solid #DCDCDC;
				border-radius	: 2px;
				font-family		: WeibeiSC-Bold, STKaiti;
				font-size		: 16px;
				background		: #f5f5f5;
				display         : flex;
				flex-flow       : row wrap;
			}
			#div-DYScript .h2p-div-layer {
				position	: relative;
				width		: 100%;
				height		: 24px;
			}
			#div-DYScript .h2p-div-layer-half {
				position	: absolute;
				width		: 50%;
				height		: 24px;
			}
			#div-DYScript .h2p-input-normal {
				height			: 22px;
				padding			: 0px 5px;
				border			: 1px solid #708090;
				border-radius	: 5px;
				font-size		: 13px;
			}
			#div-DYScript .h2p-input-disable {
				background		: #DCDCDC;
				cursor			: default;
			}
			#div-DYScript .h2p-input-able {
				background		: white;
				cursor			: text;
			}
			#div-DYScript .h2p-div-tab {
				width			: 50%;
				max-height		: 29px;
				padding			: 2px 0;
				text-align		: center;
			}
			#div-DYScript .h2p-div-tab:hover {
				cursor			: pointer;
				background		: #DDDDDD;
			}
			#div-DYScript .h2p-hover-pointer:hover {
				cursor			: pointer;
				background		: #DDDDDD;
			}
			.h2p-bg-close	{ background : #00ddbb }
			.h2p-bg-close:hover{ background : #00ccaa }
			.h2p-bg-open	{ background : #99aaff }
			.h2p-bg-open:hover	{ background : #8899cc }

			div#div-DYScript button {
				font-family: inherit;
			}
		`;
		document.head.appendChild(eleStyle);

		// 弹幕框上的 🐯
		let div_sign = undefined;
		if (isDouyu) {
			div_sign = document.createElement('div');
			div_sign.id = 'h2p-div-sign';
			div_sign.style = 'margin: -8px 0 0 -3px;';
			div_sign.title = '斗鱼脚本';
			div_sign.innerHTML = `<span id="h2p-span-DYScript">${config_script.icon}</span>`;
		} else if (isHuya) {
			div_sign = document.createElement('div');
			div_sign.id = 'h2p-div-sign';
			div_sign.classList = 'room-chat-tool';
			div_sign.style = 'font-size: 21px; line-height: 21px;';
			div_sign.title = '虎牙脚本';
			div_sign.innerHTML = `<span id="h2p-span-DYScript">${config_script.icon}</span>`;
		} else if (isBilibiliLive) {
			div_sign = document.createElement('div');
			div_sign.id = 'h2p-div-sign';
			div_sign.classList = 'icon-item icon-font';
			div_sign.style = 'margin-top: -10px; display: inline-block;';
			div_sign.title = 'B 站脚本';
			div_sign.innerHTML = `<span id="h2p-span-DYScript">${config_script.icon}</span>`;
		}
		
		
		// 整个面板 ===============================================================
		let div_DYScript = document.createElement('div');
		div_DYScript.id = 'div-DYScript';
		div_DYScript.style = 'display: none;';

		// 检查弹幕面板挂载点（斗鱼弹幕显示区域）是否加载完成
		// 检查弹幕图标挂载点（斗鱼弹幕输入框）是否加载完成
		let check_mountPoint_barPanel = setInterval(() => {
			if (isDouyu && $H2P('div.layout-Player-asideMainTop') && $H2P('div.BarrageSuperLink') && $H2P('div.ChatToolBar')) {
				window.clearInterval(check_mountPoint_barPanel);
				check_mountPoint_barPanel = null;
				setTimeout(() => {
					$H2P('div.layout-Player-asideMainTop').appendChild(div_DYScript);
					$H2P('div.ChatToolBar').appendChild(div_sign);
					resolve();
				}, 2000);
			} else if (isHuya && $H2P('div.room-chat-tools') && $H2P('div.room-chat-tools > .room-chat-tool') && $H2P('div#watchChat_pub')) {
				window.clearInterval(check_mountPoint_barPanel);
				check_mountPoint_barPanel = null;
				setTimeout(() => {
					$H2P('div#watchChat_pub').appendChild(div_DYScript);
					$H2P('div.room-chat-tools').appendChild(div_sign);
					resolve();
				}, 2000);
			} else if (isBilibiliLive && $H2P('div.chat-history-panel') && $H2P('div#iconConfigRight')) {
				window.clearInterval(check_mountPoint_barPanel);
				check_mountPoint_barPanel = null;
				setTimeout(() => {
					$H2P('div.chat-history-panel').appendChild(div_DYScript);
					$H2P('div#iconConfigRight').appendChild(div_sign);
					resolve();
				}, 2000);
			} else if (!isDouyu && !isHuya && !isBilibili) {
				window.clearInterval(check_mountPoint_barPanel);
				check_mountPoint_barPanel = null;
				document.body.appendChild(div_DYScript);
				document.body.appendChild(div_sign);
				resolve();
			}
		}, 1000);
	})
	.then(() => {
		$H2P('span#h2p-span-DYScript').addEventListener('click', () => {
			viewShow_script = !viewShow_script;
			$H2P('div#div-DYScript').style.display = viewShow_script ? '' : 'none';
		});
	})
	.then(() => {
		let div_DYScriptTab = document.createElement('div');
		div_DYScriptTab.id = 'div-DYScriptTab';
		div_DYScriptTab.className = 'h2p-div-inlinetab';
		div_DYScriptTab.style = 'order: 20;'
		div_DYScriptTab.innerHTML = `
			<div id="h2p-div-tab-bar" class="h2p-div-tab" style="background: #DDDDDD;" title="发弹幕">📢</div>
			<div id="h2p-div-tab-config" class="h2p-div-tab" title="自动化设置">⏲️</div>
		`;
		$H2P('div#div-DYScript').appendChild(div_DYScriptTab);
	})
	.then(() => {
		$H2P('div#div-DYScriptTab').addEventListener('click', (event) => {
			// 发弹幕
			if (event.target.id === 'h2p-div-tab-bar') {
				viewShow_bar = true;
				viewShow_config = false;
				$H2P('div#h2p-div-bar').style.display = '';
				$H2P('div#h2p-div-config').style.display = 'none';
				$H2P('div#h2p-div-tab-bar').style.backgroundColor = '#DDDDDD';
				$H2P('div#h2p-div-tab-config').style.backgroundColor = '#f5f5f5';
			}
			// 自动化设置
			else if (event.target.id === 'h2p-div-tab-config') {
				viewShow_bar = false;
				viewShow_config = true;
				$H2P('div#h2p-div-bar').style.display = 'none';
				$H2P('div#h2p-div-config').style.display = '';
				$H2P('div#h2p-div-tab-bar').style.backgroundColor = '#f5f5f5';
				$H2P('div#h2p-div-tab-config').style.backgroundColor = '#DDDDDD';
			}
		}, false);
	});








// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //
// 
// 															发弹幕
// 
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //

	const LSChat = 'h2p-DY-config-chat';
	let config_chat_pre = {
		invlStart	: 3,
		invlEnd		: 4,
		isLuck		: false,
		luckTime	: 2,
		isKeyRe		: false,
		keyReBar	: [],
		isCopy		: false,
		copyInvl	: 0,
		isLoop		: false,
		loopBar		: [],
		isSend		: false,
	};
	let config_chat = {};
	Object.assign(config_chat, config_chat_pre);
	let config_chat_tmp = JSON.parse(localStorage.getItem(LSChat)) || {};
	Object.assign(config_chat, config_chat_tmp);
	for (let key in config_chat) { if (!(key in config_chat_pre)) { delete config_chat[key]; } }
	localStorage.removeItem(LSChat);
	localStorage.setItem(LSChat, JSON.stringify(config_chat));

	let [Chat, INVL_SendBar, INVL_ShowCD] = [undefined, undefined, undefined];

	let invl	= 0;				// 间隔时间
	let luckBar	= '';				// 抽奖弹幕内容
	let luckCD	= 0;				// 弹幕抽奖活动倒计时
	let luckTime = 0;				// 抽奖弹幕发送次数
	let Index_keyRe = 0;			// 关键词回复弹幕列表已经检测的位置
	let keyRes	= [];				// 已经回复的弹幕 ID

	// 初始化自动发弹幕界面  ===============================================================
	new Promise((resolve, reject) => {
		let eleStyle = document.createElement('style');
		eleStyle.type = 'text/css';
		eleStyle.innerHTML += `
			#h2p-div-bar input[type="checkbox"] {
				margin			: 3px;
			}
			#h2p-div-bar .h2p-input-invl {
				width			: 23px;
    			margin			: 0 5px;
			}

			#h2p-div-bar .h2p-ta-bar-loopBar {
				width			: 283px;
				height			: 73px;
				padding			: 5px;
				border			: 1px solid #708090;
				border-radius	: 5px;
				font-size		: 13px;
				resize			: none;
				font-family		: inherit;
			}

			#h2p-div-bar .h2p-btn-keyRe {
				width			: 16px;
				height			: 16px;
				padding			: 0;
				margin			: 3px;
				border			: 1px solid rgb(216, 216, 216);
				border-radius	: 50%;
				background-color: white;
				text-align		: center;
			}

			#h2p-div-bar #h2p-btn-bar-send {
				line-height: 18px;
				width: 100%;
				padding: 4px 0;
				border: none;
				border-radius: 5px;
				cursor: pointer;
				transition: all 0.5s
			}

			#h2p-div-bar .h2p-btn-active {
				background: #ffbb77!important;
			}

			#h2p-div-bar input { font-size: 10px!important; }

			.sendingDisabled {}
		`;
		document.head.appendChild(eleStyle);

		let div = document.createElement('div');
		div.id = 'h2p-div-bar';
		div.className = 'h2p-div-inlinepanel';
		div.style = '';

		div.innerHTML += `
			<!-- 发送弹幕的速度 And 倒计时 -->
			<div class="h2p-flex-main-center">
				<div class="h2p-flex-main-start h2p-item-50p">
					<label>间隔</label>
					<input id="h2p-input-bar-invl-start" class="h2p-input-normal h2p-input-invl sendingDisabled" placeholder="≥3" />
					<span>~</span>
					<input id="h2p-input-bar-invl-end" class="h2p-input-normal h2p-input-invl sendingDisabled" />
					<label>秒</label>
				</div>
				<div class="h2p-flex-main-end h2p-item-50p">
					<input id="h2p-input-cd" class="h2p-input-normal h2p-input-disable" style="width: 32px;" disabled/>
				</div>
			</div>

			<!-- 是否参加弹幕抽奖 -->
			<div class="h2p-flex-main-center" style="display: ${isDouyu ? '' : 'none'}">
				<div class="h2p-flex-main-start h2p-item-50p">
					<input id="h2p-input-bar-isLuck" type="checkbox" />
					<label>抽奖弹幕</label>
				</div>
				<div class="h2p-flex-main-end h2p-item-50p">
					<label>抽奖发送</label>
					<input id="h2p-input-bar-luck-time-now" class="h2p-input-normal h2p-input-invl h2p-input-disable" disabled />
					<span>/</span>
					<input id="h2p-input-bar-luck-time" class="h2p-input-normal h2p-input-invl sendingDisabled" style="margin-right: 0;" placeholder="≥1" value="1" />
				</div>
			</div>

			<!-- 是否使用关键词自动回复 -->
			<div class="h2p-flex-main-center" style="margin: 0 0 8px 0; display: ${isDouyu ? '' : 'none'}">
				<div class="h2p-flex-main-start h2p-item-50p">
					<input id="h2p-input-bar-isKeyRe" type="checkbox" />
					<label>关键词回复</label>
					<button id="h2p-btn-addKeyRe" class="h2p-btn-keyRe h2p-hover-pointer" title="添加关键词">+</button>
				</div>
				<div class="h2p-flex-main-end h2p-item-50p">
					<select id="h2p-select-keyRe" style="width: 100%; height: 24px;">
					</select>
				</div>
			</div>

			<div class="h2p-flex-main-center" style="display: ${isDouyu ? '' : 'none'}">
				<div class="h2p-flex-main-start h2p-item-50p">
					<button id="h2p-btn-delKeyRe" class="h2p-btn-keyRe h2p-hover-pointer" title="删除关键词">-</button>
					<input id="h2p-input-key" class="h2p-input-normal" style="width: 70%;" placeholder="关键词" />
				</div>
				<div class="h2p-flex-main-end h2p-item-50p">
					<input id="h2p-input-re" class="h2p-input-normal" style="width: 90%; padding: 0 4.2%;" placeholder="自动回复弹幕" />
				</div>
			</div>

			<!-- 是否发送抄袭弹幕 -->
			<div class="h2p-flex-main-center">
				<div class="h2p-flex-main-start h2p-item-50p">
					<input id="h2p-input-bar-isCopy" type="checkbox" />
					<label>抄袭弹幕</label>
				</div>
				<div class="h2p-flex-main-end h2p-item-50p">
					<label>抄袭间隔</label>
					<input id="h2p-input-bar-copy-invl" class="h2p-input-normal" style="margin-left: 5px; width: 48px;" placeholder="0 ~ 200" value="0"/>
				</div>
			</div>

			<!-- 是否发送循环弹幕 -->
			<div class="h2p-flex-main-center" style="height: 75px;">
				<input id="h2p-input-bar-isLoop" type="checkbox" />
				<textarea id="h2p-ta-bar-loopBar" class="h2p-ta-bar-loopBar" placeholder="循环弹幕"></textarea>
			</div>

			<!-- 开启弹幕发送按钮 -->
			<div class="h2p-flex-main-center" style="margin: 0 0 5px 0;">
				<button id="h2p-btn-bar-send" class="h2p-bg-close" ${isBilibili ? 'disabled' : ''}>${isBilibiliLive ? '暂不可用' : '发送'}</button>
			</div>
		`;

		let setINVL_wait_div_DYScript = setInterval(() => {
			if ($H2P('div#div-DYScript')) {
				window.clearInterval(setINVL_wait_div_DYScript);
				setINVL_wait_div_DYScript = null;
				$H2P('div#div-DYScript').appendChild(div);
				resolve();
			}
		}, 500);
	})
	// 元素绑定监听
	.then(() => {
		let eleBar = $H2P('div#h2p-div-bar');
        eleBar.addEventListener('click', (event) => {
			let target = event.target;
			if (target.id === 'h2p-input-bar-isCopy') {
				config_chat.isCopy = target.checked;
			} else if (target.id === 'h2p-input-bar-isLoop') {
                config_chat.isLoop = target.checked;
            } else if (target.id === 'h2p-input-bar-isKeyRe') {
                config_chat.isKeyRe = target.checked;
            } else if (target.id === 'h2p-input-bar-isLuck') {
                config_chat.isLuck = target.checked;
            }
            localStorage.setItem(LSChat, JSON.stringify(config_chat));
		}, false)
			
		// 间隔最小值
		let eleInvlStart = $H2P('input#h2p-input-bar-invl-start');
		eleInvlStart.addEventListener('input', () => { eleInvlStart.value = eleInvlStart.value.replace(/[^\d]/g, '').slice(0, 3); });
		eleInvlStart.addEventListener('focusout', () => {
			eleInvlStart.value = Math.max(eleInvlStart.value, 3);
			config_chat.invlStart = eleInvlStart.value;
			localStorage.setItem(LSChat, JSON.stringify(config_chat));
		});

		// 间隔最大值
		let eleInvlEnd = $H2P('input#h2p-input-bar-invl-end');
		eleInvlEnd.addEventListener('input', () => { eleInvlEnd.value = eleInvlEnd.value.replace(/[^\d]/g, '').slice(0, 3); });
		eleInvlEnd.addEventListener('focusout', () => {
			eleInvlEnd.value = Math.max(eleInvlEnd.value, Number(eleInvlStart.value) + 1, 4);
			config_chat.invlEnd = eleInvlEnd.value;
			localStorage.setItem(LSChat, JSON.stringify(config_chat));
		});

		// 抽奖弹幕最大次数
		let eleBarLuckTime = $H2P('input#h2p-input-bar-luck-time');
		eleBarLuckTime.addEventListener('input', () => { eleBarLuckTime.value = eleBarLuckTime.value.replace(/[^\d]/g, '').slice(0, 2); });
		eleBarLuckTime.addEventListener('focusout', () => {
			eleBarCopyInvl.value = Math.max(eleBarCopyInvl.value, 1);
			config_chat.luckTime = Number(eleBarLuckTime.value);
			localStorage.setItem(LSChat, JSON.stringify(config_chat));
		});

		// 添加关键词回复
		let eleAddKeyRe = $H2P('button#h2p-btn-addKeyRe');
		eleAddKeyRe.addEventListener('click', () => {
			config_chat.keyReBar.push({key: 'default', re: 'default'});
			localStorage.setItem(LSChat, JSON.stringify(config_chat));
			$H2P('select#h2p-select-keyRe').options.add(new Option('default', 'default'));
			$H2P('select#h2p-select-keyRe').selectedIndex = config_chat.keyReBar.length - 1;
			$H2P('input#h2p-input-key').value = $H2P('select#h2p-select-keyRe').selectedOptions[0].textContent;
			$H2P('input#h2p-input-re').value = $H2P('select#h2p-select-keyRe').selectedOptions[0].value;
		});

		// 删除关键词回复
		let eleDelKeyRe = $H2P('button#h2p-btn-delKeyRe');
		eleDelKeyRe.addEventListener('click', () => {
			config_chat.keyReBar.splice($H2P('select#h2p-select-keyRe').selectedIndex, 1);
			localStorage.setItem(LSChat, JSON.stringify(config_chat));
			$H2P('select#h2p-select-keyRe').options.remove($H2P('select#h2p-select-keyRe').selectedIndex);
			$H2P('input#h2p-input-key').value = $H2P('select#h2p-select-keyRe').selectedOptions[0].textContent;
			$H2P('input#h2p-input-re').value = $H2P('select#h2p-select-keyRe').selectedOptions[0].value;
		});

		// 选择关键词回复
		let eleSelectKeyRe = $H2P('select#h2p-select-keyRe');
		eleSelectKeyRe.addEventListener('change', () => {
			$H2P('input#h2p-input-key').value = $H2P('select#h2p-select-keyRe').selectedOptions[0].textContent;
			$H2P('input#h2p-input-re').value = $H2P('select#h2p-select-keyRe').selectedOptions[0].value;
		});

		// 修改关键词
		let eleKey = $H2P('input#h2p-input-key');
		eleKey.addEventListener('keyup', () => {
			config_chat.keyReBar[$H2P('select#h2p-select-keyRe').selectedIndex].key = eleKey.value;
			$H2P('select#h2p-select-keyRe').selectedOptions[0].textContent = eleKey.value;
		});
		eleKey.addEventListener('focusout', () => {
			if (!eleKey.value) {
				eleKey.value = 'default';
				config_chat.keyReBar[$H2P('select#h2p-select-keyRe').selectedIndex].key = eleKey.value;
				$H2P('select#h2p-select-keyRe').selectedOptions[0].textContent = eleKey.value;
			}
			localStorage.setItem(LSChat, JSON.stringify(config_chat));
		});

		// 修改回复
		let eleRe = $H2P('input#h2p-input-re');
		eleRe.addEventListener('keyup', () => {
			config_chat.keyReBar[$H2P('select#h2p-select-keyRe').selectedIndex].re = eleRe.value;
			$H2P('select#h2p-select-keyRe').selectedOptions[0].value = eleRe.value;
		});
		eleRe.addEventListener('focusout', () => {
			if (!eleRe.value) {
				eleRe.value = 'default';
				config_chat.keyReBar[$H2P('select#h2p-select-keyRe').selectedIndex].re = eleRe.value;
				$H2P('select#h2p-select-keyRe').selectedOptions[0].value = eleRe.value;
			}
			localStorage.setItem(LSChat, JSON.stringify(config_chat));
		});

		// 抄袭弹幕最大间隔
		let eleBarCopyInvl = $H2P('input#h2p-input-bar-copy-invl');
		eleBarCopyInvl.addEventListener('input', () => { eleBarCopyInvl.value = eleBarCopyInvl.value.replace(/[^\d]/g, '').slice(0, 3); });
		eleBarCopyInvl.addEventListener('focusout', () => {
			eleBarCopyInvl.value = Math.min(eleBarCopyInvl.value, 200);
			config_chat.copyInvl = Number(eleBarCopyInvl.value);
			localStorage.setItem(LSChat, JSON.stringify(config_chat));
		});

		// 循环弹幕
		let eleLoop = $H2P('textarea#h2p-ta-bar-loopBar');
        eleLoop.addEventListener('focusout', () => {
            if (eleLoop.value && eleLoop.value.replace(/\s/g, '')) {
                config_chat.loopBar = eleLoop.value.split('\n');
                localStorage.setItem(LSChat, JSON.stringify(config_chat));
            }
		});

		// 发送按钮
		let eleSend = $H2P('button#h2p-btn-bar-send');
        eleSend.addEventListener('click', () => {
			config_chat.isSend = !config_chat.isSend;
			$H2P('div#h2p-div-tab-bar').textContent = config_chat.isSend ? '🔥' : '📢';
			$H2P('input.sendingDisabled', false).forEach(ele => {
				ele.classList.toggle('h2p-input-disable');
				ele.disabled = !ele.disabled;
			})
            if (config_chat.isSend) {
                setINVL_SendBar();
                eleSend.classList.add('h2p-bg-open');
				eleSend.textContent = "发送中";
            }
            else {
                window.clearTimeout(INVL_SendBar);
                INVL_SendBar = null;
                window.clearInterval(INVL_ShowCD);
				INVL_ShowCD = null;
				$H2P('input#h2p-input-cd').value = '';
				$H2P('input#h2p-input-bar-luck-time-now').value = '';
                eleSend.classList.remove('h2p-bg-open');
				eleSend.textContent = "发送";
				
				luckCD = 0;
				luckBar = undefined;
				luckTime = 0;
            }
            localStorage.setItem(LSChat, JSON.stringify(config_chat));
        }, false)
	})
	.catch(error => console.log(error))
	// 读取配置参数
    .then(() => {
		$H2P('input#h2p-input-bar-isLuck').checked = config_chat.isLuck || false;
		$H2P('input#h2p-input-bar-luck-time').value = config_chat.luckTime || 1;

        $H2P('input#h2p-input-bar-invl-start').value = config_chat.invlStart || '';
		$H2P('input#h2p-input-bar-invl-end').value = config_chat.invlEnd || '';
		
		$H2P('input#h2p-input-bar-isKeyRe').checked = config_chat.isKeyRe || false;
		if (!config_chat.keyReBar || !Array.isArray(config_chat.keyReBar)) { config_chat.keyReBar = []; }
		for (let {key, re} of config_chat.keyReBar) { $H2P('select#h2p-select-keyRe').options.add(new Option(key, re)); }

		$H2P('input#h2p-input-bar-isCopy').checked = config_chat.isCopy || false;
		$H2P('input#h2p-input-bar-copy-invl').value = config_chat.copyInvl || '',

		$H2P('input#h2p-input-bar-isLoop').checked = config_chat.isLoop || false;
		$H2P('textarea#h2p-ta-bar-loopBar').value = Array.isArray(config_chat.loopBar) ? config_chat.loopBar.join('\n') : '';
		
        if (config_chat.isSend) {
            config_chat.isSend = false;
            $H2P('button#h2p-btn-bar-send').click();
        }
        if (!Chat) { Chat = setBar(); }
	})
	.then(() => {
		if (config_chat.keyReBar && config_chat.keyReBar.length > 0) {
			$H2P('input#h2p-input-key').value = $H2P('select#h2p-select-keyRe').selectedOptions[0].textContent;
			$H2P('input#h2p-input-re').value = $H2P('select#h2p-select-keyRe').selectedOptions[0].value;
		}
	})
    .catch(error => { console.log(error); })
	
	function getBar () {
		let barrage = undefined;

		// 抽奖弹幕
		if (config_chat.isLuck && $H2P('div.LotteryDrawEnter-desc')) {
			// 计算目前倒计时
			let luckCD_now = Number($H2P('div.LotteryDrawEnter-desc').textContent.split(':').reduce((m, s) => Number(m) * 60 + Number(s)));
			// 新一轮抽奖
			if (luckCD_now > luckCD) {
				luckBar = undefined;
				luckTime = 0;
				// 显示抽奖内容
				$H2P('div.LotteryDrawEnter-enter').click();
				try {
					// 获取抽奖弹幕条件
					let barREQM = $H2P('div.ULotteryStart-joinRule').textContent.split('：')[1];
					const REQMs = ['发弹幕', '发弹幕+关注主播'];
					// 不是赠送、礼物、福袋、数字、盛典
					let regex = /[\u8d60\u9001\u793c\u7269\u798f\u888b\d\u76db\u5178]+/g;
					if (barREQM.search(regex) < 0) {
						if (REQMs.indexOf(barREQM) > -1 || (userInfo.isAnchorFan && barREQM.includes('成为粉丝'))) {
							// 一键参与
							$H2P('div.ULotteryStart-joinBtn').click();										
							// 获取抽奖弹幕内容
							luckBar = $H2P('div.ULotteryStart-demandDanmu > span:nth-child(1)').textContent;
							luckBar = luckBar.split(' : ')[1] ? luckBar.split(' : ')[1] : luckBar.split(' : ')[0];
							if (luckBar.includes('复制')) { luckBar = luckBar.slice(0, -2); }
							if (luckBar.includes('弹幕：')) { luckBar = luckBar.slice(3); }
						}
					} else {
						console.log('出现：赠送、礼物、福袋、数字、盛典');
					}
				} catch (error) { console.log(error); }
				finally { $H2P('span.LotteryContainer-close').click(); }
			}

			barrage = luckTime < config_chat.luckTime ? luckBar : undefined;
			if (barrage) {
				if ($H2P('div.ChatSend-button') && $H2P('div.ChatSend-button').classList.contains('is-gray')) {
					console.log(`发送弹幕冷却中 : ${$H2P('div.ChatSend-button').textContent}`);
				} else {
					luckTime++;
					$H2P('input#h2p-input-bar-luck-time-now').value = luckTime;
					console.log(`抽奖弹幕 : ${barrage}，剩余时间 ${luckCD}`);
				}
			}
			luckCD = Number.isNaN(luckCD_now) ? 0 : luckCD_now;
		}

		// 关键词弹幕回复
		if (!barrage && config_chat.isKeyRe && Array.isArray(config_chat.keyReBar)) {
			let bars = $H2P('ul#js-barrage-list > li', false);
			for (let i = Index_keyRe; i < bars.length && !barrage; i++) {
				Index_keyRe++;
				let ele = bars[i];
				try {
					let bar_check = ele.querySelector('span[class^="Barrage-content"]').textContent.replace(/\s/g, '');
					if (ele.querySelector('span[class^="Barrage-nickName"]').title !== userInfo.nickName) {
						for (let j = 0; j < config_chat.keyReBar.length; j++) {
							let keyRe = config_chat.keyReBar[j];
							if (bar_check.includes(keyRe.key)) {
								if (!keyRes.includes(ele.id)) {
									barrage = keyRe.re;
									keyRes.push(ele.id);
									while (keyRes.length > 200) { keyRes.shift; }
									console.log(`关键词弹幕回复 : ${barrage}`);
									break;
								}
							}
						}
					}
				} catch (error) { console.log(error); }
			}
			if (Index_keyRe >= bars.length) { Index_keyRe = 0; }
		}

		// 抄袭弹幕
		if (!barrage && config_chat.isCopy) {
			
			let elePath =	isDouyu ? 'ul#js-barrage-list > li' :
							isHuya ? 'ul#chat-room__list > li' :
							isBilibiliLive ? 'div#chat-items > div' : '';
			let bars = $H2P(elePath, false);
			let index = 0;
			if (config_chat.copyInvl) {
				if (config_chat.copyInvl < bars.length) { index = config_chat.copyInvl; }
				else { index = bars.length - 1; }
			}

			let elePath2 =	isDouyu ? 'span[class^="Barrage-content"]' :
							isHuya ? 'span.msg' :
							isBilibiliLive ? 'span.danmaku-content' : '';
			barrage = bars[index].querySelector(elePath2).textContent.replace(/\s/g, '');
		}

		// 循环弹幕
		if (!barrage && config_chat.isLoop && Array.isArray(config_chat.loopBar)) {
			let index = Math.floor(Math.random() * (config_chat.loopBar.length));
			barrage = config_chat.loopBar[index];
		}

		return barrage ? barrage : '';
	}

	function setINVL_SendBar () {
		let {invlStart = 2, invlEnd = 2} = config_chat;
		let [start, end] = [Number(invlStart), Number(invlEnd)];
		invl = Math.floor(Math.random() * (end - start)) + start;
		setINVL_ShowCD(invl);
		INVL_SendBar = setTimeout(() => {
			let barrage = getBar();
			if (barrage) {
				console.log(`弹幕: ${barrage}`);
				Chat.setMsg(barrage);
				Chat.sendMsg();
			}
			setINVL_SendBar();
		}, invl * 1000);
	}

	function setINVL_ShowCD (invl) {
		new Promise((resolve, reject) => {
			window.clearInterval(INVL_ShowCD);
			resolve(invl);
		}).then((invl)=> {
			let cd = invl + 0.3;
			INVL_ShowCD = setInterval(() => {
				cd = Math.max(Math.floor((cd - 0.1) * 10) / 10.0, 0);
				$H2P('input#h2p-input-cd').value = cd;
			}, 100);
		})
	}

	function setBar () {
		let [eleSetBar, eleSendBar] = [undefined, undefined];
		return {
			setMsg : (msg)=>{
				if (!eleSetBar) {
					let elePath =	isDouyu ? '.ChatSend-txt' :
									isHuya ? '#pub_msg_input' :
									isBilibiliLive ? 'textarea.chat-input.border-box' : '';
					eleSetBar = $H2P(elePath);
				}
				if (eleSetBar && msg) { eleSetBar.value = msg; }
			},
			sendMsg : ()=>{
				if (!eleSendBar) {
					let elePath =	isDouyu ? '.ChatSend-button' :
									isHuya ? '#msg_send_bt' :
									isBilibiliLive ? 'div.live-skin-coloration-area > button.bl-button.live-skin-highlight-button-bg > span' : '';
					eleSendBar = $H2P(elePath);
				}
				if (eleSendBar && eleSetBar.value) {
					if (isHuya) {
						eleSendBar.classList.add('enable');
					} else if (isBilibiliLive) {
						$H2P('div.live-skin-coloration-area > button.bl-button.live-skin-highlight-button-bg').disabled = false;
					}
					eleSendBar.click();
				}
			}
		}
	}








// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //
// 
// 																快捷键设置
// 
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //

	document.addEventListener('keydown', (e) => {
		// ESC 按键
		if (e.which === 27) {
			if (config_tool.wideMode) $H2P('button#h2p-btn-config-wideMode').click();
			else if (config_tool.fullMode) $H2P('button#h2p-btn-config-fullMode').click();
		}
		// shift a
		if (e.shiftKey && e.which == myKeyCode.a) {
			if ($H2P('span#h2p-span-DYScript')) {
				if (!viewShow_script) {
					$H2P('span#h2p-span-DYScript').click();
					$H2P('div#h2p-div-tab-bar').click();
				} else {
					if (viewShow_bar) { $H2P('span#h2p-span-DYScript').click(); }
					else { $H2P('div#h2p-div-tab-bar').click(); }
				}
			}
		}
		// shift s
		else if (e.shiftKey && e.which == myKeyCode.s) {
			if ($H2P('span#h2p-span-DYScript')) {
				if (!viewShow_script) {
					$H2P('span#h2p-span-DYScript').click();
					$H2P('div#h2p-div-tab-config').click();
				} else {
					if (viewShow_config) { $H2P('span#h2p-span-DYScript').click(); }
					else { $H2P('div#h2p-div-tab-config').click(); }
				}
			}
		}
		// 清爽模式快捷键
		else if (e.shiftKey && e.which == myKeyCode.o) { $H2P('button#h2p-btn-config-wideMode').click(); }
		else if (e.shiftKey && e.which == myKeyCode.p) { $H2P('button#h2p-btn-config-fullMode').click(); }
		// 清空弹幕
		else if (e.shiftKey && e.which == myKeyCode.e) {
			let elePath = isDouyu ? 'a.Barrage-toolbarClear' : 'p.clearBtn';
			$H2P(elePath).click();
		}
		// 锁定弹幕
		else if (e.shiftKey && e.which == myKeyCode.w) {
			let elePath = isDouyu ? 'a.Barrage-toolbarLock' : 'p.lockBtn';
			$H2P(elePath).click();
		}
	});








	
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //
// 
// 																自动化设置
// 
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //

	// 暂停
	let auto_pausePlay = () => { 
		let INVL_checkIconReady = setInterval(() => {
			// 如果已经禁止了
			let elePath =	isDouyu ? 'div.pause-c594e8.removed-9d4c42' : 
							isHuya ? 'div.player-play-btn' :
							isBilibiliLive ? 'button.blpui-btn.icon-btn[data-title=播放]' : '';
			if ($H2P(elePath)) {
				window.clearInterval(INVL_checkIconReady);
				INVL_checkIconReady = null;
				return;
			}
			elePath =	isDouyu ? 'div.pause-c594e8' :
						isHuya ? 'div.player-pause-btn' :
						isBilibiliAct ? 'button.blpui-btn.icon-btn[data-title=暂停]' : '';
			if ($H2P(elePath)) {
				$H2P(elePath).click();
				window.clearInterval(INVL_checkIconReady);
				INVL_checkIconReady = null;
				console.log('启动完毕 : 暂停');
			}
		}, 500);
	}

	// 静音
	let auto_hideSound = () => {
		let INVL_checkIconReady = setInterval(() => {
			// 如果已经禁止了
			let elePath =	isDouyu ? 'div[class="volume-silent-3eb726"]' :
							isHuya ? 'div.player-sound-off' :
							isBilibiliLive ? 'button.blpui-btn.icon-btn[data-title=取消静音]' : '';
			if ($H2P(elePath)) {
				window.clearInterval(INVL_checkIconReady);
				INVL_checkIconReady = null;
				return;
			}
			elePath =	isDouyu ? 'div[class="volume-8e2726"]' :
						isHuya ? 'div.player-sound-on' : 
						isBilibiliLive ? 'button.blpui-btn.icon-btn[data-title=静音]' : '';;
			if ($H2P(elePath)) {
				$H2P(elePath).click();
				window.clearInterval(INVL_checkIconReady);
				INVL_checkIconReady = null;
				console.log('启动完毕 : 静音');
			}
		}, 500);
	}

	// 禁止弹幕
	let auto_hideBar = () => {
		let INVL_checkIconReady = setInterval(() => {
			// 如果已经禁止了
			let elePath =	isDouyu ? 'div[class="showdanmu-42b0ac removed-9d4c42"]' :
							isHuya ? 'div.danmu-hide-btn' :
							isBilibiliLive ? 'button.blpui-btn.icon-btn[data-title=显示弹幕]' : '';
			if ($H2P(elePath)) {
				window.clearInterval(INVL_checkIconReady);
				INVL_checkIconReady = null;
				return;
			}
			elePath =	isDouyu ? 'div[class="showdanmu-42b0ac"]' :
						isHuya ? 'div.danmu-show-btn' :
						isBilibiliLive ? 'button.blpui-btn.icon-btn[data-title=隐藏弹幕]' : '';
			if ($H2P(elePath)) {
				$H2P(elePath).click();
				window.clearInterval(INVL_checkIconReady);
				INVL_checkIconReady = null;
				console.log('启动完毕 : 禁止弹幕');
			}
		}, 500);
	}

	// 默认画质
	let auto_showDef = () => {
		let INVL_checkIconReady = setInterval(() => {
			let elePath =	isDouyu ? 'div.tip-e3420a > ul > li' :
							isHuya ? 'div.player-videoline-videotype > ul > li' :
							isBilibiliLive ? 'div.bilibili-live-player-video-controller-btn-item.bilibili-live-player-video-controller-switch-quality-btn div.blpui-btn.text-btn.no-select.html-tip-parent div.blpui-btn.text-btn.no-select' : '';
			if ($H2P(elePath, false).length > 0) {
				window.clearInterval(INVL_checkIconReady);
				INVL_checkIconReady = null;
				console.log(`启动完毕 : ${config_tool.show0 ? '最低' : '最高'}画质`);
				if (config_tool.show0) { $H2P(`${elePath}`, false).pop().click(); }
				else if (config_tool.show9) { $H2P(`${elePath}`, false)[0].click(); }
			}
		}, 500);
	}

	function wideMode () {
		console.log(`${config_tool.wideMode ? '启动' : '关闭'} : 宽屏模式`);

		if (config_tool.wideMode) {
			let elePath =	isDouyu ? 'div.wfs-2a8e83' :
							isHuya ? 'span#player-fullpage-btn' :
							isBilibiliLive ? 'button.blpui-btn.icon-btn[data-title=网页全屏]' : '';
			if ($H2P(elePath)) { $H2P(elePath).click(); }
			else {
				let start = new Date().getTime();
				let setINVL_waitWideCoin = setInterval(() => {
					if ($H2P(elePath)) {
						window.clearInterval(setINVL_waitWideCoin);
						setINVL_waitWideCoin = null;
						$H2P(elePath).click();
					} else {
						// 等待最长 5min
						if ((new Date().getTime() - start) / 1000 > 300) {
							window.clearInterval(setINVL_waitWideCoin);
							setINVL_waitWideCoin = null;
						}
					}
				}, 500);
			}
		} else {
			let elePath =	isDouyu ? 'div.wfs-exit-180268' :
							isHuya ? 'span#player-fullpage-btn' :
							isBilibiliLive ? 'button.blpui-btn.icon-btn[data-title=退出网页全屏]' : '';
			if ($H2P(elePath)) { $H2P(elePath).click(); }
		}
	}

	function fullMode () {
		console.log(`${config_tool.fullMode ? '启动' : '关闭'} : 网页全屏`);

		if (config_tool.fullMode) {
			let elePath =	isDouyu ? 'div.fs-781153' :
							isHuya ? 'span#player-fullscreen-btn' :
							isBilibiliLive ? 'button.blpui-btn.icon-btn[data-title=全屏模式]' : '';
			if ($H2P(elePath)) { $H2P(elePath).click(); }
			else {
				let start = new Date().getTime();
				let setINVL_waitFullCoin = setInterval(() => {
					if ($H2P(elePath)) {
						window.clearInterval(setINVL_waitFullCoin);
						setINVL_waitFullCoin = null;
						$H2P(elePath).click();
					} else {
						// 等待最长 5min
						if ((new Date().getTime() - start) / 1000 > 300) {
							window.clearInterval(setINVL_waitFullCoin);
							setINVL_waitFullCoin = null;
						}
					}
				}, 500);
			}
		} else {
			let elePath =	isDouyu ? 'div.fs-exit-b6e6a7' :
							isHuya ? 'span#player-fullpage-btn' :
							isBilibiliLive ? 'button.blpui-btn.icon-btn[data-title=退出全屏]' : '';
			if ($H2P(elePath)) { $H2P(elePath).click(); }
		}
	}

	// 自动领取观看鱼丸
	let INVL_autoGetFB = undefined;
	let isHuntTreasure = false;
	let auto_getFB = () => {
		if (INVL_autoGetFB) { return; }
		if (isDouyu) {
			let today = '' + new Date().getFullYear() + (new Date().getMonth() + 1) + new Date().getDate();
			isHuntTreasure = config_tool.findTreasure === today;
			INVL_autoGetFB = setInterval(() => {
				if (!isHuntTreasure) {
					console.log('开始寻宝');
					new Promise((resolve, reject) => {
						let eleStyle = document.createElement('style');
						eleStyle.id = `h2p-style-fb`;
						eleStyle.innerHTML = `.FTP { visibility: hidden; }`;
						if (!$H2P(`style#h2p-style-fb`)) { document.body.appendChild(eleStyle); }
						setTimeout(resolve, 500);
					})
					.then(() => {
						// 打开领取鱼丸界面
						if ($H2P('div.FishpondTreasure-icon') && !$H2P('div.FTP')) {
							$H2P('div.FishpondTreasure-icon').click();
							$H2P('div.FTP-handle-btnBottom', false).filter(ele => ele.textContent === '寻宝')[0].click();
						}
					})
					.then(() => {
						let count = Number.parseInt($H2P('div.FTP-userInfo > span').textContent.split('\/')[0]);
						if (count === 3) {
							isHuntTreasure = true;
							config_tool.findTreasure = today;
							localStorage.setItem(LSConfig, JSON.stringify(config_tool));
							console.log(`寻宝完毕`);
						} else {
							console.log(`寻宝第 ${count+1} 次`);
							$H2P('div.FTP-turntableStartBtn').click();
						}
					})
					.catch(error => { console.log(error); })
					.finally(() => {
						if ($H2P('span.FTP-close')) { $H2P('span.FTP-close').click(); }
						$H2P(`style#h2p-style-fb`).remove();
					})
				} else {
					// 观看鱼丸元素存在并且有未领取的鱼丸
					if ($H2P('div.FishpondTreasure-num.is-entrance') && Number($H2P('div.FishpondTreasure-num.is-entrance').textContent) > 0) {
						for (let i = 0; i < 3; i++) {
							setTimeout(() => {
								new Promise((resolve, reject) => {
									let eleStyle = document.createElement('style');
									eleStyle.id = `h2p-style-fb-${i}`;
									eleStyle.innerHTML = `.FTP { visibility: hidden; }`;
									if (!$H2P(`style#h2p-style-fb-${i}`)) { document.body.appendChild(eleStyle); }
									setTimeout(resolve, 500);
								})
								.then(() => {
									// 打开领取鱼丸界面
									if ($H2P('div.FishpondTreasure-icon') && !$H2P('div.FTP')) {
										$H2P('div.FishpondTreasure-icon').click();
									}
									// 每日活跃、每周活跃
									$H2P('span.FTP-btn', false)[i].click();
									$H2P('div.FTP-singleTask-btn.is-finished', false).forEach(ele => ele.click());
									// 鱼塘
									$H2P('div.FTP-bubble-progressText.is-complete', false).forEach(ele => ele.click());
								})
								.catch(error => { console.log(error); } )
								.finally(() => {
									if ($H2P('span.FTP-close')) { $H2P('span.FTP-close').click(); }
									$H2P(`style#h2p-style-fb-${i}`).remove();
								})
							}, 1500 * i);
						}
					}
				}
			}, 5000);
		} else if (isHuya) {
			INVL_autoGetFB = setInterval(() => {
				if ($H2P('div.chest-award-count') && Number($H2P('div.chest-award-count').textContent) > 0) {
					let eles = $H2P('p.player-box-stat3', false).filter(ele => ele.style.visibility == 'visible');
					for (let i = 0; i < eles.length; i++) {
						setTimeout(() => { eles[i].click(); }, 500 * i)
					}
				} else if ($H2P('p.player-box-stat4', false).filter(ele => ele.style.visibility == 'visible').length == 6) {
					window.clearInterval(INVL_autoGetFB);
					INVL_autoGetFB = null;
				}
			}, 5000);
		}
	};

	// 自动签到
	let auto_signIn = () => {
		if (!isDouyu) { return; }
		let INVL_checkSignInIconReady = setInterval(() => {
			let elePath =	isDouyu ? 'div.RoomLevelDetail-level.RoomLevelDetail-level--no' :
							isBilibiliLive ? 'div.checkin-btn.t-center.pointer' : '';
			if ($H2P(elePath)) {
				window.clearInterval(INVL_checkSignInIconReady);
				INVL_checkSignInIconReady = null;
				console.log('启动完毕 : 签到');
				$H2P(elePath).click();
				setTimeout(() => {
					// 关闭签到弹出的框
					$H2P('div.SSR-D-close').click();
				}, 200);
			}
		}, 500);
	}

	// 自动赠送荧光棒
	let auto_anchorUp = () => {
		if (!isDouyu) { return; }
		
		function donateYGB(roomId){
			let formData = new FormData();
			formData.append("propId", "268");
			formData.append("propCount", 1);
			formData.append("roomId", roomId);
			fetch('https://www.douyu.com/japi/prop/donate/mainsite/v1', {
				method: 'POST',
				body: formData
			})
			.then(res => res.json())
			.then(res => {
				if (res && 'error' in res && res.error === 0) {
					console.log('成功赠送主播 : '+ roomId + ' 一个荧光棒');
					roomOfAnchorFan[roomId].anchorUp += 1;
				} else {
					console.log('赠送' + roomId + '失败 : ' + res.msg);
				}
			});
		}

		let INVL_anchorUp = setInterval(() => {
			if (roomOfAnchorFan) {
				let roomIds = Object.keys(roomOfAnchorFan);
				for (let i = 0; i < roomIds.length; i++) {
					let roomId = roomIds[i];
					if (roomOfAnchorFan[roomId].anchorUp === 0) { setTimeout(() => { donateYGB(roomId); }, (i+1) * 2000); }
				}
				window.clearInterval(INVL_anchorUp);
				INVL_anchorUp = null;
				console.log('启动完毕 : 赠送荧光棒');
			}
		}, 1000);
	}

	if (isDouyu) {
		// 检测是否出现 在电脑面前检测
		setInterval(() => {
			if ($H2P('div.btn2-869c8d')) {
				$H2P('div.btn2-869c8d', false).forEach(ele => { ele.click() });
			}
		}, 10000);
		// 检测是否出现 重新加载
		setInterval(() => {
			if ($H2P('div.reload-0876b5') && $H2P('div.reload-0876b5').style.display != 'none') {
				$H2P('div.reload-0876b5', false).forEach(ele => { ele.click(); });
			}
		}, 10000);
	}








// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //
// 
// 															脚本自动化配置界面
// 
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //

	const LSConfig = 'h2p-DY-config-tool';
	let config_tool_pre = {
		pausePlay	: false,
		hideSound	: false,
		hideBar		: false,
		show0		: false,
		show9		: false,
		wideMode	: false,
		fullMode	: false,
		getFB		: false,
		findTreasure: '',
		signIn		: false,
		anchorUp    : false,
	};
	let config_tool = {};
	Object.assign(config_tool, config_tool_pre);
	let config_tool_tmp = JSON.parse(localStorage.getItem(LSConfig)) || {};
	Object.assign(config_tool, config_tool_tmp);
	for (let key in config_tool) { if (!(key in config_tool_pre)) { delete config_tool[key]; } }
	localStorage.removeItem(LSConfig);
	localStorage.setItem(LSConfig, JSON.stringify(config_tool));

	if (config_tool.pausePlay) {
		console.log('启动 : 暂停播放');
		auto_pausePlay();
	}
	if (config_tool.hideSound) {
		console.log('启动 : 自动静音');
		auto_hideSound();
	}
	if (config_tool.hideBar) {
		console.log('启动 : 自动禁止弹幕');
		auto_hideBar();
	}
	if (config_tool.show0) {
		console.log('启动 : 最低画质');
		auto_showDef();
	}
	if (config_tool.show9) {
		console.log('启动 : 最高画质');
		auto_showDef();
	}
	if (config_tool.wideMode) { wideMode(); }
	if (config_tool.fullMode) { fullMode(); }
	if (config_tool.getFB) {
		console.log('启动 : 自动领取观看鱼丸');
		auto_getFB();
	}
	if (config_tool.signIn) {
		console.log('启动 : 自动签到');
		auto_signIn();
	}
	if (config_tool.anchorUp) {
		console.log('启动 : 自动赠送荧光棒');
		auto_anchorUp();
	}
	

	new Promise((resolve, reject) => {
		// 创建元素样式  ===============================================================
		let eleStyle = document.createElement('style');
		eleStyle.type = 'text/css';
		eleStyle.innerHTML += `
			#h2p-div-config button { height: 25px; }
			.h2p-btn {
				width			: 100%;
				height			: 100%;
				padding			: 4px 0;
				border			: none;
				border-radius	: 5px;
				margin			: 0;
				font-size		: 13px;
				cursor			: pointer;
			}
			.h2p-top-0		{ top: 0!important; }
			.h2p-top-50		{ top: 50px!important; }
			.h2p-w-50p		{ width: 50%!important; }
			.h2p-w-96p		{ width: 96%!important; }
			.h2p-h-100p 	{ height: 100%!important; }
		`;
		document.head.appendChild(eleStyle);

		// 初始化配置界面  ===============================================================
		let div = document.createElement('div');
		div.id = 'h2p-div-config';
		div.className = 'h2p-div-inlinepanel';
		div.style = 'display: none;';
		div.innerHTML = `
			<div class="h2p-flex-main-start h2p-item-100p">
				<div class="h2p-flex-main-start h2p-item-50p">
					<button class="h2p-btn h2p-w-96p h2p-bg-close">关闭状态</button>
				</div>
				<div class="h2p-flex-main-end h2p-item-50p">
					<button class="h2p-btn h2p-w-96p h2p-bg-open">开启状态</button>
				</div>
			</div>

			<hr style="margin: 6px -9px 12px; border: 1px solid #DCDCDC;">

			<!-- 暂停播放、静音、关闭弹幕 -->
			<div class="h2p-flex-main-start h2p-item-100p">
				<div class="h2p-flex-main-start h2p-item-50p">
					<div class="h2p-flex-main-start h2p-item-50p">
						<button id="h2p-btn-config-pausePlay" class="h2p-btn h2p-w-96p h2p-bg-close">暂停播放</button>
					</div>
					<div class="h2p-flex-main-start h2p-item-50p">
						<button id="h2p-btn-config-hideSound" class="h2p-btn h2p-w-96p h2p-bg-close">静音</button>
					</div>
				</div>
				<div class="h2p-flex-main-end h2p-item-50p">
					<div class="h2p-flex-main-end h2p-item-50p">
						<button id="h2p-btn-config-hideBar" class="h2p-btn h2p-w-96p h2p-bg-close">关闭弹幕</button>
					</div>
					<div class="h2p-flex-main-end h2p-item-50p">
					</div>
				</div>
			</div>
			
			<div class="h2p-flex-main-start h2p-item-100p">
				<!-- 画质选项 -->
				<div class="h2p-flex-main-start h2p-item-50p">
					<div class="h2p-flex-main-start h2p-item-50p">
						<button id="h2p-btn-config-show0" class="h2p-btn h2p-w-96p h2p-bg-close">最低画质</button>
					</div>
					<div class="h2p-flex-main-start h2p-item-50p">
						<button id="h2p-btn-config-show9" class="h2p-btn h2p-w-96p h2p-bg-close">最高画质</button>
					</div>
				</div>
				<!-- 播放器大小 -->
				<div class="h2p-flex-main-end h2p-item-50p">
					<div class="h2p-flex-main-end h2p-item-50p">
						<button id="h2p-btn-config-wideMode" class="h2p-btn h2p-w-96p h2p-bg-close">宽屏模式</button>
					</div>
					<div class="h2p-flex-main-end h2p-item-50p">
						<button id="h2p-btn-config-fullMode" class="h2p-btn h2p-w-96p h2p-bg-close">网页全屏</button>
					</div>
				</div>
			</div>

			<div class="h2p-flex-main-start h2p-item-100p">
				<div class="h2p-flex-main-start h2p-item-50p">
					<div class="h2p-flex-main-start h2p-item-50p" style="display: ${isBilibili ? 'none' : ''}">
						<!-- 是否自动领取鱼塘 -->
						<button id="h2p-btn-config-getFB" class="h2p-btn h2p-w-96p h2p-bg-close">领取${isDouyu ? '鱼塘' : '宝箱'}</button>
					</div>
					<div class="h2p-flex-main-start h2p-item-50p" style="display: ${isHuya ? 'none' : ''}">
						<!-- 是否自动签到 -->
						<button id="h2p-btn-config-signIn" class="h2p-btn h2p-w-96p h2p-bg-close" style="float: right">签到</button>
					</div>
				</div>
					
				<div class="h2p-flex-main-end h2p-item-50p" style="display: ${isBilibili ? 'none' : ''}">
					<div class="h2p-flex-main-end h2p-item-50p" style="display: ${isDouyu ? '' : 'none'}">
						<!-- 赠送荧光棒 -->
						<button id="h2p-btn-config-anchorUp" class="h2p-btn h2p-w-96p h2p-bg-close">赠送荧光棒</button>
					</div>
					<div class="h2p-flex-main-end h2p-item-50p">
					</div>
				</div>
			</div>
		`;

		let setINVL_wait_div_DYScript = setInterval(() => {
			if ($H2P('div#div-DYScript')) {
				window.clearInterval(setINVL_wait_div_DYScript);
				setINVL_wait_div_DYScript = null;
				$H2P('div#div-DYScript').appendChild(div);
				setTimeout(resolve, 250);
			}
		}, 500);
	})
	.then(() => {
		let eleConfig = $H2P('div#h2p-div-config');
		eleConfig.addEventListener('click', (event) => {
			let target = event.target;
			if (target.tagName.toLowerCase() !== 'button') { return; }
			target.classList.toggle('h2p-bg-open');
			if (target.id === 'h2p-btn-config-wideMode') {
				config_tool.wideMode = !config_tool.wideMode;
				if (config_tool.fullMode) {
					config_tool.fullMode = false;
					$H2P('button#h2p-btn-config-fullMode').classList.remove('h2p-bg-open');
				}
				wideMode();
			} else if (target.id === 'h2p-btn-config-fullMode') {
				config_tool.fullMode = !config_tool.fullMode;
				if (config_tool.wideMode) {
					config_tool.wideMode = false;
					$H2P('button#h2p-btn-config-wideMode').classList.remove('h2p-bg-open');
				}
				fullMode();
			} else if (target.id === 'h2p-btn-config-show0') {
				config_tool.show0 = !config_tool.show0;
				config_tool.show9 = false;
				$H2P('button#h2p-btn-config-show9').classList.remove('h2p-bg-open');
				auto_showDef();
			} else if (target.id === 'h2p-btn-config-show9') {
				config_tool.show0 = false;
				$H2P('button#h2p-btn-config-show0').classList.remove('h2p-bg-open');
				config_tool.show9 = !config_tool.show9;
				auto_showDef();
			}
			else if (target.id === 'h2p-btn-config-hideBar') {
				config_tool.hideBar = !config_tool.hideBar;
				auto_hideBar();
			}
			else if (target.id === 'h2p-btn-config-hideSound') {
				config_tool.hideSound = !config_tool.hideSound;
				auto_hideSound();
			}
			else if (target.id === 'h2p-btn-config-getFB') {
				config_tool.getFB = !config_tool.getFB;
				auto_getFB();
			}
			else if (target.id === 'h2p-btn-config-signIn') {
				config_tool.signIn = !config_tool.signIn;
				auto_signIn();
			}
			else if (target.id === 'h2p-btn-config-anchorUp') {
				config_tool.anchorUp = !config_tool.anchorUp;
				auto_anchorUp();
			}
			else if (target.id === 'h2p-btn-config-pausePlay') {
				config_tool.pausePlay = !config_tool.pausePlay;
				auto_pausePlay();
			}
			localStorage.setItem(LSConfig, JSON.stringify(config_tool));
		}, false);
	})
	.then(() => {
		if (config_tool.wideMode) { $H2P('button#h2p-btn-config-wideMode').classList.add('h2p-bg-open'); }
		if (config_tool.fullMode) { $H2P('button#h2p-btn-config-fullMode').classList.add('h2p-bg-open'); }
		if (config_tool.delEle) { $H2P('button#h2p-btn-config-delEle').classList.add('h2p-bg-open'); }
		if (config_tool.show0) { $H2P('button#h2p-btn-config-show0').classList.add('h2p-bg-open'); }
		if (config_tool.show9) { $H2P('button#h2p-btn-config-show9').classList.add('h2p-bg-open'); }
		if (config_tool.hideBar) { $H2P('button#h2p-btn-config-hideBar').classList.add('h2p-bg-open'); }
		if (config_tool.hideSound) { $H2P('button#h2p-btn-config-hideSound').classList.add('h2p-bg-open'); }
		if (config_tool.getFB) { $H2P('button#h2p-btn-config-getFB').classList.add('h2p-bg-open'); }
		if (config_tool.signIn) { $H2P('button#h2p-btn-config-signIn').classList.add('h2p-bg-open'); }
		if (config_tool.anchorUp) { $H2P('button#h2p-btn-config-anchorUp').classList.add('h2p-bg-open'); }
		if (config_tool.pausePlay) { $H2P('button#h2p-btn-config-pausePlay').classList.add('h2p-bg-open'); }
	})
	.catch(error => { console.log(error); })
})();

/*
	<div style=`
			position: fixed;
			width: 100%;
			height: 100%;
			left: 0;
			top: 0;
			opacity: 0.5;
			background: black;
			z-index: 999;
		`></div>
	<iframe width="670" height="500" src="//hd.huya.com/pay/index.html?source=web&lp=1259515661837&hasVideo=0" style="position: fixed; border-width: 0px; left: 385px; top: 125px; z-index: 1000;">
*/