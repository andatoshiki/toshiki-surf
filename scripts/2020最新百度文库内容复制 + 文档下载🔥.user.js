// ==UserScript==
// @name         2020最新百度文库内容复制 + 文档下载🔥
// @namespace    https://www.wenku.zone/
// @version      3.1
// @description  百度文库下载卷文档、共享文档、VIP文档等内容复制 + 免费下载助手，长期稳定下载，永久维护更新，内容是爬虫爬来的然后整理下载
// @author       文库社
// @include      *://wenku.baidu.com/view/*
// @require      https://cdn.bootcss.com/jquery/2.1.2/jquery.min.js
// @require      https://cdn.jsdelivr.net/npm/clipboard@2/dist/clipboard.min.js
// ==/UserScript==

(function() {
    'use strict';


    var url = window.location.href;
        url = encodeURIComponent(url);
    var urlFree = 'http://www.wenku.zone/?from=youhou&url=' + url;
    var urlPro =  'http://pro.wenku.zone/?from=youhou&url=' + url;

    function addBtn1(){
                var doc_tag_wrap = $(".doc-tag-wrap");
                if(doc_tag_wrap && doc_tag_wrap.length){
                   var download = "<div id='wenkudownload-wenkushe'style='display: block;line-height: 40px; text-align: center;vertical-align: top; background-color: #dd5a57; cursor: pointer; color: #fff;margin-bottom: 20px;'><a href='"
                   +urlFree+"' target='_blank' style='font-size:16px;color:#fff;display: block; height: 100%; padding: 2px 10px;'>下载此文档(免费版)</a></div>";
                   $(".doc-tag-wrap").prepend(download);
                }else{
                  var download2 = "<div id='wenkudownload-wenkushe'style='display: block;line-height: 40px; text-align: center; vertical-align: top;background-color: #dd5a57; cursor: pointer; color: #fff; margin-bottom: 20px; position: fixed; left: 0; top: 260px; width: 83px; z-index: 9999; '><a href='"
                  +urlFree+"' target='_blank' style='font-size:16px;color:#fff;display: block; height: 100%; padding: 2px 10px;'>下载此文档(免费版)</a></div>";
                  $("body").append(download2);
                };
    }
     function addBtn2(){
                var doc_tag_wrap = $(".doc-tag-wrap");
                if(doc_tag_wrap && doc_tag_wrap.length){
                   var download = "<div id='wenkudownload-wenkushe-pro'style='display: block;line-height: 40px; text-align: center; vertical-align: top; background-color: #25ae84; cursor: pointer; color: #fff;margin-bottom: 2px;'><a href='"
                   +urlPro+"' target='_blank' style='font-size:16px;color:#fff;display: block; height: 100%; padding: 2px 10px;'>下载此文档(专业版)</a></div>";
                   $(".doc-tag-wrap").prepend(download);
                }else{
                  var download2 = "<div id='wenkudownload-wenkushe-pro'style='display: block;line-height: 40px; text-align: center; vertical-align: top; background-color: #25ae84; cursor: pointer; color: #fff; margin-bottom: 2px; position: fixed; left: 0; top: 358px; width: 83px; z-index: 9999;'><a href='"
                  +urlPro+"' target='_blank' style='font-size:16px;color:#fff;display: block; height: 100%; padding: 2px 10px;'>下载此文档(专业版)</a></div>";
                  $("body").append(download2);
                };
    }

    function addCopyBtn(){
        document.body.onmouseup = function(){
            var copyText = getSelectedText();
            console.log(copyText)
            $('body').prepend('<button class="copy-button-wenkuseh" data-clipboard-text="'+ copyText +'" style=" ">复制</button>');
            new ClipboardJS('.copy-button-wenkuseh');
            $('.copy-button-wenkuseh').click();
            $('.copy-button-wenkuseh').remove()
        };

    }

    function initCopyBtn(){
            var clipboard = new ClipboardJS('#reader-copy-button-wenkuseh');
            clipboard.on('success', function(e) {
                console.info('Text:', e.text);
                e.clearSelection();
            });
            clipboard.on('error', function(e) {
                alert('复制失败，联系作者修复')
            });
    }


    function getSelectedText() {
   if (window.getSelection) {
     return window.getSelection().toString();
   }else if (document.getSelection) {
     return document.getSelection();
   }else if (document.selection) {
     return document.selection.createRange().text;
   }
 }

    addBtn1();
    addBtn2();
    addCopyBtn();

})();