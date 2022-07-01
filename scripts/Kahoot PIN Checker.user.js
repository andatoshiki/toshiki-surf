// ==UserScript==
// @name         Kahoot PIN Checker
// @namespace    http://tampermonkey.net/
// @version      0.0.15
// @description  Check pin of a kahoot game.
// @author       theusaf
// @match        *://play.kahoot.it/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

console.log("[PIN-CHECKER] - Detecting AntiBot");
window.executeCheck = function(){
  console.log("[PIN-CHECKER] - Loaded");
  if(localStorage.doAutoRelogin == "true"){
    window.waiter = setInterval(()=>{
      const a = document.querySelector("[data-functional-selector=launch-button]");
      if(a && !a.disabled){
        a.click();
        localStorage.doAutoRelogin = false;
        clearInterval(window.waiter);
      }
    },500);
  }
  window.Check = function(pin){
    return new Promise(function(res,rej){
      if(pin.indexOf("*") != -1){return res();} // locked, unable to check.
      const x = new XMLHttpRequest();
      x.open("GET",`https://cors-anywhere.herokuapp.com/https://kahoot.it/reserve/session/${window.pinCheck}/?${Date.now()}`);
      x.send();
      x.onload = function(){
        res(x.response);
      };
    });
  };
  window.intervalCheck = setInterval(()=>{
    if(!window.pinCheck){
      return;
    }
    window.Check(window.pinCheck).then(o=>{
      if(o == "Not found"){
        localStorage.doAutoRelogin = true;
        localStorage["kahoot-quizPins"] = "";
        document.write("<scr" + "ipt" + `>window.location = "https://play.kahoot.it/v2/${window.location.search}";` + "</sc" + "ript>");
      }
    });
  },1000*60);
  window.otherInterval = setInterval(()=>{
    const pind = document.querySelector("[data-functional-selector=game-pin]");
    if(pind){
      window.pinCheck = pind.innerHTML;
    }else{
        try{
          const pind2 = document.querySelector("[class^=header__Heading-]").children[0].children[1];
          if(pind2){
              window.pinCheck = pind2.innerHTML;
          }
        }catch(err){}
    }
  },1000);
};

if(!window.page){
  window.executeCheck();
}else{
  console.warn("[PIN-CHECKER] - found AntiBot, waiting for inject");
  window.localStorage.extraCheck = window.executeCheck.toString();
}
