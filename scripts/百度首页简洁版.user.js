// ==UserScript==
// @name         百度首页简洁版
// @version      0.1.3
// @author       hzq
// @namespace    https://greasyfork.org/zh-CN/users/457634
// @match        https://www.baidu.com/
// @match        https://www.baidu.com/?bs_nt=1
// @match        https://www.baidu.com/?tn=baiduhome_pg
// @description  去除所有，只保留logo与搜索框
// ==/UserScript==
document.getElementsByTagName('html')[0].style.overflow="auto";
document.getElementById('head_wrapper').style.position="relative";

(function() {
    'use strict';
    var bottom_layer = document.getElementById("bottom_layer");
    bottom_layer.parentNode.removeChild(bottom_layer);
    var s_top_wrap = document.getElementById("s_top_wrap");
    s_top_wrap.parentNode.removeChild(s_top_wrap);
    var s_upfunc_menus = document.getElementById("s_upfunc_menus");
    s_upfunc_menus.parentNode.removeChild(s_upfunc_menus);
    var u_sp = document.getElementById("u_sp");
    u_sp.parentNode.removeChild(u_sp);
})();