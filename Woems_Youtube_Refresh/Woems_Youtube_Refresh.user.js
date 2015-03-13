// ==UserScript==
// @name        Woems Youtube Refresh
// @namespace   Woems
// @include     *
// @version     1
// ==/UserScript==

function get(url, cb) { GM_xmlhttpRequest({ method: "GET", url: url, onload: function(xhr) { cb(xhr.finalUrl, xhr.responseText, xhr.responseHeaders, xhr); } });}

get("https://w-diskstation/wGreasemonkey/YouTube.php?action=refresh", function (url,text,header,xhr) { });
