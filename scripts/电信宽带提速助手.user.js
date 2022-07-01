// ==UserScript==
// @name              电信宽带提速助手
// @namespace         https://github.com/syhyz1990/speedup
// @version           1.0.4
// @icon              https://www.baiduyun.wiki/speedup.png
// @description       【电信宽带提速助手】是一款基于电信宽带的免费提速脚本，可将低于200M的家庭宽带提速至200M。
// @author            syhyz1990
// @license           MIT
// @supportURL        https://github.com/syhyz1990/speedup
// @match             *://*.baiduyun.wiki/*
// @match             *://*.baidusu.com/*
// @require           https://cdn.jsdelivr.net/npm/jquery@3.2.1/dist/jquery.min.js
// @require           https://cdn.jsdelivr.net/npm/sweetalert2@9
// @connect           ebit.cn
// @run-at            document-idle
// @grant             GM_xmlhttpRequest
// @grant             unsafeWindow
// @grant             GM_setValue
// @grant             GM_getValue
// @grant             GM_openInTab
// @grant             GM_registerMenuCommand
// ==/UserScript==
'use strict'

;(function () {
  localStorage.setItem('speedupPlugin_loaded', 'true')

  const version = '1.0.4'
  const id = 2017030000 + (Date.parse(new Date()) / 1000).toString()
  const copyright = 'Powerd By <a style="margin-left: 5px;" href="https://www.baiduyun.wiki/install-speedup.html" target="_blank">电信宽带提速助手</a>'
  const s0 = `https://ispeed.ebit.cn/xyfree2/index.jsp?userid=${id}&shopid=20002&cmpid=jt-kuandaitisu`
  const s1 = `V1ZWb1UwMUhUa2xVVkZwTlpWUnNkMWw2VGtOaVJuQllWVmhXWVZZd2NIZGFSVTB4WVcxS2NFOVVVbXhXTVhCdlYxUktWbVJ0VmtsaVNIQnFVakZhYzFkclZrZGhiVkpJWWtSS2FGZEdTVEZWTUdScVpHMUdXVlJzVm1wbFZGWjRXVlZvVTJSSFNrSlFWREE5`
  const s2 = `V1ZWb1UwMUhUa2xVVkZwTlpWUnNkMWw2VGtOaVJuQllWVmhXWVZZd2NIZGFSVTB4WVcxS2NFOVVVbXhXTVhCdlYxUktWbVJ0VmtsaVNIQnFVakZhYzFkclZrZGhiVkpJWWtSS2FGZEdTVEZWTUdScVpHMUdXVlJzVW1wU01WcHpWMnRvVjJRd2VIUmpSemxyVW5wR2VnPT0=`
  const s3 = `V1ZWb1UwMUhUa2xVVkZwTlpWUnNkMWw2VGtOaVJuQllWVmhXWVZZd2NIZGFSVTB4WVcxS2NFOVVVbXhXTVhBMVYyeGtWbVZWZDNwVmJuQk5ZbGhDTmxrd1JUbFFVVDA5`
  const s4 = `V1ZWb1UwMUhUa2xVVkZwTlpWUnNkMWw2VGtOaVJuQllWVmhXWVZZd2NIZGFSVTB4WVcxS2NFOVVVbXhXTVhCdlYxUktWbVJ0VmtsaVNIQnFVakZhYzFkclZrZGhiVkpJWWtSS2FGZEdTVEZWTUdScVpHMU5lbEZ0ZUdGV01VbDRXVEJOTVdOWFJrbFZibEpwVVZRd09RPT0=`

  let clog = (c1, c2, c3) => {
    c1 = c1 ? c1 : ''
    c2 = c2 ? c2 : ''
    c3 = c3 ? c3 : ''
    console.group('[电信宽带提速助手]')
    console.log(c1, c2, c3)
    console.groupEnd()
  }

  let main = {
    getIndex() {
      GM_xmlhttpRequest({
        method: "GET",
        url: s0,
        onload: (res) => {
          main.getDialInfo()
        }
      })
    },

    getIndex2() {
      GM_xmlhttpRequest({
        method: "GET",
        url: main.parseData(s3),
        onload: (res) => {
          main.handleSpeedUp2()
        }
      })
    },

    getDialInfo() {
      GM_xmlhttpRequest({
        method: "GET",
        responseType: 'json',
        url: main.parseData(s1),
        onload: (res) => {
          let info = res.response
          clog('宽带信息', info)
          if (info.state === 0) {
            GM_setValue('dialAcct', info.dialAcct)
            Swal.fire({
              icon: 'success',
              title: '提示',
              html: `<div style="margin-bottom: 15px;">${info.message}</div>提速宽带：${info.dialAcct} | 当前带宽：${info.basicRateDown}M`,
              footer: copyright,
              confirmButtonText: '立即提速'
            }).then((result) => {
              if (result.value) {
                main.handleSpeedUp()
              }
            })
          } else {
            Swal.fire({
              icon: 'error',
              title: '提示',
              html: JSON.stringify(info),
            })
          }
        }
      })
    },

    handleSpeedUp() {
      GM_xmlhttpRequest({
        method: "GET",
        responseType: 'json',
        url: main.parseData(s2),
        onload: (res) => {
          let info = res.response
          clog('提速结果', info)
          if (info.state === 1) {
            localStorage.setItem('speedupPlugin_history', main.getDate())
            Swal.fire({
              icon: 'success',
              title: '恭喜您',
              html: `${info.message}`,
              footer: copyright,
              confirmButtonText: '我要测速'
            }).then((result) => {
              if (result.value) {
                GM_openInTab('http://www.speedtest.cn/?from=www.baiduyun.wiki', {active: true})
                setTimeout(() => {
                  history.go(0)
                }, 1000)
              }
            })
          } else {
            main.getIndex2()
          }
        }
      })
    },
    handleSpeedUp2() {
      GM_xmlhttpRequest({
        method: "GET",
        responseType: 'json',
        url: main.parseData(s4),
        onload: (res) => {
          let info = res.response
          clog('提速结果', info)
          if (info.state === 1) {
            localStorage.setItem('speedupPlugin_history', main.getDate())
            Swal.fire({
              icon: 'success',
              title: '恭喜您',
              html: `${info.message}`,
              footer: copyright,
              confirmButtonText: '我要测速'
            }).then((result) => {
              if (result.value) {
                GM_openInTab('http://www.speedtest.cn/?from=www.baiduyun.wiki', {active: true})
                setTimeout(() => {
                  history.go(0)
                }, 1000)
              }
            })
          } else {
            Swal.fire({
              icon: 'error',
              title: '提示',
              html: JSON.stringify(info),
              confirmButtonText: '再试一次'
            }).then((result) => {
              if (result.value) {
                Swal.fire({
                  title: '请先清除浏览器Cookie',
                  html: `<div>请同时按住 Ctrl+Shift+Delete 键, <br>在弹出的界面中清除 Cookie 后再试!</div><img src="https://i.loli.net/2020/03/05/fK9NpUJanS3BbzE.png" style="max-width: 100%;">`,
                  confirmButtonText: '清除后点我重试'
                }).then((result) => {
                  if (result.value) {
                    setTimeout(() => {
                      history.go(0)
                    }, 1000)
                  }
                })
              }
            })
          }
        }
      })
    },
    getDate() {
      let date = new Date()
      let y = date.getFullYear()
      let m = date.getMonth() + 1
      m = m < 10 ? ('0' + m) : m
      let d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      let h = date.getHours()
      h = h < 10 ? ('0' + h) : h
      let minute = date.getMinutes()
      let second = date.getSeconds()
      minute = minute < 10 ? ('0' + minute) : minute
      second = second < 10 ? ('0' + second) : second
      return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
    },

    parseData(str) {
      return atob(atob(atob(atob(str))))
    },

    createMenu() {
      GM_registerMenuCommand('跳转到提速页面', function () {
        GM_openInTab('https://www.baiduyun.wiki/install-speedup.html', {active: true})
      })
    }
  }

  $(function () {
    main.createMenu()
    $('body').on('click', '#SpeedUpButton', function () {
      main.getIndex()
    })
  })
})()