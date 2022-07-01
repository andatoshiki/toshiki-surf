// ==UserScript==
// @name         太平洋摄影部落自动跳转整组浏览
// @namespace    http://tampermonkey.net/
// @homepage     https://greasyfork.org/zh-CN/users/193133-pana
// @version      1.4.0
// @description  打开页面时自动跳转到整组浏览网页
// @author       pana
// @include      http*://dp.pconline.com.cn/*
// @grant        none
// @require      https://cdn.bootcss.com/jquery/2.2.4/jquery.min.js
// ==/UserScript==

(function() {
	'use strict';
	const old_url = location.href;
	const protocol = location.protocol;
	const urlValue = {
		urlChange: {
			dp_photo: 'dp.pconline.com.cn/photo',
			dp_list: 'dp.pconline.com.cn/photo/list_',
			re_dp_list: '//dp.pconline.com.cn/photo/list_',
			re_html: '.html'
		},
		changeHref: function(OldHref) {
			if ((OldHref.indexOf(urlValue.urlChange.dp_photo) !== -1) && (OldHref.indexOf(urlValue.urlChange.dp_list) === -1)) {
				let HtmlIndex = OldHref.indexOf(urlValue.urlChange.re_html);
				let AIndex = OldHref.lastIndexOf("/", HtmlIndex);
				return urlValue.urlChange.re_dp_list + OldHref.substring(AIndex + 1, HtmlIndex) + urlValue.urlChange.re_html
			} else {
				return OldHref
			}
		},
		eachFunction: function(jQuerySelector) {
			$(jQuerySelector).each(function() {
				this.href = urlValue.changeHref(this.href)
			})
		},
		onFunction: function(parentjQuerySelector, jQuerySelector) {
			$(parentjQuerySelector).on('mousedown', jQuerySelector, function() {
				this.href = urlValue.changeHref(this.href)
			})
		}
	};
	const indexReg = /\.html$/i;
	if ((old_url.indexOf("dp.pconline.com.cn/photo/") !== -1) && (indexReg.test(old_url))) {
		if (old_url.indexOf("/list_") === -1) {
			var index1 = old_url.indexOf(urlValue.urlChange.re_html);
			var index2 = old_url.lastIndexOf("_");
			if (index2 === -1) {
				var index3 = old_url.lastIndexOf("/", index1);
				location.replace(protocol + urlValue.urlChange.re_dp_list + old_url.substring(index3 + 1, index1) + urlValue.urlChange.re_html)
			} else {
				var index4 = old_url.lastIndexOf("/", index2);
				location.replace(protocol + urlValue.urlChange.re_dp_list + old_url.substring(index4 + 1, index2) + urlValue.urlChange.re_html)
			}
		} else {
			let errorObj = document.querySelector("title");
			if (errorObj.innerHTML === "Error") {
				location.reload()
			}
		}
	}
	if ((old_url === "https://dp.pconline.com.cn/") || (old_url === "http://dp.pconline.com.cn/") || (old_url.indexOf("dp.pconline.com.cn/index.jsp") !== -1) || (old_url.indexOf("dp.pconline.com.cn/list/all_") !== -1)) {
		urlValue.onFunction('.waterfall', '.wtPic a');
		urlValue.eachFunction('.slide ul li a')
	}
	if (old_url.indexOf("dp.pconline.com.cn/master/") !== -1) {
		urlValue.onFunction('.pannel', 'a.ablum');
		urlValue.eachFunction('.tw80 .fl, .tw80 h6 a, .iExif')
	}
	if ((old_url.indexOf("dp.pconline.com.cn/list/pick.html") !== -1) || (old_url.indexOf("dp.pconline.com.cn/list/m3_") !== -1) || (old_url.indexOf("dp.pconline.com.cn/pick/m3_") !== -1)) {
		urlValue.eachFunction('.wPic a')
	}
	if (old_url.indexOf("dp.pconline.com.cn/travel") !== -1) {
		urlValue.eachFunction('.pic a, .tourAlbum .clearfix a')
	}
	const reg = /dp\.pconline\.com\.cn\/[0-9]+/i;
	if (reg.test(old_url)) {
		urlValue.eachFunction('.picbox a')
	}
	if (old_url.indexOf("dp.pconline.com.cn/blog/") !== -1) {
		urlValue.eachFunction('.pic-item a')
	}
	if (old_url.indexOf("dp.pconline.com.cn/personal") !== -1) {
		urlValue.onFunction('#JaddBox', 'a.fc-black, .item-m-bd > a, a.btn-allWorks')
	}
	if (old_url.indexOf("dp.pconline.com.cn/public/tools/search.jsp") !== -1) {
		urlValue.eachFunction('a.pic-url, .title a')
	}
	if (old_url.indexOf("dp.pconline.com.cn/photo/") !== -1) {
		urlValue.eachFunction('.lWork')
	}
	if (old_url.indexOf("dp.pconline.com.cn/public/photo/") !== -1) {
		urlValue.onFunction('.artPLlist', '.nickName ~ a')
	}
})();