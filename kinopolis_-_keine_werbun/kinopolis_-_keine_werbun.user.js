// ==UserScript==
// @name           Kinopolis - keine Werbung
// @namespace      Woems
// @description    Blendet die Werbung beim Drucken aus
// @include        http://213.168.82.190/Reservation.ASP?WCI=PrintAtHome&Nr=*&IsPrintPreview=1
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

function deserialize(name, def) {
  return eval(GM_getValue(name, (def || '({})')));
}

function serialize(name, val) {
  GM_setValue(name, uneval(val));
}

$x("//img[contains(@src,'bausteine')]").forEach(function (e) {
 e.style.display="none";
});

