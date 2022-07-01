// ==UserScript==
// @name            斗鱼清爽版【整合功能】
// @author          sam
// @namespace       https://greasyfork.org/zh-CN/scripts/390452
// @version         1.0.9
// @description     douyu整合优化斗鱼功能脚本（斗鱼精简、斗鱼真实人数显示、斗鱼默认最高画质）
// @match           http*://www.douyu.com/*
// @icon            https://www.douyu.com/favicon.ico
// @require         https://code.jquery.com/jquery-2.2.4.min.js
// @grant       GM.setValue
// @grant       GM.getValue
// @run-at document-end
// @note            斗鱼精简 https://greasyfork.org/zh-CN/scripts/386642
// @note            斗鱼真实人数显示 https://greasyfork.org/zh-CN/scripts/388941
// @note            斗鱼默认最高画质  https://greasyfork.org/zh-CN/scripts/384173
/*
主要功能：
    1.精简douyu.com页面元素
    2.直播打开直播页面自动页面全屏，自动切换最高清晰度画质
    3.弹幕栏顶部增加真实人数显示
2019/10/9 v1.0.7
    1.调整<我的关注>页面,增加开播时间（缩小字体样式）
    2.直播页面调整人数、人气，以万为单位（1万一下显示原始数据），增加<我的关注>页面按钮
    todo:增加关注页面监控器模式
    todo:通过页面播放器直接切换画质、切换全屏（不再依赖播放器控件自动点击，以提高自动切换速度）

2019/10/12 v1.0.8
    1.增加快捷键控制播放器（shift=全屏切换 ctrl=静音开关  tab=弹幕开关）可自行通过KeyMap（263行）映射快捷键

2019/11/14 v1.0.9
    1.真实人数已失效
    2.移除弹幕区域的巅峰排行榜
    3.恢复显示弹幕发言左侧的粉丝牌子

*/
// ==/UserScript==

(function () {
    'use strict';
    window.onload = function () {
        var curent_url = window.location.href;
        console.log('[Neat Douyu Stream] url --> ' + curent_url)
        loadStyle(css);//精简界面
        modifiedMyFollow();//调整“我的收藏”页面

        changeDom();//调整右侧弹幕dom高度
        autoSwitch();//切换最高画质
        autoClickFullscreen();//窗口化全屏

        //addKeyboardListener();//添加快捷键


        setTimeout(getRealViewer, 3000);//真实人数,添加<我的关注>按钮
        setInterval(getRealViewer, 10000);
    };
})();

function waitDom(dom_selector, func) {
    /*
            功能:等待dom加载后执行函数
            dom_selector :选择器参数  待加载的dom = document.querySelector(dom_selector)
            func:待执行函数体，用匿名函数传参
    */
    let dom_is_exist = false
    for (var i = 0; i < 100; i++) {
        (function (i) {
            setTimeout(function () {
                if (document.querySelector(dom_selector)) {
                    if (!dom_is_exist) {
                        func()
                        dom_is_exist = true
                    }
                }
            }, (i + 1) * 200);
        })(i)
    }
};

