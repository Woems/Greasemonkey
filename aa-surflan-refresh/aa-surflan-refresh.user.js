// ==UserScript==
// @name           aa-surflan-refresh
// @namespace      Woems
// @include        https://vpn4:8001/index.php?redirurl=*
// ==/UserScript==

window.setTimeout(function () {
  var URL=location.search.substr(10);
  URL=URL.replace(/%[0-9A-F]{2}/ig,function (e) { return String.fromCharCode(hex2dec(e.substr(1))); });
  //alert(URL);
  location.href=URL;
}, 30*1000);
function hex2dec(hex)
{
  return hex.toUpperCase().split("").map(function(e) { return "0123456789ABCDEF".indexOf(e); }).reduce(function (a,b) { return a*16+b; }, 0);
}
