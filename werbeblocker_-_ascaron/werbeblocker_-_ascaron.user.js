// ==UserScript==
// @name           Werbeblocker - ascaron
// @namespace      Woems
// @include        http://ascaron.alien.to/*
// @include        http://sothys1987.so.funpic.de/*
// ==/UserScript==

function $x(p, context) {
  if (!context) context = document;
  var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
  return arr;
}
window.setTimeout(function () {
  $x('//div[@id][@class][@style]').forEach(function (e) {
    e.style.display="none";
  });
}, 5000)

