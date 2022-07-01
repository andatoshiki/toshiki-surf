// ==UserScript==
// @name               卡饭论坛开启附件和图片普通上传
// @namespace          a@b.c
// @author             by Q4 & YYK
// @include            https://bbs.kafan.cn/thread-*
// @include            https://bbs.kafan.cn/forum.php?mod=post&action=*
// @description        开启普通上传，解决64位firefox下flash上传失败问题。
// @homepage           https://bbs.kafan.cn/forum.php?mod=redirect&goto=findpost&ptid=2122475&pid=41934425
// @charset            UTF-8
// @grant              none
// @run-at             document-end
// ==/UserScript==

document.querySelector('#e_btn_upload').style.display='';
document.querySelector('#e_btn_local').style.display='';