function addSettingPannel() {
    const icon_HTML = `
    <div id='setting-icon'>
        <svg style="width:18px;height:18px" t="1571057204228" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="807" width="200" height="200">
            <title>设置</title>
            <path d="M512 677.65c-91.34 0-165.65-74.31-165.65-165.65S420.66 346.35 512 346.35 677.65 420.66 677.65 512 603.34 677.65 512 677.65z m0-271.06c-58.12 0-105.41 47.29-105.41 105.41S453.88 617.41 512 617.41 617.41 570.12 617.41 512 570.12 406.59 512 406.59z" p-id="808"></path>
            <path d="M512 978.82c-21.65 0-43.47-1.52-64.85-4.5-37.32-5.22-65.8-34.63-70.85-73.19-3.97-30.25-21.34-56.32-47.67-71.52-26.41-15.25-57.76-17.23-86-5.43-35.24 14.72-76.29 3.76-99.84-26.65-25.68-33.17-46.76-69.6-62.64-108.29-14.66-35.71-3.65-76.84 26.78-100.02 24.36-18.56 38.33-46.7 38.33-77.22s-13.97-58.66-38.33-77.22C76.5 411.6 65.49 370.46 80.15 334.76a466.308 466.308 0 0 1 62.64-108.29c23.54-30.41 64.6-41.37 99.84-26.65 28.24 11.79 59.59 9.81 86-5.43 26.33-15.2 43.7-41.27 47.67-71.52 5.06-38.56 33.53-67.97 70.85-73.19 21.38-2.99 43.2-4.5 64.85-4.5 21.65 0 43.47 1.52 64.84 4.5 37.32 5.22 65.8 34.63 70.85 73.19 3.97 30.25 21.34 56.32 47.67 71.52 26.41 15.25 57.75 17.23 85.99 5.44 35.24-14.72 76.3-3.76 99.84 26.65a466.308 466.308 0 0 1 62.64 108.29c14.66 35.71 3.65 76.84-26.78 100.03-24.36 18.56-38.33 46.7-38.33 77.22s13.97 58.66 38.33 77.22c30.43 23.19 41.44 64.32 26.78 100.03a466.308 466.308 0 0 1-62.64 108.29c-23.54 30.41-64.6 41.36-99.84 26.65-28.24-11.8-59.58-9.81-85.99 5.43-26.33 15.2-43.71 41.27-47.67 71.52-5.06 38.56-33.53 67.97-70.85 73.19a474.405 474.405 0 0 1-64.84 4.47zM280.34 756.28c27.11 0 54.05 7.11 78.4 21.17 42.69 24.65 70.85 66.87 77.28 115.85 1.51 11.54 9.16 19.93 19.47 21.37 18.63 2.6 37.64 3.92 56.51 3.92 18.87 0 37.88-1.32 56.5-3.92 10.31-1.44 17.96-9.83 19.47-21.37 6.42-48.98 34.59-91.21 77.28-115.85 42.82-24.72 93.6-27.95 139.32-8.85 10.17 4.25 22.09 0.98 29-7.94a405.833 405.833 0 0 0 54.55-94.29c4.32-10.52 1.21-22.54-7.57-29.23-39.44-30.05-62.05-75.66-62.05-125.13s22.62-95.08 62.05-125.13c8.78-6.69 11.89-18.71 7.57-29.23-13.83-33.68-32.19-65.41-54.55-94.29-6.91-8.92-18.83-12.19-29-7.94-45.72 19.1-96.5 15.87-139.32-8.85-42.69-24.64-70.86-66.87-77.28-115.85-1.51-11.54-9.16-19.93-19.47-21.37-18.62-2.6-37.63-3.92-56.5-3.92-18.87 0-37.88 1.32-56.51 3.92-10.31 1.44-17.96 9.83-19.47 21.37-6.42 48.98-34.59 91.2-77.27 115.85-42.82 24.72-93.61 27.95-139.33 8.85-10.16-4.24-22.09-0.98-29 7.94a405.833 405.833 0 0 0-54.55 94.29c-4.32 10.52-1.21 22.54 7.57 29.23 39.44 30.05 62.06 75.66 62.06 125.13s-22.62 95.08-62.06 125.13c-8.78 6.69-11.89 18.71-7.57 29.23a405.833 405.833 0 0 0 54.55 94.29c6.91 8.92 18.83 12.19 29 7.94 19.71-8.24 40.37-12.32 60.92-12.32z" p-id="809"></path>
        </svg>
    </div>
    `
    const pannel_HTML = `
    <div class='setting-pannel'>
        <div class='setting-pannel-inner' style="margin: auto;">
            <div>
                <div class='inlane'>全屏切换 -></div>
                <input id='hotkey-input' class='setting-input' type="text"
                    onkeydown="input_key(event,'fullscreen')">
                <div id='fullscreen' class='inlane'>key</div>
            </div>
            <div>
                <div class='inlane'>弹幕开关 -></div>
                <input id='hotkey-input' class='setting-input' type="text" onkeydown="input_key(event,'danmu')">
                <div id='danmu' class='inlane'>key</div>
            </div>
            <div>
                <div class='inlane'>静音开关 -></div>
                <input id='hotkey-input' class='setting-input' type="text" onkeydown="input_key(event,'muted')">
                <div id='muted' class='inlane'>key</div>
            </div>
            <div style="top: 5px;margin: auto;">
                <div id='setting-clear' class='setting-btn inlane'>清空</div>
                <div id='setting-close' class='setting-btn inlane'>完毕</div>
            </div>
        </div>
    </div>
    <script>

    </script>
    `
    const setting_CSS = `
    .setting-pannel {background-color: rgb(181, 240, 133);
        width: 200px;height: 90px;
        border: 2px solid rgb(128, 126, 126);
        padding: 5px;margin: auto;position: relative;
        top: 100px;font-size: 13;border-radius: 5px;
        z-index: 99999;visibility:hidden;
        }

    .setting-input {margin: auto;width: 30px;}

    .setting-btn {margin: auto;width: 60px;text-align: center;}

    .inlane {display: inline;}
    `
    loadStyle(setting_CSS)
    let icon_placer = document.querySelector('div.ChatToolBar'),
        pannel_placer = document.querySelector('div.layout-Player-asideMain');

    $(icon_HTML).appendTo(icon_placer)
    $(pannel_HTML).appendTo(pannel_placer)


    let load_config = ''
    loadSettingConf().then(result => { load_config = result });
    var setting_pannel = document.querySelector('div.setting-pannel')

    var btn_setting = document.querySelector('#setting-icon');
    btn_setting.addEventListener("click", showSettingPannel);
    var btn_close = document.querySelector('#setting-close');
    btn_close.addEventListener("click", hideSettingPannel);
    var btn_clear = document.querySelector('#setting-clear')
    btn_clear.addEventListener("click", hideSettingPannel);
}
var setting_hotkey = {
    fullscreen: '',
    danmu: '',
    muted: '',
}

