// ==UserScript==
// @name         懒人专用，全网VIP视频免费破解去广告、全网音乐直接下载、百度网盘直接下载、知乎视频下载等多合一版。长期更新，放心使用。
// @namespace 	 lanhaha
// @version      2.3.4
// @description  自用组合型多功能脚本，集合了优酷、爱奇艺、腾讯、芒果等全网VIP视频免费破解去广告，网易云音乐、QQ音乐、酷狗、酷我、虾米、蜻蜓FM、荔枝FM、喜马拉雅等网站音乐免客户端下载，百度网盘直接下载，知乎视频下载，优惠券查询等几个自己常用的功能。
// @author       lanhaha，syhyz1990，Chao，zuihuimai
// @include      *://pan.baidu.com/disk/home*
// @include      *://yun.baidu.com/disk/home*
// @include      *://pan.baidu.com/s*
// @include      *://yun.baidu.com/s*
// @include      *://*.zhihu.com/*
// @include      *://v.vzuu.com/video/*
// @include      *v.youku.com/v_*
// @include      *m.youku.com/v*
// @include      *m.youku.com/a*
// @include      *v.qq.com/x/*
// @include      *v.qq.com/p*
// @include      *v.qq.com/cover*
// @include      *v.qq.com/tv/*
// @include      *film.sohu.com/album/*
// @include      *tv.sohu.com/*
// @include      *.iqiyi.com/v_*
// @include      *.iqiyi.com/w_*
// @include      *.iqiyi.com/a_*
// @include      *.le.com/ptv/vplay/*
// @include      *.tudou.com/listplay/*
// @include      *.tudou.com/albumplay/*
// @include      *.tudou.com/programs/view/*
// @include      *.tudou.com/v*
// @include      *.mgtv.com/b/*
// @include      *.acfun.cn/v/*
// @include      *.bilibili.com/video/*
// @include      *.bilibili.com/anime/*
// @include      *.bilibili.com/bangumi/play/*
// @include      *.pptv.com/show/*
// @include      *://*.baofeng.com/play/*
// @include      *://*.wasu.cn/Play/show*
// @include      *://v.yinyuetai.com/video/*
// @include      *://v.yinyuetai.com/playlist/*
// @include      *://item.taobao.com/*
// @include      *://*detail.tmall.com/*
// @include      *://*detail.tmall.hk/*
// @include      *://*.liangxinyao.com/*
// @include      *://music.163.com/song*
// @include      *://music.163.com/m/song*
// @include      *://y.qq.com/n/*
// @include      *://*.kugou.com/song*
// @include      *://*.kuwo.cn/yinyue*
// @include      *://*.kuwo.cn/play_detail*
// @include      *://*.xiami.com/*
// @include      *://music.taihe.com/song*
// @include      *://*.1ting.com/player*
// @include      *://music.migu.cn/v*
// @include      *://*.lizhi.fm/*
// @include      *://*.qingting.fm/*
// @include      *://*.ximalaya.com/*
// @exclude      *://*.eggvod.cn/*
// @connect      d.pcs.baidu.com
// @require      https://cdn.jsdelivr.net/npm/jquery@3.2.1/dist/jquery.min.js
// @require      https://cdn.jsdelivr.net/npm/sweetalert2@9
// @require      https://code.jquery.com/jquery-latest.js
// @license      GPL License
// @grant        GM_download
// @grant        GM_openInTab
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @grant        unsafeWindow
// @grant        GM_setClipboard
// @grant        GM_getResourceURL
// @grant        GM_getResourceText
// ==/UserScript==

