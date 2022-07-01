// ==UserScript==
// @name hide Inoreader AD
// @description hide remove Inoreader AD 
// @version 1.0.19
// @grant none
// @noframes
// @include http://*.inoreader.com/*
// @include https://*.inoreader.com/*
// @icon http://www.inoreader.com/favicon.ico
// @namespace   https://greasyfork.org/zh-CN/scripts/8973-hide-inoreader-ads
// @copyright  反馈和建议(feedback)E-mail: nolazyload@foxmail.com
// ==/UserScript==
var styleEl = document.createElement('style');
styleEl.type = 'text/css';
styleEl.innerHTML = `
.block_article_ad,
.ad_title,
#consent_bbb,
#sinner_container,
#sb_rp_upgrade_button,
div.trc_rbox_container,
div.ad_size_large_rectangle,
div[class^='inno_dialog_modal_overlay'],
div[class^='inno_dialog_scroll_overlay'],
div.sinner_under_footer{display: none !important;}
#reader_pane.reader_pane_sinner{padding-right:0px;}
#folder_dialog_wrapper,
#login_dialog_wrapper,
#xconfirm_modal_overlay,
#xconfirm_scroll_overlay,
#folder_dialog_scroll_overlay,
#folder_dialog_modal_overlay,
#rule_dialog_scroll_overlay,
#rule_dialog_modal_overlay,
#feed_info_dialog_scroll_overlay,
#feed_info_dialog_modal_overlay,
#subscription_dialog_modal_overlay,
#subscription_dialog_scroll_overlay,
#send_email_dialog_scroll_overlay,
#send_email_dialog_modal_overlay,
#preferences_dialog_scroll_overlay,
#preferences_dialog_modal_overlay,
#folder_dialog_scroll_overlay,
#page2rss_dialog_modal_overlay,
#page2rss_dialog_scroll_overlay,
#page2rss_dialog_wrapper,
#page2rss_dialog,
#preferences_dialog_modal_overlay,
#preferences_dialog_scroll_overlay,
#keyboard_shortcuts_dialog_modal_overlay,
#keyboard_shortcuts_dialog_scroll_overlay,
#folder_dialog_modal_overlay{display: block !important;}
`;
document.documentElement.appendChild(styleEl);