function showSettingPannel() {
    document.querySelector('div.setting-pannel').style.visibility = 'visible'
}
function clearSettingPannel() {
    document.querySelector('div.setting-pannel').style.visibility = 'visible'
}

function isKeyValid(key1, key2, key3) {
    let arr = new Array()
    if (key1 != '') {
        arr.push(key1)
    }
    if (key2 != '') {
        arr.push(key2)
    }
    if (key3 != '') {
        arr.push(key3)
    }
    let narr = arr.sort();
    for (let i = 0; i < narr.length - 1; i++) {
        if (narr[i] == narr[i + 1]) {
            // alert("重复内容：" + narr[i]);
            return false
        }
    }
    return true
}

function hideSettingPannel() {
    console.log('close')
    if (isKeyValid(setting_hotkey['fullscreen'], setting_hotkey['danmu'], setting_hotkey['muted'])) {
        document.querySelector('div.setting-pannel').style.visibility = 'hidden'
    } else {
        alert('快捷键冲突');
        // setting_hotkey = {
        //     fullscreen: '',
        //     danmu: '',
        //     muted: '',
        // }
    }
};
function settingClear() {
    setting_hotkey = {
        fullscreen: '',
        danmu: '',
        muted: '',
    }
    console.log(setting_hotkey)
};
function pannel_save() {
    setting_pannel.style.visibility = 'visible'
};
function input_key(flag, elem_ID) {
    let selector = '#' + elem_ID
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if (e && e.keyCode) { // 按 Esc
        if (CODE2KEY[event.keyCode]) {
            // console.log('按下了：', CODE2KEY[event.keyCode]);
            document.querySelector(selector).textContent = CODE2KEY[event.keyCode]
            document.querySelector(selector).setAttribute('keycode', event.keyCode)
            setting_hotkey[elem_ID] = event.keyCode
            // console.log(setting_hotkey)
        }
    }
}

async function saveSettingConf() {
    await GM.setValue('setting_config', setting_hotkey);
    let config = await GM.getValue('setting_config');
    console.log('按键设置已保存：', config);
}

