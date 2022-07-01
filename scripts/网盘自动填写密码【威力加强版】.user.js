// ==UserScript==
// @name            网盘自动填写密码【威力加强版】
// @description	    智能融合网盘密码到网址中，打开网盘链接时不再需要手动复制密码，并自动提交密码，一路畅通无阻。同时记录网盘信息，当你再次打开该分享文件时，不再需要去找提取码，同时可追溯网盘地址的来源。
// @author          极品小猫
// @namespace       https://greasyfork.org/zh-CN/users/3128
// @version         3.12.7
// @date            2015.10.30
// @modified        2020.03.01
//
// @include         http://*
// @include         https://*
//
// @exclude         http*://*.pcs.baidu.com/*
// @exclude         http*://*.baidupcs.com/*
// @exclude         http*://*:8666/file/*
// @exclude         http*://*.baidu.com/file/*
// @exclude         http*://index.baidu.com/*
//
// @exclude         http*://*.gov/*
// @exclude         http*://*.gov.cn/*
// @exclude         http*://*.taobao.com/*
// @exclude         http*://*.tmall.com/*
// @exclude         http*://*.alimama.com/*
// @exclude         http*://*.jd.com/*
// @exclude         http*://*.zol.com.cn/*
// @exclude         http*://*.ctrip.com/*
// @exclude         http*://*.evernote.com/*
// @exclude         http*://*.yinxiang.com/*
// @exclude         http*://mail.*
// @exclude         http*://ping.*
// @exclude         http*://inbox.google.com/*
// @exclude         /^https?://(localhost|10\.|192\.|127\.)/
// @exclude         /https?://www.baidu.com/(?:s|baidu)\?/
// @exclude         http*://www.zhihu.com/question/*/answers/created
// @require         https://cdn.staticfile.org/jquery/2.1.4/jquery.min.js
// @require         https://greasyfork.org/scripts/35940-my-jquery-plugin/code/My%20jQuery%20Plugin.js?version=234478
// @supportURL      https://greasyfork.org/zh-CN/scripts/29762/feedback
// @icon            https://eyun.baidu.com/box-static/page-common/images/favicon.ico

// @connect         agefans.tv
// @grant           unsafeWindow
// @grant           GM_setValue
// @grant           GM_getValue
// @grant           GM_deleteValue
// @grant           GM_listValues
// @grant           GM_addStyle
// @grant           GM_xmlhttpRequest
// @grant           GM_notification
// @grant           GM_registerMenuCommand
// @grant           GM_info
// @noframes
// @encoding        utf-8
// @run-at          document-idle
// ==/UserScript==

var urls=location.href,
    hash=location.hash,
    host=location.hostname.replace(/^www\./i,'').toLowerCase(),
    search=location.search,
    paths=location.pathname.toLowerCase(),
    Control_newTag=true, // 网盘链接添加以新页面打开属性
    u=unsafeWindow;

//console.log('GM_ValueInfo: ',GM_listValues(), GM_getValue('CatPW_Manage'), GM_getValue('CatPW'));
//管理功能开关 & 设置
var CatPW_Manage_Config, // 管理功能配置，采用 GM_setValue API进行保存，非 localStorage
    StorageSave, // 信息记录功能，localStorage 记录密码开关
    StorageExp, // localStorage 记录密码的有效期(天数)
    UpdataConfig={
      UpdataSave:true, // 再次访问该网盘地址时，更新信息
      UpdataNotify:true, // 更新该网盘地址时，发出桌面通知
      UpdataPlugin:true, // 脚本更新后，发出桌面通知
      UpdataVersion:GM_info.script.version //记录脚本的版本号
    };

if(GM_getValue('CatPW_Manage')==='undefined'||GM_getValue('CatPW_Manage')===undefined) {
  CatPW_Manage_Config={'StorageSave':true,'UpdataConfig':UpdataConfig,'StorageExp':365};
  GM_setValue('CatPW_Manage', CatPW_Manage_Config);
} else {
  CatPW_Manage_Config=GM_getValue('CatPW_Manage');
  if(!CatPW_Manage_Config.UpdataConfig) {
      CatPW_Manage_Config.UpdataConfig=UpdataConfig;
      GM_setValue('CatPW_Manage', CatPW_Manage_Config);
  }
  if(!CatPW_Manage_Config.UpdataConfig.UpdataVersion) {
      CatPW_Manage_Config.UpdataConfig.UpdataVersion=GM_info.script.version;
      GM_setValue('CatPW_Manage', CatPW_Manage_Config);
  }
}

StorageSave=CatPW_Manage_Config.StorageSave;
StorageExp=CatPW_Manage_Config.StorageExp;
UpdataConfig=CatPW_Manage_Config.UpdataConfig;

var Cat = {
  changelog : {
    "3.12.7" : {
      "date" : "2020.03.01",
      "info" : "【特殊支持】agefans.tv",
      "detail" : "【特殊支持】agefans.tv，网盘地址免跳转"
    }
  },
  UpdataPlugin : function(e){
    //插件更新提示
    var v1=CatPW_Manage_Config.UpdataConfig.UpdataVersion, v1arr=v1.split('.');
    var v2=GM_info.script.version, v2arr=v2.split('.');
    if(this.changelog[v2]) {
      for(i=0;i<v2.length;i++){
        if(this.changelog[v2]&&Number(v2arr[i])>Number(v1arr[i])) {
          GM_notification({
            'title' : GM_info.script.name + ' 更新日志',
            'text' : '本次更新内容（该消息仅提醒一次）'+'\n当期版本：'+v2+'\n更新日期：'+this.changelog[v2]['date']+'\n'+this.changelog[v2]['info'],
            'image' : 'https://eyun.baidu.com/box-static/page-common/images/favicon.ico',
            'timeout' : 60,
            'onclick' : function(e){
              alert('更新日志详细\r\n'+Cat.changelog[v2]['detail']||Cat.changelog[v2]['info']);
            }
          });
          CatPW_Manage_Config.UpdataConfig.UpdataVersion=v2;
          GM_setValue('CatPW_Manage', CatPW_Manage_Config);
          break;
        }
      }
    } else {
        console.error('网盘自动填写密码【威力加强版】版本号信息与当前更新日志不符，无法显示更新提示。');
    }
  },
  init : function(){
    this.UpdataPlugin();//更新提示
  }
};
Cat.init();

