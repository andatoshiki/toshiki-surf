// ==UserScript==
// @name         ð¥æç»­æ´æ°ð¥ CSDNå¹¿åå®å¨è¿æ»¤ãäººæ§åèæ¬ä¼åï¼ð ä¸ç¨åç»å½äºï¼è®©ä½ ä½éªä»¤äººæåçå´­æ°CSDNã
// @namespace    https://github.com/adlered
// @version      3.3.5
// @description  â¡ï¸æ¥ææ°é¡¹ç¬å®¶åè½çæå¼ºCSDNèæ¬ï¼ä¸ææ¯ä¸æ¯â¡ï¸|ð¶æ éç»å½CSDNï¼è·å¾æ¯ä¼åæ´ä½³çä½éª|ð¥åè¾¨çèªééï¼åå±ä¸ç¨æ»å¨|ð¾è¶çº§é¢ä¼å|ðç¬å®¶è¶çº§åä¼å|ð·ç¬å®¶ååæç« åç»å½å±å¼|ðç¬å®¶æ¨èåå®¹èªç±å¼å³|ð ç¬å®¶åç»å½å¤å¶|ðç¬å®¶é²å¤é¾éå®å|ðç¬å®¶è®ºåæªç»å½èªå¨å±å¼æç« ãè¯è®º|ðµå¨é¢åå|ðæ²æµ¸éè¯»|ð§´åååªè´´æ¿|ðä½èä¿¡æ¯æç« é¡¶é¨å±ç¤º
// @author       Adler
// @connect      www.csdn.net
// @include      *://*.csdn.net/*
// @require      https://cdn.jsdelivr.net/npm/jquery.cookie/jquery.cookie.js
// @require      https://cdn.jsdelivr.net/npm/nprogress@0.2.0/nprogress.js
// @require      https://cdn.jsdelivr.net/npm/clipboard@2.0.6/dist/clipboard.min.js
// @supportURL   https://github.com/adlered/CSDNGreener/issues/new?assignees=adlered&labels=help+wanted&template=ISSUE_TEMPLATE.md&title=
// @contributionURL https://doc.stackoverflow.wiki/web/#/21?page_id=138
// @grant        GM_addStyle
// @note         20-07-05 3.3.5 è¯è®ºå¤å¶åè½äº¤äºä¼å
// @note         20-07-04 3.3.4 ä¿®å¤å³ä¾§æ æ¶å¤±çé®é¢
// @note         20-07-03 3.3.3 æ°å¢å¤å¶è¯è®ºåè½ï¼å é¤é¡¶é¨å¹¿å
// @note         20-06-28 3.3.2 æç¤ºä¿®æ¹
// @note         20-06-27 3.3.1 å¼¹çªæç¤ºé»è¾ä¿®æ¹ä¸ºä»æç¤ºä¸æ¬¡ã
// @note         20-06-27 3.3.0 ç½ç«æ é¢æ°æ¶æ¯æéå»é¤
// @note         20-06-26 3.2.9 æ¢å¤GreasyForkå¹³å°èæ¬æ¯æ
// @note         20-06-21 3.2.0 èæ¬è¿ç§»éç¥
// @note         20-06-21 3.1.9 å¢å èªå¨éèåºæ åè½
// @note         20-06-21 3.1.8 å¢å èªå¨éèé¡¶æ åè½ï¼ä¿®å¤éé¡¹çªå£è¢«ç¹èµé¿æ¡æ¡ä½çBugï¼éé¡¹çªå£å¸å±ä¿®æ¹
// @note         20-06-20 3.1.7 è®¾ç½®çªå£å¤§å°åºå®ï¼å¢å æèµå¥å£
// @note         20-06-19 3.1.6 æ¾ç¤ºæ¨èåå®¹æé®åå½ï¼æ°å¸å±ç´§æ¥ä¿®å¤
// @note         20-06-18 3.1.5 èªå®ä¹åè½æ´æ°
// @note         20-06-16 3.1.4 æ¯æå¤§é¨ååè½æ¨¡ååæ¾ç¤º
// @note         20-06-14 3.1.3 ç»¿åè®¾å®ä¼å
// @note         20-06-14 3.1.2 ISSUEæ¨¡æ¿è°æ´Support URL
// @note         20-06-14 3.1.1 å¢å æåä¸»æç« æ¨¡å
// @note         20-06-13 3.1.0 ä¿®å¤è®¾ç½®è¿æçé®é¢
// @note         20-06-12 3.0.9 æ é¢åæ»
// @note         20-06-12 3.0.8 ä¸»é¡µå¹¿åå é¤ï¼ç»¿åè®¾ç½®ä»æ¾ç¤ºå¨æç« é¡µé¢ï¼å é¤é¡µèï¼é¡¶é¨ä¼åï¼è¥å¹²ç»èä¼å
// @note         20-06-11 3.0.7 å¢å å®æ¹QQäº¤æµç¾¤ï¼å¢å å³é­å¼ºå¶ç½è²ä¸»é¢åè½
// @note         20-06-11 3.0.6 ç¨æ·åçåè½ä¼å
// @note         20-06-11 3.0.5 ä¼åå è½½éåº¦
// @note         20-06-10 3.0.4 ä¿®å¤è®¾ç½®çé¢é®æ¡çé®é¢ï¼æ¾ç¤ºåä¸»å¤´å
// @note         20-06-09 3.0.3 é»è®¤è®¾å®ä¿®æ¹
// @note         20-06-09 3.0.2 ä¿®å¤æ¨èåå®¹æé®å·æ°ä¸çæçé®é¢ï¼å¢å å·¥å·ç®±æç¤ºæ¡
// @note         20-06-08 3.0.1 è®¾ç½®ä¸­å¿æ¨åºï¼å¢å æµè§ææéé¡¹ && Green Book Icon Update
// @note         20-06-08 3.0.0 è®¾ç½®ä¸­å¿æ¨åºï¼å¢å æµè§ææéé¡¹
// @note         20-06-07 2.4.2 è®¾ç½®è§£è¦ï¼ä¸ä¸ªçæ¬æéç½®ä¸­å¿
// @note         20-06-06 2.4.1 ä¿®å¤æç« åå®¹æ¶å¤±çé®é¢
// @note         20-06-04 2.4.0 ä¿®å¤æ¨èæé®éä½çé®é¢
// @note         20-06-04 2.3.9 çªå±ééä¼å
// @note         20-06-04 2.3.8 é»å¤æ¨¡å¼åºç°é®é¢ï¼ç´§æ¥åæ¡£å° 2.3.6
// @note         20-06-03 2.3.7 æè°¢ @AlexLWT å¢å é»ææ¨¡å¼
// @note         20-06-02 2.3.6 AdsByGoogle å é¤
// @note         20-05-25 2.3.5 æè°¢ @RyanIPO ä¿®å¤ Cannot read property 'replace' of undefined æ¥éçé®é¢
// @note         20-05-24 2.3.4 ä¿®å¤åç»å½å¤å¶åè½
// @note         20-05-22 2.3.3 Logoä¸èæ¯åæ­¥
// @note         20-05-22 2.3.2 æ·±åº¦å é¤èæ¯
// @note         20-05-20 2.3.1 éè¿requireä½¿ç¨NProgress
// @note         20-05-20 2.3.0 æ¾ç¤ºæ¨èåå®¹æé®æ ·å¼åç½®ï¼åé¤CDN
// @note         20-05-17 2.2.9 è¿åº¦æ¡æ ·å¼æ´æ°ï¼æ¶é´å»¶æ¶ä¼å
// @note         20-05-17 2.2.8 æ´æ°èæ¬æè¿°ï¼å±å¼è¯è®ºçææåå¤ï¼å é¤åä½ä¸­å¿æé®ï¼å è½½è¿åº¦æ¡
// @note         20-05-17 2.2.7 æ´æ°èæ¬æè¿°
// @note         20-05-16 2.2.6 ä¿®å¤ç¬¬ä¸æ¬¡ç¹å»æ¾ç¤ºæ¨èåå®¹æ ååºçé®é¢
// @note         20-05-16 2.2.5 å é¤æ¢æ²åè§æ ï¼ä¿®æ¹æ¾ç¤ºæ¨èåå®¹æé®æ ·å¼
// @note         20-05-16 2.2.4 æè°¢æ¥èªGitHubçæåâHeronZhangâçIssueå»ºè®®ï¼å é¤ææåå®¢è±éè¡å¨çèæ¯ï¼ä¸»é¡µåç±»ä¸­å¹¿åæ¸é¤ï¼CSSæ ·å¼æ§å¶å®½åº¦ééä»£ç ä¼å
// @note         20-05-16 2.2.3 æè°¢æ¥èªGitHubçæåâRetiredWorldâçä»£ç è´¡ç®ï¼ä½¿ç¨CSSæ¥æ§å¶æ ·å¼ï¼èä¸æ¯JSï¼å¢å¤§çµæ´»æ§ã
// @note         20-05-13 2.2.2 å±è½æ¨çç¼©æ¾ä¸æ¯100%çæç¤º
// @note         20-04-29 2.2.1 æè°¢å¤§å®¶çæ¯æï¼å¢å ç®å½æ¾ç¤ºï¼èªå¨å¤æ­æ¯å¦å­å¨ç®å½è°æ´é¡µé¢å®½åº¦ï¼å±è½æ°å¢å¹¿åï¼æ¬¢è¿å¤§å®¶ä½éªå¹¶æåºæè§ï¼
// @note         20-04-15 2.2.0 ä¸äºå¹¿åè¢«å¶ä»æä»¶å±è½å¯¼è´çå¼å¸¸æ è§ä¹
// @note         20-03-30 2.1.9 å¹²æâè®°å½ä½ çåä½åç¨âï¼å¹²ææªç»å½æåµä¸çè§æ æé
// @note         20-03-13 2.1.8 çªå±ééå å¼º
// @note         20-03-13 2.1.7 æ´æ°ç®ä»
// @note         20-03-12 2.1.6 å®½åº¦èªéåºï¼æè°¢æ¥èªGitHubçæåLeonG7çå»ºè®®ï¼ï¼ä¿®å¤åªè´´æ¿ååæ æçé®é¢ã
// @note         20-03-04 2.1.5 ééAdGuard
// @note         20-02-27 2.1.4 ä¼ååç»å½å¤å¶
// @note         20-02-25 2.1.3 åç»å½å¤å¶æ´æ°ï¼ç°å·²å¯ç¨
// @note         20-02-24 2.1.2 By Github@JalinWang æ´æ¹å»é¤åªè´´æ¿å«æçæ¹å¼ï¼ä½¿å¾åææ ¼å¼å¨å¤å¶æ¶è½å¤ä¿ç
// @note         20-02-22 2.1.1 ç´§æ¥ä¿®å¤ç±äº CSDN ä¿®æ¹åç«¯ç»æå¯¼è´çæç« éä½
// @note         20-02-11 2.1.0 è¥å¹²å¨ç»ä¼åï¼è§è§ä½éªæ´æµç
// @note         20-02-06 2.0.9 æ­¦æ±å æ²¹ï¼ä¿®æ¹æ¨èåå®¹åæ¢å¼å³ä½ç½®ï¼åå°è¿åæ
// @note         20-01-17 2.0.8 å»é¤å³ä¾§å¹¿å
// @note         20-01-17 2.0.7 æè°¢æ¥èªGitHubçæåâgleansâçå»ºè®®ï¼å»æé¡µå¤´å¹¿å
// @note         19-12-12 2.0.6 æè°¢æ¥èªGitHubçæåâyexuesongâçå»ºè®®ï¼å°ä½èä¿¡æ¯å¨æç« é¡¶é¨å±ç¤º
// @note         19-10-30 2.0.5 ç¾åéèæé®ï¼å¢å ç¹å»å¨ç»
// @note         19-10-30 2.0.4 å é¤CSDNå®æ¹å¨ä¸»é¡µæ¨éçæç« ï¼å¤§å¤æ¯å¹¿åï¼
// @note         19-10-30 2.0.3 æ·»å æ´å¤å±è½èæ¬
// @note         19-10-30 2.0.0 ç¥èªå·±çæ¥å¿«ä¹~å®å¨éåCSDNGreenerï¼ç»ä¸ä½¿ç¨JQueryï¼æçæ´é«
// @note         19-10-27 1.5.2 å é¤åäº«æµ·æ¥æç¤º&&æè°¢GitHubçæåâCHN-STUDENTâçåé¦ï¼å»é¤åºé¨è¯¾ç¨æ¨è
// @note         19-10-27 1.5.1 æè°¢æ¥èªGitHubçæåâCHN-STUDENTâçç»è´å¤ç°åé¦ï¼å»é¤äºåºé¨çè¯¾ç¨æ¨èå¹¿å
// @note         19-10-04 1.5.0 ç§»é¤äºåºé¨ä¸»é¢ä¿¡æ¯åæèµ
// @note         19-09-10 1.4.9 æè°¢æ¥èªGitHubçæåâprogrammerZeâçç»è´å¤ç°åé¦ï¼ä¿®å¤äºè¯è®ºåºç¹å»æ¥çåå¤åï¼å·²ç»å±å¼çè¯è®ºä¼æ¶èµ·çé®é¢
// @note         19-09-04 1.4.8 æè°¢æ¥èªGitHubçæåâdwdcthâçç»è´å¤ç°åé¦ï¼ç°å¨æ¥çååæç« ä¸ä¼æ éå¼¹ç»å½çªå£äºï¼ä¸å å¼ºäºèªå¨å±å¼åè½
// @note         19-08-20 1.4.7 æè°¢æ²¹åç¨æ·âSupremeSirâçåé¦ï¼ä¿®å¤äºå³ä¾§æ¬æµ®æ é®æ¡æç« çé®é¢
// @note         19-08-14 1.4.6 æ è¯­ãåæ´æ°çåç»å½å¤å¶ï¼åæ¹äºãä¿®å¤ï¼
// @note         19-08-13 1.4.5 æ´æ°äºç¬å®¶åè½ï¼åç»å½å¤å¶
// @note         19-08-13 1.4.4 æè°¢æ¥èªGitHubçæåâiamsunxingâçåé¦ï¼ä¿®å¤äºé¡¶é¨ä¸è´´è¾¹çé®é¢
// @note         19-08-01 1.4.3 æè°¢æ²¹åç¨æ·âddddyâçåé¦ï¼å»é¤äºæ´å¤æ¨å¹¿å¹¿å
// @note         19-07-30 1.4.2 æè°¢æ²¹åç¨æ·âå¨ä¹æ°âçåé¦ï¼å¢å äºé²CSDNå¤é¾éå®åçåè½ï¼CSDNè­æµæ°ï¼
// @note         19-07-20 1.4.1 ä¿®å¤äºæ¨èåå®¹å¼å³è·¨æç« æ æé®é¢ï¼å¿äºéç½®Cookieä½ç¨åï¼
// @note         19-07-19 1.4.0 1. ææ¶å¤§æ´æ° 2. æè°¢æ¥èªGitHubçæå"lukemin"çåé¦ï¼å å¥äºä¸æ¹æ¨èåå®¹æ¯å¦éèå¼å³ï¼å®ç¨ï¼
// @note         19-07-13 1.3.0 æè°¢æ¥èªGitHubçæåâHolaplaceâçåé¦ï¼ä¿®å¤äºæç« æ æ³èªå¨å±å¼çé®é¢ï¼CSDNæ»æ¹è¿ä¸ªï¼ä»¤äººå¤´ç¼ï¼
// @note         19-06-08 1.2.6 æè°¢æ²¹åç¨æ·âDeskyAkiâçåé¦ï¼ä¿®å¤äºæç« æ æ³èªå¨å±å¼çé®é¢
// @note         19-06-07 1.2.4 ä¿®å¤äºç»å½åè¯è®ºæ æ³æ­£å¸¸æå¼çé®é¢
// @note         19-06-07 1.2.3 æè°¢æ²¹åç¨æ·"æ°¸è¿çæ®¿ä¸"çåé¦ï¼å¨ä¸ä¸åçåªåæ»åä¸ï¼ç»äºå®ç°äºæªç»å½å±å¼è¯è®ºçè¯­å¥
// @note         19-06-05 1.2.0 ä¿®å¤äºè¯è®ºæ æ³èªå¨å±å¼çBUG
// @note         19-06-04 1.1.9 ä¿®å¤äºæ æ³èªå¨å±å¼çBUGï¼èªé­äºï¼
// @note         19-06-04 1.1.6 CSDNå¤ªåäºï¼æâæ¶æ¯âæé®çClassè®¾ç½®æäºâGitChatâï¼æä»¥ä¿®å¤äºâæ¶æ¯âæé®æ¶å¤±çé®é¢
// @note         19-06-04 1.1.5 1. ä¼åäºè®ºåä½éª 2.ç¾åãä¼åä»£ç ç»æ
// @note         19-06-04 1.1.4 æè°¢æ¥èªGitHubçæåâiamsunxingâçåé¦ï¼å¢å äºè®ºåå¹¿åå¹éè§å
// @note         19-06-03 1.1.3 æè°¢æ¥èªGitHubçæåâwangwei135âçåé¦ï¼å»é¤äºè¯è®ºåºä¸æ¹çå¹¿å
// @note         19-05-27 1.1.2 æè°¢æ²¹åç¨æ·âå¤ä¼æ°âçåé¦ï¼ä¿®å¤äºå¯ææ¬ç¼è¾å¨æ æ³ä½¿ç¨çé®é¢
// @note         19-05-25 1.1.0 1. ä¿®å¤äºä¸»é¡µå¹¿åçé®é¢ 2. è®ºåèªå¨å±å¼ 3. è®ºåå¹¿åæ¶é¤
// @note         19-05-25 1.0.9 æè°¢æ²¹åç¨æ·âæ¸£æ¸£ä¸åè¯´è¯âçåé¦ï¼ä¿®å¤äºæ¶èæé®æ¶å¤±çé®é¢
// @note         19-03-01 1.0.3 æ·»å é¡µé¢éæ©æ§è¿æ»¤è§å
// @note         19-03-01 1.0.2 å¢å äºåååªè´´æ¿åè½
// @note         19-03-01 1.0.1 ä¿®å¤äºæçé®é¢, ä¼åäºä»£ç ç»æ
// @note         19-02-26 1.0.0 åçåå¸
// ==/UserScript==
var version = "3.3.5";
var currentURL = window.location.href;
var list;
var windowTop = 0;