async function loadSettingConf() {
    let config = await GM.getValue('setting_config')
    if (config == void 0) {
        console.log('未设置按键');
        return {
            fullscreen: '-1',
            danmu: '-1',
            muted: '-1',
        }
    } else {
        console.log('按键设置已加载：', config);
        return config
    }
}

const CODE2KEY = {
    '8': 'BackSpace',
    '9': 'Tab',
    '12': 'Clear',
    '13': 'Enter',
    '16': 'Shift',
    '17': 'Control',
    '18': 'Alt',
    '19': 'Pause',
    '20': 'CapsLock',
    '27': 'Escape',
    '32': 'space',
    '33': 'Prior',
    '34': 'Next',
    '35': 'End',
    '36': 'Home',
    '37': 'Left',
    '38': 'Up',
    '39': 'Right',
    '40': 'Down',
    '41': 'Select',
    '42': 'Print',
    '43': 'Execute',
    '45': 'Insert',
    '46': 'Delete',
    '47': 'Help',
    '48': '0',
    '49': '1',
    '50': '2',
    '51': '3',
    '52': '4',
    '53': '5',
    '54': '6',
    '55': '7',
    '56': '8',
    '57': '9',
    '65': 'a',
    '66': 'b',
    '67': 'c',
    '68': 'd',
    '69': 'e',
    '70': 'f',
    '71': 'g',
    '72': 'h',
    '73': 'i',
    '74': 'j',
    '75': 'k',
    '76': 'l',
    '77': 'm',
    '78': 'n',
    '79': 'o',
    '80': 'p',
    '81': 'q',
    '82': 'r',
    '83': 's',
    '84': 't',
    '85': 'u',
    '86': 'v',
    '87': 'w',
    '88': 'x',
    '89': 'y',
    '90': 'z',
    '96': 'KP_0',
    '97': 'KP_1',
    '98': 'KP_2',
    '99': 'KP_3',
    '100': 'KP_4',
    '101': 'KP_5',
    '102': 'KP_6',
    '103': 'KP_7',
    '104': 'KP_8',
    '105': 'KP_9',
    '106': 'KP_Multiply',
    '107': 'KP_Add',
    '108': 'KP_Separator',
    '109': 'KP_Subtract',
    '110': 'KP_Decimal',
    '111': 'KP_Divide',
    '112': 'F1',
    '113': 'F2',
    '114': 'F3',
    '115': 'F4',
    '116': 'F5',
    '117': 'F6',
    '118': 'F7',
    '119': 'F8',
    '120': 'F9',
    '121': 'F10',
    '122': 'F11',
    '123': 'F12',

}
const KEY2CODE = {
    'BackSpace': 8,
    'Tab': 9,
    'Clear': 12,
    'Enter': 13,
    'Shift': 16,
    'Control': 17,
    'Alt': 18,
    'Pause': 19,
    'CapsLock': 20,
    'Escape': 27,
    'space': 32,
    'Prior': 33,
    'Next': 34,
    'End': 35,
    'Home': 36,
    'Left': 37,
    'Up': 38,
    'Right': 39,
    'Down': 40,
    'Select': 41,
    'Print': 42,
    'Execute': 43,
    'Insert': 45,
    'Delete': 46,
    'Help': 47,
    '0': 48,
    '1': 49,
    '2': 50,
    '3': 51,
    '4': 52,
    '5': 53,
    '6': 54,
    '7': 55,
    '8': 56,
    '9': 57,
    'a': 65,
    'b': 66,
    'c': 67,
    'd': 68,
    'e': 69,
    'f': 70,
    'g': 71,
    'h': 72,
    'i': 73,
    'j': 74,
    'k': 75,
    'l': 76,
    'm': 77,
    'n': 78,
    'o': 79,
    'p': 80,
    'q': 81,
    'r': 82,
    's': 83,
    't': 84,
    'u': 85,
    'v': 86,
    'w': 87,
    'x': 88,
    'y': 89,
    'z': 90,
    'KP_0': 96,
    'KP_1': 97,
    'KP_2': 98,
    'KP_3': 99,
    'KP_4': 100,
    'KP_5': 101,
    'KP_6': 102,
    'KP_7': 103,
    'KP_8': 104,
    'KP_9': 105,
    'KP_Multiply': 106,
    'KP_Add': 107,
    'KP_Separator': 108,
    'KP_Subtract': 109,
    'KP_Decimal': 110,
    'KP_Divide': 111,
    'F1': 112,
    'F2': 113,
    'F3': 114,
    'F4': 115,
    'F5': 116,
    'F6': 117,
    'F7': 118,
    'F8': 119,
    'F9': 120,
    'F10': 121,
    'F11': 122,
    'F12': 123,

}

