// ==UserScript==
// @name		Baidu Pan SuperKey
// @namespace	a@b.c
// @author		jasake
// @description	度盘万能钥匙，云盘万能钥匙扩展改成 GM 脚本
// @description	有需要的请使用原版扩展：https://addons.mozilla.org/zh-CN/firefox/addon/ypsuperkey/
// @include		https://pan.baidu.com/share/init?surl=*
// @include		https://pan.baidu.com/wap/init?surl=*
// @include		https://pan.baidu.com/share/init?shareid=*
// @include		https://pan.baidu.com/wap/init?shareid=*
// @include		https://pan.baidu.com/s/*
// @charset		UTF-8
// @version		0.5.2
// @grant		GM_xmlhttpRequest
// @run-at		document-end
// ==/UserScript==

function shareHistory(id, pw) {//本地历史记录，有效期30天
	if (!/(?:\w|-){5,}/.test(id)) return;
	var log = JSON.parse(localStorage.getItem("shareHistory") || '{}'), Keys = Object.keys(log).filter(x => x != '_lastCheck'), last = log['_lastCheck'], t = Math.round(new Date().getTime() / 1e3), exp = t + 30 * 86400;
	if (!last) {
		Keys.forEach(x => {
			if (log[x].split('|').length == 1) log[x] += '|' + exp;
		});
		log['_lastCheck'] = t;
		localStorage.setItem("shareHistory", JSON.stringify(log));
	} else if (last && t - last > 3600) {
		Keys.forEach(x => {
			var arr = log[x].split('|');
			if (+arr[1] < t) log[x] = undefined;
		});
		log['_lastCheck'] = t;
		localStorage.setItem("shareHistory", JSON.stringify(log));
	}
	if (pw == undefined) {
		return log[id] && log[id].split('|').shift() || '';
	} else if (/^[a-zA-Z0-9]{4}$/.test(pw)) {
		log[id] = pw + '|' + exp;
		localStorage.setItem("shareHistory", JSON.stringify(log));
	}
}

var hash = location.hash && /^#([a-zA-Z0-9]{4})$/.test(location.hash) && RegExp.$1,
	$ = unsafeWindow.require('system-core:context/context.js').instanceForSystem.libs.JQuery,
	input = document.querySelector('.pickpw input[tabindex="1"], .access-box input#accessCode'),
	btn = document.querySelector('.pickpw a.g-button, .access-box a#getfileBtn'),
	label = document.querySelector('.pickpw dt, .access-box label[for=accessCode]'),
	shareID = (location.href.match(/\/init\?(?:surl|shareid)=((?:\w|-)+)/) || location.href.match(/\/s\/1((?:\w|-)+)/))[1],
	history = shareHistory(shareID);

/*if (location.href.indexOf('baidu.com/s/') > 0) {//v5
	var url = location.href.replace('baidu.com', 'baiduwp.com').match(/^([^#]+)/)[1] + (location.href.indexOf('?') == -1 ? '?' : '&') + 'pwd=' + history;
	$('<a class="g-button" href="' + url + '" title="转到 Pandownload 网页版"><span class="g-button-right"><em class="icon icon-picpre-download" style="color:#d60;"><font color="#090"></em><span class="text" style="width: auto;"><font color="#090">Pandownload 网页版</font></span></span></a>').insertBefore('.x-button-box a.g-button[data-button-id=b3]');
}*/

if (!input || !btn) return;
//if (location.hash && /^#([a-zA-Z0-9]{4})$/.test(location.hash)) return;//v2

label.style.margin="-5px 0 10px";
label.innerHTML += '<br>度盘万能钥匙：';

if (hash || history) {//v4，一秒后
	label.innerHTML += '发现提取码（'.fontcolor('green') + (hash || history).fontcolor('red') + '），稍后填写并点击'.fontcolor('green');
	setTimeout(function() {
		input.value = hash || history;
		if (hash) shareHistory(shareID, hash);//保存
		btn.click();
	},
	1e3);
	return;
}

var url ='https://ypsuperkey.meek.com.cn/api/items/BDY-'
		+ shareID + '?access_key=4fxNbkKKJX2pAm3b8AEu2zT5d2MbqGbD&client_version=2018.8';

GM_xmlhttpRequest({
	method: 'GET',
	url: url,
	onload: function(xhr) {
		var e = JSON.parse(xhr.responseText);
		console.log(xhr.responseText);
		label.innerHTML += xhr.status == 200 ? ('连接成功，'.fontcolor('blue') + (e.access_code ? '密码已获取'.fontcolor('blue') : '但密码找不到'.fontcolor('red'))) : (e.message + '，服务器状态：' + xhr.statusText + '(' + xhr.status + ')').fontcolor('red');//状态提示
		if (xhr.status == 200 && e.access_code) {
			input.value = e.access_code;//填写密码
			shareHistory(shareID, e.access_code);
			setTimeout(function(){btn.click();}, 1e3);//一秒后自动点击
		}
	}
});