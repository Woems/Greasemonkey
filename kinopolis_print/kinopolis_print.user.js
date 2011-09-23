// ==UserScript==
// @name           Kinopolis Print
// @namespace      Woems
// @include        http://213.168.82.190/Reservation.ASP?WCI=PrintAtHome&Nr=*Kinopolis Pring&IsPrintPreview=1
// @include        file:///*/Reservation.ASP.htm
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

function remove(element) {
    element.parentNode.removeChild(element);
}

//$x("/html/body/div/table[2]")[0].style.display="none";
if ($x("/html/body/div/table[2]")[0])
  remove($x("/html/body/div/table[2]")[0]);