const Controller_Selectors = {
    'muted': ['div.volume-8e2726', 'div.volume-silent-3eb726'],
    'danmu': ['div.showdanmu-42b0ac', 'div.hidedanmu-5d54e2'],
    'fullscreen': ['div.fs-781153', 'div.fs-exit-b6e6a7'],
}
const KeyMap = {
    'Control': 'muted',
    'Tab': 'danmu',
    'Shift': 'fullscreen',
}

const ClickedClassName = 'removed-9d4c42'
function isClicked(dom) {
    let class_name = dom.className.split(' ')
    // console.log(class_name)
    if (class_name.includes(ClickedClassName)) {
        return true
    } else {
        return false
    };
}

function checkKey(keyCode) {
    if (KeyMap[keyCode]) {
        let selectors = Controller_Selectors[KeyMap[keyCode]]
        let dom1 = document.querySelector(selectors[0])
        let dom2 = document.querySelector(selectors[1])
        if (isClicked(dom1)) {
            dom2.click()
        } else {
            dom1.click()
        }

    }
}

function addKeyboardListener() {

    let dom_selector = 'div.right-e7ea5d' //播放器控制组件
    waitDom(dom_selector, function () {

        console.log('初始化按键监听')
        addSettingPannel();
        document.onkeydown = function (event) {
            var e = event || window.event || arguments.callee.caller.arguments[0];
            if (e && e.keyCode) { // 按 Esc
                if (CODE2KEY[event.keyCode]) {
                    // console.log('按下了：', CODE2KEY[event.keyCode]);
                    checkKey(CODE2KEY[event.keyCode])
                }
            }
        };
    })
};


function modifiedMyFollow() {
    var curent_path = window.location.pathname;
    if (curent_path == "/directory/myFollow") {

        //移除‘我的关注’页面推广主播
        let dom_selector = "div.AthenaBoothPanel-content";
        waitDom(dom_selector, function () {
            var cover_list = document.querySelectorAll("li.layout-Cover-item");
            var cover_0 = cover_list[0].querySelector('div.layout-Cover-card').getAttribute('class') == "layout-Cover-card",
                cover_1 = cover_list[1].querySelector('div.layout-Cover-card').getAttribute('class') == "layout-Cover-card dycard-first";
            if (cover_0 & cover_1) {
                cover_list[0].remove();
                console.log('[Neat Douyu Stream]移除‘我的关注’页面推广主播')
                let parent = document.querySelector("#js-follow > section > div.layout-Module-container.layout-Cover.ScrollTabFrame-layoutContainer > ul");
                let frame = "<iframe src='https://www.douyu.com/72751'></iframe>"
                //$(frame).prependTo(parent);
                //cover_list[1].innerHTML = frame;
            };

            //调整收藏页面，增加开播时间显示
            let css_stream = ".DyLiveCover-user {display: block;padding-right: 5px;overflow: hidden;-o-text-overflow: ellipsis;text-overflow: ellipsis;white-space: nowrap;color: #888;font-size: 10px;line-height: 24px;margin: 0;font-weight: 500}"
            loadStyle(css_stream);

            cover_list.forEach(each => {
                let cover_card = each.querySelector("div.DyLiveCover")
                if (cover_card) {
                    let stream_start_time = timeStampTurnTime(cover_card.getAttribute("showtime")),
                        stream_title = cover_card.querySelector("h2.DyLiveCover-user")
                    if (stream_start_time) {
                        console.log(stream_start_time);
                        stream_title.innerText = stream_start_time
                        //stream_title.style.fontSize = 10;
                    }
                }
            });

        });
    };
};



