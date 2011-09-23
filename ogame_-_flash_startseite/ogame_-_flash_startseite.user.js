// ==UserScript==
// @name           OGame - Flash startseite ausblenden
// @namespace      Woems
// @include        http://*ogame.de*
// ==/UserScript==

function $(id) {
  return document.getElementById(id);
}

function $x(p, context) {
  if (!context) context = document;
  var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
  return arr;
}

$("flash_oben").style.visibility="";
$("flash_oben").style.display="none";