var site = {
    'pwdRule' : /(?:提取|访问)[码碼]?\s*[:： ]?\s*([a-z\d]{4})/,			//常规密码
    'codeRule' : /(?:(?:提取|访问|密[码碼]|艾|Extracted-code)[码碼]?)\s*[:： ]?\s*([a-z\d]{4})/i,	//其它类型的密码
    'YunDisk':{
        'pan.baidu.com':{
            surl	:	getQueryString('surl')||location.pathname.replace('/s/1',''),
            chk	:	/^[a-z0-9]{4}$/,
            code	:	'.pickpw input, #accessCode',
            btn	:	'.g-button, #submitBtn, #getfileBtn',
            PreProcess: function() {	//已处理

                console.group('===== 百度网盘自动填写密码 Begin =====');
                var CatPW_BaiduPan={
                    CatPW_Manage : function(){
                        var CatPW_Manage_Menu_Fn = {
                            infoFn : function(e){ //信息记录功能
                                StorageSave=CatPW_Manage_Config.StorageSave=StorageSave?!confirm('你已开启“信息记录功能”，是否需要关闭？'):confirm('你已关闭“信息记录功能”，是否需要开启？');
                                $(this).text(StorageSave?'已开启信息记录功能':'已关闭信息记录功能');
                                CatPW_Manage_Menu_Fn.save();
                                CatPW_BaiduPan.ShowInfo();
                            },
                            UpdataConfigFn : {
                                UpdataSave : function(e){
                                    UpdataConfig.UpdataSave=CatPW_Manage_Config.UpdataConfig.UpdataSave=UpdataConfig.UpdataSave?!confirm('你已开启“信息记录更新功能”，是否需要关闭？'):confirm('你已关闭“信息记录更新功能”，是否需要开启？');
                                    $(this).text(UpdataConfig.UpdataSave?'已开启记录更新功能':'已关闭记录更新功能');
                                    CatPW_Manage_Menu_Fn.save();
                                },
                                UpdataNotify : function(e){
                                    UpdataConfig.UpdataNotify=CatPW_Manage_Config.UpdataConfig.UpdataNotify=UpdataConfig.UpdataNotify?!confirm('你已开启“信息记录更新桌面通知功能”，是否需要关闭？'):confirm('你已关闭“信息记录更新桌面通知功能”，是否需要开启？');
                                    $(this).text(UpdataConfig.UpdataNotify?'已开启更新桌面通知':'已关闭更新桌面通知');
                                    CatPW_Manage_Menu_Fn.save();
                                },
                                UpdataPlugin : function(e){
                                    UpdataConfig.UpdataPlugin=CatPW_Manage_Config.UpdataConfig.UpdataPlugin=UpdataConfig.UpdataPlugin?!confirm('你已开启“脚本更新桌面通知功能”，是否需要关闭？'):confirm('你已关闭“脚本更新桌面通知功能”，是否需要开启？');
                                    $(this).text(UpdataConfig.UpdataPlugin?'脚本更新桌面通知':'脚本更新不通知');
                                    CatPW_Manage_Menu_Fn.save();
                                },
                                MessageUI : function(e){
                                    UpdataConfig.MessageUI=CatPW_Manage_Config.UpdataConfig.MessageUI=UpdataConfig.MessageUI?!confirm('你已开启“浮动窗式的网盘信息”，是否切换为“网页嵌入式的网盘信息”？'):confirm('你已开启“网页嵌入式的网盘信息”，是否切换为“浮动窗式的网盘信息”？');
                                    $(this).text(UpdataConfig.MessageUI?'使用嵌入式的网盘信息':'使用浮动窗的网盘信息');
                                    CatPW_Manage_Menu_Fn.save();
                                    location.reload();
                                }
                            },
                            Exp : function(e){
                                var _StorageExpTemp;
                                do{
                                    _StorageExpTemp=prompt("设置信息保存时间（天数）：", _StorageExpTemp||StorageExp)||_StorageExpTemp||StorageExp;
                                    if(!/^\d+$/.test(_StorageExpTemp)) {
                                        alert('所设置的天数不是数字，请重新设置');
                                    }
                                    else break;
                                } while(!/^\d+$/.test(_StorageExpTemp));
                                StorageExp=CatPW_Manage_Config.StorageExp=_StorageExpTemp;
                                $(this).text('信息保存时间：'+_StorageExpTemp+'天');
                                CatPW_Manage_Menu_Fn.save();
                            },
                            CleanInfo : function(e){
                                var _CleanInfo=confirm("如果所记录的信息并没有及时更新，可通过该功能清除记录。");
                                if(_CleanInfo) GM_setValue('CatPW', {});
                            },
                            save : function(){
                                GM_setValue('CatPW_Manage', CatPW_Manage_Config);
                            }
                        };
                        var CatPW_Manage_Main=$('<span>').attr({'class':'g-dropdown-button'}).css({'width':'135px'});
                        var CatPW_Manage_A=$('<a>').attr({'class':'g-button','data-button-id':'b300','data-button-index':'300','href':'javascript:void(0);'});
                        var CatPW_Manage_A_span=$('<span class="g-button-right">');
                        var CatPW_Manage_A_span_span=$('<span class="text">').text('密码填写管理');
                        var CatPW_Manage_Menu=$('<span class="menu" style="width:auto;z-index:41;">');
                        var CatPW_Manage_Menu_infoFn=$('<A class="g-button-menu" href="javascript:void(0);">').text(StorageSave?'已开启信息记录功能':'已关闭信息记录功能').attr({'data-menu-id':'b-menu307'}).click(CatPW_Manage_Menu_Fn.infoFn);
                        var CatPW_Manage_Menu_Exp=$('<A class="g-button-menu" href="javascript:void(0);">').text('信息保存时间：'+StorageExp+'天').attr({'data-menu-id':'b-menu308'}).click(CatPW_Manage_Menu_Fn.Exp);
                        var CatPW_Manage_Menu_CleanInfo=$('<A class="g-button-menu" href="javascript:void(0);">').text('清除缓存记录信息').attr({'data-menu-id':'b-menu309'}).click(CatPW_Manage_Menu_Fn.CleanInfo);
                        var CatPW_Manage_Menu_UpdataSave=$('<A class="g-button-menu" href="javascript:void(0);">').text(UpdataConfig.UpdataSave?'已开启记录更新功能':'已关闭记录更新功能').attr({'data-menu-id':'b-menu310'}).click(CatPW_Manage_Menu_Fn.UpdataConfigFn.UpdataSave);
                        var CatPW_Manage_Menu_UpdataNotify=$('<A class="g-button-menu" href="javascript:void(0);">').text(UpdataConfig.UpdataNotify?'已开启更新桌面通知':'已关闭更新桌面通知').attr({'data-menu-id':'b-menu311'}).click(CatPW_Manage_Menu_Fn.UpdataConfigFn.UpdataNotify);
                        var CatPW_Manage_Menu_UpdataPlugin=$('<A class="g-button-menu" href="javascript:void(0);">').text(UpdataConfig.UpdataPlugin?'脚本更新桌面通知':'脚本更新不通知').attr({'data-menu-id':'b-menu313'}).click(CatPW_Manage_Menu_Fn.UpdataConfigFn.UpdataPlugin);
                        var CatPW_Manage_Menu_MessageUI=$('<A class="g-button-menu" href="javascript:void(0);">').text(UpdataConfig.MessageUI?'使用嵌入式的网盘信息':'使用浮动窗的网盘信息').attr({'data-menu-id':'b-menu314'}).click(CatPW_Manage_Menu_Fn.UpdataConfigFn.MessageUI);


                        CatPW_Manage_A.append(CatPW_Manage_A_span);
                        CatPW_Manage_A_span.append(CatPW_Manage_A_span_span);
                        CatPW_Manage_Menu.append(CatPW_Manage_Menu_infoFn, CatPW_Manage_Menu_Exp, CatPW_Manage_Menu_CleanInfo, '<hr>', CatPW_Manage_Menu_UpdataSave, CatPW_Manage_Menu_UpdataNotify, CatPW_Manage_Menu_UpdataPlugin, CatPW_Manage_Menu_MessageUI);
                        CatPW_Manage_Main.insertBefore('.x-button-box>.g-button.g-button-blue');

                        CatPW_Manage_Main.append(CatPW_Manage_A).append(CatPW_Manage_Menu).hover(function(){
                            CatPW_Manage_Main.toggleClass('button-open');
                        });
                        GM_addStyle('.slide-show-right{width:650px!important;}');
                    },
                    ShowInfo : function(){
                        //显示信息记录
                        var CatPW_Info_Display=$('#CatPW_Info').css('display');
                        if(CatPW_Info_Display) {
                            if(CatPW_Info_Display=='none') $('#CatPW_Info').css('display','block');
                            else $('#CatPW_Info').css('display','none');
                        } else if(StorageSave){
                            //插入信息记录
                            var yunData=unsafeWindow.yunData, //取得 yunData 数据
                                CatPW,
                                CatPW_Format={'date':Dates(),'sCode':'', unPW:'', 'Src':'', 'surl':'', 'Hash':'', "webSrc":'', "webTitle":''};     //初始化信息记录变量
                            yunData.surl=getQueryString('surl')||location.pathname.replace('/s/1','');  //获取当前的分享ID
                            yunData.Src=getQueryString('surl')||location.href.replace(location.search,'');
                            //初始化 getValue 数据
                            if(GM_getValue('CatPW')=='undefined'||GM_getValue('CatPW')===undefined) {
                                if(StorageDB('Share_'+yunData.surl).read()) GM_setValue('CatPW', StorageDB('Share_'+yunData.surl).read());
                                else GM_setValue('CatPW', CatPW_Format);	//初始化
                            }
                            var isCatPW=GM_getValue('CatPW').Src.search(yunData.surl)>0;
                            var isCatPW_DB=StorageDB('Share_'+yunData.surl).read();
                            CatPW=isCatPW?GM_getValue('CatPW'):isCatPW_DB?isCatPW_DB:CatPW_Format;//取得信息记录
                            CatPW.Src=urls.replace(hash,'');
                            CatPW.surl='Share_'+yunData.surl;                                       //获取 分享文件surl
                            CatPW.unPW=decodeURIComponent(CatPW.unPW);
                            CatPW.webSrc=decodeURIComponent(CatPW.webSrc);
                            CatPW.webTitle=decodeURIComponent(CatPW.webTitle);
                            CatPW.sCode=CatPW.sCode||(CatPW.Hash?CatPW.Hash.replace('#',''):/^#/.test(hash)&&!/^#list\/path=/i.test(hash)?hash.match(/^#([^&]+)&?/)[1]:'');		//获取 提取码
                            if(!localStorage[CatPW.surl]) { //当不存在记录时，收集信息
                                console.log('不存在记录，插入信息', 'Src:'+CatPW.Src, 'surl:'+yunData.surl, CatPW);
                                if(CatPW.Src.search(yunData.surl)<0) {//新记录中的网盘地址与当前的分享ID不一致时，更新信息记录变量
                                    CatPW.Src=urls.replace(hash,'');
                                    CatPW.Hash=hash;
                                    CatPW.sCode=CatPW.sCode;
                                    CatPW.unPW=CatPW.webTitle=CatPW.webSrc=''; //当前网址与记录的信息不符时，只保留密码信息
                                }

                                CatPW.ShareUK=yunData.SHARE_UK;			                                    //获取 分享用户ID
                                CatPW.ShareID=yunData.SHARE_ID;		                                      //获取 分享文件ID
                                StorageDB(CatPW.surl).insert(CatPW);
                            }

                            else if(UpdataConfig.UpdataSave && localStorage[CatPW.surl] &&//是否已开启网盘信息记录更新，是否存在缓存
                                    CatPW.Src.search(StorageDB(CatPW.surl).read().surl.replace('Share_',''))>0)//从检测缓存中的分享ID是否与记录中的分享ID匹配
                            {
                                var CatPW_StorageDB=StorageDB(CatPW.surl).read();
                                if(decodeURIComponent(CatPW.webSrc)!==decodeURIComponent(CatPW_StorageDB.webSrc)) {
                                    CatPW_StorageDB.webSrc=decodeURIComponent(CatPW.webSrc);
                                    CatPW_StorageDB.webTitle=decodeURIComponent(CatPW.webTitle);
                                    StorageDB(CatPW.surl).insert(CatPW_StorageDB);
                                    if(UpdataConfig.UpdataNotify) GM_notification({
                                        'text':'网盘地址来源与上一次记录不同，记录已更新',
                                        'title':'网盘信息记录更新通知',
                                        'image':'https://eyun.baidu.com/box-static/page-common/images/favicon.ico',
                                        'timeout': 5
                                    });
                                }
                            } else {//直接载入记录
                                console.log('载入 locatStorage 记录');
                                CatPW=StorageDB(CatPW.surl||yunData.SHARE_ID||getQueryString('shareid')).read();
                            }

                            console.log('分享文件ID：', CatPW.surl, '提取码：', StorageDB(CatPW.surl).find('sCode'));
                            console.log('已收集的信息：', 'conf：', conf, 'CatPW：', CatPW, 'GM: ', GM_getValue('CatPW'));

                            $(conf.btn).click(function(){	//提交密码时
                                var $code=$(conf.code).val().trim();
                                CatPW.sCode=CatPW.sCode&&$code==StorageDB(CatPW.surl).find('sCode')?CatPW.sCode:$code!==''?$code:CatPW.sCode;

                                var tips=$('form[name="accessForm"]~div[style*="display: block"]');
                                tips.text('')
                                //提取码提交click事件
                                if(!localStorage[CatPW.surl]) {
                                    //不存在记录时，添加新纪录
                                    StorageDB(CatPW.surl).insert(CatPW);//插入记录
                                    StorageDB('ShareIDexp').add(CatPW.surl,{'date':Dates(),'id':CatPW.surl,'exp':$.now()+StorageExp*24*60*60*1000});		//记录超时时间
                                } else if(!StorageDB(CatPW.surl).find('sCode')) {
                                    //不存在提取码信息时，重新获取提取码
                                    StorageDB(CatPW.surl).insert(CatPW);//插入记录
                                    StorageDB('ShareIDexp').add(CatPW.surl,{'date':Dates(),'id':CatPW.surl,'exp':$.now()+StorageExp*24*60*60*1000});		//记录超时时间
                                } else if($code!==StorageDB(CatPW.surl).find('sCode')&&(tips.text()==='')){
                                    //已记录的提取码与填写的提取码不一致时，更新提取码记录
                                    StorageDB(CatPW.surl).add('sCode', CatPW.sCode);//更新提取码记录
                                    StorageDB('ShareIDexp').add(CatPW.surl,{'date':Dates(),'id':CatPW.surl,'exp':$.now()+StorageExp*24*60*60*1000});		//记录超时时间
                                }
                            });

                            //当存在解压密码时，插入新纪录
                            if(CatPW.unPW&&!localStorage[CatPW.surl]){
                                StorageDB(CatPW.surl).insert(CatPW);
                                StorageDB('ShareIDexp').add(CatPW.surl,{'date':Dates(),'id':CatPW.surl,'exp':$.now()+StorageExp*24*60*60*1000});		//记录超时时间
                            }

                            //显示记录的信息
                            if('Share_'+yunData.surl==CatPW.surl && localStorage[CatPW.surl]){
                                var CatPW_Info=$('<DIV>').attr('id','CatPW_Info').text('提取码：'+CatPW.sCode+'　　'+'解压密码：')/*.insertBefore($('.module-share-header'))*/;
                                //解压密码
                                var CatPW_Info_unPW=$('<input>').attr({'id':'unPW','title':'点击复制密码，修改内容将被保存'}).css({'margin':'0 10px','width':'150px','text-align':'center'}).val(CatPW.unPW).change(function(){
                                    StorageDB(CatPW.surl).add('unPW',encodeURIComponent(this.value));
                                    CatPW.unPW=encodeURIComponent(this.value);
                                    GM_setValue('CatPW', CatPW);
                                }).click(function(){
                                    document.execCommand("SelectAll");document.execCommand("copy");
                                });

                                //来源页面：
                                var CatPW_Info_delBtn=$('<button>').text('删除记录').val('删除记录').click(function(){
                                    delete localStorage[CatPW.surl];
                                    StorageDB('ShareIDexp').del(CatPW.surl);
                                    GM_setValue('CatPW', CatPW_Format);
                                    this.disabled=true;
                                });

                                var CatPW_Info_WebTitle=$('<span>').attr({'id':'CatPW_webTitle'}).text('网页标题：'+CatPW.webTitle);
                                var CatPW_Info_WebSrc=$('<A>').attr({'id':'CatPW_webSrc','href':CatPW.webSrc,'target':'blank'}).text('网盘来源：'+CatPW.webSrc);
                                GM_addStyle('#CatPW_Info{font-size:14px;border:1px solid #06c;padding:5px;display:block;}');

                                CatPW_Info.append(CatPW_Info_unPW, CatPW_Info_delBtn, '<br>', CatPW_Info_WebTitle, '<br>', CatPW_Info_WebSrc);
                                UpdataConfig.MessageUI?CatPW_Info.insertBefore('.module-share-header'):Fn_MessageUI(CatPW_Info);
                            }

                            StorageDB('ShareIDexp').deleteExpires();
                        }
                    },
                    init : function(){
                        this.CatPW_Manage();
                        this.ShowInfo();
                    }
                };
                CatPW_BaiduPan.init();
                console.groupEnd();
            }
        },
        'eyun.baidu.com': {
            chk:	/^[a-z0-9]{4}$/,
            code:	'.share-access-code',
            btn:	'.g-button-right',
            pwdRule : /(?:提取|访问)[码碼]?\s*[:： ]?\s*([a-z\d]{4,14})/,
            codeRule : /(?:(?:提取|访问|密[码碼]|Extracted-code)[码碼]?)\s*[:： ]?\s*([a-z\d]{4,14})/i,
            PreProcess: function() {
                if((hash&&!/sharelink|path/i.test(hash))&&!/enterprise/.test(paths)) {
                    location.href=location.href.replace(location.hash,'');
                }
                conf.ShareUK=yunData.SHARE_UK||getQueryString('uk');		//获取 分享用户ID
                conf.ShareID=yunData.SHARE_ID||getQueryString('cid');		//获取 分享文件ID
                conf.sCode=/^#/.test(hash)?hash.match(/^#(\w+)&?/)[1]:StorageDB(conf.ShareID).find('sCode');		//获取 提取码
                $(conf.btn).click(function(){
                    if(!localStorage[conf.ShareID]&&conf.sCode) {
                        StorageDB(conf.ShareID).insert({'sCode':conf.sCode});
                        StorageDB('ShareIDexp').add(conf.ShareID,{'id':conf.ShareID,'exp':$.now()+StorageExp*24*60*60*1000});		//记录超时时间
                    }
                });
                StorageDB('ShareIDexp').deleteExpires();
            }
        },
        'yunpan.360.cn':{
            chk	:	/^[a-z0-9]{4,8}$/,
            code : '.pwd-input',
            btn : '.submit-btn'
        },
        'pan.lanzou.com':{
            chk	:	/^[a-z0-9]{4,8}$/,
            code : '#pwd',
            btn : '#sub'
        },
        'lanzous.com':{
            chk	:	/^[a-z0-9]{4,8}$/,
            code : '#pwd',
            btn : '#sub',
            preSubmit : function(codebox, cdoebtn, sCode){
                $('.ifr2').contents().find(codebox).val(sCode);
                $('.ifr2').contents().find(cdoebtn).click();
            }
        },
        'share.weiyun.com': {
            chk: /^[a-z0-9]{6}$/i,
            code: '.input-txt',
            btn: '.btn.btn-l.btn-main',
            pwdRule : /(?:提取|访问)[码碼]?\s*[:： ]?\s*([a-z\d]{4,6})/,
            codeRule : /(?:(?:提取|访问|密[码碼]|Extracted-code)[码碼]?)\s*[:： ]?\s*([a-z\d]{4,6})/i,
            preSubmit: function(codebox, cdoebtn, sCode) {
                console.log('微云特殊提交方法');
                $(codebox).val(sCode);
                console.log($(codebox).get(0));
                if(typeof(InputEvent)!=='undefined') {
                    //使用 InputEvent 方法，主流浏览器兼容
                    $(codebox).get(0).dispatchEvent(new InputEvent("input")); //模拟事件
                } else if(KeyboardEvent) {
                    //使用 KeyboardEvent 方法，ES6以下的浏览器方法
                    $(codebox).get(0).dispatchEvent(new KeyboardEvent("input"));
                }
                $(cdoebtn).click();
            }
        },
        'dufile.com':{
            PreProcess: function(){
                if(/\/down\//.test(location.pathname)) {
                    var hiddenProperty = 'hidden' in document ? 'hidden' :
                    'webkitHidden' in document ? 'webkitHidden' :
                    'mozHidden' in document ? 'mozHidden' :
                    null;
                    var visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');
                    var onVisibilityChange = function(){
                        if (!document[hiddenProperty]) {
                            document.title='被发现啦(*´∇｀*) 快来输验证码！';
                        } else {
                            alert('DuFile 快来输验证码！');
                        }
                    }
                    document.addEventListener(visibilityChangeEvent, onVisibilityChange);
                }
            }
        },
        'fxpan.com':{
            PreProcess:function(){
                var Key=$('#key').val(); //文件分享ID

                var CatPW={'date':Dates(),'sCode':'', unPW:'', 'Src':'', 'Hash':'', "webSrc":'', "webTitle":''};
                var CatPW_Data=(GM_getValue('CatPW')!=('undefined')||GM_getValue('CatPW')!==undefined)?GM_getValue('CatPW'):GM_setValue('CatPW',CatPW);

                if(CatPW_Data['webSrc'].search(Key)>-1) {
                    var $CatPW_Info=$('<DIV>').attr('id','CatPW_Info');
                    var $CatPW_Info_unPW=$('<div>').text('解压密码：').append($('<input>').attr({'id':'unPW','title':'点击复制密码'}).css({'margin':'0 10px','width':'150px','text-align':'center'}).val(decodeURIComponent(CatPW_Data.unPW)).click(function(){document.execCommand("SelectAll");document.execCommand("copy");}));
                    var $CatPW_Info_title=$('<span>').attr({'id':'CatPW_webTitle'}).text('网页标题：'+decodeURIComponent(CatPW_Data.webTitle));
                    var $CatPW_Info_webSrc=$('<A>').attr({'id':'CatPW_webSrc','href':decodeURIComponent(CatPW_Data.webSrc),'target':'blank'}).text('网盘来源：'+decodeURIComponent(CatPW_Data.webSrc));
                    $CatPW_Info.append($CatPW_Info_unPW, '<br>', $CatPW_Info_title,'<br>', $CatPW_Info_webSrc).insertBefore('.file_item.file_desc');
                    $('.ysbtn').click(function(){
                        StorageDB(Key).insert(CatPW_Data);
                        StorageDB().insert(CatPW_Data);
                    });
                }
                GM_addStyle('#CatPW_Info{font-size:14px;border:1px solid #06c;padding:5px;display:block;}');
            }
        },
        'cloud.189.cn':{
            chk: /^[a-z0-9]{4}$/i,
            code: '#code_txt',
            btn:  '.btn.btn-primary',
            PreProcess: function(code, btn){
                document.querySelector('.btn-primary').click();
            }
        },
        'yunfile.com':{//YunFile
            PreProcess:function(){
                var FileID=getQueryString('fileId',$('#counter_js').attr('src'));
                DiskInfo(FileID, '.file_message', function(CatPW_Data, Key){
                    CatPW_Data.FileID=FileID;
                });
                //Banner
                $('img[src="http://www.yunfile.com/images/premium-zh_cn.png"]').hide();
                //隐藏与下载链无关Table TR
                $('table.intro_text>tbody>tr:not(:nth-child(1)):not([style="height: 60px;"])').hide();
                //隐藏开通VIP
                $('#MemberPayfor').hide();
                //隐藏购买高级套餐
                $('#right_prem').parent().hide();
            }
        },
        'ccchoo.com':{//彩虹云
            PreProcess:function(){
                String.prototype.isSearch=function(key){
                    return this.search(key)>-1;
                }
                if(paths.isSearch('file-')) $('div[class="lo_box box_shadow"], div.down_two>.clearfix:nth-of-type(1), div.down_two>.down_tl, ul.down_three, div.down_five, div.down_six_main_b_img').remove();
                $('img[src="http://www.ccchoo.com/images/ad2.gif"], .lo_box.box_shadow').remove();
                DiskInfo(paths.replace(/\/(?:down2?|file)-(\d+).html/i,'$1'),'.down_one, .ksk');
                GM_addStyle('.b-box{height:auto!important;display:block!important;}');

                if(paths.isSearch('down2-')) {
                    location.href=location.href.replace('down2','down');
                } else if(paths.isSearch('down-')) {
                    $('#down_box, #down_boxc').insertBefore('.ksk').show();
                    $('#code_box, .ksk').hide();
                }
            }
        },
        'own-cloud.cn':{
            chk: /^[a-z0-9]{4,6}$/i,
            pwdRule : /(?:提取|访问)[码碼]?\s*[:： ]?\s*([a-z\d]{4,6})/,
            codeRule : /(?:(?:提取|访问|密[码碼]|Extracted-code)[码碼]?)\s*[:： ]?\s*([a-z\d]{4,6})/i,
            code:'#inputPassword',
            btn:'#submit_pwd'
        }
    },
    //跳转链预处理
    'JumpUrl' : {
        'zhihu.com' :  {
            href: $('A[href*="//link.zhihu.com/?target="]'),
            url:/.*\/\/link\.zhihu\.com\/\?target=/
        },
        'sijihuisuo.club': {
            href: $('.down-tip A[href^="https://www.sijihuisuo.club/go/?url="]'),
            url: 'https://www.sijihuisuo.club/go/?url='
        },
        'nyavo.com':{
            href: $('.content a'),
            url: 'https://www.nyavo.com/go?url='
        }
    },
    //密码融合需要特殊支持的网站
    'Support' : {
        'agefans.tv':{
            path: /detail/i,
            callback: function(){
                $('.res_links_a').each(function(){
                    var res_links_a = this;
                    GM_xmlhttpRequest({
                        method: "get",
                        url: res_links_a.href,
                        onload: function (result) {
                            console.log('load:', res_links_a.href, result.finalUrl, result);
                            console.log(res_links_a);
                            $(res_links_a).attr({'href': result.finalUrl});
                        }
                    });
                });
            }
        },
        'yunpanjingling.com':{
            path : /search/i,
            callback:function(){
                $('.item').each(function(){
                    var name=$(this).find('.name').text().trim();
                    var code=$(this).find('.code').text()||'';
                    var href=$(this).find('.name').find('a');
                    var referrer=$(this).find('.referrer').find('a');
                    referrer.attr('href',decodeURIComponent(getQueryString('url',referrer.attr('href'))));
                    href.attr('href',decodeURIComponent(getQueryString('url',href.attr('href'))));
                    if(code) href.attr('href',href.attr('href')+'#'+code);
                    href.click(function(){
                        var CatPW_Data={'date':Dates(),'sCode':code, unPW:'', 'Src':href.attr('href'), 'Hash':'#'+code, "webSrc":referrer.attr('href'), "webTitle":encodeURIComponent(name)};
                        sessionStorage['CatPW_Data']=JSON.stringify(CatPW_Data);
                    })
                });
            }
        },
        'jiluhome.cn' : {
            path:/./i,
            callback:function(){
                var PostID=$.getUrlParam('p', $('link[rel="shortlink"]').attr('href'));
                //获取网盘地址
                DownAjax('http://www.jiluhome.cn/wp-content/plugins/erphpdown/download.php?postid='+PostID, '#erphpdown-download', function(e){
                    $(e).find('a[href*="download.php"]').each(function(){
                        var target=this;
                        $.ajax({
                            "url":'http://www.jiluhome.cn/wp-content/plugins/erphpdown/download.php?postid='+PostID+"&url=&key=1",
                            success:function(d){
                                target.href=d.match(/window.location=\'([^']+?)\'/i)[1];
                            }
                        });
                    });
                    $('#erphpdown>center').append(e);//.replaceWith(e);
                });
            }
        },
        'dakashangche.com':{
            path:/\/sj\/\d/,
            callback:function(){
                console.log('特殊支持');
                $('.down-tip>a[href*="du.acgget.com"]').each(function(){
                    DownAjax(this.href,'.panel-body',function(e){
                        $(e).appendTo($('#paydown'));
                    });
                });
            }
        },
        'appinn.com':{
            path:/\/[^\/]+\//i,
            callback:function(){
                console.log('特殊支持');
                new PreHandle.VM();
            }
        },
        'meta.appinn.com':{
            path:/\/t\/[^/]+\//i,
            callback:function(){
                new PreHandle.VM();
                $('A[href*="pan.baidu.com"],A[href*="eyun.baidu.com"]').each(function(){
                    $(this).data({'url':this.href}).click(function(e){
                        location.href=$(this).data('url');
                    });
                });
            }
        },
        'madsck.com':{
            path: /\/resource\/\d+/,
            callback:function(){
                var ID=$('.btn-download').data('id');
                $.ajax({
                    "url":"http://www.madsck.com/ajax/login/download-link?id="+ID,
                    method: "GET",
                    dataType: "json",
                    success:function(e){
                        var res=e.resource;
                        $('.btn-download').css('display','none');
                        $('<a>').attr({'href':res.resource_link+'#'+res.fetch_code,'target':'blank','class':'btn-download'}).css({'line-height':'60px','text-align':'center','font-size':'24px'}).text('下载').insertBefore('.btn-download');
                    }
                });
            }
        },
        'idanmu.com': {
            path : /storage\-download/i,
            callback : function(){
                $('.input-group').each(function(){
                    $(this).text($(this).text()+$(this).find('input').val());
                });
            }
        },
        'qiuquan.cc':{
            path:/./,
            callback : function(){
                $('#down>a[href*="pan.baidu.com"]').each(function(){
                    if(!this.hash) {
                        this.hash=$(this).text().match(/[\(（](\w+)[）\)]/i)[1];
                    }
                });
            }
        },
        'acg44.com':{
            //search:['page_id','p'],
            path:/download/i,
            callback : function(){
                site['codeRule']=/(?:(?:提取|访问|密[码碼])[码碼]?)\s*[:： ]?\s*([a-z\d]{4}|[^$]+)/i;
                addMutationObserver('#download-container',function(e){
                    e.some(function(a){
                        for(var i in a.addedNodes){
                            var b=a.addedNodes[i];
                            if(b.className=='animated fadeIn') {
                                var VerCode=$('[id^="downloadPwd"]').val();
                                var unZipPW=encodeURIComponent($('[id^="extractPwd"]').val());
                                var DownUrl=$('#download-container a.btn').attr('href');
                                if(/pan.baidu.com\/share/i.test(DownUrl)){
                                    $('#download-container a.btn').attr('href',DownUrl+'&unPW='+unZipPW+'&Src='+encodeURIComponent(urls));
                                } else {
                                    $('#download-container a.btn').attr('href',DownUrl+'#'+VerCode+'&unPW='+unZipPW+'&Src='+encodeURIComponent(urls));
                                }
                            }
                        }
                    });
                });
            }
        },
        'reimu.net': {
            path: /archives/i,
            callback: function(){
                site['codeRule']=/(?:(?:提取|访问|密[码碼])[码碼]?)\s*[:： ]?\s*([a-z\d]{4}|8酱)/i;
            }
        },
        'ccava.net': {
            path: /post/i,
            callback: function(){
                site['codeRule']=/(?:(?:提取|访问|密[码碼])[码碼]?)\s*[:： ]?\s*([a-z\d]{4,8}|ccava)/i;
            }
        },
        //189天翼云盘支持
        'mebook.cc':{
            path: /download.php/i,
            callback:function(){
                $('a').click(function(){
                    if(this.hostname=='cloud.189.cn') site['codeRule']=/天翼云盘密码\s*[:： ]?\s*([a-z\d]{4,8})/i;
                    else site['codeRule']=/百度网盘密码\s*[:： ]?\s*([a-z\d]{4,8})/i;
                });
            }
        },
        's-dm.com':{ //天使动漫
            path:/./,
            callback:function(){
                $('body').on('click','a',function(){
                    if(this.hostname=='pan.baidu.com') this.hash=$(this).text().replace(/.+(?:[集版]|无修)(\w{4,8})$/,'$1');
                });
            }
        },
        'mikuclub.org':{
            path:/\d+/,
            callback:function(){
                $('.passw').each(function(){
                    var dl=$(this).parent().next().find('.dl');
                    dl[0].hash=this.value;
                });
            }
        }
    }
};