function autoClickFullscreen() {
    let dom_selector = "div.wfs-2a8e83"

    waitDom(dom_selector, function () {
        document.querySelector(dom_selector).click();
        console.log('[Neat Douyu Stream]页面自动全屏');
    });

};

function changeDom() {
    let dom_selector = "div.Barrage";
    waitDom(dom_selector, function () {
        document.querySelector(dom_selector).style.top = "38px";//调整弹幕区域高度
        console.log('[Neat Douyu Stream]弹幕区域已调整');
    });
};

var css = '{display:none !important;height:0 !important}';
css += '.layout-Player-rank{display:none !important}';
css += '.layout-Player-barrage{top:0px !important;}';
css += '.layout-Player-video{bottom:0px !important}';
css += '.layout-Player-toolbar{visibility:hidden !important;}';
css += '.layout-Bottom{display:none !important;}';
css += '.guessGameContainer.is-normalRoom{display:none !important;}';
css += '.DropPane-ad{display:none !important}';
css += '.SignBaseComponent-sign-ad{display:none !important}';
//css += '.AnchorAnnounce{display:none !important;}';  //斗鱼真实人数显示
//css += '.FansMedalPanel-enter{display:none !important;}'; //牌子
css += '.layout-Aside{display:none !important;}';
css += '.Header-download-wrap{display:none !important;}';
css += '.Header-broadcast-wrap{display:none !important;}';
css += '#js-header > div > div > div.Header-left > div > ul > li:nth-child(5){display:none !important;}';
css += '.ChatNobleBarrage{display:none !important;}';
css += '.ChatFansBarrage{display:none !important;}';
css += '.Horn4Category{display:none !important;}';
css += '.FirePower{display:none !important;}';
css += '.TreasureDetail{display:none !important;}';
css += '.SignChatAd-chat-ad-cls{display:none !important;}';
css += '.Promotion-nobleRights{display:none !important;}';
css += '.Task{display:none !important;}';
css += '.UPlayerLotteryEnter.is-active{display:none !important;}';
css += '.LotteryContainer{display:none !important;}';
css += '.layout-Module-head.FollowList-head.is-fixed{display:none !important;}';
css += '.layout-Banner-item{display:none !important;}';
css += '.layout-Module-extra{display:none !important;}';
css += '.Title-anchorPic{display:none !important;}';
css += '.Title-roomOtherBottom{display:none !important;}';
css += '.Act129684Bar-view1{display:none !important;}';
css += '.Act129684Bar-content{display:none !important;}';
css += '.Act129684-logo{display:none !important;}';
css += '.ActBase-switch{display:none !important;}';
css += '.HeaderNav{display:none !important;}';
css += '.HeaderGif-left{display:none !important;}';
css += '.HeaderGif-right{display:none !important;}';
css += '.Prompt-container{display:none !important;}';
css += '.SysSign-Ad{display:none !important;}';
css += '.ActDayPay-toast{display:none !important;}';
css += '.code_box-5cdf5a{display:none !important;}';
css += '.normalDiv-8b686d{display:none !important;}';
css += '.closeBg-998534{display:none !important;}';
css += '.bg-d4758b{display:none !important;}';
css += '.fireOpenRanking react-draggable react-draggable-dragged{display:none !important;}';
css += '.vsFestival1908{display:none !important;}';
css += '.ActSuperFansGroup-component.ActSuperFansGroupBar-normalBody{display:none !important;}';
css += '.ActSuperFansGroup-component.ActSuperFansGroupBar-miniBody{display:none !important;}';
css += '.ActSuperFansGroup-component.ActSuperFansGroupBar-plusBody{display:none !important;}';
css += '.ActSuperFansGroup-logo{display:none !important;}';
css += '.ActSuperFansGroup-switch{display:none !important;}';
css += '.TitleSuperFansIcon{display:none !important;}';
css += '.Act156581Bar{display:none !important;}';
css += '.Act159742Bar-main--pre{display:none !important;}';
css += '.Act159742-logo{display:none !important;}';
css += '.Act159742Bar-wrap{display:none !important;}';
css += '.Title-columnTag{display:none !important;}';
css += '.Title-impress.clearFix{display:none !important;}';
css += '#js-room-activity{display:none !important;}'; //活动 年度决赛 巅峰排行