//百度网盘
(function() {
var pan_title=new Array()
		pan_title[0]= "https://pan.baidu.com/"
		pan_title[1]= "https://yun.baidu.com/"
        let pan_link = location.href;
		for(var a=0;a<pan_title.length;a++){
			if(pan_link.indexOf(pan_title[a])!= -1){
                pan_link = pan_link.replace('baidu.com','baiduwp.com');
				var pan_html = "<a href="+pan_link+" target='_blank' style='cursor:pointer;z-index:98;display:block;width:30px;height:30px;line-height:30px;position:fixed;left:0;top:300px;text-align:center;'><img src='https://cdn.80note.com/vip.gif' height='55' ></a>";
				$("body").append(pan_html);

'use strict'
//百度网盘脚本开始
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
    return typeof e;
} : function (e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};
!function () {
    function e(e, t, i) {
        e = e || "", t = t || "", i = i || "", console.group("[百度网盘直链下载助手]"), console.log(e, t, i), console.groupEnd();
    }

    function t() {
        var e = localStorage.getItem("baiduyunPlugin_BDUSS") ? localStorage.getItem("baiduyunPlugin_BDUSS") : '{"baiduyunPlugin_BDUSS":""}',
            t = JSON.parse(e).BDUSS;
        return t || Swal.fire({
            icon: "error",
            title: "提示",
            html: 'Aria链接获取需要配合<a href="https://www.baiduyun.wiki/zh-cn/assistant.html" target="_blank">【网盘万能助手】使用</a>',
            footer: "【网盘万能助手】是下载助手的增强扩展插件",
            confirmButtonText: "安装"
        }).then(function (e) {
            e.value && GM_openInTab("https://www.baiduyun.wiki/zh-cn/assistant.html", {active: !0});
        }), t;
    }

    function i(e, i, n) {
        var a = t();
        return n = n || m, a ? 'aria2c "' + e + '" --out "' + i + '" --header "User-Agent: ' + n + '" --header "Cookie: BDUSS=' + a + '"' : "请先安装网盘万能助手，安装后请重启浏览器！！！";
    }

    function n(e) {
        return e ? e.replace(/&/g, "&amp;") : "";
    }

    function a(e) {
        var t = void 0, i = void 0, n = void 0, a = void 0, o = void 0, r = void 0,
            l = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        for (n = e.length, i = 0, t = ""; n > i;) {
            if (a = 255 & e.charCodeAt(i++), i == n) {
                t += l.charAt(a >> 2), t += l.charAt((3 & a) << 4), t += "==";
                break;
            }
            if (o = e.charCodeAt(i++), i == n) {
                t += l.charAt(a >> 2), t += l.charAt((3 & a) << 4 | (240 & o) >> 4), t += l.charAt((15 & o) << 2), t += "=";
                break;
            }
            r = e.charCodeAt(i++), t += l.charAt(a >> 2), t += l.charAt((3 & a) << 4 | (240 & o) >> 4), t += l.charAt((15 & o) << 2 | (192 & r) >> 6), t += l.charAt(63 & r);
        }
        return t;
    }

    function o() {
        var e = /[\/].+[\/]/g;
        return location.pathname.match(e)[0].replace(/\//g, "");
    }

    function r(e) {
        var t = void 0, i = void 0, n = document, a = decodeURI;
        return n.cookie.length > 0 && -1 != (t = n.cookie.indexOf(e + "=")) ? (t = t + e.length + 1, i = n.cookie.indexOf(";", t), -1 == i && (i = n.cookie.length), a(n.cookie.substring(t, i))) : "";
    }

    function l() {
        function e(e) {
            if (e.length < 2) {
                var t = e.charCodeAt(0);
                return 128 > t ? e : 2048 > t ? d(192 | t >>> 6) + d(128 | 63 & t) : d(224 | t >>> 12 & 15) + d(128 | t >>> 6 & 63) + d(128 | 63 & t);
            }
            var i = 65536 + 1024 * (e.charCodeAt(0) - 55296) + (e.charCodeAt(1) - 56320);
            return d(240 | i >>> 18 & 7) + d(128 | i >>> 12 & 63) + d(128 | i >>> 6 & 63) + d(128 | 63 & i);
        }

        function t(t) {
            return (t + "" + Math.random()).replace(l, e);
        }

        function i(e) {
            var t = [0, 2, 1][e.length % 3],
                i = e.charCodeAt(0) << 16 | (e.length > 1 ? e.charCodeAt(1) : 0) << 8 | (e.length > 2 ? e.charCodeAt(2) : 0);
            return [o.charAt(i >>> 18), o.charAt(i >>> 12 & 63), t >= 2 ? "=" : o.charAt(i >>> 6 & 63), t >= 1 ? "=" : o.charAt(63 & i)].join("");
        }

        function n(e) {
            return e.replace(/[\s\S]{1,3}/g, i);
        }

        function a() {
            return n(t((new Date).getTime()));
        }

        var o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/~！@#￥%……&",
            l = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g, d = String.fromCharCode;
        return function (e, t) {
            return t ? a(String(e)).replace(/[+\/]/g, function (e) {
                return "+" == e ? "-" : "_";
            }).replace(/=/g, "") : a(String(e));
        }(r("BAIDUID"));
    }

    function d() {
        function e() {
            $("div.dialog-body", o).children().remove(), $("div.dialog-header h3 span.dialog-title", o).text(""), $("div.dialog-tip p", o).text(""), $("div.dialog-button", o).hide(), $("div.dialog-radio input[type=radio][name=showmode][value=multi]", o).prop("checked", !0), $("div.dialog-radio", o).hide(), $("div.dialog-button button#dialog-copy-button", o).hide(), $("div.dialog-button button#dialog-edit-button", o).hide(), $("div.dialog-button button#dialog-exit-button", o).hide(), o.hide(), r.hide();
        }

        var t = [], a = void 0, o = void 0, r = void 0;
        this.open = function (e) {
            if (a = e, t = [], "link" == e.type && (t = e.list.urls, $("div.dialog-header h3 span.dialog-title", o).text(e.title + "：" + e.list.filename), $.each(e.list.urls, function (e, t) {
                t.url = n(t.url);
                var i = $('<div><div style="width:30px;float:left">' + t.rank + ':</div><div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis"><a href="' + t.url + '">' + t.url + "</a></div></div>");
                $("div.dialog-body", o).append(i);
            })), "batch" != e.type && "batchAria" != e.type && "batchAriaRPC" != e.type || (t = e.list, $("div.dialog-header h3 span.dialog-title", o).text(e.title), $.each(e.list, function (t, n) {
                var a = void 0;
                if ("batchAria" == e.type) {
                    var r = i(n.downloadlink, n.filename, b);
                    a = $('<div style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap"><div style="width:150px;float:left;overflow:hidden;text-overflow:ellipsis" title="' + n.filename + '">' + n.filename + '</div><span>：</span><a href="javascript:;" class="aria2c-link">' + r + "</a></div>");
                }
                "batch" == e.type && (a = $('<div style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap"><div style="width:150px;float:left;overflow:hidden;text-overflow:ellipsis" title="' + n.filename + '">' + n.filename + '</div><span>：</span><a href="' + n.downloadlink + '">' + n.downloadlink + "</a></div>")), "batchAriaRPC" == e.type && (a = $('<div style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap"><div style="width:150px;float:left;overflow:hidden;text-overflow:ellipsis" title="' + n.filename + '">' + n.filename + '</div><span>：</span><button class="aria-rpc" data-link="' + n.downloadlink + '" data-filename="' + n.filename + '">点击发送到Aria</button></div>')), $("div.dialog-body", o).append(a);
            })), "shareLink" == e.type && (t = e.list, $("div.dialog-header h3 span.dialog-title", o).text(e.title), $.each(e.list, function (e, t) {
                if (t.dlink = n(t.dlink), 1 != t.isdir) {
                    var i = $('<div style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap"><div style="width:150px;float:left;overflow:hidden;text-overflow:ellipsis" title="' + t.server_filename + '">' + t.server_filename + '</div><span>：</span><a href="' + t.dlink + '" class="share-download">' + t.dlink + "</a></div>");
                    $("div.dialog-body", o).append(i);
                }
            })), "rpcLink" == e.type && (t = e.list, $("div.dialog-header h3 span.dialog-title", o).text(e.title), $.each(e.list, function (e, t) {
                if (t.dlink = n(t.dlink), 1 != t.isdir) {
                    var i = $('<div style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap"><div style="width:150px;float:left;overflow:hidden;text-overflow:ellipsis" title="' + t.server_filename + '">' + t.server_filename + '</div><span>：</span><button class="aria-rpc" data-link="' + t.dlink + '" data-filename="' + t.server_filename + '">点击发送到Aria</button></div>');
                    $("div.dialog-body", o).append(i);
                }
            })), "shareAriaLink" == e.type && (t = e.list, $("div.dialog-header h3 span.dialog-title", o).text(e.title), $.each(e.list, function (e, t) {
                if (1 != t.isdir) {
                    var n = i(t.dlink, t.server_filename),
                        a = $('<div style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap"><div style="width:150px;float:left;overflow:hidden;text-overflow:ellipsis" title="' + t.server_filename + '">' + t.server_filename + '</div><span>：</span><a href="javasctipt:void(0)" class="aria2c-link">' + n + "</a></div>");
                    $("div.dialog-body", o).append(a);
                }
            })), e.tip && $("div.dialog-tip p", o).html(e.tip), e.showcopy && ($("div.dialog-button", o).show(), $("div.dialog-button button#dialog-copy-button", o).show()), e.showedit) {
                $("div.dialog-button", o).show(), $("div.dialog-button button#dialog-edit-button", o).show();
                var l = $('<textarea name="dialog-textarea" style="display:none;resize:none;width:758px;height:300px;white-space:pre;word-wrap:normal;overflow-x:scroll"></textarea>'),
                    d = "";
                "batch" == a.type ? $.each(t, function (e, i) {
                    "error" != i.downloadlink && (e == t.length - 1 ? d += i.downloadlink : d += i.downloadlink + "\r\n");
                }) : "link" == a.type && $.each(t, function (e, i) {
                    "error" != i.url && (e == t.length - 1 ? d += i.url : d += i.url + "\r\n");
                }), l.val(d), $("div.dialog-body", o).append(l);
            }
            r.show(), o.show();
        }, this.close = function () {
            e();
        }, o = function () {
            var n = document.body.clientWidth, r = n > 800 ? (n - 800) / 2 : 0,
                l = $('<div class="dialog" style="width: 800px; top: 0px; bottom: auto; left: ' + r + 'px; right: auto; display: hidden; visibility: visible; z-index: 52;"></div>'),
                d = $('<div class="dialog-header"><h3><span class="dialog-title" style="display:inline-block;width:740px;white-space:nowrap;overflow-x:hidden;text-overflow:ellipsis"></span></h3></div>'),
                s = $('<div class="dialog-control"><span class="dialog-icon dialog-close">×</span></div>'),
                c = $('<div class="dialog-body" style="max-height:450px;overflow-y:auto;padding:0 20px;"></div>'),
                p = $('<div class="dialog-tip" style="padding-left:20px;background-color:#fff;border-top: 1px solid #c4dbfe;color: #dc373c;"><p></p></div>');
            l.append(d.append(s)).append(c);
            var u = $('<div class="dialog-button" style="display:none"></div>'),
                h = $('<div style="display:table;margin:auto"></div>'),
                f = $('<button id="dialog-copy-button" style="display:none;width: 100px; margin: 5px 0 10px 0; cursor: pointer; background: #cc3235; border: none; height: 30px; color: #fff; border-radius: 3px;">复制全部链接</button>'),
                v = $('<button id="dialog-edit-button" style="display:none">编辑</button>'),
                g = $('<button id="dialog-exit-button" style="display:none">退出</button>');
            return h.append(f).append(v).append(g), u.append(h), l.append(u), f.click(function () {
                var e = "";
                "batch" == a.type && $.each(t, function (i, n) {
                    "error" != n.downloadlink && (i == t.length - 1 ? e += n.downloadlink : e += n.downloadlink + "\r\n");
                }), "batchAria" == a.type && $.each(t, function (n, a) {
                    "error" != a.downloadlink && (n == t.length - 1 ? e += i(a.downloadlink, a.filename, b) : e += i(a.downloadlink, a.filename, b) + "\r\n");
                }), "rpc" == a.type && $.each(t, function (i, n) {
                    "error" != n.downloadlink && (i == t.length - 1 ? e += n.downloadlink : e += n.downloadlink + "\r\n");
                }), "shareLink" == a.type && $.each(t, function (i, n) {
                    "error" != n.dlink && (i == t.length - 1 ? e += n.dlink : e += n.dlink + "\r\n");
                }), "shareAriaLink" == a.type && $.each(t, function (n, a) {
                    "error" != a.dlink && (n == t.length - 1 ? e += i(a.dlink, a.server_filename) : e += i(a.dlink, a.server_filename) + "\r\n");
                }), GM_setClipboard(e, "text"), "" != e ? x.fire({
                    icon: "success",
                    text: "已将链接复制到剪贴板！"
                }) : x.fire({icon: "error", text: "复制失败，请手动复制！"});
            }), v.click(function () {
                var e = $("div.dialog-body textarea[name=dialog-textarea]", o);
                $("div.dialog-body div", o).hide(), f.hide(), v.hide(), e.show(), $dialog_radio_div.show(), g.show();
            }), g.click(function () {
                var e = $("div.dialog-body textarea[name=dialog-textarea]", o), t = $("div.dialog-body div", o);
                e.hide(), $dialog_radio_div.hide(), t.show(), g.hide(), f.show(), v.show();
            }), l.append(p), $("body").append(l), s.click(e), l;
        }(), r = function () {
            var e = $('<div class="dialog-shadow" style="position: fixed; left: 0px; top: 0px; z-index: 50; background: rgb(0, 0, 0) none repeat scroll 0% 0%; opacity: 0.5; width: 100%; height: 100%; display: none;"></div>');
            return $("body").append(e), e;
        }();
    }

    function s(e, t) {
        function i() {
            $("#dialog-img", n).attr("src", ""), $("#dialog-err").text(""), n.hide(), a.hide();
        }

        var n = void 0, a = void 0;
        this.open = function (e) {
            e && $("#dialog-img").attr("src", e.img), n.show(), a.show();
        }, this.close = function () {
            i();
        }, n = function () {
            var n = document.body.clientWidth, a = n > 520 ? (n - 520) / 2 : 0,
                o = $('<div class="dialog" id="dialog-vcode" style="width:520px;top:0px;bottom:auto;left:' + a + 'px;right:auto;display:none;visibility:visible;z-index:52"></div>'),
                r = $('<div class="dialog-header"><h3><span class="dialog-header-title"><em class="select-text">提示</em></span></h3></div>'),
                l = $('<div class="dialog-control"><span class="dialog-icon dialog-close icon icon-close"><span class="sicon">x</span></span></div>'),
                d = $('<div class="dialog-body"></div>'), s = $('<div style="text-align:center;padding:22px"></div>'),
                c = $('<div class="download-verify" style="margin-top:10px;padding:0 28px;text-align:left;font-size:12px;"></div>'),
                p = $('<div class="verify-body">请输入验证码：</div>'),
                u = $('<input id="dialog-input" type="text" style="padding:3px;width:85px;height:23px;border:1px solid #c6c6c6;background-color:white;vertical-align:middle;" class="input-code" maxlength="4">'),
                h = $('<img id="dialog-img" class="img-code" style="margin-left:10px;vertical-align:middle;" alt="点击换一张" src="" width="100" height="30">'),
                f = $('<a href="javascript:;" style="text-decoration:underline;" class="underline">换一张</a>'),
                v = $('<div id="dialog-err" style="padding-left:84px;height:18px;color:#d80000" class="verify-error"></div>'),
                g = $('<div class="dialog-footer g-clearfix"></div>'),
                w = $('<a class="g-button g-button-blue" data-button-id="" data-button-index href="javascript:;" style="padding-left:36px"><span class="g-button-right" style="padding-right:36px;"><span class="text" style="width:auto;">确定</span></span></a>'),
                m = $('<a class="g-button" data-button-id="" data-button-index href="javascript:;" style="padding-left: 36px;"><span class="g-button-right" style="padding-right: 36px;"><span class="text" style="width: auto;">取消</span></span></a>');
            return r.append(l), p.append(u).append(h).append(f), c.append(p).append(v), s.append(c), d.append(s), g.append(w).append(m), o.append(r).append(d).append(g), $("body").append(o), l.click(i), h.click(e), f.click(e), u.keypress(function (e) {
                13 == e.which && t();
            }), w.click(t), m.click(i), u.click(function () {
                $("#dialog-err").text("");
            }), o;
        }(), a = $("div.dialog-shadow");
    }

    function c() {
        function t() {
            return require("disk-system:widget/pageModule/list/listInit.js").getCheckedItems();
        }

        function i() {
            N = C(), U = O.timestamp, B = O.MYBDSTOKEN, z = l();
        }

        function n() {
            o(), r();
        }

        function o() {
            $(document).on("click", ".exe-download", function (e) {
                e.target.innerText && E(e.target.innerText);
            }), $(document).on("click", ".aria-rpc", function (e) {
                var t = (e.target.dataset.link, e.target.dataset.filename), i = {};
                _() || (i = {"User-Agent": m}), GM_xmlhttpRequest({
                    method: "HEAD",
                    headers: i,
                    url: e.target.dataset.link,
                    onload: function (e) {
                        var i = e.finalUrl;
                        if (i) {
                            var n = k.domain + ":" + k.port + "/jsonrpc", a = {
                                id: (new Date).getTime(),
                                jsonrpc: "2.0",
                                method: "aria2.addUri",
                                params: ["token:" + k.token, [i], {
                                    dir: k.dir,
                                    out: t,
                                    header: _() ? ["User-Agent:" + b] : ["User-Agent:" + m]
                                }]
                            };
                            GM_xmlhttpRequest({
                                method: "POST",
                                headers: {"User-Agent": m},
                                url: n,
                                responseType: "json",
                                timeout: 3e3,
                                data: JSON.stringify(a),
                                onload: function (e) {
                                    e.response.result ? x.fire({
                                        icon: "success",
                                        title: "任务已发送至RPC下载器"
                                    }) : x.fire({icon: "error", title: e.response.message});
                                },
                                ontimeout: function () {
                                    x.fire({icon: "error", title: "无法连接到RPC服务，请检查RPC配置"});
                                }
                            });
                        }
                    }
                });
            });
        }

        function r() {
            $(document).on("click", '[title="分享"]', function () {
                var e = setInterval(function () {
                    0 === $("#share-method-public").length ? $(".share-method-line").parent().append('<div class="share-method-line"><input type="radio" id="share-method-public" name="share-method" value="public" checked><span class="icon radio-icon icon-radio-non"></span><label for="share-method-public"><b>公开分享</b><span>任何人访问链接即可查看，下载！</span></div>') : (clearInterval(e), $(document).off("click", '[title="分享"]'));
                }, 100);
            });
        }

        function s() {
            $("div." + f["bar-search"]).css("width", "18%");
            var e = $('<span class="g-dropdown-button"></span>'),
                t = $('<a class="g-button g-button-blue" href="javascript:;"><span class="g-button-right"><em class="icon icon-picpre-download" title="百度网盘下载助手"></em><span class="text" style="width: 60px;">下载助手</span></span></a>'),
                i = $('<span class="menu" style="width:114px"></span>'),
                n = $('<span class="g-button-menu" style="display:block"></span>'),
                a = $('<span class="g-dropdown-button g-dropdown-button-second" menulevel="2"></span>'),
                o = $('<a class="g-button" href="javascript:;"><span class="g-button-right"><span class="text" style="width:auto">直链下载</span></span></a>'),
                r = $('<span class="menu" style="width:120px;left:79px"></span>'),
                l = $('<a id="batchhttplink-direct" class="g-button-menu" href="javascript:;">显示链接</a>');
            r.append(l), n.append(a.append(o).append(r)), n.hover(function () {
                a.toggleClass("button-open");
            }), l.click(A);
            var d = $('<span class="g-button-menu" style="display:block"></span>'),
                s = $('<span class="g-dropdown-button g-dropdown-button-second" menulevel="2"></span>'),
                v = $('<a class="g-button" href="javascript:;"><span class="g-button-right"><span class="text" style="width:auto">Aria下载</span></span></a>'),
                g = $('<span class="menu" style="width:120px;left:79px"></span>'),
                w = $('<a id="batchhttplink-aria" class="g-button-menu" href="javascript:;">显示链接</a>');
            g.append(w), d.append(s.append(v).append(g)), d.hover(function () {
                s.toggleClass("button-open");
            }), w.click(A);
            var m = $('<span class="g-button-menu" style="display:block"></span>'),
                b = $('<span class="g-dropdown-button g-dropdown-button-second" menulevel="2"></span>'),
                y = $('<a class="g-button" href="javascript:;"><span class="g-button-right"><span class="text" style="width:auto">导出到RPC</span></span></a>'),
                x = $('<span class="menu" style="width:120px;left:79px"></span>'),
                k = $('<a id="batchhttplink-rpc" class="g-button-menu" href="javascript:;">显示链接</a>'),
                _ = $('<a class="g-button-menu" href="javascript:;">RPC配置</a>');
            x.append(k).append(_), m.append(b.append(y).append(x)), m.hover(function () {
                b.toggleClass("button-open");
            }), k.click(A), _.click(c);
            var G = $('<span class="g-button-menu" style="display:block"></span>'),
                M = $('<span class="g-dropdown-button g-dropdown-button-second" menulevel="2"></span>'),
                C = $('<a class="g-button" href="javascript:;"><span class="g-button-right"><span class="text" style="width:auto">API下载</span></span></a>'),
                j = $('<span class="menu" style="width:120px;left:77px"></span>'),
                D = $('<a id="download-api" class="g-button-menu" href="javascript:;">直接下载</a>'),
                I = $('<a id="batchhttplink-api" class="g-button-menu" href="javascript:;">显示链接</a>'),
                V = $('<a id="appid-setting" class="g-button-menu" href="javascript:;">神秘代码</a>'),
                E = $('<a id="default-setting" class="g-button-menu" href="javascript:;" style="color: #999;">恢复默认</a>');
            j.append(D).append(I).append(V).append(E);
            var R = $('<span class="g-button-menu" style="display:block;cursor: pointer">分享选中文件</span>'),
                O = $('<a data-menu-id="b-menu209" style="color: #e85653;font-weight: 700;" class="g-button-menu" href="javascript:;">Ver ' + h + "</a>");
            G.append(M.append(C).append(j)), G.hover(function () {
                M.toggleClass("button-open");
            }), D.click(T), I.click(A), V.click(p), E.click(u), O.click(S), R.click(P), i.append(G).append(d).append(m).append(R), e.append(t).append(i), e.hover(function () {
                e.toggleClass("button-open");
            }), $("." + f["list-tools"]).append(e), $("." + f["list-tools"]).css("height", "40px");
        }

        function c() {
            var e = "";
            e += '<div style="display: flex;align-items: center;justify-content: space-between;"><label for="rpcDomain" style="margin-right: 5px;flex: 0 0 90px;">主机：</label><input type="text" id="rpcDomain" value="' + k.domain + '" class="swal2-input" placeholder="http://localhost"></div>', e += '<div style="display: flex;align-items: center;justify-content: space-between;"><label for="rpcPort" style="margin-right: 5px;flex: 0 0 90px;">端口：</label><input type="text" id="rpcPort" value="' + k.port + '" class="swal2-input" placeholder="6800"></div>', e += '<div style="display: flex;align-items: center;justify-content: space-between;"><label for="rpcToken" style="margin-right: 5px;flex: 0 0 90px;">密钥：</label><input type="text" id="rpcToken" value="' + k.token + '" class="swal2-input" placeholder="没有留空"></div>', e += '<div style="display: flex;align-items: center;justify-content: space-between;"><label for="rpcDir" style="margin-right: 5px;flex: 0 0 90px;">下载路径：</label><input type="text" id="rpcDir" value="' + k.dir + '" class="swal2-input" placeholder="默认为D:"></div>', e = "<div>" + e + "</div>";
            var t = $(e);
            Swal.fire({
                title: "RPC配置",
                allowOutsideClick: !1,
                html: t[0],
                showCancelButton: !0,
                confirmButtonText: "保存",
                cancelButtonText: "取消"
            }).then(function (e) {
                e.value && (GM_setValue("rpcDomain", $("#rpcDomain").val() ? $("#rpcDomain").val() : k.domain), GM_setValue("rpcPort", $("#rpcPort").val() ? $("#rpcPort").val() : k.port), GM_setValue("rpcToken", $("#rpcToken").val()), GM_setValue("rpcDir", $("#rpcDir").val() ? $("#rpcDir").val() : k.dir), history.go(0));
            });
        }

        function p() {
            Swal.fire({
                title: "请输入神秘代码",
                input: "text",
                inputValue: w,
                showCancelButton: !0,
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                inputValidator: function (e) {
                    if (6 != e.length) return "请输入正确的神秘代码";
                }
            }).then(function (e) {
                GM_setValue("secretCodeNew", e.value), x.fire({
                    icon: "success",
                    text: "神秘代码执行成功，3s后将自动刷新！"
                }).then(function () {
                    history.go(0);
                });
            });
        }

        function u() {
            GM_setValue("secretCodeNew", g), x.fire({text: "恢复默认成功，3s后将自动刷新", icon: "success"}).then(function () {
                history.go(0);
            });
        }

        function _() {
            return 1 === O.ISSVIP;
        }

        function S() {
            GM_openInTab("https://www.baiduyun.wiki", {active: !0});
        }

        function T(i) {
            H = t(), e("选中文件列表：", H);
            var n = i.target.id, a = void 0;
            if ("download-direct" == n) {
                var o = void 0;
                if (0 === H.length) return void x.fire({icon: "error", text: v.unselected});
                1 == H.length && (o = 1 === H[0].isdir ? "batch" : "dlink"), H.length > 1 && (o = "batch"), L = j(H);
                var r = I(o);
                if (0 !== r.errno) return -1 == r.errno ? void x.fire({
                    icon: "error",
                    text: v.deleted
                }) : 112 == r.errno ? void x.fire({icon: "error", text: v.timeout}) : void x.fire({
                    icon: "error",
                    text: v.fail
                });
                if ("dlink" == o) a = r.dlink[0].dlink; else {
                    if ("batch" != o) return void x.fire({icon: "error", text: v.fail});
                    a = r.dlink, 1 === H.length && (a = a + "&zipname=" + encodeURIComponent(H[0].server_filename) + ".zip");
                }
            } else {
                if (0 === H.length) return void x.fire({icon: "error", text: v.unselected});
                if (H.length > 1) return void x.fire({icon: "error", text: v.morethan});
                if (1 == H[0].isdir) return void x.fire({icon: "error", text: v.dir});
                "download-api" == n && (a = V(H[0].path));
            }
            E(a);
        }

        function A(i) {
            if (H = t(), e("选中文件列表：", H), 0 === H.length) return void x.fire({icon: "error", text: v.unselected});
            var n = i.target.id, a = void 0, o = void 0;
            if (a = -1 == n.indexOf("https") ? -1 == n.indexOf("http") ? location.protocol + ":" : "http:" : "https:", q = [], F = [], -1 != n.indexOf("direct")) {
                q = G(a);
                if (0 === q.length) return void x.fire({icon: "error", text: v.unselected});
                J.open({
                    title: "直链下载",
                    type: "batch",
                    list: q,
                    tip: '点击链接直接下载，请先升级 <a href="https://www.baiduyun.wiki/zh-cn/assistant.html">[网盘万能助手]</a> 至 <b>v2.2.0</b>，本链接仅支持小文件下载（<300M）',
                    showcopy: !1
                });
            }
            if (-1 != n.indexOf("aria")) {
                if (q = M(a), o = '请先安装 <a  href="https://www.baiduyun.wiki/zh-cn/assistant.html">网盘万能助手</a> 请将链接复制到支持Aria的下载器中, 推荐使用 <a href="http://pan.baiduyun.wiki/down">XDown</a>', 0 === q.length) return void x.fire({
                    icon: "error",
                    text: v.unselected
                });
                J.open({title: "Aria链接", type: "batchAria", list: q, tip: o, showcopy: !0});
            }
            if (-1 != n.indexOf("rpc")) {
                if (q = M(a), o = '点击按钮发送链接至Aria下载器中<a href="https://www.baiduyun.wiki/zh-cn/rpc.html">详细说明</a>，需配合最新版 <a href="https://www.baiduyun.wiki/zh-cn/assistant.html">[网盘万能助手]</a>，支持本地和远程下载，此功能建议配合百度会员使用', 0 === q.length) return void x.fire({
                    icon: "error",
                    text: v.unselected
                });
                J.open({title: "Aria RPC", type: "batchAriaRPC", list: q, tip: o, showcopy: !1});
            }
            if (-1 != n.indexOf("api")) {
                if (q = M(a), o = '请先安装 <a href="https://www.baiduyun.wiki/zh-cn/assistant.html">网盘万能助手</a> <b>v2.2.0</b> 后点击链接下载，若下载失败，请更换神秘代码 <a href="https://www.baiduyun.wiki/zh-cn/question.html" target="_blank">获取神秘代码</a>', 0 === q.length) return void x.fire({
                    icon: "error",
                    text: v.unselected
                });
                J.open({title: "API下载链接", type: "batch", list: q, tip: o});
            }
        }

        function G(e) {
            var t = [];
            return $.each(H, function (i, n) {
                var a = void 0, o = void 0, r = void 0;
                a = 0 == n.isdir ? "dlink" : "batch", L = j([n]), r = I(a), 0 == r.errno ? ("dlink" == a ? o = r.dlink[0].dlink : "batch" == a && (o = r.dlink), o = o.replace(/^([A-Za-z]+):/, e)) : o = "error", t.push({
                    filename: n.server_filename,
                    downloadlink: o
                });
            }), t;
        }

        function M(e) {
            var t = [];
            return $.each(H, function (i, n) {
                if (1 != n.isdir) {
                    var a = void 0;
                    a = V(n.path), a = a.replace(/^([A-Za-z]+):/, e), t.push({
                        filename: n.server_filename,
                        downloadlink: a
                    });
                }
            }), t;
        }

        function C() {
            var e = void 0;
            try {
                e = new Function("return " + O.sign2)();
            } catch (e) {
                throw new Error(e.message);
            }
            return a(e(O.sign5, O.sign1));
        }

        function j(e) {
            if (0 === e.length) return null;
            var t = [];
            return $.each(e, function (e, i) {
                t.push(i.fs_id);
            }), "[" + t + "]";
        }

        function P() {
            H = t();
            var e = [];
            if (0 === H.length) return void x.fire({icon: "error", text: v.unselected});
            $.each(H, function (t, i) {
                e.push(i.path);
            });
            var i = "https://pan.baidu.com/share/set?channel=chunlei&clienttype=0&web=1&channel=chunlei&web=1&app_id=250528&bdstoken=" + B + "&logid=" + z + "&clienttype=0",
                n = D(), a = {schannel: 4, channel_list: JSON.stringify([]), period: 0, pwd: n, fid_list: j(H)};
            $.ajax({
                url: i, async: !1, method: "POST", data: a, success: function (e) {
                    if (0 === e.errno) {
                        var t = e.link;
                        Swal.fire({
                            title: "分享链接",
                            allowOutsideClick: !1,
                            html: '<a href="' + t + '" target="_blank">' + t + "</a><br>提取码: " + n,
                            confirmButtonText: "复制链接",
                            footer: y
                        }).then(function (e) {
                            e.value && GM_setClipboard(t + "#" + n);
                        });
                    }
                }
            });
        }

        function D() {
            function e(e, t) {
                return Math.round(Math.random() * (e - t) + t);
            }

            for (var t = "", i = 0; i < 4; i++) {
                t = t + e(0, 9) + String.fromCharCode(e(97, 122)) + String.fromCharCode(e(65, 90));
            }
            for (var n = "", i = 0; i < 4; i++) n += t[e(0, t.length - 1)];
            return n;
        }

        function I(e) {
            var t = void 0;
            z = l();
            var i = {sign: N, timestamp: U, fidlist: L, type: e};
            return $.ajax({
                url: "https://pan.baidu.com/api/download?clienttype=1",
                async: !1,
                method: "POST",
                data: i,
                success: function (e) {
                    t = e;
                }
            }), t;
        }

        function V(e) {
            return W + "file?method=download&path=" + encodeURIComponent(e) + "&app_id=" + w;
        }

        function E(e) {
            $("#helperdownloadiframe").attr("src", e);
        }

        function R() {
            var e = $('<div class="helper-hide" style="padding:0;margin:0;display:block"></div>'),
                t = $('<iframe src="javascript:;" id="helperdownloadiframe" style="display:none"></iframe>');
            e.append(t), $("body").append(e);
        }

        var O = void 0, N = void 0, U = void 0, B = void 0, z = void 0, L = void 0, H = [], q = [], F = [], J = void 0,
            W = (location.protocol, location.host, location.protocol + "//pcs.baidu.com/rest/2.0/pcs/");
        location.protocol;
        this.init = function () {
            if (O = unsafeWindow.yunData, e("初始化信息:", O), void 0 === O) return e("页面未正常加载，或者百度已经更新！"), !1;
            i(), n(), s(), R(), J = new d({addCopy: !0}), e("下载助手加载成功！当前版本：", h);
        };
    }

    function p() {
        function t() {
            Z = o(), V = I.SIGN, E = I.TIMESTAMP, R = I.MYBDSTOKEN, O = "chunlei", N = 0, U = 1, B = w, z = l(), L = 0, H = "share", F = I.SHARE_ID, q = I.SHARE_UK, "secret" == Z && (W = p()), c() || (K = I.SHARE_ID);
        }

        function i() {
            return c() ? I.FILEINFO : require("disk-share:widget/pageModule/list/listInit.js").getCheckedItems();
        }

        function n() {
            var e = location.hash && /^#([a-zA-Z0-9]{4})$/.test(location.hash) && RegExp.$1,
                t = $('.pickpw input[tabindex="1"]'), i = $(".pickpw a.g-button"), n = $(".pickpw .input-area"),
                o = $('<div style="margin:-8px 0 10px ;color: #ff5858">正在获取提取码</div>'),
                r = (location.href.match(/\/init\?(?:surl|shareid)=((?:\w|-)+)/) || location.href.match(/\/s\/1((?:\w|-)+)/))[1];
            t && i && (n.prepend(o), e && (o.text("发现提取码，已自动为您填写"), setTimeout(function () {
                t.val(e), i.click();
            }, 500)), $.ajax({
                method: "GET", url: "https://api.baiduyun.wiki/reset/" + r, success: function (e) {
                    e.link ? GM_xmlhttpRequest({
                        method: "GET", url: e.link, onload: function (e) {
                            var n = JSON.parse(e.responseText);
                            n.access_code ? (o.text("发现提取码，已自动为您填写"), t.val(n.access_code), setTimeout(function () {
                                i.click(), a(n.referrer);
                            }, 300)) : o.text("未发现提取码，请手动填写");
                        }
                    }) : o.text("未发现提取码，请手动填写");
                }, error: function (e) {
                    o.text("连接服务器失败，请手动填写");
                }
            }));
        }

        function a(e) {
            if ("object" !== (void 0 === e ? "undefined" : _typeof(e))) return !1;
            var t = Object.values(e), i = {}, n = t.reduce(function (e, t) {
                return i[t.title] || (i[t.title] = e.push(t)), e;
            }, []), a = setInterval(function () {
                $(".slide-show-header").length > 0 && (clearInterval(a), $.each(n, function (e, t) {
                    if ("undefined" != t.title) {
                        var i = $('<a style="display: block;margin-top: 7px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;" href="' + t.url + '" target="_blank">【来源】：' + t.title + "</a>");
                        $(".slide-show-header").append(i);
                    }
                }));
            }, 500);
        }

        function o() {
            return 1 === I.SHARE_PUBLIC ? "public" : "secret";
        }

        function c() {
            return void 0 === I.getContext;
        }

        function p() {
            return '{"sekey":"' + decodeURIComponent(r("BDCLND")) + '"}';
        }

        function u() {
            c() ? ($("div.slide-show-right").css("width", "500px"), $("div.frame-main").css("width", "96%"), $("div.share-file-viewer").css("width", "740px").css("margin-left", "auto").css("margin-right", "auto")) : $("div.slide-show-right").css("width", "500px");
            var e = $('<span class="g-dropdown-button"></span>'),
                t = $('<a class="g-button g-button-blue" style="width: 114px;" data-button-id="b200" data-button-index="200" href="javascript:;"></a>'),
                i = $('<span class="g-button-right"><em class="icon icon-picpre-download" title="百度网盘下载助手"></em><span class="text" style="width: 60px;">下载助手</span></span>'),
                n = $('<span class="menu" style="width:auto;z-index:41"></span>'),
                a = $('<a data-menu-id="b-menu207" class="g-button-menu" href="javascript:;">直接下载</a>'),
                o = $('<a data-menu-id="b-menu208" class="g-button-menu" href="javascript:;" data-type="down">显示链接</a>'),
                r = $('<a data-menu-id="b-menu208" class="g-button-menu" href="javascript:;">显示Aria链接</a>'),
                l = $('<a data-menu-id="b-menu208" class="g-button-menu" href="javascript:;" data-type="rpc">导出到RPC</a>'),
                d = $('<a data-menu-id="b-menu209" style="color: #e85653;font-weight: 700;" class="g-button-menu" href="javascript:;">Ver ' + h + "</a>");
            n.append(a).append(o).append(r).append(l), t.append(i), e.append(t).append(n), e.hover(function () {
                e.toggleClass("button-open");
            }), a.click(S), l.click(C), o.click(C), r.click(g), d.click(f), $("div.module-share-top-bar div.bar div.x-button-box").append(e);
        }

        function f() {
            GM_openInTab("https://www.baiduyun.wiki", {active: !0});
        }

        function g() {
            return te = i(), null === R ? (x.fire({
                icon: "error",
                text: v.unlogin
            }), !1) : (e("选中文件列表：", te), 0 === te.length ? (x.fire({
                icon: "error",
                text: v.unselected
            }), !1) : 1 == te[0].isdir ? (x.fire({
                icon: "error",
                text: v.toobig
            }), !1) : (Y = "ariclink", void j(function (e) {
                if (void 0 !== e) if (-20 == e.errno) {
                    if (!(X = T()) || 0 !== X.errno) return x.fire({icon: "error", text: v.wrongcode}), !1;
                    ee.open(X);
                } else {
                    if (112 == e.errno) return x.fire({icon: "error", text: v.timeout}), !1;
                    if (0 === e.errno) {
                        Q.open({
                            title: "下载链接（仅显示文件链接）",
                            type: "shareAriaLink",
                            list: e.list,
                            tip: '请先安装 <a  href="https://www.baiduyun.wiki/zh-cn/assistant.html">网盘万能助手</a> 请将链接复制到支持Aria的下载器中, 推荐使用 <a  href="http://pan.baiduyun.wiki/down">XDown</a>',
                            showcopy: !0
                        });
                    } else x.fire({icon: "error", text: v.fail});
                }
            })));
        }

        function b() {
            var e = $('<div class="helper-hide" style="padding:0;margin:0;display:block"></div>'),
                t = $('<iframe src="javascript:;" id="helperdownloadiframe" style="display:none"></iframe>');
            e.append(t), $("body").append(e);
        }

        function y() {
            _();
        }

        function _() {
            $(document).on("click", ".aria-rpc", function (e) {
                var t = (e.target.dataset.link, e.target.dataset.filename);
                GM_xmlhttpRequest({
                    method: "HEAD",
                    headers: {"User-Agent": m},
                    url: e.target.dataset.link,
                    onload: function (e) {
                        var i = e.finalUrl;
                        if (i) {
                            var n = k.domain + ":" + k.port + "/jsonrpc", a = {
                                id: (new Date).getTime(),
                                jsonrpc: "2.0",
                                method: "aria2.addUri",
                                params: ["token:" + k.token, [i], {dir: k.dir, out: t, header: ["User-Agent:" + m]}]
                            };
                            GM_xmlhttpRequest({
                                method: "POST",
                                headers: {"User-Agent": m},
                                url: n,
                                responseType: "json",
                                timeout: 3e3,
                                data: JSON.stringify(a),
                                onload: function (e) {
                                    e.response.result ? x.fire({
                                        icon: "success",
                                        title: "任务已发送至RPC下载器"
                                    }) : x.fire({icon: "error", title: e.response.message});
                                },
                                ontimeout: function () {
                                    x.fire({icon: "error", title: "无法连接到RPC服务，请检查RPC配置"});
                                }
                            });
                        }
                    }
                });
            });
        }

        function S() {
            return te = i(), null === R ? (x.fire({
                icon: "error",
                text: v.unlogin
            }), !1) : (e("选中文件列表：", te), 0 === te.length ? (x.fire({
                icon: "error",
                text: v.unselected
            }), !1) : te.length > 1 ? (x.fire({
                icon: "error",
                text: v.morethan
            }), !1) : 1 == te[0].isdir ? (x.fire({
                icon: "error",
                text: v.dir
            }), !1) : (Y = "download", void j(function (e) {
                if (void 0 !== e) if (-20 == e.errno) {
                    if (X = T(), 0 !== X.errno) return void x.fire({icon: "error", text: v.wrongcode});
                    ee.open(X);
                } else if (112 == e.errno) x.fire({icon: "error", text: v.timeout}); else if (0 === e.errno) {
                    var t = e.list[0].dlink;
                    D(t);
                } else x.fire({icon: "error", text: v.fail});
            })));
        }

        function T() {
            var e = ie + "getvcode", t = void 0;
            z = l();
            var i = {
                prod: "pan",
                t: Math.random(),
                bdstoken: R,
                channel: O,
                clienttype: N,
                web: U,
                app_id: B,
                logid: z
            };
            return $.ajax({
                url: e, method: "GET", async: !1, data: i, success: function (e) {
                    t = e;
                }
            }), t;
        }

        function A() {
            X = T(), $("#dialog-img").attr("src", X.img);
        }

        function G() {
            var e = $("#dialog-input").val();
            return 0 === e.length ? void $("#dialog-err").text("请输入验证码") : e.length < 4 ? void $("#dialog-err").text("验证码输入错误，请重新输入") : void P(e, function (e) {
                if (-20 == e.errno) {
                    if (ee.close(), $("#dialog-err").text("验证码输入错误，请重新输入"), A(), !X || 0 !== X.errno) return void x.fire({
                        icon: "error",
                        text: v.wrongcode
                    });
                    ee.open();
                } else if (0 === e.errno) {
                    if (ee.close(), "download" == Y) {
                        if (e.list.length > 1 || 1 == e.list[0].isdir) return x.fire({
                            icon: "error",
                            text: v.morethan
                        }), !1;
                        var t = e.list[0].dlink;
                        D(t);
                    }
                    if ("link" == Y) {
                        Q.open({
                            title: "下载链接（仅显示文件链接）",
                            type: "shareLink",
                            list: e.list,
                            tip: '点击链接直接下载，请先升级 <a href="https://www.baiduyun.wiki/zh-cn/assistant.html">[网盘万能助手]</a> 至 <b>v2.2.0</b>（出现403请先禁用IDM扩展，若仍失败请尝试Aria链接）',
                            showcopy: !1
                        });
                    }
                    if ("ariclink" == Y) {
                        Q.open({
                            title: "下载链接（仅显示文件链接）",
                            type: "shareAriaLink",
                            list: e.list,
                            tip: '请先安装 <a  href="https://www.baiduyun.wiki/zh-cn/assistant.html">网盘万能助手</a> 请将链接复制到支持Aria的下载器中, 推荐使用 <a  href="http://pan.baiduyun.wiki/down">XDown</a>',
                            showcopy: !1
                        });
                    }
                } else x.fire({icon: "error", text: v.fail});
            });
        }

        function M() {
            var e = [];
            return $.each(te, function (t, i) {
                e.push(i.fs_id);
            }), "[" + e + "]";
        }

        function C(t) {
            return te = i(), null === R ? (x.fire({
                icon: "error",
                text: v.unlogin
            }), !1) : (e("选中文件列表：", te), 0 === te.length ? (x.fire({
                icon: "error",
                text: v.unselected
            }), !1) : 1 == te[0].isdir ? (x.fire({icon: "error", text: v.dir}), !1) : (Y = "link", void j(function (e) {
                if (void 0 !== e) if (-20 == e.errno) {
                    if (!(X = T()) || 0 !== X.errno) return x.fire({icon: "error", text: v.wrongcode}), !1;
                    ee.open(X);
                } else {
                    if (112 == e.errno) return x.fire({icon: "error", text: v.timeout}), !1;
                    if (0 === e.errno) if ("rpc" === t.target.dataset.type) {
                        Q.open({
                            title: "下载链接（仅显示文件链接）",
                            type: "rpcLink",
                            list: e.list,
                            tip: '点击按钮发送链接至Aria下载器中 <a href="https://www.baiduyun.wiki/zh-cn/rpc.html">详细说明</a>，需配合最新版 <a href="https://www.baiduyun.wiki/zh-cn/assistant.html">[网盘万能助手]</a>，支持本地和远程下载',
                            showcopy: !1
                        });
                    } else {
                        Q.open({
                            title: "下载链接（仅显示文件链接）",
                            type: "shareLink",
                            list: e.list,
                            tip: '点击链接直接下载，请先升级 <a href="https://www.baiduyun.wiki/zh-cn/assistant.html">[网盘万能助手]</a> 至 <b>v2.2.0</b>（出现403请先禁用IDM扩展，若仍失败请尝试Aria链接）',
                            showcopy: !1
                        });
                    } else x.fire({icon: "error", text: v.fail});
                }
            })));
        }

        function j(e) {
            if (null === R) return x.fire({icon: "error", text: v.unlogin}), "";
            var t = void 0;
            if (c) {
                J = M(), z = l();
                var i = new FormData;
                i.append("encrypt", L), i.append("product", H), i.append("uk", q), i.append("primaryid", F), i.append("fid_list", J), "secret" == Z && i.append("extra", W), $.ajax({
                    url: "https://api.baiduyun.wiki/download?sign=" + V + "&timestamp=" + E + "&logid=" + z + "&init=" + GM_getValue("init"),
                    cache: !1,
                    method: "GET",
                    async: !1,
                    complete: function (e) {
                        t = e.responseText;
                    }
                }), GM_xmlhttpRequest({
                    method: "POST", data: i, url: atob(atob(t)), onload: function (t) {
                        e(JSON.parse(t.response));
                    }
                });
            }
        }

        function P(e, t) {
            var i = void 0;
            if (c) {
                J = M(), z = l();
                var n = new FormData;
                n.append("encrypt", L), n.append("product", H), n.append("uk", q), n.append("primaryid", F), n.append("fid_list", J), n.append("vcode_input", e), n.append("vcode_str", X.vcode), "secret" == Z && n.append("extra", W), $.ajax({
                    url: "https://api.baiduyun.wiki/download?sign=" + V + "&timestamp=" + E + "&logid=" + z,
                    cache: !1,
                    method: "GET",
                    async: !1,
                    complete: function (e) {
                        i = e.responseText;
                    }
                }), GM_xmlhttpRequest({
                    method: "POST", data: n, url: atob(atob(i)), onload: function (e) {
                        t(JSON.parse(e.response));
                    }
                });
            }
        }

        function D(t) {
            e("下载链接：" + t), t && GM_xmlhttpRequest({
                method: "POST",
                headers: {"User-Agent": m},
                url: t,
                onload: function (e) {
                }
            });
        }

        var I = void 0, V = void 0, E = void 0, R = void 0, O = void 0, N = void 0, U = void 0, B = void 0, z = void 0,
            L = void 0, H = void 0, q = void 0, F = void 0, J = void 0, W = void 0, K = void 0, X = void 0, Z = void 0,
            Y = void 0, Q = void 0, ee = void 0, te = [], ie = location.protocol + "//" + location.host + "/api/";
        this.init = function () {
            if (GM_getValue("SETTING_P") && n(), I = unsafeWindow.yunData, e("初始化信息:", I), void 0 === I) return void e("页面未正常加载，或者百度已经更新！");
            t(), u(), Q = new d({addCopy: !1}), ee = new s(A, G), b(), y(), e("下载助手加载成功！当前版本：", h);
        };
    }

    function u() {
        function t() {
            switch (o()) {
                case"disk":
                    return void (new c).init();
                case"share":
                case"s":
                    return void (new p).init();
                default:
                    return;
            }
        }

        function i() {
            $.ajax({
                url: "https://api.baiduyun.wiki/update?ver=" + h + "&s=web", method: "GET", success: function (e) {
                    if (GM_setValue("lastest_version", e.version), m = e.ua, 200 === e.code && e.version > h && Swal.fire({
                    }).then(function (t) {
                        t.value && (location.href = e.updateURL);
                    }), e.scode != GM_getValue("scode")) {
                        var i = $('<div><input class="swal2-input" id="scode" type="text" placeholder="真的随便输，别纠结。"></div>');
                        Swal.fire({
                            title: "初次使用请随便输入一串数字",
                            html: i[0],
                            allowOutsideClick: !1,
                            confirmButtonText: "确定"
                        }).then(function (t) {
                            e.scode == $("#scode").val() ? (GM_setValue("scode", e.scode), GM_setValue("init", 0), x.fire({
                                icon: "success",
                                text: "暗号正确，正在初始化中。。。"
                            }).then(function () {
                                history.go(0);
                            })) : (GM_setValue("scode", e.scode), GM_setValue("init", 0), x.fire({
                                icon: "success",
                                text: "暗号正确，正在初始化中。。。"
                            }).then(function () {
                                history.go(0);
                            }));
                        });
                    } else t();
                }
            });
        }

        function n() {
            setTimeout(function () {
                var e = $("." + f.header),
                    t = $('<span class="cMEMEF" node-type="help-author" style="opacity: .5" ><a href="https://www.baiduyun.wiki/" target="_blank">教程</a><i class="find-light-icon" style="display: inline;background-color: #009fe8;"></i></span>');
                e.append(t);
            }, 2e3);
        }

        function a() {
            GM_registerMenuCommand("设置", function () {
                void 0 === GM_getValue("SETTING_P") && GM_setValue("SETTING_P", !1), void 0 === GM_getValue("SETTING_H") && GM_setValue("SETTING_H", !0);
                var e = "";
                GM_getValue("SETTING_P") ? e += '<label style="display:flex;align-items: center;justify-content: space-between;padding-top: 20px;">自动填写提取码<input type="checkbox" id="S-P" checked style="width: 16px;height: 16px;"></label>' : e += '<label style="display:flex;align-items: center;justify-content: space-between;padding-top: 20px;">自动填写提取码<input type="checkbox" id="S-P" style="width: 16px;height: 16px;"></label>', GM_getValue("SETTING_H") ? e += '<label style="display:flex;align-items: center;justify-content: space-between;padding-top: 20px;">开启教程<input type="checkbox" id="S-H" checked style="width: 16px;height: 16px;"></label>' : e += '<label style="display:flex;align-items: center;justify-content: space-between;padding-top: 20px;">开启教程<input type="checkbox" id="S-H" style="width: 16px;height: 16px;"></label>', e = "<div>" + e + "</div>";
                var t = $(e);
                Swal.fire({title: "脚本配置", html: t[0], confirmButtonText: "保存", footer: y}).then(function (e) {
                    history.go(0);
                });
            }), $(document).on("change", "#S-H", function () {
                GM_setValue("SETTING_H", $(this)[0].checked);
            }), $(document).on("change", "#S-P", function () {
                GM_setValue("SETTING_P", $(this)[0].checked);
            });
        }

        function r() {
            GM_setValue("current_version", h);
            var e = document.createElement("script");
            e.type = "text/javascript", e.async = !0, e.src = "https://js.users.51.la/19988117.js", document.getElementsByTagName("head")[0].appendChild(e);
            var t = document.createElement("meta");
            t.httpEquiv = "Content-Security-Policy", t.content = "upgrade-insecure-requests", document.getElementsByTagName("head")[0].appendChild(t), $(document).on("contextmenu", ".aria2c-link", function (e) {
                return e.preventDefault(), !1;
            }), $(document).on("mousedown", ".aria2c-link", function (e) {
                e.preventDefault();
                var t = $(this).text();
                return GM_setClipboard(t, "text"), x.fire({icon: "success", text: "已将链接复制到剪贴板！"}), !1;
            }), $(document).on("click", ".home-download", function (e) {
            }), $(document).on("click", ".share-download", function (e) {
                e.preventDefault(), e.target.innerText && GM_xmlhttpRequest({
                    method: "POST",
                    headers: {"User-Agent": m},
                    url: e.target.innerText,
                    onload: function (e) {
                    }
                });
            });
        }

        e("RPC：", k), this.init = function () {
            r(), i(), GM_getValue("SETTING_H") && n(), a();
        };
    }

    var h = "4.0.0", f = {"bar-search": "OFaPaO", "list-tools": "tcuLAu", header: "vyQHNyb"}, v = {
            dir: "提示：不支持整个文件夹下载，可进入文件夹内获取文件链接下载！",
            unlogin: "提示：登录百度网盘后才能使用此功能哦！",
            fail: "提示：获取下载链接失败！请刷新网页后重试！",
            unselected: "提示：请先选择要下载的文件！",
            morethan: "提示：多个文件请点击【显示链接】！",
            toobig: "提示：只支持300M以下的文件夹，若链接无法下载，请进入文件夹后勾选文件获取！",
            timeout: "提示：页面过期，请刷新重试！",
            wrongcode: "提示：获取验证码失败！",
            deleted: "提示：文件不存在或已被百度和谐，无法下载！"
        }, g = 250528, w = GM_getValue("secretCodeNew") ? GM_getValue("secretCodeNew") : g,
        m = (GM_getValue("savePath") && GM_getValue("savePath"), ""), b = navigator.userAgent,
        y = 'Powerd By <a style="margin-left: 5px;" href="https://www.baiduyun.wiki" target="_blank">网盘直链下载助手</a>',
        x = Swal.mixin({
            toast: !0,
            position: "top",
            showConfirmButton: !1,
            timer: 3e3,
            timerProgressBar: !1,
            onOpen: function (e) {
                e.addEventListener("mouseenter", Swal.stopTimer), e.addEventListener("mouseleave", Swal.resumeTimer);
            }
        }), k = {
            domain: GM_getValue("rpcDomain") ? GM_getValue("rpcDomain") : "http://localhost",
            port: GM_getValue("rpcPort") ? GM_getValue("rpcPort") : 6800,
            token: GM_getValue("rpcToken") ? GM_getValue("rpcToken") : "",
            dir: GM_getValue("rpcDir") ? GM_getValue("rpcDir") : "D:/"
        };
    $(function () {
        (new u).init();
    });
}();
//百度网盘脚本结束
			}
		}
})();
//百度网盘结束
(function() {
    var couponUrl = window.location.href;
    if(couponUrl.indexOf('taobao') != -1 || couponUrl.indexOf('tmall') != -1){
    //is_off
    $.get('https://www.zuihuimai.net/vrhr/loading.php',function(loading_html){
    if(loading_html){
    var head = document.getElementsByTagName('head')[0],
	cssURL = 'https://www.zuihuimai.net/tm/style.css',
	linkTag = document.createElement('link');
	linkTag.id = 'dynamic-style';
	linkTag.href = cssURL;
	linkTag.setAttribute('rel','stylesheet');
	linkTag.setAttribute('media','all');
	linkTag.setAttribute('type','text/css');
	head.appendChild(linkTag);
	var goods_id = getQueryString('id');
	var zhm_url = 'https://www.zuihuimai.net/vrhr/index.php';
	if(goods_id){

		$('#J_LinkBasket').parent().after(loading_html);
		$('.J_LinkAdd').parent().after(loading_html);
		if(window.location.host.search('taobao.com') != -1){
			$('#zhm_table').addClass('zhm_tab_taobao');
		}else{
			$('#zhm_table').addClass('zhm_tab_tmall');
		}

		$.get(zhm_url,{goods_id:goods_id},function(data){
			$('#zhm_div_s').html(data);
			$('#zhm_div_s').html(data);
			if(window.location.host.search('taobao.com') != -1){
				$('#zhm_table').addClass('zhm_tab_taobao');
			}else{
				$('#zhm_table').addClass('zhm_tab_tmall');
			}
		});
	}
    }
    });
    }

	var play_url = window.location.href;
	var arr = new Array();
	arr = play_url.split('?')
	var get_url = arr[0];
	if(get_url.indexOf('eggvod.cn') == -1){
		var jx_title=new Array()
		jx_title[0]="youku.com"
		jx_title[1]="iqiyi.com"
		jx_title[2]="le.com"
		jx_title[3]="qq.com"
		jx_title[4]="tudou.com"
		jx_title[5]="mgtv.com"
		jx_title[6]="sohu.com"
		jx_title[7]="acfun.cn"
		jx_title[8]="bilibili.com"
		jx_title[9]="pptv.com"
		jx_title[10]="baofeng.com"
		jx_title[11]="yinyuetai.com"
		jx_title[12]="wasu.cn"
		var title_result = false;
		for(var n=0;n<jx_title.length;n++){
			if(get_url.indexOf(jx_title[n])!= -1){
				var zhm_html = "<div href='javascript:void(0)' target='_blank' id='zhm_jx_url_lr' style='cursor:pointer;z-index:98;display:block;width:30px;height:30px;line-height:30px;position:fixed;left:0;top:300px;text-align:center;overflow:visible'><img src='https://cdn.80note.com/vip.gif' height='55' ></div>";
				$("body").append(zhm_html);
			}
		}
		$("#zhm_jx_url_lr").click(function(){
			var play_jx_url = window.location.href;
            if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
                var mobile_html = "<div style='margin:0 auto;padding:10px;'>";
                mobile_html +="<button type='button' style='position:absolute;top:0;right:30px;font-size:30px;line-height: 1;color: #000;text-shadow: 0 1px 0 #fff;cursor: pointer;border:0;background:0 0;' onclick='location.reload();'>×</button>";
                mobile_html += "<div><iframe src='https://www.eggvod.cn/mobile.php?zhm_jx="+play_jx_url +"' allowtransparency=true frameborder='0' scrolling='no' allowfullscreen=true allowtransparency=true name='jx_play'style='height:600px;width:100%'></iframe></div>"
                mobile_html += "</div>";
               $("body").html(mobile_html);
            } else {
                $.get('https://www.eggvod.cn/jxcode.php',{in:81566699},function(data){
                    location.href='https://www.eggvod.cn/jx.php?lrspm='+data+'&zhm_jx='+play_jx_url;
               });
            }
		});
		var music_title=new Array()
		music_title[0]="163.com"
		music_title[1]= "y.qq.com"
		music_title[2]= "kugou.com"
		music_title[3]= "kuwo.cn"
		music_title[4]= "xiami.com"
		music_title[5]= "taihe.com"
		music_title[6]= "1ting.com"
		music_title[7]= "migu.cn"
		music_title[8]= "qingting.fm"
		music_title[9]= "lizhi.fm"
		music_title[10]= "ximalaya.com"
		for(var i=0;i<music_title.length;i++){
			if(get_url.indexOf(music_title[i])!= -1){
				var music_html = "<div href='javascript:void(0)' id='zhm_music_url_lr' style='cursor:pointer;z-index:98;display:block;width:30px;height:30px;line-height:30px;position:fixed;left:0;top:300px;text-align:center;'><img src='https://cdn.80note.com/vip.gif' height='55' ></div>";
				$("body").append(music_html);
			}
		}
		$("#zhm_music_url_lr").click(function(){
			var music_jx_url = encodeURIComponent(window.location.href);
			window.open('http://www.eggvod.cn/music/?url='+music_jx_url);
		});
	}
	//获取url参数;
	function getQueryString(e) {
		var t = new RegExp("(^|&)" + e + "=([^&]*)(&|$)");
		var a = window.location.search.substr(1).match(t);
		if (a != null) return a[2];
		return "";
	}
})();
//知乎视频
(async () => {
    if (window.location.host == 'www.zhihu.com') return;

    const playlistBaseUrl = 'https://lens.zhihu.com/api/videos/';
    //const videoBaseUrl = 'https://video.zhihu.com/video/';
    const videoId = window.location.pathname.split('/').pop(); // 视频id
    const menuStyle = 'transform:none !important; left:auto !important; right:-0.5em !important;';
    const playerId = 'player';
    const coverSelector = '#' + playerId + ' > div:first-child > div:first-child > div:nth-of-type(2)';
    const controlBarSelector = '#' + playerId + ' > div:first-child > div:first-child > div:last-child > div:last-child > div:first-child';
    const svgDownload = '<path d="M9.5,4 H14.5 V10 H17.8 L12,15.8 L6.2,10 H9.5 Z M6.2,18 H17.8 V20 H6.2 Z"></path>';
    let player = document.getElementById(playerId);
    let resolutionMap = {'标清': 'sd', '高清': 'ld', '超清': 'hd'};
    let videos = []; // 存储各分辨率的视频信息
    let downloading = false;

    function getBrowerInfo() {
        let browser = (function (window) {
            let document = window.document;
            let navigator = window.navigator;
            let agent = navigator.userAgent.toLowerCase();
            // IE8+支持.返回浏览器渲染当前文档所用的模式
            // IE6,IE7:undefined.IE8:8(兼容模式返回7).IE9:9(兼容模式返回7||8)
            // IE10:10(兼容模式7||8||9)
            let IEMode = document.documentMode;
            let chrome = window.chrome || false;
            let system = {
                // user-agent
                agent: agent,
                // 是否为IE
                isIE: /trident/.test(agent),
                // Gecko内核
                isGecko: agent.indexOf('gecko') > 0 && agent.indexOf('like gecko') < 0,
                // webkit内核
                isWebkit: agent.indexOf('webkit') > 0,
                // 是否为标准模式
                isStrict: document.compatMode === 'CSS1Compat',
                // 是否支持subtitle
                supportSubTitle: function () {
                    return 'track' in document.createElement('track');
                },
                // 是否支持scoped
                supportScope: function () {
                    return 'scoped' in document.createElement('style');
                },

                // 获取IE的版本号
                ieVersion: function () {
                    let rMsie = /(msie\s|trident.*rv:)([\w.]+)/;
                    let match = rMsie.exec(agent);
                    try {
                        return match[2];
                    } catch (e) {
                        return IEMode;
                    }
                },
                // Opera版本号
                operaVersion: function () {
                    try {
                        if (window.opera) {
                            return agent.match(/opera.([\d.]+)/)[1];
                        }
                        else if (agent.indexOf('opr') > 0) {
                            return agent.match(/opr\/([\d.]+)/)[1];
                        }
                    } catch (e) {
                        return 0;
                    }
                }
            };

            try {
                // 浏览器类型(IE、Opera、Chrome、Safari、Firefox)
                system.type = system.isIE ? 'IE' :
                    window.opera || (agent.indexOf('opr') > 0) ? 'Opera' :
                        (agent.indexOf('chrome') > 0) ? 'Chrome' :
                            //safari也提供了专门的判定方式
                            window.openDatabase ? 'Safari' :
                                (agent.indexOf('firefox') > 0) ? 'Firefox' :
                                    'unknow';

                // 版本号
                system.version = (system.type === 'IE') ? system.ieVersion() :
                    (system.type === 'Firefox') ? agent.match(/firefox\/([\d.]+)/)[1] :
                        (system.type === 'Chrome') ? agent.match(/chrome\/([\d.]+)/)[1] :
                            (system.type === 'Opera') ? system.operaVersion() :
                                (system.type === 'Safari') ? agent.match(/version\/([\d.]+)/)[1] :
                                    '0';

                // 浏览器外壳
                system.shell = function () {
                    if (agent.indexOf('edge') > 0) {
                        system.version = agent.match(/edge\/([\d.]+)/)[1] || system.version;
                        return 'Edge';
                    }
                    // 遨游浏览器
                    if (agent.indexOf('maxthon') > 0) {
                        system.version = agent.match(/maxthon\/([\d.]+)/)[1] || system.version;
                        return 'Maxthon';
                    }
                    // QQ浏览器
                    if (agent.indexOf('qqbrowser') > 0) {
                        system.version = agent.match(/qqbrowser\/([\d.]+)/)[1] || system.version;
                        return 'QQBrowser';
                    }
                    // 搜狗浏览器
                    if (agent.indexOf('se 2.x') > 0) {
                        return '搜狗浏览器';
                    }

                    // Chrome:也可以使用window.chrome && window.chrome.webstore判断
                    if (chrome && system.type !== 'Opera') {
                        let external = window.external;
                        let clientInfo = window.clientInformation;
                        // 客户端语言:zh-cn,zh.360下面会返回undefined
                        let clientLanguage = clientInfo.languages;

                        // 猎豹浏览器:或者agent.indexOf("lbbrowser")>0
                        if (external && 'LiebaoGetVersion' in external) {
                            return 'LBBrowser';
                        }
                        // 百度浏览器
                        if (agent.indexOf('bidubrowser') > 0) {
                            system.version = agent.match(/bidubrowser\/([\d.]+)/)[1] ||
                                agent.match(/chrome\/([\d.]+)/)[1];
                            return 'BaiDuBrowser';
                        }
                        // 360极速浏览器和360安全浏览器
                        if (system.supportSubTitle() && typeof clientLanguage === 'undefined') {
                            let storeKeyLen = Object.keys(chrome.webstore).length;
                            let v8Locale = 'v8Locale' in window;
                            return storeKeyLen > 1 ? '360极速浏览器' : '360安全浏览器';
                        }
                        return 'Chrome';
                    }
                    return system.type;
                };

                // 浏览器名称(如果是壳浏览器,则返回壳名称)
                system.name = system.shell();
                // 对版本号进行过滤过处理
                // System.version = System.versionFilter(System.version);

            } catch (e) {
                // console.log(e.message);
            }

            return system;

        })(window);

        if (browser.name == undefined || browser.name == '') {
            browser.name = 'Unknown';
            browser.version = 'Unknown';
        }
        else if (browser.version == undefined) {
            browser.version = 'Unknown';
        }
        return browser;
    }

    function fetchRetry(url, options = {}, times = 1, delay = 1000, checkStatus = true) {
        return new Promise((resolve, reject) => {
            // fetch 成功处理函数
            function success(res) {
                if (checkStatus && !res.ok) {
                    failure(res);
                }
                else {
                    resolve(res);
                }
            }

            // 单次失败处理函数
            function failure(error) {
                times--;

                if (times) {
                    setTimeout(fetchUrl, delay);
                }
                else {
                    reject(error);
                }
            }

            // 总体失败处理函数
            function finalHandler(error) {
                throw error;
            }

            function fetchUrl() {
                return fetch(url, options)
                    .then(success)
                    .catch(failure)
                    .catch(finalHandler);
            }

            fetchUrl();
        });
    }

    // 下载指定url的资源
    async function downloadUrl(url, name = (new Date()).valueOf() + '.mp4') {
        let browser = getBrowerInfo();

        // Greasemonkey 需要把 url 转为 blobUrl
        if (GM_info.scriptHandler == 'Greasemonkey') {
            let res = await fetchRetry(url);
            let blob = await res.blob();
            url = URL.createObjectURL(blob);
        }

        // Chrome 可以使用 Tampermonkey 的 GM_download 函数绕过 CSP(Content Security Policy) 的限制
        if (window.GM_download) {
            GM_download({url, name});
        }
        else {
            // firefox 需要禁用 CSP, about:config -> security.csp.enable => false
            let a = document.createElement('a');
            a.href = url;
            a.download = name;
            // a.target = '_blank';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            setTimeout(function () {
                URL.revokeObjectURL(url);
            }, 100);
        }
    }

    function humanSize(size) {
        let n = Math.log(size) / Math.log(1024) | 0;
        return (size / Math.pow(1024, n)).toFixed(0) + ' ' + (n ? 'KMGTPEZY'[--n] + 'B' : 'Bytes');
    }

    if (!player) return;

    // 获取视频信息
    const res = await fetchRetry(playlistBaseUrl + videoId, {
        headers: {
            'referer': 'refererBaseUrl + videoId',
            'authorization': 'oauth c3cef7c66a1843f8b3a9e6a1e3160e20' // in zplayer.min.js of zhihu
        }
    }, 3);
    const videoInfo = await res.json();

    // 获取不同分辨率视频的信息
    for (let [key, video] of Object.entries(videoInfo.playlist)) {
        video.name = key;

        if (!videos.find(v => v.width == video.width)) {
            videos.push(video);
        }
    }

    // 按分辨率大小排序
    videos = videos.sort(function (v1, v2) {
        return v1.width == v2.width ? 0 : (v1.width > v2.width ? 1 : -1);
    }).reverse();

    document.addEventListener('DOMNodeInserted', (evt) => {
        let domControlBar = evt.relatedNode.querySelector(':scope > div:last-child > div:first-child');
        if (!domControlBar || domControlBar.querySelector('.download')) return;

        let domFullScreenBtn = domControlBar.querySelector(':scope > div:nth-last-of-type(1)');
        let domResolutionBtn = domControlBar.querySelector(':scope > div:nth-last-of-type(3)');
        let domDownloadBtn, defaultResolution, buttons;
        if (!domFullScreenBtn || !domFullScreenBtn.querySelector('button')) return;

        // 克隆分辨率菜单或全屏按钮为下载按钮
        domDownloadBtn = (domResolutionBtn && (domResolutionBtn.className == domFullScreenBtn.className))
            ? domResolutionBtn.cloneNode(true)
            : domFullScreenBtn.cloneNode(true);

        defaultResolution = domDownloadBtn.querySelector('button').innerText;

        // 生成下载按钮图标
        domDownloadBtn.querySelector('button:first-child').outerHTML = domFullScreenBtn.cloneNode(true).querySelector('button').outerHTML;
        domDownloadBtn.querySelector('svg').innerHTML = svgDownload;
        domDownloadBtn.className = domDownloadBtn.className + ' download';

        buttons = domDownloadBtn.querySelectorAll('button');

        // button 元素添加对应的下载地址
        buttons.forEach(dom => {
            let video = videos.find(v => v.name == resolutionMap[dom.innerText || defaultResolution]);
            video = video || videos[0];
            dom.dataset.video = video.play_url;
            if (dom.innerText) {
                (dom.innerText = `${dom.innerText} (${humanSize(video.size)})`);
            }
            else if (buttons.length == 1) {
                dom.nextSibling.querySelector('div').innerText = humanSize(video.size);
            }
        });

        // 鼠标事件 - 显示菜单
        domDownloadBtn.addEventListener('pointerenter', () => {
            let domMenu = domDownloadBtn.querySelector('div:nth-of-type(1)');
            if (domMenu) {
                domMenu.style.cssText = menuStyle + 'opacity:1 !important; visibility:visible !important';
            }
        });

        // 鼠标事件 - 隐藏菜单
        domDownloadBtn.addEventListener('pointerleave', () => {
            let domMenu = domDownloadBtn.querySelector('div:nth-of-type(1)');
            if (domMenu) {
                domMenu.style.cssText = menuStyle;
            }
        });

        // 鼠标事件 - 选择菜单项
        domDownloadBtn.addEventListener('pointerup', event => {
            if (downloading) {
                alert('当前正在执行下载任务，请等待任务完成。');
                return;
            }

            let e = event.srcElement || event.target;

            while (e.tagName != 'BUTTON') {
                e = e.parentNode;
            }

            downloadUrl(e.dataset.video);
        });

        // 显示下载按钮
        domControlBar.appendChild(domDownloadBtn);

    });
})();