/***** 镜像域名映射 Begin *****/
var HostToList={}, HostToListArr={
    YunDisk : {
        'yunfile.com':['5xpan.com','putpan.com','pwpan.com','skpan.com','5xpan.com','yfdisk.com','filemarkets.com','tadown.com','page2.dfpan.com'],
        'ccchoo.com':['chooyun.com','wodech.com','caihop.com','caihoo.me','caihoo.info','caihoo.co','caihoo.club'],
    },
    Support : {
        's-dm.com':['fodm.net'],
        'reimu.net':['blog.reimu.net'],
        'idanmu.com':['idanmu.co','idanmu.ch','idanmu.at']
    }
}

for(var key in HostToListArr){
    HostToList[key]={};
    for(var key_i in HostToListArr[key]) {
        var key_host=HostToListArr[key][key_i];
        for(var key_j=0;key_j<key_host.length;key_j++){
            HostToList[key][key_host[key_j]]=key_i;
        }
    }
}

//站点存在则加入到Site中
if(HostToList['YunDisk'][host]) site['YunDisk'][host]=site['YunDisk'][HostToList['YunDisk'][host]];
else if(HostToList['Support'][host]) site['Support'][host]=site['Support'][HostToList['Support'][host]];
else if(/yunpan.360.cn/.test(host)) host='yunpan.360.cn';  //如果是360云盘，重设主域名Host
//console.warn('CheckHostToList: ', host, HostToList['Support'][host], site['Support'][HostToList['Support'][host]]);
/***** 镜像域名映射 End *****/

