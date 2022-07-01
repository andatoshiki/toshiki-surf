// ==UserScript==
// @id                 tieba_simple_picview
// @name           百度贴吧科学看图君
// @version         2019.12.22
// @namespace   jiayiming
// @author          jiayiming
// @description   去除百度贴吧的连续看图模式，改为点击新标签打开无水印原图，同时支持帖子预览中“查看大图”按钮。
// @include         *://tieba.baidu.com/p/*
// @include         *://tieba.baidu.com/f?*
// @include         *://tieba.baidu.com/i/*
// @homepageURL  https://greasyfork.org/scripts/784/
// @require          https://code.jquery.com/jquery-3.3.1.slim.min.js
// ==/UserScript==

(function () {

    // 列表 j_ypic    i贴吧 j_full
    $(document).on('mousedown', '.j_ypic, .j_full', function () {
        const id = new URL(this.href);
        let url;
        if (id.searchParams.has('pic_id')) {
            url = new URL($('.media_bigpic_wrap>img')[$('.j_ypic, .j_full').index(this)].src);
            this.href = `https://${url.host}/forum/pic/item/${id.searchParams.get("pic_id")}.jpg`;
        }
    });

    // 帖子
    $(document).on('mousedown', '.BDE_Image', function () {
        $(this).off('click');

		this.onclick = function(e){
            if (e.button == 0) {
                const url = new URL(this.src);
                window.open(`https://${url.host}/forum/pic/item/${url.pathname.split('/').pop()}`);
            }
        }
    });

})();