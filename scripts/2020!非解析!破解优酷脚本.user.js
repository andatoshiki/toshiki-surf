// ==UserScript==
// @name         2020!非解析!破解优酷脚本
// @icon         https://img.alicdn.com/tfs/TB1WeJ9Xrj1gK0jSZFuXXcrHpXa-195-195.png
// @namespace    http://v.youku.com/
// @version      2.5
// @description  完美破解优酷 1080P,HDR,免登陆720P,去水印,加速跳广告,自动选择最高清晰度,自定义简化UI,置顶评论模块
// @author       blueagle
// @match        http*://v.youku.com/v_show/*
// @grant        none
// @require      http://cdn.staticfile.org/jquery/2.0.0/jquery.min.js
// ==/UserScript==
var config_crack={//全局配置
    should_remove_comments:false,//是否关闭评论
    should_remove_video_ad:true,//是否开启加速跳广告
    should_remove_other_ad:true,//是否关闭页面其他广告
    should_simplify:true,//是否简化UI
    simplify_modules_list:["周边快看", "热播综艺", "国漫推荐", "独家推荐", "动漫新番", "少儿热播", "小朋友们都在看", "BBC精品", "BBC精品", "少儿电影", "动画电影", "限免电影", "猜你喜欢"],//需要去除的模块（仅当简化UI功能开启时生效)
    auto_highest_quality:true,//自动最高清晰度
    comments_top:false//置顶评论模块
};
function crack_main(){
    $(".youku-layer-wuliao").hide();
    $(".quality-dashboard").children("div.youku_vip_pay_btn").children(".vip-label").text("已破解");
    $(".quality-dashboard").children("div.login-canuse").children(".vip-label").text("已破解");
    $(".js-hdr").children("span.youku_vip_pay_btn").removeClass("youku_vip_pay_btn disable");
    $(".quality-dashboard").children("div.youku_vip_pay_btn").removeClass("youku_vip_pay_btn disable");
    $(".quality-dashboard").children("div.login-canuse").removeClass("login-canuse");
};
function crack_other(){
    if(config_crack.should_remove_comments===true){
        $("#BohComment").hide();
        $("#youkubohMenu").find("span:contains('评论')").parents("a").hide();
    };
    if(config_crack.should_simplify===true){
        $("#BohRecommend").hide();
        var qkl;
        for (qkl = 0; qkl < config_crack.simplify_modules_list.length; qkl++) {
            $("#youkubohMenu").find("span:contains("+config_crack.simplify_modules_list[qkl]+")").parents("a").hide();
            $("div[id^='BohSurroundings']").children("div[class^='banner']:contains("+config_crack.simplify_modules_list[qkl]+")").parents("div[id^='BohSurroundings']").hide();
        };
        if($("#youkubohMenu").children("a[class^='item-link']").not("[style='display: none;']").length===1 && $("#youkubohMenu").children("a[class^='item-link']").not("[style='display: none;']").find("span").text().search("评论")!=-1){
            $("#BohComment").children(".comment-title").css("padding-top","0px");
        };
        $("#app").children("div").find("div[class^='fixed_bar']").hide().css("padding","8px 0px");
        $("#app").children("div").find("div[class^='fixed_bar']").children("a").hide();
        $("#uerCenter").find("div[class^='u-vip']").hide();
        $("#uerCenter").find("div[class^='u-app']").hide();
        $("#bpmodule-playpage-fee").hide();
        $("div[class^='youku-foot']").hide();
        $(".quality-dashboard").children("div[data-val='download']").hide();
        $("#app").children("div").find("div[class^='fixed_bar']").bind('DOMNodeInserted',function(){
            if ($(this).children(".ant-back-top").length>0){
                $(this).fadeIn();
                $(this).children(".ant-back-top").css("margin","0px auto");
                $(this).bind('DOMNodeRemoved',function(){
                    $(this).fadeOut();
                });
            };
        });
    };
    if(config_crack.should_remove_comments!=true && config_crack.comments_top===true){
        jQuery.fn.extend({
            move: function(direction){
                var me = this;
                var another = null;
                if(direction == 'up'){
                    another = me.prev();
                    another.before(me);
                }else if(direction == 'down'){
                    another = me.next();
                    another.after(me);
                }
                return this;
            }
        });
        var aop;
        for(aop=0;aop<$("#youkubohMenu").children("a[class^='item-link']").length;aop++){
            $("#youkubohMenu").find("span:contains('评论')").parents("a").move('up');
            $("#BohComment").move('up');
        };
        $("#BohComment").children(".comment-title").css("padding-top","0px");
        $("#BohComment").next().css("padding-top","40px");
    };
    var qpo = 0;
    $(".youku-film-player").children("video").bind('play', function(){
        if(config_crack.should_remove_other_ad===true){
            $(".h5-ext-layer").bind('DOMNodeInserted',function(){
                $(".h5-ext-layer").children("div").remove();
            });
            $("#right-title-ad-banner").hide();
            $("div[data-spm='followicons']").hide();
            $("div[id^='ab']").hide();
        };
        if(config_crack.auto_highest_quality===true && qpo===0){
            $(".quality-dashboard").children("div").not("div[data-val='download']").eq(1).click();
            qpo = 1;
        };
	});
};
function crack_pannel(ad_statue){
    if(ad_statue===true){
        return '<li class="play-fn-li"><span class="text" style="color: rgb(235, 186, 115)">已完美破解</span><div class="fn-panel fn-reprot" style="padding:20px"><div class="arrow"></div><div class="fn-panel-header"><div class="fn-panel-video">已开启以下功能</div></div><div class="line"></div><div class="fn-panel-body"><ul class="report-select clear"><li>加速跳广告</li><li>开启1080P</li><li>开启极清观影(HDR)</li><li>默认最高清晰度(HDR>1080P>其他)</li><li>去水印</li><li>简化UI</li></ul></div><a class="fn-btn fn-pc-report" style="background: linear-gradient(to right, #FCE5AA, #E1B271);background: -ms-linear-gradient(to right, #FCE5AA, #E1B271);background: -webkit-linear-gradient(to right, #FCE5AA, #E1B271);background: -moz-linear-gradient(to right, #FCE5AA, #E1B271);background: -o-linear-gradient(to right, #FCE5AA, #E1B271);color:white" href="https://bbs.blueagle.top/d/1">前往论坛</a></div></li>';
    }else{
        return '<li class="play-fn-li"><span class="text" style="color: rgb(235, 186, 115)">已破解(未去广告)</span><div class="fn-panel fn-reprot" style="padding:20px"><div class="arrow"></div><div class="fn-panel-header"><div class="fn-panel-video">已开启以下功能</div></div><div class="line"></div><div class="fn-panel-body"><ul class="report-select clear"><li>开启1080P</li><li>开启极清观影(HDR)</li><li>默认最高清晰度(HDR>1080P>其他)</li><li>去水印</li><li>简化UI</li></ul></div><div class="fn-panel-header"><div class="fn-panel-video">未开启以下功能</div></div><div class="line"></div><div class="fn-panel-body"><ul class="report-select clear"><li>加速跳广告</li><li>可能是在脚本开头参数处关闭了此功能或未安装依赖插件</li></ul></div><a class="fn-btn fn-pc-report" style="background: linear-gradient(to right, #FCE5AA, #E1B271);background: -ms-linear-gradient(to right, #FCE5AA, #E1B271);background: -webkit-linear-gradient(to right, #FCE5AA, #E1B271);background: -moz-linear-gradient(to right, #FCE5AA, #E1B271);background: -o-linear-gradient(to right, #FCE5AA, #E1B271);color:white" href="https://greasyfork.org/scripts/372673-%E8%AE%A1%E6%97%B6%E5%99%A8%E6%8E%8C%E6%8E%A7%E8%80%85-%E8%A7%86%E9%A2%91%E5%B9%BF%E5%91%8A%E8%B7%B3%E8%BF%87-%E8%A7%86%E9%A2%91%E5%B9%BF%E5%91%8A%E5%8A%A0%E9%80%9F%E5%99%A8/code/%E8%AE%A1%E6%97%B6%E5%99%A8%E6%8E%8C%E6%8E%A7%E8%80%85%7C%E8%A7%86%E9%A2%91%E5%B9%BF%E5%91%8A%E8%B7%B3%E8%BF%87%7C%E8%A7%86%E9%A2%91%E5%B9%BF%E5%91%8A%E5%8A%A0%E9%80%9F%E5%99%A8.user.js">安装依赖插件</a><a class="fn-btn fn-pc-report" style="background: linear-gradient(to right, #FCE5AA, #E1B271);background: -ms-linear-gradient(to right, #FCE5AA, #E1B271);background: -webkit-linear-gradient(to right, #FCE5AA, #E1B271);background: -moz-linear-gradient(to right, #FCE5AA, #E1B271);background: -o-linear-gradient(to right, #FCE5AA, #E1B271);color:white" href="https://bbs.blueagle.top/d/1">前往论坛</a></div></li>';
    }
};
crack_other();
window.onload = function(){
    'use strict';
    if($("._th-container").length>0 && config_crack.should_remove_video_ad===true){
        function fast_ad(){
            if ($(".h5-ext-layer").find("div").find("em").length>0) {
                return fast_ad;
            } else {
                changeTime(0,0,false,true);
                $(".play-fn").append(crack_pannel(true));
                crack_main();
                crack_other();
                clearInterval(qsc);
            };
            return fast_ad;
        };
    	changeTime(0,9999);
    	var qsc = setInterval(function(){fast_ad();},1000);
    }else{
    	$(".play-fn").append(crack_pannel(false));
        crack_main();
        crack_other();
    }
}