var conf = site['YunDisk'][host];											//设置主域名

/* -----===== 生成正则，校验匹配的网盘 Start =====----- */
var HostArr = [];									//生成域名数组
for(var i in site['YunDisk']) HostArr.push(i);					//插入域名对象数组
for(var i in HostToList['YunDisk']) HostArr.push(i);					//插入域名对象数组
var HostExp = new RegExp(HostArr.join("|"),'i');	//生成支持网盘的校验正则，进行密码融合
/* -----===== 生成正则，校验匹配的网盘 End =====----- */

/* -----===== 检查是否需要处理跳转链 Start =====----- */
//console.log(site.JumpUrl[host]);
if(site['JumpUrl'][host]){
  //console.log('跳转链处理：',site['JumpUrl'][host]['href']);
  site['JumpUrl'][host]['href'].each(function(){
    //console.log(site['JumpUrl'][host]['rep']);
    $(this).attr({'href':decodeURIComponent($(this).attr('href').replace(site['JumpUrl'][host]['url'],'')),'target':'blank'});
  });
}
/* -----===== 检查是否需要处理跳转链 End =====----- */
//console.warn('checkSite: ', site, 'YunDisk:', site['YunDisk'], site['YunDisk'][host], 'Support: ', site['Support'], site['YunDisk'][host]);
//console.warn('checkHost: ', host, conf, 'HostToList: ', HostToList);
if(conf&&!/zhidao.baidu.com/i.test(host)){	//网盘页面填密码登录
  // 抓取提取码
  if(conf.PreProcess) conf.PreProcess();		//内容预处理
    var StorageCode = StorageDB('Share_'+conf.surl).find('sCode'),                           //从缓存中读取提取码
        HashCode = /^#/.test(hash)&&!/^#list\/path=/i.test(hash)?hash.match(/^#([^&]+)&?/)[1]:'';     //从Hash中读取提取码
  var sCode = (StorageCode&&StorageCode==HashCode)||!HashCode ? StorageCode : HashCode;		          //Hash不存在提取码时，或缓存与Hash一致时，使用缓存提取码
  // 调试用，检查是否为合法格式

  if (!sCode) {
    console.log('没有 Key 或格式不对');
  } else {
    console.log ('抓取到的提取码: %s', sCode);
  }
  // 加个小延时
  setTimeout (function () {
    // 键入提取码并单击「提交」按钮，报错不用理。
    var codeBox = $(conf.code),
        btnOk = $(conf.btn);
    //console.log('提交访问：',codeBox, btnOk);
    if (conf.preSubmit) { //特殊提交方式
      codeBox.val(sCode);		//填写验证码
      btnOk.click();            //先尝试常规提交
      $(document).ready(function(){
          conf.preSubmit (conf.code, conf.btn, sCode); //最后尝试预处理方案
      });
    } else if(codeBox.length>0) {		//存在密码框时才进行密码提交操作
      codeBox.val(sCode);		//填写验证码
      btnOk.click();
    }
  }, 10);

} else {
    var PreHandle={	//内容预处理
        Text : function(text){	//预处理含解码密码的文本
            text=text?typeof(text)=="string"?text.trim():text.textContent.trim():null;
            text=text?text.replace('本帖隐藏的内容',''):null;  //文本内容预处理，提高DZ论坛的匹配率
            text=text?text.replace(/([\[【]?解[压壓]|[压壓][缩縮])密[码碼][\]】]?\s*[:： ]?(?:&nbsp;?)\s*([a-z\d]{4}|[^\n]+)/ig,''):null;
            return text;
        },
        Code : function(obj){	//
            var text=this.Text(obj);
            if(!text) return;
            //首先尝试使用 提取码|访问码 作为密码匹配的关键字，无效时则使用模糊匹配规则
            var pw=site['pwdRule'].test(text)?text.match(site['pwdRule'])[1]:site['codeRule'].test(text)?text.match(site['codeRule'])[1]:null;
            //console.log(text,pw);
            return pw;
        },
        Fusion : function(target, obj){ //融合密码
            if(!target.hash) {
                target.href+='#'+this.Code(obj);
            }
        },
        VM : function(){	//暴力匹配
            var Link=$('A[href*="pan.baidu.com"],A[href*="eyun.baidu.com"]');
            for(i=0;i<Link.length;i++){
                var LinkParent=$(Link[i]).parent();
                var LinkParentHtml=LinkParent.html();
                if(PreHandle.Code(LinkParentHtml)) Link[i].href+='#'+PreHandle.Code(LinkParentHtml);
            }
        },
        PassWord : function(CatPW_Data){
            if(StorageSave) {
                var unPWArr=[
                    /[^\w]password[:： ]?([^\n]+)/igm,
                    /解压[:： ]?(\w+)/gm,
                    /【解[压壓]密[码碼]】\s*[:： ]?\s*(\w+)/igm,
                    /【解[压壓]密[码碼]】\s*[:： ]?\s*([^\r\n]+)/igm,
                    /\[解[压壓]密[码碼]\]\s*[:： ]?\s*([a-z\d\.:/@]+)/igm,		//http://www.itokoo.com/
                    /(?:解[压壓]密?[码碼])\s*[:： ]?\s*([a-z\d\.:/@]+)(?!-)\b/igm,
                    /(?:解[压壓]密?[码碼])(?:都?是|为)\s*[:： ]?\s*([\w\.:/@]+)[^$\r\n]/igm,
                    /(?:解[压壓]密?[码碼])(?:都?是|为)\s*[:： ]?\s*([^\w]+)[^$\r\n]/igm, //中文类
                    /【?压缩密码】?\s*[:： ]?\s*([^\n]+)/igm,
                    /【?[資资]源密[码碼]】?：(\w+)/  //http://www.abcmm.co
                ];
                for(i=0;i<unPWArr.length;i++) {
                    var unPWTemp=unPWArr[i].exec(document.body.innerText)||unPWArr[i].exec(document.body.outerHTML.replace(/\b\w+=['"]?[^'"]+['"]?/ig,''))||unPWArr[i].exec(document.body.textContent);
                    if(unPWTemp) {
                        console.log(i, '规则：'+unPWArr[i], '解压密码提取：'+encodeURIComponent(unPWTemp[1]), '所有结果：'+unPWTemp);
                        CatPW_Data.unPW=encodeURIComponent(unPWTemp[1]);
                        break;
                    }
                }
                if(sessionStorage['CatPW_Data']) GM_setValue('CatPW', JSON.parse(sessionStorage['CatPW_Data']));
                else GM_setValue('CatPW', CatPW_Data);
                console.log('GM_getValue', GM_getValue('CatPW'));
            }
        },
        EachSibling : function($parent, $target, pi, $sibling, $i, $max){
            console.group('=== 同级元素遍历模式 第 '+pi+' 次 ===');
            var dz_i=$i||1, dz_maxParent = $max||5, dz_sibling=5||$sibling, dz_parent=$parent;
            while(dz_i<=dz_maxParent){
                //console.group('=== 同级元素遍历模式 第 '+dz_i+' 个父元素 ===');
                //console.log('=== 同级元素遍历模式 向上遍历 '+dz_maxParent+' 次 同级元素 '+dz_sibling+' 个 第 '+dz_i+' 个父元素 ===');
                //console.log('目标：', dz_parent);
                dz_i++;
                var dz_si=1, dz_s=dz_parent.nextSibling;//获得节点的兄弟节点
                while(dz_si<=dz_sibling){
                    //console.log(' 第 '+dz_si+' 个同级元素', dz_s);
                    if(dz_s) {
                        if(PreHandle.Code(dz_s)) {
                            //console.groupEnd('=== 同级元素遍历模式 ===');
                            //console.groupEnd('--- 普通父级遍历模式 ----');
                            PreHandle.Fusion($target, dz_s);
                            return;
                        }
                    } else {
                        //console.log(' 在目标元素查找 ', PreHandle.Code(dz_parent));
                        if(PreHandle.Code(dz_parent)) {
                            //console.groupEnd('=== 同级元素遍历模式 End ===');
                            //console.groupEnd('--- 普通父级遍历模式 End ----');
                            PreHandle.Fusion($target, dz_parent);
                            return true;
                        }
                        break;
                    }
                    dz_si++;
                    dz_s=dz_s.nextSibling;
                }

                dz_parent=dz_parent.parentNode;
                //console.log(dz_parent);
               console.groupEnd('--- 普通父级遍历模式 ----');
            }
            console.groupEnd('=== 同级元素遍历模式 ===');
        }
    };

  //密码融合 特别支持的网站
  var SupportHost=site['Support'][host];
  if(SupportHost&&(SupportHost['path']?SupportHost['path'].test(paths):getQueryString(SupportHost['search']))) {
    SupportHost.callback();
  }
  //监听 A 标签点击事件
  $('body').on('click', 'a', function (e) {
    var target=this, CatPW_Data;
    //提升密码匹配范围，以兼容部分网盘
      if(site['YunDisk'][this.host.toLowerCase()]&&site['YunDisk'][this.host.toLowerCase()]['pwdRule']) site['pwdRule']=site['YunDisk'][this.host.toLowerCase()]['pwdRule'], site['codeRule']=site['YunDisk'][this.host.toLowerCase()]['codeRule'];

    if(HostExp.test(this.href)){
      if(Control_newTag) this.target='blank';		//新页面打开网盘
      //初始化信息记录变量
      CatPW_Data={'date':Dates(),'sCode':'', unPW:'', 'Src':this.href, 'surl':'', 'Hash':this.hash, "webSrc":encodeURIComponent(urls), "webTitle":encodeURIComponent(document.title)};

      if(this.hash) { //如果超链接已有 hash 则跳过
        console.log('密码已融合，跳过密码融合步骤');
        if(sessionStorage['CatPW_Data']) GM_setValue('CatPW', JSON.parse(sessionStorage['CatPW_Data']));
        else GM_setValue('CatPW', CatPW_Data);
        PreHandle.PassWord(CatPW_Data);        //融合解压密码
        return;
      }
      console.group(' ===== 网盘自动填写密码 密码融合 =====');

      //论坛兼容模式
      if($.getUrlParam('mod')=='viewthread'&&$.getUrlParam('tid')&&$('.showhide').length>0||u.discuz_uid){
          if($(target).next().hasClass("showhide")&&PreHandle.Code(target.nextElementSibling)) {
              console.log('论坛特殊兼容模式 - 从链接后隐藏内容中查找密码');
              PreHandle.Fusion(target, target.nextElementSibling);
          }
      }
      //常规匹配模式
      if(PreHandle.Code(target)) {
        console.log('在当前超链接的对象中查找密码');
        PreHandle.Fusion(target, target);
      } else if(PreHandle.Code(target.nextSibling)){
        console.log('密码在超链接后面的兄弟元素中');
        PreHandle.Fusion(target, target.nextSibling);
      } else if(PreHandle.Code(target.parentNode)){
        console.log('从父对象中查找密码');
        PreHandle.Fusion(target, target.parentNode);
      } else {
          console.group('--- 普通父级遍历模式 ----');
          var i = 0,
              maxParent = 5,	//向上遍历的层级
              parent = target,
              $parent = parent;
          while(i<maxParent) {
              i++;									//遍历计数
              parent = parent.parentNode;			//取得父对象
              console.log('遍历上级目录查找密码：'+ i, parent);
              if(parent.tagName=="TR") {				//如果父对象是表格，则从表格中提取密码
                  if(PreHandle.Code(parent.nextElementSibling)) {
                      parent=parent.nextElementSibling;
                      console.log('表格中查找密码成功！',parent);
                      PreHandle.Fusion(target, parent);
                      break;
                  }
              } else {
                  var EachSiblingResult=PreHandle.EachSibling($parent, target, i);  //同级遍历函数
                  if(EachSiblingResult) break; //遍历取得结果，停止遍历

                  $parent=parent.parentNode;     //取得上一级父对象
                  if(maxParent>5) {
                      console.log('已超出遍历范围');
                  }
              }
              if(parent==document.body) break;								//如果已经遍历到最顶部
          }
          console.groupEnd('--- 普通父级遍历模式 ----');
      }

      CatPW_Data.Hash=this.hash;
      PreHandle.PassWord(CatPW_Data);        //融合解压密码
    }
    console.groupEnd();
  });
}

