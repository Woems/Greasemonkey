// ==UserScript==
// @name        milovana
// @namespace   Woems
// @include     https://milovana.com*
// @version     1
// @grant       GM_log
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_addStyle
// @grant       GM_openInTab
// @require     https://github.com/Woems/Greasemonkey/raw/master/Funktionssammlung/funktionssammlung.user.js
// @require     https://raw.githubusercontent.com/serkanyersen/ifvisible.js/master/src/ifvisible.js
// ==/UserScript==



switch(location.pathname)
{
  case "/": break; // Startseite
  case "/id/": break; // Login
  case "/webteases/": break; // Übersicht
  case "/webteases/viewtopic.php": break; // Forum
  case "/webteases/showtag.php": break; // Suche
  case "/webteases/showtease.php":
    if ($('continue'))
      document.body.addEventListener("click",function(event){ $('continue').click();  }, true); 
    //if ($('continue'))
      //setTimeout(function () { $('continue').click(); },5000);
    break;
  case "/webteases/voteblack.php": break; // flash
  case "/webteases/showflash.php": break; // flash
  default: alert("milovana Path: "+location.pathname); break;
}

//String.prototype.trim = function (e) { return this.replace(new RegExp("^"+(e||" ")+"*"),""); }
function main()
{
  
  this.init = function ()
  {
    var run=location.pathname.split("/").splice(1).join("_").replace(/.php/g,"");
    if (typeof this[run]=="function") this[run]();
  }
  this.webteases_showtag = function ()
  {
    //alert("showtag");
  }
  this.init();
}

new main();