// èªå®ä¹ CSS
// è¿åº¦æ¡
$('head').append("<style>#nprogress{pointer-events:none}#nprogress .bar{background:#f44444;position:fixed;z-index:1031;top:0;left:0;width:100%;height:2px}#nprogress .peg{display:block;position:absolute;right:0;width:100px;height:100%;box-shadow:0 0 10px #f44444,0 0 5px #f44444;opacity:1;-webkit-transform:rotate(3deg) translate(0,-4px);-ms-transform:rotate(3deg) translate(0,-4px);transform:rotate(3deg) translate(0,-4px)}#nprogress .spinner{display:block;position:fixed;z-index:1031;top:15px;right:15px}#nprogress .spinner-icon{width:18px;height:18px;box-sizing:border-box;border:solid 2px transparent;border-top-color:#f44444;border-left-color:#f44444;border-radius:50%;-webkit-animation:nprogress-spinner .4s linear infinite;animation:nprogress-spinner .4s linear infinite}.nprogress-custom-parent{overflow:hidden;position:relative}.nprogress-custom-parent #nprogress .bar,.nprogress-custom-parent #nprogress .spinner{position:absolute}@-webkit-keyframes nprogress-spinner{0%{-webkit-transform:rotate(0)}100%{-webkit-transform:rotate(360deg)}}@keyframes nprogress-spinner{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}</style>");
// å¼¹åºçªå£
$('head').append("<style>.black_overlay{top:0%;left:0%;width:100%;height:100%;background-color:#000;z-index:1001;-moz-opacity:0.8;opacity:.10;filter:alpha(opacity=88)}.black_overlay,.white_content{display:none;position:absolute}.white_content{z-index:9999!important;top:25%;left:25%;width:650px;height:60%;padding:20px;border:0px;background-color:#fff;z-index:1002;overflow:auto}</style>");
// æç¤ºæ¡
$('head').append("<style>.tripscon{padding:10px}</style>");
// æé®ï¼æ§ï¼
$('head').append("<style>#toggle-button{display:none}.button-label{position:relative;display:inline-block;width:82px;background-color:#ccc;border:1px solid #ccc;border-radius:30px;cursor:pointer}.circle{position:absolute;top:0;left:0;width:30px;height:30px;border-radius:50%;background-color:#fff}.button-label .text{line-height:30px;font-size:18px;-webkit-user-select:none;user-select:none}.on{color:#fff;display:none;text-indent:10px}.off{color:#fff;display:inline-block;text-indent:53px}.button-label .circle{left:0;transition:all .3s}#toggle-button:checked+label.button-label .circle{left:50px}#toggle-button:checked+label.button-label .on{display:inline-block}#toggle-button:checked+label.button-label .off{display:none}#toggle-button:checked+label.button-label{background-color:#78d690}</style>");
// ä¿å­æé®
$('head').append("<style>#save{background-color:#19a4ed;border:none;color:#fff;padding:10px 20px;text-align:center;text-decoration:none;display:inline-block;font-size:14px;margin:15px 0px;cursor:pointer}</style>");

