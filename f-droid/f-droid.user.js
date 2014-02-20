// ==UserScript==
// @name        f-droid
// @namespace   Woems
// @include     https://f-droid.org*
// @version     1
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_deleteValue
// @grant          GM_addStyle
// @grant          GM_xmlhttpRequest
// @grant          GM_log
// ==/UserScript==

function $xs(xpath, rootdir) {return document.evaluate(xpath, rootdir || document, null, 9, null).singleNodeValue;}

var Titel=$xs("id('appheader')/p/span").textContent;
var SubTitel=$xs("id('appheader')/p").textContent.replace(Titel,"");
document.title=document.title+" "+Titel+" - "+SubTitel;