function loadStyle(css) {


    var style = document.createElement('style');
    style.type = 'text/css';
    style.rel = 'stylesheet';
    style.appendChild(document.createTextNode(css));
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(style);
    console.log('[Neat Douyu Stream]css已加载');

};

function formatNumber(fmt_num) {
    let num_tmp = Number(fmt_num)
    //console.log('num_tmp ->',num_tmp)
    if (num_tmp == void 0) {
        return '0'
    } else {
        if (num_tmp > 10000) {
            return String((num_tmp / 10000).toFixed(1)) + '万'
        } else {
            return String(fmt_num)
        }
    }
};

function genIcon(lable, message, color) {
    if (lable !== '') {
        lable = encodeURI(lable)
    }
    message = encodeURI(message)
    if (color === '') {
        color = 'E61A1A'
    }
    let img_src = 'https://img.shields.io/badge/' + lable + '-' + message + '-' + color
    let icon = '<img src="' + img_src + '"></img>';
    return icon
};

function getRealViewer() {
    let viewIcon = '<svg style="width:16px;height:16px" t="1566119680547" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3494" width="128" height="128"><path d="M712.820909 595.224609C807.907642 536.686746 870.40537 437.74751 870.40537 325.549212 870.400378 145.753547 709.943392 0 511.997503 0 314.055363 0 153.599626 145.753547 153.599626 325.549212 153.599626 437.74751 216.092361 536.686746 311.179092 595.219615 149.961841 657.72608 31.268214 793.205446 5.334335 955.968198 1.926253 962.195123 0 969.212275 0 976.638899 0 1002.324352 22.919038 1023.151098 51.198627 1023.151098 79.476967 1023.151098 102.396005 1002.324352 102.396005 976.638899L102.396005 1023.151098C102.396005 817.669984 285.787009 651.099674 511.997503 651.099674 738.212992 651.099674 921.602746 817.669984 921.602746 1023.151098L921.602746 976.638899C921.602746 1002.324352 944.523034 1023.151098 972.801376 1023.151098 1001.07472 1023.151098 1024 1002.324352 1024 976.638899 1024 969.212275 1022.073747 962.195123 1018.659424 955.968198 992.731789 793.205446 874.038157 657.72608 712.820909 595.224609ZM511.997503 558.080262C370.618285 558.080262 256.000624 453.967732 256.000624 325.545467 256.000624 197.121954 370.618285 93.009424 511.997503 93.009424 653.386707 93.009424 767.993133 197.121954 767.993133 325.545467 767.993133 453.972726 653.386707 558.080262 511.997503 558.080262L511.997503 558.080262Z" p-id="3495"></path></svg>'
    let hotIcon = '<svg style="width:16px;height:16px" t="1566119430182" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3302" width="128" height="128"><path d="M255.83 338.84C93.092 480.356 75.837 726.967 217.317 889.716s388.08 179.926 550.863 38.514 179.948-388.08 38.469-550.83S519.257 94.96 521.197 0c-56.964 84.64-228.94 267.227-148.224 491.091-82.7-22.871-99.888-101.624-117.143-152.25z" fill="#F96A6A" p-id="3303"></path></svg>'
    let a = {
        view: "",
        showtime: "",
        hot: ""
    }

    let myFollow_icon = '<svg style="width:18px;height:18px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"  width="100%" height="100%"><title>我的关注</title><path d="M20.801 3.2c5.371 0.002 9.597 4.082 9.597 9.6 0 6.126-4.669 11.381-13.686 15.835-0.447 0.221-0.97 0.221-1.417 0-9.023-4.454-13.695-9.709-13.695-15.835 0-5.524 4.244-9.6 9.598-9.6 1.757 0 3.343 0.559 4.811 1.596 0.346-0.241 0.695-0.456 1.051-0.644 1.078-0.595 2.335-0.952 3.74-0.952h0.001zM13.926 7.248c-0.878-0.566-1.769-0.848-2.726-0.848-3.615 0-6.398 2.673-6.398 6.4 0 4.509 3.637 8.733 11.203 12.609 7.561-3.875 11.195-8.1 11.195-12.609 0-3.726-2.77-6.4-6.4-6.4-0.897 0-1.75 0.263-2.614 0.794-0.405 0.31-0.764 0.695-1.083 1.141-0.685 0.96-1.103 2.213-1.103 2.864 0 0.884-0.716 1.6-1.6 1.6s-1.6-0.716-1.6-1.6c0-1.306 0.395-2.7 1.126-3.952z"></path></svg>'
    let myFollow = "<a href='/directory/myFollow' target='_blank'>" + myFollow_icon + "  " + "</a>";
    //let myFollow = genIcon('我的收藏',10,'E61A1A')
    let url = document.getElementsByTagName('html')[0].innerHTML;
    let urlLen = ("$ROOM.room_id =").length;
    let ridPos = url.indexOf('$ROOM.room_id =');
    let rid = url.substring(ridPos + urlLen, url.indexOf(';', ridPos + urlLen));
    rid = rid.trim();

    if (document.querySelector(".MatchSystemChatRoomEntry") != null) {
        document.querySelector(".MatchSystemChatRoomEntry").style.display = "none";
    }
    $.get("https://www.douyu.com/swf_api/h5room/" + rid, function (retData) {

        /*
        a.view = retData.data.online;
        a.view = formatNumber(a.view)
        a.view = '<span style="color:red">' + a.view + "</span>"
        a.view = "<div style='display: inline-block;' title='观看人数'>" + viewIcon + a.view + "</div>"
        */
        a.hot = document.querySelector(".Title-anchorText").innerHTML;
        a.hot = formatNumber(a.hot)
        a.hot = '<span style="color:blue">' + a.hot + "</span>"
        a.showtime = timeStampTurnTime(retData.data.show_time);
        a.hot = "<div style='display: inline-block;' title='热度'>" + hotIcon + a.hot + "</div>"


        /*
        a.view = retData.data.online;
        a.view = genIcon('人数',formatThousand(a.view),'')

        a.hot = document.querySelector(".Title-anchorText").innerHTML;
        a.hot = genIcon('人气',formatThousand(a.hot),'')
        */
        document.querySelector(".AnchorAnnounce").innerHTML = myFollow + a.view + "  " + a.hot + '<span style="float:right">' + "开播时间:" + a.showtime + "</span>";
    });
};