// jquery.showtips.js
(function(jQuery) {
	jQuery.fn.showTips = function(options,elem){
		var config = {
			skin:"trips",
			content:$(this).attr("tips")||"å¼¹åºç±»åçæ°æ³¡æç¤ºï¼",  //æ°æ³¡æç¤ºåå®¹éé¢å¯ä»¥æ¯HTMLï¼é»è®¤æ¾ç¤ºèªå®ä¹çæç¤ºåå®¹
			width:"auto",  //é»è®¤ä¸ºautoï¼å¯ä»¥åå·ä½å°ºå¯¸å¦ï¼200
			alignTo:["right","center"],  //ç®­å¤´æ¹å
			color:["rgb(247, 206, 57)","#FFFEF4"],  //è¿éæ¯æç¤ºå±çé£æ ¼ï¼ç¬¬ä¸ä¸ªåæ°ä¸ºæç¤ºè¾¹æ¡é¢è²ï¼ç¬¬äºä¸ªåæ°ä¸ºæç¤ºèæ¯é¢è²
			type:"html",   //æ¾ç¤ºåå®¹ç±»å
			trigger:"click",    //é»è®¤ä¸ºç¹å»æ¾ç¤ºï¼showä¸ºåå§åå°±æ¾ç¤ºï¼hoverä¸ºç»è¿æ¾ç¤ºï¼focusç¦ç¹æ¾ç¤ºï¼mouseè·éé¼ æ æ¾ç¤ºéè
			spacing:10,  //é»è®¤ä¸ºç®­å¤´è·ç¦»å¯¹è±¡çå°ºå¯¸
			customid:"",  //èªå®ä¹ID
			isclose:false,   //æ¯å¦æ¾ç¤ºå³é­æé®
			success : null    //æååçåè°å½æ°
		};
		var opts = jQuery.extend(config, options);
		return this.each(function(){
			var that = jQuery(this),tipBox,tipId,selfH,selfW,conId,docW, spa = opts.spacing, skin=opts.skin;
			var Mathrandom = Math.floor(Math.random() * 9999999);
            var pmr = (opts.customid=="") ? Mathrandom :opts.customid.replace(/[#.]/, "");
			var pointer=opts.alignTo.length===1 ? ''+opts.alignTo[0]+'' : ''+opts.alignTo[0]+'-'+opts.alignTo[1]+'';

			if(typeof elem == 'string') {
				if(elem =="show"){
					jQuery('#tip'+pmr).show();  jQuery("#con"+pmr).html(opts.content);
					showPosition(pointer,jQuery('#tip'+pmr));
					};
				if(elem =="hide"){jQuery('#tip'+pmr).hide()};
			};
			if(typeof elem == '' || typeof elem == undefined){return true};
			if(jQuery('#tip'+pmr).length==1){return false;}
			tipBox=jQuery('<div class="'+skin+' '+skin+'-'+pointer+'" id="tip'+pmr+'"><i></i><em></em><div class="'+skin+'con" id="con'+pmr+'"></div></div>').appendTo(document.body);
			tipId = jQuery("#tip"+pmr);
			conId = jQuery("#con"+pmr);

			var edgecolor='border-'+opts.alignTo[0]+'-color', tfi=tipId.find("i"), tfem=tipId.find("em"), tfiem=tipId.find("i,em");
			tipId.css({'position':'absolute',border:'1px solid','border-color':opts.color[0],'background-color':opts.color[1]});
			if(opts.alignTo[1]=='center'){ var offpos=50,percen="%"; }else{ var offpos=5,percen="px"; };
			tfiem.css({width:0,height:0,content:'','position':'absolute'})
			tfi.css({border:'8px solid transparent','z-index':5});
			tfem.css({border:'7px solid transparent','z-index':10});
			switch (pointer) {
				case 'top-center':
				case 'bottom-center':
				case 'top-left':
				case 'bottom-left':
					var poi="left";
					if(pointer=='top-center' || pointer=='bottom-center'){
						tfi.css({"margin-left":"-8px"});
						tfem.css({"margin-left":"-7px"});
					}
				    break;
				case 'left-center':
				case 'right-center':
				case 'left-top':
				case 'right-top':
					var poi="top";
					if(pointer=='left-center' || pointer=='right-center'){
						tfi.css({"margin-top":"-8px"});
						tfem.css({"margin-top":"-7px"});
					}
				    break;
				default:
					var poi="right";
				    break;
			};

			if(pointer=='follow'){
				tfi.css({'border-bottom-color':opts.color[0],left:''+offpos+percen+'',bottom:'100%'});
				tfem.css({'border-bottom-color':opts.color[1],left:''+(offpos+(opts.alignTo[1]=='center'?0:1))+percen+'',bottom:'100%'});
			}else{
				tfi.css(edgecolor,opts.color[0]).css(poi,''+offpos+percen+'');
				tfem.css(edgecolor,opts.color[1]).css(poi,''+(offpos+(opts.alignTo[1]=='center'?0:1))+percen+'');
				tfiem.css(opts.alignTo[0],'100%');
			};

			switch (opts.type) {
				case 'html':conId.html(opts.content); break;
				case 'id'  :
				    var tempid=jQuery(opts.content) ,wrap = document.createElement("div");
					if(tempid.css("display") == "none"){  tempid.css({display:"block"}); }
					conId.append(tempid);
				    break;
			};
			if(opts.isclose){
				jQuery('<span class="'+skin+'close" id="close'+pmr+'">&times;</span>').appendTo(tipId);
				tipId.find("#close"+pmr+"").on("click",function(){tipId.hide();});
			}

			if(typeof opts.width === 'string'){
				docW = parseInt(document.body.clientWidth*(opts.width.replace('%','')/100));
				(typeof opts.width == 'auto' || typeof opts.width == '') ? tipBox.css({width:'auto'}) : tipBox.css({width:docW});
				tipBox.height();
			}else{
				tipBox.width(opts.width).height();
			}
            function showPosition(pointer,cell){
				var selfH = that.outerHeight(true), selfW = that.outerWidth(true);
				var post=that.offset().top, posl=that.offset().left;
				var tipCell=(cell=="" || cell==undefined) ? tipId : cell;
			    var tipH=tipCell.outerHeight(true), tipW=tipCell.outerWidth(true);

				switch (pointer) {
					case 'top-left': tipCell.css({top:post-tipH-spa,left:posl}); break;
					case 'top-center': tipCell.css({top:post-tipH-spa,left:posl-(tipW/2)+(selfW/2)}); break;
					case 'top-right': tipCell.css({top:post-tipH-spa,left:posl-(tipW-selfW)}); break;
					case 'bottom-left': tipCell.css({top:post+selfH+spa,left:posl}); break;
					case 'bottom-center': tipCell.css({top:post+selfH+spa,left:posl-(tipW/2)+(selfW/2)}); break;
					case 'bottom-right': tipCell.css({top:post+selfH+spa,left:posl-(tipW-selfW)}); break;
					case 'left-top': tipCell.css({top:post,left:posl-tipW-spa}); break;
					case 'left-center': tipCell.css({top:post-(tipH/2)+(selfH/2),left:posl-tipW-spa}); break;
					case 'right-top': tipCell.css({top:post,left:posl+selfW+spa}); break;
					case 'right-center': tipCell.css({top:post-(tipH/2)+(selfH/2),left:posl+selfW+spa}); break;
					case 'follow': that.mousemove(function(e) { tipCell.css({top:e.pageY + 30,left:e.pageX - 6}); }); break;
				};
			}
			tipBox.hide();
			switch (opts.trigger){
				case 'show':showPosition(pointer);tipBox.show();break;
                case 'click':that.click(function(){showPosition(pointer);tipBox.show();});break;
				case 'hover':that.hover(function(){showPosition(pointer);tipBox.show(); tipBox.on("mouseover",function(){jQuery(this).show()}).on("mouseout",function(){jQuery(this).hide()})},function(){tipBox.hide();});break;
				case 'focus':that.focus(function(){showPosition(pointer);tipBox.show();});  that.blur(function(){tipBox.hide();});break;
				case 'mouse':that.hover(function(){showPosition(pointer);tipBox.show();},function(){tipBox.hide();});break;
			};
			setTimeout(function(){opts.success && opts.success();}, 1);
		});
	}
})(jQuery);

(function () {
    'use strict';

    l("CSDNGreener V" + version);
    NProgress.start();

    setTimeout(function() {
        var blockURL = currentURL.split("/").length;
        var main = /(www\.csdn\.net\/)$/;
        var mainNav = /nav/;
        var article = /article/;
        var bbs = /bbs\.csdn\.net/;
        var blog = /blog\.csdn\.net/;
        var blog2 = /\/article\/list\//;
        var download = /download\.csdn\.net/;
        var login = /passport\.csdn\.net/;
        var zone = /me\.csdn\.net/;
        var other = /(www\.csdn\.net\/)/;

        // æ°ç»åå§å
        list = [];
        // å¤´é¨å
        // APP
        // put(".app-app");
        // VIP
        put(".vip-caise");
        // è®°å½ä½ çæé¿åç¨ï¼è®°ä¸ªæ¯ï¼
        put("#writeGuide");
        // æ°éç¥å°åç¹ï¼æªç»å½ææ¶æï¼
        if ($(".userinfo a").text() === 'ç»å½/æ³¨å') {
            put("#msg-circle");
        }
        // é¡¶é¨è°·æ­å¹¿å
        put(".adsbygoogle");
        // æ¬æµ®å¨é¡¶æ æé®ä¸åºç°çäºç»´ç 
        put(".appControl");
        // é¡¶é¨å¹¿å
        put(".advert-bg");

        if (main.test(currentURL) || mainNav.test(currentURL)) {
            l("æ­£å¨ä¼åä¸»é¡µä½éª...");
            // å¸¸è§
            // å¤´é¨å¹¿å
            put(".banner-ad-box");
            // åµå¥å¹¿å
            put("#kp_box_211");
            // å³ä¾§å¹¿å
            put(".slide-outer");
            // å³ä¾§è¯¦æ
            put(".persion_article");
            // å³ä¾§æ¨è
            $(".feed_company").parent().remove();
            clean(10);
            common(5, 10);
            loop(1);
        } else if ((blog.test(currentURL) && blockURL === 4) || blog2.test(currentURL)) {
            l("æ­£å¨ä¼åä¸ªäººåå®¢ä¸»é¡µä½éª...");
            // å¸¸è§
            // å¤´é¨å¹¿å
            put(".banner-ad-box");
            // å³ä¾§å¹¿å
            put(".slide-outer");
            // å³ä¾§è¯¦æ
            put(".persion_article");
            // å·¦ä¾§å¹¿å
            put(".mb8");
            put("#kp_box_503");
            put("#kp_box_214");
            clean(10);
            common(5, 10);
            loop(1);
        } else if (article.test(currentURL)) {
            l("æ­£å¨ä¼åéè¯»ä½éª...");
            // å¸¸è§
            // å³ä¾§å¹¿åï¼æ¾å°ç¬¬ä¸ä¸ªæ¸é¤
            // put(".recommend-right");
            put("#addAdBox");
            // put(".aside-box.kind_person.d-flex.flex-column");
            put(".recommend-top-adbox");
            // put(".recommend-list-box.d-flex.flex-column.aside-box");
            // å·¦ä¾§å¹¿å
            // put("#container");
            // å¿«æ¥ååå®¢å§
            put(".blog_tip_box");
            // æ¨èå³æ³¨ç¨æ·
            put(".blog-expert-recommend-box");
            // å³ä¸è§VIP
            put(".meau-gotop-box");
            // å¹¿å
            put(".mediav_ad");
            put(".pulllog-box");
            put(".recommend-ad-box");
            put(".box-shadow");
            put(".type_hot_word");
            put(".fourth_column");
            // é«åè¾¨çæ¶å³ä¾§æç« æ¨è
            // put(".right-item");
            // å¹¿å
            put("#asideFooter");
            put("#ad-div");
            put("#479");
            put("#480");
            // æèµ
            put(".postTime");
            // è¯¾ç¨æ¨è
            put(".t0");
            // åäº«æµ·æ¥
            put(".shareSuggest");
            // åºé¨ä¸»é¢
            put(".template-box");
            // è¯è®ºåºå¹¿å
            put("div#dmp_ad_58");
            // æèµ
            put(".reward-user-box");
            // å³ä¾§æèµæé®
            put(".to-reward");
            // æ¨èåå®¹å¹¿å
            put(".recommend-recommend-box");
            // å³ä¾§å¹¿å
            put(".indexSuperise");
            // æ¢æ²åè§æ 
            put(".comment-sofa-flag");
            // é¡µjio
            put(".bottom-pub-footer");
            // ç»å½æ¥çæªè¯»æ¶æ¯
            put(".toolbar-notice-bubble");
            // å³ä¾§å¹¿å
            put(".recommend-top-adbox");
            clean(10);
            setTimeout(function() {
               // å±å¼è¯è®ºçææåå¤
               $('.btn-read-reply').click();
            }, 1500);
            // ä¸»å¨å å¥å³ä¾§æ 
            if ($(".recommend-right").length === 0) {$("#mainBox").after('<div class="recommend-right  align-items-stretch clearfix" id="rightAside"><aside class="recommend-right_aside"><div id="recommend-right" style="height: 100%; position: fixed; top: 52px; overflow: scroll;"></div></aside></div>');}
            // ç»¿åè®¾ç½®
            common(6, 1);
            // å±å¹éé
            common(4, 1);
            // è¯è®º
            common(1, 30);
            // å¶å®
            common(2, 20);
            // é¡¶é¨æ¾ç¤ºä½èä¿¡æ¯
            common(8, 1);
            // å¾ªç¯çº¿ç¨å¼å§
            loop(2);
        } else if (bbs.test(currentURL)) {
            l("æ­£å¨ä¼åè®ºåä½éª...");
            // å¸¸è§
            // è¯è®ºåµå¥å°å¹¿å
            put(".post_recommend");
            // åºé¨æ¨è
            put("#post_feed_wrap");
            // åºé¨ç¸å³æç« éé¢çå¹¿å
            put(".bbs_feed_ad_box");
            put(".recommend-ad-box");
            // åºé¨ç¸å³æå­éé¢çç­è¯æç¤º
            put(".type_hot_word");
            // åºé¨èè²flexå±æ§çå¹¿åæ +ç»å½æ³¨åæ¡
            put(".pulllog-box");
            // çä½ åæ¬¢
            put(".personalized-recommend-box");
            // åå¸ååæç¤º
            put(".totast-box");
            // é¡¶é¨å¹¿å
            put(".recommend-right");
            // é¡¶é¨å¹¿å
            put(".ad_top");
            clean(10);
            // å±å¼
            common(3, 50);
            common(5, 10);
        } else if (download.test(currentURL)) {
            l("æ­£å¨ä¼åä¸è½½é¡µä½éª...");
            // å¸¸è§
            put(".fixed_dl");
            put("indexSuperise");
            // å³ä¾§æ¨è
            put(".content_recom");
            clean(10);
            common(5, 10);
        } else if (login.test(currentURL)) {
            l("æ­£å¨ä¼åç»å½é¡µä½éª...");
            // å¸¸è§
            // ç»å½çé¢å¤§å¾å¹¿å
            put(".main-tu");
            clean(10);
            common(5, 10);
        } else if (zone.test(currentURL)) {
            l("æ­£å¨ä¼åä¸ªäººç©ºé´ä½éª...");
            // å¸¸è§
            clean(10);
            common(7, 10);
            common(5, 10);
        } else if (other.test(currentURL)) {
            l("å¦è±ï¼å¥½åé¨çé¡µé¢ï¼ææ¥è¯çä¼åä¸ä¸å¦...");
            // å¸¸è§
            // å±å¼å¨æ
            $('.readmore_btn').click();
        } else {
            e("ä¸åæ¯æçé¡µé¢!");
        }
        setTimeout(function() {
            NProgress.done();
        }, 0);
        l("ä¼åå®æ¯!");
    }, 0);
})();

function l(log) {
    console.log("[CSDNGreener] " + log);
}

function e(error) {
    console.error("[CSDNGreener] " + error);
}

function clear() {
    list = [];
}

function put(tag) {
    list.push(tag);
}

function clean(times) {
    var loop = setInterval(function () {
        --times;
        if (times <= 0) {
            clearInterval(loop);
        }
        for (var k = 0; k < list.length; k++) {
            $(list[k]).remove();
        }
    }, 100);
    NProgress.inc();
}

function loop(num) {
    setInterval(function () {
        if (num === 1) {
            // ä¸»é¡µä¸­é´çå¹¿å
            $(".J_adv").remove();
            // ä¸»é¡µææ°çåå®¹æ¨ªæ¡
            $(".feed-fix-box").remove();
            // ä¸»é¡µå¹¿å iframe
            if (currentURL == "https://www.csdn.net/") {
                $("iframe").remove();
            }
            // å é¤ CSDN å®æ¹å¨ä¸»é¡µçæç« ï¼å¤§å¤æ¯å¹¿åï¼
            $("li.clearfix").each(function(index, ele) {
                var banned = /csdn<\/a>/;
                var aMark = $(ele).find(".name").html();
                if (banned.test(aMark)) {
                    $(ele).remove();
                }
            });
            // ä¸»é¡µå¹¿å
            $("li").each(function(){
                let self = $(this);
                let dataType = self.attr('data-type');
                if (dataType === 'ad') {
                    self.remove();
                }
            });
        } else if (num === 2) {
            // è¯è®ºæ¥çæ´å¤å±å¼çå¬
            $("div.comment-list-box").css("max-height", "none");
            // å±è½æ¨çç¼©æ¾ä¸æ¯100%çæç¤º
            $('.leftPop').remove();
        }
    }, 500);
}

function common(num, times) {
    var loop = setInterval(function () {
        --times;
        if (times <= 0) {
            clearInterval(loop);
        }
        if (num === 1) {
            // æ¥çæ´å¤
            $(".btn-readmore").removeClass("no-login");
            $(".btn-readmore").addClass("fans-read-more");
            $(".btn-readmore").removeAttr("href");
            $(".btn-readmore").removeAttr("target");
            $(".btn-readmore").removeAttr("rel");
            $(".btn-readmore").click();
            // å·²ç»å½ç¨æ·å±å¼è¯è®º
            try {
                document.getElementById("btnMoreComment").click();
            } catch (e) {}
            // å é¤æ¥çæ´å¤æé®
            $("#btnMoreComment").parent("div.opt-box").remove();
            // å±å¼åå®¹
            $("div.comment-list-box").css("max-height", "none");
            // æ¹åèæ¯é¢è²
            $(".login-mark").remove();
            // å é¤ç»å½æ¡
            $(".login-box").remove();
        } else if (num === 2) {
            // æ¡ä½è¯è®ºçâåºå¤´æ¨èâ
            if ($(".recommend-box").length > 1) {
                $(".recommend-box")[0].remove();
            }
            // å»å¤é¾
            $("#content_views").off();
            // å»é¤æ¨å¹¿å¹¿å
            $("li[data-type='ad']").remove();
            // åç»å½å¤å¶
            $(".hljs-button").removeClass("signin");
            $(".hljs-button").addClass("{2}");
            $(".hljs-button").attr("data-title", "åç»å½å¤å¶");
            $(".hljs-button").attr("onclick", "hljs.copyCode(event)");
            // å»é¤åªè´´æ¿å«æ
            $("code").attr("onclick", "mdcp.copyCode(event)");
            try {
                // å¤å¶æ¶ä¿çåææ ¼å¼ï¼åè https://greasyfork.org/en/scripts/390502-csdnremovecopyright/code
                Object.defineProperty(window, "articleType", {
                    value: 0,
                    writable: false,
                    configurable: false
                });
            } catch (err) {
            }
            csdn.copyright.init("", "", "");
            // é¡µå¤´å¹¿å
            try {
                document.getElementsByClassName("column-advert-box")[0].style.display="none";
            } catch (e) {}
            // èªå¨æ£æµæ¯å¦æç®å½ï¼å¦ææ²¡æåå é¤å³è¾¹æ ï¼æç« å±ä¸­
            if ($(".recommend-right_aside").html() && $(".recommend-right_aside").html().replace(/[\r\n]/g, "").replace(/(\s)/g, "") === "") {
                $("#rightAside").remove();
            } else if ($(".recommend-right_aside").html() && $("#recommend-right").html().replace(/[\r\n]/g, "").replace(/(\s)/g, "") === "") {
                $("#rightAside").remove();
            }
            // ç»å½æé®æå­å¤ªå¤ï¼ä¿®æ¹
            $("a").each(function() {
                if ($(this).attr('href') === 'https://passport.csdn.net/account/login') {
                    $(this).html('ç»å¥');
                }
            });
            // é¡¶æ å¹¿å
            $("li").each(function(){
                let self = $(this);
                let dataType = self.attr('data-sub-menu-type');
                if (dataType === 'vip') {
                    self.remove();
                }
            });
        } else if (num == 3) {
            //è®ºåèªå¨å±å¼
            $(".js_show_topic").click();
        } else if (num == 4) {
            /** éç½®æ§å¶ **/
            let config = new Config();
            let smCookie = config.get("scr-sm", false);
            let mdCookie = config.get("scr-md", true);
            let lgCookie = config.get("scr-lg", false);

            $("#scr-sm").prop("checked", smCookie);
            $("#scr-md").prop("checked", mdCookie);
            $("#scr-lg").prop("checked", lgCookie);

            if (smCookie) {
                // Small Screen Mode
                $(".main_father").removeClass("justify-content-center");
                $("csdn-side-toolbar").css("left", "auto")
                GM_addStyle(`
                main{
                    width: auto!important;
                    float: none!important;
                    max-width: 90vw;
                }
                main article img{
                    margin: 0 auto;
                    max-width: 100%;
                    object-fit: cover;
                }
                `);
            } else if (mdCookie) {
                // Middle Screen Mode
                $(".main_father").removeClass("justify-content-center");
                $("csdn-side-toolbar").css("left", "auto")
            } else if (lgCookie) {
                // Large Screen Mode
                // DO NOTHING
            }

            // å±å¹å°ºå¯¸åéçå¬
            $("#scr-sm").click(function () {
                new Config().set("scr-sm", true);
                new Config().set("scr-md", false);
                new Config().set("scr-lg", false);
            });
            $("#scr-md").click(function () {
                new Config().set("scr-md", true);
                new Config().set("scr-sm", false);
                new Config().set("scr-lg", false);
            });
            $("#scr-lg").click(function () {
                new Config().set("scr-lg", true);
                new Config().set("scr-sm", false);
                new Config().set("scr-md", false);
            });
        } else if (num == 5) {
            // æ¹åèæ¯é¢è²
            $(".login-mark").remove();
            // å é¤ç»å½æ¡
            $(".login-box").remove();
        } else if (num == 6) {
            let did = false;
            let configHTML = '';
            configHTML += '<div><a style="font-size: 20px;" href="https://openuserjs.org/scripts/AdlerED/%E6%9C%80%E5%BC%BA%E7%9A%84%E8%80%81%E7%89%8C%E8%84%9A%E6%9C%ACCSDNGreener%EF%BC%9ACSDN%E5%B9%BF%E5%91%8A%E5%AE%8C%E5%85%A8%E8%BF%87%E6%BB%A4%E3%80%81%E4%BA%BA%E6%80%A7%E5%8C%96%E8%84%9A%E6%9C%AC%E4%BC%98%E5%8C%96" target="_blank">CSDNGreener</a> <sup>V' + version + '</sup></div>å®æ¹QQäº¤æµç¾¤ï¼1042370453&nbsp;&nbsp;&nbsp;<a target="_blank" href="//shang.qq.com/wpa/qunwpa?idkey=d7ad6ead3f57722e7f00a4281ae75dbac2132c5a8cf321992d57309037fcaf63"><img border="0" src="//pub.idqqimg.com/wpa/images/group.png" alt="CSDNGreener ç¨æ·äº¤æµç¾¤" title="CSDNGreener ç¨æ·äº¤æµç¾¤"></a><br><br>';

            // è®¾å®ï¼æ¨èåå®¹æé®
            configHTML += '<p style="margin-bottom: 5px"><b>æ ¹æ®å±å¹å°ºå¯¸ï¼ééçå¼</b></p>';
            configHTML += '<label><input name="displayMode" type="radio" value="" id="scr-sm" /> å°å±å¹ </label>';
            configHTML += '<label><input name="displayMode" type="radio" value="" id="scr-md" /> ä¸­å±å¹ </label>';
            configHTML += '<label><input name="displayMode" type="radio" value="" id="scr-lg" /> å¤§å±å¹</label>';
            configHTML += '<hr style="height:1px;border:none;border-top:1px solid #cccccc;margin: 5px 0px 5px 0px;" />';
            configHTML += '<p style="margin-bottom: 5px"><b>éç¨è®¾å®</b></p>';
            configHTML += '<input type="checkbox" id="toggle-recommend-button"> <label for="toggle-recommend-button" class="modeLabel">æ¾ç¤ºæ¨èåå®¹</label>';
            configHTML += '<br>';
            configHTML += '<input type="checkbox" id="toggle-whitetheme-button"> <label for="toggle-whitetheme-button" class="modeLabel">ç½è²ä¸»é¢&Dark Readerå¼å®¹æ¨¡å¼<span style="font-size: 8px;">ï¼å¼å¯åå¯éè¿Dark Readeræä»¶çµæ´»æ§å¶ç½è²ä¸é»ææ¨¡å¼ï¼<a style="color: green;" href="https://chrome.zzzmh.cn/info?token=eimadpbcbfnmbkopoojfekhnkhdbieeh" target="_blank">æä»¶ä¸è½½å°åç¹æ</a>ï¼</span></label>';
            configHTML += '<br>';
            configHTML += '<input type="checkbox" id="toggle-autosize-button"> <label for="toggle-autosize-button" class="modeLabel">å®½åº¦èªå¨éåº<span style="font-size: 8px;">ï¼å¼å¯æ­¤éé¡¹å¯ä»¥å¨é¡µé¢å®½åº¦ç¼©å°æ¶èªå¨åæ¢è³å°å±æ¨¡å¼ï¼</span></label>';
            configHTML += '<br>';
            configHTML += '<input type="checkbox" id="toggle-autohidetoolbar-button"> <label for="toggle-autohidetoolbar-button" class="modeLabel">åä¸æ»å¨èªå¨éèé¡¶æ </label>';
            configHTML += '<br>';
            configHTML += '<input type="checkbox" id="toggle-autohidebottombar-button"> <label for="toggle-autohidebottombar-button" class="modeLabel">èªå¨éèåºæ </label>';
            configHTML += '<br>';
            configHTML += '<input type="checkbox" id="toggle-writeblog-button"> <label for="toggle-writeblog-button" class="modeLabel">æ¾ç¤ºåä½ä¸­å¿æé®</label>';
            configHTML += '<br>';
            configHTML += '<hr style="height:1px;border:none;border-top:1px solid #cccccc;margin: 5px 0px 5px 0px;" />';
            configHTML += '<p style="margin-bottom: 5px"><b>å³ä¾§æ å®å¶</b></p>';
            configHTML += '<input type="checkbox" id="toggle-authorcard-button"> <label for="toggle-authorcard-button" class="modeLabel">æ¾ç¤ºä½èåç</label>';
            configHTML += '<br>';
            configHTML += '<input type="checkbox" id="toggle-searchblog-button"> <label for="toggle-searchblog-button" class="modeLabel">æ¾ç¤ºæåä¸»æç« </label>';
            configHTML += '<br>';
            configHTML += '<input type="checkbox" id="toggle-newarticle-button"> <label for="toggle-newarticle-button" class="modeLabel">æ¾ç¤ºææ°æç« </label>';
            configHTML += '<br>';
            configHTML += '<input type="checkbox" id="toggle-hotarticle-button"> <label for="toggle-hotarticle-button" class="modeLabel">æ¾ç¤ºç­é¨æç« </label>';
            configHTML += '<br>';
            configHTML += '<input type="checkbox" id="toggle-newcomments-button"> <label for="toggle-newcomments-button" class="modeLabel">æ¾ç¤ºææ°è¯è®º</label>';
            configHTML += '<br>';
            configHTML += '<input type="checkbox" id="toggle-kindperson-button"> <label for="toggle-kindperson-button" class="modeLabel">æ¾ç¤ºåç±»ä¸æ </label>';
            configHTML += '<br>';
            configHTML += '<input type="checkbox" id="toggle-recommendarticle-button"> <label for="toggle-recommendarticle-button" class="modeLabel">æ¾ç¤ºæ¨èæç« </label>';
            configHTML += '<br>';
            configHTML += '<input type="checkbox" id="toggle-archive-button"> <label for="toggle-archive-button" class="modeLabel">æ¾ç¤ºå½æ¡£</label>';
            configHTML += '<br>';
            configHTML += '<input type="checkbox" id="toggle-content-button"> <label for="toggle-content-button" class="modeLabel">æ¾ç¤ºç®å½</label>';
            configHTML += '<br>';
            configHTML += '<button id="save" onclick="location.reload()">ä¿å­è®¾å®</button>';
            configHTML += '<br>';
            configHTML += '<a href="https://github.com/adlered/CSDNGreener" target="_blank"><svg t="1592982464356" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2516" width="32" height="32"><path d="M511.872 0l168.64 321.728 343.168 69.312L784.768 659.2l43.392 364.544-316.288-156.032-316.352 156.032L238.784 659.2 0 391.104l343.168-69.312L511.872 0" p-id="2517"></path></svg> æ±ä¸ªStarï¼ç»ä½èåè´¹åçµ</a><br>';
            configHTML += '<a href="https://doc.stackoverflow.wiki/web/#/21?page_id=138" target="_blank" style="margin-top: 5px; display: block;"><svg t="1592982508258" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4207" width="32" height="32"><path d="M664.48 234.432a32 32 0 0 0-45.248-0.8l-76.256 73.6-73.344-73.216a32 32 0 1 0-45.248 45.312l72.384 72.256h-49.28a32 32 0 0 0 0 64h63.776v32h-63.776a32 32 0 0 0 0 64h63.776v65.664a32 32 0 1 0 64 0v-65.664h64.288a32 32 0 1 0 0-64h-64.288v-32h64.288a32 32 0 1 0 0-64h-50.368l74.464-71.872a32.032 32.032 0 0 0 0.832-45.28z m275.2 503.552a9017.568 9017.568 0 0 0-141.664-56.736 368.512 368.512 0 0 0 97.568-248.608c0-202.912-165.12-368-368.064-368s-368 165.088-368 368c0 16.224 1.024 32.352 3.072 47.968 2.304 17.504 18.496 29.664 35.904 27.584a32 32 0 0 0 27.584-35.904 304.512 304.512 0 0 1-2.56-39.648c0-167.616 136.384-304 304-304 167.648 0 304.064 136.384 304.064 304a300.544 300.544 0 0 1-96.128 221.472c-0.768 0.736-1.088 1.76-1.824 2.528-42.848-15.936-79.328-28.48-93.76-30.656-24.896-3.904-48.672 7.616-63.104 28.896-12.032 17.792-15.072 38.816-8.096 56.256 4.288 10.656 20.512 32.896 39.776 57.28-46.432-0.064-117.312-6.336-192.832-35.488-31.264-12.064-69.44-52.64-103.136-88.416-47.968-50.976-93.28-99.104-142.56-99.104-18.336 0-35.744 6.848-50.336 19.776-18.24 16.224-35.136 48.32-12 109.248 42.624 112.16 208.544 285.12 341.728 285.12h478.144a32 32 0 0 0 32-32v-160a31.84 31.84 0 0 0-19.776-29.568z m-44.16 157.6h-445.12l-1.024 32v-32c-97.6 0-247.072-152.128-281.92-243.872-10.112-26.656-6.72-37.408-5.344-38.624 4.128-3.648 6.528-3.648 7.84-3.648 21.632 0 64.608 45.632 95.968 78.944 40.224 42.752 81.856 86.944 126.656 104.256 85.216 32.896 164.896 39.808 216.736 39.808 41.376 0 67.584-4.352 68.672-4.544a32 32 0 0 0 19.136-52.16c-27.008-32.096-58.592-71.808-67.296-85.344 0.288-0.576 0.512-1.024 0.352-1.152 22.848 3.488 162.432 57.952 265.28 99.84v106.496z" p-id="4208"></path></svg> ææ¯èæ¿ï¼æå¸æèµ</a>';
            configHTML += '<a href="javascript:void(0)" style="position: absolute; top: 20px; right: 15px;" onclick=\'document.getElementById("light").style.display="none",document.getElementById("fade").style.display="none"\'>å³é­è®¾ç½®çªå£ <svg t="1592982567577" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4984" width="32" height="32"><path d="M519.02036023 459.47959989L221.8941505 162.35411435a37.07885742 37.07885742 0 1 0-52.45354772 52.40502656l297.12476134 297.15010821L169.44060278 809.05863314a37.07885742 37.07885742 0 1 0 52.42964924 52.42892505l297.15010821-297.12476136 297.15010822 297.12476136a37.07885742 37.07885742 0 1 0 52.42892504-52.40430237l-297.12476135-297.1740067 297.12476135-297.12548553a37.07885742 37.07885742 0 1 0-52.42892504-52.42964924L519.04498291 459.47959989z" p-id="4985"></path></svg></a></div><div id="fade" class="black_overlay"></div>';
            // ç»¿åå¨è®¾å®
            $("body").prepend('<div id="light" class="white_content">' + configHTML);
            // ç»¿åè®¾å®
            let htmlOf0 = '<li><a id="greenerSettings" href="javascript:void(0)" style="" onclick="$(window).scrollTop(0);document.getElementById(\'light\').style.display=\'block\';document.getElementById(\'fade\').style.display=\'block\';"><svg t="1592982970375" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10112" width="48" height="48"><path d="M256 102.4h512l256 256-512 563.2L0 358.4z" fill="#26CD63" p-id="10113"></path><path d="M256 102.4l256 256H0zM768 102.4l256 256H512zM512 921.6l204.8-563.2H307.2z" fill="#14A345" p-id="10114"></path></svg> ç»¿åè®¾å®</a></li>';
            $(".sub-menu-box").eq(0).before(htmlOf0);

            /** éç½®æ§å¶ **/
            let config = new Config();
            // æ¨èåå®¹
            $(".blog-content-box").append("<br><div class='blog-content-box' id='recommendSwitch' style='text-align: right;'></div>");
            $("#recommendSwitch:last").append('<input type="checkbox" id="toggle-button"> <label for="toggle-button" class="button-label"> <span class="circle"></span> <span class="text on">&nbsp;</span> <span class="text off">&nbsp;</span> </label>' +
                               '<p style="margin-top: 5px; font-size: 13px;">æ¾ç¤ºæ¨èåå®¹</p>');
            let recommendCookie = config.get("recommend", false);
            if (!recommendCookie) {
                $(".recommend-box").hide();
            }
            if (recommendCookie) {
                $("#toggle-recommend-button").prop("checked", true);
                $("#toggle-button").prop("checked", true);
            } else {
                $("#toggle-recommend-button").prop("checked", false);
                $("#toggle-button").prop("checked", false);
            }
            config.listenButton("#toggle-recommend-button", "recommend",
                               function() {$(".recommend-box").slideDown(200);},
                               function() {$(".recommend-box").slideUp(200);});
            config.listenButtonAndAction("#toggle-button", "recommend",
                                function() {$(".recommend-box").slideDown(200);},
                               function() {$(".recommend-box").slideUp(200);});

            // æç¤º
            let tipsCookie = config.get("showTip", true);
            if (tipsCookie) {
                showTips();
            }
            config.set("showTip", false);

            // æ¾ç¤ºä½èåç
            let authorCardCookie = config.get("authorCard", false);
            if (authorCardCookie) {
                // åä¸»ä¿¡æ¯
                $('#recommend-right').append($('#asideProfile').prop("outerHTML"));
                setTimeout(function() {
                    $('#asideProfile').attr("style", "margin-top: 8px; width: 300px;");
                }, 500);
            }
            if (authorCardCookie) {
                $("#toggle-authorcard-button").prop("checked", true);
            } else {
                $("#toggle-authorcard-button").prop("checked", false);
            }
            config.listenButton("#toggle-authorcard-button", "authorCard",
                               function() {location.reload();},
                               function() {location.reload();});

            // å¼ºå¶ç½è²ä¸»é¢
            let whiteThemeCookie = config.get("whiteTheme", true);
            if (whiteThemeCookie) {
                // èæ¯å é¤
                $('.main_father').attr('style', 'background-image: none !important; background-color: #f5f6f7; background: #f5f6f7;');
                $('[href^="https://csdnimg.cn/release/phoenix/template/themes_skin/"]').attr('href', 'https://csdnimg.cn/release/phoenix/template/themes_skin/skin-technology/skin-technology-6336549557.min.css');
                $('#csdn-toolbar').removeClass('csdn-toolbar-skin-black');
                $('.csdn-logo').attr('src', '//csdnimg.cn/cdn/content-toolbar/csdn-logo.png?v=20200416.1');
            }
            if (whiteThemeCookie) {
                $("#toggle-whitetheme-button").prop("checked", true);
            } else {
                $("#toggle-whitetheme-button").prop("checked", false);
            }
            config.listenButton("#toggle-whitetheme-button", "whiteTheme",
                               function() {location.reload();},
                               function() {location.reload();});

            // æåä¸»æç« 
            let searchBlogCookie = config.get("searchBlog", false);
            if(searchBlogCookie) {
                $('#recommend-right').append($('#asideSearchArticle').prop("outerHTML"));
                setTimeout(function() {
                    $('#asideSearchArticle').attr("style", "margin-top: 8px; width: 300px;");
                    var i = $("#search-blog-words")
                      , n = $(".btn-search-blog");
                    i.keyup(function(t) {
                        var n = t.keyCode;
                        if (13 == n) {
                            var e = encodeURIComponent(i.val());
                            if (e) {
                                var s = "//so.csdn.net/so/search/s.do?q=" + e + "&t=blog&u=" + username;
                                window.open(s)
                            }
                        }
                    });
                    n.on("click", function(t) {
                        var n = encodeURIComponent(i.val());
                        if (n) {
                            var e = "//so.csdn.net/so/search/s.do?q=" + n + "&t=blog&u=" + username;
                            window.open(e)
                        }
                        t.preventDefault()
                    });
                }, 500);
            }
            if (searchBlogCookie) {
                $("#toggle-searchblog-button").prop("checked", true);
            } else {
                $("#toggle-searchblog-button").prop("checked", false);
            }
            config.listenButton("#toggle-searchblog-button", "searchBlog",
                               function() {location.reload();},
                               function() {location.reload();});

            // ææ°æç« 
            let newArticleCookie = config.get("newArticle", false);
            if (newArticleCookie) {
                $('#recommend-right').append($('#asideNewArticle').prop("outerHTML"));
                setTimeout(function() {
                    $('#asideNewArticle').attr("style", "margin-top: 8px; width: 300px;");
                }, 0);
            }
            if (newArticleCookie) {
                $("#toggle-newarticle-button").prop("checked", true);
            } else {
                $("#toggle-newarticle-button").prop("checked", false);
            }
            config.listenButton("#toggle-newarticle-button", "newArticle",
                               function() {location.reload();},
                               function() {location.reload();});

            // ç­é¨æç« 
            let hotArticleCookie = config.get("hotArticle", false);
            if (hotArticleCookie) {
                $('#recommend-right').append($("#asideHotArticle").prop("outerHTML"));
                setTimeout(function() {
                    $('#asideHotArticle').attr("style", "margin-top: 8px; width: 300px;");
                    $('#asideHotArticle img').remove();
                }, 0);
            }
            if (hotArticleCookie) {
                $("#toggle-hotarticle-button").prop("checked", true);
            } else {
                $("#toggle-hotarticle-button").prop("checked", false);
            }
            config.listenButton("#toggle-hotarticle-button", "hotArticle",
                               function() {location.reload();},
                               function() {location.reload();});

            // ææ°è¯è®º
            let newCommentsCookie = config.get("newComments", false);
            if (newCommentsCookie) {
                $('#recommend-right').append($("#asideNewComments").prop("outerHTML"));
                setTimeout(function() {
                    $('#asideNewComments').attr("style", "margin-top: 8px; width: 300px;");
                    $(".comment.ellipsis").attr("style", "max-height: none;");
                    $(".title.text-truncate").attr("style", "padding: 0");
                }, 0);
            }
            if (newCommentsCookie) {
                $("#toggle-newcomments-button").prop("checked", true);
            } else {
                $("#toggle-newcomments-button").prop("checked", false);
            }
            config.listenButton("#toggle-newcomments-button", "newComments",
                               function() {location.reload();},
                               function() {location.reload();});

            // åç±»ä¸æ 
            let kindPersonCookie = config.get("kindPerson", false);
            if (!kindPersonCookie) {
                setTimeout(function() {
                    $('#asideCategory').remove();
                    $('.kind_person').remove();
                }, 0);
            } else {
                $('#recommend-right').append($("#asideCategory").prop("outerHTML"));
                if ($("#asideCategory").length > 0) {
                    $('.kind_person').remove();
                } else {
                    $('.kind_person').attr("style", "margin-top: 8px; width: 300px; height:255px;");
                }
                setTimeout(function() {
                    $('#asideCategory').attr("style", "margin-top: 8px; width: 300px; display:block !important;");
                    $("a.flexible-btn").click(function() {
                        $(this).parents('div.aside-box').removeClass('flexible-box');
                        $(this).parents("p.text-center").remove();
                    })
                }, 500);
            }
            if (kindPersonCookie) {
                $("#toggle-kindperson-button").prop("checked", true);
            } else {
                $("#toggle-kindperson-button").prop("checked", false);
            }
            config.listenButton("#toggle-kindperson-button", "kindPerson",
                               function() {location.reload();},
                               function() {location.reload();});

            // ç®å½
            let contentCookie = config.get("content", true);
            if (!contentCookie) {
                setTimeout(function() {
                    $('.align-items-stretch.group_item').parent().remove();
                }, 0);
            }
            if (contentCookie) {
                $("#toggle-content-button").prop("checked", true);
            } else {
                $("#toggle-content-button").prop("checked", false);
            }
            config.listenButton("#toggle-content-button", "content",
                               function() {location.reload();},
                               function() {location.reload();});

            // æ¨èæç« 
            let recommendArticleCookie = config.get("recommendArticle", false);
            if (!recommendArticleCookie) {
                setTimeout(function() {
                    $('.recommend-list-box').remove();
                }, 0);
            } else {
                setTimeout(function() {
                    $('.recommend-list-box').attr("style", "margin-top: 8px; width: 300px; height:255px;");
                }, 0);
            }
            if (recommendArticleCookie) {
                $("#toggle-recommendarticle-button").prop("checked", true);
            } else {
                $("#toggle-recommendarticle-button").prop("checked", false);
            }
            config.listenButton("#toggle-recommendarticle-button", "recommendArticle",
                               function() {location.reload();},
                               function() {location.reload();});

            // å½æ¡£
            let archiveCookie = config.get("archive", false);
            if (!archiveCookie) {
                setTimeout(function() {
                    $('#asideArchive').remove();
                }, 0);
            } else {
                $('#recommend-right').append($("#asideArchive").prop("outerHTML"));
                setTimeout(function() {
                    $('#asideArchive').attr("style", "margin-top: 8px; width: 300px; display:block !important;");
                }, 500);
            }
            if (archiveCookie) {
                $("#toggle-archive-button").prop("checked", true);
            } else {
                $("#toggle-archive-button").prop("checked", false);
            }
            config.listenButton("#toggle-archive-button", "archive",
                               function() {location.reload();},
                               function() {location.reload();});

            // èªå¨é å·¦å¹³éº
            let autoSizeCookie = config.get("autoSize", false);
            if (autoSizeCookie) {
                setInterval(function () {
                    // æç« å®½åº¦èªéåº
                    if (window.innerWidth < 1100) {
                        // å é¤åæååºå¼æ ·å¼
                        $(".main_father").removeClass("justify-content-center");
                        $("csdn-side-toolbar").css("left", "auto")
                        $("article").width(window.innerWidth - 150);
                        GM_addStyle(`
                        main{
                            width: auto!important;
                            float: none!important;
                            max-width: 90vw;
                        }
                        main article img{
                            margin: 0 auto;
                            max-width: 100%;
                            object-fit: cover;
                        }
                        `);
                        did = true;
                    } else {
                        if (did === true) {
                            $("article").removeAttr("style");
                            did = false;
                        }
                    }
                }, 500);
            }
            if (autoSizeCookie) {
                $("#toggle-autosize-button").prop("checked", true);
            } else {
                $("#toggle-autosize-button").prop("checked", false);
            }
            config.listenButton("#toggle-autosize-button", "autoSize",
                               function() {location.reload();},
                               function() {location.reload();});

            // èªå¨éèé¡¶æ 
            let autoHideToolbarCookie = config.get("autoHideToolbar", true);
            if (autoHideToolbarCookie) {
                $(window).scroll(function() {
                    if (document.documentElement.scrollTop > 100) {
                	    let scrollS = $(this).scrollTop();
                	    if (scrollS >= windowTop) {
                	    	$('#csdn-toolbar').slideUp(100);
                	    	windowTop = scrollS;
                	    } else {
                	    	$('#csdn-toolbar').slideDown(100);
                	    	windowTop = scrollS;
                	    }
                    }
                });
            }
            if (autoHideToolbarCookie) {
                $("#toggle-autohidetoolbar-button").prop("checked", true);
            } else {
                $("#toggle-autohidetoolbar-button").prop("checked", false);
            }
            config.listenButton("#toggle-autohidetoolbar-button", "autoHideToolbar",
                               function() {location.reload();},
                               function() {location.reload();});

            // èªå¨éèåºæ 
            let autoHideBottomBarCookie = config.get("autoHideBottomBar", true);
            if (autoHideBottomBarCookie) {
                setInterval(function () {$("#toolBarBox .left-toolbox").css({
                	position: "relative",
                	left: "0px",
                	bottom: "0",
                	width: $("#toolBarBox").width() + "px"
                })}, 3000);
            }
            if (autoHideBottomBarCookie) {
                $("#toggle-autohidebottombar-button").prop("checked", true);
            } else {
                $("#toggle-autohidebottombar-button").prop("checked", false);
            }
            config.listenButton("#toggle-autohidebottombar-button", "autoHideBottomBar",
                               function() {location.reload();},
                               function() {location.reload();});

            // åä½ä¸­å¿æé®
            let writeBlogCookie = config.get("writeBlog", true);
            if (!writeBlogCookie) {
                $(".write-bolg-btn").remove();
            }
            if (writeBlogCookie) {
                $("#toggle-writeblog-button").prop("checked", true);
            } else {
                $("#toggle-writeblog-button").prop("checked", false);
            }
            config.listenButton("#toggle-writeblog-button", "writeBlog",
                               function() {location.reload();},
                               function() {location.reload();});

            // å³ä¾§æ»å¨æ¡
            setTimeout(function () {
                let rightSideHeight = 0;
                let pageHeight = $(window).height();
                rightSideHeight += getHeight($('.align-items-stretch.group_item').parent());
                rightSideHeight += getHeight($("#asideProfile"));
                rightSideHeight += getHeight($("#asideSearchArticle"));
                rightSideHeight += getHeight($("#asideNewArticle"));
                rightSideHeight += getHeight($("#asideHotArticle"));
                rightSideHeight += getHeight($("#asideNewComments"));
                rightSideHeight += getHeight($("#asideCategory"));
                rightSideHeight += getHeight($("#asideArchive"));
                console.debug("Right side total height: " + rightSideHeight);
                console.debug("Page height: " + pageHeight);
                if (rightSideHeight > pageHeight) {
                    $('#recommend-right').css("overflow", "scroll");
                }
            }, 1500);
        } else if (num === 7) {
            $(".me_r")[1].remove();
        } else if (num === 8) {
            $(".article-bar-top").append("<br>");
            $(".article-bar-top").append($(".aside-box-footerClassify").children("dd").html());
            $("dl").each(function (index, element) {
                var key = $(this).children("dt");
                var value = $(this).children("dd").children("span");
                if (key.html().indexOf("åå") != -1) {
                    key = $(this).children("dt").children("a")
                    value = $(this).children("dd").children("a").children("span");
                    addInfo(key, value);
                } else
                if (value.html() != undefined) {
                    addInfo(key, value);
                }
            } );
            function addInfo(key, value) {
                var bind = key.html() + "&nbsp;" + value.html() + "&nbsp;&nbsp;";
                $(".article-bar-top").append(bind + " ");
            }
            $(".blog_container_aside").remove();

            // æ é¢æ¶æ¯æéå»é¤
            let title = document.title.replace(/^\(.*?\)/g, "");
            document.title = title;
            // è¯è®ºå¤å¶æé®
            $('.comment-box').prepend('<button class="comment-hidden-text" style="display:none">COPY BUTTON</button>');
            $('.new-opt-box.new-opt-box-bg').prepend('<a class="btn btn-report btn-copy" onclick="javascript:$(\'.comment-hidden-text\').attr(\'data-clipboard-text\',$(this).parent().parent().find(\'.new-comment\').text())">å¤å¶è¯è®º</a><span class="btn-bar"></span>');
            $('.btn-copy').click(function() {
                var clipboard = new ClipboardJS('.comment-hidden-text');
                clipboard.on('success', function(e) {
                    console.info('Action:', e.action);
                    console.info('Text:', e.text);
                    console.info('Trigger:', e.trigger);
                    e.clearSelection();
                    $('.btn-copy').html('æå');
                    setTimeout(function() {
                        $('.btn-copy').html('å¤å¶è¯è®º');
                    }, 1000);
                });
                clipboard.on('error', function(e) {
                    console.error('Action:', e.action);
                    console.error('Trigger:', e.trigger);
                    $('.btn-copy').html('å¤±è´¥ï¼è¯·æå¨å¤å¶');
                    setTimeout(function() {
                        $('.btn-copy').html('å¤å¶è¯è®º');
                    }, 1000);
                });
                $(".comment-hidden-text").click();
                clipboard.destroy();
            });
        }
    }, 100);
    NProgress.inc();
}

// éç½®æ§å¶ç±»
class Config {
    get(key, value) {
        var cookie = $.cookie(key);
        if (cookie == undefined) {
            new Config().set(key, value);
            console.debug("Renew key: " + key + " : " + value);
            return value;
        }
        console.debug("Read key: " + key + " : " + cookie);
        if (cookie === "true") { return true; }
        if (cookie === "false") { return false; }
        return cookie;
    }

    set(setKey, setValue) {
        $.cookie(setKey, setValue, {
            path: '/',
            expires: 365
        });
        console.debug("Key set: " + setKey + " : " + setValue);
    }

    listenButton(element, listenKey, trueAction, falseAction) {
        $(element).click(function () {
            let status = new Config().get(listenKey, true);
            console.debug("Status: " + status);
            if (status === "true" || status) {
                console.debug("Key set: " + listenKey + " :: " + false);
                new Config().set(listenKey, false);
            } else {
                console.debug("Key set: " + listenKey + " :: " + true);
                new Config().set(listenKey, true);
            }
        });
    }

    listenButtonAndAction(element, listenKey, trueAction, falseAction) {
        $(element).click(function () {
            let status = new Config().get(listenKey, true);
            console.debug("Status: " + status);
            if (status === "true" || status) {
                console.debug("Key set: " + listenKey + " :: " + false);
                new Config().set(listenKey, false);
                falseAction();
            } else {
                console.debug("Key set: " + listenKey + " :: " + true);
                new Config().set(listenKey, true);
                trueAction();
            }
        });
    }
}

function showTips() {
	var config = {
		content: "æ¬¢è¿ä½¿ç¨ CSDNGreenerï¼ç»¿åè®¾å®æé®å¨è¿éï¼<br><a href='javascript:$(\".trips\").remove();'>å¥½çï¼ä»¥åä¸åæç¤ºæ</a>",
		type: "html",
		alignTo: ["bottom", "left"],
		trigger: "show",
		isclose: false,
		color: ["#B2E281", "#B2E281"]
	};
	$("#greenerSettings").showTips(config);
}

function getHeight(element) {
    let outerHeight = element.outerHeight();
    if (outerHeight === null) {
        return 0;
    }
    return outerHeight;
}