function addMutationObserver(selector, callback, Kill) {
  var watch = document.querySelector(selector);
  //console.log(watch);

  if (!watch) {
    return;
  }
  var observer = new MutationObserver(function(mutations){
    //console.log(mutations);
    var nodeAdded = mutations.some(function(x){ return x.addedNodes.length > 0; });
    if (nodeAdded) {
      callback(mutations);
      if(Kill) {
          console.log('停止'+selector+'的监控');
          observer.disconnect();
      }
    }
  });
  observer.observe(watch, {childList: true, subtree: true});
}

function getQueryString(name,url) {//筛选参数
  var reg, str;
      url=url?url.match(/[?#].*/).toString():location.search;	//网址传递的参数提取，如果传入了url参数则使用传入的参数，否则使用当前页面的网址参数

  if(Array.isArray(name)){
    for(var i in name){
      reg = new RegExp("(?:^|&)(" + name[i] + ")=([^&]*)(?:&|$)", "i");		//正则筛选参数
      str = url.substr(1).match(reg);
      if (str !== null) return unescape(str[2]);
    }
  } else {
    reg = new RegExp("(?:^|&)(" + name + ")=([^&]*)(?:&|$)", "i");		//正则筛选参数
    str = url.substr(1).match(reg);
    if (str !== null) return unescape(str[2]);
  }
  return null;
}

function StorageDB(collectionName) {
  //如果没有 集合名，则使用默认 default
  collectionName = collectionName ? collectionName : 'default';
  //创建JSON缓存，如果缓存存在，则转为JSON，否则新建
  var cache = localStorage[collectionName] ? JSON.parse(localStorage[collectionName]) : {};

  return {
    add : function(name, value) {
      cache[name]=value;
      localStorage.setItem(collectionName, JSON.stringify(cache));        //回写 localStorage
    },
    del:function(name) {
      if(name) {
        console.log(cache,cache[name]);
        delete cache[name];
        localStorage.setItem(collectionName, JSON.stringify(cache));        //回写 localStorage
      } else {
        //删除整个 localStorage 数据
        localStorage.removeItem(name);
      }
    },
    insert: function(obj){
      localStorage.setItem(collectionName, JSON.stringify(obj));
    },
    Updata : function(name,obj,value){
      cache[obj]=cache[obj]||{};
      cache[obj][name]=value;
      localStorage.setItem(collectionName, JSON.stringify(cache));        //回写 localStorage
    },
    Query : function(obj,name){
      return cache[obj]?name?(cache[obj][name]?cache[obj][name]:null):cache[obj]:null;
    },
    find : function(name) {
      if(!collectionName) return false;
      return cache[name];
    },
    read : function(){
      return $.isEmptyObject(cache)?null:cache;//如果为空，则返回 null
    },
    deleteExpires : function(now){
      now=now||$.now();
      for(var i in cache) {
        //console.log(i, collectionName, now, cache[i]['exp'], now>cache[i]['exp']); //删除记录显示
        //console.log(cache[i], localStorage[i]);
        if(now>cache[i]['exp']) {
          delete localStorage[i];     //删除对应分享 ID 的记录
          this.del(i);                //删除时间表中的记录
        }
      }
    }
  };
}

function DiskInfo(Key, target, Prepocess){
  //Key文件分享ID
  var insertTarget=target, //信息插入的目标位置
      CatPW_Data,
      CatPW_Format={'date':Dates(),'sCode':'', unPW:'', 'Src':'', 'Hash':'', "webSrc":'', "webTitle":''};

  //初始化 getValue 数据

  if(StorageDB(Key).read()) {
    GM_setValue('CatPW', StorageDB(Key).read());
    CatPW_Data=StorageDB(Key).read();
  } else if(GM_getValue('CatPW')=='undefined'||GM_getValue('CatPW')===undefined) {
    GM_setValue('CatPW', CatPW_Format);	//初始化
  } else {
    CatPW_Data=GM_getValue('CatPW');
  }
  if(Prepocess) Prepocess(CatPW_Data, Key);

  if((CatPW_Data['Src'].search(Key)>-1||CatPW_Data['FileID']==Key)&&$('#CatPW_Info').length<1) {
    var $CatPW_Info=$('<DIV>').attr('id','CatPW_Info');
    var $CatPW_Info_unPW=$('<div>').text('解压密码：').append($('<input>').attr({'id':'unPW','title':'点击复制密码'}).css({'margin':'0 10px','width':'150px','text-align':'center'}).val(decodeURIComponent(CatPW_Data.unPW)).click(function(){document.execCommand("SelectAll");document.execCommand("copy");}).change(function(){
      StorageDB(Key).add('unPW',encodeURIComponent(this.value));
      CatPW_Data.unPW=encodeURIComponent(this.value);
      GM_setValue('CatPW', CatPW_Data);
    }));
    var $CatPW_Info_title=$('<span>').text('网页标题：').append($('<input>').attr({'id':'CatPW_webTitle','title':'内容修改自动保存'}).val(decodeURIComponent(CatPW_Data.webTitle)).css({'margin':'0 10px','padding':'0 2px','min-width':'450px'}).show(function(){
      $(this).css({'width':this.value.length*15});
    }).change(function(){
      StorageDB(Key).add('webTitle',encodeURIComponent(this.value));
    }));
    var $CatPW_Info_webSrc=$('<A>').attr({'id':'CatPW_webSrc','href':decodeURIComponent(CatPW_Data.webSrc),'target':'blank'}).text('网盘来源：'+decodeURIComponent(decodeURIComponent(CatPW_Data.webSrc)));
    var $CatPW_Info_DeleteBtn=$('<button>').text('删除记录').val('删除记录').css({'display':'inline-block'}).click(function(){
      delete localStorage[Key];
      GM_setValue('CatPW', CatPW_Format);
      this.disabled=true;
    });
    $CatPW_Info.append($CatPW_Info_unPW.append($CatPW_Info_DeleteBtn), '<br>', $CatPW_Info_title,'<br>', $CatPW_Info_webSrc).insertBefore(insertTarget);
    StorageDB(Key).insert(CatPW_Data);
  } else {
    $('<div>').append('当前记录网盘地址为：',$('<A>').attr({'href':CatPW_Data.Src,'target':'blank'}).text(CatPW_Data.Src),' 与当前网盘不符').insertBefore(insertTarget);
  }
  GM_addStyle('#CatPW_Info{font-size:14px;border:1px solid #06c;padding:5px;display:block;}');
}

function DownAjax(urls, selection,callback){
    GM_xmlhttpRequest({
        method: "GET",
        url: urls,
        onload: function (result) {
            var parsetext = function(text){
                var doc = null;
                try {
                    doc = document.implementation.createHTMLDocument("");
                    doc.documentElement.innerHTML = text;
                    return doc;
                }
                catch (e) {
                    alert("parse error");
                }
            };
            var Down;
            var doc = parsetext(result.responseText);
            console.log(doc,$(doc));
            var t = $(doc).find(selection);
            callback(t);
        }
    });
}

function Dates(){
    var sDate=new Date();
    return sDate.getFullYear()+'/'+(sDate.getMonth()+1)+'/'+sDate.getDate();
}


function Fn_MessageUI(content){
    GM_addStyle(`
#MessageUI {
width: 100%;
position: fixed;
left: 0;
top: 0;
z-index: 99999999;
pointer-events: none;
}
#MessageUI * {
pointer-events: auto;
}
#MessageUI_Btn {
position: relative;
margin: 0 auto;
padding: 1px 0;
width: 100px;
height: 16px;
color: #000;
font-size: 12px;
line-height: 10px;
cursor: pointer;
text-align: center;
border: 1px solid #AAA;
border-radius: 0 0 12px 12px;
background-color: #fff;
box-shadow: 0 0 5px rgba(0, 0, 0, .1);
}
#MessageUI_Btn:hover {
color: rgba(0, 0, 0, .8);
background-color: rgba(255, 255, 255, 0.8);
}
#MessageUI_Panel {
display: none;
border-top: 5px solid #65adff;
background-color: #FFF;
box-shadow: 0 0 5px rgba(0, 0, 0, .1);
}
#MessageUI_Panel > #MessageUI_Panel_Content {
display: flex;
flex: 1 1 none;
flex-wrap: wrap;
width: 100%;
max-width: 1400px;
margin: 0 auto;
padding: 16px 20px;
position: relative;
}
`);
    /** 添加界面 **/
    var MessageUI=$('<div>').attr({'id':'MessageUI'}),
        MessageUI_Btn=$('<div>').attr({'id':'MessageUI_Btn'}).text('展开网盘信息'),
        MessageUI_Panel=$('<div>').attr({'id':'MessageUI_Panel'}),
        MessageUI_Panel_Content=$('<div>').attr({'id':'MessageUI_Panel_Content'});

    MessageUI.click(function(ele){
        var eleStyle = MessageUI_Panel.css('display');
        if(MessageUI_Panel.css('display') === 'none'){
            MessageUI_Panel.css('display','block');
        } else {
            MessageUI_Panel.css('display','');
        }
    });

    MessageUI_Panel_Content.html(content);

    $('body').after(MessageUI.append(MessageUI_Btn, MessageUI_Panel.append(MessageUI_Panel_Content)));
}