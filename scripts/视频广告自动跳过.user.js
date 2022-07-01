// ==UserScript==
// @name         视频广告自动跳过
// @namespace    https://greasyfork.org/zh-CN/users/430543-wulududu
// @version      1.0.0.1
// @description:zh-CN  目前已支持爱奇艺、优酷、腾讯视频
// @description:en  auto skip video ads!
// @author       wulududu
// @match        *://*.iqiyi.com/*
// @match        *://*.youku.com/*
// @match        *://v.qq.com/*
// @grant        none
// @description auto skip video ads!
// ==/UserScript==

(function() {
    'use strict'
    let method1 = function () {
        window._setTimeout = window.setTimeout
        window.setTimeout = function (handler, timeout, ...arg) {
            window._setTimeout(handler, timeout / 30, ...arg)
        }
    }
    let method2 = function () {
        window._setInterval = window.setInterval
        window.setInterval = function (handler, timeout, ...arg) {
            window._setInterval(handler, timeout / 30, ...arg)
        }
    }
    let method3 = function () {
        window.rate = 0
        window.Date.now = ()=>{return new window.Date().getTime() + (window.rate += 10000)}
        setInterval(()=>{window.rate = 0}, 600000)
    }
    let youku = function () {
        window.onload = function () {
            if (!document.querySelectorAll('video')[1]) {
                setInterval(()=>{document.querySelectorAll('video')[1].playbackRate = 16},100)
            } else {
                method1()
            }
        }
    }
    let qq = function () {
        setInterval(()=>{
            if (document.querySelectorAll('video')[0].status == 'IDLE') {
                setInterval(()=>{
                    document.querySelectorAll('video')[2].playbackRate = 16
                    document.querySelectorAll('video')[3].playbackRate = 16
                },100)
            }
        },100)
    }
    let host = location.host
    switch (host) {
        case 'v.youku.com':
            youku()
            break
        case 'v.qq.com' :
            qq()
            break
        case 'www.iqiyi.com' :
            method3()
            break
        default :
            break
    }
})();