// ==UserScript==
// @icon         http://pan.baidu.com/box-static/disk-system/images/favicon.ico
// @name         吾爱破解论坛_百度网盘链接激活 && 提取码自动补全
// @namespace    52pojie_pan_autocompletion
// @author       猎隼丶止戈<1649991905@qq.com>、Space<294619027@qq.com>
// @description  激活吾爱破解论坛中的网盘链接，并自动补全提取码然后跳转到分享地址
// @supportURL   https://gitee.com/nn200433/script_synchronization/tree/master/%E7%BD%91%E7%9B%98%E8%84%9A%E6%9C%AC
// @exclude      *://www.52pojie.cn/forum.php?mod=post&action=newthread*
// @exclude      *://www.52pojie.cn/forum.php?mod=post&action=edit*
// @match        *://www.52pojie.cn/*
// @match        *://pan.baidu.com/share/*
// @match        *://www.lanzous.com/*
// @require      https://cdn.bootcss.com/jquery/1.8.3/jquery.min.js
// @require      https://cdn.bootcss.com/jquery-cookie/1.4.1/jquery.cookie.min.js
// @require      https://cdn.bootcss.com/limonte-sweetalert2/7.28.5/sweetalert2.all.js
// @require      https://cdn.jsdelivr.net/npm/darkmode-js@1.4.0/lib/darkmode-js.min.js
// @version      0.1.3.5
// @grant        unsafeWindow
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// ==/UserScript==
(function () {
    'use strict';

    /////////////////////////////////////////////////////////////////// 自定义CSS样式-开始 ///////////////////////////////////////////////////////////////////

    /* 文章内部链接CSS */
    GM_addStyle('.my_baidu_link{padding:2px 2px;text-decoration: none !important;background: #fff!important;color: #00bfff!important;border: 1px solid #00bfff;border-radius: 6px;transition: .3s background linear,.2s color linear;}.my_baidu_link:hover{padding:2px 2px;text-decoration: none !important;background: #00bfff!important;color: #fff!important;border: 1px solid #00bfff;border-radius: 6px;transition: .3s background linear,.2s color linear;}');
    GM_addStyle('.my_baidu_link_destroy {cursor: not-allowed;text-decoration: line-through !important;color: #ff6b68 !important;border: 1px solid #ff6b68;}');

    /* 表格CSS */
    GM_addStyle('.jzcount{background-position: 0 -240px !important;}.jzcount:hover{background-position: -40px -240px !important;}');
    GM_addStyle('table.my_baidu_link_table {margin: 0 auto;}');
    GM_addStyle('.my_baidu_link_table>tbody>tr>td, .my_baidu_link_table>tbody>tr>th, .my_baidu_link_table>tfoot>tr>td, .my_baidu_link_table>tfoot>tr>th, .my_baidu_link_table>thead>tr>td, .my_baidu_link_table>thead>tr>th {padding: 10px;line-height: 1.42857143;vertical-align: top;border: 1px solid #F5F5F5;text-align:center;color:#3F51B5 !important}');
    GM_addStyle('.my_baidu_link_table>tbody>tr>td>a, .my_baidu_link_table>tbody>tr>th>a, .my_baidu_link_table>tfoot>tr>td>a, .my_baidu_link_table>tfoot>tr>th>a, .my_baidu_link_table>thead>tr>td>a, .my_baidu_link_table>thead>tr>th>a {color: #00bfff/* !important */;/* text-decoration: none !important; */}');

    /* 右侧按钮CSS */
    GM_addStyle('#pancount{font-size: 25px;font-weight: bold;line-height: 38px !important;color: #fff !important;border: 1px solid #00bfff;border-radius: 50px;background: #2196F3 !important;box-shadow: 0 2px 2px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.06), 0 1px 5px 0 rgba(0,0,0,0.12);transition: .3s background linear,.2s color linear;}')
    GM_addStyle('#pancount:hover{background: #5352ed !important;transition: .3s background linear,.2s color linear;}')
    GM_addStyle('.jzcount > .cloud__logo-del {position: relative;right: -10000px;border-right: 0 solid transparent;filter: drop-shadow(-10000px 0 #fff);}')

    /* 选择框CSS */
    GM_addStyle(".pan_notice_label{display:inline-block;top: 4px;width:34px;height:18px;background:#ccc;border-radius:30px;cursor:pointer;position:relative;-webkit-transition:.3s ease;transition:.3s ease}.pan_notice_label:after{content:'';display:block;width:16px;height:16px;border-radius:100%;background:#fff;box-shadow:0 1px 1px rgba(0,0,0,.1);position:absolute;left:1px;top:1px;-webkit-transform:translateZ(0);transform:translateZ(0);-webkit-transition:.3s ease;transition:.3s ease}.pan_notice_slide{width:50px;height:20px}.pan_notice_slide input:checked+label{background:#34bf49;transition:.3s ease;}.pan_notice_slide input:checked+label:after{left:17px}")

    /////////////////////////////////////////////////////////////////// 自定义CSS样式-结束 ///////////////////////////////////////////////////////////////////


    /////////////////////////////////////////////////////////////////// 全局变量-开始 ///////////////////////////////////////////////////////////////////

    var PLUGIN_NAME = '吾爱破解论坛_百度网盘链接激活 && 提取码自动补全';
    var location = self.location;
    var location_pathname = location.pathname;

    // 链接
    var panLinks = new Array;

    // 链接数量
    var panLinksCounts = new Array;

    // 链接密码
    var panLinksPassword = new Array;

    // 提取码正则
    var panPwdPattern = /\s*[^(解压|压缩)](密|提取)码[：:]?[ A-Za-z0-9]+/g;

    // 删除html标签正则
    var htmlTagPattern = /<("[^"]*"|'[^']*'|[^'">])*>/g;

    // 排除文字
    var exclude_array = ['使用论坛附件上传样本压缩包时必须使用压缩密码保护，压缩密码:52pojie，否则会导致论坛被杀毒软件等误报，论坛有权随时删除相关附件和帖子！'];

    // 后续require无法引入插件时，在此引入第三方插件
    var REQUIRE_ARRAY = [{
        name: 'noti.js',
        description: '吾爱js通知插件',
        url: 'https://www.52pojie.cn/source/plugin/noti/template/noti.js'
    }];

    /////////////////////////////////////////////////////////////////// 全局变量-结束 ///////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////// 自定义函数-开始 ///////////////////////////////////////////////////////////////////

    /**
     * 控制台调试输出样式 警告样式
     *
     * @param {String} string [要加样式的内容]
     */
    var Warning = function (string) {
        console.log('%c [!] ' + string, 'color:#FF9800;font-weight:bold;font-size:12px');
    }

    /**
     * 控制台调试输出样式 出错样式
     *
     * @param {String} string [要加样式的内容]
     */
    var Error = function (string) {
        console.log('%c [!] ' + string, 'color:#FF5722;font-weight:bold;font-size:12px');
    }

    /**
     * 控制台调试输出样式 成功样式
     *
     * @param {String} string [要加样式的内容]
     */
    var Success = function (string) {
        console.log('%c [!] ' + string, 'color:#8BC34A;font-weight:bold;font-size:12px');
    }

    /**
     * 控制台调试输出样式 信息样式
     *
     * @param {String} string [要加样式的内容]
     */
    var Info = function (string) {
        console.log('%c [*] ' + string, 'color:#2196F3;font-weight:bold;font-size:12px');
    }

    /**
     * 来条介绍
     */
    Warning("插件名称：" + PLUGIN_NAME);

    /**
     * 无法require时，插件引用注入-开始
     */
    $.each(REQUIRE_ARRAY, function (index, value) {
        var script = document.createElement("script");
        script.type = 'text/javascript';
        script.src = value.url;
        document.body.appendChild(script);
        Info('调试输出：\r\n【引入第三方js插件】\r\n' + '插件名 -> ' + value.name + '\r\n描述 -> ' + value.description + '\r\n地址 -> ' + value.url + '\r\n');
    });

    /**
     * noti插件 提示网盘链接数量
     *
     * @param  panLinkCounts [数量]
     */
    function notyPanCounts(panLinkCounts) {
        try {
            new Noty({
                text: '探测到网盘链接数量：' + panLinkCounts + '个,<a href="javascript:void(0);" onclick="_ShowPanLinks();">点击查看</a>',
                layout: 'bottomRight',
                theme: 'mint',
                closeWith: ['click'],
                type: 'post'
            }).show();
        } catch (err) {
            Error('调试输出：', err);
        }
    }


    /**
     * 数组操作类
     */
    var arrayTool = {
        /**
         * 分割字符串
         *
         * @param {*} str 待分割文字
         * @param {*} rule 分割规则
         */
        getSplit: function (str, rule) {
            return str.split(rule);
        },
        /**
         * 获取提取码
         *
         * @param {*} array 数组
         */
        getUbound: function (array) {
            var str = (array[array.length - 1]).replace(/(^\s*)|(\s*$)/g, "");
            return str ? str : "-";
        }
    };

    /**
     * 数组删除指定元素
     */
    Array.prototype.remove = function (val) {
        var newArray = [];
        for (var i = 0; i < this.length; i++) {
            if (val != this[i]) {
                newArray.push(this[i]);
            }
        }
        return newArray;
    };

    /**
     * 替换字符串
     * @param {*} str 待替换文本
     * @param {*} replaceArray 想要替换的数据
     * @param {*} needStr 想要将替换数据替换为什么
     */
    var getPassStr = function (str, replaceArray, needStr) {
        $.each(replaceArray, function (index, value) {
            str = str.replace(value, (needStr || ''));
        });
        return str;
    }

    /**
     * 获取提取码函数
     *
     * @param pass 正则校验通过的字符串
     * @param value 网盘链接与提取码字符串
     */
    var activeLinks = function (pass, value) {
        var passwdCount = 0;
        $(value).find(".my_baidu_link").each(function (i, v) {
            try {
                var o_href = $(v).attr("href");
                var o_href_exclude_paas = o_href.substr(0, (o_href.lastIndexOf('#') > 0 ? o_href.lastIndexOf('#') : o_href.length));
                // 防止出现重复数据
                if ($.inArray(o_href, panLinks) < 0 && $.inArray(o_href_exclude_paas, panLinks)) {
                    // 判断链接是否真的存在密码,防止密码与网盘链接不匹配的状况
                    // 查找a标签的父元素内容,判断父元素内容中是否包含提取码
                    var parentHtml = $(v).parent().html();
                    var isExistPasswd = false;
                    if (parentHtml.match(panPwdPattern)) {
                        isExistPasswd = true;
                    } else {
                        parentHtml = $(v).parent().parent().html();
                        if (parentHtml.match(panPwdPattern)) {
                            isExistPasswd = true;
                        }
                    }

                    if (isExistPasswd) {
                        // 获取密码
                        var passArray = arrayTool.getSplit(pass[passwdCount], ":");
                        if (passArray.length < 2) {
                            passArray = arrayTool.getSplit(pass[passwdCount], "：")
                        }

                        // 拼接新的网盘链接
                        var n_href = o_href + "#" + arrayTool.getUbound(passArray);
                        $(v).attr("href", n_href);

                        // 获取网盘数量、链接、密码，存入数组
                        panLinks.push(o_href);
                        panLinksPassword.push(arrayTool.getUbound(passArray));

                        //Debug
                        Info('调试输出：URL -> ' + o_href + ' 提取码 -> ' + arrayTool.getUbound(passArray));

                        // 步长+1
                        passwdCount++;
                    }
                }
            } catch (err) {
                Error('调试输出：', err);
            }
        });
    }

    /**
     * 渲染网盘链接为蓝链
     *
     * @param {*} re 非蓝链正则
     * @param {*} nre 已是蓝链正则
     */
    function activelink(re, nre) {
        $('.plc').each(function (index, value) {

            // 已是蓝链
            var nreLink = ($(this).html()).match(nre);
            // 非蓝链
            var reLink = ($(this).html()).match(re);
            // 非蓝链剔除蓝链数据
            if (nreLink && nreLink.length > 0) {
                $.each(nreLink, function(i, v) {
                    reLink = reLink.remove(v.substr(v.indexOf('"') + 1));
                });
            }

            if (reLink) {
                var ss = $(this).html();
                // 此处//$1不知道为何加//
                // ss = ss.replace(re, '<a target="_blank" href="//$1" class="my_baidu_link">$1</a>');
                // 此处全局替换会存在将蓝链替换坏的操作
                // ss = ss.replace(re, '<a target="_blank" href="$1" class="my_baidu_link">$1</a>');

                // 单个单个替换
                $.each(reLink, function(i, v) {
                    ss = ss.replace(v, '<a target="_blank" href="' + v + '" class="my_baidu_link">' + v + '</a>');
                });

                $(this).html(ss);
                // 渲染完毕存入数组
                panLinksCounts.push(reLink);
            }

            if (nreLink) {
                var ss = $(this).html();
                ss = ss.replace(nre, '$1" class="my_baidu_link"');
                $(this).html(ss);
                // 渲染完毕存入数组
                panLinksCounts.push(nreLink);
            }

            // 提取码与网盘链接拼接，提取网盘密码时，先删除html标签
            // var pass = (($(value).html()).replace(htmlTagPattern, "")).match(panPwdPattern);
            var pass = getPassStr($(value).html(), exclude_array).match(panPwdPattern);
            if (pass && (reLink || nreLink)) {
                activeLinks(pass, value);
            }

        });
    }

    /**
     * 提取网盘链接中的密码
     *
     * @param {*} rule 提取规则正则
     */
    var getCode = function (rule) {
        var code = location.hash.slice(1, 5);
        if ((rule || /([a-z\d]{4})/i.exec(code))) {
            code = RegExp.$1;
        }
        return code;
    };

    /**
     * 判断网盘链接是否失效
     *
     * @param {*} panLinksInfo 弹出框表格html代码
     * @param {*} panLinks_Counts 探测个数
     */
    function validateLink(panLinksInfo, panLinks_Counts) {
        // oload成功的数量
        var syncCount = 0;
        // 执行次数
        var allCount = 0;
        $('.plc').each(function (index, value) {
            var panLinkArray = $(value).find(".my_baidu_link");
            if (panLinkArray.length > 0) {
                // 网盘链接
                var panLinkUrl = '';
                // 提取hash密码
                var hashPassword = '';
                $.each(panLinkArray, function (i, v) {
                    panLinkUrl = $(v).attr('href');
                    // 发送get请求，判断网盘是否失效
                    GM_xmlhttpRequest({
                        method: 'GET',
                        url: panLinkUrl,
                        context: panLinkUrl,
                        onload: function (response) {
                            // 默认非失效链接
                            var isInvalid = false;
                            /**
                             * 设置失效链接的删除线-开始
                             */
                            if (response.responseText.indexOf('<title>百度网盘-链接不存在</title>') > 0 ||
                                response.responseText.indexOf('啊哦，来晚了，该分享文件已过期') > 0 ||
                                response.responseText.indexOf('啊哦，你来晚了，分享的文件已经被删除了，下次要早点哟。') > 0 ||
                                response.responseText.indexOf('啊哦，你来晚了，分享的文件已经被取消了，下次要早点哟。') > 0 ||
                                response.responseText.indexOf('啊哦！链接错误没找到文件，请打开正确的分享链接!') > 0) {
                                // 删除标记
                                $(v).addClass('my_baidu_link_destroy').attr('disabled', true).css('pointer-events', 'none');
                                // 设置为失效状态
                                isInvalid = true;
                            }
                            /**
                             * 设置失效链接的删除线-结束
                             */
                            // 表格拼接
                            Info('调试输出：' + '序号 -> ' + (allCount + 1) + '最终请求链接 -> ' + response.finalUrl + ' 访问地址 -> ' + response.context + ' 是否失效 -> ' + isInvalid);
                            var hashPasswordIndex = (response.context).lastIndexOf('#');
                            if (hashPasswordIndex != -1) {
                                hashPassword = (response.context).substr(hashPasswordIndex + 1, (response.context).length - hashPasswordIndex);
                            }
                            var gmRequestUrl = (response.context).substr(0, (hashPasswordIndex > 0 ? hashPasswordIndex : (response.context).length));
                            if ((++syncCount) <= panLinks.length) {
                                if (hashPassword != null) {
                                    if (isInvalid) {
                                        panLinksInfo += '<tr><td>' + (allCount + 1) + '</td><td><a target="_blank" class="my_baidu_link_destroy" disabled="disabled" style="pointer-events: none;" href="' + response.context + '">' + gmRequestUrl + '</a></td><td>' + hashPassword + '</td></tr>';
                                    } else {
                                        panLinksInfo += '<tr><td>' + (allCount + 1) + '</td><td><a target="_blank" href="' + response.context + '">' + gmRequestUrl + '</a></td><td>' + hashPassword + '</td></tr>';
                                    }
                                } else {
                                    if (isInvalid) {
                                        panLinksInfo += '<tr><td>' + (allCount + 1) + '</td><td><a target="_blank" class="my_baidu_link_destroy" disabled="disabled" style="pointer-events: none;" href="' + response.context + '">' + gmRequestUrl + '</a></td><td>- - - -</td></tr>';
                                    } else {
                                        panLinksInfo += '<tr><td>' + (allCount + 1) + '</td><td><a target="_blank" href="' + response.context + '">' + gmRequestUrl + '</a></td><td>- - - -</td></tr>';
                                    }
                                }
                            }
                            // 最后一个渲染完毕后，渲染方法
                            if (panLinks.length == syncCount) {
                                panLinksInfo += '</tbody>';
                                panLinksInfo += '</table>';
                                unsafeWindow._ShowPanLinks = () => {
                                    swal({
                                        width: 650,
                                        title: '探测到网盘链接数量：' + panLinks_Counts + '个',
                                        type: 'info',
                                        html: panLinksInfo,
                                        showCloseButton: true,
                                        confirmButtonText: '确认'
                                    });
                                }
                                if (location.href.match(/(?:https?:\/\/)?(www\.52pojie\.cn\/((thread\-.+\.html)|(forum\.php\?mod=viewthread\&tid=\w.+)))/g)) {
                                    $('#jz52top').prepend('<span><a id="pancount" title="探测到网盘链接数量：' + panLinks_Counts + '个" class="jzcount" href="javascript:void(0);" onclick="_ShowPanLinks();"><img class="cloud__logo-del" src="https://gitee.com/nn200433/script_synchronization/raw/master/%E7%BD%91%E7%9B%98%E8%84%9A%E6%9C%AC/cloud.png"></a></span>');
                                }
                            }
                            allCount++;
                        }
                    });
                });
            }
        });
    }

    /**
     * 初始化
     */
    function init() {
        // 网盘通知选择
        var $inputTag = $('<label class="pan_notice_slide"><input type="checkbox" id="pan_notice" hidden><label for="pan_notice" class="pan_notice_label"></label>网盘探测通知</label>').change(function () {
            if ($('#pan_notice').is(':checked')) {
                $.cookie('open_pan_notice', true);
            } else {
                $.cookie('open_pan_notice', false);
            }
        });

        var $labelTag = $('<label>').append($inputTag).append('<span class="pipe">&nbsp;|</span>');
        $('#hd').find('#pm_ntc').before($labelTag);

        // cookie为true时
        if ($.cookie('open_pan_notice') == 'true') {
            $('#pan_notice').attr("checked", 'checked');
        }

        // 百度网盘蓝链
        var re_baidu = /((?:https?:\/\/)?(?:yun|pan|eyun)\.baidu\.com\/(?:s\/\w*(((-)?\w*)*)?|share\/\S*\d\w*))/g;
        var re_ex_baidu = /(href="https?:\/\/(yun|pan|eyun)\.baidu\.com\/(?:s\/\w*(((-)?\w*)*)?|share\/\S*\d\w*))/g;
        activelink(re_baidu, re_ex_baidu);
        // 蓝奏网盘蓝链
        var re_lanzou = /((?:https?:\/\/)?(pan|www)\.lanzou(s)?\.com\/(?:\w*|\d))/g;
        var re_ex_lanzou = /(href="https?:\/\/(pan|www)\.lanzou(s)?\.com\/(?:\w*|\d))/g;
        activelink(re_lanzou, re_ex_lanzou);
        // 360网盘蓝链
        var re_360 = /((?:https?:\/\/)?yunpan\.360\.cn\/(?:\w*|\d))/g;
        var re_ex_360 = /(href="https?:\/\/yunpan\.360\.cn\/(?:\w*|\d))/g;
        activelink(re_360, re_ex_360);
    }

    /////////////////////////////////////////////////////////////////// 自定义函数-结束 ///////////////////////////////////////////////////////////////////

    $(function () {
        /**
         * 初始化
         */
        init();

        const darkmode =  new Darkmode();

        console.log($.cookie('darkmode'));
        if ($.cookie('darkmode') == 'true') {
            if (!darkmode.isActivated()) {
                darkmode.toggle();
            }
        }

        /////////////////////////////////////////////////////////////////// 页面右侧新增按钮 开始 ///////////////////////////////////////////////////////////////////

        if (document.domain == "www.52pojie.cn") {
            var imgTag = $('<img>').addClass('cloud__logo-del').attr('src', 'https://gitee.com/nn200433/script_synchronization/raw/master/%E7%BD%91%E7%9B%98%E8%84%9A%E6%9C%AC/darkmode.png');
            var aTag = $('<a>').attr('title', '切换昼夜模式')
                .attr('href', 'javascript:void(0);')
                .css('border-radius', '20px')
                .click(function() {
                    darkmode.toggle();
                    $.cookie('darkmode', darkmode.isActivated());
                }).append(imgTag);
            var spanTag = $('<span>').append(aTag);
            $('#jz52top').prepend(spanTag);
        }

        var panLinksInfo = "";
        var panLinks_Counts = panLinks.length;
        var swalType = "";
        if (panLinks_Counts > 0) {
            panLinksInfo += '<table class="my_baidu_link_table">';
            panLinksInfo += '<thead>';
            panLinksInfo += '<tr>';
            panLinksInfo += '<th><b>#</b></th>';
            panLinksInfo += '<th><b>网盘链接</b></th>';
            panLinksInfo += '<th><b>密码</b></th>';
            panLinksInfo += '</tr>';
            panLinksInfo += '</thead>';
            panLinksInfo += '<tbody>';
            // 检测网盘分享是否失效
            validateLink(panLinksInfo, panLinks_Counts);
        } else {
            panLinksInfo = "当前页未检测到带密码的网盘链接";
            swalType = "warning";
            unsafeWindow._ShowPanLinks = () => {
                swal({
                    width: 650,
                    title: '探测到网盘链接数量：' + panLinks_Counts + '个',
                    type: swalType,
                    html: panLinksInfo,
                    showCloseButton: true,
                    confirmButtonText: '确认'
                });
            }
            if (location.href.match(/(?:https?:\/\/)?(www\.52pojie\.cn\/((thread\-.+\.html)|(forum\.php\?mod=viewthread\&tid=\w.+)))/g)) {
                $('#jz52top').prepend('<span><a id="pancount" title="探测到网盘链接数量：' + panLinks_Counts + '个" class="jzcount" href="javascript:void(0);" onclick="_ShowPanLinks();"><img class="cloud__logo-del" src="https://gitee.com/nn200433/script_synchronization/raw/master/%E7%BD%91%E7%9B%98%E8%84%9A%E6%9C%AC/cloud.png"></a></span>');
            }
        }

        /////////////////////////////////////////////////////////////////// 页面右侧新增按钮 结束 ///////////////////////////////////////////////////////////////////

        // 右下角noty提醒
        if ($.cookie('open_pan_notice') == 'true') {
            notyPanCounts(panLinks_Counts);
        }

        //debug
        Info('调试输出：探测到网盘链接数量' + panLinks_Counts + '个');

        /************************************************ 网盘页面，提取码自动补全功能-开始 ************************************************/
        //百度网盘提取码自动补全
        if (location_pathname.indexOf("/share/") != -1 && $('form input') != null) {
            var code = getCode();
            if (code) {
                // 有提取码时才点击提交按钮
                $('form input').val(code);
                $('form a[title=提取文件]').click();
            }
        }

        // 蓝奏网盘提取码自动补全

        if (location_pathname.indexOf("/fn") == -1 && (location.href).indexOf("/www.lanzous.com/") != -1) {
            var code = getCode();
            if (code) {
                if ($('iframe') != null && $('#blockbyte-bs-sidebar').length < 0) {
                    // 排除chrome书签插件干扰
                    var iframeObj = document.getElementsByTagName('iframe')[0];
                    if (iframeObj) {
                        iframeObj.contentWindow.document.getElementById('pwd').value = code;
                        iframeObj.contentWindow.down_p();
                    }
                } else if ($('#pwdload input#pwd').length > 0) {
                    //第二版输入密码页
                    $('#pwdload input#pwd').val(code);
                    $('input#sub').click();
                } else {
                    //第三版输入密码页

                    //$('#pwd').attr("value",code);
                    document.getElementById('pwd').value = code;
                    down_p();
                }
            }
        }
        /************************************************ 网盘页面，提取码自动补全功能-结束 ************************************************/
    });

})();