function timeStampTurnTime(timeStamp) {
    if (timeStamp > 0) {
        let date = new Date();
        date.setTime(timeStamp * 1000);
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let minute = date.getMinutes();
        let second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
    } else {
        return "";
    }

};


function autoSwitch() {
    const startTime = new Date().getTime()
    let count = 1
    let dom = Array.from(document.querySelectorAll('input')).find((item, index) => { return item.value.includes('画质') });

    if (dom) {

        const ul_dom = Array.from(dom.parentNode.childNodes).find((item) => item.tagName == 'UL')
        const li_dom = Array.from(ul_dom.childNodes)
        let seleteIndex = 0
        li_dom.forEach((item, index) => {
            if (item.className != '') {
                seleteIndex = index
            }
        })
        if (seleteIndex == 0) {
            const endTime = new Date().getTime()
            console.log('默认为最高画质，无需切换')
            console.log(`脚本结束，耗时：${(endTime - startTime) / 1000}秒`)
        } else {
            const endTime = new Date().getTime()
            const old_quality = li_dom[seleteIndex].innerText
            const new_quelity = li_dom[0].innerText
            li_dom[0].click()
            console.log(`已从${old_quality}切换到${new_quelity}`)
            console.log(`脚本结束，耗时：${(endTime - startTime) / 1000}秒`)
            console.log('[Neat Douyu Stream]画质已切换为最高');
        }
    } else {
        if (count++ < 50) {
            setTimeout(() => {
                autoSwitch()
            }, 200)
        } else {
            console.log('脚本结束，可能此网站不是直播间')
        }
    }
};
