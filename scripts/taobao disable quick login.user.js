// ==UserScript==
// @name        taobao disable quick login
// @namespace   DannialLu
// @description 淘宝登陆页面禁用二维码登陆。Disable "QRcode login" at taobao.com.
// @include     *.taobao.com/member/login.jhtml*
// @version     1.1
// @grant       none

// ==/UserScript==


document.getElementById('J_LoginBox').setAttribute('id','DannialLu');
document.getElementById('DannialLu').setAttribute('class','login-box no-longlogin static');
document.getElementsByClassName('quick-form')[0].setAttribute('style','display:none');
document.getElementById('J_QuickLogin').setAttribute('id','DannialLu1');
document.getElementById('J_StaticForm').setAttribute('id','DannialLu2');
